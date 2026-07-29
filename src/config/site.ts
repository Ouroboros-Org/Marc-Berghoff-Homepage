const LOCAL_SITE_URL = "http://localhost:3000";
const PUBLIC_URL_PLACEHOLDER = /YOUR_DOMAIN|REPLACE/i;

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
  vercelProductionUrl: string | null | undefined =
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
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

export const siteConfig = {
  name: "Marc Berghoff",
  descriptor: "MSc Psychology · people adviser · coach",
  description:
    "Marc Berghoff helps founders and leadership teams find the organisational bottleneck slowing execution and decide what to fix first.",
  contact: {
    email: "m.berghoff@hx-solutions.de",
    phoneDisplay: "+356 7952 4891",
    phoneHref: "+35679524891",
    bookingUrl: getBookingUrl(),
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
    description: "Compare the four ways Marc can support a live business question.",
  },
  {
    href: "/bottleneck-assessment",
    label: "Bottleneck assessment",
    description: "Find the main organisational constraint before choosing an intervention.",
  },
  {
    href: "/advisory",
    label: "Strategic people advisory",
    description: "Work through a defined people or organisation decision with an outside view.",
  },
  {
    href: "/fractional-people-leadership",
    label: "Fractional people leadership",
    description: "Add temporary senior ownership while the permanent capability takes shape.",
  },
  {
    href: "/executive-coaching",
    label: "Executive coaching",
    description: "Confidential one-to-one work on a decision or leadership pattern.",
  },
] as const satisfies readonly NavigationLink[];

export const assessmentNavigation = [
  {
    href: "/bottleneck-assessment",
    label: "The assessment",
    description: "See the scope, process, fee and six-question directional check.",
  },
  {
    href: "/results",
    label: "Results & experience",
    description: "Review selected operating, advisory and coaching experience.",
  },
  {
    href: "/sample-report",
    label: "Sample report structure",
    description: "See how the written finding and evidence are organised.",
  },
] as const satisfies readonly NavigationLink[];

export const insightNavigation = [
  {
    href: "/blog",
    label: "All insights",
    description: "Articles on organisational bottlenecks, decision rights and leadership work.",
  },
  {
    href: "/blog/founder-bottleneck-or-operating-model",
    label: "Founder bottleneck or operating model?",
    description: "Distinguish personal delegation problems from structural ambiguity.",
  },
  {
    href: "/blog/role-clarity-is-not-a-job-description",
    label: "Role clarity beyond job descriptions",
    description: "Look at decisions, hand-offs and working agreements rather than documents alone.",
  },
  {
    href: "/blog/when-fractional-people-leadership-makes-sense",
    label: "When fractional leadership fits",
    description: "Recognise when the agenda needs an owner before it needs a permanent hire.",
  },
  {
    href: "/blog/executive-coaching-advisory-or-assessment",
    label: "Coaching, advisory or assessment?",
    description: "Choose a proportionate format based on where the uncertainty sits.",
  },
] as const satisfies readonly NavigationLink[];

export const aboutNavigation = [
  {
    href: "/about",
    label: "About Marc",
    description: "Read about Marc's psychology, operator and coaching background.",
  },
  {
    href: "/contact/message",
    label: "Send a quick message",
    description: "Use the short form when a few lines are enough.",
  },
  {
    href: "/contact",
    label: "Detailed enquiry",
    description: "Share company context, timing and the outcome you need.",
  },
] as const satisfies readonly NavigationLink[];

export const headerNavigation = [
  {
    id: "services",
    label: "Services",
    href: "/services",
    description: "Choose the format that matches the question.",
    items: serviceNavigation,
  },
  {
    id: "assessment",
    label: "Assessment & proof",
    href: "/bottleneck-assessment",
    description: "Understand the diagnostic, its output and the experience behind it.",
    items: assessmentNavigation,
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
    label: "About & contact",
    href: "/about",
    description: "Meet Marc or choose the right way to get in touch.",
    items: aboutNavigation,
  },
] as const;

export const primaryNavigation = headerNavigation.map(({ href, label }) => ({
  href,
  label,
}));
