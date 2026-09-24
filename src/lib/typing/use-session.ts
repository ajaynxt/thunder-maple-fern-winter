import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { passageForExam, wordsForDrill, wordsForPractice, type DrillKind, type Language, type Level } from "./corpus";
import {
  computeSnapshot,
  emptySnapshot,
  scoreExam,
  scorePrefix,
  scoreWord,
  type ExamVerdict,
  type Mode,
  type Snapshot,
} from "./engine";
import { loadBest, loadHistory, pushHistory, type HistoryRow } from "@/lib/history";
import { recordTest } from "@/lib/ads/ads";

export type Settings = {
  mode: Mode;
  language: Language;
  level: Level;
  duration: number;
  drill: DrillKind;
  backspace: boolean;
  showPace: boolean;
  targetWpm: number;
};

const DEFAULTS: Settings = {
  mode: "practice",
  language: "en",
  level: "medium",
  duration: 60,
  drill: "common",
  backspace: true,
  showPace: true,
  targetWpm: 40,
};

export function examPreset(lang: Language): Partial<Settings> {
  return {
    mode: "exam",
    language: lang,
    duration: 600,
    backspace: false,
    level: "medium",
    targetWpm: lang === "hi" ? 30 : 35,
    showPace: true,
  };
}

export type Phase = "idle" | "running" | "ad" | "done";
export type WordMark = "ok" | "bad";

