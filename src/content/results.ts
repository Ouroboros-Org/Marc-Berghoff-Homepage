export type CaseStudy = {
  company: string;
  engagement: string;
  responsibility: string;
  context?: string;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    company: "National financial regulator",
    engagement: "Executive coaching",
    responsibility: "Coaching with department leaders",
  },
  {
    company: "Global events and media group",
    engagement: "Individual and group coaching",
    responsibility: "Work with the top management team",
  },
  {
    company: "German financial services group",
    engagement: "Strategic advisory",
    responsibility: "A sourcing approach developed with the CFO",
    context:
      "I worked with the CFO to establish an approach the group still uses five years later.",
  },
  {
    company: "Security group, Malta",
    engagement: "Interim HR leadership",
    responsibility: "Group-wide responsibility across four companies",
    context:
      "I carried the interim HR remit for a security company with 400 employees.",
  },
  {
    company: "Klarsolar",
    engagement: "Scale-up people leadership",
    responsibility: "Head of HR inside a growing company",
    context:
      "I led HR at the solar scale-up before its later acquisition by E.ON.",
  },
  {
    company: "CyberKongz",
    engagement: "Co-founder and operator",
    responsibility: "Co-founder and operator in a global Web3 project",
  },
  {
    company: "Agency, Dubai",
    engagement: "Executive coaching and mediation",
    responsibility: "Work between the CEO and owner",
  },
  {
    company: "Major HR conference, Malta",
    engagement: "Keynote",
    responsibility: "Keynote speaker",
  },
];
