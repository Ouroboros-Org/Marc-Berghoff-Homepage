import { describe, expect, it } from "vitest";
import { getRouteHref, getRouteId, ROUTES, SITE_LOCALES } from "./routes";

describe("English launch routes", () => {
  it("resolves public routes and preserves contact anchors", () => {
    for (const [id, path] of Object.entries(ROUTES)) {
      expect(getRouteId(path)).toBe(id);
    }
    expect(getRouteHref("contact", "en", "#booking")).toBe("/contact#booking");
    expect(getRouteHref("selfCheck", "en", "#self-check")).toBe("/self-check#self-check");
    expect(SITE_LOCALES).toEqual(["en"]);
  });
  it("does not expose retired language or service routes", () => {
    for (const path of ["/de", "/de/about", "/executive-coaching", "/peer-advisory", "/fractional-people-leadership"]) {
      expect(getRouteId(path)).toBeNull();
    }
    expect(getRouteId("/fractional-cpo")).toBe("fractionalCpo");
  });
});
