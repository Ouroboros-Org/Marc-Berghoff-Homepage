import { describe, expect, it } from "vitest";

import { getBookingUrl, getSiteUrl } from "./site";

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
  ])("uses localhost for an absent, placeholder or unsafe value: %s", (value) => {
    expect(getSiteUrl(value ?? null, null, null)).toBe("http://localhost:3000");
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

  it("uses the Vercel production domain when the public origin is absent", () => {
    expect(
      getSiteUrl(null, "marc.example", "preview-123.vercel.app"),
    ).toBe("https://marc.example");
  });

  it("uses the current Vercel deployment domain as a final hosted fallback", () => {
    expect(getSiteUrl(null, null, "preview-123.vercel.app")).toBe(
      "https://preview-123.vercel.app",
    );
  });
});

describe("getBookingUrl", () => {
  it.each([
    undefined,
    "",
    "https://YOUR_DOMAIN/book",
    "http://calendar.example/marc",
    "javascript:alert(1)",
    "https://user:password@calendar.example/marc",
  ])("rejects an absent, placeholder or unsafe value: %s", (value) => {
    expect(getBookingUrl(value)).toBeNull();
  });

  it("returns a valid HTTPS scheduling URL", () => {
    expect(getBookingUrl(" https://calendar.example/marc?month=2026-08 ")).toBe(
      "https://calendar.example/marc?month=2026-08",
    );
  });
});
