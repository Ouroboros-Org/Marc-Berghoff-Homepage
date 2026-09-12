import { observeFirstAppearance } from "./first-appearance";

export type RevealVariant = "rise" | "fade";

export function startReveal(
  element: HTMLElement,
  variant: RevealVariant,
  delay = 0,
): () => void {
  const showFinal = () => element.removeAttribute("data-reveal-state");
  if (typeof element.animate !== "function") {
    showFinal();
    return showFinal;
  }

  return observeFirstAppearance(element, {
    prepare: () => element.setAttribute("data-reveal-state", "pending"),
    play: (finish) => {
      const animation = element.animate(
        [
          {
            opacity: 0,
            transform: variant === "rise" ? "translate3d(0, 18px, 0)" : "none",
          },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 720,
          delay: Math.min(180, Math.max(0, Number.isFinite(delay) ? delay : 0)),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
        },
      );
      element.setAttribute("data-reveal-state", "running");
      animation.addEventListener("finish", finish, { once: true });
      return () => {
        animation.removeEventListener("finish", finish);
        animation.cancel();
      };
    },
    finish: showFinal,
  });
}
