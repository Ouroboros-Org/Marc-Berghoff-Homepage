"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";

import styles from "./diagnostic-disclosure.module.css";

type DiagnosticDisclosureProps = {
  children: ReactNode;
  id: string;
  intro: string;
  label: string;
  title: string;
};

export function DiagnosticDisclosure({
  children,
  id,
  intro,
  label,
  title,
}: DiagnosticDisclosureProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shouldOpen =
      window.location.hash === `#${id}` ||
      new URLSearchParams(window.location.search).get("check") === "open";

    if (!shouldOpen) return;

    window.requestAnimationFrame(() => {
      setOpen(true);
      window.requestAnimationFrame(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }, [id]);

  return (
    <details
      className={styles.disclosure}
      id={id}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      open={open}
      ref={detailsRef}
    >
      <summary className={styles.summary}>
        <span>
          <small>{label}</small>
          <strong>{title}</strong>
          <span>{intro}</span>
        </span>
        <ChevronDown aria-hidden="true" className={styles.chevron} size={24} />
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
