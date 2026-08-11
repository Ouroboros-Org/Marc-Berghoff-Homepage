"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./locale-switcher.module.css";

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/de") return null;

  const isGerman = pathname === "/de";
  const href = isGerman ? "/" : "/de";
  const label = isGerman ? "EN" : "DE";
  const language = isGerman ? "en" : "de";
  const fullLabel = isGerman ? "Switch to English" : "Zur deutschen Seite wechseln";

  return (
    <Link
      aria-label={fullLabel}
      className={`${styles.switcher} ${className}`}
      href={href}
      hrefLang={language}
      lang={language}
    >
      {label}
    </Link>
  );
}
