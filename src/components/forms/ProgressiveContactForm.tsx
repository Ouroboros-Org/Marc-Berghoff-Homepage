"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { SiteLocale } from "@/config/routes";
import {
  COMPANY_SIZE_LABELS,
  COMPANY_SIZE_OPTIONS,
  COMPANY_SIZE_VALUES,
  quickContactDefaults,
  type QuickContactPayload,
  quickContactSchema,
  SERVICE_LABELS,
  SERVICE_OPTIONS,
  SERVICE_VALUES,
  URGENCY_LABELS,
  URGENCY_OPTIONS,
  URGENCY_VALUES,
} from "@/lib/contact-schema";
import { useDiagnosticSummary } from "@/lib/use-diagnostic-summary";

import {
  DiagnosticSummaryField,
  INITIAL_SUBMIT_STATE,
  postContact,
  SubmitButton,
  SubmitNotice,
  type SubmitState,
} from "./contact-form-shared";
import styles from "./contact-forms.module.css";
import {
  BotTrapFields,
  ConsentField,
  FormInput,
  FormSelect,
  FormTextarea,
} from "./form-controls";

const FORM_COPY = {
  en: {
    title: "Tell me what is happening.",
    intro: "Your name, email and a few lines are enough to begin.",
    messageLegend: "Your message",
    nameLabel: "Name",
    emailLabel: "Email",
    messageLabel: "Message",
    messageHelper:
      "Do not include confidential employee records, health information or other sensitive personal data.",
    messagePlaceholder: "What would you like me to know?",
    detailsTitle: "Add context about the business",
    optionalLabel: "Optional",
    optionalFieldLabel: "optional",
    detailsIntro:
      "Add these details if they help me understand who is involved, what has happened and what you would like to be different.",
    companyLabel: "Company or organisation",
    roleLabel: "Your role",
    phoneLabel: "Phone",
    companySizeLabel: "Team size",
    serviceLabel: "Format, if you have one in mind",
    urgencyLabel: "Timing",
    outcomeLabel: "What should be different?",
    referralLabel: "How did you hear about me?",
    submitLabel: "Send message",
    submittingLabel: "Sending…",
    finePrint:
      "Your details are used to answer this enquiry and are not added to a mailing list.",
  },
  de: {
    title: "Erzählen Sie mir, was gerade passiert.",
    intro:
      "Ihr Name, Ihre E-Mail-Adresse und ein paar Sätze reichen für den Anfang.",
    messageLegend: "Ihre Nachricht",
    nameLabel: "Name",
    emailLabel: "E-Mail-Adresse",
    messageLabel: "Nachricht",
    messageHelper:
      "Bitte nennen Sie hier keine vertraulichen Personalakten, Gesundheitsdaten oder andere sensible personenbezogene Daten.",
    messagePlaceholder: "Was sollte ich über die Situation wissen?",
    detailsTitle: "Mehr zum Unternehmen ergänzen",
    optionalLabel: "Freiwillig",
    optionalFieldLabel: "freiwillig",
    detailsIntro:
      "Ergänzen Sie diese Angaben, wenn sie helfen, die Beteiligten, den bisherigen Verlauf und Ihr Ziel einzuordnen.",
    companyLabel: "Unternehmen oder Organisation",
    roleLabel: "Ihre Rolle",
    phoneLabel: "Telefon",
    companySizeLabel: "Teamgröße",
    serviceLabel: "Format, falls schon klar",
    urgencyLabel: "Zeitrahmen",
    outcomeLabel: "Was soll sich verändern?",
    referralLabel: "Wie sind Sie auf mich aufmerksam geworden?",
    submitLabel: "Nachricht senden",
    submittingLabel: "Wird gesendet…",
    finePrint:
      "Ich verwende Ihre Angaben nur, um diese Anfrage zu beantworten. Sie landen in keinem Verteiler.",
  },
} as const;

const COMPANY_SIZE_OPTIONS_DE = [
  { value: "1-10", label: "1–10 Personen" },
  { value: "11-25", label: "11–25 Personen" },
  { value: "26-50", label: "26–50 Personen" },
  { value: "51-100", label: "51–100 Personen" },
  { value: "101-250", label: "101–250 Personen" },
  { value: "251-plus", label: "Mehr als 250 Personen" },
  { value: "prefer-not-to-say", label: "Keine Angabe" },
] as const;

