"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";

import { BottleneckDiagnostic } from "@/components/diagnostic";
import { QuickContactForm } from "@/components/forms";
import { useDiagnosticSummary } from "@/lib/use-diagnostic-summary";

const HomeDiagnosticContext = createContext<{
  summary: string;
  setSummary: (summary: string) => void;
} | null>(null);

export function HomeContactJourney({ children }: { children: ReactNode }) {
  const { summary, setSummary } = useDiagnosticSummary();
  const value = useMemo(() => ({ summary, setSummary }), [summary, setSummary]);

  return (
    <HomeDiagnosticContext.Provider value={value}>
      {children}
    </HomeDiagnosticContext.Provider>
  );
}

function useHomeDiagnostic() {
  const value = useContext(HomeDiagnosticContext);
  if (!value) throw new Error("Home diagnostic components require HomeContactJourney.");
  return value;
}

export function HomeBottleneckDiagnostic() {
  const { setSummary } = useHomeDiagnostic();

  return (
    <BottleneckDiagnostic
      contactAnchorId="home-quick-contact"
      intro="Answer from the last few weeks, including the awkward days."
      introOnly
      onUseSummary={setSummary}
    />
  );
}

export function HomeQuickContactForm() {
  const { summary, setSummary } = useHomeDiagnostic();

  return (
    <QuickContactForm
      diagnosticSummary={summary}
      id="home-quick-contact"
      onRemoveDiagnosticSummary={() => setSummary("")}
    />
  );
}
