import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  ContactBand,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { getSiteUrl, siteConfig } from "@/config/site";
import { BLOG_POSTS, getBlogPost, getReadingTime } from "@/content/blog";

import styles from "../blog.module.css";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function toId(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/^-|-$/g, "");
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return {};

  const path = `/blog/${post.slug}`;
  const title = `${post.title} | ${siteConfig.name}`;
  const socialImage = `/blog/${post.slug}/opengraph-image`;
  const socialImageAlt = `Article by ${siteConfig.name}: ${post.title}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    authors: [{ name: siteConfig.name, url: "/about" }],
    openGraph: {
      type: "article",
      locale: "en_GB",
      url: path,
      siteName: siteConfig.name,
      title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ["/about"],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const siteUrl = getSiteUrl();
  const socialImage = `/blog/${post.slug}/opengraph-image`;

  return (
    <article className={pageStyles.page}>
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
            author: { "@id": `${siteUrl}/#marc-berghoff` },
            publisher: { "@id": `${siteUrl}/#marc-berghoff` },
            image: `${siteUrl}${socialImage}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Insights",
                item: `${siteUrl}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `${siteUrl}/blog/${post.slug}`,
              },
            ],
          },
        ]}
      />

      <header className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <Breadcrumbs
            className={styles.articleBreadcrumbs}
            items={[
              { label: "Insights", href: "/blog" },
              { label: post.title },
            ]}
          />
          <p className={styles.articleCategory}>{post.category}</p>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <p className={styles.articleStandfirst}>{post.description}</p>
          <div className={styles.meta}>
            <span>By Marc Berghoff</span>
            <time dateTime={post.publishedAt}>
              {dateFormatter.format(new Date(`${post.publishedAt}T00:00:00Z`))}
            </time>
            <span>{getReadingTime(post)}</span>
          </div>
        </div>
      </header>

      <div className={styles.articleLayout}>
        <aside className={styles.toc} aria-label="Article contents">
          <p className={styles.tocLabel}>In this article</p>
          <ol>
            {post.sections.map((section) => (
              <li key={section.heading}>
                <a href={`#${toId(section.heading)}`}>{section.heading}</a>
              </li>
            ))}
          </ol>
        </aside>

        <div className={styles.prose}>
          <p>{post.intro}</p>
          {post.sections.map((section) => (
            <section
              className={styles.proseSection}
              id={toId(section.heading)}
              key={section.heading}
            >
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.points ? (
                <ul>
                  {section.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <div className={styles.authorNote}>
            <strong>About the author</strong>
            <p>
              Marc Berghoff has an MSc in Psychology and is an ICF-credentialed Associate Certified Coach (ACC). He works with founders and leadership teams on organisational bottlenecks and people decisions.
            </p>
          </div>
        </div>
      </div>

      <ContactBand
        title="See how Marc approaches this kind of work."
        text="The linked service page explains what is included and how to begin."
        href={post.nextStep.href}
        label={post.nextStep.label}
      />
    </article>
  );
}
