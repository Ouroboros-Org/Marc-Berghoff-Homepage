import {
  ContactBand,
  Evidence,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getPrimaryContactAction } from "@/config/site";
import { CASE_STUDIES } from "@/content/results";

export const metadata = createPageMetadata({
  title: "Results & Experience",
  description:
    "The operating, advisory and coaching experience I bring to work with growing companies.",
  path: "/results",
});

export default function ResultsPage() {
  const contactAction = getPrimaryContactAction();

  return (
    <div className={styles.page}>
      <PageHero
        breadcrumbs={[
          { label: "About", href: "/about" },
          { label: "Results & experience" },
        ]}
        title="See the kinds of responsibility I have carried."
        lead="These examples show the contexts I have worked in: people leadership, founder support, operating responsibility and coaching. They are here to help you judge relevance, not to promise your outcome."
        asideLabel="Coaching practice"
        asideValue="350+ hours"
        primary={contactAction}
        ctaPrimary={true}
        secondary={{ label: "See how I can help", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="selected-work">
        <div className={styles.container}>
          <SectionHeading
            id="selected-work"
            title="Roles, responsibility and company context."
          />
          <div className={styles.caseGrid}>
            {CASE_STUDIES.map((study) => (
              <article className={styles.caseCard} key={study.company}>
                <p className={styles.caseCompany}>{study.company}</p>
                <p className={styles.caseEngagement}>{study.engagement}</p>
                <h3 className={styles.caseTitle}>{study.responsibility}</h3>
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
            title="Advice has to survive the next real decision."
            intro="I co-founded CyberKongz in 2021. I also chair a Vistage peer advisory group of business owners in Malta. Both roles keep the advice close to an actual operating week."
          />
          <Evidence label="How I test the advice">
            I ask what the advice would change in your next leadership meeting, and who would have to act differently.
          </Evidence>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        title="What is your leadership team dealing with now?"
        text="Share the recurring issue and what you have already tried. I will tell you if I can help."
      />
    </div>
  );
}
