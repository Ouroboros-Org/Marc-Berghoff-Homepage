import { ArrowRight } from "lucide-react";
import Link from "next/link";

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
    "Notes on decisions that return upstairs, unclear role boundaries and people work that has lost its owner.",
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
        title="Read the pattern before you name the help."
        lead="A decision is back on your desk. Two roles are waiting for each other. A people remit has no owner. These notes start with the working week, before anyone turns the situation into a diagnosis."
        primary={{ label: "Start with the latest article", href: "#featured-article" }}
        ctaPrimary={true}
        secondary={{ label: "See how I work", href: "/services" }}
      />

      <section className={pageStyles.section} aria-labelledby="featured-article">
        <div className={pageStyles.container}>
          <article className={styles.featured}>
            <div>
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
            </div>
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
              <article className={styles.articleCard} key={post.slug}>
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
            ))}
          </div>
        </div>
      </section>

      <ContactBand
        href={contactAction.href}
        title="If an article sounds familiar, bring the live version."
        text="Tell me where the pattern shows up in your company and what you have already tried. The first conversation is free and typically takes 30 minutes."
        label={contactAction.label}
      />
    </div>
  );
}
