import Image from "next/image";

import { DiagnosticDisclosure } from "@/components/diagnostic-disclosure";
import { DiagnosticContactFlow } from "@/components/diagnostic/DiagnosticContactFlow";
import { EngagementProcess } from "@/components/engagement-process";
import {
  CheckList,
  ContactBand,
  PageHero,
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
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Bottleneck assessment" },
        ]}
        title="When several explanations are competing, start with evidence."
        lead="I compare how work and decisions move with what people report. You receive a written finding and use the report workshop to decide what happens next."
        asideLabel="One-time engagement"
        asideValue="€3,500"
        asideNote="Participant scope, travel and applicable tax are agreed in advance."
        primary={{ label: "Book a free 30-minute conversation", href: "/contact#booking" }}
        ctaPrimary={true}
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
                You may reach for a process change or a new hire because both are
                visible moves. When the cause is uncertain, either can create more
                work. I compare the accounts of people close to the issue with relevant
                operating evidence.
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

      <section className={styles.sectionTint} aria-label="Six-question bottleneck check">
        <div className={styles.narrowContainer}>
          <DiagnosticDisclosure
            id="assessment-check"
            label="Six-question check"
            title="Run the six-question check"
            intro="Use the last few weeks as your reference point."
          >
            <DiagnosticContactFlow
              contactProps={{
                id: "assessment-quick-contact",
                title: "Send me the result and a short note.",
              }}
              diagnosticProps={{
                id: "bottleneck-check",
                intro:
                  "Include the awkward days.",
                introOnly: true,
              }}
            />
          </DiagnosticDisclosure>
        </div>
      </section>

      <EngagementProcess />

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
        href="/contact#booking"
        title="Use the assessment when the cause is still in question."
        text="The first conversation is free. The assessment fee is €3,500; participant scope, travel and applicable tax are confirmed before work begins."
        label="Book the free conversation"
      />
    </div>
  );
}
