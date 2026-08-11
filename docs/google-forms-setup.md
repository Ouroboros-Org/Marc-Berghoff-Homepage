# Google Forms contact delivery

The website uses a server-side implementation of the custom-form pattern
described in [How to Integrate Google Forms With Your Custom Coded Contact
Form](https://medium.com/@maheshlangote/how-to-integrate-google-forms-with-your-custom-coded-contact-form-1153cbeadb61).
It posts URL-encoded answers to Google Forms' public `formResponse` endpoint. It
does **not** use the Google Forms REST API or an Apps Script deployment.

The browser never posts to Google directly:

```text
Website form → POST /api/contact → validation/anti-spam checks
             → Google Forms formResponse → optional linked Google Sheet
```

This avoids browser CORS issues, keeps the field mapping in server-only Vercel
variables and gives the user a consistent success or error state. The Google Form
must still be considered public: anyone who discovers its responder URL can post
to it.

## 1. Create the Google Form

Create one form called, for example, **Website enquiries**. Add these questions
in this order. The displayed labels may differ, but keeping the names aligned
makes maintenance easier.

| Question | Suggested Google type | Website source |
| --- | --- | --- |
| Submission type | Short answer | Quick contact / Extended enquiry / Diagnostic result |
| Full name | Short answer | Contact forms |
| Email | Short answer | All three submission types |
| Phone | Short answer | Contact forms |
| Company | Short answer | Contact forms |
| Role | Short answer | Extended form |
| Company size | Short answer or multiple choice | Extended form |
| Service | Short answer or multiple choice | Contact forms |
| Urgency | Short answer or multiple choice | Extended form |
| Message | Paragraph | Quick form |
| Current situation | Paragraph | Extended form |
| Desired outcome | Paragraph | Extended form |
| Referral source | Short answer | Extended form |
| Diagnostic summary | Paragraph | Optional on contact forms; score and all ten answers for a shared diagnostic result |
| Consent recorded | Short answer | Contact forms send `Yes`; a diagnostic share sends `Result sharing requested` |

If **Company size**, **Service** or **Urgency** uses Google Forms’ multiple-choice
or dropdown type, its choices must match the website’s submitted labels exactly.
Copy these values, including punctuation and capitalisation:

| Field | Accepted choices |
| --- | --- |
| Company size | `1–10 people`; `11–25 people`; `26–50 people`; `51–100 people`; `101–250 people`; `251+ people`; `Prefer not to say` |
| Service | `Bottleneck Assessment`; `Executive Coaching`; `Strategic People Advisory`; `Peer Advisory`; `Fractional People Leadership`; `I’m not sure yet` |
| Urgency | `I’m exploring options`; `Within this quarter`; `Within the next month`; `There is an immediate issue` |

The application keeps these labels in one shared mapping and sends the visible
label, not its internal value. If you prefer not to maintain matching choices,
use Google Forms’ **Short answer** type for these three questions.

Leave Google’s **Required** toggle off for fields that are absent from one form
variant. The website already performs the authoritative field validation. If a
Google question is required while the quick form sends it blank, Google may
reject or omit the response even when the HTTP request looks successful.

In the Form’s **Responses** tab, optionally connect a Google Sheet. Configure
access and deletion rules on both the Form and Sheet; the website has no contact
database of its own.

## 2. Find the action URL and entry IDs

Open the public responder view, not the editor. The action URL has this shape:

```text
https://docs.google.com/forms/d/e/FORM_PUBLIC_ID/formResponse
```

Use the responder page’s HTML source or browser developer tools to find the
corresponding `entry.NUMBER` name for every question. A pre-filled link is also a
useful way to match a visible question to its entry ID. Record the whole value,
including `entry.`.

Recreating or duplicating a question can change its entry ID. Update the Vercel
mapping whenever the Google Form structure changes.

## 3. Configure local and Vercel environments

Create `.env.local` for local development and add the same values in Vercel under
**Project → Settings → Environment Variables**. These variables are server-only;
none should use the `NEXT_PUBLIC_` prefix.

```dotenv
GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/FORM_PUBLIC_ID/formResponse
GOOGLE_FORM_ENTRY_FORM_TYPE=entry.0000000001
GOOGLE_FORM_ENTRY_FULL_NAME=entry.0000000002
GOOGLE_FORM_ENTRY_EMAIL=entry.0000000003
GOOGLE_FORM_ENTRY_PHONE=entry.0000000004
GOOGLE_FORM_ENTRY_COMPANY=entry.0000000005
GOOGLE_FORM_ENTRY_ROLE=entry.0000000006
GOOGLE_FORM_ENTRY_COMPANY_SIZE=entry.0000000007
GOOGLE_FORM_ENTRY_SERVICE=entry.0000000008
GOOGLE_FORM_ENTRY_URGENCY=entry.0000000009
GOOGLE_FORM_ENTRY_MESSAGE=entry.0000000010
GOOGLE_FORM_ENTRY_CURRENT_SITUATION=entry.0000000011
GOOGLE_FORM_ENTRY_DESIRED_OUTCOME=entry.0000000012
GOOGLE_FORM_ENTRY_REFERRAL=entry.0000000013
GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY=entry.0000000014
GOOGLE_FORM_ENTRY_CONSENT=entry.0000000015
```

The example IDs are deliberate placeholders. The application refuses to submit
when a mapping is missing or looks like a placeholder, and it accepts only an
HTTPS `docs.google.com/forms/d/e/.../formResponse` action URL.

## 4. Test the complete path

1. Start the app with `pnpm dev` and submit the quick form.
2. Confirm the new row appears in Google Forms and in the linked Sheet, if used.
3. Check that quick-only fields are populated and extended-only fields are blank.
4. Submit the extended form and confirm the inverse mapping.
5. Submit a diagnostic summary with contact details and confirm line breaks are
   readable.
6. Complete the ten-statement check, view the result without entering an email,
   then choose to send it. Confirm the response contains the server-checked
   score and all ten True / Not true answers.
7. Test on the Vercel preview deployment. Environment variables added after a
   deployment require a redeploy.
8. Temporarily change one entry ID in a preview environment and verify that the
   UI reports a delivery error rather than claiming success. Restore it before
   promoting the deployment.

## 5. Operational notes

- The server sends `application/x-www-form-urlencoded` and follows Google’s
  response redirect with a 10-second timeout.
- The hidden `website` honeypot and `startedAt` value are validation-only. They
  are never forwarded to Google.
- The application does not read or append the visitor’s IP address or user-agent
  to a contact response. Hosting infrastructure may keep its own delivery logs.
- Google does not provide a stable developer contract for this HTML submission
  endpoint. Re-test after any Google Form edit and during scheduled release QA.
- If this flow becomes unreliable, replace the server adapter while keeping the
  `/api/contact` contract and UI unchanged.
- Update `/privacy` whenever recipients, retention, analytics or form fields
  change.
