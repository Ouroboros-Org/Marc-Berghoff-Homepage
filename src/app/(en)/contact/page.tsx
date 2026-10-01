import { CalInlineEmbed } from "@/components/cal-inline-embed";
import { EngagementProcess } from "@/components/engagement-process";
import { ProgressiveContactForm } from "@/components/forms";
import { PeerAdvisoryForm } from "@/components/forms/PeerAdvisoryForm";
import {
  PageHero,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";
import { getEnquiryTopic } from "@/lib/contact-schema";

import styles from "@/components/contact-page.module.css";

export const metadata = createPageMetadata({
  title: "Book a Free Conversation",
  description:
    "Book a free 30-minute conversation or send me a short note about the leadership, organisation or people issue in front of you.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ details?: string; interest?: string | string[] }>;
}) {
  const { details, interest } = await searchParams;
  const initialDetailsOpen = details === "open";
  const contactAction = siteConfig.contact.primaryAction;

  return (
    <div className={pageStyles.page}>
      <PageHero
        breadcrumbs={[{ label: "Contact" }]}
        lead={
          contactAction.isBooking
            ? "You do not need to choose an engagement first. Book a time below, or send a few lines if writing is easier."
            : "You do not need to choose an engagement first. Send a few lines and I will reply to arrange a time."
        }
        primary={{ ...contactAction, href: "#booking", label: "Book a call", helper: "Free introduction · typically 30 minutes" }}
        ctaPrimary
        secondary={
          contactAction.isBooking
            ? { label: "Send a note", href: "#enquiry" }
            : undefined
        }
        title="Tell me what you want to work on."
      />

      <section className={styles.startSection} aria-label="Contact and booking">
        <div
          className={`${styles.startGrid} ${contactAction.isBooking ? "" : styles.startGridSingle
            }`}
        >
          <div className={styles.formColumn} id="enquiry">
            <div className={styles.formShell}>
              <ProgressiveContactForm initialDetailsOpen={initialDetailsOpen} initialTopic={getEnquiryTopic(interest)} />
            </div>
          </div>
          {contactAction.isBooking ? (
            <div className={styles.bookingColumn} id="booking">
              <div className={styles.startHeader}>
                <h2 id="booking-title">Choose a time to talk it through.</h2>
                <p>
                  There is no charge and it typically takes 30 minutes. We use the time
                  to understand the question and decide what, if anything, should happen next.
                </p>
              </div>
              <CalInlineEmbed calLink={siteConfig.contact.calLink} locale="en" />
            </div>
          ) : null}
        </div>
      </section>

      <section
        className={styles.directSection}
        id="direct-contact"
        aria-labelledby="direct-contact-title"
      >
        <div className={styles.container}>
          <div className={styles.directHeader}>
            <h2 id="direct-contact-title">
              If the form gets in the way, contact me directly.
            </h2>
            <p>
              Use whichever direct route is easier.
            </p>
          </div>
          <dl className={styles.directList}>
            <div>
              <dt>Email</dt>
              <dd>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </dd>
            </div>
            {siteConfig.contact.phoneHref && siteConfig.contact.phoneDisplay ? (
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={`tel:${siteConfig.contact.phoneHref}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
            ) : null}
            <div>
              <dt>Location</dt>
              <dd>Based in Malta · working internationally</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className={styles.waitlistSection} id="european-peer-advisory" aria-labelledby="peer-advisory-title">
        <div className={styles.waitlistContainer}>
          <div className={styles.startHeader}>
            <h2 id="peer-advisory-title">European peer advisory for small-business owners</h2>
            <p>I’m curating a new peer-advisory group for European small-business owners. Register your interest to hear more as it takes shape. Registering interest does not commit you to joining.</p>
          </div>
          <div className={styles.formShell}><PeerAdvisoryForm /></div>
        </div>
      </section>

      <div className={styles.processAnchor} id="how-we-begin">
        <EngagementProcess title="How working together begins" intro="For enquiries about working together, we start with a conversation. You do not need to arrive with a diagnosis or a chosen service; we work out the right level of support together." note="The European peer-group waitlist is a separate expression of interest." />
      </div>
    </div>
  );
}
