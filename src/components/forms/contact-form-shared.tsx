import { AlertCircle, CheckCircle2, LoaderCircle, Send, X } from "lucide-react";
import { forwardRef } from "react";

import { Button } from "@/components/button";

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

export async function postContact(payload: unknown): Promise<ContactApiResponse> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = (await response.json()) as ContactApiResponse;

    if (!response.ok && body.ok) {
      return {
        ok: false,
        code: "UPSTREAM_ERROR",
        message: "The message could not be sent. Please try again.",
      };
    }

    return body;
  } catch {
    return {
      ok: false,
      code: "UPSTREAM_ERROR",
      message: "The connection was interrupted. Check your connection and try again.",
    };
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
}: {
  state: SubmitState;
  idleLabel?: string;
}) {
  const submitting = state.phase === "submitting";
  return (
    <Button cta disabled={submitting} type="submit">
      {submitting ? (
        <LoaderCircle aria-hidden="true" className={styles.spinner} size={18} />
      ) : (
        <Send aria-hidden="true" size={17} />
      )}
      {submitting ? "Sending…" : idleLabel}
    </Button>
  );
}

export function DiagnosticSummaryField({
  summary,
  onRemove,
}: {
  summary: string;
  onRemove?: () => void;
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
        <p className={styles.summaryLabel}>Assessment result attached</p>
        {onRemove ? (
          <Button
            aria-label="Remove assessment result from this message"
            onClick={onRemove}
            size="compact"
            variant="ghost"
          >
            <X aria-hidden="true" size={15} />
            Remove
          </Button>
        ) : null}
      </div>
      <p className={styles.summaryText}>{summary}</p>
    </div>
  );
}
