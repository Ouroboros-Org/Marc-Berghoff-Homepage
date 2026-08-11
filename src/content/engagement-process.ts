import type { SiteLocale } from "@/config/routes";

export const ENGAGEMENT_PROCESS = [
  {
    title: "First conversation",
    meta: "Typically 30 minutes · free",
    description:
      "You explain what is happening and why it matters now. I ask enough to understand the question and whether I can help. I do not begin paid work before this conversation.",
  },
  {
    title: "Make the issue clearer",
    meta: "Context before format",
    description:
      "I look at what has happened, what has already been tried and who is involved. If the accounts differ or the cause is uncertain, I may recommend gathering evidence first.",
  },
  {
    title: "Agree my involvement",
    meta: "Scope before commitment",
    description:
      "I send a written scope before paid work begins. It records the question, my responsibility, decision rights, working rhythm, fees and how we will review the work.",
  },
  {
    title: "Move and review",
    meta: "Start with the live issue",
    description:
      "We start with the live issue. We review what is changing, what remains stuck and whether my involvement still fits. Any handover conditions are reviewed from the beginning.",
  },
] as const;

export const ENGAGEMENT_PROCESS_DE = [
  {
    title: "Erstes Gespräch",
    meta: "Normalerweise 30 Minuten · kostenlos",
    description:
      "Sie erklären, was passiert und warum es gerade jetzt wichtig ist. Ich frage so weit nach, bis ich die Frage verstehe und einschätzen kann, ob ich helfen kann. Vor diesem Gespräch beginne ich keine bezahlte Arbeit.",
  },
  {
    title: "Die Frage klären",
    meta: "Kontext vor Format",
    description:
      "Ich sehe mir an, was passiert ist, was bereits versucht wurde und wer beteiligt ist. Wenn die Schilderungen auseinandergehen oder die Ursache unklar ist, empfehle ich möglicherweise zuerst, Belege zu sammeln.",
  },
  {
    title: "Meine Rolle festlegen",
    meta: "Umfang vor Zusage",
    description:
      "Bevor bezahlte Arbeit beginnt, erhalten Sie eine schriftliche Vereinbarung zum Umfang. Darin stehen die Frage, meine Verantwortung, Entscheidungsrechte, Arbeitsrhythmus, Honorar und die Art der Überprüfung.",
  },
  {
    title: "Arbeiten und überprüfen",
    meta: "Mit der aktuellen Frage beginnen",
    description:
      "Wir beginnen mit der aktuellen Frage. Gemeinsam prüfen wir, was sich verändert, was weiter feststeckt und ob meine Rolle noch passt. Bedingungen für eine Übergabe besprechen wir von Anfang an.",
  },
] as const;

export function getEngagementProcess(locale: SiteLocale) {
  return locale === "de" ? ENGAGEMENT_PROCESS_DE : ENGAGEMENT_PROCESS;
}
