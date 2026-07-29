import {
  ContactBand,
  Evidence,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { CASE_STUDIES } from "@/content/results";

export const metadata = createPageMetadata({
  title: "Results & Experience",
  description:
    "Selected operating, advisory and fractional people leadership experience from Marc Berghoff's work with growing companies.",
  path: "/results",
});

const metrics = [
  { value: "35 → 150", label: "people in six months at Klarsolar" },
  { value: "€30k → €350k", label: "ARR in one year at Giftagoods" },
  { value: "100%+", label: "revenue growth over two years at Klarsolar" },
] as const;

export default function ResultsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        eyebrow="Selected experience"
        title="Work carried out during demanding periods of growth."
        lead="The figures below belong to the companies and periods shown. Marc contributed in the stated role; the results had many causes and many people behind them."
        asideLabel="Coaching practice"
        asideValue="350+ hours"
        primary={{ label: "Request a free conversation", href: "/contact" }}
        secondary={{ label: "Compare services", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="results-numbers">
        <div className={styles.container}>
          <SectionHeading
            id="results-numbers"
            kicker="Company context"
            title="Company figures from those periods."
          />
          <div className={styles.metricGrid}>
            {metrics.map((metric) => (
              <article className={styles.metricCard} key={metric.label}>
                <p className={styles.metricValue}>{metric.value}</p>
                <p className={styles.metricLabel}>{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="selected-work">
        <div className={styles.container}>
          <SectionHeading
            id="selected-work"
            kicker="Selected work"
            title="Roles and company context."
          />
          <div className={styles.caseGrid}>
            {CASE_STUDIES.map((study) => (
              <article className={styles.caseCard} key={study.company}>
                <p className={styles.caseCompany}>{study.company}</p>
                <p className={styles.caseEngagement}>{study.engagement}</p>
                <h3 className={styles.caseTitle}>{study.result}</h3>
                <p className={styles.caseContext}>{study.context}</p>
              </article>
            ))}
          </div>
          <p className={styles.disclaimer}>
            These results describe past company performance during Marc&apos;s involvement. They are context for his experience and do not predict the result of a future engagement.
          </p>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="operator-experience">
        <div className={styles.container}>
          <SectionHeading
            id="operator-experience"
            kicker="Operator experience"
            title="Some decisions were his to carry."
            intro="Marc co-founded CyberKongz in 2021 and also works with leaders through Vistage peer advisory. Those roles inform how he tests advice against the pressure of an actual operating week."
          />
          <Evidence label="How he tests the advice">
            Marc asks what the advice would change in the next leadership meeting, and who would have to act differently.
          </Evidence>
        </div>
      </section>

      <ContactBand
        title="What is your leadership team dealing with now?"
        text="Share the recurring issue and what has already been tried. Marc will reply with a direct view on whether he can help."
      />
    </div>
  );
}
