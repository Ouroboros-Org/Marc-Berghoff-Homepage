import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import {
  ContactBand,
  PageHero,
  SectionHeading,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { createPageMetadata } from "@/config/metadata";
import { getPrimaryContactAction, getSiteUrl } from "@/config/site";
import { BLOG_POSTS, getReadingTime } from "@/content/blog";

import styles from "./blog.module.css";

export const metadata = createPageMetadata({
  title: "Leadership and Organisation Insights",
  description:
    "Practical notes on people strategy, leadership and organisational development for growing companies.",
  path: "/blog",
});

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  const [featured, ...posts] = BLOG_POSTS;
  const siteUrl = getSiteUrl();
  const contactAction = getPrimaryContactAction();

  return (
    <div className={pageStyles.page}>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Marc Berghoff insights",
          description: metadata.description,
          url: `${siteUrl}/blog`,
          author: { "@id": `${siteUrl}/#marc-berghoff` },
          blogPost: BLOG_POSTS.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            url: `${siteUrl}/blog/${post.slug}`,
          })),
        }}
      />

      <PageHero
        breadcrumbs={[{ label: "Insights" }]}
        title="Think through the people decisions ahead of you."
        lead="Explore practical notes on roles, leadership and how your organisation works. Start with a question you recognise, or read about the support that could help your team."
        primary={{ label: "Read featured article", href: "#featured-article" }}
        ctaPrimary={true}
        secondary={{ label: "See how I work", href: "/services" }}
      />

      <section className={pageStyles.section} aria-labelledby="featured-article">
        <div className={pageStyles.container}>
          <article className={styles.featured}>
            <Reveal>
              <p className={styles.articleCategory}>{featured.category}</p>
              <h2 className={styles.featuredTitle} id="featured-article">
                <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
              </h2>
              <p className={styles.featuredDescription}>{featured.description}</p>
              <div className={styles.meta}>
                <time dateTime={featured.publishedAt}>
                  {dateFormatter.format(new Date(`${featured.publishedAt}T00:00:00Z`))}
                </time>
                <span>{getReadingTime(featured)}</span>
              </div>
              <Link className={styles.readLink} href={`/blog/${featured.slug}`}>
                Read article
                <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
              </Link>
            </Reveal>
          </article>
        </div>
      </section>

      <section className={pageStyles.sectionTint} aria-labelledby="all-articles">
        <div className={pageStyles.container}>
          <SectionHeading
            id="all-articles"
            title="Start with the pattern closest to yours."
          />
          <div className={styles.articleGrid}>
            {posts.map((post) => (
              <Reveal key={post.slug}>
                <article className={styles.articleCard}>
                  <div>
                    <p className={styles.cardCategory}>{post.category}</p>
                    <h3 className={styles.cardTitle}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className={styles.cardDescription}>{post.description}</p>
                  </div>
                  <div className={styles.meta}>
                    <time dateTime={post.publishedAt}>
                      {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00Z`))}
                    </time>
                    <span>{getReadingTime(post)}</span>
                  </div>
                  <Link className={styles.readLink} href={`/blog/${post.slug}`}>
                    Read article
                    <ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        title="Bring the question you are working on."
        text="Tell me how it shows up in your company. We can talk through the support that would help."
        label="Book a call"
        helper="Free introduction · typically 30 minutes"
      />
    </div>
  );
}
