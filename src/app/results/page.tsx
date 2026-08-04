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
    "The operating, advisory, fractional and coaching experience I bring to work with growing companies.",
  path: "/results",
});

export default function ResultsPage() {
  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Results & experience" },
        ]}
        eyebrow="Selected experience"
        title="The roles I have held while the business was changing."
        lead="Before you ask me to work with your team, you should know what I have done. These examples show the roles I held. They do not promise your outcome."
        asideLabel="Coaching practice"
        asideValue="350+ hours"
        primary={{ label: "Book a free conversation", href: "/contact#booking" }}
        ctaPrimary={true}
        secondary={{ label: "See the options", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="selected-work">
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
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="operator-experience">
        <div className={styles.container}>
          <SectionHeading
            id="operator-experience"
            kicker="Operator experience"
            title="I test advice against the next real decision."
            intro="I co-founded CyberKongz in 2021 and work with leaders through Vistage peer advisory. Both roles keep the advice close to an actual operating week."
          />
          <Evidence label="How I test the advice">
            I ask what the advice would change in your next leadership meeting, and who would have to act differently.
          </Evidence>
        </div>
      </section>

      <ContactBand
        href="/contact#booking"
        title="What is your leadership team dealing with now?"
        text="Share the recurring issue and what you have already tried. I will tell you if I can help."
      />
    </div>
  );
}
