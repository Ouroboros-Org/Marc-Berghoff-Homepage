import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "./button";
import { getRouteHref, type SiteLocale } from "@/config/routes";
import { getPrimaryContactAction, getServiceNavigation, siteConfig, } from "@/config/site";
import { SiteLogo } from "./site-logo";
export function SiteFooter({ locale = "en" }: {
    locale?: SiteLocale;
}) {
    const contactAction = getPrimaryContactAction(locale);
    const serviceNavigation = getServiceNavigation(locale);
    const explore: Array<{
        href: string;
        label: string;
        language?: SiteLocale;
    }> = [
        { href: "/results", label: "Selected work" },
        { href: "/blog", label: "Insights" },
        { href: "/about", label: "About me" },
    ];
    return (<footer className="site-footer">
      <div className="site-footer__primary">
        <div className="site-footer__intro">
          <SiteLogo locale={locale}/>
          <p>
            {"Start with what is happening. We can decide my level of involvement after the first conversation."}
          </p>
        </div>

        <div className="site-footer__nav">
          <div>
            <p className="footer-label">{"Explore"}</p>
            {explore.map((item) => (<Link href={item.href} hrefLang={item.language} key={item.href}>
                {item.label}
              </Link>))}
          </div>
          <div>
            <p className="footer-label">
              {"How I can help"}
            </p>
            {serviceNavigation.map((item) => (<Link key={item.href} href={item.href}>
                {item.label}
              </Link>))}
          </div>
        </div>

        <div className="site-footer__contact">
          <p className="footer-label">{"Start here"}</p>
          <ButtonLink className="site-footer__booking" href={contactAction.href} size="compact">{contactAction.label}</ButtonLink>
          <Link href="/self-check">Self-check</Link>
          <a href={`mailto:${siteConfig.contact.email}`}>
            {siteConfig.contact.email}
          </a>
          {siteConfig.contact.phoneHref && siteConfig.contact.phoneDisplay ? (<a href={`tel:${siteConfig.contact.phoneHref}`}>
              {siteConfig.contact.phoneDisplay}
            </a>) : null}
          <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
            <ArrowUpRight aria-hidden="true" size={16}/>
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Marc Berghoff</span>
        <div>
          <Link href={getRouteHref("privacy", locale)} hrefLang={"en"}>
            {"Privacy"}
          </Link>
          <Link href={getRouteHref("imprint", locale)} hrefLang={"en"}>
            {"Imprint"}
          </Link>
        </div>
      </div>
    </footer>);
}
