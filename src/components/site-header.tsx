"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Button, ButtonLink } from "@/components/button";
import { headerNavigation, siteConfig } from "@/config/site";

import { SiteLogo } from "./site-logo";

type PathBoundState = { value: string; pathname: string } | null;

export function isCurrentNavigationPage(pathname: string, href: string) {
  return pathname === href;
}

export function getActiveHeaderGroupId(pathname: string) {
  const containsPath = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    headerNavigation.find((group) => containsPath(group.href))?.id ??
    headerNavigation.find((group) =>
      group.items.some((item) => containsPath(item.href)),
    )?.id ??
    null
  );
}

export function isCurrentHeaderItem(
  pathname: string,
  groupId: string,
  href: string,
) {
  return (
    getActiveHeaderGroupId(pathname) === groupId &&
    isCurrentNavigationPage(pathname, href)
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M20.451 20.45h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.355V9h3.414v1.561h.047c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.284zM5.337 7.433a2.063 2.063 0 1 1 0-4.126 2.063 2.063 0 0 1 0 4.126zM7.114 20.45H3.56V9h3.554v11.45zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileState, setMobileState] = useState<PathBoundState>(null);
  const [desktopMenuState, setDesktopMenuState] = useState<PathBoundState>(null);
  const [mobileSectionState, setMobileSectionState] = useState<PathBoundState>(null);
  const mobileOpen = mobileState?.pathname === pathname;
  const openDesktopMenu =
    desktopMenuState?.pathname === pathname ? desktopMenuState.value : null;
  const openMobileSection =
    mobileSectionState?.pathname === pathname ? mobileSectionState.value : null;
  const headerRef = useRef<HTMLElement>(null);
  const firstMobileControlRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeGroupId = getActiveHeaderGroupId(pathname);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 54.001rem)");
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileState(null);
    };

    desktopQuery.addEventListener("change", closeAtDesktop);
    return () => desktopQuery.removeEventListener("change", closeAtDesktop);
  }, []);

  useEffect(() => {
    if (!openDesktopMenu) return;

    const closeDesktopMenu = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setDesktopMenuState(null);
      }
    };
    const onDesktopKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const menuId = openDesktopMenu;
      setDesktopMenuState(null);
      headerRef.current
        ?.querySelector<HTMLElement>(`[data-menu-trigger="${menuId}"]`)
        ?.focus();
    };

    window.addEventListener("pointerdown", closeDesktopMenu);
    window.addEventListener("keydown", onDesktopKeyDown);
    return () => {
      window.removeEventListener("pointerdown", closeDesktopMenu);
      window.removeEventListener("keydown", onDesktopKeyDown);
    };
  }, [openDesktopMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

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
    firstMobileControlRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileState(null);
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
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header"
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) {
          setDesktopMenuState(null);
          setMobileState(null);
        }
      }}
    >
      <div className="site-header__inner">
        <SiteLogo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          {headerNavigation.map((group) => {
            const open = openDesktopMenu === group.id;
            const active = activeGroupId === group.id;
            return (
              <div className="desktop-nav__group" key={group.id}>
                <Button
                  aria-controls={`desktop-submenu-${group.id}`}
                  aria-expanded={open}
                  className="desktop-nav__trigger"
                  data-active={active || undefined}
                  data-menu-trigger={group.id}
                  onClick={() =>
                    setDesktopMenuState((current) =>
                      current?.pathname === pathname && current.value === group.id
                        ? null
                        : { value: group.id, pathname },
                    )
                  }
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    setDesktopMenuState({ value: group.id, pathname });
                    window.requestAnimationFrame(() => {
                      headerRef.current
                        ?.querySelector<HTMLElement>(
                          `#desktop-submenu-${group.id} a[href]`,
                        )
                        ?.focus();
                    });
                  }}
                  size="compact"
                  variant="text"
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    className="desktop-nav__chevron"
                    size={15}
                  />
                </Button>
              </div>
            );
          })}
        </nav>

        <ButtonLink
          aria-label="Open Marc Berghoff's LinkedIn profile"
          className="header-social"
          external
          href={siteConfig.social.linkedin}
          icon={false}
          size="icon"
          variant="ghost"
        >
          <LinkedInIcon />
        </ButtonLink>

        <ButtonLink
          className="header-cta"
          cta
          href="/contact#booking"
          size="compact"
        >
          Book a conversation
        </ButtonLink>

        <Button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          className="mobile-menu-button"
          onClick={() =>
            setMobileState((current) =>
              current?.pathname === pathname ? null : { value: "open", pathname },
            )
          }
          ref={menuButtonRef}
          size="icon"
          variant="ghost"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {headerNavigation.map((group) =>
        openDesktopMenu === group.id ? (
          <div
            className="desktop-submenu"
            id={`desktop-submenu-${group.id}`}
            key={group.id}
          >
            <div className="desktop-submenu__inner">
              <div className="desktop-submenu__intro">
                <p className="desktop-submenu__eyebrow">{group.label}</p>
                <p className="desktop-submenu__title">{group.description}</p>
              </div>
              <nav
                aria-label={`${group.label} pages`}
                className="desktop-submenu__links"
              >
                {group.items.map((item) => (
                  <Link
                    aria-current={
                      isCurrentHeaderItem(pathname, group.id, item.href)
                        ? "page"
                        : undefined
                    }
                    className="desktop-submenu__link"
                    href={item.href}
                    key={item.href}
                  >
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        ) : null,
      )}

      <div
        aria-hidden={!mobileOpen}
        className="mobile-nav"
        data-open={mobileOpen || undefined}
        id="mobile-navigation"
      >
        <nav className="mobile-nav__inner" aria-label="Mobile navigation">
          <p className="mobile-nav__eyebrow">Explore</p>
          {headerNavigation.map((group, index) => {
            const sectionOpen = openMobileSection === group.id;
            const active = activeGroupId === group.id;
            return (
              <div className="mobile-nav__section" key={group.id}>
                <Button
                  aria-controls={`mobile-submenu-${group.id}`}
                  aria-expanded={sectionOpen}
                  className="mobile-nav__section-trigger"
                  data-active={active || undefined}
                  onClick={() =>
                    setMobileSectionState((current) =>
                      current?.pathname === pathname && current.value === group.id
                        ? null
                        : { value: group.id, pathname },
                    )
                  }
                  ref={index === 0 ? firstMobileControlRef : undefined}
                  tabIndex={mobileOpen ? 0 : -1}
                  variant="text"
                >
                  <span className="mobile-nav__index">0{index + 1}</span>
                  <span>{group.label}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className="mobile-nav__chevron"
                    size={19}
                  />
                </Button>
                <div
                  aria-hidden={!sectionOpen}
                  className="mobile-nav__submenu"
                  data-open={sectionOpen || undefined}
                  id={`mobile-submenu-${group.id}`}
                >
                  <div className="mobile-nav__submenu-inner">
                    {group.items.map((item) => (
                      <Link
                        aria-current={
                          isCurrentHeaderItem(pathname, group.id, item.href)
                            ? "page"
                            : undefined
                        }
                        className="mobile-nav__link"
                        href={item.href}
                        key={item.href}
                        tabIndex={mobileOpen && sectionOpen ? 0 : -1}
                      >
                        <span>{item.label}</span>
                        <small>{item.description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mobile-nav__actions">
            <ButtonLink
              cta
              href="/contact#booking"
              size="wide"
              tabIndex={mobileOpen ? 0 : -1}
            >
              Book a free conversation
            </ButtonLink>
            <ButtonLink
              href="/contact#contact-form"
              size="wide"
              tabIndex={mobileOpen ? 0 : -1}
              variant="secondary"
            >
              Send me a note
            </ButtonLink>
            <ButtonLink
              aria-label="Open Marc Berghoff's LinkedIn profile"
              className="mobile-nav__social"
              external
              href={siteConfig.social.linkedin}
              icon={false}
              size="icon"
              tabIndex={mobileOpen ? 0 : -1}
              variant="ghost"
            >
              <LinkedInIcon size={21} />
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
