import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/button";
import { EngagementProcess } from "@/components/engagement-process";
import { HomeContactJourney } from "@/components/home-contact-journey";
import { HomeDiagnosticDisclosure } from "@/components/home-diagnostic-disclosure";
import { createPageMetadata } from "@/config/metadata";
import { BLOG_POSTS } from "@/content/blog";
import {
  CORE_WORKING_FORMATS,
  SUPPORTING_WORKING_FORMATS,
} from "@/content/working-formats";

import styles from "./home.module.css";

export const metadata = createPageMetadata({
  title: "Leadership, Organisation and Coaching | Marc Berghoff",
  description:
    "I help founders and leadership teams see what is really happening and get difficult leadership and organisation work moving.",
  path: "/",
});

const situations = [
  {
    title: "Work lands back on your desk.",
    text: "Responsibilities exist, but important tasks still return to the founder or one senior leader.",
  },
  {
    title: "People ask permission they already have.",
    text: "The role carries responsibility on paper, while the person still waits for cover before acting.",
  },
  {
    title: "The same issue survives another meeting.",
    text: "It has been raised before, yet ownership changes or the next action never holds.",
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
              <h1>When a leadership issue is not moving.</h1>
              <p>
                I help founders and leadership teams see what is really happening
                and get the right work moving. I can stay at coaching distance,
                advise on the decision or take responsibility for a defined part of it.
              </p>
              <div className={styles.buttonRow}>
                <ButtonLink cta href="/contact#booking">
                  Book a free 30-minute conversation
                </ButtonLink>
                <ButtonLink href="#ways-to-work" variant="secondary">
                  See how I can help
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
              The issue may be described as performance, communication or capacity.
              The pattern is often easier to see in what people do.
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
            You may need a clearer decision, a stronger owner or space for one leader
            to change how they handle the situation. I help you work out which.
          </p>
        </div>
      </section>

      <section className={styles.role}>
        <div className={styles.container}>
          <div className={styles.roleGrid}>
            <div>
              <h2>You need candour without losing the operating context.</h2>
            </div>
            <div className={styles.roleCopy}>
              <p>
                I am outside your reporting line, which makes it easier for me to say
                what I see. I still need the context before I form a view. We agree how
                involved I should be after the first conversation.
              </p>
              <blockquote>
                If I am not the right person, I will say so. Where I can make a useful
                introduction, I will.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.offers} id="ways-to-work">
        <div className={styles.container}>
          <div className={styles.offersHeader}>
            <h2>Choose the level of involvement the issue needs.</h2>
            <p>
              Start with the issue. We can choose the format after we understand it.
            </p>
          </div>
          <div className={styles.offerList}>
            {CORE_WORKING_FORMATS.map((offer) => (
              <Link className={styles.offer} href={offer.href} key={offer.href}>
                <span className={styles.offerSignal}>{offer.responsibility}</span>
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <ArrowRight aria-hidden="true" size={22} />
              </Link>
            ))}
          </div>
          <div className={styles.supportingHeader}>
            <h3>When the route needs another step.</h3>
            <p>
              Assessment helps when the cause is unclear. Group coaching is a
              developing route for leaders who share the work.
            </p>
          </div>
          <div className={styles.supportingList}>
            {SUPPORTING_WORKING_FORMATS.map((offer) => (
              <Link className={styles.supportingOffer} href={offer.href} key={offer.href}>
                <span>{offer.responsibility}</span>
                <h3>{offer.title}</h3>
                <p>{offer.summary}</p>
                <ArrowRight aria-hidden="true" size={20} />
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
              <h2>Experience on both sides of the conversation.</h2>
              <p>
                I have led people work inside a scale-up, co-founded a business,
                coached leaders and worked as a fractional Head of HR. That mix helps
                me notice the human tension and the operating consequence.
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
            <h2>Read the issue before you choose the help.</h2>
            <p>
              These notes look at what makes leadership work difficult to see, own or
              move.
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
              <h2>Start with what is happening now.</h2>
              <p>
                The first 30 minutes are free. Bring the issue, what you have tried
                and where it keeps returning. My aim is that you leave with a clearer
                question, even if the work stops there.
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
