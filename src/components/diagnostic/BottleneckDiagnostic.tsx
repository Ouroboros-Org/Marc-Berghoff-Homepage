"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/button";

import {
  DIAGNOSTIC_QUESTIONS,
  scoreDiagnostic,
  type DiagnosticAnswer,
  type DiagnosticAnswers,
  type DiagnosticResult,
} from "../../lib/contact-diagnostic";
import styles from "./diagnostic.module.css";

const ANSWER_OPTIONS: { value: DiagnosticAnswer; label: string }[] = [
  { value: "often", label: "Often" },
  { value: "sometimes", label: "Sometimes" },
  { value: "rarely", label: "Rarely" },
];

export type BottleneckDiagnosticProps = {
  id?: string;
  title?: string;
  intro?: string;
  className?: string;
  contactAnchorId?: string;
  introOnly?: boolean;
  onComplete?: (result: DiagnosticResult) => void;
  onUseSummary?: (summary: string) => void;
};

export function BottleneckDiagnostic({
  id = "bottleneck-check",
  title = "Where does the organisation lose momentum?",
  intro = "Answer from the last few weeks. The result compares the friction reported across four areas.",
  className,
  contactAnchorId,
  introOnly = false,
  onComplete,
  onUseSummary,
}: BottleneckDiagnosticProps) {
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const resultRef = useRef<HTMLDivElement>(null);
  const questionRef = useRef<HTMLFieldSetElement>(null);
  const hasNavigatedRef = useRef(false);
  const question = DIAGNOSTIC_QUESTIONS[questionIndex];
  const selectedAnswer = question ? answers[question.id] : undefined;
  const result = useMemo(
    () => (showResult ? scoreDiagnostic(answers as DiagnosticAnswers) : null),
    [answers, showResult],
  );

  useEffect(() => {
    if (result) {
      resultRef.current?.focus();
      onComplete?.(result);
    }
  }, [onComplete, result]);

  useEffect(() => {
    if (!hasNavigatedRef.current || showResult) return;
    questionRef.current?.focus();
  }, [questionIndex, showResult]);

  function selectAnswer(answer: DiagnosticAnswer) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: answer }));
  }

  function goForward() {
    if (!selectedAnswer) return;
    hasNavigatedRef.current = true;
    setDirection("forward");
    if (questionIndex === DIAGNOSTIC_QUESTIONS.length - 1) {
      setShowResult(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  function goBack() {
    hasNavigatedRef.current = true;
    setDirection("back");
    if (showResult) {
      setShowResult(false);
      setQuestionIndex(DIAGNOSTIC_QUESTIONS.length - 1);
      return;
    }
    setQuestionIndex((current) => Math.max(0, current - 1));
  }

  function reset() {
    hasNavigatedRef.current = true;
    setDirection("back");
    setAnswers({});
    setQuestionIndex(0);
    setShowResult(false);
  }

  function useSummary() {
    if (!result) return;
    onUseSummary?.(result.summary);

    if (!contactAnchorId) return;
    const target = document.getElementById(contactAnchorId);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const summary = target?.querySelector<HTMLElement>("[data-diagnostic-summary]");
        (summary ?? target)?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "center",
        });
        summary?.focus({ preventScroll: true });
      });
    });
  }

  const answeredCount = Object.keys(answers).length;
  const progressValue = showResult ? DIAGNOSTIC_QUESTIONS.length : questionIndex + 1;

  return (
    <div className={`${styles.diagnostic} ${className ?? ""}`} id={id}>
      <header className={styles.header}>
        {introOnly ? (
          <p className={styles.intro}>{intro}</p>
        ) : (
          <>
            <p className={styles.eyebrow}>Six-question bottleneck check</p>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.intro}>{intro}</p>
          </>
        )}
      </header>

      <div>
        <div className={styles.progressHeader}>
          <p className={styles.progressLabel}>
            {showResult ? "Check complete" : `Question ${questionIndex + 1} of ${DIAGNOSTIC_QUESTIONS.length}`}
          </p>
          <p className={styles.progressValue}>{answeredCount} answered</p>
        </div>
        <div
          aria-label="Bottleneck check progress"
          aria-valuemax={DIAGNOSTIC_QUESTIONS.length}
          aria-valuemin={0}
          aria-valuenow={progressValue}
          className={styles.progress}
          role="progressbar"
        >
          <span
            className={styles.progressFill}
            style={
              {
                "--diagnostic-progress": `${
                  (progressValue / DIAGNOSTIC_QUESTIONS.length) * 100
                }%`,
              } as CSSProperties
            }
          />
        </div>
      </div>

      {result ? (
        <div
          className={`${styles.result} ${styles.stage}`}
          data-direction="forward"
          key="diagnostic-result"
          ref={resultRef}
          tabIndex={-1}
        >
          <div>
            <p className={styles.resultLabel}>Your directional result</p>
            <h3 className={styles.resultTitle}>{result.headline}</h3>
            <p className={styles.resultIntro}>
              This comparison reflects only the answers you gave here.
            </p>
          </div>

          <ul aria-label="Bottleneck dimensions" className={styles.dimensionList}>
            {result.dimensions.map((dimension) => (
              <li key={dimension.dimension}>
                <div className={styles.dimensionHeader}>
                  <span className={styles.dimensionLabel}>{dimension.label}</span>
                  <span className={styles.dimensionSignal}>
                    {dimension.signal} · {dimension.score}/{dimension.maximum}
                  </span>
                </div>
                <div aria-hidden="true" className={styles.track}>
                  <div
                    className={styles.bar}
                    style={{ width: `${(dimension.score / dimension.maximum) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>

          <p className={styles.disclaimer}>
            This brief check is a business reflection tool. It cannot establish cause or replace a structured organisational assessment.
          </p>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              {onUseSummary ? (
                <Button cta onClick={useSummary}>
                  Include this in my message
                  <ArrowRight aria-hidden="true" size={17} />
                </Button>
              ) : null}
              <Button onClick={goBack} variant="secondary">
                <ArrowLeft aria-hidden="true" size={17} />
                Review answers
              </Button>
            </div>
            <Button onClick={reset} size="compact" variant="text">
              <RotateCcw aria-hidden="true" size={16} />
              Start over
            </Button>
          </div>
        </div>
      ) : (
        <>
          <fieldset
            aria-describedby={`${id}-context`}
            className={`${styles.question} ${styles.stage}`}
            data-direction={direction}
            key={question.id}
            ref={questionRef}
            tabIndex={-1}
          >
            <legend className={styles.legend}>{question.prompt}</legend>
            <p className={styles.context} id={`${id}-context`}>
              {question.context}
            </p>
            <div className={styles.options}>
              {ANSWER_OPTIONS.map((option) => (
                <label className={styles.option} key={option.value}>
                  <input
                    checked={selectedAnswer === option.value}
                    className={styles.radio}
                    name={`${id}-${question.id}`}
                    onChange={() => selectAnswer(option.value)}
                    type="radio"
                    value={option.value}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <Button
                disabled={questionIndex === 0}
                onClick={goBack}
                variant="secondary"
              >
                <ArrowLeft aria-hidden="true" size={17} />
                Back
              </Button>
              <Button
                disabled={!selectedAnswer}
                onClick={goForward}
              >
                {questionIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? "See result" : "Continue"}
                <ArrowRight aria-hidden="true" size={17} />
              </Button>
            </div>
            <Button onClick={reset} size="compact" variant="text">
              <RotateCcw aria-hidden="true" size={16} />
              Reset
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
