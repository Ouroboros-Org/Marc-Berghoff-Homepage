import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import styles from "./button.module.css";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverse"
  | "ghost"
  | "text";

export type ButtonSize = "compact" | "default" | "wide" | "icon";

type SharedButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  cta?: boolean;
  className?: string;
};

function buttonClasses({
  variant = "primary",
  size = "default",
  cta = false,
  className,
}: Omit<SharedButtonProps, "children">) {
  return cn(
    styles.button,
    styles[variant],
    styles[size],
    cta && styles.cta,
    className,
  );
}

export type ButtonProps = SharedButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedButtonProps>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "default",
    cta = false,
    className,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      {...props}
      className={buttonClasses({ variant, size, cta, className })}
      ref={ref}
      type={type}
    >
      <span className={styles.content}>{children}</span>
    </button>
  );
});

type ButtonLinkOwnProps = SharedButtonProps & {
  href: string;
  external?: boolean;
  icon?: ReactNode | false;
};

export type ButtonLinkProps = ButtonLinkOwnProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonLinkOwnProps | "href"
  > &
  Pick<LinkProps, "prefetch" | "replace" | "scroll" | "shallow">;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "default",
  cta = false,
  external = false,
  icon,
  className,
  prefetch,
  replace,
  scroll,
  shallow,
  target,
  rel,
  ...anchorProps
}: ButtonLinkProps) {
  const trailingIcon =
    icon === false
      ? null
      : (icon ??
        (external ? (
          <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.9} />
        ) : (
          <ArrowRight aria-hidden="true" size={18} strokeWidth={1.9} />
        )));
  const classes = buttonClasses({ variant, size, cta, className });
  const content = (
    <span className={styles.content}>
      {children}
      {trailingIcon}
    </span>
  );

  if (external) {
    return (
      <a
        {...anchorProps}
        className={classes}
        href={href}
        rel={rel ?? "noreferrer"}
        target={target ?? "_blank"}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      {...anchorProps}
      className={classes}
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
    >
      {content}
    </Link>
  );
}

