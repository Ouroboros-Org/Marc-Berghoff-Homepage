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
        title={<>Work with a <span className={styles.highlight}>Fractional CPO.</span> Choose the support your team needs.</>}
        lead="As your Chief People Officer, I connect people strategy, leadership development and organisational structure to your business plans. We agree what I lead, where I advise and how I work with your team."
        aside={{
          label: "A typical rhythm",
          value: "Often 1–2 days a week",
          note: "We agree the work, responsibility, availability and duration together. There is no minimum or maximum term.",
        }}
      />

      <section className={styles.section} aria-labelledby="fractional-involvement">
        <div className={styles.container}>
          <div className={`${styles.sectionHeading} ${styles.centered}`}>
            <p className={styles.eyebrow}>Agree who carries the work</p>
            <h2 className={styles.sectionTitle} id="fractional-involvement">Choose what you want me to lead.</h2>
            <p className={styles.intro}>I can take responsibility for an agreed part of your people work or support the team that already leads it.</p>
          </div>
          <div className={styles.twoColumns}>
            <article className={`${styles.choice} ${styles.choicePrimary}`}>
              <p className={styles.eyebrow}>Fractional CPO</p>
              <h3>I take responsibility for agreed people work.</h3>
              <p>I work with your managers and HR team to deliver agreed people priorities. We set out the decisions I can make and how we review progress.</p>
              <ul className={styles.receiveList}>
                <li>A people strategy tied to the business plan</li>
                <li>Leadership and organisational development</li>
                <li>Clear responsibilities, regular reviews and a planned handover</li>
              </ul>
            </article>
            <article className={styles.choice}>
              <p className={styles.eyebrow}>Ongoing Strategic People Advisory</p>
              <h3>Your team leads the work, with my support.</h3>
              <p>I give continuing advice and work through decisions with you. Your leadership team keeps authority and manages implementation.</p>
              <ul className={styles.receiveList}>
                <li>Regular advice on the decisions in front of you</li>
                <li>Working sessions and leadership support</li>
                <li>An agreed schedule for reviewing priorities and progress</li>
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
            <h2 className={styles.sectionTitle} id="fractional-direction">Develop your organisation as your business grows.</h2>
            <p>Your HR team may run day-to-day work well while wider questions need attention: how your organisation should develop, what your leaders need and where your team should focus its effort.</p>
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
            <p className={styles.intro}>We agree which decisions I make, what your team handles and how we review progress. If responsibility moves to your team or a permanent hire, we plan the handover. Coaching, workshops and practical documents support that work.</p>
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
              <h2 className={styles.sectionTitle} id="fractional-fit">You bring access and a team to work with.</h2>
              <p>Your leadership team needs time to work with me, share relevant information and agree who can decide. Someone in your business needs to handle day-to-day HR administration.</p>
            </article>
            <article className={styles.feature}>
              <h3>When another approach fits better</h3>
              <p>If you need payroll, routine HR administration or a replacement for your whole operational team, this engagement does not provide that capacity.</p>
              <p>If you already have someone leading the work and want help with one decision, focused advisory may be enough. If the underlying issue is unclear, we can discuss whether an assessment would help.</p>
            </article>
          </div>
        </div>
      </section>

      <CompactProcess locale={locale} id="fractional-process" />
      <AdjacentServiceLinks
        locale={locale}
        id="fractional-adjacent"
        links={[
          { href: "/bottleneck-assessment", label: "Bottleneck Assessment with Review", text: "Understand an unclear people or organisation issue before deciding what support you need." },
          { href: "/advisory", label: "Strategic People Advisory", text: "Work through a defined decision with a shorter, focused engagement." },
        ]}
      />
      <ServiceClosing
        locale={locale}
        title="What support do you need for your people and organisation?"
        text="Tell me your priorities, who already carries the work and where you want me to take responsibility or advise."
      />
    </div>
  );
}
