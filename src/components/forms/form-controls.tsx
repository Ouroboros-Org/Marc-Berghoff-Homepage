import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import Link from "next/link";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import type { SiteLocale } from "@/config/routes";

import styles from "./contact-forms.module.css";

type SharedFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
  optionalLabel?: string;
  helper?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
};

function describedBy(id: string, helper?: string, error?: FieldError) {
  return [helper ? `${id}-help` : "", error ? `${id}-error` : ""]
    .filter(Boolean)
    .join(" ") || undefined;
}

function FieldMeta({ id, helper, error }: Pick<SharedFieldProps, "id" | "helper" | "error">) {
  return (
    <>
      {helper ? (
        <p className={styles.helper} id={`${id}-help`}>
          {helper}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error.message}
        </p>
      ) : null}
    </>
  );
}

function FieldLabel({
  id,
  label,
  optional,
  optionalLabel = "optional",
}: Pick<SharedFieldProps, "id" | "label" | "optional" | "optionalLabel">) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label}{" "}
      {optional ? <span className={styles.optional}>({optionalLabel})</span> : null}
    </label>
  );
}

export function FormInput({
  id,
  label,
  optional,
  optionalLabel,
  helper,
  error,
  registration,
  ...inputProps
}: SharedFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">) {
  return (
    <div className={styles.field}>
      <FieldLabel
        id={id}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
      />
      <input
        {...inputProps}
        {...registration}
        aria-describedby={describedBy(id, helper, error)}
        aria-invalid={Boolean(error)}
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        id={id}
      />
      <FieldMeta id={id} helper={helper} error={error} />
    </div>
  );
}

export type SelectOption = { value: string; label: string };

export function FormSelect({
  id,
  label,
  optional,
  optionalLabel,
  helper,
  error,
  registration,
  options,
  ...selectProps
}: SharedFieldProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "id" | "name"> & {
    options: SelectOption[];
  }) {
  return (
    <div className={styles.field}>
      <FieldLabel
        id={id}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
      />
      <select
        {...selectProps}
        {...registration}
        aria-describedby={describedBy(id, helper, error)}
        aria-invalid={Boolean(error)}
        className={`${styles.select} ${error ? styles.invalid : ""}`}
        id={id}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMeta id={id} helper={helper} error={error} />
    </div>
  );
}

export function FormTextarea({
  id,
  label,
  optional,
  optionalLabel,
  helper,
  error,
  registration,
  large = false,
  ...textareaProps
}: SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name"> & {
    large?: boolean;
  }) {
  return (
    <div className={styles.field}>
      <FieldLabel
        id={id}
        label={label}
        optional={optional}
        optionalLabel={optionalLabel}
      />
      <textarea
        {...textareaProps}
        {...registration}
        aria-describedby={describedBy(id, helper, error)}
        aria-invalid={Boolean(error)}
        className={`${styles.textarea} ${large ? styles.textareaLarge : ""} ${
          error ? styles.invalid : ""
        }`}
        id={id}
      />
      <FieldMeta id={id} helper={helper} error={error} />
    </div>
  );
}

export function ConsentField({
  id,
  error,
  registration,
  locale = "en",
}: {
  id: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
  locale?: SiteLocale;
}) {
  const isGerman = locale === "de";

  return (
    <div className={styles.checkboxField}>
      <label className={styles.checkboxLabel} htmlFor={id}>
        <input
          {...registration}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
          className={styles.checkbox}
          id={id}
          type="checkbox"
        />
        <span>
          {isGerman ? (
            <>
              Ich bin damit einverstanden, dass Marc diese Angaben verwendet, um
              meine Anfrage zu beantworten. Wie die Daten verarbeitet werden, steht
              in der <Link href="/de/datenschutz">Datenschutzerklärung</Link>.
            </>
          ) : (
            <>
              I agree that Marc may use these details to respond to my enquiry. See
              the <Link href="/privacy">privacy notice</Link> for how the information is
              handled.
            </>
          )}
        </span>
      </label>
      {error ? (
        <p className={styles.error} id={`${id}-error`} role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

export function BotTrapFields({
  websiteRegistration,
  startedAtRegistration,
  prefix,
  locale = "en",
}: {
  websiteRegistration: UseFormRegisterReturn;
  startedAtRegistration: UseFormRegisterReturn;
  prefix: string;
  locale?: SiteLocale;
}) {
  return (
    <>
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor={`${prefix}-website`}>
          {locale === "de" ? "Dieses Feld leer lassen" : "Leave this field empty"}
        </label>
        <input
          {...websiteRegistration}
          autoComplete="off"
          id={`${prefix}-website`}
          tabIndex={-1}
          type="text"
        />
      </div>
      <input {...startedAtRegistration} type="hidden" />
    </>
  );
}
