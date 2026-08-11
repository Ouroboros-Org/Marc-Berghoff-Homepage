export const HOME_LOCALES = ["en", "de"] as const;

export type HomeLocale = (typeof HOME_LOCALES)[number];

type EmphasisPart = {
  text: string;
  emphasis?: boolean;
};

type ProofPart = {
  text: string;
  strong?: boolean;
};

export type HomeCopy = {
  metadata: {
    title: string;
    description: string;
  };
  locale: {
    currentLabel: string;
    switchHref: string;
    switchLabel: string;
    documentLanguage: HomeLocale;
  };
  hero: {
    title: string;
    paragraphs: readonly string[];
    primaryBookingLabel: string;
    primaryFallbackLabel: string;
    secondaryLead: string;
    secondaryDetail: string;
    audience: string;
    imageAlt: string;
    captionName: string;
    captionRole: string;
  };
  credentials: readonly string[];
  recognition: {
    title: string;
    paragraph: readonly EmphasisPart[];
    explanation: string;
  };
  candour: {
    title: string;
    body: string;
    promise: string;
  };
  services: {
    title: string;
    intro: string;
    linkLabel: string;
    responsibility: Readonly<Record<string, string>>;
    summary: Readonly<Record<string, string>>;
  };
  experience: {
    title: string;
    body: string;
    aboutLabel: string;
    resultsLabel: string;
    imageAlt: string;
    proof: readonly (readonly ProofPart[])[];
  };
  process: {
    title: string;
    summary: string;
    linkLabel: string;
  };
  insights: {
    title: string;
    intro: string;
    languageNote?: string;
  };
  closing: {
    title: string;
    body: string;
    bookingLabel: string;
    noteLabel: string;
  };
};

const english: HomeCopy = {
  metadata: {
    title: "Leadership, Organisation and Coaching | Marc Berghoff",
    description:
      "For founder-led companies anticipating their next stage of growth. I find what is constraining the company, before anyone starts fixing it.",
  },
  locale: {
    currentLabel: "English",
    switchHref: "/de",
    switchLabel: "Deutsch",
    documentLanguage: "en",
  },
  hero: {
    title: "You've already tried everything that should have worked.",
    paragraphs: [
      "Consultants on your processes. Support from your investors. A new leadership team. The work you've done on yourself.",
      "And it still feels like something is holding the company back — and you can't point at it.",
      "Most outside help starts by solving. I start by understanding. Until you know what is actually constraining the company, every fix is a guess with an invoice attached.",
    ],
    primaryBookingLabel: "Book a free 30-minute conversation",
    primaryFallbackLabel: "Send me a note",
    secondaryLead: "Not sure yet? See if these apply to you",
    secondaryDetail: "10 statements, 2 minutes, no email needed",
    audience:
      "For founder-led companies and SMEs anticipating their next stage of growth.",
    imageAlt: "Marc Berghoff speaking at a conference",
    captionName: "Marc Berghoff",
    captionRole: "Organisational Psychologist · Vistage Chair · Executive Coach",
  },
  credentials: [
    "Organisational Psychologist",
    "Vistage Chair",
    "ICF Associate Certified Coach, 350+ hours",
    "Lecturer in training and development & org. leadership",
    "Almost a decade across HR, coaching and organisational development — in-house and independent",
  ],
  recognition: {
    title: "One blurred decision can keep pulling work back upstairs.",
    paragraph: [
      {
        text: "Most of the founders I work with can describe the feeling long before they can describe the cause. The ",
      },
      { text: "same decision", emphasis: true },
      {
        text: " keeps arriving at their desk. Their leadership team gives ",
      },
      { text: "three different accounts of the same problem", emphasis: true },
      {
        text: ". Everyone is capable, everyone is working hard, and the company is ",
      },
      { text: "still slower than it should be", emphasis: true },
      { text: "." },
    ],
    explanation:
      "Those symptoms can have many causes. My job is to understand what is happening, so you can work on the cause.",
  },
  candour: {
    title: "You need candour without losing the operating context.",
    body: "I am outside your reporting line, which makes it easier for me to say what I see. I still need the context before I form a view. We agree how involved I should be after the first conversation.",
    promise:
      "If I am not the right person, I will say so. Where I can make a useful introduction, I will.",
  },
  services: {
    title: "Choose the level of involvement the issue needs.",
    intro: "Start with the issue. We can choose the format after we understand it.",
    linkLabel: "See how I work",
    responsibility: {},
    summary: {},
  },
  experience: {
    title: "Experience on both sides of the conversation.",
    body: "I have led people work inside a scale-up, co-founded a business, coached leaders and led HR on an interim basis. That mix helps me notice the human tension and the operating consequence.",
    aboutLabel: "About me",
    resultsLabel: "See the full results",
    imageAlt: "Marc Berghoff seated in an office setting",
    proof: [
      [
        { text: "In my second year of executive coaching with the leadership of a consumer goods scale-up past " },
        { text: "€200m ARR", strong: true },
      ],
      [
        { text: "Executive coaching with department leaders at a " },
        { text: "national financial regulator", strong: true },
      ],
      [
        { text: "Individual coaching and group sessions with the top management team of a " },
        { text: "global events and media group", strong: true },
      ],
      [
        { text: "Worked with the " },
        { text: "CFO of a German financial services group", strong: true },
        { text: " to establish a sourcing approach they still run today, 5 years later" },
      ],
      [
        { text: "Interim group-wide HR leadership", strong: true },
        { text: " of a security company with 400 employees across four companies" },
      ],
      [
        { text: "Head of HR", strong: true },
        { text: " at a solar scale-up later acquired by " },
        { text: "E.ON", strong: true },
      ],
      [
        { text: "Executive coaching and mediation between CEO and owner at an agency in " },
        { text: "Dubai", strong: true },
      ],
      [
        { text: "Keynote speaker at " },
        { text: "Malta's largest HR conference", strong: true },
      ],
    ],
  },
  process: {
    title: "What happens after you get in touch.",
    summary:
      "A free 30-minute conversation first. I then look at what has already been tried and who is involved. You receive a written scope before any paid work begins.",
    linkLabel: "See the four steps in full",
  },
  insights: {
    title: "Read the issue before you choose the help.",
    intro:
      "These notes look at what makes leadership work difficult to see, own or move.",
  },
  closing: {
    title: "Start with what is happening now.",
    body: "The first 30 minutes are free. Bring the issue, what you have tried and where it keeps returning. My aim is that you leave with a clearer question, even if the work stops there.",
    bookingLabel: "Choose a time",
    noteLabel: "Send me a note",
  },
};

