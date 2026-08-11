import { describe, expect, it } from "vitest";

import { getWorkingFormats } from "./working-formats";

const expectedIds = [
  "bottleneck-assessment",
  "executive-coaching",
  "advisory",
  "peer-advisory",
  "fractional-people-leadership",
];

describe("working formats", () => {
  it.each(["en", "de"] as const)(
    "keeps the assessment-first order in %s",
    (locale) => {
      expect(getWorkingFormats(locale).map((format) => format.id)).toEqual(
        expectedIds,
      );
    },
  );

  it("keeps German service links inside the German locale", () => {
    expect(
      getWorkingFormats("de").every((format) => format.href.startsWith("/de/")),
    ).toBe(true);
  });
});
