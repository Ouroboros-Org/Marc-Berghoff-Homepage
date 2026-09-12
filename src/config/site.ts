import { getRouteHref, type SiteLocale } from "@/config/routes";
import { ENGAGEMENTS } from "@/content/engagements";
const DEFAULT_SITE_URL = "https://marcberghoff.com";
const DEFAULT_CONTACT_EMAIL = "contact@marcberghoff.com";
const PUBLIC_URL_PLACEHOLDER = /YOUR_|REPLACE/i;
function parsePublicUrl(configured: string | null | undefined) {
    const candidate = configured?.trim();
    if (!candidate || PUBLIC_URL_PLACEHOLDER.test(candidate)) {
        return null;
    }
    try {
        const url = new URL(candidate);
        if ((url.protocol !== "http:" && url.protocol !== "https:") ||
            url.username ||
            url.password) {
            return null;
        }
        return url;
    }
    catch {
        return null;
    }
}
function parseVercelUrl(configured: string | null | undefined) {
    const candidate = configured?.trim();
    if (!candidate)
        return null;
    return parsePublicUrl(candidate.startsWith("http://") || candidate.startsWith("https://")
        ? candidate
        : `https://${candidate}`);
}
export function getSiteUrl(configured: string | null | undefined = process.env.NEXT_PUBLIC_SITE_URL, vercelProductionUrl: string | null | undefined = process.env
    .VERCEL_PROJECT_PRODUCTION_URL, vercelDeploymentUrl: string | null | undefined = process.env.VERCEL_URL) {
    const stableVercelUrl = [vercelProductionUrl, vercelDeploymentUrl]
        .map(parseVercelUrl)
        .find((url) => url && !url.hostname.endsWith(".vercel.app"));
    return (parsePublicUrl(configured)?.origin ??
        stableVercelUrl?.origin ??
        DEFAULT_SITE_URL);
}
export function getCalLink(configured = process.env.NEXT_PUBLIC_CAL_LINK) {
    const candidate = configured?.trim().replace(/^\/+|\/+$/g, "");
    if (!candidate ||
        PUBLIC_URL_PLACEHOLDER.test(candidate) ||
        candidate.includes("..") ||
        !/^[a-zA-Z0-9._~-]+(?:\/[a-zA-Z0-9._~-]+)*$/.test(candidate)) {
        return null;
    }
    return candidate;
}
export function getContactEmail(configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL) {
    const candidate = configured?.trim();
    if (!candidate ||
        PUBLIC_URL_PLACEHOLDER.test(candidate) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)) {
        return DEFAULT_CONTACT_EMAIL;
    }
    return candidate;
}
export type PrimaryContactAction = {
    href: string;
    label: string;
    isBooking: boolean;
};
export function getPrimaryContactAction(locale: SiteLocale = "en"): PrimaryContactAction {
    return {
        href: getRouteHref("contact", locale, "#booking"),
        label: "Book a call",
        isBooking: true,
    };
}
export function getContactPhone(configured = process.env.NEXT_PUBLIC_CONTACT_PHONE) {
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
    descriptor: "Fractional CPO · People & organisation",
    description: "Work with me as your Fractional CPO (Chief People Officer) or strategic people adviser. Support for your people, leadership and organisation as you grow.",
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
export function getServiceNavigation(locale: SiteLocale = "en") {
    return [
        { href: getRouteHref("services", locale), label: "How I can help", description: "Three ways to work together. Start wherever you need support." },
        ...ENGAGEMENTS.map(({ href, title, situation }) => ({ href, label: title, description: situation })),
    ] satisfies readonly NavigationLink[];
}
export const serviceNavigation = getServiceNavigation("en");
const insightNavigation = [
    {
        href: "/blog",
        label: "All insights",
        description: "Explore questions about your people, leadership and organisation.",
    },
    {
        href: "/blog/founder-bottleneck-or-operating-model",
        label: "When work returns to the founder",
        description: "Look at why decisions return to you and what would help your team carry them.",
    },
    {
        href: "/blog/role-clarity-is-not-a-job-description",
        label: "Role clarity beyond job descriptions",
        description: "Clarify who decides and how people work together.",
    },
    {
        href: "/blog/when-fractional-people-leadership-makes-sense",
        label: "When a Fractional CPO fits",
        description: "Compare ongoing advice, an agreed CPO remit and a permanent hire.",
    },
    {
        href: "/blog/executive-coaching-advisory-or-assessment",
        label: "Choosing the right engagement",
        description: "Understand the difference between assessment, focused advice and ongoing support.",
    },
] as const satisfies readonly NavigationLink[];
const aboutNavigation = [
    {
        href: "/about",
        label: "About me",
        description: "Get to know me, my experience and how I work.",
    },
    {
        href: "/results",
        label: "Selected work",
        description: "See examples of my work and hear from clients.",
    },
    {
        href: "/contact",
        label: "Contact & booking",
        description: "Start with a free conversation or a short note.",
    },
] as const satisfies readonly NavigationLink[];
export function getHeaderNavigation(locale: SiteLocale = "en"): readonly HeaderNavigationGroup[] {
    return [
        {
            id: "work",
            label: "How I can help",
            href: getRouteHref("services", "en"),
            description: "Choose the support your people, leadership and organisation need.",
            items: getServiceNavigation(locale),
        },
        {
            id: "insights",
            label: "Insights",
            href: "/blog",
            description: "Read practical ideas for the people and leadership decisions ahead of you.",
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
