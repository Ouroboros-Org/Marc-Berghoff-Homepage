import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { OutcomeNumber } from "@/components/outcome-number";
import { Reveal } from "@/components/reveal";
import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";
import { FEATURED_CASE, TESTIMONIALS } from "@/content/proof";

import resultStyles from "./results-page.module.css";

type WorkItem = {
  id: string;
  statement: string;
  context?: string;
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
    lead: "See how I have supported people, leadership and organisational change in different companies. Some clients are named; others are described anonymously.",
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
        id: "security-group-hr-leadership",
        statement: "Interim group-wide HR leadership for a security company with 400 employees across four companies",
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
    testimonials: TESTIMONIALS,
    speakingTitle: "Speaking and teaching.",
    speaking: [
      {
        id: "fhrd-keynote",
        statement: "Keynote at FHRD, a major HR conference in Malta",
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
    closingTitle: "What support would make a difference to your team?",
    closingText:
      "Tell me what you want to work on and who is involved. We can discuss where advice would help and where you need me to carry responsibility.",
    secondaryCta: "How I work",
  },
} as const;

function RuledProofList({ items }: { items: readonly WorkItem[] }) {
  return (
    <ul className={styles.resultList}>
      {items.map((item) => (
        <li key={item.id}>
          <Reveal className={styles.resultItem}>
            <span className={styles.resultMarker} aria-hidden="true" />
            <p>
              <strong>{item.statement}</strong>
              {item.context ? (
                <span className={styles.resultContext}>{item.context}</span>
              ) : null}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function ResultsPageView({ locale }: { locale: SiteLocale }) {
  const pageCopy = copy.en;
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

      <section className={styles.section} aria-labelledby="featured-case">
        <div className={styles.container}>
          <div className={resultStyles.feature}>
            <Reveal>
              <p className={resultStyles.kicker}>{FEATURED_CASE.kicker}</p>
              <h2 id="featured-case">{FEATURED_CASE.title}</h2>
              <p>{FEATURED_CASE.summary}</p>
              <Link className={resultStyles.featureLink} href={FEATURED_CASE.href}>
                Read the case <ArrowUpRight aria-hidden="true" size={18} />
              </Link>
            </Reveal>
            <div className={resultStyles.featureMetric}>
              <strong><OutcomeNumber value={FEATURED_CASE.metric} /></strong>
              <span>{FEATURED_CASE.metricLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${resultStyles.workSection}`} aria-labelledby="selected-engagements">
        <div className={styles.container}>
          <SectionHeading
            id="selected-engagements"
            title={pageCopy.selectedTitle}
          />
          <RuledProofList items={pageCopy.work} />
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="client-perspectives">
        <div className={styles.container}>
          <SectionHeading id="client-perspectives" title={pageCopy.testimonialsTitle} />
            <div className={resultStyles.quoteGrid}>
              {pageCopy.testimonials.map((testimonial) => (
                <blockquote
                  className={resultStyles.quote}
                  key={testimonial.attribution}
                >
                  <p lang="en">“{testimonial.quote}”</p>
                  <footer>{testimonial.attribution}</footer>
                </blockquote>
              ))}
            </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="speaking-teaching">
        <div className={styles.container}>
          <SectionHeading id="speaking-teaching" title={pageCopy.speakingTitle} />
          <RuledProofList items={pageCopy.speaking} />
        </div>
      </section>

      <section className={`${styles.section} ${resultStyles.clientsSection}`} aria-labelledby="named-clients">
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
        label="Book a call"
        helper="Free introduction · typically 30 minutes"
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