const german: HomeCopy = {
  metadata: {
    title: "Führung, Organisation und Coaching | Marc Berghoff",
    description:
      "Für inhabergeführte Unternehmen vor ihrer nächsten Wachstumsphase. Ich finde heraus, was das Unternehmen bremst, bevor jemand mit der nächsten Lösung beginnt.",
  },
  locale: {
    currentLabel: "Deutsch",
    switchHref: "/",
    switchLabel: "English",
    documentLanguage: "de",
  },
  hero: {
    title: "Sie haben bereits alles versucht, was hätte funktionieren sollen.",
    paragraphs: [
      "Berater für Ihre Prozesse. Unterstützung durch Ihre Investoren. Ein neues Führungsteam. Die Arbeit an sich selbst.",
      "Und trotzdem fühlt es sich an, als würde etwas das Unternehmen zurückhalten — ohne dass Sie genau sagen können, was es ist.",
      "Die meiste Hilfe von außen beginnt mit einer Lösung. Ich beginne damit, zu verstehen. Solange Sie nicht wissen, was das Unternehmen tatsächlich bremst, ist jede Lösung eine Vermutung mit Rechnung.",
    ],
    primaryBookingLabel: "Kostenloses 30-Minuten-Gespräch buchen",
    primaryFallbackLabel: "Nachricht senden",
    secondaryLead: "Noch unsicher? Prüfen Sie, ob diese Aussagen auf Sie zutreffen",
    secondaryDetail: "10 Aussagen, 2 Minuten, keine E-Mail-Adresse nötig",
    audience:
      "Für inhabergeführte Unternehmen und KMU vor ihrer nächsten Wachstumsphase.",
    imageAlt: "Marc Berghoff bei einem Vortrag",
    captionName: "Marc Berghoff",
    captionRole: "Organisationspsychologe · Vistage Chair · Executive Coach",
  },
  credentials: [
    "Organisationspsychologe",
    "Vistage Chair",
    "ICF Associate Certified Coach, mehr als 350 Stunden",
    "Dozent für Training und Entwicklung sowie Organisationsführung",
    "Fast ein Jahrzehnt in HR, Coaching und Organisationsentwicklung — intern und selbstständig",
  ],
  recognition: {
    title: "Eine unklare Entscheidung zieht Arbeit immer wieder nach oben.",
    paragraph: [
      {
        text: "Die meisten Gründer, mit denen ich arbeite, können das Gefühl lange beschreiben, bevor sie die Ursache benennen können. ",
      },
      { text: "Dieselbe Entscheidung", emphasis: true },
      { text: " landet immer wieder auf ihrem Schreibtisch. Ihr Führungsteam schildert " },
      { text: "dasselbe Problem auf drei verschiedene Arten", emphasis: true },
      { text: ". Alle sind fähig, alle arbeiten hart, und das Unternehmen ist trotzdem " },
      { text: "langsamer, als es sein sollte", emphasis: true },
      { text: "." },
    ],
    explanation:
      "Diese Symptome können viele Ursachen haben. Meine Aufgabe ist, zu verstehen, was passiert, damit Sie gezielt an der Ursache arbeiten können.",
  },
  candour: {
    title: "Sie brauchen Offenheit, ohne den betrieblichen Kontext zu verlieren.",
    body: "Ich stehe außerhalb Ihrer Berichtslinie. Das macht es leichter, offen zu sagen, was ich sehe. Bevor ich mir ein Urteil bilde, brauche ich trotzdem den Kontext. Nach dem ersten Gespräch legen wir fest, wie stark ich mich einbringe.",
    promise:
      "Wenn ich nicht der Richtige bin, sage ich das. Und wenn ich jemanden sinnvoll empfehlen kann, tue ich das.",
  },
  services: {
    title: "Wählen Sie, wie stark ich mich einbringen soll.",
    intro: "Wir beginnen mit dem Thema. Das passende Format wählen wir, sobald wir es verstanden haben.",
    linkLabel: "So arbeite ich",
    responsibility: {
      "/bottleneck-assessment": "Die Ursache ist noch nicht klar genug.",
      "/executive-coaching": "Sie tragen die Arbeit.",
      "/advisory": "Die Entscheidung bleibt bei Ihnen.",
      "/peer-advisory": "Mehrere Führungskräfte arbeiten an ihren eigenen Entscheidungen.",
      "/fractional-people-leadership": "Ich übernehme einen klar definierten Verantwortungsbereich.",
    },
    summary: {
      "/bottleneck-assessment": "Wir schaffen zuerst eine belastbare Grundlage.",
      "/executive-coaching": "Einzeln oder als Gruppe.",
      "/advisory": "Die Frage ist sichtbar, aber schwer zu beantworten.",
      "/peer-advisory": "Niemand berichtet aneinander. Genau das macht den offenen Austausch möglich.",
      "/fractional-people-leadership": "Die Arbeit braucht jetzt eine erfahrene Person, die sie führt.",
    },
  },
  experience: {
    title: "Erfahrung auf beiden Seiten des Gesprächs.",
    body: "Ich habe People-Arbeit in einem Scale-up geleitet, ein Unternehmen mitgegründet, Führungskräfte gecoacht und HR interimistisch geführt. So sehe ich die menschliche Spannung und die betriebliche Folge.",
    aboutLabel: "Über mich",
    resultsLabel: "Alle Ergebnisse ansehen",
    imageAlt: "Marc Berghoff in einem Büro",
    proof: [
      [
        { text: "Im zweiten Jahr des Executive Coachings mit der Geschäftsleitung eines Konsumgüter-Scale-ups mit mehr als " },
        { text: "200 Mio. € ARR", strong: true },
      ],
      [
        { text: "Executive Coaching mit Bereichsleitungen bei einer " },
        { text: "nationalen Finanzaufsicht", strong: true },
      ],
      [
        { text: "Einzelcoachings und Gruppensitzungen mit dem Topmanagement einer " },
        { text: "internationalen Veranstaltungs- und Mediengruppe", strong: true },
      ],
      [
        { text: "Zusammenarbeit mit dem " },
        { text: "CFO einer deutschen Finanzdienstleistungsgruppe", strong: true },
        { text: " beim Aufbau eines Sourcing-Ansatzes, der fünf Jahre später noch genutzt wird" },
      ],
      [
        { text: "Interimistische, gruppenweite HR-Leitung", strong: true },
        { text: " eines Sicherheitsunternehmens mit 400 Mitarbeitenden in vier Gesellschaften" },
      ],
      [
        { text: "Head of HR", strong: true },
        { text: " bei einem Solar-Scale-up, das später von " },
        { text: "E.ON", strong: true },
        { text: " übernommen wurde" },
      ],
      [
        { text: "Executive Coaching und Mediation zwischen CEO und Eigentümer einer Agentur in " },
        { text: "Dubai", strong: true },
      ],
      [
        { text: "Keynote bei " },
        { text: "Maltas größter HR-Konferenz", strong: true },
      ],
    ],
  },
  process: {
    title: "Was nach Ihrer Kontaktaufnahme passiert.",
    summary:
      "Zuerst ein kostenloses 30-minütiges Gespräch. Danach sehe ich mir an, was bereits versucht wurde und wer beteiligt ist. Bevor bezahlte Arbeit beginnt, halte ich den Umfang schriftlich fest.",
    linkLabel: "Die vier Schritte im Detail",
  },
  insights: {
    title: "Verstehen Sie das Thema, bevor Sie die Hilfe wählen.",
    intro:
      "Diese Texte zeigen, warum Führungsarbeit manchmal schwer zu erkennen, zuzuordnen oder voranzubringen ist.",
    languageNote: "Englischer Artikel",
  },
  closing: {
    title: "Beginnen Sie mit dem, was gerade passiert.",
    body: "Die ersten 30 Minuten sind kostenlos. Bringen Sie das Thema mit, Ihre bisherigen Versuche und den Punkt, an dem es immer wieder zurückkommt. Mein Ziel ist, dass Sie mit einer klareren Frage gehen — auch wenn die Zusammenarbeit dort endet.",
    bookingLabel: "Termin wählen",
    noteLabel: "Nachricht senden",
  },
};

export const HOME_COPY: Readonly<Record<HomeLocale, HomeCopy>> = {
  en: english,
  de: german,
};

export function getHomeCopy(locale: HomeLocale): HomeCopy {
  return HOME_COPY[locale];
}
