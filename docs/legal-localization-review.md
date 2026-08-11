# German legal-page review

The German privacy notice (`/de/datenschutz`) and imprint (`/de/impressum`) preserve the scope and qualifications of the English legal pages. They use the same `LEGAL_DETAILS` source for the legal name, address, country, contact details, registration reference and completeness gate.

Before production release, a qualified reviewer should check both German pages against the business's actual legal form, processing arrangements and applicable law. This translation is not a substitute for legal advice.

## Production checks

- Confirm `LEGAL_ADDRESS` is set. Until then, all four legal pages remain `noindex` and are omitted from the sitemap.
- If `LEGAL_CONTACT_RETENTION_PERIOD` contains custom English wording, also set `LEGAL_CONTACT_RETENTION_PERIOD_DE`. Otherwise the German privacy notice marks the English value with `lang="en"`.
- If `LEGAL_DISPUTE_RESOLUTION_STATEMENT` is set, also provide the reviewed German wording in `LEGAL_DISPUTE_RESOLUTION_STATEMENT_DE`. Without it, the German imprint preserves the English statement and marks its language correctly.
- Review Cal.com, Vercel and Google Forms descriptions against the production account settings and contracts.
- Update `lastUpdated` and `lastUpdatedDe` together when either legal page changes materially.
