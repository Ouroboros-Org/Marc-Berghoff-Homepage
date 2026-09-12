import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button";
import { StructuredData } from "@/components/structured-data";
import type { SiteLocale } from "@/config/routes";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { ENGAGEMENTS, type Engagement, type EngagementId } from "@/content/engagements";

import styles from "./service-pages.module.css";

export function getEngagement(id: EngagementId): Engagement {
  const engagement = ENGAGEMENTS.find((item) => item.id === id);
  if (!engagement) throw new Error(`Missing engagement: ${id}`);
  return engagement;
}

export function ServiceStructuredData({
  href,
  name,
  description,
}: {
  locale: SiteLocale;
  href: string;
  name: string;
  description: string;
}) {
  const siteUrl = getSiteUrl();

  return (
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        inLanguage: "en-GB",
        url: `${siteUrl}${href}`,
        provider: { "@id": `${siteUrl}/#marc-berghoff` },
        areaServed: "Europe",
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Founders and leadership teams in growing companies",
        },
      }}
    />
  );
}

export function ServiceHero({
  locale,
  breadcrumb,
  eyebrow,
  title,
  lead,
  aside,
  secondary = { href: "/services", label: "Explore the engagements" },
}: {
  locale: SiteLocale;
  breadcrumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  aside?: { label: string; value: string; note: string };
  secondary?: { href: string; label: string; helper?: string; variant?: "secondary" | "accent" };
}) {
  const contactAction = getPrimaryContactAction(locale);

  return (
    <header className={styles.hero}>
      <div className={styles.container}>
        <Breadcrumbs
          className={styles.breadcrumbs}
          items={[
            ...(breadcrumb === "Services" ? [] : [{ label: "Services", href: "/services" }]),
            { label: breadcrumb },
          ]}
          locale={locale}
        />
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroLead}>{lead}</p>
            <div className={styles.actions}>
              <div>
                <ButtonLink href={contactAction.href}>Book a call</ButtonLink>
                <p className={styles.helper}>Free introduction · typically 30 minutes</p>
              </div>
              <div>
                <ButtonLink href={secondary.href} variant={secondary.variant ?? "secondary"}>{secondary.label}</ButtonLink>
                {secondary.helper ? <p className={styles.helper}>{secondary.helper}</p> : null}
              </div>
            </div>
          </div>
          {aside ? (
            <aside className={styles.heroAside}>
              <p className={styles.eyebrow}>{aside.label}</p>
              <p className={styles.asideValue}>{aside.value}</p>
              <p className={styles.asideNote}>{aside.note}</p>
            </aside>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export function EngagementDetails({ engagement }: { engagement: Engagement }) {
  return (
    <dl className={styles.scopeDetails}>
      <div>
        <dt>What you receive</dt>
        <dd>
          <ul className={styles.receiveList}>
            {engagement.receives.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </dd>
      </div>
      <div>
        <dt>Before we start</dt>
        <dd>{engagement.readiness}</dd>
      </div>
      <div>
        <dt>Where the work leads</dt>
        <dd>{engagement.boundary}</dd>
      </div>
    </dl>
  );
}

export function CompactProcess({
  id,
}: {
  locale: SiteLocale;
  id: string;
}) {
  return (
    <section className={styles.compactProcess} aria-labelledby={id}>
      <div className={styles.container}>
        <h2 id={id}>A conversation first. An agreed scope before we start.</h2>
        <p>We agree the work, the fee and when to review it. If I am not the right person, I will say so.</p>
        <ButtonLink href="/services#process" variant="text">How the work begins</ButtonLink>
      </div>
    </section>
  );
}

export function AdjacentServiceLinks({
  id,
  links,
}: {
  locale: SiteLocale;
  id: string;
  links: readonly { href: string; label: string; text: string }[];
}) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <div className={styles.container}>
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Another starting point</p>
          <h2 className={styles.sectionTitle} id={id}>Match the support to the question.</h2>
        </div>
        <div className={styles.relatedGrid}>
          {links.map((item) => (
            <Link className={styles.relatedLink} href={item.href} key={item.href}>
              <div>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </div>
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceClosing({
  locale,
  title,
  text,
}: {
  locale: SiteLocale;
  title: string;
  text: string;
}) {
  return (
    <aside className={styles.closing} aria-label="Next step">
      <div className={styles.container}>
        <p className={styles.eyebrow}>Start wherever you are</p>
        <h2>{title}</h2>
        <p className={styles.closingText}>{text}</p>
        <ButtonLink href={getPrimaryContactAction(locale).href} variant="inverse">Book a call</ButtonLink>
        <p className={styles.helper}>Free introduction · typically 30 minutes</p>
      </div>
    </aside>
  );
}
