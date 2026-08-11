import { describe, expect, it } from "vitest";

import {
  getAlternateLocaleHref,
  getLanguageAlternates,
  getLocaleFromPathname,
  getRouteHref,
  getRouteId,
} from "./routes";

describe("localized routes", () => {
  it("maps every service page to its German counterpart", () => {
    expect(getRouteHref("services", "de")).toBe("/de/services");
    expect(getRouteHref("bottleneckAssessment", "de")).toBe(
      "/de/bottleneck-assessment",
    );
    expect(getRouteHref("contact", "de", "#booking")).toBe(
      "/de/contact#booking",
    );
  });

  it("maps About and Results to their German counterparts", () => {
    expect(getRouteHref("about", "de")).toBe("/de/about");
    expect(getRouteHref("results", "de")).toBe("/de/results");
  });

  it("round-trips route ids and locale detection", () => {
    expect(getRouteId("/de/executive-coaching")).toBe("executiveCoaching");
    expect(getLocaleFromPathname("/de/executive-coaching")).toBe("de");
    expect(getRouteId("/executive-coaching")).toBe("executiveCoaching");
    expect(getLocaleFromPathname("/executive-coaching")).toBe("en");
  });

  it("switches to the counterpart rather than the other homepage", () => {
    expect(getAlternateLocaleHref("/advisory")).toEqual({
      href: "/de/advisory",
      locale: "de",
    });
    expect(getAlternateLocaleHref("/de/advisory")).toEqual({
      href: "/advisory",
      locale: "en",
    });
    expect(getAlternateLocaleHref("/privacy")).toEqual({
      href: "/de/datenschutz",
      locale: "de",
    });
    expect(getAlternateLocaleHref("/de/impressum")).toEqual({
      href: "/imprint",
      locale: "en",
    });
    expect(getAlternateLocaleHref("/results")).toEqual({
      href: "/de/results",
      locale: "de",
    });
    expect(getAlternateLocaleHref("/de/about")).toEqual({
      href: "/about",
      locale: "en",
    });
  });

  it("only advertises alternates that exist", () => {
    expect(getAlternateLocaleHref("/blog")).toBeNull();
    expect(getLanguageAlternates("peerAdvisory")).toEqual({
      "en-GB": "/peer-advisory",
      de: "/de/peer-advisory",
      "x-default": "/peer-advisory",
    });
    expect(getLanguageAlternates("about")).toEqual({
      "en-GB": "/about",
      de: "/de/about",
      "x-default": "/about",
    });
  });
});
