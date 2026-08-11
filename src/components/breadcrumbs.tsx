import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { getRouteHref, type SiteLocale } from "@/config/routes";
import { cn } from "@/lib/utils";

import styles from "./breadcrumbs.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
  locale = "en",
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
  locale?: SiteLocale;
}) {
  const trail: readonly BreadcrumbItem[] = [
    {
      label: locale === "de" ? "Startseite" : "Home",
      href: getRouteHref("home", locale),
    },
    ...items,
  ];

  return (
    <nav
      className={cn(styles.breadcrumbs, className)}
      aria-label={locale === "de" ? "Brotkrümelnavigation" : "Breadcrumb"}
    >
      <ol>
        {trail.map((item, index) => {
          const current = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`}>
              {index > 0 ? (
                <ChevronRight aria-hidden="true" size={14} strokeWidth={1.8} />
              ) : null}
              {item.href && !current ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current={current ? "page" : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
