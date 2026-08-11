import type { MetadataRoute } from "next";

import { LEGAL_DETAILS } from "@/app/(en)/privacy/legal-details";
import {
  getLanguageAlternates,
  getRouteHref,
  type LocalizedRouteId,
  type SiteLocale,
} from "@/config/routes";
import { getSiteUrl } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";

const localizedRoutes = [
  { id: "home", changeFrequency: "monthly", priority: 1 },
  { id: "services", changeFrequency: "monthly", priority: 0.9 },
  { id: "bottleneckAssessment", changeFrequency: "monthly", priority: 0.9 },
  { id: "executiveCoaching", changeFrequency: "monthly", priority: 0.8 },
  { id: "advisory", changeFrequency: "monthly", priority: 0.8 },
  { id: "peerAdvisory", changeFrequency: "monthly", priority: 0.8 },
  {
    id: "fractionalPeopleLeadership",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  { id: "about", changeFrequency: "monthly", priority: 0.7 },
  { id: "results", changeFrequency: "monthly", priority: 0.7 },
  { id: "contact", changeFrequency: "yearly", priority: 0.6 },
] as const satisfies readonly {
  id: LocalizedRouteId;
  changeFrequency: "monthly" | "yearly";
  priority: number;
}[];

const localizedLegalRoutes = LEGAL_DETAILS.isComplete
  ? [
      {
        id: "privacy" as const,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      },
      {
        id: "imprint" as const,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      },
    ]
  : [];

const englishRoutes = [
  { path: "/blog", changeFrequency: "weekly", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const locales: readonly SiteLocale[] = ["en", "de"];

  return [
    ...[...localizedRoutes, ...localizedLegalRoutes].flatMap(
      ({ id, changeFrequency, priority }) => {
        const alternates = Object.fromEntries(
          Object.entries(getLanguageAlternates(id)).map(([language, path]) => [
            language,
            `${siteUrl}${path}`,
          ]),
        );

        return locales.map((locale) => ({
          url: `${siteUrl}${getRouteHref(id, locale)}`,
          changeFrequency,
          priority,
          alternates: { languages: alternates },
        }));
      },
    ),
    ...englishRoutes.map(
      ({ path, changeFrequency, priority }) => ({
        url: `${siteUrl}${path}`,
        changeFrequency,
        priority,
      }),
    ),
    ...BLOG_POSTS.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
