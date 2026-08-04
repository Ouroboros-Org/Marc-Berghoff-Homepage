import Image from "next/image";

import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "How I work with people and organisation questions, and the experience I bring to a fractional, advisory or coaching remit.",
  path: "/about",
});

const credentials = [
  {
    title: "MSc in Psychology",
    text: "Academic training in psychology, applied to organisational and leadership questions.",
  },
  {
    title: "ICF Associate Certified Coach",
    text: "Current ACC credential and more than 350 completed coaching hours.",
  },
  {
    title: "Vistage peer advisory",
    text: "Confidential peer work with business leaders on decisions they are making now.",
  },
  {
    title: "Founder experience",
    text: "Co-founded CyberKongz in 2021 and worked inside the business as an operator.",
  },
] as const;

const principles = [
  {
    title: "Work from detail to strategy",
    text: "I can enter through the live operating issue, then help you move attention and ownership towards the decisions that matter.",
  },
  {
    title: "Use evidence and agreed measures",
    text: "We decide what progress should look like before judging the work. KPIs are useful when they answer a decision. Reporting without a decision adds noise.",
  },
  {
    title: "Build methods and people",
    text: "I use approaches such as OKRs or Scaling Up when they fit. Coaching and mentoring help new and emerging leaders grow into the work.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[{ label: "About me" }]}
        title="When people decisions need attention."
        lead="I can own a defined remit, advise on a decision, investigate a recurring problem or coach one leader. My background matters where it helps me work with the situation in front of you."
        asideLabel="Based in"
        asideValue="Malta · international"
        primary={{ label: "Book a free conversation", href: "/contact#booking", variant: "secondary" }}
        ctaPrimary={true}
        secondary={{ label: "Run the six-question check", href: "/?check=open#diagnostic", variant: "primary" }}
        ctaSecondary={true}
      />

      <section className={styles.section} aria-label="Marc Berghoff biography">
        <div className={`${styles.container} ${styles.split}`}>
          <figure>
            <div className={styles.portraitImageWrap}>
              <Image
                className={styles.portraitImage}
                src="/images/portraits/marc-seated-original.jpg"
                alt="Marc Berghoff seated in an office setting"
                fill
                sizes="(max-width: 928px) calc(100vw - 2rem), 38vw"
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>Marc Berghoff</span>
              <span>Fractional leadership · advisory · coaching</span>
            </figcaption>
          </figure>
          <div>
            <p className={styles.sectionKicker}>Background</p>
            <h2 className={styles.sectionTitle}>Organisation questions arrive while the business is moving.</h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              <p>
                I started in people leadership and later moved into advisory, coaching
                and the practical responsibility of co-founding CyberKongz. The
                organisation questions arrived while people were trying to run the
                business.
              </p>
              <p>
                I have also worked with people questions at Klarsolar, provided
                fractional HR leadership to Alberta Fire &amp; Security and worked with
                leaders through Vistage peer advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <SectionHeading id="about-credentials" kicker="Credentials" title="Background" />
          <div className={styles.credentialGrid}>
            {credentials.map((credential) => (
              <article className={styles.credentialCard} key={credential.title}>
                <h3 className={styles.credentialTitle}>{credential.title}</h3>
                <p>{credential.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="working-principles">
        <div className={styles.container}>
          <SectionHeading id="working-principles" kicker="Leadership principles" title="How I work with your business." />
          <div className={styles.cardGrid}>
            {principles.map((principle, index) => (
              <article className={styles.darkCard} key={principle.title}>
                <p className={styles.darkCardNumber}>0{index + 1}</p>
                <h3 className={styles.featureCardTitle}>{principle.title}</h3>
                <p className={styles.sectionIntro}>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EngagementProcess />

      <ContactBand
        href="/contact#booking"
        title="Start with the situation as it is."
        text="I use the free first conversation to understand the question and tell you if I am the right person for it."
        label="Book the free conversation"
      />
    </div>
  );
}
