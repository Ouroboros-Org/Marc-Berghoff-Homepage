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
    summary: "Understand what is slowing your company down, with an outside view grounded in your team's experience.",
    rhythm: "Typically 2–3 weeks",
    receives: ["Team interviews and a questionnaire", "A written report and leadership review", "Clear priorities for what happens next"],
    readiness: "You can involve your leadership team, share relevant information and examine what is happening.",
    boundary: "You leave with findings and priorities you can act on, independently or with further support.",
    nextStep: "Discuss the assessment",
    featured: false,
  },
  {
    id: "advisory",
    number: "02",
    title: "Strategic People Advisory",
    shortTitle: "Decide how to act",
    href: "/advisory",
    situation: "You know the issue and want to decide how to address it.",
    summary: "Work through a people, leadership or organisation decision with me and agree a plan your team can put into practice.",
    rhythm: "A starting point: 2–6 weeks",
    receives: ["Focused advice on the decision in front of you", "Working sessions with the people involved", "Agreed priorities and a practical plan"],
    readiness: "You have a question to work on and someone in your business who can lead the response.",
    boundary: "Your team makes the decisions and leads implementation. We agree the question, what you receive and a review point; one session or a longer series may fit better.",
    nextStep: "Talk through the decision",
    featured: false,
  },
  {
    id: "fractional-cpo",
    number: "03",
    title: "Fractional CPO",
    shortTitle: "Lead the people work",
    href: "/fractional-cpo",
    situation: "You need sustained strategic people leadership as the company grows.",
    summary: "Work with me on people strategy, leadership and organisational development, through an agreed CPO remit or ongoing advice.",
    rhythm: "Often 1–2 days a week",
    receives: ["A people strategy connected to your business", "Leadership and organisational development", "Clear responsibilities, regular reviews and a handover"],
    readiness: "You can involve your leadership team and agree who decides, with someone to handle day-to-day HR work.",
    boundary: "I can take responsibility as your Chief People Officer or advise your team over time. We agree what I lead, what your team owns and when to review progress.",
    nextStep: "Explore ongoing support",
    featured: true,
  },
];

export const ENGAGEMENT_SCOPE_NOTE =
  "These are typical starting points, not fixed packages. There is no minimum or maximum term. We agree the scope, pace and level of involvement in a free introductory conversation.";
