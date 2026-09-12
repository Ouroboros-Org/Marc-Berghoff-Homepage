import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";

import { describe, expect, it } from "vitest";

import { CASE_STUDIES, FEATURED_CASE, getCaseStudy, TESTIMONIALS } from "@/content/proof";
import { CaseStudyPageView } from "./case-study-page";
import { ResultsPageView } from "./results-page";

const repositoryRoot = process.cwd();
const resultsPath = resolve(repositoryRoot, "src/components/results-page.tsx");
const resultsSource = readFileSync(resultsPath, "utf8");

const engagementIds = [
  "scaleup-leadership-coaching",
  "financial-regulator-coaching",
  "igaming-executives-workshops",
  "financial-services-sourcing",
  "security-group-hr-leadership",
  "dubai-ceo-owner-mediation",
  "web3-web2-pivot",
  "small-business-owner-chairing",
] as const;

const speakingIds = [
  "fhrd-keynote",
  "undergraduate-lecturer",
  "vistage-chair",
] as const;

function collectProductionSource(directory: string): string {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectProductionSource(path);
      }

      if (!/\.(?:ts|tsx)$/.test(entry.name) || entry.name.includes(".test.")) {
        return [];
      }

      return [readFileSync(path, "utf8")];
    })
    .join("\n");
}

const productionSource = collectProductionSource(
  resolve(repositoryRoot, "src"),
);

describe("results and sample-report content contract", () => {
  it("keeps the established English engagement and speaking order", () => {
    const renderedIds = [...resultsSource.matchAll(/id: "([^"]+)"/g)].map(
      (match) => match[1],
    );
    const localeIds = [...engagementIds, ...speakingIds];

    expect(renderedIds).toEqual(localeIds);
    expect(resultsSource).toContain(
      "Some clients can be named. Others are described accurately",
    );
    expect(resultsSource).toContain("Named organisations.");
  });

  it("keeps the requested organisation marks and local files", () => {
    const logoBlock = resultsSource.slice(
      resultsSource.indexOf("const clientLogos"),
      resultsSource.indexOf("] as const;") + 11,
    );
    const logoNames = [...logoBlock.matchAll(/name: "([^"]+)"/g)].map(
      (match) => match[1],
    );

    expect(logoNames).toEqual([
      "Klarsolar",
      "Giftagoods",
      "CyberKongz",
      "Alberta Fire & Security",
      "Vistage",
    ]);

    for (const asset of [
      "klarsolar.webp",
      "giftagoods.webp",
      "cyberkongz.svg",
      "alberta.svg",
      "vistage.svg",
    ]) {
      expect(
        existsSync(resolve(repositoryRoot, "public/images/clients", asset)),
      ).toBe(true);
    }
  });

  it("keeps CyberKongz in public code only as one logo and excludes Arringo", () => {
    expect(productionSource.match(/CyberKongz/g)).toHaveLength(1);
    expect(productionSource).not.toContain("Arringo");
  });

  it("keeps public Web3 wording on Results only", () => {
    expect(resultsSource).toContain("Web3 business");
    expect(productionSource.replace(resultsSource, "")).not.toMatch(/Web3/i);
  });

  it("keeps the established CTA routes", () => {
    expect(resultsSource).toContain("getPrimaryContactAction(locale)");
    expect(resultsSource).toContain('getRouteHref("services", locale)');
  });

  it("uses the established English Vistage wording", () => {
    const about = readFileSync(
      resolve(repositoryRoot, "src/components/about-page.tsx"),
      "utf8",
    );
    const peerAdvisory = readFileSync(
      resolve(repositoryRoot, "src/components/service-pages/peer-advisory-page.tsx"),
      "utf8",
    );

    expect(resultsSource).toContain(
      "I chair a peer advisory group of business owners in Malta.",
    );
    expect(about).toContain(
      "I chair a peer advisory group of business owners in Malta",
    );
    expect(peerAdvisory).toContain(
      "I chair a Vistage peer advisory group of business owners in Malta.",
    );
  });

  it("links the featured case and preserves the shared testimonial attribution", () => {
    const html = renderToStaticMarkup(<ResultsPageView locale="en" />);
    expect(html).toContain('href="/results/klarsolar"');
    expect(html).toContain("Head of HR, Klarsolar");
    expect(html).toContain("Chris Mercieca, Giftagoods");
    expect(html).not.toContain('href="/de/');
  });

  it("renders the selected case with units and attribution, without invented sample evidence", () => {
    const caseStudy = getCaseStudy(FEATURED_CASE.slug);
    expect(caseStudy).toBeDefined();
    expect(CASE_STUDIES.map(({ slug }) => slug)).toEqual(["klarsolar"]);
    expect(getCaseStudy("wayline")).toBeUndefined();
    const html = renderToStaticMarkup(<CaseStudyPageView caseStudy={caseStudy!} />);
    expect(html).toContain("35 → 150");
    expect(html).toContain("six months");
    expect(html).toContain("two years");
    expect(html).toContain("wider work of the company");
    expect(html).toContain(TESTIMONIALS[0].attribution);
    expect(html).not.toMatch(/Wayline|fictional|coming soon/i);
    expect(html).not.toContain("marc-workshop");
  });

  it("removes old first-deployment routes without redirects or stale links", () => {
    const nextConfig = readFileSync(
      resolve(repositoryRoot, "next.config.ts"),
      "utf8",
    );

    expect(
      existsSync(
        resolve(repositoryRoot, "src/app/(en)/sample-report/page.tsx"),
      ),
    ).toBe(false);
    expect(nextConfig).not.toContain("/sample-report");
    expect(productionSource).not.toMatch(/href\s*=\s*["']\/sample-report/);
    expect(productionSource).not.toContain('href: "/sample-report"');
    expect(
      existsSync(
        resolve(repositoryRoot, "src/app/(en)/contact/message/page.tsx"),
      ),
    ).toBe(false);
    expect(nextConfig).not.toContain("/contact/message");
    expect(productionSource).not.toContain("/contact/message");
  });

  it("retains the report questions and confidentiality boundaries", () => {
    const assessment = readFileSync(
      resolve(
        repositoryRoot,
        "src/components/service-pages/bottleneck-assessment-page.tsx",
      ),
      "utf8",
    );

    for (const requiredText of [
      "What organisational bottleneck best explains the business issue?",
      "Which recurring observations and decision patterns support the finding?",
      "Where does the bottleneck consume leadership attention or slow important work?",
      "Which decisions and first steps will the leadership team agree after discussing it?",
      "Individual comments are aggregated or paraphrased.",
      "The material stays separate from employee performance files.",
      "Clinical and medical diagnosis sits outside the scope.",
      "The company, figures and findings are fictional.",
    ]) {
      expect(assessment).toContain(requiredText);
    }
  });
});
