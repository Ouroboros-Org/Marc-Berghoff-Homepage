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
import {
  CORE_WORKING_FORMATS,
  SUPPORTING_WORKING_FORMATS,
  WORKING_FORMATS,
} from "@/content/working-formats";

import styles from "./services.module.css";

export const metadata = createPageMetadata({
  title: "How I Can Help",
  description:
    "Choose the level of involvement a leadership or organisation issue needs, from coaching and advice to defined fractional responsibility.",
  path: "/services",
});

export default function ServicesPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className={pageStyles.page}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ways Marc Berghoff can help",
          itemListElement: WORKING_FORMATS.map((offer, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: offer.title,
              description: offer.summary,
              url: `${siteUrl}${offer.href}`,
              provider: { "@id": `${siteUrl}/#marc-berghoff` },
            },
          })),
        }}
      />

      <PageHero
        breadcrumbs={[{ label: "How I can help" }]}
        compact
        lead="Sometimes you need room to think. Sometimes you need a candid second view. Sometimes the work needs an owner. I use the first conversation to understand the issue before I recommend a format."
        primary={{ label: "Book a free 30-minute conversation", href: "/contact#booking" }}
        secondary={{ label: "See the four-step process", href: "#process" }}
        title="The issue decides how involved I should be."
      />

      <section className={`${pageStyles.section} ${styles.optionsSection}`} aria-labelledby="service-options">
        <div className={pageStyles.container}>
          <div className={styles.header}>
            <h2 id="service-options">From coaching distance to defined ownership.</h2>
            <p>
              These three formats differ in one practical way: who carries the work
              after our conversation.
            </p>
          </div>
          <div className={styles.offerList}>
            {CORE_WORKING_FORMATS.map((offer) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <div className={styles.offerLabel}>
                  <span>{offer.responsibility}</span>
                  <small>{offer.meta}</small>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${pageStyles.sectionTint} ${styles.supportingSection}`} aria-labelledby="supporting-options">
        <div className={pageStyles.container}>
          <div className={styles.header}>
            <h2 id="supporting-options">When the issue needs another step.</h2>
            <p>
              Assessment helps when the cause is still unclear. Group coaching is for
              leaders who need to work on a shared question without handing it over.
            </p>
          </div>
          <div className={styles.supportingGrid}>
            {SUPPORTING_WORKING_FORMATS.map((offer) => (
              <Link className={styles.supportingOffer} href={offer.href} key={offer.href}>
                <span>{offer.responsibility}</span>
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <small>{offer.meta}</small>
                <ArrowRight aria-hidden="true" size={21} />
              </Link>
            ))}
          </div>
          <p className={styles.offerNote}>
            We can choose the label after we talk. The first 30 minutes are free and
            come before any paid relationship.
          </p>
        </div>
      </section>

      <div id="process">
        <EngagementProcess />
      </div>

      <ContactBand
        href="/contact#booking"
        label="Book the free conversation"
        text="Tell me what is happening and what you have tried. I will tell you what kind of involvement, if any, makes sense from here."
        title="Start with the issue, not a service name."
      />
    </div>
  );
}
