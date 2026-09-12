import type { MetadataRoute } from "next";
import { LEGAL_DETAILS } from "@/app/(en)/privacy/legal-details";
import { ROUTES } from "@/config/routes";
import { getSiteUrl } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";
import { CASE_STUDIES } from "@/content/proof";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  return [
    ...Object.entries(ROUTES)
      .filter(([id]) => LEGAL_DETAILS.isComplete || !["privacy", "imprint"].includes(id))
      .map(([id, path]) => ({
        url: `${origin}${path}`,
        changeFrequency: "monthly" as const,
        priority: id === "home" ? 1 : id === "fractionalCpo" ? 0.9 : 0.7,
      })),
    ...CASE_STUDIES.map(({ href }) => ({
      url: `${origin}${href}`,
      changeFrequency: "yearly" as const,
      priority: 0.75,
    })),
    { url: `${origin}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...BLOG_POSTS.map((post) => ({
      url: `${origin}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.65,
    })),
  ];
}
