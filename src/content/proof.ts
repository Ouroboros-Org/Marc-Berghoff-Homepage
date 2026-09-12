export const OUTCOMES = [
  { id: "team", value: "35 → 150", label: "People at Klarsolar", context: "Growth supported over six months" },
  { id: "revenue", value: ">100%", label: "Revenue growth", context: "At Klarsolar over two years" },
  { id: "arr", value: "€30k → €350k", label: "Annual recurring revenue", context: "At Giftagoods during one year of support" },
  { id: "sourcing", value: "5 years", label: "A sourcing approach in use", context: "Built with a financial-services CFO" },
] as const;

export const FEATURED_CASE = {
  slug: "klarsolar",
  href: "/results/klarsolar",
  title: "People leadership through a period of rapid growth.",
  kicker: "Selected work · Klarsolar",
  metric: "35 → 150",
  metricLabel: "people in six months",
  summary: "As Head of HR, I supported Klarsolar through a period of rapid expansion. The company later became part of E.ON.",
} as const;

export const TESTIMONIALS = [
  {
    quote: "Marc helped us to grow our business after a funding from Global Founders Capital and supported with interim management if needed. He is a great leader, quick thinker, and highly professional. We highly recommend him and wish him all the best for his company!",
    attribution: "Head of HR, Klarsolar",
  },
  {
    quote: "Marc has been with me through the struggling stage, the getting-by stage, and the doing-pretty-well stage. He’s empathetic enough to relate to your situation, clever enough to advise on a sensible way forward. He doesn’t just follow up, he follows through. I would recommend Marc to anyone that’s feeling stuck in their business or just wants to tighten up their operation.",
    attribution: "Chris Mercieca, Giftagoods",
  },
] as const;
