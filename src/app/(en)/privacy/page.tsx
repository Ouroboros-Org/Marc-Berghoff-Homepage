import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { createPageMetadata } from "@/config/metadata";
import { getLanguageAlternates } from "@/config/routes";

import { LEGAL_DETAILS } from "./legal-details";

export const metadata = {
  ...createPageMetadata({
    title: "Privacy notice",
    description:
      "How personal information is handled when you use this website, its booking calendar, ten-statement check and contact form.",
    path: "/privacy",
    languages: getLanguageAlternates("privacy"),
  }),
  robots: LEGAL_DETAILS.isComplete
    ? { index: true, follow: true }
    : { index: false, follow: true },
} satisfies Metadata;

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-slate-900/15 pt-8">
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-3xl">
        {title}
      </h2>
      <div className="space-y-4 text-base leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="page-shell">
      <article className="container mx-auto max-w-4xl">
        <header className="mb-14 space-y-5 sm:mb-20">
          <Breadcrumbs items={[{ label: "Privacy notice" }]} />
          <p className="eyebrow">Legal</p>
          <h1 className="text-5xl font-semibold tracking-[-0.055em] text-balance sm:text-7xl">
            Privacy notice
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-700">
            This notice covers the website, the Cal.com booking calendar, the
            ten-statement bottleneck check and the contact form.
          </p>
          <p className="text-sm text-slate-600">
            Last updated: {LEGAL_DETAILS.lastUpdated}
          </p>
        </header>

        <div className="space-y-12">
          <LegalSection title="1. Controller and contact">
            <p>
              {LEGAL_DETAILS.legalName}, based in {LEGAL_DETAILS.country}, is
              responsible for personal information handled through this website.
              Privacy questions and rights requests can be sent to {" "}
              <a href={`mailto:${LEGAL_DETAILS.email}`}>{LEGAL_DETAILS.email}</a>.
              {LEGAL_DETAILS.phone ? (
                <>
                  {" "}You can also call {" "}
                  <a href={`tel:${LEGAL_DETAILS.phone.replace(/[^\d+]/g, "")}`}>
                    {LEGAL_DETAILS.phone}
                  </a>.
                </>
              ) : null}
            </p>
          </LegalSection>

          <LegalSection title="2. Information you submit">
            <p>The form can collect:</p>
            <ul className="list-disc space-y-2 pl-6 marker:text-blue-700">
              <li>your name, contact details, company and role;</li>
              <li>the service, timing and company-size options you select;</li>
              <li>the situation and desired outcome you describe;</li>
              <li>
                your bottleneck-check score and answers, only when you choose to
                send the result;
              </li>
              <li>your consent confirmation.</li>
            </ul>
            <p>
              Please leave employee records, health information and other sensitive
              personal data out of the free-text fields in an initial enquiry.
            </p>
          </LegalSection>

          <LegalSection title="3. How the contact form works">
            <p>
              A completed form is sent to a server route hosted on Vercel. The route
              checks the fields and forwards the relevant answers to the configured
              Google Forms endpoint. Google stores the response in that form and, when
              enabled, its linked Google Sheet. This website does not maintain a second
              contact database.
            </p>
            <p>
              The server also checks a hidden anti-spam field and the time taken to
              complete the form. Those values are not forwarded to Google. The
              application does not add the visitor&apos;s IP address or browser identifier
              to the submitted form response.
            </p>
          </LegalSection>

          <LegalSection title="4. Why the information is used">
            <p>
              Form information is used to read and answer the enquiry, assess whether
              the requested work fits, prepare for a conversation and protect the form
              from automated misuse. It is not added to a marketing list.
            </p>
            <p>
              Where EU or UK data-protection law applies, these uses may rely on steps
              requested before entering a contract and the legitimate interest in
              handling relevant business enquiries. Consent applies where the form asks
              for it expressly.
            </p>
          </LegalSection>

          <LegalSection title="5. Providers and international processing">
            <p>
              Vercel provides hosting and the server route. Google provides the form and
              any linked response sheet. Cal.com provides the inline booking calendar.
              These providers may process information outside the country where a
              visitor lives, subject to their current contracts, locations and transfer
              safeguards.
            </p>
            <p>
              Information may also be disclosed where required by law or where reasonably
              necessary to establish, exercise or defend a legal claim.
            </p>
          </LegalSection>

          <LegalSection title="6. Booking through Cal.com">
            <p>
              When the booking calendar is configured, opening the contact page connects
              your browser to Cal.com so it can display availability. Cal.com can receive
              technical request data such as your IP address, browser details and the
              referring page. If you book a conversation, the details you enter and the
              appointment information are sent to Cal.com and used to arrange the meeting.
            </p>
            <p>
              Cal.com handles that information under its own terms and privacy notice.
              You can use the contact form instead if you do not want to book through the
              embedded calendar.
            </p>
          </LegalSection>

          <LegalSection title="7. Retention">
            <p>
              Enquiries are kept {LEGAL_DETAILS.contactRetentionPeriod}. Information can
              be removed earlier when there is no continuing business or legal reason to
              retain it. Provider security logs and analytics data follow the settings and
              retention rules of the live Vercel and Google accounts.
            </p>
          </LegalSection>

          <LegalSection title="8. The bottleneck check">
            <p>
              The ten-statement check runs in the browser. Your answers are held in
              component state only. They are not stored, sent to analytics or transmitted
              while you answer. You can see the complete result without giving an email
              address.
            </p>
            <p>
              If you choose <em>Send this result to Marc</em>, the email address you enter,
              the score band and all ten answers are sent through the contact route
              described above. The result remains visible whether or not you send it. The
              check is a directional business reflection; it does not make an employment,
              legal or similarly significant decision. I review each submitted result
              myself.
            </p>
          </LegalSection>

          <LegalSection title="9. Analytics and performance measurement">
            <p>
              The site uses Vercel Web Analytics to record anonymised, aggregated
              page-view data without cookies. Vercel creates a daily hash from request
              data, which prevents following a visitor across days or websites. Recorded
              fields can include the page, referrer, broad location, browser, operating
              system and device type. See Vercel&apos;s {" "}
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                rel="noreferrer"
                target="_blank"
              >
                Web Analytics privacy documentation
              </a>.
            </p>
            <p>
              Vercel Speed Insights records real-user performance measurements,
              including Core Web Vitals. It is used to find slow pages and layout
              problems. Neither service is used here for advertising. Vercel explains
              the performance data in its {" "}
              <a
                href="https://vercel.com/docs/speed-insights"
                rel="noreferrer"
                target="_blank"
              >
                Speed Insights documentation
              </a>.
            </p>
          </LegalSection>

          <LegalSection title="10. Your rights">
            <p>
              Depending on the law that applies, you may ask for access, correction,
              deletion, restriction or portability of your personal information. You
              may also object to certain processing or withdraw consent for the future.
              Send the request to {LEGAL_DETAILS.email}. Identity may need to be checked
              before the request is completed.
            </p>
            <p>
              You may complain to the data-protection authority in the country where you
              live or work.
            </p>
          </LegalSection>

          <LegalSection title="11. Security and updates">
            <p>
              Reasonable technical and organisational safeguards protect the submission
              workflow. Internet transmission still carries risk. This notice will be
              updated when the forms, providers or purposes change materially; the date
              at the top identifies the current version.
            </p>
          </LegalSection>
        </div>
      </article>
    </div>
  );
}
