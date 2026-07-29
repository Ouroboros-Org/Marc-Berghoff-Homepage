"use client";

import { useDiagnosticSummary } from "@/lib/use-diagnostic-summary";

import {
  ExtendedContactForm,
  type ExtendedContactFormProps,
} from "./ExtendedContactForm";
import { QuickContactForm, type QuickContactFormProps } from "./QuickContactForm";

export function SessionQuickContactForm(
  props: Omit<
    QuickContactFormProps,
    "diagnosticSummary" | "onRemoveDiagnosticSummary"
  >,
) {
  const { summary, setSummary } = useDiagnosticSummary();

  return (
    <QuickContactForm
      {...props}
      diagnosticSummary={summary}
      onRemoveDiagnosticSummary={() => setSummary("")}
    />
  );
}

export function SessionExtendedContactForm(
  props: Omit<
    ExtendedContactFormProps,
    "diagnosticSummary" | "onRemoveDiagnosticSummary"
  >,
) {
  const { summary, setSummary } = useDiagnosticSummary();

  return (
    <ExtendedContactForm
      {...props}
      diagnosticSummary={summary}
      onRemoveDiagnosticSummary={() => setSummary("")}
    />
  );
}

