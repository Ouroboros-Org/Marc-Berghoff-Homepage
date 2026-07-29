"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const open = openOnPath === pathname;
  const headerRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (href === "/services" &&
      ["/advisory", "/fractional-people-leadership", "/executive-coaching"].includes(
        pathname,
      ));

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 54.001rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpenOnPath(null);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>("main, footer"),
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    document.body.style.overflow = "hidden";
    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenOnPath(null);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const focusable = Array.from(
          headerRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter(
          (element) =>
            element.offsetParent !== null &&
            element.getAttribute("aria-hidden") !== "true",
        );

        const first = focusable.at(0);
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      backgroundState.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", ariaHidden);
      });
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="site-header"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) setOpenOnPath(null);
      }}
    >
      <div className="site-header__inner">
        <SiteLogo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {primaryNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="desktop-nav__link"
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/contact" className="button button--compact header-cta">
          Request a conversation
          <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() =>
            setOpenOnPath((current) => (current === pathname ? null : pathname))
          }
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className="mobile-nav"
        data-open={open || undefined}
        aria-hidden={!open}
      >
        <nav className="mobile-nav__inner" aria-label="Mobile navigation">
          {primaryNavigation.map((item, index) => (
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              key={item.href}
              href={item.href}
              className="mobile-nav__link"
              tabIndex={open ? 0 : -1}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="button mobile-nav__cta"
            tabIndex={open ? 0 : -1}
          >
            Request a conversation
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
