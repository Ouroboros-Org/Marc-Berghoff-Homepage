import Image from "next/image";

import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

type WorkItem = {
  id: string;
  statement: string;
  context?: string;
};

type ProofQuote = {
  quote: string;
  attribution: string;
};

const clientLogos = [
  {
    name: "Klarsolar",
    src: "/images/clients/klarsolar.webp",
    width: 580,
    height: 390,
  },
  {
    name: "Giftagoods",
    src: "/images/clients/giftagoods.webp",
    width: 447,
    height: 447,
  },
  {
    name: "CyberKongz",
    src: "/images/clients/cyberkongz.svg",
    width: 1200,
    height: 381,
  },
  {
    name: "Alberta Fire & Security",
    src: "/images/clients/alberta.svg",
    width: 107,
    height: 80,
  },
  {
    name: "Vistage",
    src: "/images/clients/vistage.svg",
    width: 112,
    height: 22,
  },
] as const;

const copy = {
  en: {
    breadcrumbs: [
      { label: "About", href: "/about" },
      { label: "Selected work" },
    ],
    title: "Selected work",
    lead: "Some of these clients can be named. Several can't, so they're described instead — accurately, and in enough detail that you can judge whether the work is relevant to you.",
    selectedTitle: "Selected engagements.",
    work: [
      {
        id: "scaleup-leadership-coaching",
        statement:
          "Leadership coaching with over 10 team and department leads at a scale-up past €200m ARR",
        context: "Now in the second year of the engagement.",
      },
      {
        id: "financial-regulator-coaching",
        statement:
          "Executive coaching with two department leaders at Malta’s financial services regulator",
      },
      {
        id: "igaming-executives-workshops",
        statement:
          "Two executives coached and two top-management workshops at an international iGaming events and media group",
      },
      {
        id: "financial-services-sourcing",
        statement:
          "Built an active sourcing approach with the CFO of a German financial services group",
        context: "They still run it today.",
      },
      {
        id: "solar-scaleup-head-of-hr",
        statement: "Head of HR at a solar scale-up later acquired by E.ON",
      },
      {
        id: "dubai-ceo-owner-mediation",
        statement:
          "Executive coaching and mediation between the CEO and the owner of a marketing agency in Dubai",
      },
      {
        id: "web3-web2-pivot",
        statement: "Facilitated the strategic pivot of a Web3 business into Web2",
        context: "Its lead investor had withdrawn.",
      },
      {
        id: "small-business-owner-chairing",
        statement:
          "Ongoing support for several small-business owners as their Vistage Chair",
      },
    ] satisfies readonly WorkItem[],
    testimonialsTitle: "What clients say.",
    testimonials: [
      {
        quote:
          "Marc helped us to grow our business after a funding from Global Founders Capital and supported with interim management if needed. He is a great leader, quick thinker, and highly professional. We highly recommend him and wish him all the best for his company!",
        attribution: "Head of HR, Klarsolar",
      },
      {
        quote:
          "Marc has been with me through the struggling stage, the getting-by stage, and the doing-pretty-well stage. He’s empathetic enough to relate to your situation, clever enough to advise on a sensible way forward. He doesn’t just follow up, he follows through. I would recommend Marc to anyone that’s feeling stuck in their business or just wants to tighten up their operation.",
        attribution: "Chris Mercieca, Giftagoods",
      },
    ] satisfies readonly ProofQuote[],
    speakingTitle: "Speaking and teaching.",
    speaking: [
      {
        id: "fhrd-keynote",
        statement: "Keynote at FHRD, Malta’s largest HR conference",
        context: "On the impact and importance of coaching.",
      },
      {
        id: "undergraduate-lecturer",
        statement: "Lecturer in training and development",
        context: "Undergraduate HR management.",
      },
      {
        id: "vistage-chair",
        statement: "Vistage Chair",
        context: "I chair a peer advisory group of business owners in Malta.",
      },
    ] satisfies readonly WorkItem[],
    clientsTitle: "Named organisations.",
    closingTitle: "What keeps returning to the leadership team?",
    closingText:
      "Tell me what has happened, who is involved and what you have already tried. I will tell you if I can help.",
    secondaryCta: "How I work",
  },
  de: {
    breadcrumbs: [
      { label: "Über mich", href: "/de/about" },
      { label: "Ausgewählte Arbeit" },
    ],
    title: "Ausgewählte Arbeit",
    lead: "Einige Auftraggeber kann ich nennen, andere nicht. Deshalb beschreibe ich sie so genau, dass Sie selbst einschätzen können, ob die Arbeit für Ihre Situation relevant ist.",
    selectedTitle: "Ausgewählte Mandate.",
    work: [
      {
        id: "scaleup-leadership-coaching",
        statement:
          "Leadership-Coaching für mehr als zehn Team- und Bereichsleitungen eines Scale-ups mit über 200 Mio. Euro ARR",
        context: "Die Zusammenarbeit läuft inzwischen im zweiten Jahr.",
      },
      {
        id: "financial-regulator-coaching",
        statement:
          "Executive Coaching für zwei Führungskräfte mit Bereichsverantwortung bei Maltas Finanzdienstleistungsaufsicht",
      },
      {
        id: "igaming-executives-workshops",
        statement:
          "Zwei Führungskräfte gecoacht und zwei Workshops mit dem Topmanagement einer internationalen iGaming-Veranstaltungs- und Mediengruppe",
      },
      {
        id: "financial-services-sourcing",
        statement:
          "Mit dem CFO einer deutschen Finanzdienstleistungsgruppe einen Active-Sourcing-Ansatz aufgebaut",
        context: "Die Gruppe nutzt ihn bis heute.",
      },
      {
        id: "solar-scaleup-head-of-hr",
        statement:
          "Head of HR bei einem Solar-Scale-up, das später von E.ON übernommen wurde",
      },
      {
        id: "dubai-ceo-owner-mediation",
        statement:
          "Executive Coaching und Mediation zwischen dem CEO und dem Eigentümer einer Marketingagentur in Dubai",
      },
      {
        id: "web3-web2-pivot",
        statement:
          "Die strategische Neuausrichtung eines Web3-Unternehmens auf Web2 moderiert",
        context: "Zuvor hatte sich der Hauptinvestor zurückgezogen.",
      },
      {
        id: "small-business-owner-chairing",
        statement:
          "Laufende Begleitung mehrerer Inhaber kleiner Unternehmen in der Peer-Advisory-Gruppe, die ich leite",
      },
    ] satisfies readonly WorkItem[],
    testimonialsTitle: "Was Kunden sagen.",
    testimonials: [
      {
        quote:
          "Marc helped us to grow our business after a funding from Global Founders Capital and supported with interim management if needed. He is a great leader, quick thinker, and highly professional. We highly recommend him and wish him all the best for his company!",
        attribution: "Head of HR, Klarsolar · Original auf Englisch",
      },
      {
        quote:
          "Marc has been with me through the struggling stage, the getting-by stage, and the doing-pretty-well stage. He’s empathetic enough to relate to your situation, clever enough to advise on a sensible way forward. He doesn’t just follow up, he follows through. I would recommend Marc to anyone that’s feeling stuck in their business or just wants to tighten up their operation.",
        attribution: "Chris Mercieca, Giftagoods · Original auf Englisch",
      },
    ] satisfies readonly ProofQuote[],
    speakingTitle: "Vorträge und Lehre.",
    speaking: [
      {
        id: "fhrd-keynote",
        statement: "Keynote bei der FHRD, Maltas größter HR-Konferenz",
        context: "Über Wirkung und Bedeutung von Coaching.",
      },
      {
        id: "undergraduate-lecturer",
        statement: "Dozent für Training und Entwicklung",
        context: "Im Bachelorstudiengang HR Management.",
      },
      {
        id: "vistage-chair",
        statement: "Vistage Chair",
        context:
          "Ich leite in Malta eine Peer-Advisory-Gruppe für Unternehmensinhaber.",
      },
    ] satisfies readonly WorkItem[],
    clientsTitle: "Organisationen, die ich nennen kann.",
    closingTitle: "Welche Frage landet immer wieder bei Ihrem Führungsteam?",
    closingText:
      "Beschreiben Sie, was passiert ist, wer beteiligt ist und was Sie bereits versucht haben. Ich sage Ihnen offen, ob ich helfen kann.",
    secondaryCta: "So arbeite ich",
  },
} as const;