export function useTypingSession() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [words, setWords] = useState<string[]>([]);
  const [passage, setPassage] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [typedPassage, setTypedPassage] = useState("");
  const [wordStatus, setWordStatus] = useState<WordMark[]>([]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [snapshot, setSnapshot] = useState<Snapshot>(emptySnapshot(DEFAULTS.duration));
  const [verdict, setVerdict] = useState<ExamVerdict | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);

  const startedAt = useRef<number | null>(null);
  const correctRef = useRef(0);
  const errorsRef = useRef(0);
  const phaseRef = useRef<Phase>("idle");
  const settingsRef = useRef(settings);
  const wordsRef = useRef(words);
  const passageRef = useRef(passage);
  const wordIndexRef = useRef(0);
  const bufferRef = useRef("");
  const typedRef = useRef("");
  const interval = useRef<number | null>(null);

  phaseRef.current = phase;
  settingsRef.current = settings;
  wordsRef.current = words;
  passageRef.current = passage;
  wordIndexRef.current = wordIndex;
  bufferRef.current = buffer;
  typedRef.current = typedPassage;

  const isPassage = settings.mode === "exam";

  const rebuild = useCallback((next: Settings) => {
    if (next.mode === "exam") {
      setPassage(passageForExam(next.language, next.duration));
      setWords([]);
    } else if (next.mode === "drill") {
      setWords(wordsForDrill(next.drill, next.language, next.duration));
      setPassage("");
    } else {
      setWords(wordsForPractice(next.language, next.level, next.duration));
      setPassage("");
    }
    setWordIndex(0);
    setBuffer("");
    setTypedPassage("");
    setWordStatus([]);
    setPhase("idle");
    setSnapshot(emptySnapshot(next.duration));
    setVerdict(null);
    setNewBest(false);
    startedAt.current = null;
    correctRef.current = 0;
    errorsRef.current = 0;
    if (interval.current) {
      window.clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => {
    setHistory(loadHistory());
    setBest(loadBest());
    rebuild(DEFAULTS);
  }, [rebuild]);

  const patch = useCallback(
    (partial: Partial<Settings>) => {
      const next = { ...settingsRef.current, ...partial };
      if (partial.mode === "exam" && !partial.duration) next.duration = 600;
      if (partial.mode === "exam") next.backspace = false;
      if (partial.mode === "practice" && settingsRef.current.mode === "exam") {
        next.duration = 60;
        next.backspace = true;
      }
      if (partial.mode === "drill" && settingsRef.current.mode === "exam") {
        next.duration = 30;
        next.backspace = true;
      }
      setSettings(next);
      rebuild(next);
    },
    [rebuild],
  );

  const liveCounts = useCallback(() => {
    const s = settingsRef.current;
    let extraC = 0;
    let extraE = 0;
    if (s.mode === "exam") {
      const { correct, errors } = scorePrefix(passageRef.current, typedRef.current);
      extraC = correct;
      extraE = errors;
    } else {
      const expected = wordsRef.current[wordIndexRef.current] ?? "";
      const typed = bufferRef.current;
      const n = Math.max(expected.length, typed.length);
      for (let i = 0; i < n; i++) {
        if (i >= typed.length) break;
        if (typed[i] === expected[i]) extraC += 1;
        else extraE += 1;
      }
    }
    return {
      correct: correctRef.current + extraC,
      errors: errorsRef.current + extraE,
    };
  }, []);

  const finish = useCallback(() => {
    if (phaseRef.current === "done" || phaseRef.current === "ad") return;
    if (interval.current) {
      window.clearInterval(interval.current);
      interval.current = null;
    }
    const s = settingsRef.current;
    const elapsed = startedAt.current
      ? Math.min((performance.now() - startedAt.current) / 1000, s.duration)
      : 0;
    const { correct, errors } = liveCounts();
    const snap = computeSnapshot(correct, errors, Math.max(elapsed, 0.5), s.duration);
    setSnapshot(snap);
    const exam = s.mode === "exam" ? scoreExam(correct, errors, Math.max(elapsed, 1), s.language) : null;
    setVerdict(exam);
    const row: HistoryRow = {
      t: Date.now(),
      wpm: exam ? exam.netWpm : snap.wpm,
      accuracy: snap.accuracy,
      errors: snap.errors,
      mode: s.mode,
      lang: s.language,
      duration: s.duration,
      passed: exam?.passed,
    };
    setHistory(pushHistory(row));
    const prevBest = loadBest();
    if (row.wpm > best && row.wpm > 0) setNewBest(true);
    setBest(Math.max(prevBest, row.wpm));
    recordTest();
    setPhase("ad");
    phaseRef.current = "ad";
  }, [best, liveCounts]);

  const tick = useCallback(() => {
    if (phaseRef.current !== "running" || !startedAt.current) return;
    const s = settingsRef.current;
    const elapsed = (performance.now() - startedAt.current) / 1000;
    if (elapsed >= s.duration) {
      finish();
      return;
    }
    const { correct, errors } = liveCounts();
    setSnapshot(computeSnapshot(correct, errors, elapsed, s.duration));
  }, [finish, liveCounts]);

  const ensureRunning = useCallback(() => {
    if (phaseRef.current === "running") return;
    if (phaseRef.current !== "idle") return;
    startedAt.current = performance.now();
    setPhase("running");
    phaseRef.current = "running";
    interval.current = window.setInterval(tick, 200);
  }, [tick]);

  useEffect(() => {
    return () => {
      if (interval.current) window.clearInterval(interval.current);
    };
  }, []);

  const commitWord = useCallback(
    (typed: string) => {
      const expected = wordsRef.current[wordIndexRef.current] ?? "";
      if (!expected && !typed) return;
      const { correct, errors } = scoreWord(expected, typed);
      correctRef.current += correct;
      errorsRef.current += errors;
      const nextIndex = wordIndexRef.current + 1;
      setWordStatus((prev) => [...prev, typed === expected ? "ok" : "bad"]);
      setWordIndex(nextIndex);
      setBuffer("");
      bufferRef.current = "";
      if (nextIndex >= wordsRef.current.length) finish();
    },
    [finish],
  );

  const onChars = useCallback(
    (value: string) => {
      if (phaseRef.current === "done" || phaseRef.current === "ad") return;
      const s = settingsRef.current;
      ensureRunning();
      if (s.mode === "exam") {
        const target = passageRef.current;
        let next = value.replace(/\n/g, " ");
        if (!s.backspace && next.length < typedRef.current.length) next = typedRef.current;
        if (next.length > target.length) next = next.slice(0, target.length);
        setTypedPassage(next);
        typedRef.current = next;
        if (next.length >= target.length) finish();
        return;
      }
      if (/\s/.test(value)) {
        const parts = value.split(/\s+/);
        const last = parts.pop() ?? "";
        for (const part of parts) {
          if (part.length) commitWord(part);
        }
        setBuffer(last);
        bufferRef.current = last;
        return;
      }
      setBuffer(value);
      bufferRef.current = value;
    },
    [commitWord, ensureRunning, finish],
  );

  const dismissAd = useCallback(() => {
    setPhase("done");
    phaseRef.current = "done";
  }, []);

  const restart = useCallback(() => {
    rebuild(settingsRef.current);
  }, [rebuild]);

  const paceChars = useMemo(() => {
    if (!settings.showPace || snapshot.elapsed <= 0) return 0;
    return Math.floor(settings.targetWpm * 5 * (snapshot.elapsed / 60));
  }, [settings.showPace, settings.targetWpm, snapshot.elapsed]);

  return {
    settings,
    patch,
    words,
    wordStatus,
    passage,
    wordIndex,
    buffer,
    typedPassage,
    phase,
    snapshot,
    verdict,
    history,
    best,
    newBest,
    isPassage,
    paceChars,
    onChars,
    restart,
    finish,
    dismissAd,
  };
}
