import type { DiagnosticBand, DiagnosticItemId } from "@/lib/contact-diagnostic";

export type DiagnosticLocale = "en";

type DiagnosticCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  statements: Record<DiagnosticItemId, string>;
  trueLabel: string;
  falseLabel: string;
  answered: (count: number, total: number) => string;
  progressLabel: string;
  showMore: string;
  showLess: string;
  seeResult: string;
  reset: string;
  resultLabel: string;
  resultTitles: Record<DiagnosticBand, string>;
  resultBodies: Record<DiagnosticBand, string>;
  score: (score: number, maximum: number) => string;
  booking: string;
  shareResult: string;
  shareTitle: string;
  emailLabel: string;
  emailHelper: string;
  send: string;
  sending: string;
  sent: string;
  sendError: string;
  emailError: string;
  privacy: string;
};

export const DIAGNOSTIC_COPY: Record<DiagnosticLocale, DiagnosticCopy> = {
  en: {
    eyebrow: "Company self-check",
    title: "Think about a typical working week.",
    intro: "Mark each statement true or not true for you. Your answers stay on this page unless you choose to send them to Marc. No email is needed to see your result.",
    statements: {
      "shared-priorities": "Ask your leadership team for the top three priorities and you would get the exact same three.",
      "repeated-decision": "The same decision reaches you for the third time, and you have to make it again.",
      "unneeded-permission": "People ask you for permission they already have in your opinion.",
      "whole-picture": "You are the only one who sees the whole picture, despite having hired good people.",
      "different-problems": "Three people describe the same problem and you get three different problems.",
      "chasing-actions": "Meetings end in agreement, and you still have to chase the action points.",
      "review-not-needed": "Important work goes out the door without you needing to review it first.",
      "more-on-plate": "You hired someone to take work off your plate, and somehow you have more on it now.",
      "overdue-conversation": "You already know which conversation you should have had three months ago.",
      "company-keeps-pace": "You can easily leave the company, knowing that everything will stay up to speed.",
    },
    trueLabel: "True",
    falseLabel: "Not true",
    answered: (count, total) => `${count} of ${total} answered`,
    progressLabel: "Self-check progress",
    showMore: "Show more",
    showLess: "Show less",
    seeResult: "See my result",
    reset: "Reset",
    resultLabel: "Your perspective",
    resultTitles: {
      low: "Few recurring signals",
      moderate: "Some recurring signals",
      high: "Several recurring signals",
    },
    resultBodies: {
      low: "These patterns come up less often in your answers. Think about the statement that gave you most pause, and whether a colleague would see it the same way.",
      moderate: "Some of these patterns are familiar. Pick a recent example and look at what happened before and after it. A different perspective from someone involved may help you understand it.",
      high: "Many of these patterns are familiar. Consider where they recur in a typical week, especially around decisions, responsibilities or follow-through. That can give you a useful starting point for reflection.",
    },
    score: (score, maximum) => `${score} of ${maximum}`,
    booking: "Talk it through",
    shareResult: "Share with Marc",
    shareTitle: "Where should Marc reply?",
    emailLabel: "Email",
    emailHelper: "Your result is already visible. Sending it is optional.",
    send: "Send result",
    sending: "Sending…",
    sent: "Sent. Marc has your result and email address.",
    sendError: "The result could not be sent just now. Try again in a moment.",
    emailError: "Enter a valid email address.",
    privacy: "Your email, score and answers are sent only when you press Send result. They are not added to a mailing list.",
  },
};
