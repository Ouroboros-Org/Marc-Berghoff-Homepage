import { describe, expect, it, vi } from "vitest";

import { extendedContactDefaults, quickContactDefaults } from "./contact-schema";
import {
  buildGoogleFormsBody,
  GoogleFormsConfigurationError,
  isPlaceholderConfiguration,
  readGoogleFormsConfig,
  submitContactToGoogleForms,
} from "./google-forms";

const validEnv = {
  GOOGLE_FORM_ACTION_URL: "https://docs.google.com/forms/d/e/real-form-id/formResponse",
  GOOGLE_FORM_ENTRY_FORM_TYPE: "entry.101",
  GOOGLE_FORM_ENTRY_FULL_NAME: "entry.102",
  GOOGLE_FORM_ENTRY_EMAIL: "entry.103",
  GOOGLE_FORM_ENTRY_PHONE: "entry.104",
  GOOGLE_FORM_ENTRY_COMPANY: "entry.105",
  GOOGLE_FORM_ENTRY_ROLE: "entry.106",
  GOOGLE_FORM_ENTRY_COMPANY_SIZE: "entry.107",
  GOOGLE_FORM_ENTRY_SERVICE: "entry.108",
  GOOGLE_FORM_ENTRY_URGENCY: "entry.109",
  GOOGLE_FORM_ENTRY_MESSAGE: "entry.110",
  GOOGLE_FORM_ENTRY_CURRENT_SITUATION: "entry.111",
  GOOGLE_FORM_ENTRY_DESIRED_OUTCOME: "entry.112",
  GOOGLE_FORM_ENTRY_REFERRAL: "entry.113",
  GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY: "entry.114",
  GOOGLE_FORM_ENTRY_CONSENT: "entry.115",
};

const quickPayload = {
  ...quickContactDefaults(
    "Six-question bottleneck check: Role clarity: Some reported friction (2/4).",
  ),
  fullName: "Alex Morgan",
  email: "alex@example.com",
  message: "We need to clarify role ownership across two growing teams.",
  consent: true,
};

const extendedPayload = {
  ...extendedContactDefaults(),
  fullName: "Taylor Morgan",
  email: "taylor@example.com",
  company: "Example Company",
  role: "Founder",
  companySize: "51-100" as const,
  service: "advisory" as const,
  urgency: "this-month" as const,
  currentSituation: "Decision ownership is unclear across the leadership team.",
  desiredOutcome: "Set clear accountabilities before the next stage of hiring.",
  consent: true,
};

describe("Google Forms configuration", () => {
  it("treats documented placeholders as unconfigured", () => {
    expect(isPlaceholderConfiguration("YOUR_ENTRY_EMAIL")).toBe(true);
    expect(isPlaceholderConfiguration("entry.103")).toBe(false);
    expect(() => readGoogleFormsConfig({ ...validEnv, GOOGLE_FORM_ENTRY_EMAIL: "YOUR_ENTRY_EMAIL" })).toThrow(
      GoogleFormsConfigurationError,
    );
  });

  it("only accepts the HTTPS Google formResponse endpoint", () => {
    expect(() =>
      readGoogleFormsConfig({
        ...validEnv,
        GOOGLE_FORM_ACTION_URL: "https://example.com/forms/formResponse",
      }),
    ).toThrow(GoogleFormsConfigurationError);
  });
});

describe("Google Forms payload mapping", () => {
  it("maps the quick form and omits anti-spam fields", () => {
    const config = readGoogleFormsConfig(validEnv);
    const body = buildGoogleFormsBody(quickPayload, config);

    expect(body.get("entry.101")).toBe("Quick message");
    expect(body.get("entry.102")).toBe("Alex Morgan");
    expect(body.get("entry.104")).toBe("");
    expect(body.get("entry.105")).toBe("");
    expect(body.get("entry.108")).toBe("");
    expect(body.get("entry.110")).toBe(quickPayload.message);
    expect(body.get("entry.114")).toBe(quickPayload.diagnosticSummary);
    expect(body.get("entry.115")).toBe("Yes");
    expect([...body.keys()].some((key) => key.includes("website") || key.includes("startedAt"))).toBe(
      false,
    );
  });

  it("maps extended-form choices to the exact human-readable Google options", () => {
    const config = readGoogleFormsConfig(validEnv);
    const body = buildGoogleFormsBody(extendedPayload, config);

    expect(body.get("entry.101")).toBe("Extended enquiry");
    expect(body.get("entry.107")).toBe("51–100 people");
    expect(body.get("entry.108")).toBe("Strategic people advisory");
    expect(body.get("entry.109")).toBe("Within the next month");
  });

  it("posts URL-encoded data to Google from the server", async () => {
    const fetchImpl = vi.fn<typeof fetch>().mockResolvedValue(new Response("", { status: 200 }));

    await submitContactToGoogleForms(quickPayload, { env: validEnv, fetchImpl });

    expect(fetchImpl).toHaveBeenCalledOnce();
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(validEnv.GOOGLE_FORM_ACTION_URL);
    expect(init?.method).toBe("POST");
    expect(init?.headers).toEqual({
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    });
    expect(init?.body).toBeInstanceOf(URLSearchParams);
  });
});
