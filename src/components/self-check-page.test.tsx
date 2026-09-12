import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { metadata } from "@/app/(en)/self-check/page";
import sitemap from "@/app/sitemap";
import { ROUTES } from "@/config/routes";
import { getServiceNavigation } from "@/config/site";

import { SelfCheckPageView } from "./self-check-page";
import { SiteHeader } from "./site-header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/self-check",
}));

describe("independent company self-check", () => {
  it("renders the ten-statement check at its public anchor without requesting an email", () => {
    const html = renderToStaticMarkup(<SelfCheckPageView />);

    expect(html.match(/id="self-check"/g)).toHaveLength(1);
    expect(html).toContain('aria-labelledby="self-check-heading"');
    expect(html).toContain('id="self-check-heading"');
    expect(html.match(/<fieldset\b/g)).toHaveLength(10);
    expect(html.match(/type="radio"/g)).toHaveLength(20);
    expect(html).not.toContain('type="email"');
    expect(html).not.toContain('href="/bottleneck-assessment');
    expect(html).toContain("Choose what to explore next");
  });

  it("gives the self-check its own metadata and sitemap entry", () => {
    expect(metadata.title).toBe("Self-check");
    expect(metadata.alternates?.canonical).toBe(ROUTES.selfCheck);
    expect(sitemap().filter((entry) => new URL(entry.url).pathname === ROUTES.selfCheck)).toHaveLength(1);
  });

  it("links both header shortcuts to the self-check and preserves the paid engagement", () => {
    const html = renderToStaticMarkup(<SiteHeader locale="en" />);
    const shortcutLinks = Array.from(
      html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g),
    ).filter((match) => match[1].includes('href="/self-check"'));

    expect(shortcutLinks).toHaveLength(2);
    for (const [, attributes, content] of shortcutLinks) {
      expect(attributes).toContain('aria-current="page"');
      expect(content.replace(/<[^>]+>/g, "")).toBe("Self-check");
    }
    expect(getServiceNavigation().map((item) => item.href)).toEqual([
      "/services",
      "/bottleneck-assessment",
      "/advisory",
      "/fractional-cpo",
    ]);
  });
});
