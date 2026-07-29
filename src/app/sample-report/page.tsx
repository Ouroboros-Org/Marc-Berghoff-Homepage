import Image from "next/image";

import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";

export const metadata = createPageMetadata({
  title: "Bottleneck Assessment Report Structure",
  description:
    "See how Marc Berghoff structures the written Bottleneck Assessment report used in the report workshop with decision-makers.",
  path: "/sample-report",
});

const reportSections = [
  {
    number: "01",
    title: "Main finding",
    text: "The organisational bottleneck that best explains the business issue which triggered the assessment.",
  },
  {
    number: "02",
    title: "Evidence",
    text: "The recurring observations and decision patterns that support the finding, read across several sources.",
  },
  {
    number: "03",
    title: "Operating impact",
    text: "Where the bottleneck consumes leadership attention or slows work that matters to the business.",
  },
  {
    number: "04",
    title: "Next decisions",
    text: "The decisions and actions the leadership team agrees to take first after discussing the report.",
  },
] as const;

const boundaries = [
  "The report is written for leadership decisions and stays separate from employee performance files.",
  "Individual comments are aggregated or paraphrased rather than attributed.",
  "Clinical and medical diagnosis sits outside the scope of the assessment.",
  "Each recommendation is limited to the evidence gathered for that engagement.",
] as const;

export default function SampleReportPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "Assessment & proof", href: "/bottleneck-assessment" },
          { label: "Sample report" },
        ]}
        eyebrow="Report structure"
        title="See how the assessment report is organised."
        lead="The report combines qualitative and quantitative input with relevant operating evidence. It explains the main bottleneck and gives the report workshop a concrete set of questions to discuss."
        asideLabel="Format"
        asideValue="Written report + report workshop"
        primary={{ label: "Request a free conversation", href: "/contact" }}
        ctaPrimary={true}
        secondary={{ label: "Assessment details", href: "/bottleneck-assessment" }}
      />

      <section className={styles.section} aria-labelledby="sample-cover">
        <div className={styles.container}>
          <SectionHeading
            id="sample-cover"
            kicker="Illustrative cover"
            title="The preview uses a fictional company."
            intro="The name, figures and findings were made for this page. No client material is shown."
          />
          <figure>
            <div className={styles.reportCoverWrap}>
              <Image
                className={styles.reportCoverImage}
                src="/images/proof/sample-report-cover.png"
                alt="Illustrative Bottleneck Assessment report cover for a fictional company"
                fill
                sizes="(max-width: 1184px) calc(100vw - 2rem), 1184px"
              />
            </div>
            <figcaption className={styles.disclaimer}>
              Illustrative sample only. “Wayline GmbH” and all displayed figures are fictional.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="report-structure">
        <div className={styles.container}>
          <SectionHeading
            id="report-structure"
            kicker="Report structure"
            title="The questions each report needs to answer."
            intro="Its length and emphasis change with the evidence gathered in each assessment."
          />
          <div className={styles.reportGrid}>
            {reportSections.map((section) => (
              <article className={styles.reportCard} key={section.number}>
                <p className={styles.reportSectionNumber}>{section.number}</p>
                <h3 className={styles.reportTitle}>{section.title}</h3>
                <p>{section.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="report-boundaries">
        <div className={`${styles.container} ${styles.split}`}>
          <div className={styles.stickyTitle}>
            <p className={styles.sectionKicker}>Boundaries</p>
            <h2 className={styles.sectionTitle} id="report-boundaries">
              Individual comments are not attributed in the report.
            </h2>
            <p className={styles.sectionIntro}>
              The report names the operating issue without exposing individual contributions.
            </p>
          </div>
          <ol className={styles.reportList}>
            {boundaries.map((boundary, index) => (
              <li key={boundary}>
                <strong>0{index + 1}</strong>
                <span>{boundary}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <ContactBand
        title="Could this structure help your leadership team decide?"
        text="The €3,500 assessment includes discovery, fieldwork, the written report and the report workshop. Participant scope, travel and applicable tax are confirmed in advance."
        label="Discuss the assessment"
      />
    </div>
  );
}
