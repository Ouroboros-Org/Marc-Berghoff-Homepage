import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { OutcomeNumber } from "../outcome-number";
import { Reveal } from "../reveal";
import { observeFirstAppearance } from "./first-appearance";
import { startOutcomeCount } from "./outcome-count";
import { startReveal } from "./reveal-animation";

class TestObserver {
  static instances: TestObserver[] = [];
  readonly observe = vi.fn();
  readonly disconnect = vi.fn();

  constructor(
    private readonly callback: IntersectionObserverCallback,
    readonly options: IntersectionObserverInit,
  ) {
    TestObserver.instances.push(this);
  }

  emit(target: Element, isIntersecting = true) {
    this.callback(
      [{ target, isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

function makeElement(top = 900) {
  const attributes = new Map<string, string>();
  const focusListeners = new Set<() => void>();
  const animationListeners = new Set<() => void>();
  const cancel = vi.fn();
  const animate = vi.fn(() => ({
    cancel,
    addEventListener: (_event: string, listener: () => void) => animationListeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => animationListeners.delete(listener),
  }));
  const element = {
    textContent: "35 → 150",
    getBoundingClientRect: () => ({ top, bottom: top + 180 }),
    setAttribute: (name: string, value: string) => attributes.set(name, value),
    removeAttribute: (name: string) => attributes.delete(name),
    addEventListener: (_event: string, listener: () => void) => focusListeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => focusListeners.delete(listener),
    animate,
  } as unknown as HTMLElement;

  return {
    element,
    attributes,
    animate,
    cancel,
    focus: () => [...focusListeners].forEach((listener) => listener()),
    finishAnimation: () => [...animationListeners].forEach((listener) => listener()),
  };
}

let reducedMotion: { matches: boolean };
let preferenceListeners: Set<() => void>;
let frames: Map<number, FrameRequestCallback>;
let nextFrame: number;

function advanceFrame(time: number) {
  const waiting = [...frames.values()];
  frames.clear();
  waiting.forEach((callback) => callback(time));
}

function setReducedMotion(matches: boolean) {
  reducedMotion.matches = matches;
  [...preferenceListeners].forEach((listener) => listener());
}

beforeEach(() => {
  TestObserver.instances = [];
  preferenceListeners = new Set();
  frames = new Map();
  nextFrame = 0;
  reducedMotion = { matches: false };
  const preference = {
    get matches() { return reducedMotion.matches; },
    addEventListener: (_event: string, listener: () => void) => preferenceListeners.add(listener),
    removeEventListener: (_event: string, listener: () => void) => preferenceListeners.delete(listener),
  };
  vi.stubGlobal("window", {
    innerHeight: 800,
    IntersectionObserver: TestObserver,
    matchMedia: () => preference,
    requestAnimationFrame: (callback: FrameRequestCallback) => {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame: (frame: number) => frames.delete(frame),
  });
});

afterEach(() => vi.unstubAllGlobals());

describe("first-appearance lifecycle", () => {
  it("arms below-viewport content and plays once after a real intersection", () => {
    const { element } = makeElement();
    const prepare = vi.fn();
    const finish = vi.fn();
    const stop = vi.fn();
    const play = vi.fn(() => stop);
    const dispose = observeFirstAppearance(element, { prepare, play, finish });
    const observer = TestObserver.instances[0];

    expect(prepare).toHaveBeenCalledOnce();
    expect(play).not.toHaveBeenCalled();
    observer.emit(element, false);
    expect(play).not.toHaveBeenCalled();
    observer.emit(element);
    observer.emit(element, false);
    observer.emit(element);
    expect(play).toHaveBeenCalledOnce();
    expect(observer.disconnect).toHaveBeenCalled();

    dispose();
    dispose();
    expect(stop).toHaveBeenCalledOnce();
    expect(finish).toHaveBeenCalledOnce();
    expect(preferenceListeners.size).toBe(0);
  });

  it("keeps initially visible reveals still, but allows initially visible numbers to count", () => {
    const { element } = makeElement(100);
    const prepare = vi.fn();
    const play = vi.fn();
    const finish = vi.fn();
    observeFirstAppearance(element, { prepare, play, finish });
    expect(prepare).not.toHaveBeenCalled();
    expect(play).not.toHaveBeenCalled();
    expect(finish).toHaveBeenCalledOnce();
    expect(TestObserver.instances).toHaveLength(0);

    const dispose = observeFirstAppearance(element, {
      initiallyVisible: "animate", prepare, play, finish,
    });
    expect(prepare).not.toHaveBeenCalled();
    TestObserver.instances[0].emit(element);
    expect(play).toHaveBeenCalledOnce();
    dispose();
  });

  it("does not replay content above a restored scroll position", () => {
    const { element } = makeElement(-300);
    const play = vi.fn();
    const prepare = vi.fn();
    const finish = vi.fn();
    observeFirstAppearance(element, { initiallyVisible: "animate", prepare, play, finish });
    expect(play).not.toHaveBeenCalled();
    expect(prepare).not.toHaveBeenCalled();
    expect(finish).toHaveBeenCalledOnce();
  });

  it("shows the final state immediately when reduced motion is already enabled", () => {
    setReducedMotion(true);
    const { element } = makeElement();
    const prepare = vi.fn();
    const play = vi.fn();
    const finish = vi.fn();
    observeFirstAppearance(element, { prepare, play, finish });
    expect(prepare).not.toHaveBeenCalled();
    expect(play).not.toHaveBeenCalled();
    expect(finish).toHaveBeenCalledOnce();
    expect(TestObserver.instances).toHaveLength(0);
  });

  it("finishes pending content when reduced motion changes, without rearming later", () => {
    const { element } = makeElement();
    const play = vi.fn();
    const finish = vi.fn();
    observeFirstAppearance(element, { prepare: vi.fn(), play, finish });
    setReducedMotion(true);
    setReducedMotion(false);
    TestObserver.instances[0].emit(element);
    expect(play).not.toHaveBeenCalled();
    expect(finish).toHaveBeenCalledOnce();
    expect(preferenceListeners.size).toBe(0);
  });

  it("reveals a focused child immediately rather than making keyboard users wait", () => {
    const { element, focus } = makeElement();
    const play = vi.fn();
    const finish = vi.fn();
    observeFirstAppearance(element, { prepare: vi.fn(), play, finish });
    focus();
    TestObserver.instances[0].emit(element);
    expect(finish).toHaveBeenCalledOnce();
    expect(play).not.toHaveBeenCalled();
  });

  it("restores final content when motion is unsupported or playback fails", () => {
    const { element } = makeElement();
    const finish = vi.fn();
    observeFirstAppearance(element, {
      prepare: vi.fn(),
      play: () => { throw new Error("Optional animation unavailable"); },
      finish,
    });
    TestObserver.instances[0].emit(element);
    expect(finish).toHaveBeenCalledOnce();
    expect(preferenceListeners.size).toBe(0);

    vi.stubGlobal("window", { innerHeight: 800 });
    const fallback = vi.fn();
    observeFirstAppearance(element, { prepare: vi.fn(), play: vi.fn(), finish: fallback });
    expect(fallback).toHaveBeenCalledOnce();
  });
});

describe("reveal entrance", () => {
  it("holds only an offscreen element, then clears its animation and pending state", () => {
    const { element, attributes, animate, cancel, finishAnimation } = makeElement();
    startReveal(element, "rise", 500);
    expect(attributes.get("data-reveal-state")).toBe("pending");
    TestObserver.instances[0].emit(element);
    expect(attributes.get("data-reveal-state")).toBe("running");
    expect(animate).toHaveBeenCalledWith(
      [{ opacity: 0, transform: "translate3d(0, 18px, 0)" }, { opacity: 1, transform: "none" }],
      expect.objectContaining({ duration: 720, delay: 180, fill: "both" }),
    );
    finishAnimation();
    expect(attributes.has("data-reveal-state")).toBe(false);
    expect(cancel).toHaveBeenCalledOnce();
    expect(preferenceListeners.size).toBe(0);
  });

  it("cancels a running entrance and shows final content when motion preference changes", () => {
    const { element, attributes, cancel } = makeElement();
    startReveal(element, "fade");
    TestObserver.instances[0].emit(element);
    setReducedMotion(true);
    expect(cancel).toHaveBeenCalledOnce();
    expect(attributes.has("data-reveal-state")).toBe(false);
  });

  it("clears a pending entrance on unmount without starting an animation", () => {
    const { element, attributes, animate } = makeElement();
    const dispose = startReveal(element, "rise");
    dispose();
    TestObserver.instances[0].emit(element);
    expect(attributes.has("data-reveal-state")).toBe(false);
    expect(animate).not.toHaveBeenCalled();
    expect(preferenceListeners.size).toBe(0);
  });
});

describe("outcome counting", () => {
  it.each([
    ["35 → 150", "35 → 35"],
    [">100%", ">1%"],
    ["€30k → €350k", "€30k → €30k"],
    ["5 years", "1 years"],
  ])("animates %s and restores its exact final claim and units", (finalValue, firstValue) => {
    const element = { textContent: finalValue };
    const finish = vi.fn();
    startOutcomeCount(element, finalValue, finish);
    expect(element.textContent).toBe(firstValue);
    advanceFrame(0);
    advanceFrame(320);
    expect(element.textContent).not.toBe(firstValue);
    expect(element.textContent).not.toBe(finalValue);
    advanceFrame(960);
    expect(element.textContent).toBe(finalValue);
    expect(finish).toHaveBeenCalledOnce();
    expect(frames.size).toBe(0);
  });

  it("cancels active frames and immediately restores the final value", () => {
    const element = { textContent: "€30k → €350k" };
    const finish = vi.fn();
    const stop = startOutcomeCount(element, "€30k → €350k", finish);
    advanceFrame(0);
    advanceFrame(240);
    stop();
    advanceFrame(960);
    expect(element.textContent).toBe("€30k → €350k");
    expect(frames.size).toBe(0);
    expect(finish).not.toHaveBeenCalled();
  });

  it("finishes an active counter on reduced motion and never counts again", () => {
    const { element } = makeElement(100);
    const play = vi.fn((finish: () => void) => startOutcomeCount(element, "35 → 150", finish));
    observeFirstAppearance(element, {
      initiallyVisible: "animate",
      prepare: vi.fn(),
      play,
      finish: () => { element.textContent = "35 → 150"; },
    });
    const observer = TestObserver.instances[0];
    observer.emit(element);
    advanceFrame(0);
    advanceFrame(240);
    setReducedMotion(true);
    expect(element.textContent).toBe("35 → 150");
    expect(frames.size).toBe(0);
    setReducedMotion(false);
    observer.emit(element, false);
    observer.emit(element);
    expect(play).toHaveBeenCalledOnce();
  });

  it.each(["An experienced partner", "0 clients", "150 → 35", "2024 / 2026"])(
    "leaves an unsupported or non-increasing value %s unchanged",
    (value) => {
      const element = { textContent: value };
      const finish = vi.fn();
      startOutcomeCount(element, value, finish);
      expect(element.textContent).toBe(value);
      expect(frames.size).toBe(0);
      expect(finish).toHaveBeenCalledOnce();
    },
  );
});

describe("server and no-JavaScript content", () => {
  it("renders the exact final number with a stable sizing copy and a non-live visual layer", () => {
    const markup = renderToStaticMarkup(createElement(OutcomeNumber, { value: "€30k → €350k" }));
    expect(markup).toMatch(/class="[^"]*accessible[^"]*">€30k → €350k<\/span>/);
    expect(markup).toMatch(/aria-hidden="true"/);
    expect(markup).toMatch(/class="[^"]*sizer[^"]*">€30k → €350k<\/span>/);
    expect(markup).toMatch(/class="[^"]*value[^"]*">€30k → €350k<\/span>/);
    expect(markup).not.toContain("aria-live");
    expect(markup).not.toContain("data-count-state");
  });

  it("renders reveal content without a hidden or pending server state", () => {
    const markup = renderToStaticMarkup(createElement(Reveal, null, "Ready to read"));
    expect(markup).toContain("Ready to read");
    expect(markup).not.toContain("data-reveal-state");
    expect(markup).not.toContain("opacity");
  });
});
