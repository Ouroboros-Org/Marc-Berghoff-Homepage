import { getSiteUrl, siteConfig } from "@/config/site";
import { BLOG_POSTS } from "@/content/blog";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const siteUrl = getSiteUrl();
  const latestUpdate = BLOG_POSTS.reduce(
    (latest, post) => (post.updatedAt > latest ? post.updatedAt : latest),
    BLOG_POSTS[0]?.updatedAt ?? "2026-07-29",
  );
  const items = BLOG_POSTS.map(
    (post) => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <description>${escapeXml(post.description)}</description>
        <category>${escapeXml(post.category)}</category>
        <pubDate>${new Date(`${post.publishedAt}T12:00:00Z`).toUTCString()}</pubDate>
        <dc:creator>${escapeXml(siteConfig.name)}</dc:creator>
      </item>`,
  ).join("");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
      <channel>
        <title>${escapeXml(siteConfig.name)} insights</title>
        <link>${siteUrl}/blog</link>
        <description>${escapeXml(
          "Notes on leadership, decision rights, role clarity, coaching and organisation issues in growing companies.",
        )}</description>
        <language>en-gb</language>
        <lastBuildDate>${new Date(`${latestUpdate}T12:00:00Z`).toUTCString()}</lastBuildDate>
        <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new Response(feed, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
