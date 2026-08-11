import Image from "next/image";

import {
  ContactBand,
  PageHero,
  PlainList,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

import pageStyles from "./service-pages.module.css";
import {
  AdjacentServiceLinks,
  CompactProcess,
  ServiceStructuredData,
} from "./shared";

const copy = {
  en: {
    breadcrumbServices: "Services",
    breadcrumbPage: "Executive Coaching",
    title: "The decisions that keep coming back to you.",
    lead: [
      "Most leaders who reach this point have not run out of ability. They have run out of a way of working that used to fit and no longer does.",
      "Your role changed. The company changed around you. The way you lead has not caught up yet. Other people often feel that before you do.",
    ],
    situationsTitle: "What this is for.",
    situations: [
      "The conversations you keep postponing, even though you know they will not get easier.",
      "Working out what only you can do, and why you still reach for everything else.",
      "Leading people who now know more about their subject than you do.",
      "Building a leadership team that does not route every decision through you.",
      "Staying resilient while the company changes faster than your role feels ready for.",
    ],
    formatsTitle: "Individually or as a group.",
    formats: [
      {
        title: "Individually",
        text: "One leader works on their own shift, at their own pace. Nothing said in the room goes anywhere else.",
      },
      {
        title: "As a group",
        text: "Several leaders from the same organisation work on the same shift at the same time. Progress is slower per person and often stronger for the company, because the change happens between them. It also avoids the familiar pattern where one leader develops and returns to a team that has not moved. The group creates accountability; I help it keep that accountability alive.",
      },
    ],
    shapeTitle: "Give the work enough time to hold.",
    shapeBody:
      "A minimum of six sessions over at least three months. Sustainable development takes longer than a burst of insight, and I would rather turn down the work than pretend otherwise.",
    credentialsTitle: "Training and coaching practice.",
    credentials: [
      "ICF Associate Certified Coach",
      "More than 350 coaching hours",
      "Co-Active trained",
      "Organisational psychologist",
    ],
    badgeAlt: "International Coaching Federation Member badge",
    adjacent: [
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "If the question is a decision rather than a way of working, advisory fits better.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "If nobody yet agrees on what the problem is, start with the assessment.",
      },
    ],
    closingTitle: "Bring the decision that keeps returning.",
    closingText:
      "The first conversation is free and typically takes 30 minutes. We can set the question and decide whether coaching is the right boundary.",
  },
  de: {
    breadcrumbServices: "Zusammenarbeit",
    breadcrumbPage: "Executive Coaching",
    title: "Die Entscheidungen, die immer wieder bei Ihnen landen.",
    lead: [
      "Den meisten Führungskräften an diesem Punkt fehlt es nicht an Fähigkeit. Ihre bisherige Arbeitsweise passt nur nicht mehr zur Rolle.",
      "Ihre Rolle hat sich verändert. Das Unternehmen auch. Ihre Art zu führen ist noch nicht nachgezogen. Andere merken das oft früher als Sie selbst.",
    ],
    situationsTitle: "Wofür dieses Coaching gedacht ist.",
    situations: [
      "Die Gespräche, die Sie weiter aufschieben, obwohl sie nicht leichter werden.",
      "Herausfinden, welche Arbeit nur Sie leisten können — und warum Sie trotzdem nach allem anderen greifen.",
      "Menschen führen, die ihr Fach inzwischen tiefer beherrschen als Sie.",
      "Ein Führungsteam aufbauen, das nicht jede Entscheidung über Sie laufen lässt.",
      "Belastbar bleiben, während sich das Unternehmen schneller verändert, als sich Ihre Rolle vertraut anfühlt.",
    ],
    formatsTitle: "Einzeln oder als Gruppe.",
    formats: [
      {
        title: "Einzeln",
        text: "Eine Führungskraft arbeitet im eigenen Tempo an der eigenen Veränderung. Nichts aus dem Raum wird weitergetragen.",
      },
      {
        title: "Als Gruppe",
        text: "Mehrere Führungskräfte derselben Organisation arbeiten gleichzeitig an derselben Veränderung. Der Fortschritt pro Person ist langsamer, für das Unternehmen aber oft stärker, weil die Veränderung zwischen den Personen stattfindet. So kehrt nicht eine einzelne entwickelte Führungskraft in ein unverändertes Team zurück. Die Gruppe schafft Verbindlichkeit; ich helfe ihr, diese einzuhalten.",
      },
    ],
    shapeTitle: "Die Veränderung braucht genug Zeit, um zu halten.",
    shapeBody:
      "Mindestens sechs Sitzungen über mindestens drei Monate. Nachhaltige Entwicklung braucht mehr als einen kurzen Erkenntnisschub. Lieber lehne ich den Auftrag ab, als etwas anderes zu versprechen.",
    credentialsTitle: "Ausbildung und Coaching-Praxis.",
    credentials: [
      "ICF Associate Certified Coach",
      "Mehr als 350 Coaching-Stunden",
      "Co-Active ausgebildet",
      "Organisationspsychologe",
    ],
    badgeAlt: "Mitgliedsabzeichen der International Coaching Federation",
    adjacent: [
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "Wenn es um eine Entscheidung statt um Ihre Arbeitsweise geht, passt Beratung besser.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "Wenn sich noch niemand über das eigentliche Problem einig ist, beginnen Sie mit der Analyse.",
      },
    ],
    closingTitle: "Bringen Sie die Entscheidung mit, die immer wieder zurückkehrt.",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Wir klären die Frage und prüfen, ob Coaching der richtige Rahmen ist.",
  },
} as const;

export function ExecutiveCoachingPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <ServiceStructuredData
        description={pageCopy.lead.join(" ")}
        locale={locale}
        name="Executive Coaching"
        routeId="executiveCoaching"
      />
      <PageHero
        breadcrumbs={[
          { label: pageCopy.breadcrumbServices, href: getRouteHref("services", locale) },
          { label: pageCopy.breadcrumbPage },
        ]}
        title={pageCopy.title}
        lead={
          <>
            {pageCopy.lead.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </>
        }
        primary={contactAction}
        ctaPrimary
        secondary={{
          label: locale === "de" ? "Alle Formate ansehen" : "See all formats",
          href: getRouteHref("services", locale),
        }}
      />

      <section className={styles.section} aria-labelledby="coaching-situations">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="coaching-situations">
            {pageCopy.situationsTitle}
          </h2>
          <PlainList items={pageCopy.situations} />
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="coaching-formats">
        <div className={styles.container}>
          <SectionHeading id="coaching-formats" title={pageCopy.formatsTitle} />
          <div className={pageStyles.formatList}>
            {pageCopy.formats.map((format) => (
              <article className={pageStyles.formatItem} key={format.title}>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="coaching-shape">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="coaching-shape">
            {pageCopy.shapeTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.shapeBody}</p>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="coaching-credentials">
        <div className={`${styles.container} ${pageStyles.credentialProof}`}>
          <div className={pageStyles.badgeWrap}>
            <Image
              alt={pageCopy.badgeAlt}
              className={pageStyles.badge}
              fill
              sizes="(max-width: 672px) 11rem, 16rem"
              src="/images/credentials/icf-member-badge.webp"
            />
          </div>
          <div>
            <h2 className={styles.sectionTitle} id="coaching-credentials">
              {pageCopy.credentialsTitle}
            </h2>
            <ul className={`${pageStyles.credentialList} ${styles.spacedTop}`}>
              {pageCopy.credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CompactProcess id="coaching-process" locale={locale} />
      <AdjacentServiceLinks
        id="coaching-adjacent"
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
