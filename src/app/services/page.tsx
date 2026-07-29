import { ArrowRight } from "lucide-react";
import Link from "next/link";

import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/config/metadata";
import { getSiteUrl } from "@/config/site";

import styles from "./services.module.css";

export const metadata = createPageMetadata({
  title: "Services",
  description:
    "Compare Marc Berghoff's organisational Bottleneck Assessment, strategic people advisory, fractional people leadership and executive coaching.",
  path: "/services",
});

const offers = [
  {
    title: "Bottleneck Assessment",
    problem: "Several explanations are competing",
    copy: "A typical one-to-two-week organisational assessment, followed by a written report and a report workshop with the decision-makers.",
    meta: "€3,500 · scope confirmed",
    href: "/bottleneck-assessment",
  },
  {
    title: "Strategic people advisory",
    problem: "The decision is already visible",
    copy: "An independent second view on role questions, periods of change and other people decisions tied to the business plan.",
    meta: "Regular advisory",
    href: "/advisory",
  },
  {
    title: "Fractional people leadership",
    problem: "The agenda needs a senior owner",
    copy: "Part-time senior leadership for a defined period of growth or change, working inside the company while internal capability is built.",
    meta: "Defined fractional remit",
    href: "/fractional-people-leadership",
  },
  {
    title: "Executive coaching",
    problem: "The work belongs with one leader",
    copy: "Confidential one-to-one coaching on the part of a business problem that belongs with the founder or senior leader.",
    meta: "Private coaching",
    href: "/executive-coaching",
  },
] as const;

const choices = [
  {
    signal: "People disagree about the cause",
    title: "Use the assessment.",
    text: "It gives the leadership team a shared reading of the evidence before anyone commits to a fix.",
  },
  {
    signal: "The decision is defined",
    title: "Use advisory.",
    text: "Bring the live choice and the trade-offs around it. The work stays with the decision due now.",
  },
  {
    signal: "The agenda lacks a senior owner",
    title: "Use a fractional remit.",
    text: "This fits when the people work cannot wait and the permanent structure is still taking shape.",
  },
  {
    signal: "One leader wants to work differently",
    title: "Use coaching.",
    text: "The agreement stays with that leader: what they notice, decide and do differently in the role.",
  },
] as const;

export default function ServicesPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className={pageStyles.page}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Marc Berghoff services",
          itemListElement: offers.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: offer.title,
              description: offer.copy,
              url: `${siteUrl}${offer.href}`,
              provider: { "@id": `${siteUrl}/#marc-berghoff` },
            },
          })),
        }}
      />

      <PageHero
        eyebrow="Ways to work together"
        title="Match the format to the question."
        lead="Use the assessment when the cause is uncertain. Advisory, fractional leadership and coaching each begin with a more defined question. The first conversation is free, and there is no required sequence."
        primary={{ label: "Request a free conversation", href: "/contact" }}
        secondary={{ label: "Try the six-question check", href: "/#diagnostic" }}
      />

      <section className={pageStyles.section} aria-labelledby="service-options">
        <div className={pageStyles.container}>
          <SectionHeading
            id="service-options"
            kicker="The offer"
            title="Four ways to work on a live problem."
            intro="In the first conversation, Marc checks the question, the boundary of the work and who needs to be involved."
          />
          <div className={styles.offerGrid}>
            {offers.map((offer, index) => (
              <Link className={styles.offerCard} href={offer.href} key={offer.href}>
                <div className={styles.offerTopline}>
                  <span className={styles.offerIndex}>0{index + 1}</span>
                  <span className={styles.offerMeta}>{offer.meta}</span>
                </div>
                <div>
                  <p className={styles.offerProblem}>{offer.problem}</p>
                  <h3 className={styles.offerTitle}>{offer.title}</h3>
                  <p className={styles.offerCopy}>{offer.copy}</p>
                </div>
                <span className={styles.offerLink}>
                  See how it works
                  <ArrowRight aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
              </Link>
            ))}
          </div>
          <p className={styles.offerNote}>
            The assessment fee is €3,500. Participant scope, travel and applicable tax
            are confirmed before work begins.
          </p>
        </div>
      </section>

      <section className={pageStyles.sectionDark} aria-labelledby="choose-service">
        <div className={pageStyles.container}>
          <SectionHeading
            id="choose-service"
            kicker="Choosing a format"
            title="Where is the uncertainty?"
            intro="The answer usually tells you which format is proportionate."
          />
          <ol className={styles.choiceList}>
            {choices.map((choice) => (
              <li className={styles.choiceItem} key={choice.signal}>
                <span className={styles.choiceSignal}>{choice.signal}</span>
                <div>
                  <h3>{choice.title}</h3>
                  <p>{choice.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactBand
        title="Unsure which format fits?"
        text="Describe the decision or recurring issue. Marc will tell you which kind of work, if any, makes sense from here."
        label="Ask Marc"
      />
    </div>
  );
}
