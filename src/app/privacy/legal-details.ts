import { siteConfig } from "@/config/site";

function optionalEnvironmentValue(value: string | undefined) {
  const candidate = value?.trim();
  return candidate || null;
}

export const LEGAL_DETAILS = {
  legalName: optionalEnvironmentValue(process.env.LEGAL_NAME) ?? siteConfig.name,
  tradingName: optionalEnvironmentValue(process.env.LEGAL_TRADING_NAME),
  address: optionalEnvironmentValue(process.env.LEGAL_ADDRESS),
  country: optionalEnvironmentValue(process.env.LEGAL_COUNTRY) ?? "Malta",
  email: siteConfig.contact.email,
  phone: siteConfig.contact.phoneDisplay,
  registrationVat: optionalEnvironmentValue(process.env.LEGAL_REGISTRATION_VAT),
  contentResponsible:
    optionalEnvironmentValue(process.env.LEGAL_CONTENT_RESPONSIBLE) ?? siteConfig.name,
  contactRetentionPeriod:
    optionalEnvironmentValue(process.env.LEGAL_CONTACT_RETENTION_PERIOD) ??
    "as long as needed to handle the enquiry and meet applicable legal or accounting duties",
  disputeResolutionStatement: optionalEnvironmentValue(
    process.env.LEGAL_DISPUTE_RESOLUTION_STATEMENT,
  ),
  lastUpdated: "29 July 2026",
  isComplete: Boolean(optionalEnvironmentValue(process.env.LEGAL_ADDRESS)),
} as const;
