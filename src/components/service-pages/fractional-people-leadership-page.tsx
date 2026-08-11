import Image from "next/image";

import {
  ContactBand,
  PageHero,
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
    breadcrumbPage: "Fractional People Leadership",
    title: "A capable people team can still lack senior direction.",
    lead: "You may not need a full-time Chief People Officer. You may still need someone to set direction, hold agreed decisions and lead the work above an operationally sound team.",
    fitTitle: "Use this when the team can operate but the remit above it is empty.",
    fitBody: [
      "The people team handles day-to-day work. What is missing is senior direction: the organisation choices, leadership expectations and priorities that connect the people agenda to the business plan.",
      "The service gives that work an owner for a defined period. You get senior input and decision-making at the level the company needs, without creating a permanent full-time role before the case is clear.",
    ],
    shapeTitle: "Defined scope. Agreed decision rights. An end point from the start.",
    shapeBody: [
      "The usual rhythm is one or two days a week. The duration follows the remit and is written into the scope rather than guessed in advance.",
      "The scope names the decisions I hold, the support I need, the review rhythm and the conditions for handing the work back to the team or a permanent hire.",
    ],
    availability:
      "I take one Fractional People Leadership engagement at a time. If the need is urgent and my time is committed, I will introduce a trusted colleague where I can.",
    proofTitle: "Relevant people-leadership experience.",
    proof: [
      "Head of HR at a solar scale-up later acquired by E.ON.",
      "Fractional people leadership for a Malta fire-safety and security group.",
    ],
    wrongTitle: "When this is the wrong answer.",
    wrongBody:
      "If you already have a capable people lead and the problem is that decisions stall above them, this is the wrong fix. That is usually an advisory or assessment question. A second senior owner rarely solves a problem caused by unclear decision rights.",
    adjacent: [
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "If the remit is unclear because nobody agrees where the work is stuck, start with the assessment.",
      },
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "If the team already has an owner and one difficult decision is stalled above them, advisory is usually the lighter answer.",
      },
    ],
    closingTitle: "Which part of the work currently has no credible owner?",
    closingText:
      "The first conversation is free and typically takes 30 minutes. Bring the remit, the team already in place and the decisions that cannot wait.",
  },
  de: {
    breadcrumbServices: "Zusammenarbeit",
    breadcrumbPage: "Fractional People Leadership",
    title: "Auch ein fähiges People-Team kann ohne strategische Führung dastehen.",
    lead: "Vielleicht brauchen Sie keinen Chief People Officer in Vollzeit. Trotzdem muss jemand die Richtung setzen, Entscheidungen verantworten und die Themen führen, die über das Tagesgeschäft eines stabilen Teams hinausgehen.",
    fitTitle: "Das Team trägt den Alltag. Die strategische Verantwortung ist unbesetzt.",
    fitBody: [
      "Das People-Team erledigt die tägliche Arbeit. Offen bleiben die Organisationsentscheidungen, Erwartungen an Führung und Prioritäten, die die People-Arbeit mit dem Geschäftsplan verbinden.",
      "Für einen festgelegten Zeitraum übernehme ich diese Verantwortung. So bekommt die Arbeit eine erfahrene Leitung, ohne dass Sie vorschnell eine dauerhafte Vollzeitrolle schaffen.",
    ],
    shapeTitle: "Klarer Umfang. Vereinbarte Entscheidungsrechte. Ein Endpunkt von Anfang an.",
    shapeBody: [
      "Der übliche Rhythmus liegt bei ein bis zwei Tagen pro Woche. Wie lange das Mandat dauert, richtet sich nach dem Auftrag und wird vor Beginn schriftlich festgehalten.",
      "Die schriftliche Vereinbarung benennt meine Entscheidungsrechte, die nötige Unterstützung, wann wir den Auftrag gemeinsam überprüfen und unter welchen Bedingungen die Arbeit an das Team oder eine dauerhafte Besetzung übergeht.",
    ],
    availability:
      "Ich übernehme nur ein Fractional-People-Leadership-Mandat gleichzeitig. Wenn Ihre Frage dringend ist und meine Zeit bereits gebunden ist, empfehle ich nach Möglichkeit eine vertraute Person aus meinem Netzwerk.",
    proofTitle: "Erfahrung in der People-Führung.",
    proof: [
      "Head of HR bei einem Solar-Scale-up, das später von E.ON übernommen wurde.",
      "Fractional People Leadership für eine maltesische Unternehmensgruppe für Brand- und Sicherheitstechnik.",
    ],
    wrongTitle: "Wann ein anderes Format besser passt.",
    wrongBody:
      "Wenn bereits eine fähige People-Leitung da ist und Entscheidungen oberhalb dieser Rolle feststecken, braucht es meist Beratung oder eine Analyse. Eine zweite erfahrene Leitung klärt keine Entscheidungsrechte.",
    adjacent: [
      {
        routeId: "bottleneckAssessment" as const,
        label: "Bottleneck Assessment",
        text: "Wenn der Auftrag unklar ist, weil im Team verschiedene Erklärungen für den Engpass bestehen, beginnen Sie mit der Analyse.",
      },
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "Wenn das Team bereits eine verantwortliche Person hat und eine Entscheidung außerhalb ihres Mandats feststeckt, ist Beratung meist die passendere Antwort.",
      },
    ],
    closingTitle: "Welcher Teil der Arbeit hat derzeit keine klar verantwortliche Person?",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Bringen Sie den Auftrag, das bestehende Team und die Entscheidungen mit, die nicht warten können.",
  },
} as const;

export function FractionalPeopleLeadershipPageView({
  locale,
}: {
  locale: SiteLocale;
}) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <ServiceStructuredData
        description={pageCopy.lead}
        locale={locale}
        name="Fractional People Leadership"
        routeId="fractionalPeopleLeadership"
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

      <section className={styles.section} aria-labelledby="fractional-fit">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="fractional-fit">
            {pageCopy.fitTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.fitBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.mediaBreak} aria-label={pageCopy.shapeTitle}>
        <div className={styles.container}>
          <figure className={styles.editorialFigure}>
            <div className={styles.editorialImageWrap}>
              <Image
                alt=""
                className={styles.editorialImage}
                fill
                sizes="(max-width: 1184px) calc(100vw - 2rem), 1184px"
                src="/images/generated/leadership-room.webp"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="fractional-shape">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="fractional-shape">
            {pageCopy.shapeTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.shapeBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className={pageStyles.availability}>
              <p>{pageCopy.availability}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="fractional-proof">
        <div className={styles.container}>
          <SectionHeading id="fractional-proof" title={pageCopy.proofTitle} />
          <ul className={pageStyles.proofList}>
            {pageCopy.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="fractional-wrong-fit">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="fractional-wrong-fit">
            {pageCopy.wrongTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.wrongBody}</p>
          </div>
        </div>
      </section>

      <CompactProcess id="fractional-process" locale={locale} />
      <AdjacentServiceLinks
        id="fractional-adjacent"
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
