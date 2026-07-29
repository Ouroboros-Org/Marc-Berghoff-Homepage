"use client";

import { createContext, type ReactNode, useContext, useMemo, useState } from "react";

import { BottleneckDiagnostic } from "@/components/diagnostic";
import { QuickContactForm } from "@/components/forms";

const HomeDiagnosticContext = createContext<{
  summary: string;
  setSummary: (summary: string) => void;
} | null>(null);

export function HomeContactJourney({ children }: { children: ReactNode }) {
  const [summary, setSummary] = useState("");
  const value = useMemo(() => ({ summary, setSummary }), [summary]);

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
      intro="Answer from the last few weeks, including the days when work became awkward."
      onUseSummary={setSummary}
      title="Six questions about how work moves."
    />
  );
}

export function HomeQuickContactForm() {
  const { summary } = useHomeDiagnostic();

  return (
    <QuickContactForm
      diagnosticSummary={summary}
      id="home-quick-contact"
    />
  );
}
