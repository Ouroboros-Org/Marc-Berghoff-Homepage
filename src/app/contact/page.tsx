import { ExtendedContactForm } from "@/components/forms";
import {
  PageHero,
  ProcessList,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { siteConfig } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Marc Berghoff about a bottleneck assessment, strategic people advisory, fractional people leadership or executive coaching.",
  path: "/contact",
});

const nextSteps = [
  {
    title: "Marc reads it himself",
    description:
      "He uses the detail to understand the business issue and whether it falls within his work.",
  },
  {
    title: "He replies directly",
    description:
      "If the question belongs with another kind of specialist, he will say so.",
  },
  {
    title: "You agree what happens next",
    description:
      "The first conversation is free and carries no commitment to a paid engagement.",
  },
] as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Contact"
        title="Where does the business keep getting stuck?"
        lead="Describe what is happening and what the team has tried. You can leave the explanation and choice of service open; Marc will read the note himself."
        asideLabel="First conversation"
        asideValue="No charge · direct with Marc"
      />

      <section className={styles.section} aria-label="Contact Marc Berghoff">
        <div className={`${styles.container} ${styles.contactLayout}`}>
          <aside>
            <p className={styles.sectionKicker}>Direct contact</p>
            <h2 className={styles.sectionTitle}>Prefer email or phone?</h2>
            <p className={styles.sectionIntro}>
              The form gives Marc enough background to reply properly. For a simple question, email or call him.
            </p>
            <dl className={styles.contactDetails}>
              <div className={styles.contactDetail}>
                <dt>Email</dt>
                <dd>
                  <a className={styles.contactLink} href={`mailto:${siteConfig.contact.email}`}>
                    {siteConfig.contact.email}
                  </a>
                </dd>
              </div>
              <div className={styles.contactDetail}>
                <dt>Phone</dt>
                <dd>
                  <a className={styles.contactLink} href={`tel:${siteConfig.contact.phoneHref}`}>
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div className={styles.contactDetail}>
                <dt>Location</dt>
                <dd>Malta · working internationally</dd>
              </div>
              <div className={styles.contactDetail}>
                <dt>Booking link</dt>
                <dd>
                  {siteConfig.contact.bookingUrl ? (
                    <a
                      className={styles.contactLink}
                      href={siteConfig.contact.bookingUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      Choose a time
                    </a>
                  ) : (
                    <a className={styles.contactLink} href="#contact-form">
                      Use the enquiry form
                    </a>
                  )}
                </dd>
              </div>
            </dl>
            <p className={styles.disclaimer}>
              Keep confidential employee records, health information and other sensitive personal data out of an initial enquiry.
            </p>
          </aside>

          <div className={styles.formShell}>
            <ExtendedContactForm
              id="contact-form"
              title="Give Marc enough context to respond."
              intro="A few specifics help him see whether the question belongs in coaching or sits across the organisation."
            />
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="contact-next-steps">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>What happens next</p>
            <h2 className={styles.sectionTitle} id="contact-next-steps">
              After you press send.
            </h2>
          </div>
          <ProcessList steps={nextSteps} />
        </div>
      </section>
    </div>
  );
}
