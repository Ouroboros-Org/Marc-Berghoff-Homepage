import type { Metadata } from "next";

import { LEGAL_DETAILS } from "@/app/(en)/privacy/legal-details";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/config/metadata";
import styles from "@/components/pages/utility-pages.module.css";

export const metadata = {
  ...createPageMetadata({
    title: "Imprint",
    description: "Provider and contact information for the Marc Berghoff website.",
    path: "/imprint",
    }),
  robots: LEGAL_DETAILS.isComplete
    ? { index: true, follow: true }
    : { index: false, follow: true },
} satisfies Metadata;

function ImprintSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      <div className={styles.body}>
        {children}
      </div>
    </section>
  );
}

export default function ImprintPage() {
  return (
    <div className={styles.page}>
      <article className={styles.container}>
        <header className={styles.header}>
          <Breadcrumbs items={[{ label: "Imprint" }]} />
          <h1 className={styles.title}>
            Imprint
          </h1>
          <p className={styles.lead}>
            Provider and contact information for this website.
          </p>
          <p className={styles.updated}>
            Last updated: {LEGAL_DETAILS.lastUpdated}
          </p>
        </header>

        <div className={styles.sections}>
          <ImprintSection title="Service provider">
            <address>
              <p>{LEGAL_DETAILS.legalName}</p>
              {LEGAL_DETAILS.tradingName ? (
                <p>Trading as {LEGAL_DETAILS.tradingName}</p>
              ) : null}
              {LEGAL_DETAILS.address ? <p>{LEGAL_DETAILS.address}</p> : null}
              <p>{LEGAL_DETAILS.country}</p>
            </address>
            {LEGAL_DETAILS.registrationVat ? (
              <p>Registration or VAT reference: {LEGAL_DETAILS.registrationVat}</p>
            ) : null}
          </ImprintSection>

          <ImprintSection title="Contact">
            <p>
              Email: <a href={`mailto:${LEGAL_DETAILS.email}`}>{LEGAL_DETAILS.email}</a>
            </p>
            {LEGAL_DETAILS.phone ? (
              <p>
                Telephone:{" "}
                <a href={`tel:${LEGAL_DETAILS.phone.replace(/[^\d+]/g, "")}`}>
                  {LEGAL_DETAILS.phone}
                </a>
              </p>
            ) : null}
          </ImprintSection>

          <ImprintSection title="Editorial responsibility">
            <p>{LEGAL_DETAILS.contentResponsible} is responsible for the website&apos;s editorial content.</p>
          </ImprintSection>

          <ImprintSection title="Professional scope">
            <p>
              The website describes Fractional CPO (Chief People Officer) support
              and strategic people advisory.
              The services exclude clinical diagnosis, therapy, legal advice, tax
              advice and financial advice. Each paid engagement has its own written
              scope and terms.
            </p>
          </ImprintSection>

          <ImprintSection title="Hosting">
            <p>This website is hosted on Vercel&apos;s infrastructure.</p>
          </ImprintSection>

          <ImprintSection title="External links and copyright">
            <p>
              External pages remain under the control of their operators. Please report
              a broken or inappropriate link to {LEGAL_DETAILS.email}.
            </p>
            <p>
              Unless a different credit is shown, permission is required to republish
              this website&apos;s original text, layout or commissioned visual material for
              commercial use. Third-party names, marks and quotations remain the property
              of their respective owners.
            </p>
          </ImprintSection>

          {LEGAL_DETAILS.disputeResolutionStatement ? (
            <ImprintSection title="Dispute resolution">
              <p>{LEGAL_DETAILS.disputeResolutionStatement}</p>
            </ImprintSection>
          ) : null}
        </div>
      </article>
    </div>
  );
}
