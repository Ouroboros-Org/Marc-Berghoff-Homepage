import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import styles from "./contact-forms.module.css";

type SharedFieldProps = {
  id: string;
  label: string;
  optional?: boolean;
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
}: Pick<SharedFieldProps, "id" | "label" | "optional">) {
  return (
    <label className={styles.label} htmlFor={id}>
      {label} {optional ? <span className={styles.optional}>(optional)</span> : null}
    </label>
  );
}

export function FormInput({
  id,
  label,
  optional,
  helper,
  error,
  registration,
  ...inputProps
}: SharedFieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name">) {
  return (
    <div className={styles.field}>
      <FieldLabel id={id} label={label} optional={optional} />
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
      <FieldLabel id={id} label={label} optional={optional} />
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
      <FieldLabel id={id} label={label} optional={optional} />
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
}: {
  id: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}) {
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
          I agree that Marc may use these details to respond to my enquiry. See the{" "}
          <a href="/privacy">privacy notice</a> for how the information is handled.
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
}: {
  websiteRegistration: UseFormRegisterReturn;
  startedAtRegistration: UseFormRegisterReturn;
  prefix: string;
}) {
  return (
    <>
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor={`${prefix}-website`}>Leave this field empty</label>
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

