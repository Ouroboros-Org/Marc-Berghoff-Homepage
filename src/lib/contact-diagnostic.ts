export const DIAGNOSTIC_ITEMS = [
  {
    id: "shared-priorities",
    statement:
      "Ask your leadership team for the top three priorities and you would get the exact same three.",
    constrainedWhen: false,
  },
  {
    id: "repeated-decision",
    statement:
      "The same decision reaches you for the third time, and you have to make it again.",
    constrainedWhen: true,
  },
  {
    id: "unneeded-permission",
    statement: "People ask you for permission they already have in your opinion.",
    constrainedWhen: true,
  },
  {
    id: "whole-picture",
    statement:
      "You are the only one who sees the whole picture, despite having hired good people.",
    constrainedWhen: true,
  },
  {
    id: "different-problems",
    statement:
      "Three people describe the same problem and you get three different problems.",
    constrainedWhen: true,
  },
  {
    id: "chasing-actions",
    statement:
      "Meetings end in agreement, and you still have to chase the action points.",
    constrainedWhen: true,
  },
  {
    id: "review-not-needed",
    statement:
      "Important work goes out the door without you needing to review it first.",
    constrainedWhen: false,
  },
  {
    id: "more-on-plate",
    statement:
      "You hired someone to take work off your plate, and somehow you have more on it now.",
    constrainedWhen: true,
  },
  {
    id: "overdue-conversation",
    statement:
      "You already know which conversation you should have had three months ago.",
    constrainedWhen: true,
  },
  {
    id: "company-keeps-pace",
    statement:
      "You can easily leave the company, knowing that everything will stay up to speed.",
    constrainedWhen: false,
  },
] as const;

export const DIAGNOSTIC_ITEM_IDS = DIAGNOSTIC_ITEMS.map(({ id }) => id) as [
  (typeof DIAGNOSTIC_ITEMS)[number]["id"],
  ...(typeof DIAGNOSTIC_ITEMS)[number]["id"][],
];

export type DiagnosticItemId = (typeof DIAGNOSTIC_ITEMS)[number]["id"];
export type DiagnosticAnswer = boolean;
export type DiagnosticAnswers = Record<DiagnosticItemId, DiagnosticAnswer>;
export type DiagnosticBand = "low" | "moderate" | "high";

export type DiagnosticResult = {
  score: number;
  maximum: 10;
  band: DiagnosticBand;
};

export function diagnosticBandForScore(score: number): DiagnosticBand {
  if (score <= 2) return "low";
  if (score <= 5) return "moderate";
  return "high";
}

export function scoreDiagnostic(answers: DiagnosticAnswers): DiagnosticResult {
  const score = DIAGNOSTIC_ITEMS.reduce(
    (total, item) => total + (answers[item.id] === item.constrainedWhen ? 1 : 0),
    0,
  );

  return {
    score,
    maximum: 10,
    band: diagnosticBandForScore(score),
  };
}

export function formatDiagnosticSubmission(answers: DiagnosticAnswers): string {
  const result = scoreDiagnostic(answers);
  const responseLines = DIAGNOSTIC_ITEMS.map(
    (item, index) =>
      `${index + 1}. ${item.statement} — ${answers[item.id] ? "True" : "Not true"}`,
  );

  return [
    `Ten-statement bottleneck check: ${result.band} (${result.score}/${result.maximum})`,
    "",
    ...responseLines,
  ].join("\n");
}
