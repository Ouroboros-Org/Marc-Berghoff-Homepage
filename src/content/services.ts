export type ServiceStep = {
  title: string;
  description: string;
};

export type ServiceDefinition = {
  slug: "advisory" | "fractional-people-leadership" | "executive-coaching";
  eyebrow: string;
  title: string;
  summary: string;
  intro: string;
  forWhen: string[];
  workIncludes: string[];
  approach: ServiceStep[];
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
    title: "A second view on the people decision in front of you.",
    summary:
      "Ongoing advice for founders and leadership teams facing a consequential hire, role change or organisational choice.",
    intro:
      "Advisory gives you an independent place to test decisions before you act. We stay close to what is due now. When the same issue keeps appearing, we examine the condition behind it as well.",
    forWhen: [
      "People decisions keep returning to the founder.",
      "A senior hire, restructure or leadership change needs an outside view.",
      "The HR team wants commercial context for a difficult people issue.",
      "Growth has exposed unclear ownership or tension in the leadership team.",
    ],
    workIncludes: [
      "Role and organisation questions",
      "People decisions tied to the business plan",
      "Difficult conversations and periods of change",
      "A second opinion on a decision already in motion",
    ],
    approach: [
      {
        title: "Put the decision in context",
        description:
          "We establish what is due, who is affected, what the business needs and what you have tried already.",
      },
      {
        title: "Test the options",
        description:
          "We examine the assumptions and trade-offs around the choice. Some questions need preparation or follow-up outside the session.",
      },
      {
        title: "Close with ownership",
        description:
          "The session ends with a decision, a named owner or a specific piece of work still needed. Your team remains accountable for the outcome.",
      },
    ],
    evidence: {
      label: "Peer advisory",
      statement:
        "Marc also works with business leaders through Vistage, testing current decisions in a confidential peer setting.",
    },
    closing: {
      title: "Which decision keeps coming back?",
      text: "Bring that decision to the free first conversation. Marc will tell you whether an advisory relationship would help.",
    },
  },
  "fractional-people-leadership": {
    slug: "fractional-people-leadership",
    eyebrow: "Fractional people leadership",
    title: "Senior people leadership while you build the permanent function.",
    summary:
      "Part-time, hands-on ownership for companies that need senior people leadership before a permanent hire makes sense.",
    intro:
      "In a fractional remit, I work inside the company's operating rhythm and own an agreed set of priorities. I work with the founder, managers and any existing HR team. As internal capability grows, the remit changes with it.",
    forWhen: [
      "The people agenda needs an owner, while a full-time executive hire would be premature.",
      "The business is growing faster than its management practices or people systems.",
      "An internal HR team needs senior support on difficult decisions.",
      "A period of change needs senior, hands-on leadership for a defined time.",
    ],
    workIncludes: [
      "Ownership of agreed people priorities",
      "Building or repairing the people function",
      "Support for managers and the internal HR team",
      "Coordination with internal and external contributors",
      "A planned handover to people inside the company",
    ],
    approach: [
      {
        title: "Set the remit",
        description:
          "Before I join the day-to-day rhythm, we define the priorities, decision rights and working cadence.",
      },
      {
        title: "Own the priority",
        description:
          "The first work goes to the issue causing the most drag. Routine process work follows only where the business needs it now.",
      },
      {
        title: "Hand over deliberately",
        description:
          "Responsibilities and routines move to named people inside the company as the engagement changes or ends.",
      },
    ],
    evidence: {
      label: "Fractional HR",
      statement:
        "Marc has provided fractional HR leadership to Alberta Fire & Security.",
    },
    closing: {
      title: "Is the founder still carrying the people agenda?",
      text: "Share the current priorities and the team already in place. Marc will give you a direct view on whether a fractional remit fits.",
    },
  },
  "executive-coaching": {
    slug: "executive-coaching",
    eyebrow: "Executive coaching",
    title: "Executive coaching for the decision only you can make.",
    summary:
      "Confidential one-to-one coaching for founders and senior leaders who want to change how they handle a live situation.",
    intro:
      "Coaching creates room to examine what is happening and the assumptions behind your response. I ask questions, challenge the reasoning and draw on my MSc training in psychology. You decide what to do.",
    forWhen: [
      "Your role has changed, and your way of leading has not caught up yet.",
      "A high-stakes decision is consuming too much attention.",
      "The same team or communication problem keeps returning.",
      "You want independent challenge from someone who understands operating pressure.",
    ],
    workIncludes: [
      "A specific coaching objective and working agreement",
      "Confidential one-to-one sessions",
      "Close examination of live leadership situations",
      "Agreed experiments between sessions",
      "Regular review of progress and relevance",
      "A direct, psychologically informed coaching style",
    ],
    approach: [
      {
        title: "Define the question",
        description:
          "We agree what you want to change and what you expect to be doing differently.",
      },
      {
        title: "Use current situations",
        description:
          "The material comes from decisions, conversations and reactions in your role now.",
      },
      {
        title: "Review the evidence",
        description:
          "We look at what changed in your choices and behaviour. If the question moves, we revise the agreement.",
      },
    ],
    evidence: {
      label: "Coaching practice",
      statement:
        "Marc is an ICF-credentialed Associate Certified Coach (ACC). He has completed more than 350 coaching hours and also works in Vistage peer advisory.",
    },
    closing: {
      title: "Bring the situation you cannot discuss inside the business.",
      text: "The free first conversation covers fit, confidentiality and the question you want to work on.",
    },
  },
};

export const SERVICE_LIST = Object.values(SERVICES);