function RuledProofList({ items }: { items: readonly WorkItem[] }) {
  return (
    <ul className={styles.resultList}>
      {items.map((item) => (
        <li className={styles.resultItem} key={item.id}>
          <span className={styles.resultMarker} aria-hidden="true" />
          <p>
            <strong>{item.statement}</strong>
            {item.context ? (
              <span className={styles.resultContext}> — {item.context}</span>
            ) : null}
          </p>
        </li>
      ))}
    </ul>
  );
}

export function ResultsPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy[locale];
  const contactAction = getPrimaryContactAction(locale);

  return (
    <div className={styles.page} lang={locale}>
      <PageHero
        breadcrumbs={pageCopy.breadcrumbs}
        compact
        lead={pageCopy.lead}
        locale={locale}
        title={pageCopy.title}
      />

      <section className={styles.section} aria-labelledby="selected-engagements">
        <div className={styles.container}>
          <SectionHeading
            id="selected-engagements"
            title={pageCopy.selectedTitle}
          />
          <RuledProofList items={pageCopy.work} />

          <div className={styles.testimonialSection}>
            <h3 className={styles.subsectionTitle}>{pageCopy.testimonialsTitle}</h3>
            <div className={styles.testimonialGrid}>
              {pageCopy.testimonials.map((testimonial) => (
                <blockquote
                  className={styles.testimonial}
                  key={testimonial.attribution}
                >
                  <p lang="en">“{testimonial.quote}”</p>
                  <footer>{testimonial.attribution}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="speaking-teaching">
        <div className={styles.container}>
          <SectionHeading id="speaking-teaching" title={pageCopy.speakingTitle} />
          <RuledProofList items={pageCopy.speaking} />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="named-clients">
        <div className={styles.container}>
          <SectionHeading id="named-clients" title={pageCopy.clientsTitle} />
          <ul className={styles.logoList}>
            {clientLogos.map((logo) => (
              <li className={styles.logoItem} key={logo.name}>
                <Image
                  alt={logo.name}
                  className={styles.clientLogo}
                  height={logo.height}
                  src={logo.src}
                  width={logo.width}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>


      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        locale={locale}
        secondary={{
          href: getRouteHref("services", locale),
          label: pageCopy.secondaryCta,
        }}
        text={pageCopy.closingText}
        title={pageCopy.closingTitle}
      />
    </div>
  );
}
