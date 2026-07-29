# Vercel release runbook

## Runtime and build

- Node.js: 22 or newer
- Package manager: pnpm (lockfile committed)
- Install: `pnpm install --frozen-lockfile`
- Build: `pnpm build`
- Local production check: `pnpm build` then `pnpm start`

Vercel should detect Next.js automatically. No custom output directory is
required.

The root layout mounts the official `@vercel/analytics` and
`@vercel/speed-insights` Next.js components. Enable Web Analytics and Speed
Insights for the Vercel project so deployments begin reporting data.

## Required environment configuration

Set these for Production and for every Preview environment used to test contact
delivery:

- `NEXT_PUBLIC_SITE_URL` — the canonical origin with `https://` and no path, for
  example `https://marc.example`. Do not use a Vercel preview URL in Production.
- `NEXT_PUBLIC_BOOKING_URL` — optional. Use a complete `https://` scheduling URL;
  leave it unset to use the enquiry-form fallback on the contact page. Invalid,
  placeholder and non-HTTPS values are ignored safely.
- `GOOGLE_FORM_ACTION_URL`
- `GOOGLE_FORM_ENTRY_FORM_TYPE`
- `GOOGLE_FORM_ENTRY_FULL_NAME`
- `GOOGLE_FORM_ENTRY_EMAIL`
- `GOOGLE_FORM_ENTRY_PHONE`
- `GOOGLE_FORM_ENTRY_COMPANY`
- `GOOGLE_FORM_ENTRY_ROLE`
- `GOOGLE_FORM_ENTRY_COMPANY_SIZE`
- `GOOGLE_FORM_ENTRY_SERVICE`
- `GOOGLE_FORM_ENTRY_URGENCY`
- `GOOGLE_FORM_ENTRY_MESSAGE`
- `GOOGLE_FORM_ENTRY_CURRENT_SITUATION`
- `GOOGLE_FORM_ENTRY_DESIRED_OUTCOME`
- `GOOGLE_FORM_ENTRY_REFERRAL`
- `GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY`
- `GOOGLE_FORM_ENTRY_CONSENT`

Set the following legal values for Production. The Privacy and Imprint pages
remain `noindex` until `LEGAL_ADDRESS` is present:

- `LEGAL_NAME`
- `LEGAL_TRADING_NAME` — optional if no separate trading name is used
- `LEGAL_ADDRESS`
- `LEGAL_COUNTRY`
- `LEGAL_REGISTRATION_VAT` — use only when applicable
- `LEGAL_CONTENT_RESPONSIBLE`
- `LEGAL_CONTACT_RETENTION_PERIOD`
- `LEGAL_DISPUTE_RESOLUTION_STATEMENT` — use only when applicable

The full Google Forms procedure is in
[`docs/google-forms-setup.md`](./google-forms-setup.md).

## Release gate

Run these locally from the repository root:

```powershell
pnpm lint
pnpm typecheck
pnpm test
pnpm build
rg -n "YOUR_DOMAIN|YOUR_FORM_ID|YOUR_ENTRY_|REPLACE" src --glob "!**/*.test.*"
```

Example values in documentation and `.env.example` are setup guidance. Verify
the corresponding Vercel values separately because they are not stored in the
repository. Confirm that the Privacy and Imprint pages are indexable only after
the provider address has been supplied and checked.

On the Vercel preview:

1. Check all navigation and footer links at 360, 768, 1024 and 1440 pixels.
2. Complete the diagnostic using keyboard only and verify the result is announced
   and readable.
3. Submit both contact variants and confirm their rows in Google Forms/Sheets.
4. Verify error handling with the network offline and with a deliberately invalid
   preview-only form mapping.
5. Open `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/icon` and
   `/opengraph-image`. Confirm that sitemap and canonical URLs use the production
   domain.
6. Share one page in a social preview debugger and check the 1200×630 image.
7. Open the deployed site, then confirm page views appear in Web Analytics and a
   field-performance sample reaches Speed Insights after Vercel has had time to
   process it.
8. Inspect the Privacy and Imprint pages after all legal replacements.
9. Confirm there is no horizontal scrolling, no content hidden behind the header,
   and a visible focus indicator on every interactive element.
10. Check a reduced-motion system setting and a narrow mobile viewport.
11. Review Vercel logs after a real submission without copying personal form data
    into tickets or screenshots.

## DNS and promotion

Attach the canonical domain in Vercel, configure the DNS records Vercel provides,
and wait for its TLS certificate to be active. Then set `NEXT_PUBLIC_SITE_URL` to
the final HTTPS origin and redeploy. Promote only the deployment that passed the
form and legal checks above.

The app sends `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` and a
restrictive `Permissions-Policy`. A Content Security Policy is intentionally not
hard-coded until the final booking embeds, analytics and form providers are
known. Add and test a CSP after those dependencies are final; do not copy an
untested policy into Production.

## After launch

- Submit both forms once and confirm delivery.
- Register the sitemap with the relevant search consoles.
- Monitor 4xx/5xx errors and form-delivery failures without logging message bodies.
- Recheck public claims, testimonial permissions and credential dates quarterly.
- Review the privacy notice whenever infrastructure, analytics, embeds or
  retention settings change.
