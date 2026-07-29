"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  extendedContactDefaults,
  type ExtendedContactPayload,
  extendedContactSchema,
} from "../../lib/contact-schema";
import {
  COMPANY_SIZE_OPTIONS,
  DiagnosticSummaryField,
  INITIAL_SUBMIT_STATE,
  postContact,
  SERVICE_OPTIONS,
  SubmitButton,
  SubmitNotice,
  type SubmitState,
  URGENCY_OPTIONS,
} from "./contact-form-shared";
import styles from "./contact-forms.module.css";
import {
  BotTrapFields,
  ConsentField,
  FormInput,
  FormSelect,
  FormTextarea,
} from "./form-controls";

export type ExtendedContactFormProps = {
  id?: string;
  title?: string;
  intro?: string;
  diagnosticSummary?: string;
  className?: string;
};

export function ExtendedContactForm({
  id = "extended-contact",
  title = "Share the relevant background.",
  intro = "Use this form when a sentence or two will not explain the issue. Marc reads the context before replying.",
  diagnosticSummary = "",
  className,
}: ExtendedContactFormProps) {
  const reactId = useId().replaceAll(":", "");
  const prefix = `${id}-${reactId}`;
  const noticeRef = useRef<HTMLDivElement>(null);
  const [submitState, setSubmitState] = useState<SubmitState>(INITIAL_SUBMIT_STATE);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    formState: { errors },
  } = useForm<ExtendedContactPayload>({
    resolver: zodResolver(extendedContactSchema),
    defaultValues: extendedContactDefaults(diagnosticSummary),
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  useEffect(() => {
    setValue("diagnosticSummary", diagnosticSummary, { shouldValidate: true });
  }, [diagnosticSummary, setValue]);

  useEffect(() => {
    if (
      (submitState.phase === "success" || submitState.phase === "error") &&
      submitState.focusNotice
    ) {
      noticeRef.current?.focus();
    }
  }, [submitState]);

  async function onSubmit(payload: ExtendedContactPayload) {
    setSubmitState({ phase: "submitting", message: "", focusNotice: false });
    const response = await postContact(payload);

    if (!response.ok) {
      let firstField = true;
      if (response.fieldErrors) {
        for (const [field, message] of Object.entries(response.fieldErrors)) {
          if (field in payload) {
            setError(
              field as keyof ExtendedContactPayload,
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

    reset(extendedContactDefaults());
    setSubmitState({ phase: "success", message: response.message, focusNotice: true });
  }

  return (
    <form
      className={`${styles.form} ${className ?? ""}`}
      id={id}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className={styles.header}>
        <p className={styles.eyebrow}>Detailed enquiry</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </header>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>About you</legend>
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
            label="Work email"
            registration={register("email")}
            type="email"
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
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>About the organisation</legend>
        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <FormInput
            autoComplete="organization"
            error={errors.company}
            id={`${prefix}-company`}
            label="Company or organisation"
            registration={register("company")}
            type="text"
          />
          <FormInput
            autoComplete="organization-title"
            error={errors.role}
            id={`${prefix}-role`}
            label="Your role"
            registration={register("role")}
            type="text"
          />
          <FormSelect
            error={errors.companySize}
            id={`${prefix}-size`}
            label="Team size"
            options={COMPANY_SIZE_OPTIONS}
            registration={register("companySize")}
          />
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>The situation</legend>
        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <FormSelect
            error={errors.service}
            id={`${prefix}-service`}
            label="Area of interest"
            options={SERVICE_OPTIONS}
            registration={register("service")}
          />
          <FormSelect
            error={errors.urgency}
            id={`${prefix}-urgency`}
            label="Timing"
            options={URGENCY_OPTIONS}
            registration={register("urgency")}
          />
        </div>
        <FormTextarea
          error={errors.currentSituation}
          helper="Describe the business issue, but do not name employees or share health information."
          id={`${prefix}-situation`}
          label="What is happening now?"
          large
          placeholder="Where does work slow down or return to leadership? What has the team tried?"
          registration={register("currentSituation")}
          rows={7}
        />
        <FormTextarea
          error={errors.desiredOutcome}
          id={`${prefix}-outcome`}
          label="What would be different if this worked well?"
          large
          placeholder="What should the team be able to decide or do differently?"
          registration={register("desiredOutcome")}
          rows={7}
        />
        <FormTextarea
          error={errors.referralSource}
          id={`${prefix}-referral`}
          label="How did you hear about Marc?"
          optional
          registration={register("referralSource")}
          rows={3}
        />
        <DiagnosticSummaryField summary={diagnosticSummary} />
        <input type="hidden" {...register("diagnosticSummary")} />
      </fieldset>

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
        <SubmitButton idleLabel="Send detailed enquiry" state={submitState} />
        <p className={styles.finePrint}>Your details are used to answer this enquiry and are not added to a mailing list.</p>
      </div>
    </form>
  );
}
