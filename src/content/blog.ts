export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
  image?: BlogImage;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  image?: BlogImage;
  sections: readonly BlogSection[];
  sources?: readonly { label: string; href: string }[];
  nextStep: {
    label: string;
    href: string;
  };
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: "founder-bottleneck-or-operating-model",
    title: "When work keeps returning to the founder",
    description:
      "Before you call the founder a bottleneck, trace the decisions that came back and why people passed them on.",
    category: "Leadership systems",
    publishedAt: "2026-07-29",
    updatedAt: "2026-09-12",
    intro:
      "A product launch is waiting for approval. A manager asks the founder to settle a disagreement between two teams. Last week's hiring decision is open again. Calling the founder a bottleneck is tempting. The label says little about why the work came back.",
    sections: [
      {
        heading: "Track the decisions that come back",
        paragraphs: [
          "Begin with evidence you already have. List ten decisions that reached the founder during the past month, including the ones that arrived as a request for ‘input’. For each decision, write down who held it first and what happened immediately before it moved upward.",
          "The route tells you more than the volume. A pricing exception may return because nobody knows the sales director's limit. A hiring choice may return because two executives can each block it. Another decision may come back because the team expects the founder to reverse it later. All three end at the same desk, but they need different responses.",
        ],
      },
      {
        heading: "Why did escalation feel sensible?",
        paragraphs: [
          "People usually escalate for a reason that makes sense from where they sit. Look at what made asking for a decision seem sensible. You may find one of these patterns:",
        ],
        points: [
          "The owner lacked information that was available only to senior leadership.",
          "Two roles held overlapping authority, with no route for resolving disagreement.",
          "Priorities changed after earlier decisions, so approval felt temporary.",
          "A manager had the formal mandate but lacked the skill or confidence to use it.",
        ],
      },
      {
        heading: "The founder can still be the constraint",
        paragraphs: [
          "Formal authority means little when leadership behaviour contradicts it. A founder who reopens settled decisions in private teaches the team to wait. Being copied into every discussion can have the same effect. Nobody needs to issue an instruction; the safest move becomes escalation.",
          "Sometimes the answer really does sit with the founder's behaviour. Sometimes managers lack the authority or support to decide. Both may be involved. Treating either explanation as a character verdict makes it harder to understand why the work returns.",
        ],
      },
      {
        heading: "Run one small test",
        paragraphs: [
          "Choose one recurring class of decision. State who owns it, what input that person needs, the limit of their authority and the circumstances that justify escalation. Then observe the next three cycles without rescuing the process too early.",
          "If the decision stays with its owner, repeat the experiment elsewhere. If it returns, inspect the moment it moved. Write down what sent it back. That is the next thing to test.",
        ],
      },
    ],
    nextStep: {
      label: "See how I work",
      href: "/services",
    },
  },
  {
    slug: "role-clarity-is-not-a-job-description",
    title: "Role clarity starts where job descriptions end",
    description:
      "A job description lists responsibilities. Your team also needs to know who decides, what each role is responsible for and how people work together.",
    category: "Decision rights",
    publishedAt: "2026-07-29",
    updatedAt: "2026-09-12",
    intro:
      "The sales director owns revenue. The operations director owns delivery quality. A large prospect wants terms that put delivery at risk. Both job descriptions can be accurate while the decision between them remains completely unowned.",
    sections: [
      {
        heading: "Most ambiguity sits between roles",
        paragraphs: [
          "Job descriptions help with hiring and broad expectations. They struggle at the boundary where two sensible mandates collide. That is where growing companies lose time: people collect more opinions, meetings end without a decision, and the founder eventually steps in.",
          "Adding ‘collaborate with other departments’ to both documents changes very little. Your team needs to agree how the two roles work together. Who prepares the proposal? Whose evidence must be heard? Who makes the call? Which level of risk sends it to the wider leadership team?",
        ],
      },
      {
        heading: "Use a recent decision as the test case",
        paragraphs: [
          "Pick a decision that took too long or had to be made twice. Ask the people involved to answer the following questions separately before they compare notes:",
        ],
        points: [
          "Which outcome was each role accountable for?",
          "Who believed they had the final decision?",
          "Which input was required, and who treated that input as a veto?",
          "What would have happened if nobody escalated?",
        ],
      },
      {
        heading: "Write down the decision boundary",
        paragraphs: [
          "A short role agreement often works better than another page of tasks. Name the role's purpose, the outcomes it owns and the decisions it can make without further approval. Then record where it depends on other roles and which disagreements keep coming up.",
          "Keep some room for judgement. A company in motion cannot pre-assign every future choice. Concentrate on the ambiguity that already has a cost: a recurring delay, duplicated work, an unowned risk or conflict between the same functions.",
        ],
      },
      {
        heading: "Take the agreement into the next meeting",
        paragraphs: [
          "Put the agreement to work in your next meeting. If a person owns the decision, give them the information and space to make it. Minutes should record the decision and any condition attached to it. Senior leaders have to resist quietly reopening it elsewhere.",
          "Review the agreement after a few real cases. Some boundaries will hold. Others will reveal that the role lacks information, capability or backing. That is a better discussion than debating whether the wording of a job description is sufficiently comprehensive.",
        ],
      },
    ],
    nextStep: {
      label: "Explore advisory",
      href: "/advisory",
    },
  },
  {
    slug: "when-fractional-people-leadership-makes-sense",
    title: "When a Fractional CPO makes sense",
    description:
      "Decide whether you need ongoing advice, a Fractional CPO or a permanent hire by looking at the responsibility and time the work needs.",
    category: "Fractional CPO",
    publishedAt: "2026-07-29",
    updatedAt: "2026-09-12",
    intro:
      "You may need senior people leadership without a full-time Chief People Officer role. Your HR team may already run day-to-day work well, while people strategy, leadership development and organisational decisions need more attention. A Fractional CPO can take responsibility for that agreed work, with a schedule that fits your business.",
    sections: [
      {
        heading: "Do you need advice or someone to lead the work?",
        paragraphs: [
          "Advisory fits when you or someone in your team has the time and authority to lead the work. As your Fractional CPO, I take responsibility for agreed people work and follow decisions through with your managers, HR colleagues and specialist providers.",
          "Write down what must be different over the next few months. If the list depends on somebody attending leadership meetings, coordinating contributors and making day-to-day calls, you are describing ownership. If you mainly want to test a choice before acting, advisory may be enough.",
        ],
      },
      {
        heading: "Where a Fractional CPO can help",
        paragraphs: [
          "The right arrangement depends on what needs sustained attention and who can lead it. These are situations we can discuss:",
        ],
        points: [
          "You need a people strategy that connects hiring, leadership development and organisational structure to your business plan.",
          "Your HR lead manages everyday delivery and wants senior support for wider organisational decisions.",
          "Growth or a restructure calls for more leadership attention than your team can currently give.",
          "You want continuing CPO support, or help defining a future permanent role.",
        ],
      },
      {
        heading: "A permanent hire may already be the better answer",
        paragraphs: [
          "If the scope is stable, the work needs full-time attention and your leadership team can describe success in the role, a permanent search may make sense. Constant presence may also matter in a large workforce or a business spread across several sites.",
          "A short interim period can still help define the role or keep the work moving during recruitment. Be explicit about that purpose. Otherwise an interim arrangement can drift because everyone is busy and the immediate pressure has eased.",
        ],
      },
      {
        heading: "Agree responsibility and review points",
        paragraphs: [
          "At the start, we agree which decisions I will make, who else is involved and how we will review the work. If responsibility will move to your team or a permanent hire, we plan that handover together.",
          "Duration follows the work, with no minimum or maximum term. We can adjust my involvement, continue with advice or finish when the agreed work is complete. The review points help you decide what support remains useful.",
        ],
      },
    ],
    nextStep: {
      label: "Explore Fractional CPO support",
      href: "/fractional-cpo",
    },
  },
  {
    slug: "executive-coaching-advisory-or-assessment",
    title: "Assessment, focused advisory or a Fractional CPO?",
    description:
      "Choose the starting point by asking what you already know, what needs to change and who can carry the work.",
    category: "Working together",
    publishedAt: "2026-07-29",
    updatedAt: "2026-09-12",
    intro:
      "You may already know the people or leadership question you want to work on. You may need to understand it first, decide how to respond, or bring in support to carry the work. Start by separating those needs.",
    sections: [
      {
        heading: "Start with what is known",
        paragraphs: [
          "Ask the people involved to describe the issue before they propose a solution. If they give competing accounts, the first piece of work may need to establish evidence. If they agree on the issue, ask what still prevents them from acting.",
          "The answer might be a difficult choice, conflicting priorities, limited time or a missing owner. It helps to name that gap before choosing the level of support.",
        ],
      },
      {
        heading: "Assessment when the underlying issue is unclear",
        paragraphs: [
          "In the Bottleneck Assessment with Review, I bring together interviews, a questionnaire and relevant evidence about how your business works. You receive a written report and review the findings with your leadership team.",
          "The review is part of the engagement. Your team tests the evidence, considers what it means and agrees what to do next. You may have enough clarity to continue independently.",
        ],
      },
      {
        heading: "Focused advisory when the issue is understood",
        paragraphs: [
          "A senior hire, a restructure or a change in responsibilities may need an experienced second view. A short Strategic People Advisory engagement can test the options, clarify priorities and shape an approach your team can implement.",
          "We agree the question, the work and a review point before starting. Your leadership team keeps the decision. A workshop, coaching conversation or working document may help, depending on the question.",
        ],
      },
      {
        heading: "Ongoing support when the work needs sustained attention",
        paragraphs: [
          "As your Fractional CPO, I take responsibility for agreed people work. We set out which decisions I can make, how I work with your team and when we review progress or hand responsibility over.",
          "Ongoing Strategic People Advisory can fit when your team already leads the work and wants regular advice. You keep the decisions and manage implementation, with my support.",
        ],
      },
      {
        heading: "Choose the tools inside the engagement",
        paragraphs: [
          "Coaching, leadership development, workshops and practical working documents can all contribute to the work. Their purpose follows the agreed engagement. Confidentiality and the people involved still need to be clear, especially when individual coaching sits alongside team work.",
          "You can start with the engagement that fits what you already know. The free introductory conversation is also available if you want to talk through the situation before deciding.",
        ],
      },
    ],
    nextStep: {
      label: "Explore engagements",
      href: "/services",
    },
  },
];

export function getBlogPost(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getReadingTime(post: BlogPost) {
  const text = [
    post.title,
    post.description,
    post.intro,
    ...post.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.points ?? []),
    ]),
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
