import { z } from "zod";

export const SERVICE_VALUES = [
  "bottleneck-assessment",
  "advisory",
  "fractional-people-leadership",
  "executive-coaching",
  "not-sure",
] as const;

export type ServiceValue = (typeof SERVICE_VALUES)[number];

export const SERVICE_LABELS = {
  "bottleneck-assessment": "Bottleneck assessment",
  advisory: "Strategic people advisory",
  "fractional-people-leadership": "Fractional people leadership",
  "executive-coaching": "Executive coaching",
  "not-sure": "I’m not sure yet",
} as const satisfies Record<ServiceValue, string>;

export const SERVICE_OPTIONS = SERVICE_VALUES.map((value) => ({
  value,
  label: SERVICE_LABELS[value],
}));

export const COMPANY_SIZE_VALUES = [
  "1-10",
  "11-25",
  "26-50",
  "51-100",
  "101-250",
  "251-plus",
  "prefer-not-to-say",
] as const;

export type CompanySizeValue = (typeof COMPANY_SIZE_VALUES)[number];

export const COMPANY_SIZE_LABELS = {
  "1-10": "1–10 people",
  "11-25": "11–25 people",
  "26-50": "26–50 people",
  "51-100": "51–100 people",
  "101-250": "101–250 people",
  "251-plus": "251+ people",
  "prefer-not-to-say": "Prefer not to say",
} as const satisfies Record<CompanySizeValue, string>;

export const COMPANY_SIZE_OPTIONS = COMPANY_SIZE_VALUES.map((value) => ({
  value,
  label: COMPANY_SIZE_LABELS[value],
}));

export const URGENCY_VALUES = [
  "exploring",
  "this-quarter",
  "this-month",
  "urgent",
] as const;

export type UrgencyValue = (typeof URGENCY_VALUES)[number];

export const URGENCY_LABELS = {
  exploring: "I’m exploring options",
  "this-quarter": "Within this quarter",
  "this-month": "Within the next month",
  urgent: "There is an immediate issue",
} as const satisfies Record<UrgencyValue, string>;

export const URGENCY_OPTIONS = URGENCY_VALUES.map((value) => ({
  value,
  label: URGENCY_LABELS[value],
}));

const optionalShortText = (max: number) =>
  z.string().trim().max(max, `Keep this to ${max} characters or fewer.`);

const sharedFields = {
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "Keep your name to 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address.")
    .max(254, "Keep your email to 254 characters or fewer."),
  phone: optionalShortText(50).refine(
    (value) => !value || /^[+()\d\s./-]+$/.test(value),
    "Use numbers and common phone symbols only.",
  ),
  company: optionalShortText(160),
  service: z.enum(SERVICE_VALUES),
  diagnosticSummary: optionalShortText(2_000),
  consent: z.boolean().refine((value) => value, {
    message: "Confirm that Marc may use these details to respond.",
  }),
  website: optionalShortText(200),
  startedAt: z.number().int().positive(),
};

export const quickContactSchema = z.object({
  formType: z.literal("quick"),
  ...sharedFields,
  message: z
    .string()
    .trim()
    .min(10, "Share at least a sentence so Marc has some context.")
    .max(4_000, "Keep your message to 4,000 characters or fewer."),
});

export const extendedContactSchema = z.object({
  formType: z.literal("extended"),
  ...sharedFields,
  company: z
    .string()
    .trim()
    .min(2, "Enter your company or organisation.")
    .max(160, "Keep the company name to 160 characters or fewer."),
  role: z
    .string()
    .trim()
    .min(2, "Enter your role.")
    .max(120, "Keep your role to 120 characters or fewer."),
  companySize: z.enum(COMPANY_SIZE_VALUES),
  urgency: z.enum(URGENCY_VALUES),
  currentSituation: z
    .string()
    .trim()
    .min(20, "Add a little more detail about what is happening now.")
    .max(5_000, "Keep this to 5,000 characters or fewer."),
  desiredOutcome: z
    .string()
    .trim()
    .min(20, "Add a little more detail about what should change.")
    .max(5_000, "Keep this to 5,000 characters or fewer."),
  referralSource: optionalShortText(500),
});

export const contactPayloadSchema = z.discriminatedUnion("formType", [
  quickContactSchema,
  extendedContactSchema,
]);

export type QuickContactPayload = z.infer<typeof quickContactSchema>;
export type ExtendedContactPayload = z.infer<typeof extendedContactSchema>;
export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type ContactFieldName = keyof QuickContactPayload | keyof ExtendedContactPayload;

export const quickContactDefaults = (
  diagnosticSummary = "",
): QuickContactPayload => ({
  formType: "quick",
  fullName: "",
  email: "",
  phone: "",
  company: "",
  service: "not-sure",
  message: "",
  diagnosticSummary,
  consent: false,
  website: "",
  startedAt: Date.now(),
});

export const extendedContactDefaults = (
  diagnosticSummary = "",
): ExtendedContactPayload => ({
  formType: "extended",
  fullName: "",
  email: "",
  phone: "",
  company: "",
  role: "",
  companySize: "prefer-not-to-say",
  service: "not-sure",
  urgency: "exploring",
  currentSituation: "",
  desiredOutcome: "",
  referralSource: "",
  diagnosticSummary,
  consent: false,
  website: "",
  startedAt: Date.now(),
});
