"use client";

import type { ReactNode } from "react";

import { BottleneckDiagnostic } from "@/components/diagnostic";
import type { DiagnosticLocale } from "@/components/diagnostic/diagnostic-copy";
import { QuickContactForm } from "@/components/forms";

export function HomeContactJourney({ children }: { children: ReactNode }) {
  return children;
}

export function HomeBottleneckDiagnostic({
  locale = "en",
}: {
  locale?: DiagnosticLocale;
}) {
  return <BottleneckDiagnostic locale={locale} />;
}

export function HomeQuickContactForm() {
  return <QuickContactForm id="home-quick-contact" />;
}
