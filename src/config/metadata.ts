import type { Metadata } from "next";

import { getSiteUrl, siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  locale?: "en_GB" | "de_DE";
  languages?: Record<string, string>;
  robots?: Metadata["robots"];
};

export function createPageMetadata({
  title,
  description,
  path,
  locale = "en_GB",
  languages,
  robots,
}: PageMetadataInput): Metadata {
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;
  const socialImage = `${getSiteUrl()}${
    locale === "de_DE" ? "/de/social-image" : "/social-image"
  }`;

  return {
    metadataBase: new URL(getSiteUrl()),
    title: title.includes(siteConfig.name) ? { absolute: title } : title,
    description,
    ...(robots ? { robots } : {}),
    alternates: {
      canonical: path,
      ...(languages ? { languages } : {}),
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    openGraph: {
      type: "website",
      locale,
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage],
    },
  };
}
