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
    breadcrumbServices: "Services",
    breadcrumbPage: "Strategic People Advisory",
    title: "The decision is yours. It does not have to be made alone.",
    lead: "Bring a people, role or organisation question you can already see. I test the reasoning, assumptions and trade-offs. You keep the decision.",
    situationsTitle: "Common situations.",
    situations: [
      "You need to decide how to distribute current and future talent: who stays, who moves up and where an external hire is necessary.",
      "Your company has values on the wall, but they do not yet show up in everyday decisions.",
      "A rapid scale-up phase is approaching and you need someone to challenge the current organisation before growth makes its weaknesses expensive.",
      "You struggle to attract the right people because the employer story is unclear or does not match the experience inside the company.",
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
    lead: "Bringen Sie eine People-, Rollen- oder Organisationsfrage mit, die Sie bereits klar sehen. Ich prüfe Ihre Logik, Annahmen und Abwägungen. Sie behalten die Entscheidung.",
    situationsTitle: "Häufige Situationen.",
    situations: [
      "Sie müssen entscheiden, wie Sie heutiges und zukünftiges Talent verteilen: Wer bleibt, wer steigt auf und wo ist eine externe Einstellung nötig?",
      "Ihr Unternehmen hat Werte formuliert, aber im Alltag sind sie noch nicht Teil der Entscheidungen.",
      "Eine schnelle Wachstumsphase steht bevor. Sie brauchen jemanden, der die heutige Organisation prüft, bevor Wachstum ihre Schwächen teuer macht.",
      "Sie gewinnen nicht die richtigen Personen, weil die Geschichte als Arbeitgeber unklar ist oder nicht zur tatsächlichen Erfahrung im Unternehmen passt.",
    ],
    boundaryTitle: "Beratung endet dort, wo Verantwortung beginnen müsste.",
    boundary:
      "Wenn jemand die Umsetzung koordinieren oder Entscheidungsrechte halten muss, ist Beratung zu wenig.",
    shapeTitle: "Der Umfang folgt der Entscheidung.",
    shape:
      "Als monatliches Mandat oder für eine einzelne Entscheidung. In beiden Fällen steht der Umfang schriftlich fest, bevor etwas beginnt.",
    adjacent: [
      {
        routeId: "peerAdvisory" as const,
        label: "Peer Advisory",
        text: "Wenn mehrere Personen von demselben Raum stärker profitieren als von Einzelberatung, passt Peer Advisory.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "Wenn Ihr Team das Problem unterschiedlich beschreibt, beginnen Sie mit der Analyse.",
      },
    ],
    closingTitle: "Bringen Sie die Entscheidung mit, die nicht vorankommt.",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Ich sage Ihnen, ob eine zweite Sicht von außen ausreicht.",
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
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
