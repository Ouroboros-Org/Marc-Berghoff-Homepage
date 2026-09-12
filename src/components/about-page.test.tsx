import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutPageView } from "./about-page";

describe("AboutPageView", () => {
  it("renders the requested English section order and compact start", () => {
    const html = renderToStaticMarkup(<AboutPageView locale="en" />);
    const headings = [
      "The path",
      "Credentials",
      "What I believe about this work",
      "Outside the work",
      "How working together starts",
    ];

    for (const [index, heading] of headings.entries()) {
      expect(html).toContain(heading);
      if (index > 0) {
        expect(html.indexOf(headings[index - 1])).toBeLessThan(
          html.indexOf(heading),
        );
      }
    }

    expect(html).toContain("two months at Nintendo");
    expect(html).toContain("Certified Professional Co-Active Coach");
    expect(html).toContain('href="/services#process"');
    expect(html).toContain('href="/contact#booking"');
    expect(html).not.toContain("What I pay attention to");
    expect(html).not.toContain("What happens after you get in touch");
  });

  it("keeps the personal story and links the verified credentials", () => {
    const html = renderToStaticMarkup(<AboutPageView locale="en" />);

    expect(html).toContain("Medellín");
    expect(html).toContain("homemade chilaquiles");
    expect(html).toContain("fountain pens");
    expect(html).toContain("marc-workshop.webp");
    expect(html).toContain("marc-seated-original.webp");
    expect(html).toContain("3ef5dbc3-30a7-4ae0-b9f1-d5e21d6caded/public_url");
    expect(html).toContain("2e498aea-87f1-4353-b575-679679b12547/public_url");
    expect(html).not.toContain('href="/de/');
    expect(html).not.toContain("icf-member-badge");
  });
});
