"use client";

import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react";
import {
  type CSSProperties,
  type FormEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button, ButtonLink } from "@/components/button";
import { getRouteHref } from "@/config/routes";
import { getPrimaryContactAction } from "@/config/site";
import type { ContactApiResponse } from "@/lib/contact-api";
import {
  DIAGNOSTIC_ITEMS,
  scoreDiagnostic,
  type DiagnosticAnswers,
  type DiagnosticItemId,
  type DiagnosticResult,
} from "@/lib/contact-diagnostic";

import {
  DIAGNOSTIC_COPY,
  type DiagnosticLocale,
} from "./diagnostic-copy";
import styles from "./diagnostic.module.css";

type ShareState =
  | "idle"
  | "submitting"
  | "success"
  | "email-error"
  | "send-error";

export type BottleneckDiagnosticProps = {
  id?: string;
  title?: string;
  intro?: string;
  className?: string;
  introOnly?: boolean;
  locale?: DiagnosticLocale;
};

export function BottleneckDiagnostic({
  id = "bottleneck-check",
  title,
  intro,
  className,
  introOnly = false,
  locale = "en",
}: BottleneckDiagnosticProps) {
  const copy = DIAGNOSTIC_COPY[locale];
  const radioGroupId = useId().replaceAll(":", "");
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const resultRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const firstRadioRef = useRef<HTMLInputElement>(null);
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === DIAGNOSTIC_ITEMS.length;
  const primaryContactAction = useMemo(
    () => getPrimaryContactAction(locale),
    [locale],
  );
  const primaryContactLabel = primaryContactAction.isBooking
    ? copy.booking
    : primaryContactAction.label;

  useEffect(() => {
    if (!result) return;
    resultRef.current?.focus();
  }, [result]);

  function selectAnswer(itemId: DiagnosticItemId, answer: boolean) {
    setAnswers((current) => ({ ...current, [itemId]: answer }));
    setResult(null);
    setShareOpen(false);
    setShareState("idle");
  }

  function showResult() {
    if (!allAnswered) return;
    setResult(scoreDiagnostic(answers as DiagnosticAnswers));
    setShareOpen(false);
    setShareState("idle");
  }

  function reset() {
    setAnswers({});
    setResult(null);
    setShareOpen(false);
    setShareState("idle");
    setEmail("");
    setWebsite("");
    setStartedAt(Date.now());
    window.requestAnimationFrame(() => firstRadioRef.current?.focus());
  }

  function openShareForm() {
    setShareOpen(true);
    setShareState("idle");
    window.requestAnimationFrame(() => emailRef.current?.focus());
  }

  async function sendResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || !allAnswered) return;

    const normalizedEmail = email.trim();
    if (!emailRef.current?.validity.valid || normalizedEmail.length > 254) {
      setShareState("email-error");
      emailRef.current?.focus();
      return;
    }

    setShareState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "diagnostic-result",
          email: normalizedEmail,
          answers,
          score: result.score,
          band: result.band,
          website,
          startedAt,
        }),
      });
      const body = (await response.json()) as ContactApiResponse;

      if (!response.ok || !body.ok) {
        setShareState("send-error");
        return;
      }

      setEmail("");
      setWebsite("");
      setShareState("success");
    } catch {
      setShareState("send-error");
    }
  }

  const progress = answeredCount / DIAGNOSTIC_ITEMS.length;

  return (
    <div className={`${styles.diagnostic} ${className ?? ""}`} id={id}>
      <header className={styles.header}>
        {introOnly ? null : (
          <>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h2 className={styles.title}>{title ?? copy.title}</h2>
          </>
        )}
        <p className={styles.intro}>{intro ?? copy.intro}</p>
      </header>

      <div className={styles.progressBlock}>
        <p
          aria-live="polite"
          className={styles.progressValue}
          role="status"
        >
          {copy.answered(answeredCount, DIAGNOSTIC_ITEMS.length)}
        </p>
        <div
          aria-label={copy.progressLabel}
          aria-valuemax={DIAGNOSTIC_ITEMS.length}
          aria-valuemin={0}
          aria-valuenow={answeredCount}
          aria-valuetext={copy.answered(
            answeredCount,
            DIAGNOSTIC_ITEMS.length,
          )}
          className={styles.progress}
          role="progressbar"
        >
          <span
            className={styles.progressFill}
            style={
              {
                "--diagnostic-progress": progress,
              } as CSSProperties
            }
          />
        </div>
      </div>

      <ol className={styles.statementList}>
        {DIAGNOSTIC_ITEMS.map((item, index) => {
          const selectedAnswer = answers[item.id];

          return (
            <li className={styles.statementItem} key={item.id}>
              <fieldset className={styles.statementFieldset}>
                <legend className={styles.legend}>
                  {copy.statements[item.id]}
                </legend>
                <div aria-hidden="true" className={styles.statementPrompt}>
                  <span aria-hidden="true" className={styles.statementNumber}>
                    {index + 1}
                  </span>
                  <span>{copy.statements[item.id]}</span>
                </div>
                <div className={styles.options}>
                  <label className={styles.option}>
                    <input
                      checked={selectedAnswer === true}
                      className={styles.radio}
                      name={`${radioGroupId}-${item.id}`}
                      onChange={() => selectAnswer(item.id, true)}
                      ref={index === 0 ? firstRadioRef : undefined}
                      type="radio"
                      value="true"
                    />
                    <span>{copy.trueLabel}</span>
                  </label>
                  <label className={styles.option}>
                    <input
                      checked={selectedAnswer === false}
                      className={styles.radio}
                      name={`${radioGroupId}-${item.id}`}
                      onChange={() => selectAnswer(item.id, false)}
                      type="radio"
                      value="false"
                    />
                    <span>{copy.falseLabel}</span>
                  </label>
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div className={styles.checkControls}>
        <Button cta disabled={!allAnswered} onClick={showResult}>
          {copy.seeResult}
        </Button>
        <Button onClick={reset} size="compact" variant="text">
          <RotateCcw aria-hidden="true" size={16} />
          {copy.reset}
        </Button>
      </div>

      {result ? (
        <div
          aria-describedby={`${id}-result-score ${id}-result-body`}
          aria-labelledby={`${id}-result-title`}
          className={styles.result}
          ref={resultRef}
          role="region"
          tabIndex={-1}
        >
          <div className={styles.resultHeading}>
            <p className={styles.resultLabel}>{copy.resultLabel}</p>
            <p className={styles.resultScore} id={`${id}-result-score`}>
              {copy.score(result.score, result.maximum)}
            </p>
            <h3 className={styles.resultTitle} id={`${id}-result-title`}>
              {copy.resultTitles[result.band]}
            </h3>
          </div>
          <p className={styles.resultBody} id={`${id}-result-body`}>
            {copy.resultBodies[result.band]}
          </p>

          <div className={styles.resultActions}>
            {result.band === "low" ? (
              <ButtonLink
                className={styles.resultAction}
                href={
                  locale === "de"
                    ? getRouteHref("contact", "de", "#direct-contact")
                    : getRouteHref("contact", "en", "#contact-form")
                }
                variant="secondary"
              >
                {copy.lowReferral}
              </ButtonLink>
            ) : (
              <ButtonLink
                className={styles.resultAction}
                href={primaryContactAction.href}
                variant="secondary"
              >
                {primaryContactLabel}
              </ButtonLink>
            )}
            <Button
              aria-controls={`${id}-share-form`}
              aria-expanded={shareOpen}
              className={styles.resultAction}
              onClick={openShareForm}
              variant="secondary"
            >
              <Send aria-hidden="true" size={17} />
              {copy.shareResult}
            </Button>
          </div>

          {shareOpen ? (
            <div className={styles.sharePanel} id={`${id}-share-form`}>
              {shareState === "success" ? (
                <div
                  aria-live="polite"
                  className={`${styles.shareNotice} ${styles.shareSuccess}`}
                  role="status"
                >
                  <CheckCircle2 aria-hidden="true" size={19} />
                  <p>{copy.sent}</p>
                </div>
              ) : (
                <form className={styles.shareForm} noValidate onSubmit={sendResult}>
                  <p className={styles.shareTitle}>{copy.shareTitle}</p>
                  <div className={styles.emailField}>
                    <label htmlFor={`${id}-result-email`}>{copy.emailLabel}</label>
                    <input
                      aria-describedby={`${id}-email-help${
                        shareState === "email-error" ||
                        shareState === "send-error"
                          ? ` ${id}-share-error`
                          : ""
                      }`}
                      aria-invalid={shareState === "email-error"}
                      autoComplete="email"
                      id={`${id}-result-email`}
                      inputMode="email"
                      maxLength={254}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        if (
                          shareState === "email-error" ||
                          shareState === "send-error"
                        ) {
                          setShareState("idle");
                        }
                      }}
                      ref={emailRef}
                      required
                      type="email"
                      value={email}
                    />
                    <p id={`${id}-email-help`}>{copy.emailHelper}</p>
                  </div>
                  <div aria-hidden="true" className={styles.honeypot}>
                    <label htmlFor={`${id}-result-website`}>
                      Leave this field empty
                    </label>
                    <input
                      autoComplete="off"
                      id={`${id}-result-website`}
                      onChange={(event) => setWebsite(event.target.value)}
                      tabIndex={-1}
                      type="text"
                      value={website}
                    />
                  </div>
                  {shareState === "email-error" ||
                  shareState === "send-error" ? (
                    <div
                      className={`${styles.shareNotice} ${styles.shareError}`}
                      id={`${id}-share-error`}
                      role="alert"
                    >
                      <AlertCircle aria-hidden="true" size={19} />
                      <p>
                        {shareState === "email-error"
                          ? copy.emailError
                          : copy.sendError}
                      </p>
                    </div>
                  ) : null}
                  <div className={styles.shareFooter}>
                    <Button
                      disabled={shareState === "submitting"}
                      type="submit"
                    >
                      {shareState === "submitting" ? (
                        <LoaderCircle
                          aria-hidden="true"
                          className={styles.spinner}
                          size={18}
                        />
                      ) : (
                        <Send aria-hidden="true" size={17} />
                      )}
                      {shareState === "submitting" ? copy.sending : copy.send}
                    </Button>
                    <p className={styles.sharePrivacy}>{copy.privacy}</p>
                  </div>
                </form>
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
