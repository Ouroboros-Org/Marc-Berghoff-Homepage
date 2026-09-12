import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BLOG_POSTS, getBlogPost } from "@/content/blog";
import BlogPostPage, { generateMetadata, generateStaticParams } from "./page";

describe("manual article publishing", () => {
  it("gives every published article a route and a matching canonical URL", async () => {
    const paths = generateStaticParams();
    expect(paths).toHaveLength(BLOG_POSTS.length);
    expect(new Set(paths.map(({ slug }) => slug)).size).toBe(paths.length);

    for (const { slug } of paths) {
      const metadata = await generateMetadata({ params: Promise.resolve({ slug }) });
      expect(metadata.alternates?.canonical).toBe(`/blog/${slug}`);
      expect(metadata.description).toBe(getBlogPost(slug)?.description);
    }
  });

  it("renders readable contents links, authorship and a next step from article content", async () => {
    const slug = "executive-coaching-advisory-or-assessment";
    const html = renderToStaticMarkup(await BlogPostPage({ params: Promise.resolve({ slug }) }));
    expect(html).toContain("By Marc Berghoff");
    expect(html).toContain('href="#assessment-when-the-underlying-issue-is-unclear"');
    expect(html).toContain('id="assessment-when-the-underlying-issue-is-unclear"');
    expect(html).toContain('href="/services"');
    expect(html).toContain("BlogPosting");
    expect(html).toContain("Fractional CPO");
  });

  it("does not publish an unknown article", async () => {
    expect(getBlogPost("an-unpublished-draft")).toBeUndefined();
    await expect(BlogPostPage({
      params: Promise.resolve({ slug: "an-unpublished-draft" }),
    })).rejects.toThrow("NEXT_HTTP_ERROR_FALLBACK;404");
  });
});
