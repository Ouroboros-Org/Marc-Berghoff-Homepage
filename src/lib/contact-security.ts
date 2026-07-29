import type { ContactPayload } from "./contact-schema";

export const MAX_CONTACT_PAYLOAD_BYTES = 16 * 1_024;
export const MIN_FORM_COMPLETION_MS = 2_500;
export const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const MAX_CLOCK_SKEW_MS = 5_000;

export type SubmissionTrapResult =
  | { accepted: true }
  | { accepted: false; reason: "honeypot" | "too-fast" | "expired" | "future" };

export function evaluateSubmissionTrap(
  payload: Pick<ContactPayload, "website" | "startedAt">,
  now = Date.now(),
): SubmissionTrapResult {
  if (payload.website.trim().length > 0) {
    return { accepted: false, reason: "honeypot" };
  }

  const elapsed = now - payload.startedAt;

  if (elapsed < -MAX_CLOCK_SKEW_MS) {
    return { accepted: false, reason: "future" };
  }

  if (elapsed < MIN_FORM_COMPLETION_MS) {
    return { accepted: false, reason: "too-fast" };
  }

  if (elapsed > MAX_FORM_AGE_MS) {
    return { accepted: false, reason: "expired" };
  }

  return { accepted: true };
}

