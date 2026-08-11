import { describe, expect, it } from "vitest";

import {
  getCalLink,
  getContactEmail,
  getContactPhone,
  getHeaderNavigation,
  getPrimaryContactAction,
  getSiteUrl,
} from "./site";

describe("getHeaderNavigation", () => {
  it("uses localized About and Results links in the German navigation", () => {
    const aboutGroup = getHeaderNavigation("de").find(
      (group) => group.id === "about",
    );

    expect(aboutGroup?.href).toBe("/de/about");
    expect(aboutGroup?.items.map(({ href, language }) => ({ href, language })))
      .toEqual([
        { href: "/de/about", language: undefined },
        { href: "/de/results", language: undefined },
        { href: "/de/contact", language: undefined },
      ]);
  });

  it("keeps German Insights links explicitly marked as English", () => {
    const insightGroup = getHeaderNavigation("de").find(
      (group) => group.id === "insights",
    );

    expect(insightGroup?.href).toBe("/blog");
    expect(insightGroup?.items.every((item) => item.language === "en")).toBe(
      true,
    );
  });
});

describe("getSiteUrl", () => {
  it.each([
    undefined,
    "",
    "   ",
    "https://YOUR_DOMAIN",
    "https://replace-me.example",
    "not a URL",
    "javascript:alert(1)",
    "https://user:password@example.com",
  ])("uses the public domain for an absent, placeholder or unsafe value: %s", (value) => {
    expect(getSiteUrl(value ?? null, null, null)).toBe("https://marcberghoff.com");
  });

  it("returns only the canonical origin", () => {
    expect(
      getSiteUrl(
        " https://www.marc.example/path/?from=test#top ",
        null,
        null,
      ),
    ).toBe(
      "https://www.marc.example",
    );
  });

  it("allows an explicit local development origin", () => {
    expect(getSiteUrl("http://localhost:4100/preview", null, null)).toBe(
      "http://localhost:4100",
    );
  });

  it("uses a stable custom Vercel production domain when the public origin is absent", () => {
    expect(
      getSiteUrl(null, "marc.example", "preview-123.vercel.app"),
    ).toBe("https://marc.example");
  });

  it("does not use the Vercel project domain as the canonical origin", () => {
    expect(getSiteUrl(null, "marc-homepage.vercel.app", null)).toBe(
      "https://marcberghoff.com",
    );
  });

  it("does not use a temporary Vercel deployment as the canonical domain", () => {
    expect(getSiteUrl(null, null, "preview-123.vercel.app")).toBe(
      "https://marcberghoff.com",
    );
  });
});

describe("getContactEmail", () => {
  it.each([undefined, "", "not-an-email", "YOUR_EMAIL"])(
    "uses the public mailbox fallback for an absent or invalid value: %s",
    (value) => {
      expect(getContactEmail(value)).toBe("marc@marcberghoff.com");
    },
  );

  it("accepts a configured public mailbox", () => {
    expect(getContactEmail(" hello@marcberghoff.com ")).toBe(
      "hello@marcberghoff.com",
    );
  });
});

describe("getPrimaryContactAction", () => {
  it("always routes the English primary action to booking", () => {
    expect(getPrimaryContactAction("en")).toEqual({
      href: "/contact#booking",
      label: "Book a free 30-minute conversation",
      isBooking: true,
    });
  });

  it("routes the German primary action to the German booking page", () => {
    expect(getPrimaryContactAction("de")).toEqual({
      href: "/de/contact#booking",
      label: "Kostenloses 30-Minuten-Gespräch buchen",
      isBooking: true,
    });
  });
});

describe("getCalLink", () => {
  it.each([
    undefined,
    "",
    "https://cal.com/marc/intro",
    "../marc/intro",
    "marc/intro?date=2026-08-04",
    "YOUR_CAL_LINK",
  ])("rejects an absent or malformed Cal link: %s", (value) => {
    expect(getCalLink(value)).toBeNull();
  });

  it("normalises a Cal username and event path", () => {
    expect(getCalLink(" /marc/first-conversation/ ")).toBe(
      "marc/first-conversation",
    );
  });
});

describe("getContactPhone", () => {
  it.each([
    undefined,
    "",
    "YOUR_PHONE",
    "0049 123 456",
    "+00 000 0000 0000",
    "+49 call-marc",
  ])("rejects an absent, placeholder or malformed number: %s", (value) => {
    expect(getContactPhone(value)).toBeNull();
  });

  it("keeps the display format and creates a safe telephone href", () => {
    expect(getContactPhone(" +49 (0) 123 456 789 ")).toEqual({
      display: "+49 (0) 123 456 789",
      href: "+490123456789",
    });
  });
});
