import {
  ContactBand,
  PageHero,
  ProcessList,
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
    breadcrumbPage: "Peer Advisory",
    title: "Sometimes you need to get out of the business to work on it.",
    lead: "The most useful advice a founder gets does not always come from an adviser. Sometimes it comes from someone six months ahead, facing the same problem.",
    whyTitle: "Why this works when advice does not.",
    whyBody: [
      "Outside advice has a weakness: the person giving it has not paid for being wrong about your situation. A peer has. They made the hire, kept the wrong person too long, split the role badly or waited nine months to have the conversation. They can tell you what it cost.",
      "I get the room to the real question quickly, stop people performing and make sure each person leaves with a decision they actually made.",
    ],
    formatsTitle: "Two formats.",
    formats: [
      {
        title: "A group of business owners",
        text: "I chair a Vistage peer advisory group of business owners in Malta. Owners and CEOs of non-competing companies meet regularly and work on decisions each of them is facing now.",
      },
      {
        title: "In-house, for larger organisations",
        text: "The same format can run inside one company for leaders who do not report to each other. They start solving one another's problems instead of routing every question through the founder. Reporting boundaries and confidentiality are agreed before the first session.",
      },
    ],
    roomTitle: "What happens in the room.",
    roomIntro:
      "Each person brings a live issue. Not a presentation: a decision they have not made yet.",
    roomSteps: [
      {
        title: "State the decision",
        description:
          "The person names the decision, the constraint and what has already been tried.",
      },
      {
        title: "Question before advising",
        description:
          "The room asks questions until the real issue is clear. Nobody races to prove they have the answer.",
      },
      {
        title: "Decide and commit",
        description:
          "Only then do peers say what they would do and what it cost when they got it wrong. The person leaves with a decision and a next step.",
      },
    ],
    confidenceTitle: "Nothing said in the room leaves it.",
    confidenceBody:
      "Nobody is there to sell to anyone. For an in-house group, the boundary between the room and the sponsoring organisation is written down before the first session.",
    suitsTitle: "Who this suits.",
    suitsBody:
      "Leaders who are past the point where more information helps, and have reached the point where isolation is part of the problem. If you have a capable team and still feel like the only person seeing the whole picture, peers can challenge that view without entering your reporting line.",
    availability:
      "In-person sessions can be arranged across Europe. The location, cadence and room are agreed with the group.",
    adjacent: [
      {
        routeId: "executiveCoaching" as const,
        label: "Executive Coaching",
        text: "If the work is yours alone and personal, Executive Coaching fits better.",
      },
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "If you need one specific decision thought through with someone outside your reporting line, that is advisory.",
      },
    ],
    closingTitle: "Bring a decision, not a presentation.",
    closingText:
      "The first conversation is free and typically takes 30 minutes. We can discuss the room, the boundary and whether the format fits.",
  },
  de: {
    breadcrumbServices: "Zusammenarbeit",
    breadcrumbPage: "Peer Advisory",
    title: "Manchmal hilft erst der Abstand vom Unternehmen, um daran zu arbeiten.",
    lead: "Der nützlichste Rat kommt nicht immer von außen. Manchmal kommt er von jemandem, der dieselbe Entscheidung vor sechs Monaten treffen musste.",
    whyTitle: "Warum Peers anders helfen als externe Beratung.",
    whyBody: [
      "Wer von außen berät, trägt nicht die Folgen einer falschen Entscheidung in Ihrer Situation. Ein Peer kennt diesen Preis aus eigener Erfahrung: nach einer Fehlbesetzung, einer schlecht zugeschnittenen Rolle oder einem Gespräch, das zu lange aufgeschoben wurde.",
      "Ich halte die Runde bei der eigentlichen Frage, statt bei Selbstdarstellung oder schnellen Ratschlägen. Am Ende steht eine Entscheidung der Person, die sie auch umsetzen muss.",
    ],
    formatsTitle: "Zwei Formate.",
    formats: [
      {
        title: "Eine Gruppe von Unternehmensinhabern",
        text: "Ich leite in Malta eine Vistage Peer-Advisory-Gruppe für Unternehmensinhaber. Inhaber und CEOs nicht konkurrierender Unternehmen treffen sich regelmäßig und arbeiten an Entscheidungen, die gerade vor ihnen liegen.",
      },
      {
        title: "Unternehmensintern, für größere Organisationen",
        text: "Dasselbe Format kann innerhalb eines Unternehmens mit Führungskräften stattfinden, die nicht in einer Berichtslinie zueinander stehen. Sie helfen einander bei aktuellen Entscheidungen, statt jede Frage an die Unternehmensleitung zurückzugeben. Grenzen der Berichterstattung und Vertraulichkeit stehen vor der ersten Sitzung fest.",
      },
    ],
    roomTitle: "So arbeitet die Runde.",
    roomIntro:
      "Jede Person bringt ein aktuelles Thema mit. Keine Präsentation, sondern eine noch offene Entscheidung.",
    roomSteps: [
      {
        title: "Die Entscheidung benennen",
        description:
          "Die Person beschreibt die offene Entscheidung, die Einschränkungen und bisherige Versuche.",
      },
      {
        title: "Erst fragen, dann beraten",
        description:
          "Die Runde fragt nach, bis das eigentliche Thema klar ist. Niemand muss als Erstes die richtige Antwort liefern.",
      },
      {
        title: "Entscheiden und festlegen",
        description:
          "Erst dann beschreiben Peers, was sie tun würden und welche Folgen ihre eigenen Fehler hatten. Die Person verlässt die Runde mit einer Entscheidung und einem nächsten Schritt.",
      },
    ],
    confidenceTitle: "Was in der Runde gesagt wird, bleibt in der Runde.",
    confidenceBody:
      "Niemand ist dort, um etwas zu verkaufen. Bei einer internen Gruppe halten wir vor der ersten Sitzung schriftlich fest, was in der Runde bleibt und was die beauftragende Organisation erfährt.",
    suitsTitle: "Für wen das passt.",
    suitsBody:
      "Das Format passt zu Führungskräften, denen mehr Information nicht weiterhilft und für die Isolation Teil des Problems geworden ist. Peers können Ihre Sicht hinterfragen, ohne Teil Ihrer Berichtslinie zu werden.",
    availability:
      "Treffen vor Ort sind in Europa möglich. Ort, Rhythmus und Zusammensetzung legen wir mit der Gruppe fest.",
    adjacent: [
      {
        routeId: "executiveCoaching" as const,
        label: "Executive Coaching",
        text: "Wenn die Arbeit bei Ihnen allein liegt und Ihre eigene Arbeitsweise betrifft, passt Executive Coaching besser.",
      },
      {
        routeId: "advisory" as const,
        label: "Strategic People Advisory",
        text: "Wenn Sie eine einzelne Entscheidung mit einer Person außerhalb Ihrer Berichtslinie durchdenken möchten, passt Strategic People Advisory.",
      },
    ],
    closingTitle: "Bringen Sie eine Entscheidung mit, keine Präsentation.",
    closingText:
      "Das erste Gespräch ist kostenlos und dauert normalerweise 30 Minuten. Wir klären, wie die Runde zusammengesetzt sein sollte, welcher Vertraulichkeitsrahmen gilt und ob das Format passt.",
  },
} as const;

