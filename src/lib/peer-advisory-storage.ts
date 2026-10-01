import { GoogleFormsConfigurationError, GoogleFormsSubmissionError, isPlaceholderConfiguration } from "./google-forms";
import { PEER_ADVISORY_OPT_IN, type PeerAdvisoryRegistration } from "./peer-advisory-schema";

// Set this exact confirmation message on the separate Google Form. An HTTP 200
// alone can also be a validation or sign-in page, so it does not prove a save.
export const PEER_FORM_CONFIRMATION = "Your interest in European peer advisory has been registered.";

const entryKeys = {
  fullName: "GOOGLE_PEER_FORM_ENTRY_FULL_NAME",
  email: "GOOGLE_PEER_FORM_ENTRY_EMAIL",
  company: "GOOGLE_PEER_FORM_ENTRY_COMPANY",
  country: "GOOGLE_PEER_FORM_ENTRY_COUNTRY",
  expectations: "GOOGLE_PEER_FORM_ENTRY_EXPECTATIONS",
  consent: "GOOGLE_PEER_FORM_ENTRY_CONSENT",
} as const;

export async function savePeerAdvisoryRegistration(
  registration: PeerAdvisoryRegistration,
  { env = process.env, fetchImpl = fetch }: {
    env?: Record<string, string | undefined>;
    fetchImpl?: typeof fetch;
  } = {},
): Promise<void> {
  const requiredKeys = ["GOOGLE_PEER_FORM_ACTION_URL", ...Object.values(entryKeys)];
  const missing = requiredKeys.filter((key) => isPlaceholderConfiguration(env[key]) || /YOUR_|REPLACE/i.test(env[key] ?? ""));
  if (missing.length) throw new GoogleFormsConfigurationError("The peer-advisory register is not configured.", missing);

  let actionUrl: URL;
  try {
    actionUrl = new URL(env.GOOGLE_PEER_FORM_ACTION_URL!);
  } catch {
    throw new GoogleFormsConfigurationError("GOOGLE_PEER_FORM_ACTION_URL is invalid.");
  }
  if (actionUrl.protocol !== "https:" || actionUrl.hostname !== "docs.google.com" ||
      actionUrl.username || actionUrl.password || actionUrl.port || actionUrl.search || actionUrl.hash ||
      !/^\/forms\/d\/e\/[^/]+\/formResponse$/.test(actionUrl.pathname)) {
    throw new GoogleFormsConfigurationError("Use a Google Forms formResponse URL for the peer register.");
  }
  // Never fall back to the general enquiry form, even if only one is configured.
  if (actionUrl.href === env.GOOGLE_FORM_ACTION_URL?.trim()) {
    throw new GoogleFormsConfigurationError("The peer-advisory register must use a separate Google Form.");
  }
  const entries = Object.values(entryKeys).map((key) => env[key]!);
  if (entries.some((entry) => !/^entry\.[1-9]\d*$/.test(entry)) || new Set(entries).size !== entries.length) {
    throw new GoogleFormsConfigurationError("Use distinct numeric entry IDs for the peer register.");
  }

  const body = new URLSearchParams();
  for (const [field, key] of Object.entries(entryKeys)) {
    const value = field === "consent" ? PEER_ADVISORY_OPT_IN : registration[field as keyof typeof entryKeys];
    body.set(env[key]!, String(value));
  }

  try {
    const response = await fetchImpl(actionUrl.href, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    const confirmation = await response.text();
    if (!response.ok || /<form\b/i.test(confirmation) || !confirmation.includes(PEER_FORM_CONFIRMATION)) {
      throw new GoogleFormsSubmissionError("The peer-advisory registration was not confirmed by Google Forms.");
    }
  } catch (error) {
    if (error instanceof GoogleFormsSubmissionError) throw error;
    throw new GoogleFormsSubmissionError("The peer-advisory registration could not be saved.", { cause: error });
  }
}
