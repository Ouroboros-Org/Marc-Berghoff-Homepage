"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { observeFirstAppearance } from "./motion/first-appearance";
import { startOutcomeCount } from "./motion/outcome-count";
import styles from "./motion/motion.module.css";

export function OutcomeNumber({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const number = numberRef.current;
    if (!element || !number) return;

    return observeFirstAppearance(element, {
      initiallyVisible: "animate",
      prepare: () => element.setAttribute("data-count-state", "pending"),
      play: (finish) => {
        element.removeAttribute("data-count-state");
        return startOutcomeCount(number, value, finish);
      },
      finish: () => {
        element.removeAttribute("data-count-state");
        number.textContent = value;
      },
    });
  }, [value]);

  return (
    <span className={cn(styles.number, className)} ref={elementRef}>
      <span className={styles.accessible}>{value}</span>
      <span aria-hidden="true" className={styles.visual}>
        <span className={styles.sizer}>{value}</span>
        <span className={styles.value} ref={numberRef}>{value}</span>
      </span>
    </span>
  );
}
