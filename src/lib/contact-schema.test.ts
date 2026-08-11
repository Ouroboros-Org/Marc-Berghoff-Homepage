import { describe, expect, it } from "vitest";

import {
  contactPayloadSchema,
  extendedContactDefaults,
  quickContactDefaults,
} from "./contact-schema";
import {
  DIAGNOSTIC_ITEMS,
  scoreDiagnostic,
  type DiagnosticAnswers,
} from "./contact-diagnostic";

describe("contactPayloadSchema", () => {
  it("accepts a valid quick message without organisational fields", () => {
    const payload = {
      ...quickContactDefaults(),
      fullName: "Alex Morgan",
      email: "alex@example.com",
      message: "We keep revisiting ownership decisions across the team.",
      consent: true,
    };

    expect(contactPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("requires the detailed context fields for an extended enquiry", () => {
    const payload = {
      ...extendedContactDefaults(),
      fullName: "Alex Morgan",
      email: "alex@example.com",
      company: "Example Company",
      role: "Founder",
      currentSituation: "Important decisions keep returning to two senior people.",
      desiredOutcome: "Teams make sound day-to-day decisions without waiting for us.",
      consent: true,
    };

    expect(contactPayloadSchema.safeParse(payload).success).toBe(true);
  });

  it("rejects an enquiry without consent", () => {
    const payload = {
      ...quickContactDefaults(),
      fullName: "Alex Morgan",
      email: "alex@example.com",
      message: "There is enough context in this message to pass validation.",
    };
    const parsed = contactPayloadSchema.safeParse(payload);

    expect(parsed.success).toBe(false);
    if (!parsed.success) {
      expect(parsed.error.issues.some((issue) => issue.path[0] === "consent")).toBe(true);
    }
  });

  it("does not accept extended-only fields as a substitute for the quick message", () => {
    const payload = {
      ...quickContactDefaults(),
      fullName: "Alex Morgan",
      email: "alex@example.com",
      message: "",
      currentSituation: "A long but misplaced answer that belongs to another form.",
      consent: true,
    };

    expect(contactPayloadSchema.safeParse(payload).success).toBe(false);
  });

  it("accepts a complete diagnostic result with only one visible contact field", () => {
    const answers = Object.fromEntries(
      DIAGNOSTIC_ITEMS.map((item) => [item.id, !item.constrainedWhen]),
    ) as DiagnosticAnswers;
    const result = scoreDiagnostic(answers);

    expect(
      contactPayloadSchema.safeParse({
        formType: "diagnostic-result",
        email: "alex@example.com",
        answers,
        score: result.score,
        band: result.band,
        website: "",
        startedAt: Date.now(),
      }).success,
    ).toBe(true);
  });

  it("rejects a diagnostic result when any statement is unanswered", () => {
    const answers = Object.fromEntries(
      DIAGNOSTIC_ITEMS.slice(0, 9).map((item) => [item.id, true]),
    );

    expect(
      contactPayloadSchema.safeParse({
        formType: "diagnostic-result",
        email: "alex@example.com",
        answers,
        score: 5,
        band: "moderate",
        website: "",
        startedAt: Date.now(),
      }).success,
    ).toBe(false);
  });
});
