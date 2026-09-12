import Image from "next/image";

import { ButtonLink } from "@/components/button";
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

const engagement = getEngagement("fractional-cpo");

export function FractionalPeopleLeadershipPageView({ locale }: { locale: SiteLocale }) {
  return (
    <div className={styles.page} lang="en">
      <ServiceStructuredData
        locale={locale}
        href={engagement.href}
        name="Fractional CPO and ongoing Strategic People Advisory"
        description={engagement.summary}
      />
      <ServiceHero
        locale={locale}
        breadcrumb="Fractional CPO"
        eyebrow="Senior people leadership"
        title={<><span className={styles.highlight}>Fractional CPO.</span> Built around your next stage.</>}
        lead="A Chief People Officer connects the people agenda to the direction of the business. I support your people, leadership and organisation as you grow, with a level of involvement that fits your team."
        aside={{
          label: "A typical rhythm",
          value: "Often 1–2 days a week",
          note: "The remit sets the pace. We agree responsibility, availability and duration together, without a minimum or maximum term.",
        }}
      />

      <section className={styles.section} aria-labelledby="fractional-involvement">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <p className={styles.eyebrow}>Agree who carries the work</p>
            <h2 className={styles.sectionTitle} id="fractional-involvement">An embedded CPO or a continuing strategic partner.</h2>
            <p className={styles.intro}>Both bring senior attention to the people agenda. The difference is the responsibility you want me to hold.</p>
          </div>
          <div className={styles.twoColumns}>
            <article className={`${styles.choice} ${styles.choicePrimary}`}>
              <p className={styles.eyebrow}>Fractional CPO</p>
              <h3>I carry an agreed leadership remit.</h3>
              <p>I join your operating rhythm, hold agreed decision rights and work with your managers and HR team to move the people agenda forward.</p>
              <ul className={styles.receiveList}>
                <li>A people strategy tied to the business plan</li>
                <li>Leadership and organisational development</li>
                <li>Ownership, review and a planned handover</li>
              </ul>
            </article>
            <article className={styles.choice}>
              <p className={styles.eyebrow}>Ongoing Strategic People Advisory</p>
              <h3>Your team carries the remit, with my support.</h3>
              <p>I stay close to the decisions and provide continuing advice, challenge and perspective. Your leadership team retains authority and manages delivery.</p>
              <ul className={styles.receiveList}>
                <li>A consistent partner for live decisions</li>
                <li>Working sessions and leadership support</li>
                <li>An agreed rhythm to review priorities and progress</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.sectionTint} aria-labelledby="fractional-direction">
        <div className={`${styles.container} ${styles.splitImage}`}>
          <div className={styles.imageWrap}>
            <Image
              alt=""
              className={styles.image}
              fill
              sizes="(max-width: 720px) calc(100vw - 2rem), (max-width: 1232px) 50vw, 600px"
              src="/images/generated/leadership-room.webp"
            />
          </div>
          <div className={styles.textColumn}>
            <p className={styles.eyebrow}>Room for the work ahead</p>
            <h2 className={styles.sectionTitle} id="fractional-direction">Help the organisation grow with the business.</h2>
            <p>The people team may run day-to-day work well while the bigger questions remain unresolved: how the organisation should develop, what leaders need to do differently, and where to invest attention.</p>
            <p>I bring experience from Head of HR work at a solar scale-up later acquired by E.ON, and fractional people leadership for a Malta fire-safety and security group.</p>
            <ButtonLink href="/results" variant="text">See selected work</ButtonLink>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark} aria-labelledby="fractional-scope">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>An agreed remit</p>
            <h2 className={styles.sectionTitle} id="fractional-scope">Clear responsibility from the beginning.</h2>
            <p className={styles.intro}>We name the decisions I hold, the support I need and how the work returns to your team or a permanent hire. Coaching, workshops and practical documents sit within that remit.</p>
          </div>
          <EngagementDetails engagement={engagement} />
          <p className={styles.scopeNote}>{ENGAGEMENT_SCOPE_NOTE}</p>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="fractional-fit">
        <div className={styles.container}>
          <div className={styles.twoColumns}>
            <article className={styles.feature}>
              <p className={styles.eyebrow}>The right foundations</p>
              <h2 className={styles.sectionTitle} id="fractional-fit">Access, decision rights and a team to work with.</h2>
              <p>The leadership team needs to make room for the work, share relevant context and agree who can decide. Day-to-day HR administration needs an operational owner.</p>
            </article>
            <article className={styles.feature}>
              <h3>When another approach fits better</h3>
              <p>If you need payroll, routine HR administration or a replacement for your whole operational team, this engagement does not provide that capacity.</p>
              <p>If you already have the right senior owner and one decision is stuck, focused advisory may be enough. If nobody agrees on the underlying problem, an assessment is a better starting point.</p>
            </article>
          </div>
        </div>
      </section>

      <CompactProcess locale={locale} id="fractional-process" />
      <AdjacentServiceLinks
        locale={locale}
        id="fractional-adjacent"
        links={[
          { href: "/bottleneck-assessment", label: "Bottleneck Assessment with Review", text: "Establish the cause before deciding what kind of leadership remit the company needs." },
          { href: "/advisory", label: "Strategic People Advisory", text: "Work through a defined decision with a shorter, focused engagement." },
        ]}
      />
      <ServiceClosing
        locale={locale}
        title="What does your people agenda need now?"
        text="Bring the team you have, the direction of the business and the work that needs senior attention."
      />
    </div>
  );
}
