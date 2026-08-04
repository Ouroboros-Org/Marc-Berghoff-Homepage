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
    "How I help founders and leadership teams work through difficult leadership and organisation questions.",
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
    title: "From hands-on to strategic",
    text: "I start with the live operating issue, then help move attention and ownership towards the decisions that matter.",
  },
  {
    title: "Data-based management",
    text: "I use measures when they help someone make a decision. A report without a decision attached usually adds noise.",
  },
  {
    title: "Transformational coaching",
    text: "We define the change and what would make it visible. The work stays tailored to the leader and the situation in front of them.",
  },
  {
    title: "Methodical scaling",
    text: "I use approaches such as OKRs and Scaling Up when they fit the problem. The method serves the work, not the other way around.",
  },
] as const;

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[{ label: "About me" }]}
        title="When the issue sits between the people and the way the business works."
        lead="I help you see what is happening, decide what needs to change and work out how involved I should be. That can mean coaching, candid advice, a focused assessment or responsibility for a defined remit."
        asideLabel="Working range"
        asideValue="Coaching to fractional responsibility"
        asideNote="Based in Malta. Working internationally."
        primary={{ label: "Book a free conversation", href: "/contact#booking" }}
        ctaPrimary={true}
        secondary={{ label: "Run the six-question check", href: "/?check=open#diagnostic" }}
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
            <h2 className={styles.sectionTitle}>I work at the boundary between reflection and responsibility.</h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              <p>
                I have spent more than seven years working across HR, coaching and
                organisation development. I have been Head of HR in a fast-growing
                company, co-founded CyberKongz and worked as a fractional people leader.
              </p>
              <p>
                That gives me two useful views at once: empathy for how a business
                actually functions, and enough distance to say what I think is not
                working. I listen before I form an opinion. Once I have one, I will be
                direct about it.
              </p>
              <p>
                If I am not the right person, I will say so. Where I can make a useful
                introduction, I will.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <SectionHeading id="about-credentials" title="Experience that helps me read the work." />
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
          <SectionHeading id="working-principles" title="Four principles I bring to the work." />
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
