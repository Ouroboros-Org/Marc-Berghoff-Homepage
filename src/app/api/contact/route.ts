import { NextResponse } from "next/server";

import type { ContactApiResponse } from "../../../lib/contact-api";
import { contactPayloadSchema } from "../../../lib/contact-schema";
import {
  evaluateSubmissionTrap,
  MAX_CONTACT_PAYLOAD_BYTES,
} from "../../../lib/contact-security";
import {
  GoogleFormsConfigurationError,
  GoogleFormsSubmissionError,
  submitContactToGoogleForms,
} from "../../../lib/google-forms";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return json(
      {
        ok: false,
        code: "INVALID_CONTENT_TYPE",
        message: "Send the contact request as JSON.",
      },
      415,
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_CONTACT_PAYLOAD_BYTES) {
    return json(
      {
        ok: false,
        code: "PAYLOAD_TOO_LARGE",
        message: "The contact request is too large. Shorten the longer answers and try again.",
      },
      413,
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "The contact request could not be read. Refresh and try again.",
      },
      400,
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_CONTACT_PAYLOAD_BYTES) {
    return json(
      {
        ok: false,
        code: "PAYLOAD_TOO_LARGE",
        message: "The contact request is too large. Shorten the longer answers and try again.",
      },
      413,
    );
  }

  let unknownPayload: unknown;
  try {
    unknownPayload = JSON.parse(rawBody);
  } catch {
    return json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "The contact request is not valid JSON. Refresh and try again.",
      },
      400,
    );
  }

  const parsed = contactPayloadSchema.safeParse(unknownPayload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: "Check the highlighted fields and try again.",
        fieldErrors,
      },
      422,
    );
  }

  const trap = evaluateSubmissionTrap(parsed.data);
  if (!trap.accepted) {
    // A generic success prevents the endpoint from teaching automated senders
    // how the trap works. Nothing is forwarded or retained.
    return json(
      {
        ok: true,
        message: "Thanks. Your message has been received.",
      },
      200,
    );
  }

  try {
    await submitContactToGoogleForms(parsed.data);
    return json(
      {
        ok: true,
        message: "Thanks. Your message has been sent to Marc.",
      },
      200,
    );
  } catch (error) {
    if (error instanceof GoogleFormsConfigurationError) {
      return json(
        {
          ok: false,
          code: "FORM_NOT_CONFIGURED",
          message: "The contact form is not connected yet. Please use the published email address for now.",
        },
        503,
      );
    }

    if (error instanceof GoogleFormsSubmissionError) {
      return json(
        {
          ok: false,
          code: "UPSTREAM_ERROR",
          message: "The message could not be sent just now. Please wait a moment and try again.",
        },
        502,
      );
    }

    return json(
      {
        ok: false,
        code: "UPSTREAM_ERROR",
        message: "Something went wrong while sending the message. Please try again.",
      },
      500,
    );
  }
}

