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
  descriptor: "Fractional leadership · advisory · coaching",
  description:
    "I work with founders and leadership teams on people and organisation questions through fractional leadership, advisory, assessment and coaching.",
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
    label: "All services",
    description:
      "Compare how I can own a remit, challenge a decision, assess or coach.",
  },
  {
    href: "/fractional-people-leadership",
    label: "Fractional leadership",
    description:
      "Give an agreed part of the people agenda a senior owner.",
  },
  {
    href: "/advisory",
    label: "Strategic people advisory",
    description:
      "Test a difficult people or organisation decision with an outside view.",
  },
  {
    href: "/bottleneck-assessment",
    label: "Bottleneck Assessment",
    description:
      "Investigate a recurring problem when the cause is still disputed.",
  },
  {
    href: "/executive-coaching",
    label: "Individual coaching",
    description:
      "Private work on a live situation and the part that belongs with one leader.",
  },
  {
    href: "/group-coaching",
    label: "Group coaching",
    description: "Read what has been decided about the group format so far.",
  },
] as const satisfies readonly NavigationLink[];

export const insightNavigation = [
  {
    href: "/blog",
    label: "All insights",
    description:
      "Articles on organisational bottlenecks, decision rights and leadership work.",
  },
  {
    href: "/blog/founder-bottleneck-or-operating-model",
    label: "Founder bottleneck or operating model?",
    description:
      "Distinguish personal delegation problems from structural ambiguity.",
  },
  {
    href: "/blog/role-clarity-is-not-a-job-description",
    label: "Role clarity beyond job descriptions",
    description:
      "Look at decisions, hand-offs and working agreements rather than documents alone.",
  },
  {
    href: "/blog/when-fractional-people-leadership-makes-sense",
    label: "When fractional leadership fits",
    description:
      "Recognise when the agenda needs an owner before it needs a permanent hire.",
  },
  {
    href: "/blog/executive-coaching-advisory-or-assessment",
    label: "Coaching, advisory or assessment?",
    description:
      "Choose a proportionate format based on where the uncertainty sits.",
  },
] as const satisfies readonly NavigationLink[];

export const aboutNavigation = [
  {
    href: "/about",
    label: "About me",
    description:
      "Read about my psychology, operator and coaching background.",
  },
  {
    href: "/results",
    label: "Results & experience",
    description: "Review selected operating, advisory and coaching experience.",
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
    label: "Work with me",
    href: "/services",
    description: "Start with the responsibility the business needs someone to carry.",
    items: serviceNavigation,
  },
  {
    id: "insights",
    label: "Insights",
    href: "/blog",
    description: "Read practical notes on recurring organisational problems.",
    items: insightNavigation,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    description: "Read about my work, see selected experience or get in touch.",
    items: aboutNavigation,
  },
] as const;

export const primaryNavigation = headerNavigation.map(({ href, label }) => ({
  href,
  label,
}));
