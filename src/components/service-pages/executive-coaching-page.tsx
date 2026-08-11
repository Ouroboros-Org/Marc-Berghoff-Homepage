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
    breadcrumbServices: "How I can help",
    breadcrumbPage: "Executive Coaching",
    title: "The decisions that keep coming back to you.",
    lead: [
      "Your role and the company have changed.",
      "Decisions that once fitted your way of working now return to you, move too slowly or depend too heavily on your involvement.",
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
        text: "Several leaders from the same organisation work on a shared change. Sessions focus on what happens between their roles, and the group agrees how it will hold each other to the work.",
      },
    ],
    shapeTitle: "Give the work enough time to hold.",
    shapeBody:
      "The minimum is six sessions over at least three months. That gives us time to try changes between sessions and review what actually happened.",
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
    title: "Entscheidungen, die immer wieder bei Ihnen landen.",
    lead: [
      "Ihre Rolle und das Unternehmen haben sich verändert.",
      "Entscheidungen, die früher zu Ihrer Arbeitsweise passten, landen wieder bei Ihnen, dauern zu lange oder hängen zu stark von Ihrer Beteiligung ab.",
    ],
    situationsTitle: "Wofür dieses Coaching gedacht ist.",
    situations: [
      "Ein Gespräch führen, das Sie seit Wochen aufschieben, obwohl es nicht leichter wird.",
      "Klären, welche Aufgaben wirklich bei Ihnen liegen und warum Sie andere trotzdem nicht abgeben.",
      "Menschen führen, die ihr Fach inzwischen tiefer beherrschen als Sie.",
      "Ein Führungsteam aufbauen, das nicht jede Entscheidung über Sie laufen lässt.",
      "Belastbar bleiben, während sich das Unternehmen schneller verändert, als Sie in Ihrer neuen Rolle ankommen.",
    ],
    formatsTitle: "Einzeln oder als Gruppe.",
    formats: [
      {
        title: "Einzeln",
        text: "Eine Führungskraft arbeitet im eigenen Tempo an ihrer Veränderung. Was im Coaching besprochen wird, bleibt dort.",
      },
      {
        title: "Als Gruppe",
        text: "Mehrere Führungskräfte derselben Organisation arbeiten gleichzeitig an einer gemeinsamen Veränderung. Dabei geht es auch um das, was zwischen ihnen passiert: Absprachen, Reibung und gegenseitige Erwartungen. Die Gruppe schafft Verbindlichkeit; ich halte den Prozess in Bewegung.",
      },
    ],
    shapeTitle: "Veränderung braucht Zeit, damit sie im Alltag hält.",
    shapeBody:
      "Mindestens sechs Sitzungen über drei Monate. So bleibt Zeit, zwischen den Terminen etwas auszuprobieren und gemeinsam zu prüfen, was im Alltag tatsächlich passiert ist.",
    credentialsTitle: "Ausbildung und Coaching-Praxis.",
    credentials: [
      "ICF Associate Certified Coach",
      "Mehr als 350 Coaching-Stunden",
      "Co-Active-Training",
      "Organisationspsychologe",
    ],
    badgeAlt: "Mitgliedsabzeichen der International Coaching Federation",
    adjacent: [
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "Wenn die Entscheidung im Vordergrund steht und nicht Ihre Arbeitsweise, passt Beratung besser.",
      },
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "Wenn sich noch niemand über das eigentliche Problem einig ist, beginnen Sie mit der Analyse.",
      },
    ],
    closingTitle: "Bringen Sie eine Situation mit, die Raum zum Denken braucht.",
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
        locale={locale}
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
            <div className={styles.spacedTop}>
              <ul className={pageStyles.credentialList}>
                {pageCopy.credentials.map((credential) => (
                  <li key={credential}>{credential}</li>
                ))}
              </ul>
            </div>
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
        locale={locale}
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
