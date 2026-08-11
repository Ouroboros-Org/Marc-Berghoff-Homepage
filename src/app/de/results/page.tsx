import {
  ContactBand,
  Evidence,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates, getRouteHref } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

import { GERMAN_CASE_STUDIES } from "./content";

export const metadata = createPageMetadata({
  title: "Ergebnisse & Erfahrung",
  description:
    "Ausgewählte Arbeit mit Führungsteams in wachsenden und etablierten Organisationen: Coaching, Beratung und operative Verantwortung.",
  path: "/de/results",
  locale: "de_DE",
  languages: getLanguageAlternates("results"),
});

export default function GermanResultsPage() {
  const contactAction = getPrimaryContactAction("de");

  return (
    <div className={styles.page} lang="de">
      <PageHero
        breadcrumbs={[
          { label: "Über mich", href: getRouteHref("about", "de") },
          { label: "Ergebnisse & Erfahrung" },
        ]}
        title="Diese Arbeit prägt meine Sicht."
        lead="Die Beispiele zeigen, wo ich gecoacht, beraten, operativ gearbeitet oder einen HR-Auftrag übernommen habe. Sie geben Ihnen Kontext für meine Einschätzung. Eine Prognose für Ihr Unternehmen sind sie nicht."
        asideLabel="Coaching-Praxis"
        asideValue="Mehr als 350 Stunden"
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: "So arbeite ich",
          href: getRouteHref("services", "de"),
        }}
        locale="de"
      />

      <section className={styles.section} aria-labelledby="selected-work">
        <div className={styles.container}>
          <SectionHeading
            id="selected-work"
            title="Woran ich gearbeitet habe und wofür ich verantwortlich war."
          />
          <div className={styles.caseGrid}>
            {GERMAN_CASE_STUDIES.map((study) => (
              <article className={styles.caseCard} key={study.company}>
                <p className={styles.caseCompany}>{study.company}</p>
                <p className={styles.caseEngagement}>{study.engagement}</p>
                <h3 className={styles.caseTitle}>{study.responsibility}</h3>
                {"context" in study ? (
                  <p className={styles.caseContext}>{study.context}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="operator-experience">
        <div className={styles.container}>
          <SectionHeading
            id="operator-experience"
            title="Ich prüfe meinen Rat an der nächsten konkreten Entscheidung."
            intro="2021 habe ich CyberKongz mitgegründet. In Malta leite ich eine Vistage Peer-Advisory-Gruppe für Unternehmensinhaber. In beiden Rollen hilft eine schlüssige Antwort wenig, wenn in der nächsten Arbeitswoche niemand danach handeln kann."
          />
          <Evidence label="Eine Frage, die ich stelle">
            Was würde sich dadurch in Ihrer nächsten Führungsrunde ändern, und wer
            müsste anders handeln?
          </Evidence>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        title="Welche Frage landet immer wieder bei Ihrem Führungsteam?"
        text="Beschreiben Sie, was passiert ist, wer beteiligt ist und was Sie bereits versucht haben. Ich sage Ihnen offen, ob ich helfen kann."
        locale="de"
      />
    </div>
  );
}
