import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  serviceNavigation,
  siteConfig,
} from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteFooter() {
  const contactAction = siteConfig.contact.primaryAction;

  return (
    <footer className="site-footer">
      <div className="site-footer__primary">
        <div className="site-footer__intro">
          <SiteLogo inverse />
          <p>
            Start with what is happening. We can choose my level of involvement
            after the first conversation.
          </p>
        </div>

        <div className="site-footer__nav">
          <div>
            <p className="footer-label">Explore</p>
            {[
              { href: "/results", label: "Results & experience" },
              { href: "/sample-report", label: "Sample report" },
              { href: "/blog", label: "Insights" },
              { href: "/about", label: "About me" },
            ].map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
          </div>
          <div>
            <p className="footer-label">How I can help</p>
            {serviceNavigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="site-footer__contact">
          <p className="footer-label">Start here</p>
          <Link href={contactAction.href}>{contactAction.label}</Link>
          {contactAction.isBooking ? (
            <Link href="/contact#contact-form">Send me a note</Link>
          ) : null}
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
          <Link href="/privacy">Privacy</Link>
          <Link href="/imprint">Imprint</Link>
        </div>
      </div>
    </footer>
  );
}
