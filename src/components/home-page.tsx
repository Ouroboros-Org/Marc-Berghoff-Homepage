import { ArrowRight, ArrowUpRight, Check, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { CredentialBadges } from "@/components/credential-badges";
import { Reveal } from "@/components/reveal";
import { getPrimaryContactAction } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";
import { ENGAGEMENTS, ENGAGEMENT_SCOPE_NOTE } from "@/content/engagements";
import { getHomeCopy } from "@/content/home";
import { FEATURED_CASE, OUTCOMES, TESTIMONIALS } from "@/content/proof";

import styles from "@/app/home.module.css";

const checkHref = "/bottleneck-assessment#bottleneck-check";
const [featuredArticle, ...otherArticles] = BLOG_POSTS.slice(0, 3);

export function HomePageView({ locale = "en" }: { locale?: string } = {}) {
  const copy = getHomeCopy(locale);
  const primaryAction = getPrimaryContactAction("en");
  const primaryLabel = primaryAction.isBooking ? copy.hero.bookingLabel : copy.hero.noteLabel;
  const primaryDetail = primaryAction.isBooking ? copy.hero.bookingDetail : copy.hero.noteDetail;

  return (
    <div className={styles.home} lang="en">
      <section aria-labelledby="home-title" className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <h1 id="home-title">
              <span className={styles.heroRole}>{copy.hero.role}</span>
              <span className={styles.heroTitleRest}>{copy.hero.title}</span>
            </h1>
            <p className={styles.heroDescription}>{copy.hero.description}</p>
            <div className={styles.heroActions}>
              <div className={styles.actionGroup}>
                <ButtonLink aria-describedby="hero-call-detail" cta href={primaryAction.href}>
                  {primaryLabel}
                </ButtonLink>
                <p id="hero-call-detail">{primaryDetail}</p>
              </div>
              <div className={styles.actionGroup}>
                <ButtonLink aria-describedby="hero-check-detail" href={checkHref} variant="secondary">
                  {copy.hero.checkLabel}
                </ButtonLink>
                <p id="hero-check-detail">{copy.hero.checkDetail}</p>
              </div>
            </div>
          </div>
          <div className={styles.heroPortrait}>
            <figure className={styles.heroFigure}>
              <div className={styles.heroImageWrap}>
                <Image
                  alt={copy.hero.imageAlt}
                  className={styles.heroImage}
                  fill
                  preload
                  sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 1024px) 38vw, 420px"
                  src="/images/portraits/marc-speaking-enhanced.webp"
                />
              </div>
              <figcaption>
                <strong>Marc Berghoff</strong>
                <span>{copy.hero.caption}</span>
              </figcaption>
            </figure>
            <CredentialBadges className={styles.heroCredentials} compact />
          </div>
        </div>
      </section>

      <section aria-label="Selected outcomes from my work" className={styles.outcomes}>
        <div className={styles.container}>
          <dl className={styles.outcomeGrid}>
            {OUTCOMES.map((outcome) => (
              <div className={styles.outcome} key={outcome.id}>
                <dt>{outcome.label}</dt>
                <dd className={styles.outcomeValue}>{outcome.value}</dd>
                <dd className={styles.outcomeContext}>{outcome.context}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="engagements-title" className={styles.offers} id="ways-to-work">
        <Reveal className={styles.container}>
          <div className={styles.centeredHeading}>
            <h2 id="engagements-title">{copy.services.title}</h2>
            <p>{copy.services.intro}</p>
          </div>
          <ol className={styles.offerGrid}>
            {ENGAGEMENTS.map((engagement) => (
              <li key={engagement.id}>
                <Link
                  className={`${styles.offerCard} ${engagement.featured ? styles.offerFeatured : ""}`}
                  href={engagement.href}
                >
                  <span className={styles.offerStage}>
                    <span aria-hidden="true">{engagement.number}</span>
                    {engagement.shortTitle}
                  </span>
                  <h3>{engagement.title}</h3>
                  <p className={styles.offerSituation}>{engagement.situation}</p>
                  <ul className={styles.offerReceives}>
                    {engagement.receives.map((item) => (
                      <li key={item}><Check aria-hidden="true" size={16} /><span>{item}</span></li>
                    ))}
                  </ul>
                  <span className={styles.offerRhythm}>{engagement.rhythm}</span>
                  <span className={styles.offerAction}>Explore this engagement<ArrowUpRight aria-hidden="true" size={22} /></span>
                </Link>
              </li>
            ))}
          </ol>
          <div className={styles.offerFootnote}>
            <p>{ENGAGEMENT_SCOPE_NOTE}</p>
            <div>
              <span>{copy.services.unsure}</span>
              <ButtonLink href={primaryAction.href} variant="text">{copy.services.conversationLabel}</ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="featured-case-title" className={styles.caseSection}>
        <Reveal className={styles.container} variant="fade">
          <div className={styles.caseGrid}>
            <div className={styles.caseResult}>
              <p className={styles.caseCompany}>Klarsolar</p>
              <p className={styles.caseMetric}>{FEATURED_CASE.metric}</p>
              <p className={styles.caseMetricLabel}>{FEATURED_CASE.metricLabel}</p>
              <span className={styles.caseContext}>A team growing into its next chapter.</span>
            </div>
            <div className={styles.caseStory}>
              <h2 id="featured-case-title">{FEATURED_CASE.title}</h2>
              <p>{FEATURED_CASE.summary}</p>
              <ButtonLink href={FEATURED_CASE.href} variant="text">Read the case study</ButtonLink>
            </div>
          </div>
          <figure className={styles.caseQuote}>
            <blockquote><p>{TESTIMONIALS[0].quote}</p></blockquote>
            <figcaption>{TESTIMONIALS[0].attribution}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section aria-labelledby="check-title" className={styles.diagnostic}>
        <div className={`${styles.container} ${styles.diagnosticInner}`}>
          <div>
            <h2 id="check-title">{copy.diagnostic.title}</h2>
            <p>{copy.diagnostic.description}</p>
          </div>
          <div className={styles.diagnosticAction}>
            <ButtonLink aria-describedby="check-detail" href={checkHref}>{copy.diagnostic.action}</ButtonLink>
            <p id="check-detail">{copy.diagnostic.detail}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-marc-title" className={styles.about}>
        <div className={`${styles.container} ${styles.aboutGrid}`}>
          <Reveal className={styles.aboutImages} variant="fade">
            <div className={styles.workshopImageWrap}>
              <Image alt="Marc in conversation around a workshop table" className={styles.workshopImage} fill sizes="(max-width: 760px) calc(100vw - 2.5rem), 48vw" src="/images/generated/marc-workshop.webp" />
            </div>
            <div className={styles.seatedImageWrap}>
              <Image alt="Marc Berghoff seated in a chair" className={styles.seatedImage} fill sizes="(max-width: 760px) 125px, 170px" src="/images/portraits/marc-seated-original.webp" />
            </div>
          </Reveal>
          <Reveal className={styles.aboutCopy}>
            <h2 id="about-marc-title">{copy.about.title}</h2>
            {copy.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <ButtonLink href="/about" variant="text">{copy.about.action}</ButtonLink>
          </Reveal>
        </div>
        <Reveal className={`${styles.container} ${styles.personalQuoteWrap}`} variant="fade">
          <figure className={styles.personalQuote}>
            <blockquote><p>{TESTIMONIALS[1].quote}</p></blockquote>
            <figcaption>{TESTIMONIALS[1].attribution}</figcaption>
          </figure>
        </Reveal>
      </section>

      <section aria-labelledby="fit-title" className={styles.fit}>
        <Reveal className={styles.container} variant="fade">
          <div className={styles.centeredHeading}>
            <h2 id="fit-title">{copy.fit.title}</h2>
            <p>{copy.fit.intro}</p>
          </div>
          <div className={styles.fitGrid}>
            <div>
              <h3>This could be a good fit</h3>
              <ul>{copy.fit.suitable.map((item) => <li key={item}><Check aria-hidden="true" size={19} /><span>{item}</span></li>)}</ul>
            </div>
            <div>
              <h3>When you need different support</h3>
              <ul>{copy.fit.otherSupport.map((item) => <li key={item}><Minus aria-hidden="true" size={19} /><span>{item}</span></li>)}</ul>
            </div>
          </div>
          <p className={styles.fitNote}>You do not need to know the right route yet. <Link href={primaryAction.href}>Bring your situation to a first conversation.<ArrowRight aria-hidden="true" size={17} /></Link></p>
        </Reveal>
      </section>

      <section aria-labelledby="insights-title" className={styles.insights}>
        <Reveal className={styles.container}>
          <div className={styles.insightsHeader}>
            <div><h2 id="insights-title">{copy.insights.title}</h2><p>{copy.insights.intro}</p></div>
            <ButtonLink href="/blog" variant="text">{copy.insights.action}</ButtonLink>
          </div>
          <div className={styles.insightsGrid}>
            {featuredArticle ? (
              <Link className={styles.featuredArticle} href={`/blog/${featuredArticle.slug}`}>
                <h3>{featuredArticle.title}</h3>
                <p>{featuredArticle.description}</p>
                <span className={styles.articleBottom}><span>{featuredArticle.category}</span><ArrowUpRight aria-hidden="true" size={25} /></span>
              </Link>
            ) : null}
            <div className={styles.articleList}>
              {otherArticles.map((article) => (
                <Link href={`/blog/${article.slug}`} key={article.slug}>
                  <h3>{article.title}</h3>
                  <span className={styles.articleBottom}><span>{article.category}</span><ArrowUpRight aria-hidden="true" size={23} /></span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section aria-labelledby="conversation-title" className={styles.closing}>
        <div className={`${styles.container} ${styles.closingInner}`}>
          <h2 id="conversation-title">{copy.closing.title}</h2>
          <p>{copy.closing.body}</p>
          <div className={styles.closingActions}>
            <div className={styles.actionGroup}>
              <ButtonLink aria-describedby="closing-call-detail" cta href={primaryAction.href} variant="inverse">{primaryLabel}</ButtonLink>
              <p id="closing-call-detail">{primaryDetail}</p>
            </div>
            {primaryAction.isBooking ? (
              <Link className={styles.closingMessage} href="/contact#contact-form">{copy.closing.noteLabel}<ArrowRight aria-hidden="true" size={18} /></Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
