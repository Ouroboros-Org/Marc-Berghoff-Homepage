import { z } from "zod";

export const PEER_ADVISORY_OPT_IN = "I’d like Marc to contact me about this European peer-advisory group.";
export const PEER_ADVISORY_SUCCESS = "Thanks — your interest is registered. I’ll be in touch as the group takes shape. There is no commitment to join.";

export const peerAdvisorySchema = z.object({
  fullName: z.string().trim().min(2, "Enter your name.").max(120, "Keep your name to 120 characters or fewer."),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  company: z.string().trim().min(1, "Enter your company.").max(160, "Keep the company name to 160 characters or fewer."),
  country: z.string().trim().min(2, "Enter your country.").max(100, "Keep the country to 100 characters or fewer."),
  expectations: z.string().trim().max(2000, "Keep this to 2,000 characters or fewer."),
  consent: z.boolean().refine(Boolean, "Confirm that Marc may contact you about this group."),
  website: z.string().trim().max(200),
  startedAt: z.number().int().positive(),
});

export type PeerAdvisoryRegistration = z.infer<typeof peerAdvisorySchema>;

export function peerAdvisoryDefaults(): PeerAdvisoryRegistration {
  return { fullName: "", email: "", company: "", country: "", expectations: "", consent: false, website: "", startedAt: Date.now() };
}
