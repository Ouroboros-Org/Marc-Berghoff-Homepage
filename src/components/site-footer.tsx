import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { getRouteHref, type SiteLocale } from "@/config/routes";
import {
  getPrimaryContactAction,
  getServiceNavigation,
  siteConfig,
} from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteFooter({ locale = "en" }: { locale?: SiteLocale }) {
  const contactAction = getPrimaryContactAction(locale);
  const serviceNavigation = getServiceNavigation(locale);
  const isGerman = locale === "de";
  const explore: Array<{ href: string; label: string; language?: SiteLocale }> = isGerman
    ? [
        {
          href: getRouteHref("results", "de"),
          label: "Ausgewählte Arbeit",
        },
        { href: "/blog", label: "Einblicke (Englisch)", language: "en" },
        { href: getRouteHref("about", "de"), label: "Über mich" },
      ]
    : [
        { href: "/results", label: "Selected work" },
        { href: "/blog", label: "Insights" },
        { href: "/about", label: "About me" },
      ];

  return (
    <footer className="site-footer">
      <div className="site-footer__primary">
        <div className="site-footer__intro">
          <SiteLogo inverse locale={locale} />
          <p>
            {isGerman
              ? "Beginnen Sie mit dem, was passiert. Meine Rolle legen wir nach dem ersten Gespräch fest."
              : "Start with what is happening. We can decide my level of involvement after the first conversation."}
          </p>
        </div>

        <div className="site-footer__nav">
          <div>
            <p className="footer-label">{isGerman ? "Mehr" : "Explore"}</p>
            {explore.map((item) => (
              <Link
                href={item.href}
                hrefLang={item.language}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <p className="footer-label">
              {isGerman ? "Zusammenarbeit" : "How I can help"}
            </p>
            {serviceNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-footer__contact">
          <p className="footer-label">{isGerman ? "Hier beginnen" : "Start here"}</p>
          <Link href={contactAction.href}>{contactAction.label}</Link>
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          {siteConfig.contact.phoneHref && siteConfig.contact.phoneDisplay ? (
            <a href={`tel:${siteConfig.contact.phoneHref}`}>
              {siteConfig.contact.phoneDisplay}
            </a>
          ) : null}
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
            <ArrowUpRight aria-hidden="true" size={16} />
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Marc Berghoff</span>
        <div>
          <Link
            href={getRouteHref("privacy", locale)}
            hrefLang={isGerman ? "de" : "en"}
          >
            {isGerman ? "Datenschutz" : "Privacy"}
          </Link>
          <Link
            href={getRouteHref("imprint", locale)}
            hrefLang={isGerman ? "de" : "en"}
          >
            {isGerman ? "Impressum" : "Imprint"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
