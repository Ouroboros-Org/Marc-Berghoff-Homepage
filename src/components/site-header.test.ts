import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import {
  getActiveHeaderGroupId,
  isCurrentHeaderItem,
  isCurrentNavigationPage,
  SiteHeader,
} from "./site-header";

const routeState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => routeState.pathname,
}));

describe("header navigation state", () => {
  it("places the assessment inside the work group", () => {
    expect(getActiveHeaderGroupId("/bottleneck-assessment")).toBe("work");
  });

  it("keeps the independent self-check outside the engagement groups", () => {
    expect(getActiveHeaderGroupId("/self-check")).toBeNull();
  });

  it.each([
    ["/advisory", "work"],
    ["/fractional-cpo", "work"],
    ["/results", "about"],
    ["/about", "about"],
    ["/results/klarsolar", "about"],
    ["/blog/founder-bottleneck-or-operating-model", "insights"],
    ["/contact", "about"],
  ])("maps %s to the %s group", (pathname, groupId) => {
    expect(getActiveHeaderGroupId(pathname)).toBe(groupId);
  });

  it("marks only the exact destination as the current page", () => {
    const pathname = "/blog/founder-bottleneck-or-operating-model";

    expect(isCurrentNavigationPage(pathname, "/blog")).toBe(false);
    expect(isCurrentNavigationPage(pathname, pathname)).toBe(true);
  });

  it("marks the assessment destination in the work group", () => {
    const pathname = "/bottleneck-assessment";

    expect(isCurrentHeaderItem(pathname, "work", pathname)).toBe(true);
    expect(isCurrentHeaderItem(pathname, "about", pathname)).toBe(false);
  });

  it("does not mark retired routes as current navigation", () => {
    expect(getActiveHeaderGroupId("/de/about")).toBeNull();
    expect(getActiveHeaderGroupId("/peer-advisory")).toBeNull();
  });
});

describe("selected mobile navigation pages", () => {
  it.each([
    ["/contact", "About", "/contact"],
    ["/advisory", "How I can help", "/advisory"],
    ["/blog/founder-bottleneck-or-operating-model", "Insights", "/blog/founder-bottleneck-or-operating-model"],
    ["/self-check", null, "/self-check"],
    ["/results/klarsolar", "About", null],
  ] as const)("marks the current destination and group on %s", (pathname, groupLabel, currentHref) => {
    routeState.pathname = pathname;
    const html = renderToStaticMarkup(createElement(SiteHeader));
    const mobile = html.slice(html.indexOf('id="mobile-navigation"'));
    const selectedLinks = Array.from(mobile.matchAll(/<a\b([^>]*)>/g))
      .filter((match) => match[1].includes('aria-current="page"'))
      .map((match) => match[1].match(/href="([^"]+)"/)?.[1]);
    const activeGroups = Array.from(
      mobile.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g),
    ).filter((match) => match[1].includes('data-active="true"'));

    expect(selectedLinks).toEqual(currentHref ? [currentHref] : []);
    expect(activeGroups).toHaveLength(groupLabel ? 1 : 0);
    if (groupLabel) {
      const group = activeGroups[0][2];
      expect(group).toContain(`class="mobile-nav__section-label">${groupLabel}</span>`);
      expect(group).toMatch(/<span aria-hidden="true" class="mobile-nav__index">0\d<\/span>/);
    }
  });
});
