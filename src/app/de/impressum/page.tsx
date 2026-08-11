import type { Metadata } from "next";

import { LEGAL_DETAILS } from "@/app/(en)/privacy/legal-details";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = {
  ...createPageMetadata({
    title: "Impressum",
    description:
      "Anbieter- und Kontaktinformationen für die Website von Marc Berghoff.",
    path: "/de/impressum",
    locale: "de_DE",
    languages: getLanguageAlternates("imprint"),
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

export default function GermanImprintPage() {
  const disputeResolutionStatement =
    LEGAL_DETAILS.disputeResolutionStatementDe ??
    LEGAL_DETAILS.disputeResolutionStatement;
  const disputeResolutionLanguage =
    LEGAL_DETAILS.disputeResolutionStatementDe ||
    !LEGAL_DETAILS.disputeResolutionStatement
      ? undefined
      : "en";

  return (
    <div className="page-shell" lang="de">
      <article className="container mx-auto max-w-4xl">
        <header className="mb-14 space-y-5 sm:mb-20">
          <Breadcrumbs items={[{ label: "Impressum" }]} locale="de" />
          <p className="eyebrow">Rechtliches</p>
          <h1 className="text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
            Impressum
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Anbieter- und Kontaktinformationen für diese Website.
          </p>
          <p className="text-sm text-slate-600">
            Stand: {LEGAL_DETAILS.lastUpdatedDe}
          </p>
        </header>

        <div className="space-y-12">
          <ImprintSection title="Diensteanbieter">
            <address className="not-italic">
              <p>{LEGAL_DETAILS.legalName}</p>
              {LEGAL_DETAILS.tradingName ? (
                <p>Auftreten unter der Bezeichnung {LEGAL_DETAILS.tradingName}</p>
              ) : null}
              {LEGAL_DETAILS.address ? <p>{LEGAL_DETAILS.address}</p> : null}
              <p>{LEGAL_DETAILS.country}</p>
            </address>
            {LEGAL_DETAILS.registrationVat ? (
              <p>
                Registrierungs- oder Umsatzsteuerreferenz:{" "}
                {LEGAL_DETAILS.registrationVat}
              </p>
            ) : null}
          </ImprintSection>

          <ImprintSection title="Kontakt">
            <p>
              E-Mail:{" "}
              <a href={`mailto:${LEGAL_DETAILS.email}`}>
                {LEGAL_DETAILS.email}
              </a>
            </p>
            {LEGAL_DETAILS.phone ? (
              <p>
                Telefon:{" "}
                <a
                  href={`tel:${LEGAL_DETAILS.phone.replace(/[^\d+]/g, "")}`}
                >
                  {LEGAL_DETAILS.phone}
                </a>
              </p>
            ) : null}
          </ImprintSection>

          <ImprintSection title="Inhaltlich verantwortlich">
            <p>
              {LEGAL_DETAILS.contentResponsible} ist für die redaktionellen
              Inhalte dieser Website verantwortlich.
            </p>
          </ImprintSection>

          <ImprintSection title="Beruflicher Umfang">
            <p>
              Die Website beschreibt Organisationsberatung und Executive
              Coaching. Die Leistungen schließen klinische Diagnostik,
              Therapie, Rechtsberatung, Steuerberatung und Finanzberatung aus.
              Für jeden bezahlten Auftrag gelten ein eigener schriftlicher
              Umfang und eigene Bedingungen.
            </p>
          </ImprintSection>

          <ImprintSection title="Hosting">
            <p>Diese Website wird auf der Infrastruktur von Vercel gehostet.</p>
          </ImprintSection>

          <ImprintSection title="Externe Links und Urheberrecht">
            <p>
              Externe Seiten stehen unter der Kontrolle ihrer jeweiligen
              Betreiber. Bitte melden Sie einen fehlerhaften oder unangemessenen
              Link an {LEGAL_DETAILS.email}.
            </p>
            <p>
              Soweit keine andere Quellenangabe ausgewiesen ist, ist für die
              kommerzielle Weiterveröffentlichung der eigenen Texte, des Layouts
              oder beauftragter visueller Inhalte dieser Website eine Erlaubnis
              erforderlich. Namen, Marken und Zitate Dritter bleiben Eigentum
              der jeweiligen Rechteinhaber.
            </p>
          </ImprintSection>

          {disputeResolutionStatement ? (
            <ImprintSection title="Streitbeilegung">
              <p lang={disputeResolutionLanguage}>
                {disputeResolutionStatement}
              </p>
            </ImprintSection>
          ) : null}
        </div>
      </article>
    </div>
  );
}
