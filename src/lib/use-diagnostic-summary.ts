"use client";

import { useCallback, useSyncExternalStore } from "react";

const DIAGNOSTIC_SUMMARY_KEY = "marc-berghoff:diagnostic-summary";
const DIAGNOSTIC_SUMMARY_EVENT = "marc-berghoff:diagnostic-summary-change";
let memorySummary = "";

function getSummarySnapshot() {
  try {
    return window.sessionStorage.getItem(DIAGNOSTIC_SUMMARY_KEY) ?? memorySummary;
  } catch {
    return memorySummary;
  }
}

function subscribeToSummary(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DIAGNOSTIC_SUMMARY_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DIAGNOSTIC_SUMMARY_EVENT, onStoreChange);
  };
}

export function useDiagnosticSummary() {
  const summary = useSyncExternalStore(
    subscribeToSummary,
    getSummarySnapshot,
    () => "",
  );

  const setSummary = useCallback((nextSummary: string) => {
    memorySummary = nextSummary;
    try {
      if (nextSummary) {
        window.sessionStorage.setItem(DIAGNOSTIC_SUMMARY_KEY, nextSummary);
      } else {
        window.sessionStorage.removeItem(DIAGNOSTIC_SUMMARY_KEY);
      }
    } catch {
      // Session storage can be blocked; the module-level snapshot remains usable.
    }
    window.dispatchEvent(new Event(DIAGNOSTIC_SUMMARY_EVENT));
  }, []);

  return { summary, setSummary };
}
