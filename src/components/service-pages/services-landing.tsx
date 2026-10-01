import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { EngagementProcess } from "@/components/engagement-process";
import { StructuredData } from "@/components/structured-data";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getSiteUrl } from "@/config/site";
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
        title="Choose the support your business needs."
        lead="Work with me on your organisation, your leadership, or the decisions you want to think through with other owners. Start with what you need; we can work out the right format together."
        aside={{
          label: "A conversation first",
          value: "You do not have to choose alone.",
          note: "Bring a question, a clear brief, or simply a wish to get to know me. You might know exactly what you want, or only that something needs to change. I will tell you where I can help and where someone else may be a better fit.",
        }}
        secondary={{
          href: getRouteHref("selfCheck", locale),
          label: "Start self-check",
          helper: "Independent reflection · about 2 minutes",
          variant: "accent",
        }}
      />

      <section className={`${pageStyles.section} ${pageStyles.anchor}`} id="organisation" aria-labelledby="service-options">
        <div className={pageStyles.container}>
          <div className={`${pageStyles.sectionHeading} ${pageStyles.centered}`}>
            <h2 className={pageStyles.sectionTitle} id="service-options">Support for your organisation</h2>
            <p className={pageStyles.intro}>You can start with any engagement. Choose an assessment when the issue is unclear, advisory when you need to decide how to respond, or fractional leadership when you need someone to carry agreed responsibility.</p>
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
                {engagement.id === "fractional-cpo" ? (
                  <p className={styles.advisoryLink}>Need continuing advice while your team leads delivery? <Link href="/fractional-cpo#ongoing-advisory">Explore ongoing people advisory.</Link></p>
                ) : null}
              </li>
            ))}
          </ol>
          <p className={pageStyles.scopeNote}>{ENGAGEMENT_SCOPE_NOTE}</p>
        </div>
      </section>

      <section className={pageStyles.sectionTint} aria-labelledby="leader-support">
        <div className={pageStyles.container}>
          <div className={pageStyles.sectionHeading}>
            <h2 className={pageStyles.sectionTitle} id="leader-support">Support for you as a leader</h2>
          </div>
          <section className={`${styles.coaching} ${pageStyles.anchor}`} id="coaching" aria-labelledby="coaching-title">
            <div className={pageStyles.textColumn}>
              <h3 className={pageStyles.eyebrow} id="coaching-title">Executive coaching</h3>
              <p className={styles.leadershipTitle}>Work on how you lead — not only what you do next.</p>
              <p>You keep stepping back into work you meant to delegate. A difficult conversation stays on your list. Or the business is taking more out of you than you want it to.</p>
              <p>In one-to-one coaching, we work through the decisions and patterns behind those situations, choose what you want to change, and follow up on what happens in practice.</p>
              <p>You can work with me on coaching alone. You do not need a wider people or organisation project.</p>
              <ButtonLink href="/contact?interest=coaching#enquiry">Talk about coaching</ButtonLink>
            </div>
            <aside className={pageStyles.choice} aria-label="Coaching experience">
              <p className={styles.leadershipTitle}>350+ coaching hours</p>
              <p>ICF ACC · CPCC</p>
              <p>Experience includes coaching more than ten team and department leads at a scale-up, and executive coaching with two department leaders at Malta’s financial services regulator.</p>
            </aside>
          </section>
          <section className={`${styles.peers} ${pageStyles.anchor}`} id="peer-advisory" aria-labelledby="peer-title">
            <div className={pageStyles.sectionHeading}>
              <h3 className={styles.leadershipTitle} id="peer-title">Peer advisory for business owners</h3>
              <p className={pageStyles.intro}>You do not have to work through every decision alone.</p>
              <p>A place to bring the decisions you are wrestling with, hear perspectives from other owners, and challenge your own thinking.</p>
            </div>
            <div className={pageStyles.twoColumns}>
              <article className={pageStyles.choice}>
                <h4>Based in Malta?</h4>
                <p>I chair a Vistage peer-advisory group for business owners. Get in touch to explore whether it could be the right fit.</p>
                <ButtonLink href="/contact?interest=malta-peer-advisory#enquiry" variant="text">Explore the Malta group</ButtonLink>
              </article>
              <article className={pageStyles.choice}>
                <h4>Based elsewhere in Europe?</h4>
                <p>I’m curating a new peer-advisory group for European small-business owners. Register your interest to hear more as it takes shape.</p>
                <ButtonLink href="/contact#european-peer-advisory" variant="text">Join the European waitlist</ButtonLink>
                <p className={pageStyles.helper}>Registering interest does not commit you to joining.</p>
              </article>
            </div>
          </section>
        </div>
      </section>

      <section className={pageStyles.section} aria-labelledby="service-methods">
        <div className={pageStyles.container}>
          <div className={`${pageStyles.sectionHeading} ${pageStyles.centered}`}>
            <h2 className={pageStyles.sectionTitle} id="service-methods">Methods inside organisational work</h2>
            <p className={pageStyles.intro}>Within an assessment, advisory or fractional engagement, we choose the methods that help the people involved decide and act.</p>
          </div>
          <ul className={pageStyles.methods}>
            <li><h3>Coaching and leadership development</h3><p>Individual or group work on the expectations, decisions and conversations that leadership now requires. One-to-one <Link href="/services#coaching">executive coaching is also available as a standalone engagement.</Link></p></li>
            <li><h3>Team workshops</h3><p>Focused sessions where the people involved test a question, work through differences and agree a way forward.</p></li>
            <li><h3>Practical working documents</h3><p>Role clarity, decision responsibilities, people priorities and other documents your team can use after the engagement.</p></li>
            <li><h3>Advice close to the work</h3><p>Work through decisions with me, with more direct involvement when you want me to take responsibility as your Fractional CPO.</p></li>
          </ul>
        </div>
      </section>

      <div id="process" className={styles.processAnchor}>
        <EngagementProcess locale={locale} note="The European peer-group waitlist is a separate expression of interest; its format and next steps will be shared as the group takes shape." />
      </div>

      <ServiceClosing
        locale={locale}
        title="Tell me where you want support."
        text="Bring the people or leadership question in front of you. We can work out the next step together."
      />
    </div>
  );
}
