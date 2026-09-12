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
      "Before you call the founder a bottleneck, trace the decisions that came back and the reason each hand-off made sense.",
    category: "Leadership systems",
    publishedAt: "2026-07-29",
    updatedAt: "2026-08-11",
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
          "People usually escalate for a reason that makes sense from where they sit. Look for the condition that rewarded the hand-off. You may find one of these patterns:",
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
          "Sometimes the answer really does sit with the founder's behaviour. Sometimes the operating model has left managers exposed. In many companies, both are true to some degree. Treating either explanation as a character verdict makes it harder to see the mechanics of the problem.",
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
      "A job description lists responsibilities. Growing companies also need explicit outcomes, decision rights and working agreements between roles.",
    category: "Decision rights",
    publishedAt: "2026-07-29",
    updatedAt: "2026-08-11",
    intro:
      "The sales director owns revenue. The operations director owns delivery quality. A large prospect wants terms that put delivery at risk. Both job descriptions can be accurate while the decision between them remains completely unowned.",
    sections: [
      {
        heading: "Most ambiguity sits between roles",
        paragraphs: [
          "Job descriptions help with hiring and broad expectations. They struggle at the boundary where two sensible mandates collide. That is where growing companies lose time: people collect more opinions, meetings end without a decision, and the founder eventually steps in.",
          "Adding ‘collaborate with other departments’ to both documents changes very little. The team needs a working agreement for the specific interface. Who prepares the proposal? Whose evidence must be heard? Who makes the call? Which level of risk sends it to the wider leadership team?",
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
          "A short role agreement often works better than another page of tasks. Name the role's purpose, the outcomes it owns and the decisions it can make without further approval. Then record the two or three interfaces that repeatedly create friction.",
          "Keep some room for judgement. A company in motion cannot pre-assign every future choice. Concentrate on the ambiguity that already has a cost: a recurring delay, duplicated work, an unowned risk or conflict between the same functions.",
        ],
      },
      {
        heading: "Take the agreement into the next meeting",
        paragraphs: [
          "The document earns its value in the operating rhythm. If a person owns the decision, the relevant meeting should give them the information and space to make it. Minutes should record the decision and any condition attached to it. Senior leaders have to resist quietly reopening it elsewhere.",
          "Review the agreement after a few real cases. Some boundaries will hold. Others will reveal that the role lacks information, capability or backing. That is a better discussion than debating whether the wording of a job description is sufficiently comprehensive.",
        ],
      },
    ],
    nextStep: {
      label: "Explore strategic people advisory",
      href: "/advisory",
    },
  },
  {
    slug: "when-fractional-people-leadership-makes-sense",
    title: "When a Fractional CPO makes sense",
    description:
      "Choose between advice, a permanent hire and a defined part-time remit by looking at who needs to carry the work now.",
    category: "Fractional CPO",
    publishedAt: "2026-07-29",
    updatedAt: "2026-09-12",
    intro:
      "The people agenda may already fill half the founder's week, while the long-term leadership role is still hard to define. Hiring quickly can lock in the wrong brief. Waiting leaves important work without an owner. A defined part-time remit can cover that awkward middle period.",
    sections: [
      {
        heading: "Do you need advice or an owner?",
        paragraphs: [
          "Occasional advice fits a founder who still has the time and authority to carry the work. A Fractional CPO takes responsibility for an agreed people remit, joins the operating rhythm and follows decisions through with managers, HR colleagues and specialist providers.",
          "Write down what must be different over the next few months. If the list depends on somebody attending leadership meetings, coordinating contributors and making day-to-day calls, you are describing ownership. If you mainly want to test a choice before acting, advisory may be enough.",
        ],
      },
      {
        heading: "A defined remit fits a particular kind of gap",
        paragraphs: [
          "The strongest case combines urgency with uncertainty. The work matters now, but the company does not yet know the durable shape of a permanent role.",
        ],
        points: [
          "People priorities keep returning to the founder because nobody else has the mandate.",
          "An internal HR lead can run delivery but needs senior cover for organisation-wide decisions.",
          "A restructure or growth phase has created a temporary concentration of difficult work.",
          "The company needs better routines before it can write an honest brief for a permanent hire.",
        ],
      },
      {
        heading: "A permanent hire may already be the better answer",
        paragraphs: [
          "If the scope is stable, the workload is genuinely full time and the leadership team can describe success in the role, begin the permanent search. Constant presence may also matter in a large workforce or a business spread across several sites.",
          "A short interim period can still help define the role or keep the work moving during recruitment. Be explicit about that purpose. Otherwise an interim arrangement can drift because everyone is busy and the immediate pressure has eased.",
        ],
      },
      {
        heading: "Put the handover into the first agreement",
        paragraphs: [
          "Name the routines to establish, the decisions that will move inside and the person or future role expected to receive them. Review those handover conditions alongside the business priorities. The final month is too late to start.",
          "There is no single ideal length for this kind of engagement. The right question is more concrete: what should the company be able to own by the time the remit changes? If nobody can answer that at the outset, defining it is part of the first week's work.",
        ],
      },
    ],
    nextStep: {
      label: "Explore Fractional CPO support",
      href: "/fractional-people-leadership",
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
      "A founder says the leadership team avoids difficult decisions. The cause may still be unclear. The cause may be understood but the response uncertain. Or the company may know what needs to happen and lack the senior support to carry it through. Those situations suggest different starting points.",
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
          "The Full Bottleneck Assessment with Review draws on conversations, a questionnaire and relevant operating evidence. It gives the leadership team a focused finding to examine together.",
          "The review is part of the engagement. The team tests the evidence, considers what it means and agrees what to do next. It may have enough clarity to continue independently.",
        ],
      },
      {
        heading: "Focused advisory when the issue is understood",
        paragraphs: [
          "A senior hire, a restructure or a change in responsibilities may need an experienced second view. A short Strategic People Advisory engagement can test the options, clarify priorities and shape an approach the business can implement.",
          "We agree the question, the work and its end point before starting. The leadership team keeps the decision. A workshop, coaching conversation or working document may help, depending on the question.",
        ],
      },
      {
        heading: "Ongoing support when the work needs sustained attention",
        paragraphs: [
          "As a Fractional CPO, I take an agreed people remit and work within the company's operating rhythm. The agreement names my decision rights, the internal support available and how the work will be reviewed and handed over.",
          "Ongoing Strategic People Advisory can fit when the business already has someone to carry the work and wants regular senior input. The distinction is responsibility: the client retains ownership in an advisory arrangement.",
        ],
      },
      {
        heading: "Choose the tools inside the engagement",
        paragraphs: [
          "Coaching, leadership development, workshops and operational documents can all contribute to the work. Their purpose follows the agreed engagement. Confidentiality and the people involved still need to be clear, especially when individual coaching sits alongside team work.",
          "You can start with the engagement that fits what you already know. The free introductory conversation is also available if you want to talk through the situation before deciding.",
        ],
      },
    ],
    nextStep: {
      label: "Explore the three engagements",
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
