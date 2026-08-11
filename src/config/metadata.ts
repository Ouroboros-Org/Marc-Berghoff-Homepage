import type { Metadata } from "next";

import { siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  locale?: "en_GB" | "de_DE";
  languages?: Record<string, string>;
};

export function createPageMetadata({
  title,
  description,
  path,
  locale = "en_GB",
  languages,
}: PageMetadataInput): Metadata {
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title: title.includes(siteConfig.name) ? { absolute: title } : title,
    description,
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
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}
