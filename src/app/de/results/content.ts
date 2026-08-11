import type { CaseStudy } from "@/content/results";

export const GERMAN_CASE_STUDIES = [
  {
    company: "Nationale Finanzaufsicht",
    engagement: "Executive Coaching",
    responsibility: "Coaching mit Bereichsleitungen",
  },
  {
    company: "Internationale Veranstaltungs- und Mediengruppe",
    engagement: "Einzel- und Gruppencoaching",
    responsibility: "Arbeit mit dem Topmanagement",
  },
  {
    company: "Deutsche Finanzdienstleistungsgruppe",
    engagement: "Strategische Beratung",
    responsibility: "Entwicklung eines Sourcing-Ansatzes mit dem CFO",
    context:
      "Der gemeinsam mit dem CFO entwickelte Ansatz war in der Gruppe auch fünf Jahre später noch im Einsatz.",
  },
  {
    company: "Unternehmensgruppe im Sicherheitsbereich, Malta",
    engagement: "Interimistische HR-Leitung",
    responsibility: "Gruppenweite Verantwortung für vier Gesellschaften",
    context:
      "Ich habe interimistisch die HR-Verantwortung für ein Sicherheitsunternehmen mit 400 Mitarbeitenden übernommen.",
  },
  {
    company: "Klarsolar",
    engagement: "HR-Leitung im Scale-up",
    responsibility: "Head of HR in einem wachsenden Unternehmen",
    context:
      "Ich leitete HR im Solar-Scale-up. Später wurde das Unternehmen von E.ON übernommen.",
  },
  {
    company: "CyberKongz",
    engagement: "Mitgründung und operative Verantwortung",
    responsibility: "Arbeit in einem globalen Web3-Projekt",
  },
  {
    company: "Agentur, Dubai",
    engagement: "Executive Coaching und Mediation",
    responsibility: "Coaching und Mediation zwischen CEO und Eigentümer",
  },
  {
    company: "Große HR-Konferenz, Malta",
    engagement: "Keynote",
    responsibility: "Keynote-Vortrag",
  },
] as const satisfies readonly CaseStudy[];
