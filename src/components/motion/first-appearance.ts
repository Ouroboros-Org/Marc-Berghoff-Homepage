type AppearanceOptions = {
  initiallyVisible?: "skip" | "animate";
  prepare: () => void;
  play: (finish: () => void) => (() => void) | void;
  finish: () => void;
};

export function observeFirstAppearance(
  element: HTMLElement,
  options: AppearanceOptions,
): () => void {
  let settled = false;
  let started = false;
  let stopPlayback: (() => void) | void;
  let observer: IntersectionObserver | undefined;
  const preference =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : undefined;

  const finish = () => {
    if (settled) return;
    settled = true;
    observer?.disconnect();
    stopPlayback?.();
    preference?.removeEventListener("change", onPreferenceChange);
    element.removeEventListener("focusin", finish);
    options.finish();
  };
  const onPreferenceChange = () => {
    if (preference?.matches) finish();
  };

  if (
    !preference ||
    typeof window.IntersectionObserver !== "function"
  ) {
    finish();
    return finish;
  }

  const bounds = element.getBoundingClientRect();
  const isBelowViewport = bounds.top >= window.innerHeight;
  if (
    preference.matches ||
    bounds.bottom <= 0 ||
    (!isBelowViewport && options.initiallyVisible !== "animate")
  ) {
    finish();
    return finish;
  }

  const play = () => {
    if (started || settled) return;
    started = true;
    observer?.disconnect();
    if (preference?.matches) {
      finish();
      return;
    }

    try {
      const stop = options.play(finish);
      if (settled) stop?.();
      else stopPlayback = stop;
    } catch {
      // Optional motion must never leave the server-rendered content hidden.
      finish();
    }
  };

  try {
    observer = new window.IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.target === element && entry.isIntersecting)) {
          play();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    preference.addEventListener("change", onPreferenceChange);
    element.addEventListener("focusin", finish);
    // Never hide content already visible after hydration or scroll restoration.
    if (isBelowViewport) options.prepare();
    observer.observe(element);
  } catch {
    finish();
  }

  return finish;
}
