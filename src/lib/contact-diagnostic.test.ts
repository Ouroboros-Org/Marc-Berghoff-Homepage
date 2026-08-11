import { describe, expect, it } from "vitest";

import {
  DIAGNOSTIC_ITEMS,
  formatDiagnosticSubmission,
  scoreDiagnostic,
  type DiagnosticAnswers,
} from "./contact-diagnostic";

function answersWithScore(targetScore: number): DiagnosticAnswers {
  return Object.fromEntries(
    DIAGNOSTIC_ITEMS.map((item, index) => [
      item.id,
      index < targetScore ? item.constrainedWhen : !item.constrainedWhen,
    ]),
  ) as DiagnosticAnswers;
}

describe("scoreDiagnostic", () => {
  it("renders the ten canonical statements in the specified order", () => {
    expect(DIAGNOSTIC_ITEMS).toHaveLength(10);
    expect(DIAGNOSTIC_ITEMS[0]).toMatchObject({
      statement:
        "Ask your leadership team for the top three priorities and you would get the exact same three.",
      constrainedWhen: false,
    });
    expect(DIAGNOSTIC_ITEMS[6].constrainedWhen).toBe(false);
    expect(DIAGNOSTIC_ITEMS[9].constrainedWhen).toBe(false);
  });

  it("scores items 1, 7 and 10 in the opposite direction", () => {
    const noConstraintAnswers = answersWithScore(0);
    const allConstraintAnswers = answersWithScore(10);

    expect(scoreDiagnostic(noConstraintAnswers)).toEqual({
      score: 0,
      maximum: 10,
      band: "low",
    });
    expect(scoreDiagnostic(allConstraintAnswers)).toEqual({
      score: 10,
      maximum: 10,
      band: "high",
    });

    for (const itemIndex of [0, 6, 9]) {
      const oneReverseSignal = { ...noConstraintAnswers };
      const item = DIAGNOSTIC_ITEMS[itemIndex];
      oneReverseSignal[item.id] = false;
      expect(scoreDiagnostic(oneReverseSignal).score).toBe(1);
    }
  });

  it.each([
    [0, "low"],
    [2, "low"],
    [3, "moderate"],
    [5, "moderate"],
    [6, "high"],
    [10, "high"],
  ] as const)("assigns score %i to the %s band", (score, band) => {
    expect(scoreDiagnostic(answersWithScore(score)).band).toBe(band);
  });

  it("formats the score and every canonical answer for delivery", () => {
    const summary = formatDiagnosticSubmission(answersWithScore(3));

    expect(summary).toContain("Ten-statement bottleneck check: moderate (3/10)");
    expect(summary).toContain(
      "1. Ask your leadership team for the top three priorities and you would get the exact same three. — Not true",
    );
    expect(summary.split("\n")).toHaveLength(12);
  });
});
