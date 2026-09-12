"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className,
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  variant?: "rise" | "fade";
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (
      !element ||
      motionPreference.matches ||
      !window.IntersectionObserver ||
      !element.animate
    ) {
      return;
    }

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        if (motionPreference.matches) return;

        // The server render stays visible; motion is only an entrance enhancement.
        animation = element.animate(
          [
            { opacity: 0.65, transform: variant === "rise" ? "translateY(12px)" : "none" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 540, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
        );
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    const stopMotion = () => {
      if (motionPreference.matches) {
        animation?.cancel();
        observer.disconnect();
      }
    };

    observer.observe(element);
    motionPreference.addEventListener("change", stopMotion);
    return () => {
      observer.disconnect();
      animation?.cancel();
      motionPreference.removeEventListener("change", stopMotion);
    };
  }, [variant]);

  return <div className={className} ref={elementRef}>{children}</div>;
}
