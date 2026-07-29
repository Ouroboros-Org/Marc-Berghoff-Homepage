"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import {
  quickContactDefaults,
  type QuickContactPayload,
  quickContactSchema,
} from "../../lib/contact-schema";
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
  FormTextarea,
} from "./form-controls";

export type QuickContactFormProps = {
  id?: string;
  title?: string;
  intro?: string;
  diagnosticSummary?: string;
  onRemoveDiagnosticSummary?: () => void;
  className?: string;
};

export function QuickContactForm({
  id = "quick-contact",
  title = "Send Marc a message.",
  intro = "Your name, email and a short note are enough. Marc reads each message and replies himself.",
  diagnosticSummary = "",
  onRemoveDiagnosticSummary,
  className,
}: QuickContactFormProps) {
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
  } = useForm<QuickContactPayload>({
    resolver: zodResolver(quickContactSchema),
    defaultValues: quickContactDefaults(diagnosticSummary),
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

  async function onSubmit(payload: QuickContactPayload) {
    setSubmitState({ phase: "submitting", message: "", focusNotice: false });
    const response = await postContact(payload);

    if (!response.ok) {
      let firstField = true;
      if (response.fieldErrors) {
        for (const [field, message] of Object.entries(response.fieldErrors)) {
          if (field in payload) {
            setError(
              field as keyof QuickContactPayload,
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

    reset(quickContactDefaults());
    onRemoveDiagnosticSummary?.();
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
        <p className={styles.eyebrow}>Quick message</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </header>

      <DiagnosticSummaryField
        onRemove={onRemoveDiagnosticSummary}
        summary={diagnosticSummary}
      />

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
          helper="Please do not include sensitive personal or employee information."
          id={`${prefix}-message`}
          label="Message"
          placeholder="What would you like Marc to know?"
          registration={register("message")}
          rows={6}
        />
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
        <SubmitButton state={submitState} />
        <p className={styles.finePrint}>Your details are used to answer this enquiry and are not added to a mailing list.</p>
      </div>
    </form>
  );
}
