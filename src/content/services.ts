export type ServiceDefinition = {
  slug: "advisory" | "fractional-people-leadership" | "executive-coaching";
  eyebrow: string;
  title: string;
  summary: string;
  intro: string;
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
    title: "A difficult people decision still belongs to you.",
    summary:
      "You bring a visible question. I test the reasoning, assumptions and trade-offs without taking the decision away from you.",
    intro:
      "A senior hire, a role that no longer fits or a difficult change may need an outside view. If the issue has appeared before, I also look at what keeps returning it to your agenda.",
    forWhen: [
      "People decisions keep returning to the founder.",
      "A senior hire, restructure or leadership change needs an outside view.",
      "The HR team wants operating context for a difficult people issue.",
      "Growth has exposed unclear ownership or tension in the leadership team.",
    ],
    workIncludes: [
      "Role and organisation questions",
      "People decisions tied to the business plan",
      "Difficult conversations and periods of change",
      "A second opinion on a decision already in motion",
    ],
    boundary:
      "You keep the decision. If you need me to own part of the agenda, that calls for a different remit.",
    evidence: {
      label: "Peer advisory",
      statement:
        "I also work with business leaders through Vistage on decisions they are making now.",
    },
    closing: {
      title: "Bring the decision that keeps returning to the agenda.",
      text: "The first conversation is free. I will tell you if advisory is enough or if the question needs a different kind of work.",
    },
  },
  "fractional-people-leadership": {
    slug: "fractional-people-leadership",
    eyebrow: "Fractional leadership",
    title: "When the work cannot wait for another full-time hire.",
    summary:
      "I join your operating rhythm for an agreed share of the week or month and carry a defined people and organisation remit.",
    intro:
      "This fits a period when the work cannot wait and the permanent structure is still taking shape. I work with the founder, managers and any existing HR team, then hand responsibility to named people as internal capability grows.",
    forWhen: [
      "The founder is still the default owner of hiring, performance and organisation decisions.",
      "An existing HR team needs senior authority and operating support.",
      "Growth or change has created work that cannot wait for a permanent hire.",
      "The business needs someone to build capability without creating long-term dependence.",
    ],
    workIncludes: [
      "Ownership of agreed people and organisation priorities",
      "Role, leadership and operating questions connected to the business plan",
      "Support for managers and the internal HR team",
      "Coordination of internal and external contributors",
      "A deliberate handover to named people inside the company",
    ],
    boundary:
      "You and I agree the decisions I own, the support I need and how responsibility will return to your team.",
    evidence: {
      label: "Fractional HR",
      statement:
        "I have provided fractional HR leadership to Alberta Fire & Security.",
    },
    closing: {
      title: "Which part of the agenda currently has no credible owner?",
      text: "Use the free conversation to describe the work, the team already in place and the decisions that cannot wait.",
    },
  },
  "executive-coaching": {
    slug: "executive-coaching",
    eyebrow: "Individual coaching",
    title: "Make the change you want to see specific.",
    summary:
      "We begin by defining where you are now, what you want to be different and how you will recognise progress.",
    intro:
      "Sessions use current decisions, conversations and reactions from your role. I ask questions, challenge your reasoning and draw on my training in psychology. You decide what to do.",
    forWhen: [
      "Your role has changed and your way of leading has not caught up.",
      "A decision is taking more attention than it should.",
      "The same conversation or team problem keeps returning.",
      "You want challenge from someone who understands operating pressure and will leave the decision with you.",
    ],
    workIncludes: [
      "A specific coaching objective and a clear starting point",
      "Confidential one-to-one sessions",
      "Current situations rather than hypothetical exercises",
      "Agreed experiments between sessions",
      "Agreed signs of progress and regular review",
    ],
    boundary:
      "You keep responsibility for the decision. If the issue needs organisation-wide ownership, coaching is not the right format.",
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
