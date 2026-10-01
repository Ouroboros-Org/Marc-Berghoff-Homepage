import { describe, expect, it, vi } from "vitest";

import { peerAdvisoryDefaults, peerAdvisorySchema, PEER_ADVISORY_OPT_IN } from "./peer-advisory-schema";
import { PEER_FORM_CONFIRMATION, savePeerAdvisoryRegistration } from "./peer-advisory-storage";

const env = {
  GOOGLE_FORM_ACTION_URL: "https://docs.google.com/forms/d/e/enquiries/formResponse",
  GOOGLE_PEER_FORM_ACTION_URL: "https://docs.google.com/forms/d/e/peer-register/formResponse",
  GOOGLE_PEER_FORM_ENTRY_FULL_NAME: "entry.201",
  GOOGLE_PEER_FORM_ENTRY_EMAIL: "entry.202",
  GOOGLE_PEER_FORM_ENTRY_COMPANY: "entry.203",
  GOOGLE_PEER_FORM_ENTRY_COUNTRY: "entry.204",
  GOOGLE_PEER_FORM_ENTRY_EXPECTATIONS: "entry.205",
  GOOGLE_PEER_FORM_ENTRY_CONSENT: "entry.206",
};
const registration = {
  ...peerAdvisoryDefaults(),
  fullName: "Test Owner", email: "owner@example.com", company: "Test Company",
  country: "Germany", expectations: "An outside perspective\nTime to think.", consent: true,
};

describe("European peer-advisory registration", () => {
  it("requires the group's explicit opt-in and required fields", () => {
    expect(peerAdvisoryDefaults().consent).toBe(false);
    expect(peerAdvisorySchema.safeParse(registration).success).toBe(true);
    expect(peerAdvisorySchema.safeParse({ ...registration, expectations: "" }).success).toBe(true);
    for (const field of ["fullName", "email", "company", "country"] as const) {
      expect(peerAdvisorySchema.safeParse({ ...registration, [field]: "" }).success).toBe(false);
    }
    expect(peerAdvisorySchema.safeParse({ ...registration, consent: false }).success).toBe(false);
  });

  it("stores only registration fields in the separate form and checks the saved confirmation", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(`<div>${PEER_FORM_CONFIRMATION}</div>`));
    await savePeerAdvisoryRegistration(registration, { env, fetchImpl });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(env.GOOGLE_PEER_FORM_ACTION_URL);
    expect(init?.method).toBe("POST");
    expect(Object.fromEntries(init?.body as URLSearchParams)).toEqual({
      "entry.201": "Test Owner", "entry.202": "owner@example.com", "entry.203": "Test Company",
      "entry.204": "Germany", "entry.205": "An outside perspective\nTime to think.", "entry.206": PEER_ADVISORY_OPT_IN,
    });
  });

  it.each([
    {},
    { ...env, GOOGLE_PEER_FORM_ACTION_URL: env.GOOGLE_FORM_ACTION_URL },
    { ...env, GOOGLE_PEER_FORM_ACTION_URL: "https://example.com/formResponse" },
    { ...env, GOOGLE_PEER_FORM_ACTION_URL: "https://docs.google.com/forms/d/e/YOUR_PEER_FORM_ID/formResponse" },
    { ...env, GOOGLE_PEER_FORM_ENTRY_EMAIL: "entry.201" },
    { ...env, GOOGLE_PEER_FORM_ENTRY_CONSENT: "YOUR_ENTRY_CONSENT" },
  ])("rejects missing, shared or invalid configuration without sending anything", async (configuration) => {
    const fetchImpl = vi.fn<typeof fetch>();
    await expect(savePeerAdvisoryRegistration(registration, { env: configuration, fetchImpl })).rejects.toThrow();
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it.each([
    [200, "Please sign in"],
    [200, `<form>${PEER_FORM_CONFIRMATION}</form>`],
    [200, "This form is no longer accepting responses"],
    [500, PEER_FORM_CONFIRMATION],
  ])("rejects an unconfirmed save (%s)", async (status, html) => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response(html, { status }));
    await expect(savePeerAdvisoryRegistration(registration, { env, fetchImpl })).rejects.toThrow();
  });

  it("reports network failure without claiming a saved registration", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockRejectedValue(new Error("Network unavailable"));
    await expect(savePeerAdvisoryRegistration(registration, { env, fetchImpl })).rejects.toThrow();
  });
});
