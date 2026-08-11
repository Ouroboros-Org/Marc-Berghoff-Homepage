import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { HomeDiagnosticDisclosure } from "@/components/home-diagnostic-disclosure";
import { getRouteHref } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";
import { getHomeCopy, type HomeLocale } from "@/content/home";
import { getWorkingFormats } from "@/content/working-formats";

import styles from "@/app/home.module.css";

const homeArticles = BLOG_POSTS.slice(0, 3);

export function HomePageView({ locale }: { locale: HomeLocale }) {
  const copy = getHomeCopy(locale);
  const primaryAction = getPrimaryContactAction(locale);
  const workingFormats = getWorkingFormats(locale);
  const primaryLabel = primaryAction.isBooking
    ? copy.hero.primaryBookingLabel
    : copy.hero.primaryFallbackLabel;
  const closingPrimaryLabel = primaryAction.isBooking
    ? copy.closing.bookingLabel
    : copy.closing.noteLabel;

  return (
    <div data-locale={locale} lang={copy.locale.documentLanguage}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1>{copy.hero.title}</h1>
                <div className={styles.heroNarrative}>
                  {copy.hero.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className={styles.buttonRow}>
                  <ButtonLink
                    cta={primaryAction.isBooking}
                    href={primaryAction.href}
                  >
                    {primaryLabel}
                  </ButtonLink>
                  <ButtonLink
                    className={styles.heroCheckLink}
                    href="#diagnostic"
                    icon={false}
                    variant="secondary"
                  >
                    <span>{copy.hero.secondaryLead}</span>
                    <small>{copy.hero.secondaryDetail}</small>
                  </ButtonLink>
                </div>
                <p className={styles.heroAudience}>{copy.hero.audience}</p>
              </div>
              <figure className={styles.heroFigure}>
                <div className={styles.heroImageWrap}>
                  <Image
                    alt={copy.hero.imageAlt}
                    className={styles.heroImage}
                    fill
                    preload
                    sizes="(max-width: 760px) calc(100vw - 2rem), 42vw"
                    src="/images/portraits/marc-speaking-original.jpg"
                  />
                </div>
                <figcaption>
                  <strong>{copy.hero.captionName}</strong>
                  <span>{copy.hero.captionRole}</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <aside className={styles.credentials} aria-label={copy.credentials.join(", ")}>
          <div className={styles.container}>
            <ul>
              {copy.credentials.map((credential) => (
                <li key={credential}>{credential}</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className={styles.diagnosticSection} id="diagnostic">
          <div className={styles.container}>
            <HomeDiagnosticDisclosure locale={locale} />
          </div>
        </section>

        <section className={styles.situations}>
          <div className={styles.container}>
            <div className={styles.recognitionGrid}>
              <h2>{copy.recognition.title}</h2>
              <div className={styles.recognitionCopy}>
                <p className={styles.recognitionLead}>
                  {copy.recognition.paragraph.map((part, index) =>
                    part.emphasis ? (
                      <mark key={`${part.text}-${index}`}>{part.text}</mark>
                    ) : (
                      <span key={`${part.text}-${index}`}>{part.text}</span>
                    ),
                  )}
                </p>
                <p className={styles.recognitionExplanation}>
                  {copy.recognition.explanation}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.role}>
          <div className={styles.container}>
            <div className={styles.roleGrid}>
              <div>
                <h2>{copy.candour.title}</h2>
              </div>
              <div className={styles.roleCopy}>
                <p>{copy.candour.body}</p>
                <blockquote>{copy.candour.promise}</blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.offers} id="ways-to-work">
          <div className={styles.container}>
            <div className={styles.offersHeader}>
              <h2>{copy.services.title}</h2>
              <p>{copy.services.intro}</p>
            </div>
            <div className={styles.offerList}>
              {workingFormats.map((offer) => {
                const copyKey = offer.href.replace(/^\/de/, "");
                const responsibility =
                  copy.services.responsibility[copyKey] ?? offer.responsibility;
                const summary = copy.services.summary[copyKey] ?? offer.signal;

                return (
                  <Link className={styles.offer} href={offer.href} key={offer.href}>
                    <span className={styles.offerSignal}>{responsibility}</span>
                    <h3>{offer.title}</h3>
                    <p>{summary}</p>
                    <ArrowRight aria-hidden="true" size={22} />
                  </Link>
                );
              })}
            </div>
            <ButtonLink
              className={styles.compareLink}
              href={getRouteHref("services", locale)}
              variant="text"
            >
              {copy.services.linkLabel}
            </ButtonLink>
          </div>
        </section>

        <section className={styles.background}>
          <div className={styles.container}>
            <div className={styles.backgroundGrid}>
              <div>
                <h2>{copy.experience.title}</h2>
                <p className={styles.backgroundIntro}>{copy.experience.body}</p>
                <ul className={styles.proofList}>
                  {copy.experience.proof.map((line, lineIndex) => (
                    <li key={lineIndex}>
                      {line.map((part, partIndex) =>
                        part.strong ? (
                          <strong key={`${part.text}-${partIndex}`}>{part.text}</strong>
                        ) : (
                          <span key={`${part.text}-${partIndex}`}>{part.text}</span>
                        ),
                      )}
                    </li>
                  ))}
                </ul>
                <div className={styles.backgroundActions}>
                  <ButtonLink
                    href="/about"
                    hrefLang={locale === "de" ? "en" : undefined}
                    variant="secondary"
                  >
                    {copy.experience.aboutLabel}
                  </ButtonLink>
                  <ButtonLink
                    href="/results"
                    hrefLang={locale === "de" ? "en" : undefined}
                    variant="text"
                  >
                    {copy.experience.resultsLabel}
                  </ButtonLink>
                </div>
              </div>
              <figure>
                <div className={styles.backgroundImageWrap}>
                  <Image
                    alt={copy.experience.imageAlt}
                    className={styles.backgroundImage}
                    fill
                    sizes="(max-width: 760px) calc(100vw - 2rem), 43vw"
                    src="/images/portraits/marc-seated-original.jpg"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section className={styles.processSummary}>
          <div className={styles.container}>
            <div className={styles.processSummaryGrid}>
              <h2>{copy.process.title}</h2>
              <div>
                <p>{copy.process.summary}</p>
                <ButtonLink
                  href={getRouteHref("services", locale, "#process")}
                  variant="text"
                >
                  {copy.process.linkLabel}
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.insights}>
          <div className={styles.container}>
            <div className={styles.insightsHeader}>
              <h2>{copy.insights.title}</h2>
              <p>{copy.insights.intro}</p>
            </div>
            <div className={styles.articleList}>
              {homeArticles.map((article) => (
                <Link
                  href={`/blog/${article.slug}`}
                  hrefLang={locale === "de" ? "en" : undefined}
                  key={article.slug}
                >
                  <span>
                    <span lang={locale === "de" ? "en" : undefined}>
                      {article.category}
                    </span>
                    {copy.insights.languageNote
                      ? ` · ${copy.insights.languageNote}`
                      : ""}
                  </span>
                  <h3 lang="en">{article.title}</h3>
                  <ArrowRight aria-hidden="true" size={21} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <div className={styles.finalCtaGrid}>
              <div>
                <h2>{copy.closing.title}</h2>
                <p>{copy.closing.body}</p>
              </div>
              <div className={styles.finalActions}>
                <ButtonLink
                  cta={primaryAction.isBooking}
                  href={primaryAction.href}
                  variant="inverse"
                >
                  {closingPrimaryLabel}
                </ButtonLink>
                {primaryAction.isBooking ? (
                  <Link
                    className={styles.finalTextLink}
                    href={
                      locale === "de"
                        ? getRouteHref("contact", "de", "#direct-contact")
                        : getRouteHref("contact", "en", "#contact-form")
                    }
                  >
                    {copy.closing.noteLabel}
                    <ArrowRight aria-hidden="true" size={18} />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
