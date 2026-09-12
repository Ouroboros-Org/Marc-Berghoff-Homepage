import type { SiteLocale } from "@/config/routes";
import { ENGAGEMENT_SCOPE_NOTE } from "@/content/engagements";

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

const engagement = getEngagement("advisory");

export function AdvisoryPageView({ locale }: { locale: SiteLocale }) {
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
        breadcrumb={engagement.title}
        eyebrow="Strategic People Advisory"
        title="A clear issue. A practical way forward."
        lead="Bring a people, leadership or organisation question you can already see. I help you test the options, agree priorities and shape a response your team can carry forward."
        aside={{
          label: "A typical starting point",
          value: "2–6 weeks",
          note: "One session or a longer series may be a better fit. We agree the scope and pace in the introductory conversation.",
        }}
      />

      <section className={styles.section} aria-labelledby="advisory-scope">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <p className={styles.eyebrow}>A focused engagement</p>
            <h2 className={styles.sectionTitle} id="advisory-scope">Enough clarity to take the next step.</h2>
            <p className={styles.intro}>We begin with a question, work through it with the people involved, and finish with a decision or plan you can use.</p>
          </div>
          <EngagementDetails engagement={engagement} />
          <p className={styles.scopeNote}>{ENGAGEMENT_SCOPE_NOTE}</p>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="advisory-decisions">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Questions worth working through</p>
            <h2 className={styles.sectionTitle} id="advisory-decisions">What does the business need from its people next?</h2>
          </div>
          <div className={styles.threeColumns}>
            <article className={styles.feature}>
              <h3>Clearer roles and decisions</h3>
              <p>Responsibilities overlap, a decision keeps returning to the founder, or a new management layer needs a clear purpose.</p>
            </article>
            <article className={styles.feature}>
              <h3>Leadership that keeps pace</h3>
              <p>You need to decide who is ready for more responsibility, where development will help, and when to bring in new experience.</p>
            </article>
            <article className={styles.feature}>
              <h3>People priorities that hold together</h3>
              <p>Hiring, culture and development compete for attention. You need a practical order that follows the business plan.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="advisory-tools">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Inside the engagement</p>
            <h2 className={styles.sectionTitle} id="advisory-tools">Use the methods the question needs.</h2>
            <p className={styles.intro}>A workshop may help a team reach a decision. Coaching can help a leader act on it. A practical document can make the agreement usable. We choose these together.</p>
          </div>
          <ul className={styles.methods}>
            <li><h3>Working sessions</h3><p>One-to-one advice, group workshops or facilitated discussion with the people who need to agree and act.</p></li>
            <li><h3>Leadership development</h3><p>Focused coaching for an individual or group when the way people lead is part of the decision.</p></li>
            <li><h3>A usable record</h3><p>Depending on the brief, this may be a prioritised plan, clearer role responsibilities, decision agreements or working guidance.</p></li>
            <li><h3>A review and handover</h3><p>We test whether the response makes sense in practice and leave your team clear about what it owns next.</p></li>
          </ul>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="advisory-ownership">
        <div className={styles.container}>
          <div className={styles.twoColumns}>
            <div className={styles.feature}>
              <p className={styles.eyebrow}>The right conditions</p>
              <h2 className={styles.sectionTitle} id="advisory-ownership">You keep the decision and its follow-through.</h2>
              <p>I bring an outside view, challenge assumptions and help shape the response. Someone in your business needs the authority and time to carry it forward.</p>
            </div>
            <div className={styles.feature}>
              <h3>When the work needs more support</h3>
              <p>If you need continuing advice, we can agree a review rhythm. If the work needs me to lead an ongoing remit and coordinate its delivery, we should discuss Fractional CPO support.</p>
              <p>If the underlying problem is still disputed, the Bottleneck Assessment can help establish what we are working on first.</p>
            </div>
          </div>
        </div>
      </section>

      <CompactProcess locale={locale} id="advisory-process" />
      <AdjacentServiceLinks
        locale={locale}
        id="advisory-adjacent"
        links={[
          { href: "/bottleneck-assessment", label: "Bottleneck Assessment with Review", text: "Find the cause when the team has different explanations for the same problem." },
          { href: "/fractional-cpo", label: "Fractional CPO", text: "Bring sustained senior support into the business, with an embedded remit or ongoing advice." },
        ]}
      />
      <ServiceClosing
        locale={locale}
        title="Bring the decision you are working on."
        text="We can talk through what is clear, what is still open and how much support would help."
      />
    </div>
  );
}
