import {
  getRouteHref,
  type LocalizedRouteId,
  type SiteLocale,
} from "@/config/routes";

export type WorkingFormatId =
  | "bottleneck-assessment"
  | "executive-coaching"
  | "advisory"
  | "peer-advisory"
  | "fractional-people-leadership";

export type WorkingFormat = {
  id: WorkingFormatId;
  routeId: Exclude<
    LocalizedRouteId,
    "home" | "services" | "contact" | "privacy" | "imprint"
  >;
  title: string;
  responsibility: string;
  signal: string;
  summary: string;
  href: string;
  meta: string;
  kind: "core";
};

const FORMAT_COPY = {
  en: [
    {
      id: "bottleneck-assessment",
      routeId: "bottleneckAssessment",
      title: "Bottleneck Assessment",
      responsibility: "Start here when the cause is still disputed.",
      signal: "We get evidence before anyone starts fixing.",
      meta: "Focused diagnostic",
    },
    {
      id: "executive-coaching",
      routeId: "executiveCoaching",
      title: "Executive Coaching",
      responsibility: "You carry the work.",
      signal: "Individually, or with leaders making the same shift.",
      meta: "Individual or group",
    },
    {
      id: "advisory",
      routeId: "advisory",
      title: "Strategic People Advisory",
      responsibility: "You keep the decision.",
      signal: "I bring judgment from outside your reporting line.",
      meta: "Ongoing or time-bound",
    },
    {
      id: "peer-advisory",
      routeId: "peerAdvisory",
      title: "Peer Advisory",
      responsibility: "Other leaders carry it with you.",
      signal: "I chair the room and keep it on the real decision.",
      meta: "Confidential peer room",
    },
    {
      id: "fractional-people-leadership",
      routeId: "fractionalPeopleLeadership",
      title: "Fractional People Leadership",
      responsibility: "I carry a defined remit.",
      signal: "The work gets senior ownership for an agreed period.",
      meta: "Defined part-time remit",
    },
  ],
  de: [
    {
      id: "bottleneck-assessment",
      routeId: "bottleneckAssessment",
      title: "Bottleneck Assessment",
      responsibility: "Hier beginnen, wenn die Ursache umstritten ist.",
      signal: "Wir sammeln Belege, bevor jemand mit der nächsten Lösung beginnt.",
      meta: "Gezielte Analyse",
    },
    {
      id: "executive-coaching",
      routeId: "executiveCoaching",
      title: "Executive Coaching",
      responsibility: "Sie tragen die Arbeit.",
      signal: "Allein oder mit Führungskräften, die denselben Schritt gehen.",
      meta: "Einzeln oder als Gruppe",
    },
    {
      id: "advisory",
      routeId: "advisory",
      title: "Strategic People Advisory",
      responsibility: "Die Entscheidung bleibt bei Ihnen.",
      signal: "Ich bringe Urteilskraft von außerhalb Ihrer Berichtslinie ein.",
      meta: "Laufend oder befristet",
    },
    {
      id: "peer-advisory",
      routeId: "peerAdvisory",
      title: "Peer Advisory",
      responsibility: "Andere Führungskräfte tragen die Arbeit mit Ihnen.",
      signal: "Ich leite die Runde und halte sie bei der eigentlichen Entscheidung.",
      meta: "Vertrauliche Peer-Runde",
    },
    {
      id: "fractional-people-leadership",
      routeId: "fractionalPeopleLeadership",
      title: "Fractional People Leadership",
      responsibility: "Ich übernehme einen klar definierten Verantwortungsbereich.",
      signal: "Die Arbeit bekommt für einen vereinbarten Zeitraum erfahrene Führung.",
      meta: "Mandat mit klarem Umfang",
    },
  ],
} as const satisfies Record<SiteLocale, readonly Omit<WorkingFormat, "href" | "summary" | "kind">[]>;

export function getWorkingFormats(locale: SiteLocale): readonly WorkingFormat[] {
  return FORMAT_COPY[locale].map((format) => ({
    ...format,
    href: getRouteHref(format.routeId, locale),
    summary: `${format.responsibility} ${format.signal}`,
    kind: "core" as const,
  }));
}

export const WORKING_FORMATS = getWorkingFormats("en");
