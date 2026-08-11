"use client";

import { QuickContactForm, type QuickContactFormProps } from "../forms";
import { BottleneckDiagnostic, type BottleneckDiagnosticProps } from "./BottleneckDiagnostic";
import styles from "./diagnostic.module.css";

export type DiagnosticContactFlowProps = {
  diagnosticProps?: BottleneckDiagnosticProps;
  contactProps?: QuickContactFormProps;
  className?: string;
};

export function DiagnosticContactFlow({
  diagnosticProps,
  contactProps,
  className,
}: DiagnosticContactFlowProps) {
  const contactId = contactProps?.id ?? "diagnostic-quick-contact";

  return (
    <div className={`${styles.flow} ${className ?? ""}`}>
      <BottleneckDiagnostic
        {...diagnosticProps}
      />
      <div className={styles.formPanel}>
        <QuickContactForm
          {...contactProps}
          id={contactId}
          intro={
            contactProps?.intro ??
            "Add a short note if there is anything else Marc should know."
          }
        />
      </div>
    </div>
  );
}
