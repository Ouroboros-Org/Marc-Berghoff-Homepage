import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { EngagementProcess } from "@/components/engagement-process";
import { HomeContactJourney } from "@/components/home-contact-journey";
import { HomeDiagnosticDisclosure } from "@/components/home-diagnostic-disclosure";
import { createPageMetadata } from "@/config/metadata";
import { BLOG_POSTS } from "@/content/blog";

import styles from "./home.module.css";

export const metadata = createPageMetadata({
  title: "Fractional Leadership for Growing Businesses | Marc Berghoff",
  description:
    "When people and organisation decisions keep returning to senior leaders, I can take a fractional remit, advise, assess or coach.",
  path: "/",
});

const situations = [
  {
    title: "Decisions come back upstairs.",
    text: "Roles exist on paper, yet hiring, performance and organisation questions still travel to the founder or one senior leader.",
  },
  {
    title: "The people agenda has no senior owner.",
    text: "There may be good HR support, but difficult organisation and leadership choices do not have enough authority behind them.",
  },
  {
    title: "The explanation keeps changing.",
    text: "One week the problem is performance; the next it is structure, communication or culture. Action starts before the cause is understood.",
  },
] as const;

const offers = [
  {
    title: "Fractional leadership",
    signal: "The work needs a senior owner.",
    text: "Part-time ownership of agreed people and organisation priorities while the permanent shape of the business is still developing.",
    href: "/fractional-people-leadership",
  },
  {
    title: "Strategic people advisory",
    signal: "The decision is visible, but difficult.",
    text: "Direct support on a people, role or organisation decision that remains with the leadership team.",
    href: "/advisory",
  },
  {
    title: "Bottleneck Assessment",
    signal: "The cause is still disputed.",
    text: "A structured investigation when the leadership team needs a shared reading of the evidence before it acts.",
    href: "/bottleneck-assessment",
  },
  {
    title: "Individual coaching",
    signal: "The work belongs with one leader.",
    text: "Confidential one-to-one work on a live situation and the part of it that belongs with the individual.",
    href: "/executive-coaching",
  },
  {
    title: "Group coaching",
    signal: "Several leaders are working on related questions.",
    text: "A shared coaching format in development for leaders working on related questions.",
    href: "/group-coaching",
  },
] as const;

const homeArticles = BLOG_POSTS.slice(0, 3);

export default function HomePage() {
  return (
    <HomeContactJourney>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <h1>When people decisions keep coming back to you.</h1>
              <p>
                Your business may have outgrown the way people and organisation
                decisions are made. I can take a defined part-time remit, help you
                test a difficult decision, or use assessment and coaching where they
                fit better.
              </p>
              <div className={styles.buttonRow}>
                <ButtonLink cta href="/contact#booking">
                  Book a free 30-minute conversation
                </ButtonLink>
                <ButtonLink href="#ways-to-work" variant="secondary">
                  See the options
                </ButtonLink>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <div className={styles.heroImageWrap}>
                <Image
                  alt="Marc Berghoff speaking at a conference"
                  className={styles.heroImage}
                  fill
                  preload
                  sizes="(max-width: 760px) calc(100vw - 2rem), 42vw"
                  src="/images/portraits/marc-speaking-original.jpg"
                />
              </div>
              <figcaption>
                <strong>Marc Berghoff</strong>
                <span>Fractional Leadership Manager</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.situations}>
        <div className={styles.container}>
          <div className={styles.sectionLead}>
            <h2>One blurred decision can keep pulling work back upstairs.</h2>
            <p>
              You see it when managers wait for cover, ownership changes with the
              meeting or a familiar people issue returns under a new name.
            </p>
          </div>
          <div className={styles.situationList}>
            {situations.map((situation) => (
              <article key={situation.title}>
                <h3>{situation.title}</h3>
                <p>{situation.text}</p>
              </article>
            ))}
          </div>
          <p className={styles.situationClose}>
            You may need to clarify the decision, give the work an owner or gather
            evidence first. I help you work out which.
          </p>
        </div>
      </section>

      <section className={styles.role}>
        <div className={styles.container}>
          <div className={styles.roleGrid}>
            <div>
              <h2>Choose the amount of help the work needs.</h2>
            </div>
            <div className={styles.roleCopy}>
              <p>
                I can carry an agreed remit inside your business. For a narrower
                question, I can advise, investigate a recurring problem or coach one
                leader. The first conversation is where we set that boundary.
              </p>
              <blockquote>
                You do not need to choose a label before we talk.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.offers} id="ways-to-work">
        <div className={styles.container}>
          <div className={styles.offersHeader}>
            <h2>Choose by who needs to carry the work.</h2>
            <p>
              Some work needs an owner. Some needs challenge. Some needs evidence or
              private thinking space.
            </p>
          </div>
          <div className={styles.offerList}>
            {offers.map((offer) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <span className={styles.offerSignal}>{offer.signal}</span>
                <h3>{offer.title}</h3>
                <p>{offer.text}</p>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
          <ButtonLink className={styles.compareLink} href="/services" variant="text">
            See scope and fees
          </ButtonLink>
        </div>
      </section>

      <EngagementProcess />

      <section className={styles.diagnosticSection}>
        <div className={styles.container}>
          <HomeDiagnosticDisclosure />
        </div>
      </section>

      <section className={styles.background}>
        <div className={styles.container}>
          <div className={styles.backgroundGrid}>
            <div>
              <h2>You may want someone who has carried the work.</h2>
              <p>
                I have worked in people leadership, founder roles, coaching and peer
                advisory. That experience shapes my questions, but your business still
                needs its own answer.
              </p>
              <ButtonLink href="/about" variant="secondary">
                About me
              </ButtonLink>
            </div>
            <figure>
              <div className={styles.backgroundImageWrap}>
                <Image
                  alt="Marc Berghoff seated in an office setting"
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

      <section className={styles.insights}>
        <div className={styles.container}>
          <div className={styles.insightsHeader}>
            <h2>Read before you choose outside help.</h2>
            <p>
              These notes help you separate a decision problem, a role problem and an
              operating-model problem.
            </p>
          </div>
          <div className={styles.articleList}>
            {homeArticles.map((article) => (
              <Link href={`/blog/${article.slug}`} key={article.slug}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
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
              <h2>Start with the situation, not a service.</h2>
              <p>
                The first 30 minutes are free. Tell me what keeps returning and what
                you have tried. We can decide whether another conversation makes
                sense.
              </p>
            </div>
            <div className={styles.finalActions}>
              <ButtonLink cta href="/contact#booking" variant="inverse">
                Choose a time
              </ButtonLink>
              <Link className={styles.finalTextLink} href="/contact#contact-form">
                Send me a note
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </HomeContactJourney>
  );
}
