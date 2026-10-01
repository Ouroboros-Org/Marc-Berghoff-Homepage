import { NextResponse } from "next/server";

import type { ContactApiResponse } from "@/lib/contact-api";
import { evaluateSubmissionTrap, MAX_CONTACT_PAYLOAD_BYTES } from "@/lib/contact-security";
import { GoogleFormsConfigurationError } from "@/lib/google-forms";
import { peerAdvisorySchema, PEER_ADVISORY_SUCCESS } from "@/lib/peer-advisory-schema";
import { savePeerAdvisoryRegistration } from "@/lib/peer-advisory-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(body: ContactApiResponse, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ ok: false, code: "INVALID_CONTENT_TYPE", message: "Send the registration as JSON." }, 415);
  }
  if (Number(request.headers.get("content-length")) > MAX_CONTACT_PAYLOAD_BYTES) {
    return json({ ok: false, code: "PAYLOAD_TOO_LARGE", message: "Shorten the longer answers and try again." }, 413);
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_CONTACT_PAYLOAD_BYTES) {
      return json({ ok: false, code: "PAYLOAD_TOO_LARGE", message: "Shorten the longer answers and try again." }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "INVALID_JSON", message: "The registration could not be read. Please try again." }, 400);
  }

  const parsed = peerAdvisorySchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return json({ ok: false, code: "VALIDATION_ERROR", message: "Check the highlighted fields and try again.", fieldErrors }, 422);
  }

  if (!evaluateSubmissionTrap(parsed.data).accepted) {
    return json({ ok: false, code: "SUBMISSION_REJECTED", message: "Your interest has not been registered. Refresh the page and try again." }, 422);
  }
  try {
    await savePeerAdvisoryRegistration(parsed.data);
    return json({ ok: true, message: PEER_ADVISORY_SUCCESS }, 200);
  } catch (error) {
    const unconfigured = error instanceof GoogleFormsConfigurationError;
    return json({
      ok: false,
      code: unconfigured ? "FORM_NOT_CONFIGURED" : "UPSTREAM_ERROR",
      message: "Your interest hasn’t been registered yet. Please try again, or use the email link below.",
    }, unconfigured ? 503 : 502);
  }
}
