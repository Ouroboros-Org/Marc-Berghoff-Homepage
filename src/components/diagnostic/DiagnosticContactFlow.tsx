"use client";

import { QuickContactForm, type QuickContactFormProps } from "../forms";
import { useDiagnosticSummary } from "@/lib/use-diagnostic-summary";
import { BottleneckDiagnostic, type BottleneckDiagnosticProps } from "./BottleneckDiagnostic";
import styles from "./diagnostic.module.css";

export type DiagnosticContactFlowProps = {
  diagnosticProps?: Omit<
    BottleneckDiagnosticProps,
    "contactAnchorId" | "onUseSummary"
  >;
  contactProps?: Omit<QuickContactFormProps, "diagnosticSummary">;
  className?: string;
};

export function DiagnosticContactFlow({
  diagnosticProps,
  contactProps,
  className,
}: DiagnosticContactFlowProps) {
  const { summary, setSummary } = useDiagnosticSummary();
  const contactId = contactProps?.id ?? "diagnostic-quick-contact";

  return (
    <div className={`${styles.flow} ${className ?? ""}`}>
      <BottleneckDiagnostic
        {...diagnosticProps}
        contactAnchorId={contactId}
        onUseSummary={setSummary}
      />
      <div className={styles.formPanel}>
        <QuickContactForm
          {...contactProps}
          diagnosticSummary={summary}
          id={contactId}
          intro={
            contactProps?.intro ??
            "Add a short note. If you include the result above, I will receive the four scores with your message."
          }
          onRemoveDiagnosticSummary={() => setSummary("")}
        />
      </div>
    </div>
  );
}
