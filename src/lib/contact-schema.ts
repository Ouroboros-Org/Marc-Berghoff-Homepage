import { z } from "zod";

import {
  DIAGNOSTIC_ITEM_IDS,
  type DiagnosticAnswers,
  type DiagnosticBand,
} from "./contact-diagnostic";

export const SERVICE_VALUES = [
  "bottleneck-assessment",
  "executive-coaching",
  "advisory",
  "peer-advisory",
  "fractional-people-leadership",
  "not-sure",
] as const;

export type ServiceValue = (typeof SERVICE_VALUES)[number];

export const SERVICE_LABELS = {
  "bottleneck-assessment": "Bottleneck Assessment",
  advisory: "Strategic People Advisory",
  "fractional-people-leadership": "Fractional People Leadership",
  "executive-coaching": "Executive Coaching",
  "peer-advisory": "Peer Advisory",
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

const baseFields = {
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
  diagnosticSummary: optionalShortText(2_000),
  consent: z.boolean().refine((value) => value, {
    message: "Confirm that Marc may use these details to respond.",
  }),
  website: optionalShortText(200),
  startedAt: z.number().int().positive(),
};

export const quickContactSchema = z.object({
  formType: z.literal("quick"),
  ...baseFields,
  message: z
    .string()
    .trim()
    .min(10, "Share at least a sentence so I have some context.")
    .max(4_000, "Keep your message to 4,000 characters or fewer."),
});

const diagnosticAnswersSchema = z
  .record(z.enum(DIAGNOSTIC_ITEM_IDS), z.boolean())
  .refine(
    (answers) =>
      DIAGNOSTIC_ITEM_IDS.every((itemId) =>
        Object.prototype.hasOwnProperty.call(answers, itemId),
      ),
    "Answer all ten statements before sending the result.",
  ) as z.ZodType<DiagnosticAnswers>;

export const diagnosticResultSchema = z.object({
  formType: z.literal("diagnostic-result"),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address.")
    .max(254, "Keep your email to 254 characters or fewer."),
  answers: diagnosticAnswersSchema,
  score: z.number().int().min(0).max(10),
  band: z.enum(["low", "moderate", "high"] satisfies [
    DiagnosticBand,
    ...DiagnosticBand[],
  ]),
  website: optionalShortText(200),
  startedAt: z.number().int().positive(),
});

export const contactPayloadSchema = z.discriminatedUnion("formType", [
  quickContactSchema,
  diagnosticResultSchema,
]);

export type QuickContactPayload = z.infer<typeof quickContactSchema>;
export type DiagnosticResultPayload = z.infer<typeof diagnosticResultSchema>;
export type ContactPayload = z.infer<typeof contactPayloadSchema>;
export type ContactFieldName =
  | keyof QuickContactPayload
  | keyof DiagnosticResultPayload;

export const quickContactDefaults = (
  diagnosticSummary = "",
): QuickContactPayload => ({
  formType: "quick",
  fullName: "",
  email: "",
  message: "",
  diagnosticSummary,
  consent: false,
  website: "",
  startedAt: Date.now(),
});
