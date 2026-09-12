import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  ContactBand,
  secondaryPageStyles as pageStyles,
} from "@/components/pages/editorial";
import { StructuredData } from "@/components/structured-data";
import { getSiteUrl, siteConfig } from "@/config/site";
import { BLOG_POSTS, type BlogImage, getBlogPost, getReadingTime } from "@/content/blog";

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

function ArticleImage({ image, hero = false }: { image: BlogImage; hero?: boolean }) {
  return (
    <figure className={hero ? styles.articleCover : styles.articleImage}>
      <Image
        alt={image.alt}
        height={image.height}
        src={image.src}
        width={image.width}
        sizes={hero ? "(max-width: 1100px) calc(100vw - 2rem), 1056px" : "(max-width: 768px) calc(100vw - 2rem), 768px"}
      />
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
    </figure>
  );
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

  return {
    metadataBase: new URL(getSiteUrl()),
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

export const dynamicParams = false;

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const siteUrl = getSiteUrl();

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
            ...(post.image ? { image: `${siteUrl}${post.image.src}` } : {}),
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

      {post.image ? <ArticleImage image={post.image} hero /> : null}

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
              {section.image ? <ArticleImage image={section.image} /> : null}
            </section>
          ))}
          {post.sources?.length ? (
            <section className={styles.sources} aria-labelledby="article-sources">
              <h2 id="article-sources">Further reading</h2>
              <ul>
                {post.sources.map((source) => (
                  <li key={source.href}><a href={source.href}>{source.label}</a></li>
                ))}
              </ul>
            </section>
          ) : null}
          <div className={styles.authorNote}>
            <strong>About me</strong>
            <p>
              I work with you on people strategy, leadership and organisational
              development. That can mean a Bottleneck Assessment with Review,
              Strategic People Advisory or ongoing Fractional CPO support.
            </p>
          </div>
        </div>
      </div>

      <ContactBand
        title="Bring the question back to your situation."
        text="Explore the support that fits your situation, or start with a free introductory conversation."
        href={post.nextStep.href}
        label={post.nextStep.label}
        helper={post.nextStep.href.startsWith("/contact") ? "Free introduction · typically 30 minutes" : undefined}
      />
    </article>
  );
}
