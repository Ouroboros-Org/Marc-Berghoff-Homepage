import Image from "next/image";

import { DiagnosticContactFlow } from "@/components/diagnostic/DiagnosticContactFlow";
import {
  CheckList,
  ContactBand,
  PageHero,
  ProcessList,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/config/metadata";
import { getSiteUrl } from "@/config/site";

export const metadata = createPageMetadata({
  title: "Bottleneck Assessment",
  description:
    "A typical one-to-two-week organisational bottleneck assessment, followed by a written report and a report workshop with the decision-makers. €3,500.",
  path: "/bottleneck-assessment",
});

const symptoms = [
  "Decisions that should stay with the team keep returning to the founder.",
  "Roles look clear on paper, but ownership is disputed in practice.",
  "Important work moves slowly between functions or senior people.",
  "Leaders spend more time resolving friction than moving priorities forward.",
  "Headcount has grown, but the way decisions are made has not caught up.",
] as const;

const process = [
  {
    title: "Discovery",
    description:
      "Marc learns what the business is trying to achieve, where progress breaks down and whose input is needed.",
  },
  {
    title: "Assessment · typically 1–2 weeks",
    description:
      "On site, online or both, Marc gathers qualitative and quantitative input from the people closest to the issue and reads it alongside relevant operating evidence.",
  },
  {
    title: "Report workshop",
    description:
      "About a week after fieldwork, Marc takes the decision-makers through the report. The group agrees what should happen first.",
  },
] as const;

const deliverables = [
  "A written assessment report naming the main organisational bottleneck",
  "The evidence used to reach that finding",
  "A report workshop with the relevant decision-makers",
  "Recommended next steps for the report workshop to discuss",
] as const;

export default function BottleneckAssessmentPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className={styles.page}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Bottleneck Assessment",
          description:
            "A typical one-to-two-week organisational assessment with a written report and a report workshop with the decision-makers.",
          url: `${siteUrl}/bottleneck-assessment`,
          provider: { "@id": `${siteUrl}/#marc-berghoff` },
          areaServed: "International",
          offers: {
            "@type": "Offer",
            price: "3500",
            priceCurrency: "EUR",
            description:
              "Participant scope, travel and applicable tax are agreed before work begins.",
            url: `${siteUrl}/bottleneck-assessment`,
          },
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Founders and leadership teams in startups, scale-ups and SMEs",
          },
        }}
      />
      <PageHero
        eyebrow="The bottleneck assessment"
        title="Identify the main constraint before you choose an intervention."
        lead="Fieldwork typically takes one to two weeks. Marc traces where work slows down, which decisions keep returning and what sustains the pattern. Around a week later, he uses the written report to lead a report workshop with the decision-makers."
        asideLabel="One-time engagement"
        asideValue="€3,500"
        asideNote="Participant scope, travel and applicable tax are agreed in advance."
        primary={{ label: "Request a free conversation", href: "/contact" }}
        secondary={{ label: "See the report structure", href: "/sample-report" }}
      />

      <section className={styles.section} aria-labelledby="assessment-problem">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>What it is for</p>
            <h2 className={styles.sectionTitle} id="assessment-problem">
              The visible problem may have several causes.
            </h2>
          </div>
          <div>
            <div className={styles.bodyCopy}>
              <p>
                Teams often reach for a process change or a new hire because both are visible moves. When the cause is uncertain, either can create more work. Marc compares accounts from the people close to the issue with relevant operating evidence, so the finding does not rest on the loudest explanation.
              </p>
            </div>
            <div className={styles.spacedTop}>
              <p className={styles.cardKicker}>Common signals</p>
              <CheckList items={symptoms} />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.mediaBreak} aria-label="Assessment working materials">
        <div className={styles.container}>
          <figure className={styles.editorialFigure}>
            <div className={styles.editorialImageWrap}>
              <Image
                className={styles.editorialImage}
                src="/images/generated/diagnostic-worktable.webp"
                alt="Illustrative strategy worktable with blue notes and one yellow note interrupting the sequence"
                fill
                sizes="(max-width: 1184px) calc(100vw - 2rem), 1184px"
              />
            </div>
            <figcaption className={styles.portraitCaption}>
              <span>Illustrative worktable detail</span>
              <span>The assessment itself is confidential</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="assessment-check">
        <div className={styles.narrowContainer}>
          <SectionHeading
            id="assessment-check"
            kicker="Six-question check"
            title="Where does the friction show up first?"
            intro="Use the short check to organise what you have noticed. It offers a direction to investigate; the paid assessment uses broader evidence."
          />
          <DiagnosticContactFlow
            contactProps={{
              id: "assessment-quick-contact",
              title: "Send Marc the result and a short note.",
            }}
            diagnosticProps={{
              id: "bottleneck-check",
              title: "Answer six questions.",
              intro:
                "Use the last few weeks as your reference point, including the awkward days.",
            }}
          />
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assessment-process">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>The process</p>
            <h2 className={styles.sectionTitle} id="assessment-process">
              From the first question to a decision sequence.
            </h2>
          </div>
          <ProcessList steps={process} />
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="assessment-output">
        <div className={styles.container}>
          <SectionHeading
            id="assessment-output"
            kicker="What you receive"
            title="A report your leadership team can use."
            intro="It records the finding and the evidence. The report workshop is where the decision-makers test the implications and discuss what should happen first."
          />
          <div className={styles.cardGrid}>
            {deliverables.map((item, index) => (
              <article className={styles.darkCard} key={item}>
                <p className={styles.darkCardNumber}>0{index + 1}</p>
                <h3 className={styles.featureCardTitle}>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assessment-fit">
        <div className={styles.container}>
          <SectionHeading id="assessment-fit" kicker="Fit" title="The team needs room for an answer it may not expect." />
          <div className={`${styles.cardGrid} ${styles.cardGridTwo}`}>
            <article className={styles.featureCard}>
              <p className={styles.cardKicker}>Good fit</p>
              <h3 className={styles.featureCardTitle}>The business question is real and still open.</h3>
              <p>
                The leadership team can make time for the work, share relevant evidence and act if the finding is uncomfortable.
              </p>
            </article>
            <article className={styles.featureCard}>
              <p className={styles.cardKicker}>Use another format</p>
              <h3 className={styles.featureCardTitle}>The brief has already decided the answer.</h3>
              <p>
                A predetermined restructure, clinical question or stand-alone employee survey calls for a different brief and may need another specialist.
              </p>
            </article>
          </div>
        </div>
      </section>

      <ContactBand
        title="Bring the problem that keeps returning."
        text="The first conversation is free. The assessment fee is €3,500; participant scope, travel and applicable tax are confirmed before work begins."
        label="Ask about the assessment"
      />
    </div>
  );
}
