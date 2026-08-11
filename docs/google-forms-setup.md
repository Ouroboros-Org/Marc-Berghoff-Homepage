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
| Submission type | Short answer | Quick message / Diagnostic result |
| Full name | Short answer | Contact form |
| Email | Short answer | Both submission types |
| Message | Paragraph | Contact form, including any optional context the visitor adds |
| Diagnostic summary | Paragraph | Optional on the contact form; score and all ten answers for a shared diagnostic result |
| Consent recorded | Short answer | Contact form sends `Yes`; a diagnostic share sends `Result sharing requested` |

Leave Google’s **Required** toggle off for fields that a diagnostic-result
submission does not contain. The website performs the authoritative validation
before forwarding a response.

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
GOOGLE_FORM_ENTRY_MESSAGE=entry.0000000004
GOOGLE_FORM_ENTRY_DIAGNOSTIC_SUMMARY=entry.0000000005
GOOGLE_FORM_ENTRY_CONSENT=entry.0000000006
```

The example IDs are deliberate placeholders. The application refuses to submit
when a mapping is missing or looks like a placeholder, and it accepts only an
HTTPS `docs.google.com/forms/d/e/.../formResponse` action URL.

## 4. Test the complete path

1. Start the app with `pnpm dev` and submit the contact form with its optional
   context closed.
2. Open the optional context, add several details and submit again. Confirm those
   details appear in the message sent to Google Forms and the linked Sheet.
3. Submit a diagnostic summary with the contact form and confirm its line breaks
   remain readable.
4. Complete the ten-statement check, view the result without entering an email,
   then choose to send it. Confirm the response contains the server-checked score
   and all ten True / Not true answers.
5. Test on the Vercel preview deployment. Environment variables added after a
   deployment require a redeploy.
6. Temporarily change one entry ID in a preview environment and verify that the
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
