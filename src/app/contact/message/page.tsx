import { ButtonLink } from "@/components/button";
import { SessionQuickContactForm } from "@/components/forms";
import {
  PageHero,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Send a Message",
  description:
    "Send Marc Berghoff a short message. Name, email and a few lines are enough for a direct reply.",
  path: "/contact/message",
});

export default function MessagePage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "Contact", href: "/contact" },
          { label: "Send a message" },
        ]}
        eyebrow="Quick message"
        title="A few lines are enough to start."
        lead="Use this route for a straightforward question or first introduction. If the issue needs company context, timing and a desired outcome, use the detailed enquiry instead."
        primary={{ label: "Write your message", href: "#message-form" }}
        secondary={{ label: "Share more context", href: "/contact" }}
      />

      <section className={styles.section} aria-label="Send Marc Berghoff a message">
        <div className={`${styles.container} ${styles.contactLayout}`}>
          <aside>
            <p className={styles.sectionKicker}>Short route</p>
            <h2 className={styles.sectionTitle}>Use the smallest form that fits.</h2>
            <p className={styles.sectionIntro}>
              Marc reads the message himself. You do not need to choose a service or
              prepare a brief before getting in touch.
            </p>
            <div className={styles.spacedTop}>
              <ButtonLink href="/contact" variant="secondary">
                Open the detailed enquiry
              </ButtonLink>
            </div>
            <dl className={styles.contactDetails}>
              <div className={styles.contactDetail}>
                <dt>Email</dt>
                <dd>
                  <a
                    className={styles.contactLink}
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className={styles.contactDetail}>
                <dt>Privacy</dt>
                <dd>
                  Keep employee records, health information and other sensitive
                  personal data out of an initial message.
                </dd>
              </div>
            </dl>
          </aside>

          <div className={styles.formShell}>
            <SessionQuickContactForm
              id="message-form"
              title="What would you like Marc to know?"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
