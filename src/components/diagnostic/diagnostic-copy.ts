import type {
  DiagnosticBand,
  DiagnosticItemId,
} from "@/lib/contact-diagnostic";

export type DiagnosticLocale = "en" | "de";

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
    intro:
      "Ten statements. Mark each one true or not true for you. Nothing is stored. You see the result without giving an email address.",
    statements: {
      "shared-priorities":
        "Ask your leadership team for the top three priorities and you would get the exact same three.",
      "repeated-decision":
        "The same decision reaches you for the third time, and you have to make it again.",
      "unneeded-permission":
        "People ask you for permission they already have in your opinion.",
      "whole-picture":
        "You are the only one who sees the whole picture, despite having hired good people.",
      "different-problems":
        "Three people describe the same problem and you get three different problems.",
      "chasing-actions":
        "Meetings end in agreement, and you still have to chase the action points.",
      "review-not-needed":
        "Important work goes out the door without you needing to review it first.",
      "more-on-plate":
        "You hired someone to take work off your plate, and somehow you have more on it now.",
      "overdue-conversation":
        "You already know which conversation you should have had three months ago.",
      "company-keeps-pace":
        "You can easily leave the company, knowing that everything will stay up to speed.",
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
    privacy:
      "Your email, score and answers are sent only when you press Send result. They are not added to a mailing list.",
  },
  de: {
    eyebrow: "Check mit zehn Aussagen",
    title: "Prüfen Sie, ob das Muster strukturell ist.",
    intro:
      "Zehn Aussagen. Markieren Sie, was auf Sie zutrifft und was nicht. Es wird nichts gespeichert. Ihr Ergebnis sehen Sie ohne E-Mail-Adresse.",
    statements: {
      "shared-priorities":
        "Wenn Sie Ihr Führungsteam nach den drei wichtigsten Prioritäten fragen, erhalten Sie von allen genau dieselben drei.",
      "repeated-decision":
        "Dieselbe Entscheidung landet zum dritten Mal bei Ihnen, und Sie müssen sie erneut treffen.",
      "unneeded-permission":
        "Menschen bitten Sie um Erlaubnis, obwohl sie diese aus Ihrer Sicht längst haben.",
      "whole-picture":
        "Sie sind die einzige Person, die das Gesamtbild sieht, obwohl Sie gute Leute eingestellt haben.",
      "different-problems":
        "Drei Menschen beschreiben dasselbe Problem, und Sie hören drei verschiedene Probleme.",
      "chasing-actions":
        "Besprechungen enden mit Einigkeit, und Sie müssen den vereinbarten Aufgaben trotzdem hinterherlaufen.",
      "review-not-needed":
        "Wichtige Arbeit verlässt das Unternehmen, ohne dass Sie sie vorher prüfen müssen.",
      "more-on-plate":
        "Sie haben jemanden eingestellt, um Ihnen Arbeit abzunehmen. Jetzt liegt irgendwie mehr Arbeit bei Ihnen als vorher.",
      "overdue-conversation":
        "Sie wissen längst, welches Gespräch Sie schon vor drei Monaten hätten führen sollen.",
      "company-keeps-pace":
        "Sie können das Unternehmen ohne Weiteres verlassen und wissen, dass alles im gleichen Tempo weiterläuft.",
    },
    trueLabel: "Trifft zu",
    falseLabel: "Trifft nicht zu",
    answered: (count, total) => `${count} von ${total} beantwortet`,
    progressLabel: "Fortschritt des Checks",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",
    seeResult: "Ergebnis anzeigen",
    reset: "Zurücksetzen",
    resultLabel: "Ihr kurzes Ergebnis",
    resultTitles: {
      low: "Niedrig",
      moderate: "Mittel",
      high: "Hoch",
    },
    resultBodies: {
      low: "Hier deutet wenig auf eine strukturelle Einschränkung hin. Das Thema liegt möglicherweise im Markt, Produkt, Kapital oder in einer einzelnen Entscheidung. Damit wird die Suche enger.",
      moderate: "Ein Muster entsteht, aber noch nicht im ganzen Unternehmen. Ein oder zwei Übergaben können es bereits erklären. Sehen Sie sich an, wo Entscheidungen, Informationen oder Arbeit zwischen Personen wechseln.",
      high: "Mehrere strukturelle Anzeichen sind vorhanden. Die nächste Frage lautet, wo Entscheidungen, Informationen oder Arbeit den Besitzer wechseln. Dieser Check stellt keine Diagnose; er zeigt, wo ein genauerer Blick sinnvoll sein kann.",
    },
    score: (score, maximum) => `${score} von ${maximum}`,
    booking: "Kostenloses 30-Minuten-Gespräch buchen",
    lowReferral: "Marc um eine hilfreiche Empfehlung bitten",
    shareResult: "Dieses Ergebnis an Marc senden",
    shareTitle: "Wohin darf Marc antworten?",
    emailLabel: "E-Mail-Adresse",
    emailHelper: "Ihr Ergebnis ist bereits sichtbar. Das Senden ist freiwillig.",
    send: "Ergebnis senden",
    sending: "Wird gesendet…",
    sent: "Gesendet. Marc hat Ihr Ergebnis und Ihre E-Mail-Adresse.",
    sendError:
      "Das Ergebnis konnte gerade nicht gesendet werden. Versuchen Sie es gleich noch einmal.",
    emailError: "Geben Sie eine gültige E-Mail-Adresse ein.",
    privacy:
      "Ihre E-Mail-Adresse, Punktzahl und Antworten werden erst gesendet, wenn Sie Ergebnis senden drücken. Sie werden nicht in einen Newsletter-Verteiler aufgenommen.",
  },
};
