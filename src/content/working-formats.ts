export type WorkingFormat = {
  id:
    | "executive-coaching"
    | "advisory"
    | "fractional-people-leadership"
    | "bottleneck-assessment"
    | "group-coaching";
  title: string;
  responsibility: string;
  signal: string;
  summary: string;
  href: string;
  meta: string;
  kind: "core" | "supporting";
};

export const CORE_WORKING_FORMATS = [
  {
    id: "executive-coaching",
    title: "Individual coaching",
    responsibility: "You carry the work.",
    signal: "The question belongs with one leader.",
    summary:
      "We define what you want to handle differently, use current situations from your role and agree how progress will be recognised.",
    href: "/executive-coaching",
    meta: "Private one-to-one work",
    kind: "core",
  },
  {
    id: "advisory",
    title: "Strategic people advisory",
    responsibility: "You keep the decision.",
    signal: "The question is visible, but difficult.",
    summary:
      "I bring an outside view to the reasoning, trade-offs and next action without taking the decision away from you.",
    href: "/advisory",
    meta: "Ongoing or time-bound",
    kind: "core",
  },
  {
    id: "fractional-people-leadership",
    title: "Fractional leadership",
    responsibility: "I carry a defined remit.",
    signal: "The work needs a senior owner now.",
    summary:
      "I join the operating rhythm, own agreed priorities and hand responsibility to named people as the permanent answer becomes clearer.",
    href: "/fractional-people-leadership",
    meta: "Defined part-time remit",
    kind: "core",
  },
] as const satisfies readonly WorkingFormat[];

export const SUPPORTING_WORKING_FORMATS = [
  {
    id: "bottleneck-assessment",
    title: "Bottleneck Assessment",
    responsibility: "We need evidence first.",
    signal: "The cause is not clear enough yet.",
    summary:
      "I compare what people report with relevant operating evidence so the leadership team can choose a response without guessing.",
    href: "/bottleneck-assessment",
    meta: "Fixed assessment · €3,500",
    kind: "supporting",
  },
  {
    id: "group-coaching",
    title: "Group coaching",
    responsibility: "Several leaders share the work.",
    signal: "The questions are related and the context is shared.",
    summary:
      "A shared coaching format is in development. The audience, group size, rhythm and fee are still to be decided.",
    href: "/group-coaching",
    meta: "Format in development",
    kind: "supporting",
  },
] as const satisfies readonly WorkingFormat[];

export const WORKING_FORMATS = [
  ...CORE_WORKING_FORMATS,
  ...SUPPORTING_WORKING_FORMATS,
] as const;
