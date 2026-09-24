export type Mode = "practice" | "exam" | "drill";

export type Snapshot = {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  correct: number;
  typed: number;
  elapsed: number;
  remaining: number;
};

export type ExamVerdict = {
  grossWpm: number;
  netWpm: number;
  allowedErrors: number;
  extraErrors: number;
  deductedWords: number;
  passed: boolean;
  cutoff: number;
  keyDepressionsPerHour: number;
};

export function emptySnapshot(duration: number): Snapshot {
  return {
    wpm: 0,
    rawWpm: 0,
    accuracy: 100,
    errors: 0,
    correct: 0,
    typed: 0,
    elapsed: 0,
    remaining: duration,
  };
}

export function computeSnapshot(
  correct: number,
  errors: number,
  elapsedSec: number,
  duration: number,
): Snapshot {
  const typed = correct + errors;
  const minutes = Math.max(elapsedSec, 0.5) / 60;
  const wpm = Math.round(correct / 5 / minutes);
  const rawWpm = Math.round(typed / 5 / minutes);
  const accuracy = typed ? Math.round((correct / typed) * 100) : 100;
  return {
    wpm,
    rawWpm,
    accuracy,
    errors,
    correct,
    typed,
    elapsed: elapsedSec,
    remaining: Math.max(0, duration - elapsedSec),
  };
}

export function examCutoff(lang: "en" | "hi"): number {
  return lang === "hi" ? 30 : 35;
}

export function scoreExam(
  correct: number,
  errors: number,
  elapsedSec: number,
  lang: "en" | "hi",
): ExamVerdict {
  const typed = correct + errors;
  const minutes = Math.max(elapsedSec, 1) / 60;
  const grossWords = typed / 5;
  const allowedErrors = Math.floor(typed * 0.05);
  const extraErrors = Math.max(0, errors - allowedErrors);
  const deductedWords = extraErrors * 10;
  const netWords = Math.max(0, grossWords - deductedWords);
  const grossWpm = grossWords / minutes;
  const netWpm = netWords / minutes;
  const cutoff = examCutoff(lang);
  return {
    grossWpm: Math.round(grossWpm * 10) / 10,
    netWpm: Math.round(netWpm * 10) / 10,
    allowedErrors,
    extraErrors,
    deductedWords,
    passed: netWpm >= cutoff,
    cutoff,
    keyDepressionsPerHour: Math.round(typed / minutes * 60),
  };
}

export function scoreWord(expected: string, typed: string): { correct: number; errors: number } {
  const n = Math.max(expected.length, typed.length);
  let correct = 0;
  let errors = 0;
  for (let i = 0; i < n; i++) {
    if (typed[i] === expected[i]) correct += 1;
    else errors += 1;
  }
  return { correct, errors };
}

export function scorePrefix(target: string, typed: string): { correct: number; errors: number } {
  let correct = 0;
  let errors = 0;
  const n = typed.length;
  for (let i = 0; i < n; i++) {
    if (typed[i] === target[i]) correct += 1;
    else errors += 1;
  }
  return { correct, errors };
}
