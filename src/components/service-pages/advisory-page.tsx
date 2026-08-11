import {
  ContactBand,
  PageHero,
  PlainList,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

import {
  AdjacentServiceLinks,
  CompactProcess,
  ServiceStructuredData,
} from "./shared";

const copy = {
  en: {
    breadcrumbServices: "How I can help",
    breadcrumbPage: "Strategic People Advisory",
    title: "The decision is yours. It does not have to be made alone.",
    lead: "Bring a people, role or organisation question you can already see. I test the reasoning, assumptions and trade-offs. You keep the decision.",
    situationsTitle: "Common situations.",
    situations: [
      "You need to decide who should stay in their role, who is ready for more responsibility and where an external hire is needed.",
      "Your company has values on the wall, but they do not yet show up in everyday decisions.",
      "You expect to add teams or management layers and want to test the current decision structure before the same gaps appear in more places.",
      "Candidates hear one promise while employees experience something different, and hiring the right people has become harder.",
    ],
    boundaryTitle: "Advisory stops where ownership begins.",
    boundary:
      "If the work needs someone to coordinate execution or hold decision rights, advisory is too light.",
    shapeTitle: "The scope follows the decision.",
    shape:
      "A monthly retainer, or work scoped to a single decision. Either way, the scope is written down before anything starts.",
    adjacent: [
      {
        routeId: "peerAdvisory" as const,
        label: "Peer Advisory",
        text: "If several people would benefit from the same room instead of one-to-one input, that is Peer Advisory.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "If the accounts of the problem differ across your team, start with the assessment.",
      },
    ],
    closingTitle: "Bring the decision that is not moving.",
    closingText:
      "The first conversation is free and typically takes 30 minutes. I will tell you whether an outside view is enough.",
  },
  de: {
    breadcrumbServices: "Zusammenarbeit",
    breadcrumbPage: "Strategic People Advisory",
    title: "Die Entscheidung bleibt bei Ihnen. Sie müssen sie nicht allein treffen.",
    lead: "Bringen Sie eine People-, Rollen- oder Organisationsfrage mit, die bereits greifbar ist. Ich prüfe mit Ihnen die Annahmen und Folgen der möglichen Wege. Die Entscheidung bleibt bei Ihnen.",
    situationsTitle: "Häufige Situationen.",
    situations: [
      "Sie müssen entscheiden, wer die aktuelle Rolle behalten sollte, wer bereit für mehr Verantwortung ist und wo eine externe Besetzung nötig wird.",
      "Ihr Unternehmen hat Werte formuliert. In alltäglichen Entscheidungen spielen sie bisher kaum eine Rolle.",
      "Sie planen weitere Teams oder Führungsebenen und möchten die heutige Entscheidungsstruktur prüfen, bevor dieselben Lücken an mehr Stellen auftauchen.",
      "Bewerberinnen und Bewerber hören ein anderes Versprechen als das, was Beschäftigte im Alltag erleben. Die passenden Menschen zu gewinnen, wird dadurch schwieriger.",
    ],
    boundaryTitle: "Beratung endet, sobald jemand die Umsetzung tragen muss.",
    boundary:
      "Wenn die Arbeit Koordination oder eigene Entscheidungsrechte verlangt, reicht Beratung nicht aus.",
    shapeTitle: "Der Umfang folgt der Entscheidung.",
    shape:
      "Die Begleitung kann laufend oder auf eine einzelne Entscheidung begrenzt sein. In beiden Fällen halten wir den Umfang schriftlich fest, bevor die Arbeit beginnt.",
    adjacent: [
      {
        routeId: "peerAdvisory" as const,
        label: "Peer Advisory",
        text: "Wenn mehrere Führungskräfte ihre eigenen Entscheidungen in einer gemeinsamen Runde bearbeiten sollen, passt Peer Advisory.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "Wenn im Team verschiedene Erklärungen für das Problem nebeneinanderstehen, beginnen Sie mit der Analyse.",
      },
    ],
    closingTitle: "Bringen Sie die Entscheidung mit, bei der Sie sich im Kreis drehen.",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Ich sage offen, ob eine zweite Sicht von außen genügt.",
  },
} as const;

export function AdvisoryPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <ServiceStructuredData
        description={pageCopy.lead}
        locale={locale}
        name="Strategic People Advisory"
        routeId="advisory"
      />
      <PageHero
        breadcrumbs={[
          { label: pageCopy.breadcrumbServices, href: getRouteHref("services", locale) },
          { label: pageCopy.breadcrumbPage },
        ]}
        title={pageCopy.title}
        lead={pageCopy.lead}
        locale={locale}
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: locale === "de" ? "Alle Formate ansehen" : "See all formats",
          href: getRouteHref("services", locale),
        }}
      />

      <section className={styles.section} aria-labelledby="advisory-situations">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="advisory-situations">
            {pageCopy.situationsTitle}
          </h2>
          <PlainList items={pageCopy.situations} />
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="advisory-boundary">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="advisory-boundary">
            {pageCopy.boundaryTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.boundary}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="advisory-shape">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="advisory-shape">
            {pageCopy.shapeTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.shape}</p>
          </div>
        </div>
      </section>

      <CompactProcess id="advisory-process" locale={locale} />
      <AdjacentServiceLinks
        id="advisory-adjacent"
        links={pageCopy.adjacent}
        locale={locale}
      />
      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        locale={locale}
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
