export const OUTCOMES = [
  { id: "team", value: "35 → 150", label: "people", context: "Supported Klarsolar as Head of HR during six months of growth." },
  { id: "coaching", value: "350+", label: "coaching hours", context: "ICF ACC · CPCC" },
  { id: "leaders", value: "10+", label: "leaders", context: "Coaching team and department leads at a scale-up; the engagement is in its second year." },
  { id: "sourcing", value: "5 years", label: "in use", context: "A sourcing approach built with a financial-services CFO." },
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

export const ALBERTA_TESTIMONIAL = {
  quote: "Marc stepped in to lead the Group HR function for three months while we appointed a permanent Head of HR.\n\nWhat I didn’t expect was how much he would do beyond simply keeping the function running. He worked directly with our managers on performance conversations and hiring decisions, addressed issues where he could, and properly documented the function so his successor didn’t have to start from zero.\n\nHe took ownership, fixed what was fixable, and handed the function over as cleanly as possible. Most importantly, the team remained steady throughout the transition, which was one of our biggest concerns.\n\nMarc provided stability when we needed it, while leaving the function in a better position than he found it.",
  attribution: "Alberta",
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
  ALBERTA_TESTIMONIAL,
] as const;

export type CaseStudy = {
  slug: string;
  href: string;
  title: string;
  kicker: string;
  metric: string;
  metricLabel: string;
  summary: string;
  client: string;
  engagement: string;
  sections: readonly {
    heading: string;
    paragraphs: readonly string[];
  }[];
  outcomes: readonly {
    value: string;
    label: string;
    context: string;
  }[];
  testimonial?: {
    quote: string;
    attribution: string;
  };
  laterContext?: string;
};

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    ...FEATURED_CASE,
    client: "Klarsolar",
    engagement: "Head of HR and interim management",
    sections: [
      {
        heading: "A business growing quickly",
        paragraphs: [
          "Following funding from Global Founders Capital, Klarsolar entered a period of rapid expansion. Its team grew from 35 to 150 people in six months.",
        ],
      },
      {
        heading: "My contribution",
        paragraphs: [
          "I worked as Head of HR, supporting the business through that growth. The engagement also included interim-management support when needed.",
          "That experience of leading people work inside a growing company informs the Fractional CPO work I do today.",
        ],
      },
      {
        heading: "The company outcomes",
        paragraphs: [
          "Alongside the increase in team size, Klarsolar recorded more than 100% revenue growth over two years during the period of support. My contribution sat within the wider work of the company and its leadership team.",
        ],
      },
    ],
    outcomes: [
      { value: "35 → 150", label: "People", context: "Team growth over six months" },
      { value: ">100%", label: "Revenue growth", context: "Over two years during the period of support" },
    ],
    testimonial: TESTIMONIALS[0],
    laterContext: "Klarsolar was later acquired by E.ON.",
  },
];

export function getCaseStudy(slug: string) {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}
