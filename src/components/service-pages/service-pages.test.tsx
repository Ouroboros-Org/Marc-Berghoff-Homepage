import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AdvisoryPageView } from "./advisory-page";
import { BottleneckAssessmentPageView } from "./bottleneck-assessment-page";
import { FractionalPeopleLeadershipPageView } from "./fractional-people-leadership-page";
import { ServicesLanding } from "./services-landing";

function structuredData(html: string) {
  return Array.from(
    html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
    (match) => JSON.parse(match[1]),
  );
}

describe("service journeys", () => {
  it("publishes only the three canonical engagements in the service catalogue", () => {
    const html = renderToStaticMarkup(<ServicesLanding locale="en" />);
    const catalogue = structuredData(html).find((item) => item["@type"] === "ItemList");

    expect(
      catalogue.itemListElement.map((entry: { item: { url: string } }) =>
        new URL(entry.item.url).pathname,
      ),
    ).toEqual(["/bottleneck-assessment", "/advisory", "/fractional-cpo"]);
    expect(html).not.toContain('href="/executive-coaching"');
    expect(html).not.toContain('href="/peer-advisory"');
    expect(html).toContain('href="/contact#booking"');
  });

  it.each([
    [AdvisoryPageView, "/advisory"],
    [BottleneckAssessmentPageView, "/bottleneck-assessment"],
    [FractionalPeopleLeadershipPageView, "/fractional-cpo"],
  ] as const)("gives a detail page its canonical service URL", (Page, path) => {
    const html = renderToStaticMarkup(<Page locale="en" />);
    const service = structuredData(html).find((item) => item["@type"] === "Service");

    expect(new URL(service.url).pathname).toBe(path);
    expect(service.inLanguage).toBe("en-GB");
    expect(html).toContain('href="/contact#booking"');
  });

  it("links directly to a single self-check and a separate full assessment", () => {
    const services = renderToStaticMarkup(<ServicesLanding locale="en" />);
    const assessment = renderToStaticMarkup(<BottleneckAssessmentPageView locale="en" />);

    expect(services).toContain('href="/bottleneck-assessment#bottleneck-check"');
    expect(assessment.match(/id="bottleneck-check"/g)).toHaveLength(1);
    expect(assessment).toContain('href="#bottleneck-check"');
    expect(assessment).toContain('href="#full-assessment"');
    expect(assessment).toContain('id="full-assessment"');
    expect(assessment.indexOf('id="bottleneck-check"')).toBeLessThan(
      assessment.indexOf('id="full-assessment"'),
    );
  });
});
