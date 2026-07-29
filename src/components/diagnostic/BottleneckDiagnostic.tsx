"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  onComplete?: (result: DiagnosticResult) => void;
  onUseSummary?: (summary: string) => void;
};

export function BottleneckDiagnostic({
  id = "bottleneck-check",
  title = "Where does the organisation lose momentum?",
  intro = "Answer from the last few weeks. The result compares the friction reported across four areas.",
  className,
  contactAnchorId,
  onComplete,
  onUseSummary,
}: BottleneckDiagnosticProps) {
  const [answers, setAnswers] = useState<Partial<DiagnosticAnswers>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
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

  function selectAnswer(answer: DiagnosticAnswer) {
    if (!question) return;
    setAnswers((current) => ({ ...current, [question.id]: answer }));
  }

  function goForward() {
    if (!selectedAnswer) return;
    if (questionIndex === DIAGNOSTIC_QUESTIONS.length - 1) {
      setShowResult(true);
      return;
    }
    setQuestionIndex((current) => current + 1);
  }

  function goBack() {
    if (showResult) {
      setShowResult(false);
      setQuestionIndex(DIAGNOSTIC_QUESTIONS.length - 1);
      return;
    }
    setQuestionIndex((current) => Math.max(0, current - 1));
  }

  function reset() {
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
    target?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => {
      target?.querySelector<HTMLElement>("input:not([type='hidden']), textarea, select")?.focus();
    }, reduceMotion ? 0 : 350);
  }

  const answeredCount = Object.keys(answers).length;
  const progressValue = showResult ? DIAGNOSTIC_QUESTIONS.length : questionIndex + 1;

  return (
    <div className={`${styles.diagnostic} ${className ?? ""}`} id={id}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Six-question bottleneck check</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.intro}>{intro}</p>
      </header>

      <div>
        <div className={styles.progressHeader}>
          <p className={styles.progressLabel}>
            {showResult ? "Check complete" : `Question ${questionIndex + 1} of ${DIAGNOSTIC_QUESTIONS.length}`}
          </p>
          <p className={styles.progressValue}>{answeredCount} answered</p>
        </div>
        <progress
          aria-label="Bottleneck check progress"
          className={styles.progress}
          max={DIAGNOSTIC_QUESTIONS.length}
          value={progressValue}
        />
      </div>

      {result ? (
        <div className={styles.result} ref={resultRef} tabIndex={-1}>
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
                <button className={styles.primaryButton} onClick={useSummary} type="button">
                  Include this in my message
                  <ArrowRight aria-hidden="true" size={17} />
                </button>
              ) : null}
              <button className={styles.secondaryButton} onClick={goBack} type="button">
                <ArrowLeft aria-hidden="true" size={17} />
                Review answers
              </button>
            </div>
            <button className={styles.textButton} onClick={reset} type="button">
              <RotateCcw aria-hidden="true" size={16} />
              Start over
            </button>
          </div>
        </div>
      ) : (
        <>
          <fieldset aria-describedby={`${id}-context`} className={styles.question}>
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
              <button
                className={styles.secondaryButton}
                disabled={questionIndex === 0}
                onClick={goBack}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={17} />
                Back
              </button>
              <button
                className={styles.primaryButton}
                disabled={!selectedAnswer}
                onClick={goForward}
                type="button"
              >
                {questionIndex === DIAGNOSTIC_QUESTIONS.length - 1 ? "See result" : "Continue"}
                <ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
            <button className={styles.textButton} onClick={reset} type="button">
              <RotateCcw aria-hidden="true" size={16} />
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
}
