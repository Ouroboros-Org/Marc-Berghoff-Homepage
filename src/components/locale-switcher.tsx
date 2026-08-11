"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getAlternateLocaleHref } from "@/config/routes";

import styles from "./locale-switcher.module.css";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  const alternate = getAlternateLocaleHref(pathname);

  if (!alternate) return null;

  const isGermanDestination = alternate.locale === "de";
  const label = isGermanDestination ? "DE" : "EN";
  const fullLabel = isGermanDestination
    ? "Zur deutschen Version dieser Seite wechseln"
    : "Switch to the English version of this page";

  return (
    <Link
      aria-label={fullLabel}
      className={`${styles.switcher} ${className}`}
      href={alternate.href}
      hrefLang={alternate.locale}
      lang={alternate.locale}
    >
      {label}
    </Link>
  );
}
