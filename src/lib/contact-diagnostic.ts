export const DIAGNOSTIC_ANSWERS = ["often", "sometimes", "rarely"] as const;
export type DiagnosticAnswer = (typeof DIAGNOSTIC_ANSWERS)[number];

export const DIAGNOSTIC_DIMENSIONS = [
  "leadershipDependency",
  "decisionOwnership",
  "roleClarity",
  "executionFriction",
] as const;

export type DiagnosticDimension = (typeof DIAGNOSTIC_DIMENSIONS)[number];

export const DIMENSION_LABELS: Record<DiagnosticDimension, string> = {
  leadershipDependency: "Leadership dependency",
  decisionOwnership: "Decision ownership",
  roleClarity: "Role clarity",
  executionFriction: "Execution friction",
};

export type DiagnosticQuestion = {
  id: string;
  prompt: string;
  context: string;
  dimensions: DiagnosticDimension[];
};

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "leader-wait",
    prompt: "Important work waits for one or two senior people to step in.",
    context: "Think about approvals, conflict and decisions that teams could reasonably handle.",
    dimensions: ["leadershipDependency"],
  },
  {
    id: "decision-owner",
    prompt: "Cross-team decisions stall because ownership is unclear.",
    context: "Consider who has the final say when priorities or functions compete.",
    dimensions: ["decisionOwnership"],
  },
  {
    id: "role-boundaries",
    prompt: "People step on each other’s work, or important tasks fall between roles.",
    context: "Think about a busy week. The organisation chart may tell a different story.",
    dimensions: ["roleClarity"],
  },
  {
    id: "handoffs",
    prompt: "Work loses momentum when it moves between people or teams.",
    context: "Look for repeated follow-ups, rework and unclear handovers.",
    dimensions: ["executionFriction"],
  },
  {
    id: "recurring-rescue",
    prompt: "Leaders repeatedly rescue issues that should be resolved elsewhere.",
    context: "Think of problems that return even after they appear to be fixed.",
    dimensions: ["leadershipDependency", "roleClarity"],
  },
  {
    id: "decisions-revisited",
    prompt: "Decisions are revisited because the owner, reasoning or next step was not clear.",
    context: "Include decisions that were agreed in a meeting but did not translate into action.",
    dimensions: ["decisionOwnership", "executionFriction"],
  },
];

export type DiagnosticAnswers = Record<string, DiagnosticAnswer>;

export type DimensionResult = {
  dimension: DiagnosticDimension;
  label: string;
  score: number;
  maximum: number;
  signal:
    | "Little reported friction"
    | "Some reported friction"
    | "Frequent reported friction";
};

export type DiagnosticResult = {
  dimensions: DimensionResult[];
  primaryDimension: DiagnosticDimension | null;
  headline: string;
  summary: string;
};

const ANSWER_SCORE: Record<DiagnosticAnswer, number> = {
  often: 2,
  sometimes: 1,
  rarely: 0,
};

function signalFor(score: number): DimensionResult["signal"] {
  if (score >= 3) return "Frequent reported friction";
  if (score >= 2) return "Some reported friction";
  return "Little reported friction";
}

export function scoreDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  const scores: Record<DiagnosticDimension, number> = {
    leadershipDependency: 0,
    decisionOwnership: 0,
    roleClarity: 0,
    executionFriction: 0,
  };
  const maxima: Record<DiagnosticDimension, number> = {
    leadershipDependency: 0,
    decisionOwnership: 0,
    roleClarity: 0,
    executionFriction: 0,
  };

  for (const question of DIAGNOSTIC_QUESTIONS) {
    const answer = answers[question.id];

    for (const dimension of question.dimensions) {
      maxima[dimension] += 2;
      if (answer) scores[dimension] += ANSWER_SCORE[answer];
    }
  }

  const dimensions = DIAGNOSTIC_DIMENSIONS.map((dimension) => ({
    dimension,
    label: DIMENSION_LABELS[dimension],
    score: scores[dimension],
    maximum: maxima[dimension],
    signal: signalFor(scores[dimension]),
  }));

  const highestScore = Math.max(...dimensions.map(({ score }) => score));
  const highestDimensions = dimensions.filter(({ score }) => score === highestScore);
  const primaryDimension =
    highestScore === 0 || highestDimensions.length !== 1
      ? null
      : highestDimensions[0]?.dimension ?? null;

  const headline = primaryDimension
    ? `${DIMENSION_LABELS[primaryDimension]} appears most often in these answers.`
    : highestScore === 0
      ? "These answers report little friction across the four areas."
      : "Several areas appear equally often in these answers.";

  const dimensionSummary = dimensions
    .map(({ label, score, maximum, signal }) => `${label}: ${signal} (${score}/${maximum})`)
    .join("; ");

  return {
    dimensions,
    primaryDimension,
    headline,
    summary: `Six-question bottleneck check: ${dimensionSummary}.`,
  };
}
