import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import styles from "./breadcrumbs.module.css";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
}) {
  const trail: readonly BreadcrumbItem[] = [
    { label: "Home", href: "/" },
    ...items,
  ];

  return (
    <nav className={cn(styles.breadcrumbs, className)} aria-label="Breadcrumb">
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

