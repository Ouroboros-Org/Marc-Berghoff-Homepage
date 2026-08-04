import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/config/metadata";
import { getSiteUrl } from "@/config/site";

import styles from "./services.module.css";

export const metadata = createPageMetadata({
  title: "Work With Me",
  description:
    "Choose between fractional leadership, strategic people advisory, a Bottleneck Assessment, individual coaching and a developing group format.",
  path: "/services",
});

const offers = [
  {
    title: "Fractional leadership",
    signal: "The work needs a senior owner.",
    copy: "I join your operating rhythm for an agreed period and own a defined set of people and organisation priorities. We agree the decision rights and handover in advance.",
    meta: "Defined part-time remit",
    href: "/fractional-people-leadership",
  },
  {
    title: "Strategic people advisory",
    signal: "The decision is visible, but difficult.",
    copy: "You keep the decision. I bring an outside view to senior hires, role design, change and other people questions tied to the business plan.",
    meta: "Ongoing or time-bound",
    href: "/advisory",
  },
  {
    title: "Bottleneck Assessment",
    signal: "The cause is still disputed.",
    copy: "I compare interviews, operating evidence and the way decisions move. You receive a written report and work through the priority decisions with me.",
    meta: "Fixed assessment · €3,500",
    href: "/bottleneck-assessment",
  },
  {
    title: "Individual coaching",
    signal: "The work belongs with one leader.",
    copy: "We define the change you want, how you will recognise progress and which current situations give us useful material.",
    meta: "Private one-to-one work",
    href: "/executive-coaching",
  },
  {
    title: "Group coaching",
    signal: "Several leaders are working on related questions.",
    copy: "A coaching format for leaders working on related questions. The audience, group size, rhythm and fee are still being developed.",
    meta: "Offer in development",
    href: "/group-coaching",
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
          name: "Ways to work with Marc Berghoff",
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
        breadcrumbs={[{ label: "Work with me" }]}
        compact
        lead="You may need someone to own a remit, challenge a decision, establish why a problem keeps returning or coach one leader. I use the free first conversation to recommend the lightest format that fits."
        primary={{ label: "Book a free 30-minute conversation", href: "/contact#booking" }}
        secondary={{ label: "Run the six-question check", href: "/?check=open#diagnostic" }}
        title="Choose by who needs to carry the work."
      />

      <section className={`${pageStyles.section} ${styles.optionsSection}`} aria-labelledby="service-options">
        <div className={pageStyles.container}>
          <div className={styles.header}>
            <h2 id="service-options">What does the work need from me?</h2>
            <p>I check the question, the boundary and who needs to be involved before I propose a format.</p>
          </div>
          <div className={styles.offerList}>
            {offers.map((offer) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <div className={styles.offerLabel}>
                  <span>{offer.signal}</span>
                  <small>{offer.meta}</small>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.copy}</p>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
          <p className={styles.offerNote}>
            For the Bottleneck Assessment, participant scope, travel and applicable tax
            are confirmed before work begins.
          </p>
        </div>
      </section>

      <EngagementProcess />

      <ContactBand
        href="/contact#booking"
        label="Book the free conversation"
        text="Tell me about the decision or recurring issue. I will tell you which kind of work, if any, makes sense from here."
        title="Unsure which format fits?"
      />
    </div>
  );
}
