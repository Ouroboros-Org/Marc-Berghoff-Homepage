import Link from "next/link";

type SiteLogoProps = {
  inverse?: boolean;
};

export function SiteLogo({ inverse = false }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className="site-logo"
      aria-label="Marc Berghoff, home"
      data-inverse={inverse || undefined}
    >
      <span className="site-logo__mark" aria-hidden="true" />
      <span className="site-logo__copy">
        <span className="site-logo__name">Marc Berghoff</span>
        <span className="site-logo__descriptor">Fractional leadership</span>
      </span>
    </Link>
  );
}
