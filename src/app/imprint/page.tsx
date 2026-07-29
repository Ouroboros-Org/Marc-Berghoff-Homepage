import type { Metadata } from "next";

import { LEGAL_DETAILS } from "@/app/privacy/legal-details";
import { createPageMetadata } from "@/config/metadata";

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
    <section className="space-y-4 border-t border-slate-900/15 pt-8">
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function ImprintPage() {
  return (
    <div className="page-shell">
      <article className="container mx-auto max-w-4xl">
        <header className="mb-14 space-y-5 sm:mb-20">
          <p className="eyebrow">Legal</p>
          <h1 className="text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
            Imprint
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Provider and contact information for this website.
          </p>
          <p className="text-sm text-slate-600">
            Last updated: {LEGAL_DETAILS.lastUpdated}
          </p>
        </header>

        <div className="space-y-12">
          <ImprintSection title="Service provider">
            <address className="not-italic">
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
            <p>
              Telephone: <a href={`tel:${LEGAL_DETAILS.phone.replaceAll(" ", "")}`}>{LEGAL_DETAILS.phone}</a>
            </p>
          </ImprintSection>

          <ImprintSection title="Editorial responsibility">
            <p>{LEGAL_DETAILS.contentResponsible} is responsible for the website&apos;s editorial content.</p>
          </ImprintSection>

          <ImprintSection title="Professional scope">
            <p>
              The website describes organisational advisory and executive coaching.
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
