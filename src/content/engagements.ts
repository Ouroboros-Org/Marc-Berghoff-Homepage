export type EngagementId = "assessment" | "advisory" | "fractional-cpo";

export type Engagement = {
  id: EngagementId;
  number: string;
  title: string;
  shortTitle: string;
  href: string;
  situation: string;
  summary: string;
  rhythm: string;
  receives: readonly string[];
  readiness: string;
  boundary: string;
  nextStep: string;
  featured: boolean;
};

export const ENGAGEMENTS: readonly Engagement[] = [
  {
    id: "assessment",
    number: "01",
    title: "Bottleneck Assessment with Review",
    shortTitle: "Find the bottleneck",
    href: "/bottleneck-assessment",
    situation: "You need to understand the underlying problem.",
    summary: "An outside view of what is slowing the company down, grounded in your team's experience.",
    rhythm: "Typically 2–3 weeks",
    receives: ["Team interviews and a questionnaire", "A written report and leadership review", "Clear priorities for what happens next"],
    readiness: "Access to the leadership team and a willingness to examine what is happening.",
    boundary: "We finish with findings and priorities you can act on, independently or with further support.",
    nextStep: "Discuss the assessment",
    featured: false,
  },
  {
    id: "advisory",
    number: "02",
    title: "Strategic People Advisory",
    shortTitle: "Shape the response",
    href: "/advisory",
    situation: "You know the issue and want to decide how to address it.",
    summary: "A focused engagement to work through a people or organisation decision and turn it into a practical way forward.",
    rhythm: "A starting point: 2–6 weeks",
    receives: ["Focused advice on the decision in front of you", "Working sessions with the people involved", "Agreed priorities and a practical plan"],
    readiness: "A question to work on and someone inside the business who can carry the decision forward.",
    boundary: "You keep ownership. We agree the question, outputs and review point together; one session or a longer series may fit better.",
    nextStep: "Talk through the decision",
    featured: false,
  },
  {
    id: "fractional-cpo",
    number: "03",
    title: "Fractional CPO",
    shortTitle: "Build lasting capacity",
    href: "/fractional-cpo",
    situation: "You need sustained strategic people leadership as the company grows.",
    summary: "Senior support for your people, leadership and organisation, with a level of involvement that fits the business.",
    rhythm: "Often 1–2 days a week",
    receives: ["A people strategy connected to your business", "Leadership and organisational development", "An agreed remit, review rhythm and handover"],
    readiness: "Leadership access, clear decision rights and operational support for day-to-day HR work.",
    boundary: "I can carry an embedded Chief People Officer remit or advise your team over time. We agree responsibility, pace and duration together.",
    nextStep: "Explore ongoing support",
    featured: true,
  },
];

export const ENGAGEMENT_SCOPE_NOTE =
  "These are typical starting points, not fixed packages. There is no minimum or maximum term. We agree the scope, pace and level of involvement in a free introductory conversation.";
