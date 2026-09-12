import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ContactBand, PageHero } from "./editorial";

describe("editorial actions", () => {
  it("associates each action with its own helper, including repeated components", () => {
    const html = renderToStaticMarkup(
      <>
        <PageHero
          title="Contact"
          lead="Choose how to start."
          primary={{ href: "/contact#booking", label: "Book a call", helper: "Free introduction" }}
          secondary={{ href: "/self-check", label: "Start self-check", helper: "About two minutes" }}
        />
        <ContactBand title="Talk it through" text="Bring your question." helper="Typically 30 minutes" />
        <ContactBand title="Another conversation" text="Bring your brief." helper="Agree the next step" />
      </>,
    );

    const references = [...html.matchAll(/<a\b[^>]*aria-describedby="([^"]+)"[^>]*>/g)];
    const ids = references.map((match) => match[1]);
    expect(new Set(ids).size).toBe(4);

    const descriptions = ids.map((id) =>
      html.match(new RegExp(`<p[^>]*id="${id}"[^>]*>([^<]+)</p>`))?.[1],
    );
    expect(descriptions).toEqual([
      "Free introduction",
      "About two minutes",
      "Typically 30 minutes",
      "Agree the next step",
    ]);
  });

  it("does not create a dangling description when an action has no helper", () => {
    const html = renderToStaticMarkup(
      <PageHero title="Insights" lead="Read the notes." primary={{ href: "/blog", label: "Read articles" }} />,
    );

    expect(html).toContain('href="/blog"');
    expect(html).not.toContain("aria-describedby");
  });
});
