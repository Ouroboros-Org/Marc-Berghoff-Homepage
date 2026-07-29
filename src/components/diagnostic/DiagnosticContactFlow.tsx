"use client";

import { useState } from "react";

import { QuickContactForm, type QuickContactFormProps } from "../forms";
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
  const [summary, setSummary] = useState("");
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
            "Add a short note. If you include the result above, Marc will receive the four scores with your message."
          }
        />
      </div>
    </div>
  );
}
