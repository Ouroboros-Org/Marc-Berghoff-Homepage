export const SITE_LOCALES = ["en", "de"] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export type LocalizedRouteId =
  | "home"
  | "services"
  | "bottleneckAssessment"
  | "executiveCoaching"
  | "advisory"
  | "peerAdvisory"
  | "fractionalPeopleLeadership"
  | "about"
  | "results"
  | "contact"
  | "privacy"
  | "imprint";

export const LOCALIZED_ROUTES = {
  home: { en: "/", de: "/de" },
  services: { en: "/services", de: "/de/services" },
  bottleneckAssessment: {
    en: "/bottleneck-assessment",
    de: "/de/bottleneck-assessment",
  },
  executiveCoaching: {
    en: "/executive-coaching",
    de: "/de/executive-coaching",
  },
  advisory: { en: "/advisory", de: "/de/advisory" },
  peerAdvisory: { en: "/peer-advisory", de: "/de/peer-advisory" },
  fractionalPeopleLeadership: {
    en: "/fractional-people-leadership",
    de: "/de/fractional-people-leadership",
  },
  about: { en: "/about", de: "/de/about" },
  results: { en: "/results", de: "/de/results" },
  contact: { en: "/contact", de: "/de/contact" },
  privacy: { en: "/privacy", de: "/de/datenschutz" },
  imprint: { en: "/imprint", de: "/de/impressum" },
} as const satisfies Record<
  LocalizedRouteId,
  Record<SiteLocale, `/${string}` | "/">
>;

export function getRouteHref(
  routeId: LocalizedRouteId,
  locale: SiteLocale,
  hash?: `#${string}`,
) {
  return `${LOCALIZED_ROUTES[routeId][locale]}${hash ?? ""}`;
}

export function getRouteId(pathname: string): LocalizedRouteId | null {
  for (const [routeId, paths] of Object.entries(LOCALIZED_ROUTES)) {
    if (pathname === paths.en || pathname === paths.de) {
      return routeId as LocalizedRouteId;
    }
  }

  return null;
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
  return pathname === "/de" || pathname.startsWith("/de/") ? "de" : "en";
}

export function getAlternateLocaleHref(pathname: string) {
  const routeId = getRouteId(pathname);

  if (!routeId) return null;

  const locale = getLocaleFromPathname(pathname);
  const alternateLocale: SiteLocale = locale === "de" ? "en" : "de";

  return {
    href: getRouteHref(routeId, alternateLocale),
    locale: alternateLocale,
  } as const;
}

export function getLanguageAlternates(routeId: LocalizedRouteId) {
  return {
    "en-GB": getRouteHref(routeId, "en"),
    de: getRouteHref(routeId, "de"),
    "x-default": getRouteHref(routeId, "en"),
  } as const;
}
