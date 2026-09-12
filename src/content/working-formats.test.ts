import { describe, expect, it } from "vitest";

import { getWorkingFormats } from "./working-formats";

describe("public engagement navigation", () => {
  it("offers the assessment, short advisory and ongoing CPO support in order", () => {
    expect(getWorkingFormats("en").map((format) => format.href)).toEqual([
      "/bottleneck-assessment",
      "/advisory",
      "/fractional-cpo",
    ]);
  });

  it("does not present methods or the free introduction as separate engagements", () => {
    const links = getWorkingFormats("en").map((format) => format.href);

    expect(links).not.toContain("/executive-coaching");
    expect(links).not.toContain("/peer-advisory");
    expect(links).not.toContain("/contact");
    expect(new Set(links).size).toBe(links.length);
  });
});
