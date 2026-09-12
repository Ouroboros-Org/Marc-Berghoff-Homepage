"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

import { startReveal, type RevealVariant } from "./motion/reveal-animation";
import styles from "./motion/motion.module.css";

export function Reveal({
  children,
  className,
  variant = "rise",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (element) return startReveal(element, variant, delay);
  }, [variant, delay]);

  return (
    <div className={cn(styles.reveal, className)} data-reveal-variant={variant} ref={elementRef}>
      {children}
    </div>
  );
}
