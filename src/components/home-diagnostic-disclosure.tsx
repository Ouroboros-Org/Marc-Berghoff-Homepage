"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { HomeBottleneckDiagnostic } from "@/components/home-contact-journey";

import styles from "@/app/home.module.css";

export function HomeDiagnosticDisclosure() {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shouldOpen =
      window.location.hash === "#diagnostic" ||
      new URLSearchParams(window.location.search).get("check") === "open";

    if (!shouldOpen) return;
    window.requestAnimationFrame(() => {
      setOpen(true);
      window.requestAnimationFrame(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, []);

  return (
    <details
      className={styles.diagnosticDisclosure}
      id="diagnostic"
      onToggle={(event) => setOpen(event.currentTarget.open)}
      open={open}
      ref={detailsRef}
    >
      <summary className={styles.diagnosticSummary}>
        <span>
          <strong>Run the six-question check</strong>
          <small>Use it when the cause is unclear</small>
        </span>
        <ChevronDown aria-hidden="true" className={styles.diagnosticChevron} size={24} />
      </summary>
      <div className={styles.diagnosticBody}>
        <HomeBottleneckDiagnostic />
      </div>
    </details>
  );
}