export function PeerAdvisoryPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <ServiceStructuredData
        description={pageCopy.lead}
        locale={locale}
        name="Peer Advisory"
        routeId="peerAdvisory"
      />
      <PageHero
        breadcrumbs={[
          { label: pageCopy.breadcrumbServices, href: getRouteHref("services", locale) },
          { label: pageCopy.breadcrumbPage },
        ]}
        lead={pageCopy.lead}
        primary={contactAction}
        ctaPrimary
        locale={locale}
        secondary={{
          label: locale === "de" ? "Alle Formate ansehen" : "See all formats",
          href: getRouteHref("services", locale),
        }}
        title={pageCopy.title}
      />

      <section className={styles.section} aria-labelledby="peer-why">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="peer-why">
            {pageCopy.whyTitle}
          </h2>
          <div className={styles.bodyCopy}>
            {pageCopy.whyBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="peer-formats">
        <div className={styles.container}>
          <SectionHeading id="peer-formats" title={pageCopy.formatsTitle} />
          <div className={pageStyles.formatList}>
            {pageCopy.formats.map((format) => (
              <article className={pageStyles.formatItem} key={format.title}>
                <h3>{format.title}</h3>
                <p>{format.text}</p>
              </article>
            ))}
          </div>
          <div className={pageStyles.availability}>
            <p>{pageCopy.availability}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="peer-room">
        <div className={styles.container}>
          <SectionHeading
            id="peer-room"
            intro={pageCopy.roomIntro}
            title={pageCopy.roomTitle}
          />
          <ProcessList steps={pageCopy.roomSteps} />
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="peer-confidence">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="peer-confidence">
            {pageCopy.confidenceTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.confidenceBody}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="peer-suits">
        <div className={`${styles.container} ${styles.split}`}>
          <h2 className={styles.sectionTitle} id="peer-suits">
            {pageCopy.suitsTitle}
          </h2>
          <div className={styles.bodyCopy}>
            <p>{pageCopy.suitsBody}</p>
          </div>
        </div>
      </section>

      <CompactProcess id="peer-process" locale={locale} />
      <AdjacentServiceLinks
        id="peer-adjacent"
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
