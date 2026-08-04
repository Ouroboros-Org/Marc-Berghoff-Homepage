import type { ReactNode } from "react";
import { Check } from "lucide-react";

import { Breadcrumbs, type BreadcrumbItem } from "@/components/breadcrumbs";
import { ButtonLink, type ButtonVariant } from "@/components/button";

import styles from "./secondary-pages.module.css";

type PageHeroProps = {
  compact?: boolean;
  eyebrow?: string;
  title: string;
  lead: string;
  asideLabel?: string;
  asideValue?: string;
  asideNote?: string;
  primary?: { label: string; href: string; variant?: ButtonVariant };
  ctaPrimary?: boolean;
  secondary?: { label: string; href: string; variant?: ButtonVariant };
  ctaSecondary?: boolean;
  breadcrumbs?: readonly BreadcrumbItem[];
};

export function PageHero({
  compact = false,
  eyebrow,
  title,
  lead,
  asideLabel,
  asideValue,
  asideNote,
  primary,
  ctaPrimary,
  secondary,
  ctaSecondary,
  breadcrumbs,
}: PageHeroProps) {
  return (
    <header className={`${styles.hero} ${compact ? styles.heroCompact : ""}`}>
      {breadcrumbs?.length ? (
        <div className={styles.container}>
          <Breadcrumbs className={styles.heroBreadcrumbs} items={breadcrumbs} />
        </div>
      ) : null}
      <div className={`${styles.container} ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroLead}>{lead}</p>
          {(primary || secondary) && (
            <div className={styles.buttonRow}>
              {primary && (
                <ButtonLink cta={ctaPrimary ?? false} href={primary.href} variant={primary.variant ?? "primary"}>
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink cta={ctaSecondary ?? false} href={secondary.href} variant={secondary.variant ?? "secondary"}>
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
        </div>
        {asideLabel && asideValue && (
          <aside className={styles.heroAside} aria-label={`${asideLabel}: ${asideValue}`}>
            <p className={styles.heroAsideLabel}>{asideLabel}</p>
            <p className={styles.heroAsideValue}>{asideValue}</p>
            {asideNote ? <p className={styles.heroAsideNote}>{asideNote}</p> : null}
          </aside>
        )}
      </div>
    </header>
  );
}

type SectionHeadingProps = {
  id?: string;
  kicker?: string;
  title: string;
  intro?: string;
};

export function SectionHeading({ id, kicker, title, intro }: SectionHeadingProps) {
  return (
    <div className={styles.sectionHeader}>
      {kicker && <p className={styles.sectionKicker}>{kicker}</p>}
      <h2 className={styles.sectionTitle} id={id}>{title}</h2>
      {intro && <p className={styles.sectionIntro}>{intro}</p>}
    </div>
  );
}

export function PlainList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.plainList}>
      {items.map((item) => (
        <li className={styles.plainListItem} key={item}>
          <span className={styles.plainListMarker} aria-hidden="true">
            <Check size={13} strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.checkList}>
      {items.map((item) => (
        <li className={styles.checkListItem} key={item}>
          <Check className={styles.checkIcon} aria-hidden="true" size={19} strokeWidth={2} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProcessList({
  steps,
}: {
  steps: readonly { title: string; description: string }[];
}) {
  return (
    <ol className={styles.processList}>
      {steps.map((step) => (
        <li className={styles.processItem} key={step.title}>
          <span className={styles.stepNumber} aria-hidden="true" />
          <div className={styles.processContent}>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Evidence({ label, children }: { label: string; children: ReactNode }) {
  return (
    <aside className={styles.evidence}>
      <p className={styles.evidenceLabel}>{label}</p>
      <p className={styles.evidenceText}>{children}</p>
    </aside>
  );
}

export function ContactBand({
  title,
  text,
  href = "/contact",
  label = "Request a conversation",
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <aside className={styles.contactBand} aria-label="Next step">
      <div className={`${styles.container} ${styles.contactBandGrid}`}>
        <div>
          <h2 className={styles.contactBandTitle}>{title}</h2>
          <p className={styles.contactBandText}>{text}</p>
        </div>
        <ButtonLink cta href={href} variant="inverse">
          {label}
        </ButtonLink>
      </div>
    </aside>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <ButtonLink href={href} variant="text">
      {children}
    </ButtonLink>
  );
}

export { styles as secondaryPageStyles };
