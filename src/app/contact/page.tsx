import { CalInlineEmbed } from "@/components/cal-inline-embed";
import { EngagementProcess } from "@/components/engagement-process";
import { ProgressiveContactForm } from "@/components/forms";
import {
  PageHero,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

import styles from "./contact.module.css";

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
        asideValue="30 minutes · free"
        breadcrumbs={[{ label: "Contact" }]}
        lead={
          contactAction.isBooking
            ? "Bring the issue before you have chosen a service or worked out a diagnosis. Book a time below, or send a short note if writing is easier."
            : "Bring the issue before you have chosen a service or worked out a diagnosis. Send a short note and I will reply to arrange a time."
        }
        primary={contactAction}
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
            <div className={styles.startHeader}>
              <h2>Start with a few lines.</h2>
              <p>
                I read every message myself. Leave the service open if you are unsure
                where the question belongs.
              </p>
            </div>
            <div className={styles.formShell}>
              <ProgressiveContactForm initialDetailsOpen={initialDetailsOpen} />
            </div>
          </div>
          {contactAction.isBooking ? (
            <div className={styles.bookingColumn} id="booking">
              <div className={styles.startHeader}>
                <h2 id="booking-title">Choose a time to talk it through.</h2>
                <p>
                  The first conversation is free and comes before any paid relationship.
                  We will work out whether another conversation makes sense.
                </p>
              </div>
              <CalInlineEmbed calLink={siteConfig.contact.calLink} />
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
              Would you rather call or send an email?
            </h2>
            <p>
              Reach me directly if a form is not the easiest way to start.
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
              <dd>Malta · working internationally</dd>
            </div>
          </dl>
        </div>
      </section>

      <EngagementProcess title="What happens next?" />
    </div>
  );
}
