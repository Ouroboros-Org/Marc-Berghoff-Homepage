import Image from "next/image";

import { BottleneckDiagnostic } from "@/components/diagnostic";
import type { SiteLocale } from "@/config/routes";

import {
  AdjacentServiceLinks,
  CompactProcess,
  EngagementDetails,
  getEngagement,
  ServiceClosing,
  ServiceHero,
  ServiceStructuredData,
} from "./shared";
import styles from "./service-pages.module.css";

const engagement = getEngagement("assessment");

export function BottleneckAssessmentPageView({ locale }: { locale: SiteLocale }) {
  return (
    <div className={styles.page} lang="en">
      <ServiceStructuredData
        locale={locale}
        href={engagement.href}
        name={engagement.title}
        description={engagement.summary}
      />
      <ServiceHero
        locale={locale}
        breadcrumb="Bottleneck Assessment"
        eyebrow="Full Bottleneck Assessment with Review"
        title="Find the bottleneck. Agree what comes next."
        lead="When the team has different explanations for the same problem, evidence helps. I combine interviews, a questionnaire and a written report with a leadership review of the findings."
        aside={{
          label: "The full engagement",
          value: "Typically 2–3 weeks",
          note: "From kickoff to review workshop. The scope and fixed fee are agreed before we start.",
        }}
        secondary={{
          href: "#bottleneck-check",
          label: "Start the check",
          helper: "Free · 10 statements · no email needed",
        }}
      />

      <section className={styles.sectionTint} aria-label="Free ten-statement check">
        <div className={styles.checkContainer}>
          <BottleneckDiagnostic
            id="bottleneck-check"
            title="See whether the pattern is structural."
            locale={locale}
          />
          <p className={styles.checkNote}>
            This short self-check is a starting point. The <a href="#full-assessment">full assessment</a> brings in the team&apos;s experience and a review with me.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.anchor}`} id="full-assessment" aria-labelledby="assessment-scope">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <p className={styles.eyebrow}>The full assessment</p>
            <h2 className={styles.sectionTitle} id="assessment-scope">A shared picture your team can act on.</h2>
            <p className={styles.intro}>I compare what people experience with how decisions and work move. Together, we test the finding and decide what deserves attention.</p>
          </div>
          <EngagementDetails engagement={engagement} />
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="assessment-work">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>What happens</p>
            <h2 className={styles.sectionTitle} id="assessment-work">Listen separately. Make sense of it together.</h2>
          </div>
          <ol className={styles.assessmentSteps}>
            <li>
              <h3>Agree the question and hear the team</h3>
              <p>We start with a conversation about what the assessment should answer. I speak with people across the team, usually for 90 minutes each, alongside a short questionnaire.</p>
            </li>
            <li>
              <h3>Compare the evidence</h3>
              <p>I write a report covering the main finding, likely causes and operating consequences. A 20–30 minute check-in with you before the workshop helps test what is emerging.</p>
            </li>
            <li>
              <h3>Review and decide</h3>
              <p>Your leadership team works through the evidence in a review workshop. You can challenge my view and agree the priorities and first actions together.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assessment-report">
        <div className={`${styles.container} ${styles.splitImage}`}>
          <div className={styles.textColumn}>
            <p className={styles.eyebrow}>What your team keeps</p>
            <h2 className={styles.sectionTitle} id="assessment-report">A report you can question and use.</h2>
            <p>The report makes the reasoning visible. It gives the team something concrete to examine, rather than another opinion to agree or disagree with.</p>
            <ol className={styles.reportQuestions}>
              <li>What organisational bottleneck best explains the business issue?</li>
              <li>Which recurring observations and decision patterns support the finding?</li>
              <li>Where does the bottleneck consume leadership attention or slow important work?</li>
              <li>Which decisions and first steps will the leadership team agree after discussing it?</li>
            </ol>
          </div>
          <figure className={styles.reportFigure}>
            <div className={styles.reportImageWrap}>
              <Image
                alt="Illustrative Bottleneck Assessment report page for a fictional company"
                className={styles.reportImage}
                fill
                sizes="(max-width: 720px) calc(100vw - 2rem), (max-width: 1232px) 45vw, 540px"
                src="/images/proof/sample-report-cover.webp"
              />
            </div>
            <figcaption>Illustrative sample. The company, figures and findings are fictional.</figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="assessment-terms">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Clear terms</p>
            <h2 className={styles.sectionTitle} id="assessment-terms">A fixed fee. A finding you can test.</h2>
          </div>
          <div className={styles.twoColumns}>
            <div className={styles.feature}>
              <h3>Agreed before we begin</h3>
              <p>The fee is fixed and agreed before we start. The scope sets out who is involved, what the assessment will cover and the review workshop.</p>
            </div>
            <div className={styles.feature}>
              <h3>A focused guarantee</h3>
              <p>If the leadership team cannot identify one finding worth acting on, you get your money back. The guarantee is written into the scope before work begins.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="assessment-confidence">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <p className={styles.eyebrow}>Room for an honest answer</p>
            <h2 className={styles.sectionTitle} id="assessment-confidence">The question needs to stay open.</h2>
          </div>
          <div className={styles.threeColumns}>
            <article className={styles.feature}>
              <h3>People can speak candidly</h3>
              <p>Individual comments are aggregated or paraphrased. They are not attributed in the report. The material stays separate from employee performance files.</p>
            </article>
            <article className={styles.feature}>
              <h3>The team is ready to act</h3>
              <p>You can make time, share evidence and consider an uncomfortable finding. A brief that has already decided the answer needs a different approach.</p>
            </article>
            <article className={styles.feature}>
              <h3>The outcome may narrow the question</h3>
              <p>Sometimes there is no organisation-wide constraint. The issue may sit in one decision or role. Clinical and medical diagnosis sits outside the scope. The assessment does not evaluate individual performance.</p>
            </article>
          </div>
        </div>
      </section>

      <CompactProcess locale={locale} id="assessment-process" />
      <AdjacentServiceLinks
        locale={locale}
        id="assessment-adjacent"
        links={[
          { href: "/advisory", label: "Strategic People Advisory", text: "Use a focused engagement to work out the response when the underlying problem is understood." },
          { href: "/fractional-cpo", label: "Fractional CPO", text: "Bring ongoing strategic support or an embedded senior owner to the people agenda." },
        ]}
      />
      <ServiceClosing
        locale={locale}
        title="Bring the question your team cannot settle."
        text="Tell me what is happening and what you have already tried. We can decide whether an assessment will help."
      />
    </div>
  );
}
