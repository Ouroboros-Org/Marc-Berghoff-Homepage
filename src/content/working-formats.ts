export type WorkingFormat = {
  id:
    | "bottleneck-assessment"
    | "executive-coaching"
    | "advisory"
    | "peer-advisory"
    | "fractional-people-leadership";
  title: string;
  responsibility: string;
  signal: string;
  summary: string;
  href: string;
  meta: string;
  kind: "core";
};

export const WORKING_FORMATS = [
  {
    id: "bottleneck-assessment",
    title: "Bottleneck Assessment",
    responsibility: "The cause isn't clear enough yet.",
    signal: "We get evidence first.",
    summary: "The cause isn't clear enough yet. We get evidence first.",
    href: "/bottleneck-assessment",
    meta: "Focused diagnostic",
    kind: "core",
  },
  {
    id: "executive-coaching",
    title: "Executive Coaching",
    responsibility: "You carry the work.",
    signal: "Individually or as a group.",
    summary: "You carry the work. Individually or as a group.",
    href: "/executive-coaching",
    meta: "Individual or group",
    kind: "core",
  },
  {
    id: "advisory",
    title: "Strategic People Advisory",
    responsibility: "You keep the decision.",
    signal: "The question is visible, but difficult.",
    summary: "You keep the decision. The question is visible, but difficult.",
    href: "/advisory",
    meta: "Ongoing or time-bound",
    kind: "core",
  },
  {
    id: "peer-advisory",
    title: "Peer Advisory",
    responsibility: "A room of leaders who don't report to each other,",
    signal: "working on the decisions each of them is facing.",
    summary:
      "A room of leaders who don't report to each other, working on the decisions each of them is facing.",
    href: "/peer-advisory",
    meta: "Confidential peer room",
    kind: "core",
  },
  {
    id: "fractional-people-leadership",
    title: "Fractional People Leadership",
    responsibility: "I carry a defined remit.",
    signal: "The work needs a senior owner now.",
    summary: "I carry a defined remit. The work needs a senior owner now.",
    href: "/fractional-people-leadership",
    meta: "Defined part-time remit",
    kind: "core",
  },
] as const satisfies readonly WorkingFormat[];

/** @deprecated Use WORKING_FORMATS. All five services now share one list. */
export const CORE_WORKING_FORMATS = WORKING_FORMATS;

/** @deprecated The supporting-service split no longer exists. */
export const SUPPORTING_WORKING_FORMATS = [] as const;
