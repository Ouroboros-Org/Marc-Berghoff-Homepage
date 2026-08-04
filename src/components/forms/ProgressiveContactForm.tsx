"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const optionalText = (max: number) => z.string().trim().max(max);

const progressiveContactSchema = quickContactSchema.extend({
  message: z
    .string()
    .trim()
    .min(10, "Share at least a sentence so I have some context.")
    .max(2_500, "Keep the main message to 2,500 characters or fewer."),
  phone: optionalText(50).refine(
    (value) => !value || /^[+()\d\s./-]+$/.test(value),
    "Use numbers and common phone symbols only.",
  ),
  company: optionalText(160),
  role: optionalText(120),
  companySize: z.enum(COMPANY_SIZE_VALUES),
  service: z.enum(SERVICE_VALUES),
  urgency: z.enum(URGENCY_VALUES),
  desiredOutcome: optionalText(700),
  referralSource: optionalText(200),
});

type ProgressiveContactValues = z.infer<typeof progressiveContactSchema>;

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

function toPayload(values: ProgressiveContactValues): QuickContactPayload {
  const context = [
    values.company && `Company: ${values.company}`,
    values.role && `Role: ${values.role}`,
    values.phone && `Phone: ${values.phone}`,
    values.companySize !== "prefer-not-to-say" &&
      `Team size: ${COMPANY_SIZE_LABELS[values.companySize]}`,
    values.service !== "not-sure" && `Area: ${SERVICE_LABELS[values.service]}`,
    values.urgency !== "exploring" && `Timing: ${URGENCY_LABELS[values.urgency]}`,
    values.desiredOutcome && `What should change: ${values.desiredOutcome}`,
    values.referralSource && `How they heard about me: ${values.referralSource}`,
  ].filter(Boolean);

  return quickContactSchema.parse({
    formType: "quick",
    fullName: values.fullName,
    email: values.email,
    message: context.length
      ? `${values.message}\n\nOptional context:\n${context.join("\n")}`
      : values.message,
    diagnosticSummary: values.diagnosticSummary,
    consent: values.consent,
    website: values.website,
    startedAt: values.startedAt,
  });
}

export function ProgressiveContactForm({
  initialDetailsOpen = false,
}: {
  initialDetailsOpen?: boolean;
}) {
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
    resolver: zodResolver(progressiveContactSchema),
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
    const payload = toPayload(values);
    setSubmitState({ phase: "submitting", message: "", focusNotice: false });
    const response = await postContact(payload);

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
        <h2 className={styles.title}>Send a short note.</h2>
        <p className={styles.intro}>Your name, email and a few lines are enough.</p>
      </header>

      <DiagnosticSummaryField onRemove={() => setSummary("")} summary={summary} />

      <fieldset className={styles.group}>
        <legend className={styles.legend}>Your message</legend>
        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <FormInput
            autoComplete="name"
            error={errors.fullName}
            id={`${prefix}-name`}
            label="Name"
            registration={register("fullName")}
            type="text"
          />
          <FormInput
            autoComplete="email"
            error={errors.email}
            id={`${prefix}-email`}
            inputMode="email"
            label="Email"
            registration={register("email")}
            type="email"
          />
        </div>
        <FormTextarea
          error={errors.message}
          helper="Do not include confidential employee records, health information or other sensitive personal data."
          id={`${prefix}-message`}
          label="Message"
          placeholder="What would you like me to know?"
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
            <strong>Add context about the business and the decision</strong>
            <small>Optional</small>
          </span>
          <ChevronDown aria-hidden="true" className={styles.detailsChevron} size={20} />
        </summary>
        <div className={styles.detailsBody}>
          <p className={styles.detailsIntro}>
            Add these details if they help me understand who is involved, what has
            happened and what kind of response would help.
          </p>
          <div className={`${styles.grid} ${styles.gridTwo}`}>
            <FormInput
              autoComplete="organization"
              error={errors.company}
              id={`${prefix}-company`}
              label="Company or organisation"
              optional
              registration={register("company")}
              type="text"
            />
            <FormInput
              autoComplete="organization-title"
              error={errors.role}
              id={`${prefix}-role`}
              label="Your role"
              optional
              registration={register("role")}
              type="text"
            />
            <FormInput
              autoComplete="tel"
              error={errors.phone}
              id={`${prefix}-phone`}
              inputMode="tel"
              label="Phone"
              optional
              registration={register("phone")}
              type="tel"
            />
            <FormSelect
              error={errors.companySize}
              id={`${prefix}-size`}
              label="Team size"
              optional
              options={[...COMPANY_SIZE_OPTIONS]}
              registration={register("companySize")}
            />
            <FormSelect
              error={errors.service}
              id={`${prefix}-service`}
              label="Area of interest"
              optional
              options={[...SERVICE_OPTIONS]}
              registration={register("service")}
            />
            <FormSelect
              error={errors.urgency}
              id={`${prefix}-urgency`}
              label="Timing"
              optional
              options={[...URGENCY_OPTIONS]}
              registration={register("urgency")}
            />
          </div>
          <FormTextarea
            error={errors.desiredOutcome}
            id={`${prefix}-outcome`}
            label="What should be different?"
            optional
            registration={register("desiredOutcome")}
            rows={4}
          />
          <FormTextarea
            error={errors.referralSource}
            id={`${prefix}-referral`}
            label="How did you hear about me?"
            optional
            registration={register("referralSource")}
            rows={3}
          />
        </div>
      </details>

      <ConsentField
        error={errors.consent}
        id={`${prefix}-consent`}
        registration={register("consent")}
      />
      <BotTrapFields
        prefix={prefix}
        startedAtRegistration={register("startedAt", { valueAsNumber: true })}
        websiteRegistration={register("website")}
      />

      <SubmitNotice ref={noticeRef} state={submitState} />
      <div className={styles.actions}>
        <SubmitButton idleLabel="Send message" state={submitState} />
        <p className={styles.finePrint}>
          Your details are used to answer this enquiry and are not added to a mailing list.
        </p>
      </div>
    </form>
  );
}
