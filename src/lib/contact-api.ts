export type ContactApiErrorCode =
  | "INVALID_CONTENT_TYPE"
  | "PAYLOAD_TOO_LARGE"
  | "INVALID_JSON"
  | "VALIDATION_ERROR"
  | "SUBMISSION_REJECTED"
  | "FORM_NOT_CONFIGURED"
  | "UPSTREAM_ERROR";

export type ContactApiResponse =
  | {
      ok: true;
      message: string;
    }
  | {
      ok: false;
      code: ContactApiErrorCode;
      message: string;
      fieldErrors?: Record<string, string>;
    };

