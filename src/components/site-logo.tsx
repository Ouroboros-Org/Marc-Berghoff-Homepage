type SiteLogoProps = {
  inverse?: boolean;
};

export function SiteLogo({ inverse = false }: SiteLogoProps) {
  return (
    // A full navigation clears diagnostic query, hash and client-side form state.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/"
      className="site-logo"
      aria-label="Marc Berghoff, home"
      data-inverse={inverse || undefined}
    >
      <span className="site-logo__mark" aria-hidden="true" />
      <span className="site-logo__copy">
        <span className="site-logo__name">Marc Berghoff</span>
        <span className="site-logo__descriptor">Leadership · organisation · coaching</span>
      </span>
    </a>
  );
}
