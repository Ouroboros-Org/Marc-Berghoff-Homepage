import { WORKING_FORMATS } from "@/content/working-formats";

const LOCAL_SITE_URL = "http://localhost:3000";
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
  return (
    parsePublicUrl(configured)?.origin ??
    parseVercelUrl(vercelProductionUrl)?.origin ??
    parseVercelUrl(vercelDeploymentUrl)?.origin ??
    LOCAL_SITE_URL
  );
}

export function getBookingUrl(
  configured = process.env.NEXT_PUBLIC_BOOKING_URL,
) {
  const url = parsePublicUrl(configured);

  if (!url || url.protocol !== "https:") {
    return null;
  }

  return url.href;
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

export const siteConfig = {
  name: "Marc Berghoff",
  descriptor: "Leadership · organisation · coaching",
  description:
    "I help founders and leadership teams see what is really happening and get difficult leadership and organisation work moving.",
  contact: {
    email: "m.berghoff@hx-solutions.de",
    phoneDisplay: contactPhone?.display ?? null,
    phoneHref: contactPhone?.href ?? null,
    calLink,
    bookingUrl: calLink ? `https://cal.com/${calLink}` : getBookingUrl(),
  },
  social: {
    linkedin: "https://mt.linkedin.com/in/marcberghoff/en",
  },
} as const;

export type NavigationLink = {
  href: string;
  label: string;
  description: string;
};

export const serviceNavigation = [
  {
    href: "/services",
    label: "How I can help",
    description:
      "See the range from coaching distance to defined fractional responsibility.",
  },
  ...WORKING_FORMATS.map((format) => ({
    href: format.href,
    label: format.title,
    description: `${format.responsibility} ${format.signal}`,
  })),
] as const satisfies readonly NavigationLink[];

export const insightNavigation = [
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
    label: "When fractional leadership fits",
    description:
      "Recognise when the agenda needs an owner before it needs a permanent hire.",
  },
  {
    href: "/blog/executive-coaching-advisory-or-assessment",
    label: "Choose the right level of help",
    description:
      "Use ownership and uncertainty to choose a proportionate response.",
  },
] as const satisfies readonly NavigationLink[];

export const aboutNavigation = [
  {
    href: "/about",
    label: "About me",
    description:
      "See how I work between coaching, advice and defined responsibility.",
  },
  {
    href: "/results",
    label: "Results & experience",
    description: "Review the kinds of responsibility I have carried.",
  },
  {
    href: "/contact",
    label: "Contact & booking",
    description: "Book the free conversation or send me a note.",
  },
] as const satisfies readonly NavigationLink[];

export const headerNavigation = [
  {
    id: "work",
    label: "How I help",
    href: "/services",
    description: "Choose how involved I should be after we understand the issue.",
    items: serviceNavigation,
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

export const primaryNavigation = headerNavigation.map(({ href, label }) => ({
  href,
  label,
}));
