export const HOME_COPY = {
  metadata: {
    title: "Fractional CPO & Strategic People Advisory | Marc Berghoff",
    description:
      "Fractional Chief People Officer support for founders and leadership teams. People strategy, leadership and organisational development for growing companies.",
  },
  hero: {
    role: "Fractional CPO",
    title: "for your next stage of growth.",
    description:
      "Chief People Officer support for your people, leadership and organisation as you scale.",
    bookingLabel: "Book a call",
    noteLabel: "Let's talk",
    bookingDetail: "Free introductory conversation · typically 30 minutes",
    noteDetail: "Tell me what is happening. We can take it from there.",
    checkLabel: "Start the check",
    checkDetail: "10 statements · about 2 minutes · no email needed",
    imageAlt: "Marc Berghoff speaking to an audience",
    caption: "Organisational psychologist · Vistage Chair · Executive coach",
  },
  services: {
    title: "The right support for where you are.",
    intro:
      "Find the underlying issue, work through a decision, or bring senior people leadership into the business. Start where you need me.",
    unsure: "Not sure where to begin?",
    conversationLabel: "Let's talk it through",
  },
  diagnostic: {
    title: "Something keeps getting stuck?",
    description:
      "Start with a short self-check on the patterns that may be slowing your company down.",
    action: "Start the check",
    detail: "Free · about 2 minutes · results without an email",
  },
  about: {
    title: "An outside perspective. A person in your corner.",
    paragraphs: [
      "I'm Marc. I work with founders and leadership teams when the people side of growth needs clearer decisions, more attention or someone to carry the work.",
      "My work brings together organisational psychology, executive coaching and experience leading HR through change. I ask direct questions, say what I see and stay close to the work.",
    ],
    action: "More about me",
  },
  fit: {
    title: "A good fit matters.",
    intro: "The work needs the right kind of support on both sides.",
    suitable: [
      "You need strategic direction for people, leadership or organisational change.",
      "Your leadership team is ready to examine the issue and make decisions.",
      "You want advice, a thinking partner or someone to carry an agreed senior remit.",
    ],
    otherSupport: [
      "You mainly need someone to run payroll, contracts or day-to-day HR administration.",
      "You need an entire operational HR team replaced by one external person.",
      "You want to hand over a leadership issue without giving access or decision authority.",
    ],
  },
  insights: {
    title: "A closer look at the work.",
    intro: "Thoughts on the decisions, roles and patterns that shape a growing organisation.",
    action: "All insights",
  },
  closing: {
    title: "Let's start with what's happening.",
    body:
      "Bring the issue, the question or the feeling that something needs to change. We can work out the next step together.",
    noteLabel: "Send a message",
  },
} as const;

export function getHomeCopy(locale?: string): typeof HOME_COPY;
export function getHomeCopy() {
  return HOME_COPY;
}
