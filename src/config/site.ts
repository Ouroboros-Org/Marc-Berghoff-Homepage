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

export const primaryNavigation = [
  { href: "/services", label: "Services" },
  { href: "/bottleneck-assessment", label: "The assessment" },
  { href: "/results", label: "Results" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
] as const;

export const serviceNavigation = [
  { href: "/services", label: "All services" },
  { href: "/bottleneck-assessment", label: "Bottleneck assessment" },
  { href: "/advisory", label: "Strategic people advisory" },
  {
    href: "/fractional-people-leadership",
    label: "Fractional people leadership",
  },
  { href: "/executive-coaching", label: "Executive coaching" },
] as const;
