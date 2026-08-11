export type BlogSection = {
  heading: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: readonly BlogSection[];
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
      "Trace the decisions that come back upstairs before deciding whether the issue is founder behaviour, role clarity or the operating model.",
    category: "Leadership systems",
    publishedAt: "2026-07-29",
    updatedAt: "2026-08-04",
    intro:
      "A product launch is waiting for approval. A manager asks the founder to settle a disagreement between two teams. Last week's hiring decision is open again. It is easy to call the founder the bottleneck. That label says little about why the work came back.",
    sections: [
      {
        heading: "Track the decisions that come back",
        paragraphs: [
          "Begin with evidence you already have. List ten decisions that reached the founder during the past month, including the ones that arrived as a request for ‘input’. For each decision, write down who held it first and what happened immediately before it moved upward.",
          "The route tells you more than the volume. A pricing exception may return because nobody knows the sales director's limit. A hiring choice may return because two executives can each block it. Another decision may come back because the team expects the founder to reverse it later. All three end at the same desk, but they need different responses.",
        ],
      },
      {
        heading: "Ask why escalation felt sensible",
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
          "If the decision stays with its owner, repeat the experiment elsewhere. If it returns, inspect the moment it moved. You may discover a capability gap, a missing piece of information or a founder habit that the first conversation did not surface. That uncertainty is valuable; it is narrower than the one you began with.",
        ],
      },
    ],
    nextStep: {
      label: "See how I can help",
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
    updatedAt: "2026-08-04",
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
        heading: "See whether the meeting changes",
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
    title: "When Fractional People Leadership fits",
    description:
      "How to tell whether the people and organisation work needs advice, a permanent hire or someone to carry a defined remit now.",
    category: "Fractional People Leadership",
    publishedAt: "2026-07-29",
    updatedAt: "2026-08-04",
    intro:
      "The people agenda may already fill half the founder's week, while the long-term leadership role is still hard to define. Hiring quickly can lock in the wrong brief. Waiting leaves important work without an owner. A defined part-time remit can cover that awkward middle period.",
    sections: [
      {
        heading: "Work out whether you need advice or ownership",
        paragraphs: [
          "Occasional advice fits a founder who still has the time and authority to carry the work. Fractional People Leadership goes further. The external leader joins the operating rhythm, owns an agreed remit and follows decisions through with managers, HR colleagues and specialist providers.",
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
      label: "See Fractional People Leadership",
      href: "/fractional-people-leadership",
    },
  },
  {
    slug: "executive-coaching-advisory-or-assessment",
    title: "Coaching, advice, assessment or defined responsibility?",
    description:
      "A starting point depends on who should carry the work and whether the cause is clear enough to act on.",
    category: "Working formats",
    publishedAt: "2026-07-29",
    updatedAt: "2026-08-04",
    intro:
      "A founder says the leadership team avoids difficult decisions. One person may need coaching. The team may need evidence. A visible decision may need a second view, or the work may need an owner. The symptom cannot choose the format on its own.",
    sections: [
      {
        heading: "First decide who owns the question",
        paragraphs: [
          "Ask who wants the work, who will take part and who is expected to act on what emerges. Coaching has an individual client. Advisory supports the person or group carrying a defined business decision. An organisational assessment gathers evidence across the relevant part of the company for its decision-makers.",
          "That distinction affects confidentiality. It also sets the limit of what the work can establish. One person's account can be excellent material for coaching; it cannot tell you, by itself, what is happening across a whole team.",
        ],
      },
      {
        heading: "Coaching keeps the work with the leader",
        paragraphs: [
          "Executive Coaching fits when the central question concerns a leader's behaviour, judgement or experience of the role. They may bring a conflict, a difficult decision or a response they want to change. The sessions examine their part in the situation and what they will try next.",
          "Coaching should not quietly become an investigation of colleagues who never agreed to take part. If the leader needs facts about the wider system, pause and define a separate piece of work with the organisation.",
        ],
      },
      {
        heading: "Advisory fits a decision you can already name",
        paragraphs: [
          "A senior hire, a restructure or a change in responsibilities may need an experienced second view. The adviser can test the framing, examine trade-offs and help organise the next action. The leadership team still makes the decision.",
          "Advisory becomes less reliable when each person gives a different account of the cause. At that point, a persuasive opinion can harden the wrong explanation. More evidence may be worth the extra time.",
        ],
      },
      {
        heading: "Defined responsibility fits when somebody needs to carry the remit",
        paragraphs: [
          "A founder may understand the problem and still lack a credible owner for the work. In that case, another opinion changes very little. In Fractional People Leadership, I take an agreed remit, join the operating rhythm and follow the decisions through.",
          "The boundary matters. Write down the decisions I can make, the support available inside the company and the person who should receive the work later. If that cannot be made clear, the remit is not ready.",
        ],
      },
      {
        heading: "Assessment fits a cause that is still disputed",
        paragraphs: [
          "Use an organisational assessment when the symptoms cross roles or functions and the leadership team cannot agree on what sustains them. The work draws on qualitative and quantitative input from the people involved, alongside relevant operating evidence.",
          "The output should be narrow enough to act on. A long catalogue of every weakness in the organisation usually sends the team back into debate. A focused assessment identifies the main constraint and gives the report workshop a place to begin.",
        ],
      },
      {
        heading: "Change formats openly",
        paragraphs: [
          "One format can reveal a need for another. Coaching may surface an organisational concern. An assessment may show that one leader would benefit from individual work. Expansion is not automatic.",
          "When the format changes, define the client, question and confidentiality boundary again. You may decide the original work is enough. That is a legitimate outcome too.",
        ],
      },
    ],
    nextStep: {
      label: "See how the formats differ",
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