const SERVICE_OPTIONS_DE = [
  { value: "bottleneck-assessment", label: "Bottleneck Assessment" },
  { value: "executive-coaching", label: "Executive Coaching" },
  { value: "advisory", label: "Strategic People Advisory" },
  { value: "peer-advisory", label: "Peer Advisory" },
  {
    value: "fractional-people-leadership",
    label: "Fractional People Leadership",
  },
  { value: "not-sure", label: "Noch nicht sicher" },
] as const;

const URGENCY_OPTIONS_DE = [
  { value: "exploring", label: "Ich verschaffe mir einen Überblick" },
  { value: "this-quarter", label: "Noch in diesem Quartal" },
  { value: "this-month", label: "Innerhalb des nächsten Monats" },
  { value: "urgent", label: "Das Thema ist akut" },
] as const;

function lengthMessage(locale: SiteLocale, max: number) {
  return locale === "de"
    ? `Bitte verwenden Sie höchstens ${max.toLocaleString("de-DE")} Zeichen.`
    : `Keep this to ${max.toLocaleString("en-GB")} characters or fewer.`;
}

function optionalText(locale: SiteLocale, max: number) {
  return z.string().trim().max(max, lengthMessage(locale, max));
}

function createProgressiveContactSchema(locale: SiteLocale) {
  const isGerman = locale === "de";

  return quickContactSchema.extend({
    fullName: z
      .string()
      .trim()
      .min(2, isGerman ? "Geben Sie bitte Ihren Namen ein." : "Enter your name.")
      .max(120, lengthMessage(locale, 120)),
    email: z
      .string()
      .trim()
      .min(
        1,
        isGerman
          ? "Geben Sie bitte Ihre E-Mail-Adresse ein."
          : "Enter your email address.",
      )
      .email(
        isGerman
          ? "Geben Sie eine gültige E-Mail-Adresse ein."
          : "Enter a valid email address.",
      )
      .max(254, lengthMessage(locale, 254)),
    diagnosticSummary: optionalText(locale, 2_000),
    consent: z.boolean().refine((value) => value, {
      message: isGerman
        ? "Bestätigen Sie bitte, dass Marc diese Angaben zur Beantwortung Ihrer Anfrage verwenden darf."
        : "Confirm that Marc may use these details to respond.",
    }),
    website: optionalText(locale, 200),
    message: z
      .string()
      .trim()
      .min(
        10,
        isGerman
          ? "Schreiben Sie bitte mindestens einen vollständigen Satz, damit ich die Situation einordnen kann."
          : "Share at least a sentence so I have some context.",
      )
      .max(2_500, lengthMessage(locale, 2_500)),
    phone: optionalText(locale, 50).refine(
      (value) => !value || /^[+()\d\s./-]+$/.test(value),
      isGerman
        ? "Verwenden Sie bitte nur Ziffern und übliche Telefonzeichen."
        : "Use numbers and common phone symbols only.",
    ),
    company: optionalText(locale, 160),
    role: optionalText(locale, 120),
    companySize: z.enum(COMPANY_SIZE_VALUES),
    service: z.enum(SERVICE_VALUES),
    urgency: z.enum(URGENCY_VALUES),
    desiredOutcome: optionalText(locale, 700),
    referralSource: optionalText(locale, 200),
  });
}

const progressiveContactSchemas = {
  en: createProgressiveContactSchema("en"),
  de: createProgressiveContactSchema("de"),
} as const;

type ProgressiveContactValues = z.infer<
  (typeof progressiveContactSchemas)["en"]
>;

function defaults(diagnosticSummary = ""): ProgressiveContactValues {
  return {
    ...quickContactDefaults(diagnosticSummary),
    phone: "",
    company: "",
    role: "",
    companySize: "prefer-not-to-say",
    service: "not-sure",
    urgency: "exploring",
    desiredOutcome: "",
    referralSource: "",
  };
}

