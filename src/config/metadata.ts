import type { Metadata } from "next";

import { siteConfig } from "./site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const socialTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": "/blog/feed.xml" },
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
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
