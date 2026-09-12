import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { OutcomeNumber } from "@/components/outcome-number";
import { ContactBand, secondaryPageStyles as pageStyles } from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { Reveal } from "@/components/reveal";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import type { CaseStudy } from "@/content/proof";

import styles from "./results-page.module.css";

export function CaseStudyPageView({ caseStudy }: { caseStudy: CaseStudy }) {
  const siteUrl = getSiteUrl();
  const contact = getPrimaryContactAction();

  return (
    <article className={pageStyles.page} lang="en">
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: caseStudy.title,
        description: caseStudy.summary,
        url: `${siteUrl}${caseStudy.href}`,
        inLanguage: "en",
        author: { "@id": `${siteUrl}/#marc-berghoff` },
        about: { "@type": "Organization", name: caseStudy.client },
      }} />
      <header className={styles.caseHeader}>
        <div className={pageStyles.container}>
          <Breadcrumbs items={[
            { label: "Selected work", href: "/results" },
            { label: caseStudy.client },
          ]} />
          <p className={styles.kicker}>{caseStudy.kicker}</p>
          <h1 className={styles.caseTitle}>{caseStudy.title}</h1>
          <p className={styles.caseLead}>{caseStudy.summary}</p>
          <p className={styles.engagement}>{caseStudy.engagement}</p>
        </div>
      </header>

      <section className={styles.caseOutcomes} aria-label="Company outcomes">
        <dl className={styles.caseOutcomeGrid}>
          {caseStudy.outcomes.map((outcome) => (
            <div key={outcome.label}>
              <dt>{outcome.label}</dt>
              <dd>
                <strong><OutcomeNumber value={outcome.value} /></strong>
                <span>{outcome.context}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className={styles.caseStory}>
        <aside className={styles.caseAside}>
          <span className={styles.kicker}>The engagement</span>
          <p>{caseStudy.client}</p>
          <span>{caseStudy.engagement}</span>
          <Link href="/fractional-cpo">Explore Fractional CPO work <ArrowUpRight aria-hidden="true" size={16} /></Link>
        </aside>
        <div className={styles.storyCopy}>
          {caseStudy.sections.map((section) => (
            <section key={section.heading}>
              <Reveal><h2>{section.heading}</h2></Reveal>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </section>
          ))}
          {caseStudy.laterContext ? <p className={styles.laterContext}>{caseStudy.laterContext}</p> : null}
        </div>
      </div>

      {caseStudy.testimonial ? (
        <section className={styles.caseQuoteSection} aria-label="Client perspective">
          <blockquote className={styles.caseQuote}>
            <p>“{caseStudy.testimonial.quote}”</p>
            <footer>{caseStudy.testimonial.attribution}</footer>
          </blockquote>
        </section>
      ) : null}

      <ContactBand
        title="Growing into a different kind of company?"
        text="Bring the people and leadership work that growth has put on your desk. We can work out what kind of support would help."
        href={contact.href}
        label="Book a call"
        helper="Free introduction · typically 30 minutes"
        secondary={{ href: "/results", label: "More selected work" }}
      />
    </article>
  );
}
