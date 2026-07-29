import { describe, expect, it } from "vitest";

import {
  evaluateSubmissionTrap,
  MAX_FORM_AGE_MS,
  MIN_FORM_COMPLETION_MS,
} from "./contact-security";

describe("evaluateSubmissionTrap", () => {
  const now = 1_800_000_000_000;

  it("accepts a normally completed form", () => {
    expect(
      evaluateSubmissionTrap(
        { website: "", startedAt: now - MIN_FORM_COMPLETION_MS - 1 },
        now,
      ),
    ).toEqual({ accepted: true });
  });

  it("catches the honeypot", () => {
    expect(
      evaluateSubmissionTrap(
        { website: "https://spam.example", startedAt: now - 10_000 },
        now,
      ),
    ).toEqual({ accepted: false, reason: "honeypot" });
  });

  it("rejects implausibly fast and stale submissions", () => {
    expect(
      evaluateSubmissionTrap({ website: "", startedAt: now - 100 }, now),
    ).toEqual({ accepted: false, reason: "too-fast" });
    expect(
      evaluateSubmissionTrap(
        { website: "", startedAt: now - MAX_FORM_AGE_MS - 1 },
        now,
      ),
    ).toEqual({ accepted: false, reason: "expired" });
  });
});
