import {
  COMPANY_SIZE_LABELS,
  SERVICE_LABELS,
  URGENCY_LABELS,
  type ContactPayload,
} from "./contact-schema";

const GOOGLE_FORM_ENV_KEYS = {
  actionUrl: "GOOGLE_FORM_ACTION_URL",
  formType: "GOOGLE_FORM_ENTRY_FORM_TYPE",
  fullName: "GOOGLE_FORM_ENTRY_FULL_NAME",
  email: "GOOGLE_FORM_ENTRY_EMAIL",
  phone: "GOOGLE_FORM_ENTRY_PHONE",
  company: "GOOGLE_FORM_ENTRY_COMPANY",
  role: "GOOGLE_FORM_ENTRY_ROLE",
  companySize: "GOOGLE_FORM_ENTRY_COMPANY_SIZE",
  service: "GOOGLE_FORM_ENTRY_SERVICE",
  urgency: "GOOGLE_FORM_ENTRY_URGENCY",
  message: "GOOGLE_FORM_ENTRY_MESSAGE",
  currentSituation: "GOOGLE_FORM_ENTRY_CURRENT_SITUATION",
  desiredOutcome: "GOOGLE_FORM_ENTRY_DESIRED_OUTCOME",
  referral: "GOOGLE_FORM_ENTRY_REFERRAL",
  diagnosticSummary: "GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY",
  consent: "GOOGLE_FORM_ENTRY_CONSENT",
} as const;

type GoogleFormsField = Exclude<keyof typeof GOOGLE_FORM_ENV_KEYS, "actionUrl">;

export type GoogleFormsConfig = {
  actionUrl: string;
  entries: Record<GoogleFormsField, string>;
};

export class GoogleFormsConfigurationError extends Error {
  readonly missingKeys: string[];

  constructor(message: string, missingKeys: string[] = []) {
    super(message);
    this.name = "GoogleFormsConfigurationError";
    this.missingKeys = missingKeys;
  }
}

export class GoogleFormsSubmissionError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "GoogleFormsSubmissionError";
  }
}

export function isPlaceholderConfiguration(value: string | undefined): boolean {
  if (!value) return true;

  const normalized = value.trim().toLowerCase();
  return (
    normalized.length === 0 ||
    normalized.includes("your_form") ||
    normalized.includes("your-form") ||
    normalized.includes("your_entry") ||
    normalized.includes("replace_me") ||
    normalized.includes("replace-me") ||
    normalized.includes("example") ||
    /^entry\.0+$/.test(normalized)
  );
}

export function readGoogleFormsConfig(
  env: Record<string, string | undefined> = process.env,
): GoogleFormsConfig {
  const missingKeys = Object.values(GOOGLE_FORM_ENV_KEYS).filter((key) =>
    isPlaceholderConfiguration(env[key]),
  );

  if (missingKeys.length > 0) {
    throw new GoogleFormsConfigurationError(
      "The contact form is not configured yet.",
      missingKeys,
    );
  }

  const actionUrl = env[GOOGLE_FORM_ENV_KEYS.actionUrl] as string;
  let parsedUrl: URL;

  try {
    parsedUrl = new URL(actionUrl);
  } catch {
    throw new GoogleFormsConfigurationError("GOOGLE_FORM_ACTION_URL is not a valid URL.");
  }

  if (
    parsedUrl.protocol !== "https:" ||
    parsedUrl.hostname !== "docs.google.com" ||
    !parsedUrl.pathname.startsWith("/forms/d/e/") ||
    !parsedUrl.pathname.endsWith("/formResponse")
  ) {
    throw new GoogleFormsConfigurationError(
      "GOOGLE_FORM_ACTION_URL must be the Google Forms formResponse URL.",
    );
  }

  const entries = Object.fromEntries(
    Object.entries(GOOGLE_FORM_ENV_KEYS)
      .filter(([name]) => name !== "actionUrl")
      .map(([name, key]) => [name, env[key] as string]),
  ) as Record<GoogleFormsField, string>;

  return { actionUrl, entries };
}

export function buildGoogleFormsBody(
  payload: ContactPayload,
  config: GoogleFormsConfig,
): URLSearchParams {
  const values: Record<GoogleFormsField, string> = {
    formType: payload.formType === "quick" ? "Quick contact" : "Extended enquiry",
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    company: payload.company,
    role: payload.formType === "extended" ? payload.role : "",
    companySize:
      payload.formType === "extended" ? COMPANY_SIZE_LABELS[payload.companySize] : "",
    service: SERVICE_LABELS[payload.service],
    urgency: payload.formType === "extended" ? URGENCY_LABELS[payload.urgency] : "",
    message: payload.formType === "quick" ? payload.message : "",
    currentSituation: payload.formType === "extended" ? payload.currentSituation : "",
    desiredOutcome: payload.formType === "extended" ? payload.desiredOutcome : "",
    referral: payload.formType === "extended" ? payload.referralSource : "",
    diagnosticSummary: payload.diagnosticSummary,
    consent: payload.consent ? "Yes" : "No",
  };

  const body = new URLSearchParams();
  for (const [field, value] of Object.entries(values) as [GoogleFormsField, string][]) {
    body.set(config.entries[field], value);
  }
  return body;
}

export async function submitContactToGoogleForms(
  payload: ContactPayload,
  options: {
    env?: Record<string, string | undefined>;
    fetchImpl?: typeof fetch;
  } = {},
): Promise<void> {
  const config = readGoogleFormsConfig(options.env);
  const body = buildGoogleFormsBody(payload, config);
  const fetchImpl = options.fetchImpl ?? fetch;

  try {
    const response = await fetchImpl(config.actionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
      cache: "no-store",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      throw new GoogleFormsSubmissionError(
        `Google Forms returned status ${response.status}.`,
      );
    }
  } catch (error) {
    if (error instanceof GoogleFormsSubmissionError) throw error;
    throw new GoogleFormsSubmissionError(
      "The contact request could not be delivered to Google Forms.",
      { cause: error },
    );
  }
}
