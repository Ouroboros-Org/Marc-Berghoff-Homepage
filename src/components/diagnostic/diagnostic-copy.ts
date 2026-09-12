import type { DiagnosticBand, DiagnosticItemId, } from "@/lib/contact-diagnostic";
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
    lowReferral: string;
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
        eyebrow: "Ten-statement check",
        title: "See whether the pattern is structural.",
        intro: "Ten statements. Mark each one true or not true for you. Nothing is stored. You see the result without giving an email address.",
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
        progressLabel: "Check progress",
        showMore: "Show more",
        showLess: "Show less",
        seeResult: "See my result",
        reset: "Reset",
        resultLabel: "Your mini-result",
        resultTitles: {
            low: "Low",
            moderate: "Moderate",
            high: "High",
        },
        resultBodies: {
            low: "Little here suggests a structural constraint. The issue may sit in the market, product, cash or one isolated decision. That narrows the search.",
            moderate: "A pattern is forming, but it does not appear across the whole company. One or two hand-offs may be enough to explain it. Look at where decisions, information or work move between people.",
            high: "Several structural signals are present. The next question is where decisions, information or work change hands. This check cannot diagnose that by itself; it tells you where a closer look may be useful.",
        },
        score: (score, maximum) => `${score} of ${maximum}`,
        booking: "Book a free 30-minute conversation",
        lowReferral: "Ask Marc for a useful introduction",
        shareResult: "Send this result to Marc",
        shareTitle: "Where should Marc reply?",
        emailLabel: "Email",
        emailHelper: "Your result is already visible. Sending it is optional.",
        send: "Send result",
        sending: "Sending…",
        sent: "Sent. Marc has your result and email address.",
        sendError: "The result could not be sent just now. Try again in a moment.",
        emailError: "Enter a valid email address.",
        privacy: "Your email, score and answers are sent only when you press Send result. They are not added to a mailing list.",
    }
};