function toPayload(
  values: ProgressiveContactValues,
  locale: SiteLocale,
): QuickContactPayload {
  const isGerman = locale === "de";
  const companySizeLabel = isGerman
    ? COMPANY_SIZE_OPTIONS_DE.find((option) => option.value === values.companySize)
        ?.label
    : COMPANY_SIZE_LABELS[values.companySize];
  const serviceLabel = isGerman
    ? SERVICE_OPTIONS_DE.find((option) => option.value === values.service)?.label
    : SERVICE_LABELS[values.service];
  const urgencyLabel = isGerman
    ? URGENCY_OPTIONS_DE.find((option) => option.value === values.urgency)?.label
    : URGENCY_LABELS[values.urgency];
  const context = [
    values.company &&
      `${isGerman ? "Unternehmen" : "Company"}: ${values.company}`,
    values.role && `${isGerman ? "Rolle" : "Role"}: ${values.role}`,
    values.phone && `${isGerman ? "Telefon" : "Phone"}: ${values.phone}`,
    values.companySize !== "prefer-not-to-say" &&
      `${isGerman ? "Teamgröße" : "Team size"}: ${companySizeLabel}`,
    values.service !== "not-sure" &&
      `${isGerman ? "Format" : "Area"}: ${serviceLabel}`,
    values.urgency !== "exploring" &&
      `${isGerman ? "Zeitrahmen" : "Timing"}: ${urgencyLabel}`,
    values.desiredOutcome &&
      `${isGerman ? "Was soll sich verändern" : "What should change"}: ${values.desiredOutcome}`,
    values.referralSource &&
      `${isGerman ? "Wie die Person auf mich aufmerksam wurde" : "How they heard about me"}: ${values.referralSource}`,
  ].filter(Boolean);

  return quickContactSchema.parse({
    formType: "quick",
    fullName: values.fullName,
    email: values.email,
    message: context.length
      ? `${values.message}\n\n${isGerman ? "Zusätzlicher Kontext" : "Optional context"}:\n${context.join("\n")}`
      : values.message,
    diagnosticSummary: values.diagnosticSummary,
    consent: values.consent,
    website: values.website,
    startedAt: values.startedAt,
  });
}

