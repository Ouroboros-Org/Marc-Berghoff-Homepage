type OutcomeCount = {
  from: number;
  to: number;
  format: (value: number) => string;
};

function parseOutcomeCount(value: string): OutcomeCount | null {
  const numbers = [...value.matchAll(/\d+(?:,\d{3})*(?:\.\d+)?/g)];
  const isRange = numbers.length === 2 && value.includes("→");
  if (numbers.length !== 1 && !isRange) return null;

  const last = numbers[numbers.length - 1];
  const raw = last[0];
  const to = Number(raw.replaceAll(",", ""));
  const decimals = raw.split(".")[1]?.length ?? 0;
  const from = isRange ? Number(numbers[0][0].replaceAll(",", "")) : 10 ** -decimals;
  if (!Number.isFinite(to) || to <= from) return null;

  const formatter = new Intl.NumberFormat("en", {
    useGrouping: raw.includes(","),
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  if (formatter.format(to) !== raw) return null;

  const before = value.slice(0, last.index);
  const after = value.slice(last.index + raw.length);
  return {
    from,
    to,
    format: (current) => `${before}${formatter.format(current)}${after}`,
  };
}

export function startOutcomeCount(
  element: Pick<HTMLElement, "textContent">,
  finalValue: string,
  onFinish: () => void,
): () => void {
  const count = parseOutcomeCount(finalValue);
  let frame: number | undefined;
  let stopped = false;
  const stop = () => {
    stopped = true;
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    element.textContent = finalValue;
  };

  if (
    !count ||
    typeof window === "undefined" ||
    typeof window.requestAnimationFrame !== "function" ||
    typeof window.cancelAnimationFrame !== "function"
  ) {
    element.textContent = finalValue;
    onFinish();
    return () => { element.textContent = finalValue; };
  }

  let startedAt: number | undefined;
  element.textContent = count.format(count.from);
  const tick = (now: number) => {
    if (stopped) return;
    startedAt ??= now;
    const progress = Math.min(1, Math.max(0, (now - startedAt) / 960));
    if (progress >= 1) {
      frame = undefined;
      element.textContent = finalValue;
      stopped = true;
      onFinish();
      return;
    }

    const eased = 1 - (1 - progress) ** 3;
    element.textContent = count.format(count.from + (count.to - count.from) * eased);
    frame = window.requestAnimationFrame(tick);
  };
  frame = window.requestAnimationFrame(tick);
  return stop;
}
