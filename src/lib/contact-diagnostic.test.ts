import { describe, expect, it } from "vitest";

import {
  DIAGNOSTIC_QUESTIONS,
  scoreDiagnostic,
  type DiagnosticAnswers,
} from "./contact-diagnostic";

function answerEveryQuestion(answer: "often" | "sometimes" | "rarely") {
  return Object.fromEntries(
    DIAGNOSTIC_QUESTIONS.map((question) => [question.id, answer]),
  ) as DiagnosticAnswers;
}

describe("scoreDiagnostic", () => {
  it("scores all four dimensions on the same four-point scale", () => {
    const result = scoreDiagnostic(answerEveryQuestion("often"));

    expect(result.dimensions).toHaveLength(4);
    expect(result.dimensions.every(({ score, maximum }) => score === 4 && maximum === 4)).toBe(
      true,
    );
    expect(result.summary).toContain(
      "Leadership dependency: Frequent reported friction (4/4)",
    );
  });

  it("does not invent a dominant pressure point when all answers are rarely", () => {
    const result = scoreDiagnostic(answerEveryQuestion("rarely"));

    expect(result.primaryDimension).toBeNull();
    expect(result.headline).toContain("little friction");
  });

  it("identifies a leadership dependency signal without inflating unrelated scores", () => {
    const answers = answerEveryQuestion("rarely");
    answers["leader-wait"] = "often";
    answers["recurring-rescue"] = "often";
    const result = scoreDiagnostic(answers);

    expect(result.primaryDimension).toBe("leadershipDependency");
    expect(
      result.dimensions.find(({ dimension }) => dimension === "leadershipDependency")?.score,
    ).toBe(4);
    expect(
      result.dimensions.find(({ dimension }) => dimension === "executionFriction")?.score,
    ).toBe(0);
  });
});
