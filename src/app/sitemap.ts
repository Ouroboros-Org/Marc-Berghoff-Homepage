import type { MetadataRoute } from "next";

import { LEGAL_DETAILS } from "@/app/privacy/legal-details";
import { getSiteUrl } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";

const routes = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/bottleneck-assessment", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/advisory", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/fractional-people-leadership",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { path: "/executive-coaching", changeFrequency: "monthly", priority: 0.8 },
  { path: "/results", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact/message", changeFrequency: "yearly", priority: 0.65 },
  { path: "/sample-report", changeFrequency: "yearly", priority: 0.5 },
] as const;

const legalRoutes = LEGAL_DETAILS.isComplete
  ? [
      { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.2 },
      { path: "/imprint", changeFrequency: "yearly" as const, priority: 0.2 },
    ]
  : [];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return [
    ...[...routes, ...legalRoutes].map(({ path, changeFrequency, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...BLOG_POSTS.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
