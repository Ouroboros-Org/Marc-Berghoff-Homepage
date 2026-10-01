"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { siteConfig } from "@/config/site";
import type { ContactApiResponse } from "@/lib/contact-api";
import { PEER_ADVISORY_OPT_IN, PEER_ADVISORY_SUCCESS, peerAdvisoryDefaults, peerAdvisorySchema, type PeerAdvisoryRegistration } from "@/lib/peer-advisory-schema";

import { INITIAL_SUBMIT_STATE, SubmitButton, SubmitNotice, type SubmitState } from "./contact-form-shared";
import { BotTrapFields, FormInput, FormTextarea } from "./form-controls";
import styles from "./contact-forms.module.css";

export function PeerAdvisoryForm() {
  const noticeRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SubmitState>(INITIAL_SUBMIT_STATE);
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<PeerAdvisoryRegistration>({
    resolver: zodResolver(peerAdvisorySchema),
    defaultValues: peerAdvisoryDefaults(),
    mode: "onBlur",
  });
  useEffect(() => {
    if (state.focusNotice) noticeRef.current?.focus();
  }, [state]);

  async function onSubmit(values: PeerAdvisoryRegistration) {
    setState({ phase: "submitting", message: "", focusNotice: false });
    try {
      const response = await fetch("/api/european-peer-advisory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body: ContactApiResponse = await response.json();
      if (!response.ok || body.ok !== true) {
        if (!body.ok && body.fieldErrors) {
          for (const [field, message] of Object.entries(body.fieldErrors)) {
            if (field in values) setError(field as keyof PeerAdvisoryRegistration, { type: "server", message });
          }
        }
        throw new Error("Registration was not saved.");
      }
      reset(peerAdvisoryDefaults());
      setState({ phase: "success", message: PEER_ADVISORY_SUCCESS, focusNotice: true });
    } catch {
      setState({ phase: "error", message: `Your interest hasn’t been registered yet. Please try again, or email ${siteConfig.contact.email}.`, focusNotice: true });
    }
  }

  return (
    <form className={styles.form} aria-label="European peer-advisory interest" aria-busy={state.phase === "submitting"} noValidate onSubmit={handleSubmit(onSubmit)}>
      <fieldset className={styles.group} disabled={state.phase === "submitting"}>
        <legend className={styles.legend}>Your interest in the European group</legend>
        <div className={`${styles.grid} ${styles.gridTwo}`}>
          <FormInput autoComplete="name" id="peer-name" label="Name" registration={register("fullName")} error={errors.fullName} />
          <FormInput autoComplete="email" type="email" id="peer-email" label="Email" registration={register("email")} error={errors.email} />
          <FormInput autoComplete="organization" id="peer-company" label="Company" registration={register("company")} error={errors.company} />
          <FormInput autoComplete="country-name" id="peer-country" label="Country" registration={register("country")} error={errors.country} />
        </div>
        <FormTextarea id="peer-expectations" label="What would you value from a peer group?" optional rows={4} registration={register("expectations")} error={errors.expectations} />
        <div className={styles.checkboxField}>
          <label className={styles.checkboxLabel} htmlFor="peer-consent">
            <input {...register("consent")} type="checkbox" id="peer-consent" className={styles.checkbox} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? "peer-consent-error" : undefined} />
            <span>{PEER_ADVISORY_OPT_IN}</span>
          </label>
          {errors.consent ? <p id="peer-consent-error" className={styles.error} role="alert">{errors.consent.message}</p> : null}
        </div>
      </fieldset>
      <BotTrapFields prefix="peer" startedAtRegistration={register("startedAt", { valueAsNumber: true })} websiteRegistration={register("website")} />
      <SubmitNotice ref={noticeRef} state={state} />
      <div className={styles.actions}>
        <SubmitButton idleLabel="Join the European waitlist" submittingLabel="Registering…" state={state} />
        <p className={styles.finePrint}>We’ll use these details to follow up about this group. See the <Link href="/privacy">privacy notice</Link> for how your information is handled.</p>
        {state.phase === "error" ? <a href={`mailto:${siteConfig.contact.email}`}>Email {siteConfig.contact.email}</a> : null}
      </div>
    </form>
  );
}