export function ProgressiveContactForm({
  initialDetailsOpen = false,
  locale = "en",
}: {
  initialDetailsOpen?: boolean;
  locale?: SiteLocale;
}) {
  const copy = FORM_COPY[locale];
  const schema = progressiveContactSchemas[locale];
  const companySizeOptions =
    locale === "de" ? COMPANY_SIZE_OPTIONS_DE : COMPANY_SIZE_OPTIONS;
  const serviceOptions = locale === "de" ? SERVICE_OPTIONS_DE : SERVICE_OPTIONS;
  const urgencyOptions = locale === "de" ? URGENCY_OPTIONS_DE : URGENCY_OPTIONS;
  const { summary, setSummary } = useDiagnosticSummary();
  const reactId = useId().replaceAll(":", "");
  const prefix = `contact-${reactId}`;
  const noticeRef = useRef<HTMLDivElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(initialDetailsOpen);
  const [submitState, setSubmitState] = useState<SubmitState>(INITIAL_SUBMIT_STATE);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ProgressiveContactValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults(summary),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    setValue("diagnosticSummary", summary, { shouldValidate: true });
  }, [setValue, summary]);

  useEffect(() => {
    if (
      (submitState.phase === "success" || submitState.phase === "error") &&
      submitState.focusNotice
    ) {
      noticeRef.current?.focus();
    }
  }, [submitState]);

  async function onSubmit(values: ProgressiveContactValues) {
    const payload = toPayload(values, locale);
    setSubmitState({ phase: "submitting", message: "", focusNotice: false });
    const response = await postContact(payload, locale);

    if (!response.ok) {
      let firstField = true;
      if (response.fieldErrors) {
        for (const [field, message] of Object.entries(response.fieldErrors)) {
          if (field in values) {
            setError(
              field as keyof ProgressiveContactValues,
              { type: "server", message },
              { shouldFocus: firstField },
            );
            firstField = false;
          }
        }
      }
      setSubmitState({
        phase: "error",
        message: response.message,
        focusNotice: firstField,
      });
      return;
    }

    reset(defaults());
    setSummary("");
    setSubmitState({ phase: "success", message: response.message, focusNotice: true });
  }

  return (
    <form
      className={styles.form}
      id="contact-form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>{copy.title}</h2>
        <p className={styles.intro}>{copy.intro}</p>
      </header>

      <DiagnosticSummaryField
        locale={locale}
        onRemove={() => setSummary("")}
        summary={summary}
      />

      <fieldset className={styles.group}>
        <legend className={styles.legend}>{copy.messageLegend}</legend>
        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <FormInput
            autoComplete="name"
            error={errors.fullName}
            id={`${prefix}-name`}
            label={copy.nameLabel}
            registration={register("fullName")}
            type="text"
          />
          <FormInput
            autoComplete="email"
            error={errors.email}
            id={`${prefix}-email`}
            inputMode="email"
            label={copy.emailLabel}
            registration={register("email")}
            type="email"
          />
        </div>
        <FormTextarea
          error={errors.message}
          helper={copy.messageHelper}
          id={`${prefix}-message`}
          label={copy.messageLabel}
          placeholder={copy.messagePlaceholder}
          registration={register("message")}
          rows={6}
        />
        <input type="hidden" {...register("diagnosticSummary")} />
      </fieldset>

      <details
        className={styles.details}
        onToggle={(event) => setDetailsOpen(event.currentTarget.open)}
        open={detailsOpen}
      >
        <summary className={styles.detailsSummary}>
          <span>
            <strong>{copy.detailsTitle}</strong>
            <small>{copy.optionalLabel}</small>
          </span>
          <ChevronDown aria-hidden="true" className={styles.detailsChevron} size={20} />
        </summary>
        <div className={styles.detailsBody}>
          <p className={styles.detailsIntro}>{copy.detailsIntro}</p>
          <div className={`${styles.grid} ${styles.gridTwo}`}>
            <FormInput
              autoComplete="organization"
              error={errors.company}
              id={`${prefix}-company`}
              label={copy.companyLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              registration={register("company")}
              type="text"
            />
            <FormInput
              autoComplete="organization-title"
              error={errors.role}
              id={`${prefix}-role`}
              label={copy.roleLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              registration={register("role")}
              type="text"
            />
            <FormInput
              autoComplete="tel"
              error={errors.phone}
              id={`${prefix}-phone`}
              inputMode="tel"
              label={copy.phoneLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              registration={register("phone")}
              type="tel"
            />
            <FormSelect
              error={errors.companySize}
              id={`${prefix}-size`}
              label={copy.companySizeLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              options={[...companySizeOptions]}
              registration={register("companySize")}
            />
            <FormSelect
              error={errors.service}
              id={`${prefix}-service`}
              label={copy.serviceLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              options={[...serviceOptions]}
              registration={register("service")}
            />
            <FormSelect
              error={errors.urgency}
              id={`${prefix}-urgency`}
              label={copy.urgencyLabel}
              optional
              optionalLabel={copy.optionalFieldLabel}
              options={[...urgencyOptions]}
              registration={register("urgency")}
            />
          </div>
          <FormTextarea
            error={errors.desiredOutcome}
            id={`${prefix}-outcome`}
            label={copy.outcomeLabel}
            optional
            optionalLabel={copy.optionalFieldLabel}
            registration={register("desiredOutcome")}
            rows={4}
          />
          <FormTextarea
            error={errors.referralSource}
            id={`${prefix}-referral`}
            label={copy.referralLabel}
            optional
            optionalLabel={copy.optionalFieldLabel}
            registration={register("referralSource")}
            rows={3}
          />
        </div>
      </details>

      <ConsentField
        error={errors.consent}
        id={`${prefix}-consent`}
        locale={locale}
        registration={register("consent")}
      />
      <BotTrapFields
        locale={locale}
        prefix={prefix}
        startedAtRegistration={register("startedAt", { valueAsNumber: true })}
        websiteRegistration={register("website")}
      />

      <SubmitNotice ref={noticeRef} state={submitState} />
      <div className={styles.actions}>
        <SubmitButton
          idleLabel={copy.submitLabel}
          state={submitState}
          submittingLabel={copy.submittingLabel}
        />
        <p className={styles.finePrint}>{copy.finePrint}</p>
      </div>
    </form>
  );
}
