import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { EngagementProcess } from "@/components/engagement-process";
import { StructuredData } from "@/components/structured-data";
import type { SiteLocale } from "@/config/routes";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { ENGAGEMENTS, ENGAGEMENT_SCOPE_NOTE } from "@/content/engagements";

import { ServiceClosing, ServiceHero } from "./shared";
import pageStyles from "./service-pages.module.css";
import styles from "./services-landing.module.css";

export function ServicesLanding({ locale }: { locale: SiteLocale }) {
  const siteUrl = getSiteUrl();

  return (
    <div className={pageStyles.page} lang="en">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Ways to work with Marc Berghoff",
          inLanguage: "en-GB",
          itemListElement: ENGAGEMENTS.map((engagement, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name: engagement.title,
              description: engagement.summary,
              url: `${siteUrl}${engagement.href}`,
              provider: { "@id": `${siteUrl}/#marc-berghoff` },
            },
          })),
        }}
      />
      <ServiceHero
        locale={locale}
        breadcrumb="Services"
        eyebrow="People, leadership and organisation"
        title="The right support for your next step."
        lead="Understand what is slowing you down, shape a response, or bring senior people leadership into the business. Start with the support you need now."
        aside={{
          label: "A conversation first",
          value: "You do not have to choose alone.",
          note: "Bring a question, a clear brief, or simply a wish to get to know me.",
        }}
        secondary={{
          href: "/bottleneck-assessment#bottleneck-check",
          label: "Start the check",
          helper: "10 statements · about 2 minutes",
        }}
      />

      <section className={pageStyles.section} aria-labelledby="service-options">
        <div className={pageStyles.container}>
          <div className={`${pageStyles.sectionHeading} ${pageStyles.centered}`}>
            <p className={pageStyles.eyebrow}>Three ways to work together</p>
            <h2 className={pageStyles.sectionTitle} id="service-options">Start where your business is.</h2>
            <p className={pageStyles.intro}>These are different starting points, with more ongoing involvement as you move across. You do not need to work through them in order.</p>
          </div>
          <ol className={styles.offers}>
            {ENGAGEMENTS.map((engagement) => (
              <li key={engagement.id}>
                <Link
                  aria-labelledby={`offer-${engagement.id}`}
                  className={`${styles.offer} ${engagement.featured ? styles.featured : ""}`}
                  href={engagement.href}
                >
                  <div className={styles.offerTop}>
                    <span className={styles.number} aria-hidden="true">{engagement.number}</span>
                    <span className={styles.stage}>{engagement.shortTitle}</span>
                  </div>
                  <h3 id={`offer-${engagement.id}`}>{engagement.title}</h3>
                  <p className={styles.situation}>{engagement.situation}</p>
                  <p className={styles.rhythm}>{engagement.rhythm}</p>
                  <div className={styles.receives}>
                    <p className={styles.label}>You receive</p>
                    <ul>
                      {engagement.receives.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  <dl className={styles.boundaries}>
                    <div>
                      <dt>What you bring</dt>
                      <dd>{engagement.readiness}</dd>
                    </div>
                    <div>
                      <dt>Where it leads</dt>
                      <dd>{engagement.boundary}</dd>
                    </div>
                  </dl>
                  <span className={styles.offerAction}>Explore the engagement <ArrowRight aria-hidden="true" size={19} /></span>
                </Link>
              </li>
            ))}
          </ol>
          <p className={pageStyles.scopeNote}>{ENGAGEMENT_SCOPE_NOTE}</p>
        </div>
      </section>

      <section className={styles.decision} aria-labelledby="service-decision">
        <div className={pageStyles.container}>
          <div className={styles.decisionGrid}>
            <div>
              <p className={pageStyles.eyebrow}>Not sure where to begin?</p>
              <h2 className={pageStyles.sectionTitle} id="service-decision">Tell me what is happening.</h2>
            </div>
            <div>
              <p>You might know exactly what you want, or only that something needs to change. The introductory conversation is for both. I will tell you where I can help and where someone else may be a better fit.</p>
              <ButtonLink href={getPrimaryContactAction(locale).href} variant="secondary">Book a call</ButtonLink>
              <p className={pageStyles.helper}>Free introduction · typically 30 minutes</p>
            </div>
          </div>
        </div>
      </section>

      <div id="process" className={styles.processAnchor}>
        <EngagementProcess locale={locale} />
      </div>

      <section className={pageStyles.sectionTint} aria-labelledby="service-methods">
        <div className={pageStyles.container}>
          <div className={`${pageStyles.sectionHeading} ${pageStyles.centered}`}>
            <p className={pageStyles.eyebrow}>The tools follow the work</p>
            <h2 className={pageStyles.sectionTitle} id="service-methods">One engagement can take several forms.</h2>
            <p className={pageStyles.intro}>We choose the methods that help your team move. They sit inside the agreed scope.</p>
          </div>
          <ul className={pageStyles.methods}>
            <li><h3>Coaching and leadership development</h3><p>Individual or group work on the expectations, decisions and conversations that leadership now requires.</p></li>
            <li><h3>Workshops and peer discussion</h3><p>Focused sessions where the people involved test a question, work through differences and agree a way forward.</p></li>
            <li><h3>Practical working documents</h3><p>Role clarity, decision responsibilities, people priorities and other documents your team can use after the engagement.</p></li>
            <li><h3>Advice close to the work</h3><p>A sounding board for live decisions, with more direct involvement when a Fractional CPO remit calls for it.</p></li>
          </ul>
        </div>
      </section>

      <ServiceClosing
        locale={locale}
        title="What would make the next stage easier?"
        text="Bring the people or leadership question in front of you. We can work out the next step together."
      />
    </div>
  );
}
