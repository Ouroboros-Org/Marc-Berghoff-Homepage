import {
  existsSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repositoryRoot = process.cwd();
const resultsPath = resolve(repositoryRoot, "src/components/results-page.tsx");
const resultsSource = readFileSync(resultsPath, "utf8");

const engagementIds = [
  "scaleup-leadership-coaching",
  "financial-regulator-coaching",
  "igaming-executives-workshops",
  "financial-services-sourcing",
  "solar-scaleup-head-of-hr",
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
  it("keeps both locales in the requested institutional order", () => {
    const renderedIds = [...resultsSource.matchAll(/id: "([^"]+)"/g)].map(
      (match) => match[1],
    );
    const localeIds = [...engagementIds, ...speakingIds];

    expect(renderedIds).toEqual([...localeIds, ...localeIds]);
    expect(resultsSource).toContain(
      "Some of these clients can be named. Several can't, so they're described instead",
    );
    expect(resultsSource).toContain("Named organisations.");
    expect(resultsSource).toContain("Organisationen, die ich nennen kann.");
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

  it("keeps the established localized CTA routes", () => {
    expect(resultsSource).toContain("getPrimaryContactAction(locale)");
    expect(resultsSource).toContain('getRouteHref("services", locale)');
  });

  it("uses current Vistage wording in both locales", () => {
    const aboutEnglish = readFileSync(
      resolve(repositoryRoot, "src/app/(en)/about/page.tsx"),
      "utf8",
    );
    const aboutGerman = readFileSync(
      resolve(repositoryRoot, "src/app/de/about/page.tsx"),
      "utf8",
    );
    const peerAdvisory = readFileSync(
      resolve(repositoryRoot, "src/components/service-pages/peer-advisory-page.tsx"),
      "utf8",
    );

    expect(resultsSource).toContain(
      "I chair a peer advisory group of business owners in Malta.",
    );
    expect(aboutEnglish).toContain(
      "I chair a Vistage peer advisory group of business owners in Malta.",
    );
    expect(peerAdvisory).toContain(
      "I chair a Vistage peer advisory group of business owners in Malta.",
    );
    expect(aboutGerman).toContain(
      "Ich leite in Malta eine Vistage Peer-Advisory-Gruppe für Unternehmensinhaber.",
    );
    expect(peerAdvisory).toContain(
      "Ich leite in Malta eine Vistage Peer-Advisory-Gruppe für Unternehmensinhaber.",
    );
  });

  it("removes the old route without a redirect or stale link", () => {
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
