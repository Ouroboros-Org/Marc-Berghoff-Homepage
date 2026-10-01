import Link from "next/link";

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
        title="Work through your decision. Agree a practical response."
        lead="Bring a people, leadership or organisation question you can already see. I help you test the options, agree priorities and shape a response your team can carry forward."
        aside={{
          label: "A typical starting point",
          value: "2–6 weeks",
          note: "One session or a longer series may be a better fit. We agree the scope before we start.",
        }}
      />

      <section className={styles.sectionDark} aria-labelledby="advisory-decisions">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle} id="advisory-decisions">Questions worth working through</h2>
          </div>
          <div className={styles.threeColumns}>
            <article className={styles.feature}>
              <h3>Which decisions should stop coming back to you?</h3>
              <p>Clarify who decides, where responsibilities overlap, and what a new management layer should actually own.</p>
            </article>
            <article className={styles.feature}>
              <h3>Who can lead the next stage — and what do they need?</h3>
              <p>Work out where to develop existing leaders, redefine a role or bring in experience the team does not yet have.</p>
            </article>
            <article className={styles.feature}>
              <h3>Which people priorities will make the biggest difference now?</h3>
              <p>Put hiring, leadership development and organisational changes in an order that follows the business priorities — rather than treating everything as equally urgent.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="advisory-scope">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <h2 className={styles.sectionTitle} id="advisory-scope">What you leave with</h2>
            <p className={styles.intro}>A decision your team can put into practice.</p>
            <p>Depending on the question, our work may produce:</p>
          </div>
          <EngagementDetails engagement={{
            ...engagement,
            receives: [
              "Clearer roles and decision responsibilities.",
              "Priorities for hiring, leadership development or organisational change.",
              "A practical plan with an owner for each next step.",
            ],
            boundary: "Your team makes the decisions and leads implementation. We agree what needs to be decided, who will carry the response forward and when to review progress.",
          }} />
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="advisory-tools">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Inside the engagement</p>
            <h2 className={styles.sectionTitle} id="advisory-tools">Choose the methods that help your team act.</h2>
            <p className={styles.intro}>A workshop may help a team reach a decision. Coaching can help a leader act on it. A practical document can make the agreement usable. We choose these together.</p>
          </div>
          <ul className={styles.methods}>
            <li><h3>Working sessions</h3><p>One-to-one advice, group workshops or facilitated discussion with the people who need to agree and act.</p></li>
            <li><h3>Leadership development</h3><p>Focused coaching for an individual or group when the way people lead is part of the decision.</p><p>If you want to work on your own leadership without a wider organisation project, <Link href="/services#coaching">explore standalone executive coaching.</Link></p></li>
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
              <h2 className={styles.sectionTitle} id="advisory-ownership">You decide. Your team puts the plan into practice.</h2>
              <p>I bring an outside view, challenge assumptions and help shape the response. Someone in your business needs the authority and time to carry it forward.</p>
            </div>
            <div className={styles.feature}>
              <h3>When the work needs more support</h3>
              <p>Need support over time? With <Link href="/fractional-cpo#ongoing-advisory">ongoing advisory</Link>, your team leads implementation and I help you work through decisions. As <Link href="/fractional-cpo">Fractional CPO</Link>, I take responsibility for an agreed part of the people work.</p>
              <p>If the underlying problem is still disputed, the <Link href="/bottleneck-assessment">Bottleneck Assessment</Link> can help establish what we are working on first.</p>
            </div>
          </div>
        </div>
      </section>

      <CompactProcess locale={locale} id="advisory-process" title="An agreed scope before we start." scope="We agree the question, the decisions we need to reach, who will carry the work forward, the fee and when to review progress. The scope determines whether that takes one session or a longer engagement." />
      <AdjacentServiceLinks
        locale={locale}
        id="advisory-adjacent"
        links={[
          { href: "/bottleneck-assessment", label: "Bottleneck Assessment with Review", text: "Understand the issue when your team has different explanations." },
          { href: "/fractional-cpo", label: "Fractional CPO", text: "Work with me over time, in an agreed CPO role or through ongoing advice." },
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
