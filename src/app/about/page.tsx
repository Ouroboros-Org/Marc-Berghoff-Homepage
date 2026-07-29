import Image from "next/image";

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
    "Meet Marc Berghoff, a Malta-based people adviser with an MSc in Psychology, founder experience and an ICF Associate Certified Coach credential.",
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
    title: "Investigate before prescribing",
    text: "A people problem can begin in the way the business sets priorities or assigns decisions. Marc looks for the cause before recommending a response.",
  },
  {
    title: "Use current material",
    text: "A delayed decision, difficult hire or postponed conversation is more useful than a hypothetical case study.",
  },
  {
    title: "Leave the decision with the client",
    text: "Marc challenges the reasoning and supports the work. Accountability stays with the people running the business.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[{ label: "About Marc" }]}
        eyebrow="About Marc"
        title="An independent adviser with operator experience."
        lead="Marc has an MSc in Psychology and has worked in people leadership, founder roles and executive coaching. He helps leadership teams examine the operating problems that sit behind recurring people issues."
        asideLabel="Based in"
        asideValue="Malta · international"
        primary={{ label: "Request a free conversation", href: "/contact", variant: "secondary" }}
        ctaPrimary={true}
        secondary={{ label: "See selected results", href: "/results", variant: "primary" }}
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
              <span>People adviser &amp; executive coach</span>
            </figcaption>
          </figure>
          <div>
            <p className={styles.sectionKicker}>Background</p>
            <h2 className={styles.sectionTitle}>From in-house people leadership to advisory.</h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              <p>
                Marc&apos;s work moved from in-house people leadership into advisory and executive coaching. He also co-founded CyberKongz, which gave him direct responsibility for decisions involving a team, a business and its reputation.
              </p>
              <p>
                He supported Klarsolar during a six-month increase from 35 to 150 people and later provided fractional HR leadership to Alberta Fire &amp; Security. Today, he combines advisory and fractional work with an ICF-credentialed ACC coaching practice and Vistage peer advisory.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <SectionHeading id="about-credentials" kicker="Credentials" title="The facts behind the biography." />
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
          <SectionHeading id="working-principles" kicker="Working principles" title="What shapes Marc's advice." />
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

      <ContactBand
        href="/contact/message"
        title="Bring the situation as it is."
        text="Marc will use the free first conversation to understand the question and tell you whether he is the right person for it."
        label="Talk with Marc"
      />
    </div>
  );
}
