import { CalInlineEmbed } from "@/components/cal-inline-embed";
import { EngagementProcess } from "@/components/engagement-process";
import { ProgressiveContactForm } from "@/components/forms";
import {
  PageHero,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

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
  searchParams: Promise<{ details?: string }>;
}) {
  const { details } = await searchParams;
  const initialDetailsOpen = details === "open";
  const contactAction = siteConfig.contact.primaryAction;

  return (
    <div className={pageStyles.page}>
      <PageHero
        asideLabel="First conversation"
        asideValue="Typically 30 minutes · free"
        breadcrumbs={[{ label: "Contact" }]}
        lead={
          contactAction.isBooking
            ? "You do not need to choose a format first. Book a time below, or send a few lines if writing is easier."
            : "You do not need to choose a format first. Send a few lines and I will reply to arrange a time."
        }
        primary={contactAction}
        ctaPrimary
        secondary={
          contactAction.isBooking
            ? { label: "Send me a note", href: "#contact-form" }
            : undefined
        }
        title="Bring the issue as it is."
      />

      <section className={styles.startSection} aria-label="Contact and booking">
        <div
          className={`${styles.startGrid} ${contactAction.isBooking ? "" : styles.startGridSingle
            }`}
        >
          <div className={styles.formColumn}>
            <div className={styles.formShell}>
              <ProgressiveContactForm initialDetailsOpen={initialDetailsOpen} />
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

      <EngagementProcess title="What happens next?" />
    </div>
  );
}
