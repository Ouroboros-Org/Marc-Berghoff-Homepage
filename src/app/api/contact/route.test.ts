import { afterEach, describe, expect, it, vi } from "vitest";

import { quickContactDefaults } from "../../../lib/contact-schema";
import {
  DIAGNOSTIC_ITEMS,
  scoreDiagnostic,
  type DiagnosticAnswers,
} from "../../../lib/contact-diagnostic";
import { MAX_CONTACT_PAYLOAD_BYTES } from "../../../lib/contact-security";
import { POST } from "./route";

const endpoint = "http://localhost/api/contact";

function validQuickPayload() {
  return {
    ...quickContactDefaults(),
    fullName: "Alex Morgan",
    email: "alex@example.com",
    message: "We keep revisiting the same ownership decision every week.",
    consent: true,
    startedAt: Date.now() - 5_000,
  };
}

function validDiagnosticPayload() {
  const answers = Object.fromEntries(
    DIAGNOSTIC_ITEMS.map((item) => [item.id, item.constrainedWhen]),
  ) as DiagnosticAnswers;
  const result = scoreDiagnostic(answers);

  return {
    formType: "diagnostic-result" as const,
    email: "founder@example.com",
    answers,
    score: result.score,
    band: result.band,
    website: "",
    startedAt: Date.now() - 5_000,
  };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  it("requires JSON", async () => {
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "hello",
      }),
    );

    expect(response.status).toBe(415);
    expect(await response.json()).toMatchObject({ ok: false, code: "INVALID_CONTENT_TYPE" });
  });

  it("rejects a declared body above the size limit before reading it", async () => {
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(MAX_CONTACT_PAYLOAD_BYTES + 1),
        },
        body: "{}",
      }),
    );

    expect(response.status).toBe(413);
    expect(await response.json()).toMatchObject({ ok: false, code: "PAYLOAD_TOO_LARGE" });
  });

  it("returns field errors for an invalid enquiry", async () => {
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validQuickPayload(), email: "not-an-email" }),
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(422);
    expect(body).toMatchObject({ ok: false, code: "VALIDATION_ERROR" });
    expect(body.fieldErrors.email).toBeTruthy();
  });

  it("does not forward a honeypot submission", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...validQuickPayload(), website: "https://spam.example" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ ok: true });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("returns a clear service-unavailable response while placeholders remain", async () => {
    vi.stubEnv("GOOGLE_FORM_ACTION_URL", "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse");
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validQuickPayload()),
      }),
    );

    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({ ok: false, code: "FORM_NOT_CONFIGURED" });
  });

  it.each([
    ["score", (payload: ReturnType<typeof validDiagnosticPayload>) => ({
      ...payload,
      score: payload.score - 1,
    })],
    ["band", (payload: ReturnType<typeof validDiagnosticPayload>) => ({
      ...payload,
      band: "moderate" as const,
    })],
  ] as const)("recomputes and rejects a forged diagnostic %s", async (_field, forge) => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const payload = validDiagnosticPayload();
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forge(payload)),
      }),
    );

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({
      ok: false,
      code: "VALIDATION_ERROR",
      fieldErrors: { score: expect.any(String) },
    });
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("does not accept a diagnostic result with an unanswered statement", async () => {
    const payload = validDiagnosticPayload();
    const incompleteAnswers: Partial<DiagnosticAnswers> = {
      ...payload.answers,
    };
    delete incompleteAnswers[DIAGNOSTIC_ITEMS[9].id];
    const response = await POST(
      new Request(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, answers: incompleteAnswers }),
      }),
    );

    expect(response.status).toBe(422);
    expect(await response.json()).toMatchObject({
      ok: false,
      code: "VALIDATION_ERROR",
    });
  });
});
