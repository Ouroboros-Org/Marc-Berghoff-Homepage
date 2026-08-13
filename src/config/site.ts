import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getWorkingFormats } from "@/content/working-formats";

const DEFAULT_SITE_URL = "https://marcberghoff.com";
const DEFAULT_CONTACT_EMAIL = "marc@marcberghoff.com";
const PUBLIC_URL_PLACEHOLDER = /YOUR_|REPLACE/i;

function parsePublicUrl(configured: string | null | undefined) {
  const candidate = configured?.trim();

  if (!candidate || PUBLIC_URL_PLACEHOLDER.test(candidate)) {
    return null;
  }

  try {
    const url = new URL(candidate);

    if (
      (url.protocol !== "http:" && url.protocol !== "https:") ||
      url.username ||
      url.password
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function parseVercelUrl(configured: string | null | undefined) {
  const candidate = configured?.trim();

  if (!candidate) return null;

  return parsePublicUrl(
    candidate.startsWith("http://") || candidate.startsWith("https://")
      ? candidate
      : `https://${candidate}`,
  );
}

export function getSiteUrl(
  configured: string | null | undefined = process.env.NEXT_PUBLIC_SITE_URL,
  vercelProductionUrl: string | null | undefined = process.env
    .VERCEL_PROJECT_PRODUCTION_URL,
  vercelDeploymentUrl: string | null | undefined = process.env.VERCEL_URL,
) {
  const stableVercelUrl = [vercelProductionUrl, vercelDeploymentUrl]
    .map(parseVercelUrl)
    .find((url) => url && !url.hostname.endsWith(".vercel.app"));

  return (
    parsePublicUrl(configured)?.origin ??
    stableVercelUrl?.origin ??
    DEFAULT_SITE_URL
  );
}

export function getCalLink(configured = process.env.NEXT_PUBLIC_CAL_LINK) {
  const candidate = configured?.trim().replace(/^\/+|\/+$/g, "");

  if (
    !candidate ||
    PUBLIC_URL_PLACEHOLDER.test(candidate) ||
    candidate.includes("..") ||
    !/^[a-zA-Z0-9._~-]+(?:\/[a-zA-Z0-9._~-]+)*$/.test(candidate)
  ) {
    return null;
  }

  return candidate;
}

export function getContactEmail(
  configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL,
) {
  const candidate = configured?.trim();

  if (
    !candidate ||
    PUBLIC_URL_PLACEHOLDER.test(candidate) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)
  ) {
    return DEFAULT_CONTACT_EMAIL;
  }

  return candidate;
}

export type PrimaryContactAction = {
  href: string;
  label: string;
  isBooking: boolean;
};

export function getPrimaryContactAction(
  locale: SiteLocale = "en",
): PrimaryContactAction {
  return {
    href: getRouteHref("contact", locale, "#booking"),
    label:
      locale === "de"
        ? "Kostenloses 30-Minuten-Gespräch buchen"
        : "Book a free 30-minute conversation",
    isBooking: true,
  };
}

export function getContactPhone(
  configured = process.env.NEXT_PUBLIC_CONTACT_PHONE,
) {
  const display = configured?.trim();

  if (!display || PUBLIC_URL_PLACEHOLDER.test(display)) {
    return null;
  }

  const href = display.replace(/[^\d+]/g, "");

  if (!/^\+[1-9]\d{6,14}$/.test(href)) {
    return null;
  }

  return { display, href } as const;
}

const calLink = getCalLink();
const contactPhone = getContactPhone();
const primaryContactAction = getPrimaryContactAction();

export const siteConfig = {
  name: "Marc Berghoff",
  descriptor: "Leadership · organisation · coaching",
  description:
    "For founder-led companies anticipating their next stage of growth. I find what is constraining the company, before anyone starts fixing it.",
  contact: {
    email: getContactEmail(),
    phoneDisplay: contactPhone?.display ?? null,
    phoneHref: contactPhone?.href ?? null,
    calLink,
    primaryAction: primaryContactAction,
  },
  social: {
    linkedin: "https://mt.linkedin.com/in/marcberghoff/en",
  },
} as const;

export type NavigationLink = {
  href: string;
  label: string;
  description: string;
  language?: SiteLocale;
};

export type HeaderNavigationGroup = {
  id: "work" | "insights" | "about";
  label: string;
  href: string;
  description: string;
  items: readonly NavigationLink[];
};

export function getServiceNavigation(locale: SiteLocale) {
  return [
    {
      href: getRouteHref("services", locale),
      label: locale === "de" ? "Zusammenarbeit" : "How I can help",
      description:
        locale === "de"
          ? "Fünf Formate, abhängig davon, was gerade gebraucht wird und wer die Arbeit danach trägt."
          : "See how the situation determines who carries the work afterwards.",
    },
    ...getWorkingFormats(locale).map((format) => ({
      href: format.href,
      label: format.title,
      description: `${format.responsibility} ${format.signal}`,
    })),
  ] satisfies readonly NavigationLink[];
}

export const serviceNavigation = getServiceNavigation("en");

const insightNavigation = [
  {
    href: "/blog",
    label: "All insights",
    description:
      "Start with the leadership pattern closest to what is happening now.",
  },
  {
    href: "/blog/founder-bottleneck-or-operating-model",
    label: "When work returns to the founder",
    description:
      "Trace whether the issue sits in behaviour, decision rights or the operating model.",
  },
  {
    href: "/blog/role-clarity-is-not-a-job-description",
    label: "Role clarity beyond job descriptions",
    description:
      "Look at decisions, hand-offs and working agreements that the documents miss.",
  },
  {
    href: "/blog/when-fractional-people-leadership-makes-sense",
    label: "When Fractional People Leadership fits",
    description:
      "Recognise when the agenda needs an owner before it needs a permanent hire.",
  },
  {
    href: "/blog/executive-coaching-advisory-or-assessment",
    label: "When the format should change",
    description:
      "See how ownership and uncertainty point to a proportionate response.",
  },
] as const satisfies readonly NavigationLink[];

const aboutNavigation = [
  {
    href: "/about",
    label: "About me",
    description:
      "See how I work between coaching, advice and defined responsibility.",
  },
  {
    href: "/results",
    label: "Selected work",
    description: "Review selected engagements, client evidence and public work.",
  },
  {
    href: "/contact",
    label: "Contact & booking",
    description: "Start with a free conversation or a short note.",
  },
] as const satisfies readonly NavigationLink[];

export function getHeaderNavigation(
  locale: SiteLocale,
): readonly HeaderNavigationGroup[] {
  if (locale === "de") {
    return [
      {
        id: "work",
        label: "Zusammenarbeit",
        href: getRouteHref("services", "de"),
        description:
          "Die Situation entscheidet, wie stark ich mich einbringe.",
        items: getServiceNavigation("de"),
      },
      {
        id: "insights",
        label: "Einblicke",
        href: "/blog",
        description:
          "Englische Texte zu Führungsfragen, die sich schwer erkennen oder bewegen lassen.",
        items: insightNavigation.map((item) => ({
          ...item,
          label: `${item.label} (Englisch)`,
          language: "en" as const,
        })),
      },
      {
        id: "about",
        label: "Über mich",
        href: getRouteHref("about", "de"),
        description:
          "Erfahren Sie mehr über meinen Hintergrund, meine Arbeitsweise und ausgewählte Mandate.",
        items: [
          {
            href: getRouteHref("about", "de"),
            label: "Über mich",
            description:
              "Wie ich zwischen Coaching, Beratung und einem klaren Auftrag arbeite.",
          },
          {
            href: getRouteHref("results", "de"),
            label: "Ausgewählte Arbeit",
            description:
              "Ausgewählte Mandate, Kundenstimmen und öffentliche Arbeit.",
          },
          {
            href: getRouteHref("contact", "de"),
            label: "Kontakt & Buchung",
            description: "Ein kostenloses Erstgespräch buchen oder direkt schreiben.",
          },
        ],
      },
    ] as const;
  }

  return [
    {
      id: "work",
      label: "How I can help",
      href: getRouteHref("services", "en"),
      description: "See how the situation determines my level of involvement.",
      items: getServiceNavigation("en"),
    },
    {
      id: "insights",
      label: "Insights",
      href: "/blog",
      description: "Read practical notes on leadership issues that are hard to see or move.",
      items: insightNavigation,
    },
    {
      id: "about",
      label: "About",
      href: "/about",
      description: "Read how I work, see relevant experience or get in touch.",
      items: aboutNavigation,
    },
  ] as const;
}
