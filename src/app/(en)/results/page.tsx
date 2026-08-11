import {
  ContactBand,
  Evidence,
  PageHero,
  SectionHeading,
  secondaryPageStyles as styles,
} from "@/components/pages/editorial";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";
import { CASE_STUDIES } from "@/content/results";

export const metadata = createPageMetadata({
  title: "Results & Experience",
  description:
    "Selected coaching, advisory and operating work with leadership teams in growing and established organisations.",
  path: "/results",
  languages: getLanguageAlternates("results"),
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
        title="The work behind my point of view."
        lead="These are some of the places where I have coached, advised, operated or carried an HR remit. They give you context for my judgement. They do not forecast what will happen in your company."
        asideLabel="Coaching practice"
        asideValue="350+ hours"
        primary={contactAction}
        ctaPrimary={true}
        secondary={{ label: "See how I work", href: "/services" }}
      />

      <section className={styles.section} aria-labelledby="selected-work">
        <div className={styles.container}>
          <SectionHeading
            id="selected-work"
            title="Selected work, with the remit attached."
          />
          <div className={styles.caseGrid}>
            {CASE_STUDIES.map((study) => (
              <article className={styles.caseCard} key={study.company}>
                <p className={styles.caseCompany}>{study.company}</p>
                <p className={styles.caseEngagement}>{study.engagement}</p>
                <h3 className={styles.caseTitle}>{study.responsibility}</h3>
                {study.context ? (
                  <p className={styles.caseContext}>{study.context}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="operator-experience">
        <div className={styles.container}>
          <SectionHeading
            id="operator-experience"
            title="I still test advice against the next real decision."
            intro="I co-founded CyberKongz in 2021 and chair a Vistage peer advisory group of business owners in Malta. In both roles, an elegant answer is useless if nobody can act on it in the next working week."
          />
          <Evidence label="A question I use">
            What would this change in your next leadership meeting, and who would have to act differently?
          </Evidence>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        label={contactAction.label}
        title="What keeps returning to the leadership team?"
        text="Tell me what has happened, who is involved and what you have already tried. I will tell you if I can help."
      />
    </div>
  );
}
