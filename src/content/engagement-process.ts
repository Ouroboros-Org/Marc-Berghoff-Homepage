import type { SiteLocale } from "@/config/routes";

export const ENGAGEMENT_PROCESS = [
  {
    title: "Start with a conversation",
    meta: "Typically 30 minutes · free",
    description:
      "Tell me what is happening, what you have tried and what you need. We can get to know each other before deciding whether to work together.",
  },
  {
    title: "Find the right starting point",
    meta: "Your situation sets the direction",
    description:
      "We clarify the question and who needs to be involved. You can start with any engagement; an assessment is useful when the cause is still unclear.",
  },
  {
    title: "Agree the work",
    meta: "Written scope before paid work",
    description:
      "We agree my responsibility, your team's role, what you receive, how often we work together and the fee. Pace and duration follow the need, with a clear point to review them.",
  },
  {
    title: "Work, review and hand over",
    meta: "Keep the support useful",
    description:
      "We work on the agreed priorities and review what is changing. We adjust my involvement or finish with a handover your team can carry forward.",
  },
] as const;

export const getEngagementProcess: (
  locale: SiteLocale,
) => typeof ENGAGEMENT_PROCESS = () => ENGAGEMENT_PROCESS;
