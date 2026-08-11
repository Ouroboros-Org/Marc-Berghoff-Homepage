import type { Metadata } from "next";

import { LEGAL_DETAILS } from "@/app/(en)/privacy/legal-details";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

export const metadata = {
  ...createPageMetadata({
    title: "Datenschutzerklärung",
    description:
      "Wie personenbezogene Daten auf dieser Website, im Buchungskalender, im Check mit zehn Aussagen und im Kontaktformular verarbeitet werden.",
    path: "/de/datenschutz",
    locale: "de_DE",
    languages: getLanguageAlternates("privacy"),
  }),
  robots: LEGAL_DETAILS.isComplete
    ? { index: true, follow: true }
    : { index: false, follow: true },
} satisfies Metadata;

function LegalSection({
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

export default function GermanPrivacyPage() {
  const retentionPeriod =
    LEGAL_DETAILS.contactRetentionPeriodDe ??
    LEGAL_DETAILS.contactRetentionPeriod;
  const retentionLanguage = LEGAL_DETAILS.contactRetentionPeriodDe
    ? undefined
    : "en";

  return (
    <div className="page-shell" lang="de">
      <article className="container mx-auto max-w-4xl">
        <header className="mb-14 space-y-5 sm:mb-20">
          <Breadcrumbs
            items={[{ label: "Datenschutzerklärung" }]}
            locale="de"
          />
          <p className="eyebrow">Rechtliches</p>
          <h1 className="text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
            Datenschutzerklärung
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            Diese Erklärung gilt für die Website, den Buchungskalender von
            Cal.com, den Bottleneck-Check mit zehn Aussagen und das
            Kontaktformular.
          </p>
          <p className="text-sm text-slate-600">
            Stand: {LEGAL_DETAILS.lastUpdatedDe}
          </p>
        </header>

        <div className="space-y-12">
          <LegalSection title="1. Verantwortlicher und Kontakt">
            <p>
              {LEGAL_DETAILS.legalName} mit Sitz in {LEGAL_DETAILS.country} ist
              für personenbezogene Daten verantwortlich, die über diese Website
              verarbeitet werden. Fragen zum Datenschutz und Anfragen zur
              Wahrnehmung Ihrer Rechte können Sie an{" "}
              <a href={`mailto:${LEGAL_DETAILS.email}`}>
                {LEGAL_DETAILS.email}
              </a>{" "}
              senden.
              {LEGAL_DETAILS.phone ? (
                <>
                  {" "}Sie erreichen mich auch telefonisch unter{" "}
                  <a
                    href={`tel:${LEGAL_DETAILS.phone.replace(/[^\d+]/g, "")}`}
                  >
                    {LEGAL_DETAILS.phone}
                  </a>
                  .
                </>
              ) : null}
            </p>
          </LegalSection>

          <LegalSection title="2. Angaben, die Sie übermitteln">
            <p>Das Formular kann folgende Angaben erfassen:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-blue-700">
              <li>Name, Kontaktdaten, Unternehmen und Rolle;</li>
              <li>
                Ihre Auswahl zu Format, Zeitrahmen und Unternehmensgröße;
              </li>
              <li>
                Ihre Beschreibung der aktuellen Situation und des gewünschten
                Ergebnisses;
              </li>
              <li>
                Ergebnis und Antworten aus dem Bottleneck-Check, jedoch nur,
                wenn Sie das Ergebnis versenden;
              </li>
              <li>Ihre Einwilligungsbestätigung.</li>
            </ul>
            <p>
              Bitte tragen Sie in die Freitextfelder einer ersten Anfrage keine
              Personalakten, Gesundheitsdaten oder andere sensible
              personenbezogene Daten ein.
            </p>
          </LegalSection>

          <LegalSection title="3. So funktioniert das Kontaktformular">
            <p>
              Ein ausgefülltes Formular wird an eine auf Vercel gehostete
              Server-Route gesendet. Sie prüft die Felder und leitet die
              relevanten Antworten an den eingerichteten Google-Forms-Endpunkt
              weiter. Google speichert die Antwort im Formular und, sofern
              aktiviert, in der damit verknüpften Google-Tabelle. Diese Website
              führt keine zweite Kontaktdatenbank.
            </p>
            <p>
              Der Server prüft außerdem ein verborgenes Feld gegen Spam und die
              Dauer der Formulareingabe. Diese Werte werden nicht an Google
              weitergeleitet. Die Anwendung fügt der Formularantwort weder die
              IP-Adresse noch eine Browserkennung hinzu.
            </p>
          </LegalSection>

          <LegalSection title="4. Zweck der Verarbeitung">
            <p>
              Die Angaben aus dem Formular werden verwendet, um Ihre Anfrage zu
              lesen und zu beantworten, die Passung der angefragten Arbeit zu
              prüfen, ein Gespräch vorzubereiten und das Formular vor
              automatisiertem Missbrauch zu schützen. Sie werden nicht in einen
              Marketingverteiler aufgenommen.
            </p>
            <p>
              Soweit EU- oder britisches Datenschutzrecht anwendbar ist, können
              diese Verarbeitungen auf vorvertraglichen Maßnahmen und dem
              berechtigten Interesse an der Bearbeitung geschäftlicher Anfragen
              beruhen. Eine Einwilligung gilt dort, wo das Formular ausdrücklich
              danach fragt.
            </p>
          </LegalSection>

          <LegalSection title="5. Dienstleister und internationale Verarbeitung">
            <p>
              Vercel stellt das Hosting und die Server-Route bereit. Google
              stellt das Formular und eine gegebenenfalls verknüpfte
              Antworttabelle bereit. Cal.com stellt den eingebetteten
              Buchungskalender bereit. Diese Anbieter können Daten außerhalb des
              Landes verarbeiten, in dem Sie leben. Maßgeblich sind ihre jeweils
              geltenden Verträge, Standorte und Schutzmaßnahmen für
              Datenübermittlungen.
            </p>
            <p>
              Daten können außerdem offengelegt werden, wenn dies gesetzlich
              vorgeschrieben oder zur Geltendmachung, Ausübung oder Verteidigung
              eines Rechtsanspruchs vernünftigerweise erforderlich ist.
            </p>
          </LegalSection>

          <LegalSection title="6. Buchung über Cal.com">
            <p>
              Wenn der Buchungskalender eingerichtet ist, verbindet sich Ihr
              Browser beim Öffnen der Kontaktseite mit Cal.com, um freie Termine
              anzuzeigen. Cal.com kann dabei technische Anfragedaten wie
              IP-Adresse, Browserangaben und die verweisende Seite erhalten. Wenn
              Sie ein Gespräch buchen, werden Ihre Eingaben und die Termindaten
              an Cal.com übermittelt und zur Organisation des Gesprächs
              verwendet.
            </p>
            <p>
              Cal.com verarbeitet diese Daten nach seinen eigenen Bedingungen
              und Datenschutzhinweisen. Sie können stattdessen das
              Kontaktformular verwenden, wenn Sie nicht über den eingebetteten
              Kalender buchen möchten.
            </p>
          </LegalSection>

          <LegalSection title="7. Aufbewahrung">
            <p>
              Für Anfragen gilt folgende Aufbewahrungsregel:{" "}
              <span lang={retentionLanguage}>{retentionPeriod}</span>.
              Informationen können früher gelöscht werden, wenn kein
              fortbestehender geschäftlicher oder rechtlicher Grund für ihre
              Aufbewahrung besteht. Für Sicherheitsprotokolle und Analysedaten
              der Anbieter gelten die Einstellungen und Aufbewahrungsregeln der
              eingesetzten Vercel- und Google-Konten.
            </p>
          </LegalSection>

          <LegalSection title="8. Der Bottleneck-Check">
            <p>
              Der Check mit zehn Aussagen läuft im Browser. Ihre Antworten
              werden nur im Zustand der Komponente gehalten. Während Sie
              antworten, werden sie weder gespeichert noch an Analyse-Dienste
              oder andere Stellen übertragen. Das vollständige Ergebnis ist
              ohne E-Mail-Adresse sichtbar.
            </p>
            <p>
              Wenn Sie <em>Dieses Ergebnis an Marc senden</em> wählen, werden
              Ihre E-Mail-Adresse, der Ergebnisbereich und alle zehn Antworten
              über die oben beschriebene Kontakt-Route versendet. Das Ergebnis
              bleibt sichtbar, unabhängig davon, ob Sie es versenden. Der Check
              dient der geschäftlichen Orientierung. Er trifft keine
              arbeitsrechtliche, rechtliche oder vergleichbar bedeutsame
              Entscheidung. Ich prüfe jedes versendete Ergebnis selbst.
            </p>
          </LegalSection>

          <LegalSection title="9. Analyse und Leistungsmessung">
            <p>
              Die Website verwendet Vercel Web Analytics, um anonymisierte,
              zusammengefasste Seitenaufrufe ohne Cookies zu erfassen. Vercel
              erstellt aus Anfragedaten täglich einen neuen Hash. Dadurch kann
              eine Person nicht über mehrere Tage oder Websites hinweg verfolgt
              werden. Erfasste Felder können Seite, verweisende Seite, ungefähren
              Standort, Browser, Betriebssystem und Gerätetyp umfassen. Weitere
              Angaben enthält die{" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                rel="noreferrer"
                target="_blank"
              >
                Datenschutzdokumentation zu Vercel Web Analytics
              </a>
              .
            </p>
            <p>
              Vercel Speed Insights erfasst Leistungswerte aus realen Aufrufen,
              darunter die Core Web Vitals. Die Daten helfen, langsame Seiten
              und Layoutprobleme zu finden. Keiner der beiden Dienste wird hier
              für Werbung eingesetzt. Weitere Informationen stehen in der{" "}
              <a
                href="https://vercel.com/docs/speed-insights"
                rel="noreferrer"
                target="_blank"
              >
                Dokumentation zu Speed Insights
              </a>
              .
            </p>
          </LegalSection>

          <LegalSection title="10. Ihre Rechte">
            <p>
              Je nach anwendbarem Recht können Sie Auskunft, Berichtigung,
              Löschung, Einschränkung oder Übertragbarkeit Ihrer
              personenbezogenen Daten verlangen. Sie können bestimmten
              Verarbeitungen widersprechen oder eine Einwilligung mit Wirkung
              für die Zukunft widerrufen. Senden Sie die Anfrage an{" "}
              {LEGAL_DETAILS.email}. Vor der Bearbeitung kann eine Prüfung Ihrer
              Identität erforderlich sein.
            </p>
            <p>
              Sie können sich bei der Datenschutzaufsichtsbehörde des Landes
              beschweren, in dem Sie leben oder arbeiten.
            </p>
          </LegalSection>

          <LegalSection title="11. Sicherheit und Änderungen">
            <p>
              Angemessene technische und organisatorische Maßnahmen schützen
              den Übermittlungsweg. Eine Übertragung über das Internet bleibt
              mit Risiken verbunden. Diese Erklärung wird aktualisiert, wenn
              sich Formulare, Anbieter oder Zwecke wesentlich ändern. Das Datum
              am Anfang kennzeichnet die aktuelle Fassung.
            </p>
          </LegalSection>
        </div>
      </article>
    </div>
  );
}
