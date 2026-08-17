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
    expect(html).toContain("Co-Active trained");
    expect(html).toContain('href="/services#process"');
    expect(html).toContain('href="/contact#booking"');
    expect(html).not.toContain("What I pay attention to");
    expect(html).not.toContain("What happens after you get in touch");
  });

  it("keeps the same structure and booking route in German", () => {
    const html = renderToStaticMarkup(<AboutPageView locale="de" />);

    expect(html).toContain("Mein Weg");
    expect(html).toContain("Qualifikationen");
    expect(html).toContain("Außerhalb der Arbeit");
    expect(html).toContain("zwei Monate bei Nintendo");
    expect(html).toContain("Co-Active-Training");
    expect(html).toContain('href="/de/services#process"');
    expect(html).toContain('href="/de/contact#booking"');
  });
});
