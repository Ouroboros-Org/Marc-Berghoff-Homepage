import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GoogleFormsConfigurationError } from "@/lib/google-forms";
import { PEER_ADVISORY_SUCCESS, peerAdvisoryDefaults } from "@/lib/peer-advisory-schema";
import { savePeerAdvisoryRegistration } from "@/lib/peer-advisory-storage";
import { POST } from "./route";

vi.mock("@/lib/peer-advisory-storage", () => ({ savePeerAdvisoryRegistration: vi.fn() }));
const save = vi.mocked(savePeerAdvisoryRegistration);
const valid = () => ({ ...peerAdvisoryDefaults(), fullName: "Test Owner", email: "owner@example.com", company: "Test Company", country: "Malta", consent: true, startedAt: Date.now() - 10_000 });
const request = (payload: unknown) => new Request("https://marcberghoff.com/api/european-peer-advisory", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

beforeEach(() => { save.mockResolvedValue(undefined); });
afterEach(() => vi.resetAllMocks());

describe("POST /api/european-peer-advisory", () => {
  it("waits for persistence before confirming registration", async () => {
    let finish!: () => void;
    save.mockImplementation(() => new Promise<void>((resolve) => { finish = resolve; }));
    let returned = false;
    const pending = POST(request(valid())).then((response) => { returned = true; return response; });
    await vi.waitFor(() => expect(save).toHaveBeenCalledOnce());
    expect(returned).toBe(false);
    finish();
    const response = await pending;
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, message: PEER_ADVISORY_SUCCESS });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it.each([
    { consent: false }, { company: "" }, { country: "" }, { email: "bad" },
    { website: "bot.example" }, { startedAt: Date.now() }, { startedAt: Date.now() - 90_000_000 },
  ])("rejects invalid or trapped submissions without false success", async (override) => {
    const response = await POST(request({ ...valid(), ...override }));
    expect(response.status).toBe(422);
    expect((await response.json()).ok).toBe(false);
    expect(save).not.toHaveBeenCalled();
  });

  it.each([
    [new GoogleFormsConfigurationError("missing"), 503],
    [new Error("Provider failed"), 502],
  ])("does not confirm failed delivery", async (error, status) => {
    save.mockRejectedValue(error);
    const response = await POST(request(valid()));
    expect(response.status).toBe(status);
    expect((await response.json()).ok).toBe(false);
  });

  it("rejects oversized bodies and malformed JSON before saving", async () => {
    expect((await POST(request({ ...valid(), expectations: "x".repeat(17_000) }))).status).toBe(413);
    const malformed = new Request("https://marcberghoff.com/api/european-peer-advisory", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{" });
    expect((await POST(malformed)).status).toBe(400);
    expect(save).not.toHaveBeenCalled();
  });
});
