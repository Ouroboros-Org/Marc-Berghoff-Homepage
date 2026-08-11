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
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { WORKING_FORMATS } from "@/content/working-formats";

import styles from "./services.module.css";

export const metadata = createPageMetadata({
  title: "How I Can Help",
  description:
    "Choose the level of involvement a leadership or organisation issue needs, from coaching and advice to a defined people-leadership remit.",
  path: "/services",
});

export default function ServicesPage() {
  const siteUrl = getSiteUrl();
  const contactAction = getPrimaryContactAction();

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
        primary={contactAction}
        secondary={{ label: "See the four-step process", href: "#process" }}
        title="The issue decides how involved I should be."
      />

      <section
        aria-labelledby="service-options"
        className={`${pageStyles.section} ${styles.optionsSection}`}
      >
        <div className={pageStyles.container}>
          <div className={styles.header}>
            <h2 id="service-options">Start with the issue.</h2>
            <p>
              We can choose the format after we understand it. The five routes differ
              in the evidence, responsibility and company context they need.
            </p>
          </div>
          <div className={styles.offerList}>
            {WORKING_FORMATS.map((offer) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <div className={styles.offerLabel}>
                  <span>{offer.responsibility}</span>
                  <small>{offer.meta}</small>
                </div>
                <h3>{offer.title}</h3>
                <p>{offer.signal}</p>
                <ArrowRight aria-hidden="true" size={22} />
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
        href={contactAction.href}
        label={contactAction.label}
        text="Tell me what is happening and what you have tried. I will tell you what kind of involvement, if any, makes sense from here."
        title="Start with the issue, not a service name."
      />
    </div>
  );
}
