import Image from "next/image";

import { EngagementProcess } from "@/components/engagement-process";
import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "I work with founders and leadership teams when a leadership question has become an operating problem.",
  path: "/about",
  languages: getLanguageAlternates("about"),
});

const credentials = [
  {
    title: "MSc in Psychology",
    text: "I hold an MSc in Psychology. My work here is organisational, not clinical.",
  },
  {
    title: "ICF Associate Certified Coach",
    text: "Current ACC credential and more than 350 completed coaching hours.",
  },
  {
    title: "Vistage Chair",
    text: "I chair a Vistage peer advisory group of business owners in Malta.",
  },
  {
    title: "Lecturer",
    text: "I teach training and development and organisational leadership.",
  },
] as const;

const principles = [
  {
    title: "Start with the live decision",
    text: "I want to know what happened, who held the decision first and where it moved. That gives us something real to work on.",
  },
  {
    title: "Use evidence for a decision",
    text: "A measure earns its place when it changes what someone can see or decide. Reporting without that link usually adds noise.",
  },
  {
    title: "Make progress visible",
    text: "In coaching, we name what you want to handle differently and what would show that the change is happening in your working week.",
  },
  {
    title: "Use the method that fits",
    text: "I start with the issue and use a method only when it helps. That may include OKRs or Scaling Up.",
  },
] as const;

export default function AboutPage() {
  const contactAction = getPrimaryContactAction();

  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[{ label: "About me" }]}
        title="When the issue sits between the people and the way the business works."
        lead="I work with founders and leadership teams when a people question has become an operating problem. The work may stay in coaching or advice, or it may need evidence and a defined remit."
        asideLabel="Working range"
        asideValue="Coaching to defined responsibility"
        asideNote="Based in Malta. Working internationally."
        primary={contactAction}
        ctaPrimary={true}
        secondary={{ label: "Run the ten-statement check", href: "/#diagnostic" }}
      />

      <section className={styles.section} aria-label="Marc Berghoff biography">
        <div className={`${styles.container} ${styles.split}`}>
          <figure>
            <div className={styles.portraitImageWrap}>
              <Image
                className={styles.portraitImage}
                src="/images/portraits/marc-seated-original.webp"
                alt="Marc Berghoff seated in an office setting"
                fill
                sizes="(max-width: 928px) calc(100vw - 2rem), 38vw"
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>Marc Berghoff</span>
              <span>Organisational Psychologist · Vistage Chair · Executive Coach</span>
            </figcaption>
          </figure>
          <div>
            <h2 className={styles.sectionTitle}>I have worked on both sides of the conversation.</h2>
            <div className={`${styles.bodyCopy} ${styles.spacedTop}`}>
              <p>
                I have spent almost a decade across HR, coaching and organisational
                development, both in-house and independently. I have led HR in a
                fast-growing company, worked as an interim people leader and co-founded
                CyberKongz.
              </p>
              <p>
                I want to know what happened in the last meeting, where the decision
                moved and who had to pick it up. Once I have enough context, I will tell
                you what I think.
              </p>
              <p>
                If I am not the right person, I will say so. Where I can make a useful
                introduction, I will.
              </p>
              <p>
                Away from work, I am usually reading, climbing, exploring a new culture
                or trying to improve my homemade chilaquiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="about-credentials">
        <div className={styles.container}>
          <SectionHeading id="about-credentials" title="Training, practice and operating experience." />
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
          <SectionHeading id="working-principles" title="What I pay attention to." />
          <div className={`${styles.cardGrid} ${styles.cardGridTwo}`}>
            {principles.map((principle) => (
              <article className={styles.darkCard} key={principle.title}>
                <h3 className={styles.featureCardTitle}>{principle.title}</h3>
                <p className={styles.sectionIntro}>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EngagementProcess />

      <ContactBand
        href={contactAction.href}
        title="Bring me the decision that keeps returning."
        text="The first conversation is free and typically takes 30 minutes. I use it to understand the question and tell you whether I am the right person for it."
        label={contactAction.label}
      />
    </div>
  );
}
