import { getRouteHref, type SiteLocale } from "@/config/routes";
import { siteConfig } from "@/config/site";
type SiteLogoProps = {
    inverse?: boolean;
    locale?: SiteLocale;
};
export function SiteLogo({ inverse = false, locale = "en" }: SiteLogoProps) {
    return (
    // A full navigation clears diagnostic query, hash and client-side form state.
    <a href={getRouteHref("home", locale)} className="site-logo" aria-label={"Marc Berghoff, home"} data-inverse={inverse || undefined}>
      <span className="site-logo__mark" aria-hidden="true"/>
      <span className="site-logo__copy">
        <span className="site-logo__name">Marc Berghoff</span>
        <span className="site-logo__descriptor">
          {siteConfig.descriptor}
        </span>
      </span>
    </a>);
}
