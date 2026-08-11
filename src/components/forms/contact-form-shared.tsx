import { AlertCircle, CheckCircle2, LoaderCircle, Send, X } from "lucide-react";
import { forwardRef } from "react";

import { Button } from "@/components/button";
import type { SiteLocale } from "@/config/routes";

import type { ContactApiResponse } from "../../lib/contact-api";
import styles from "./contact-forms.module.css";

export {
  COMPANY_SIZE_OPTIONS,
  SERVICE_OPTIONS,
  URGENCY_OPTIONS,
} from "../../lib/contact-schema";

export type SubmitState = {
  phase: "idle" | "submitting" | "success" | "error";
  message: string;
  focusNotice: boolean;
};

export const INITIAL_SUBMIT_STATE: SubmitState = {
  phase: "idle",
  message: "",
  focusNotice: false,
};

function localizeResponse(
  response: ContactApiResponse,
  locale: SiteLocale,
): ContactApiResponse {
  if (locale !== "de") return response;

  if (response.ok) {
    return { ok: true, message: "Danke. Ihre Nachricht ist angekommen." };
  }

  type ContactApiErrorCode = Extract<
    ContactApiResponse,
    { ok: false }
  >["code"];

  const messages: Record<ContactApiErrorCode, string> = {
    INVALID_CONTENT_TYPE: "Die Anfrage konnte nicht gesendet werden. Bitte laden Sie die Seite neu und versuchen Sie es noch einmal.",
    PAYLOAD_TOO_LARGE: "Die Anfrage ist zu lang. Kürzen Sie die längeren Antworten und versuchen Sie es noch einmal.",
    INVALID_JSON: "Die Anfrage konnte nicht gelesen werden. Bitte laden Sie die Seite neu und versuchen Sie es noch einmal.",
    VALIDATION_ERROR: "Prüfen Sie die markierten Felder und versuchen Sie es noch einmal.",
    SUBMISSION_REJECTED: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es noch einmal.",
    FORM_NOT_CONFIGURED: "Das Kontaktformular ist noch nicht verbunden. Schreiben Sie bitte vorerst eine E-Mail.",
    UPSTREAM_ERROR: "Die Nachricht konnte gerade nicht gesendet werden. Warten Sie einen Moment und versuchen Sie es noch einmal.",
  };

  const fieldErrors = response.fieldErrors
    ? Object.fromEntries(
        Object.keys(response.fieldErrors).map((field) => [
          field,
          "Prüfen Sie bitte Ihre Angabe in diesem Feld.",
        ]),
      )
    : undefined;

  return {
    ...response,
    message: messages[response.code],
    ...(fieldErrors ? { fieldErrors } : {}),
  };
}

export async function postContact(
  payload: unknown,
  locale: SiteLocale = "en",
): Promise<ContactApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as ContactApiResponse;

    if (!response.ok && body.ok) {
      return localizeResponse({
        ok: false,
        code: "UPSTREAM_ERROR",
        message: "The message could not be sent. Please try again.",
      }, locale);
    }

    return localizeResponse(body, locale);
  } catch {
    return localizeResponse({
      ok: false,
      code: "UPSTREAM_ERROR",
      message: "The connection was interrupted. Check your connection and try again.",
    }, locale);
  }
}

export const SubmitNotice = forwardRef<HTMLDivElement, { state: SubmitState }>(
  function SubmitNotice({ state }, ref) {
    if (state.phase !== "success" && state.phase !== "error") return null;

    const success = state.phase === "success";
    return (
      <div
        aria-live={success ? "polite" : "assertive"}
        className={`${styles.notice} ${
          success ? styles.noticeSuccess : styles.noticeError
        }`}
        ref={ref}
        role={success ? "status" : "alert"}
        tabIndex={-1}
      >
        {success ? (
          <CheckCircle2 aria-hidden="true" size={19} strokeWidth={2} />
        ) : (
          <AlertCircle aria-hidden="true" size={19} strokeWidth={2} />
        )}
        <p>{state.message}</p>
      </div>
    );
  },
);

export function SubmitButton({
  state,
  idleLabel = "Send message",
  submittingLabel = "Sending…",
}: {
  state: SubmitState;
  idleLabel?: string;
  submittingLabel?: string;
}) {
  const submitting = state.phase === "submitting";
  return (
    <Button cta disabled={submitting} type="submit">
      {submitting ? (
        <LoaderCircle aria-hidden="true" className={styles.spinner} size={18} />
      ) : (
        <Send aria-hidden="true" size={17} />
      )}
      {submitting ? submittingLabel : idleLabel}
    </Button>
  );
}

export function DiagnosticSummaryField({
  summary,
  onRemove,
  locale = "en",
}: {
  summary: string;
  onRemove?: () => void;
  locale?: SiteLocale;
}) {
  if (!summary) return null;

  return (
    <div
      aria-live="polite"
      className={styles.summary}
      data-diagnostic-summary
      role="status"
      tabIndex={-1}
    >
      <div className={styles.summaryHeader}>
        <p className={styles.summaryLabel}>
          {locale === "de"
            ? "Ergebnis des Zehn-Aussagen-Checks angehängt"
            : "Ten-statement check result attached"}
        </p>
        {onRemove ? (
          <Button
            aria-label={
              locale === "de"
                ? "Ergebnis des Zehn-Aussagen-Checks aus dieser Nachricht entfernen"
                : "Remove ten-statement check result from this message"
            }
            onClick={onRemove}
            size="compact"
            variant="ghost"
          >
            <X aria-hidden="true" size={15} />
            {locale === "de" ? "Entfernen" : "Remove"}
          </Button>
        ) : null}
      </div>
      <p className={styles.summaryText}>{summary}</p>
    </div>
  );
}
