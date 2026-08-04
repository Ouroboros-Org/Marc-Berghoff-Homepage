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
    "Book a free 30-minute conversation or send me a short note about the people, organisation or leadership question in front of you.",
  path: "/contact",
});

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ details?: string }>;
}) {
  const { details } = await searchParams;
  const initialDetailsOpen = details === "open";

  return (
    <div className={pageStyles.page}>
      <PageHero
        asideLabel="First conversation"
        asideValue="30 minutes · free"
        breadcrumbs={[{ label: "Contact" }]}
        lead="The first 30 minutes are free. Use the calendar or send a short note below."
        primary={{ label: "Choose a time", href: "#booking" }}
        secondary={{ label: "Send me a note", href: "#contact-form" }}
        title="Choose a time or send me a note."
      />

      <section className={styles.bookingSection} id="booking" aria-labelledby="booking-title">
        <div className={styles.container}>
          <div className={styles.bookingHeader}>
            <h2 id="booking-title">Choose a time that works.</h2>
            <p>
              You do not need to choose a service before we talk.
            </p>
          </div>
          <CalInlineEmbed calLink={siteConfig.contact.calLink} />
        </div>
      </section>

      <section className={styles.messageSection} aria-label="Send me a note">
        <div className={styles.messageLayout}>
          <aside className={styles.contactAside}>
            <h2>A note is enough to begin.</h2>
            <p>
              I read every message myself. Leave the service open if you are unsure
              where the question belongs.
            </p>
            <details className={styles.directDetails}>
              <summary>
                {siteConfig.contact.phoneHref ? "Email or call instead" : "Email instead"}
              </summary>
              <dl>
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
            </details>
          </aside>
          <div className={styles.formShell}>
            <ProgressiveContactForm initialDetailsOpen={initialDetailsOpen} />
          </div>
        </div>
      </section>

      <EngagementProcess />
    </div>
  );
}
