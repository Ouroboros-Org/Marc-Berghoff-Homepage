export type ServiceDefinition = {
  slug: "advisory" | "fractional-people-leadership" | "executive-coaching";
  eyebrow: string;
  title: string;
  summary: string;
  introductionHeading: string;
  intro: string;
  scopeHeading: string;
  scopeIntro: string;
  forWhen: string[];
  workIncludes: string[];
  boundary?: string;
  evidence?: {
    label: string;
    statement: string;
  };
  closing: {
    title: string;
    text: string;
  };
};

export const SERVICES: Record<ServiceDefinition["slug"], ServiceDefinition> = {
  advisory: {
    slug: "advisory",
    eyebrow: "Strategic people advisory",
    title: "The decision is yours. It does not have to be made alone.",
    summary:
      "You bring a visible people, role or organisation question. I test the reasoning, assumptions and trade-offs while the decision stays with you.",
    introductionHeading:
      "I advise when the question is clear enough to examine.",
    intro:
      "A senior hire, a role that no longer fits or a difficult change may need a candid outside view. I look at the decision in front of you and the conditions that keep returning it to the agenda.",
    scopeHeading: "The decision sets the advisory brief.",
    scopeIntro:
      "These are common areas of work. The proposal records the question, who keeps the decision and where my advice stops.",
    forWhen: [
      "A people or organisation decision keeps returning to the founder.",
      "A senior hire, restructure or leadership change needs an outside view.",
      "The internal people team wants operating context for a difficult question.",
      "The leadership team can name the issue but has not found a sound next move.",
    ],
    workIncludes: [
      "Role and organisation questions",
      "People decisions tied to the business plan",
      "Difficult conversations and periods of change",
      "A candid second view on a decision already in motion",
    ],
    boundary:
      "You keep the decision. If the work needs someone to coordinate execution or hold decision rights, advisory is too light.",
    evidence: {
      label: "Peer advisory",
      statement:
        "I also work with business leaders through Vistage on decisions they are making now.",
    },
    closing: {
      title: "Bring the decision that is not moving.",
      text: "The first conversation is free. I will tell you if an outside view is enough or if the issue needs evidence, coaching or defined ownership.",
    },
  },
  "fractional-people-leadership": {
    slug: "fractional-people-leadership",
    eyebrow: "Fractional People Leadership",
    title: "When the work needs an owner before the permanent answer is clear.",
    summary:
      "I join the operating rhythm for an agreed share of the week or month and carry a defined people, organisation or leadership remit.",
    introductionHeading:
      "I step in when advice would leave the work unowned.",
    intro:
      "This fits a period when the work cannot wait and the permanent structure is still taking shape. I work with the founder, managers and any internal people team, then hand responsibility to named people as the business becomes ready to carry it.",
    scopeHeading: "Responsibility needs clear edges.",
    scopeIntro:
      "The proposal records the remit, my decision rights, the operating rhythm and the handover from the beginning.",
    forWhen: [
      "The founder is still the default owner of hiring, performance and organisation decisions.",
      "An existing people team needs senior authority and operating support.",
      "Growth or change has created work that cannot wait for a permanent hire.",
      "The business needs the work carried now and handed over deliberately later.",
    ],
    workIncludes: [
      "Ownership of agreed people and organisation priorities",
      "Role, leadership and operating questions connected to the business plan",
      "Support for managers and the internal people team",
      "Coordination of internal and external contributors",
      "A deliberate handover to named people inside the company",
    ],
    boundary:
      "You and I agree the decisions I own, the support I need and how responsibility will return to your team.",
    evidence: {
      label: "People leadership",
      statement:
        "I have provided interim HR leadership to Alberta Fire & Security.",
    },
    closing: {
      title: "Which part of the work currently has no credible owner?",
      text: "Use the free conversation to describe the work, the team already in place and the decisions that cannot wait.",
    },
  },
  "executive-coaching": {
    slug: "executive-coaching",
    eyebrow: "Executive Coaching",
    title: "Make the change you want to see specific.",
    summary: "You carry the work. Individually or as a group.",
    introductionHeading: "Coaching fits when the work belongs with you.",
    intro:
      "We make the gap between the current situation and the intended one concrete. In individual work, you bring current decisions, conversations and reactions from your role. With a leadership group, we work on a shared question while each person keeps responsibility for their part. I ask questions, challenge the reasoning and draw on my training in psychology. You decide what to do next.",
    scopeHeading: "The gap makes the work measurable.",
    scopeIntro:
      "We agree the starting point, the change you want and the signs that would show it is happening. The route is tailored to the leader or group and the situations they bring.",
    forWhen: [
      "Your role has changed and your way of leading has not caught up.",
      "A decision is taking more attention than it should.",
      "The same conversation or team problem keeps returning.",
      "You want challenge from someone who understands operating pressure and leaves the decision with you.",
    ],
    workIncludes: [
      "A specific coaching objective and a clear starting point",
      "Confidential individual sessions or a shared group format",
      "Current situations from your role",
      "Agreed experiments between sessions",
      "Agreed signs of progress and regular review",
    ],
    boundary:
      "You keep responsibility for the decision. If the issue needs wider evidence or organisation-level ownership, we stop and set a different brief.",
    evidence: {
      label: "Coaching practice",
      statement:
        "I hold the ICF Associate Certified Coach credential and have completed more than 350 coaching hours.",
    },
    closing: {
      title: "Bring a situation that needs space to think.",
      text: "In the free first conversation, we can set the question, discuss confidentiality and decide if coaching is the right boundary.",
    },
  },
};

export const SERVICE_LIST = Object.values(SERVICES);
