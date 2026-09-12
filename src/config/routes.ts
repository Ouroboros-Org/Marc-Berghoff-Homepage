export const SITE_LOCALES = ["en"] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

export const ROUTES = {
  home: "/",
  services: "/services",
  bottleneckAssessment: "/bottleneck-assessment",
  advisory: "/advisory",
  fractionalCpo: "/fractional-cpo",
  about: "/about",
  results: "/results",
  contact: "/contact",
  privacy: "/privacy",
  imprint: "/imprint",
} as const;

export type LocalizedRouteId = keyof typeof ROUTES;

export function getRouteHref(
  routeId: LocalizedRouteId,
  locale: SiteLocale = "en",
  hash?: `#${string}`,
) {
  void locale;
  return `${ROUTES[routeId]}${hash ?? ""}`;
}

export function getRouteId(pathname: string): LocalizedRouteId | null {
  for (const [routeId, path] of Object.entries(ROUTES)) {
    if (pathname === path) return routeId as LocalizedRouteId;
  }
  return null;
}
