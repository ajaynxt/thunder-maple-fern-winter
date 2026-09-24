import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/typing/corpus";
import type { WordMark } from "@/lib/typing/use-session";

export function WordPaper({
  words,
  wordIndex,
  wordStatus,
  buffer,
  language,
  paceChars,
  disabled,
}: {
  words: string[];
  wordIndex: number;
  wordStatus: WordMark[];
  buffer: string;
  language: Language;
  paceChars: number;
  disabled?: boolean;
}) {
  const start = Math.max(0, wordIndex - 6);
  const end = Math.min(words.length, wordIndex + 52);
  const slice = words.slice(start, end);

  let charOffset = 0;
  for (let i = 0; i < wordIndex; i++) charOffset += (words[i]?.length ?? 0) + 1;
  const currentAbs = charOffset + buffer.length;

  return (
    <p
      className={cn(
        "m-0 text-[22px] leading-[1.85] break-words",
        language === "hi" ? "font-deva" : "font-mono",
        disabled && "opacity-70",
      )}
    >
      {slice.map((word, i) => {
        const abs = start + i;
        const status = abs < wordIndex ? "done" : abs === wordIndex ? "current" : "next";
        return (
          <Word
            key={`${abs}-${word}`}
            word={word}
            status={status}
            typed={abs === wordIndex ? buffer : undefined}
            ok={wordStatus[abs] !== "bad"}
            showGhost={paceChars > 0 && currentAbs < paceChars && abs === wordIndex}
          />
        );
      })}
    </p>
  );
}

function Word({
  word,
  status,
  typed,
  ok = true,
  showGhost,
}: {
  word: string;
  status: "done" | "current" | "next";
  typed?: string;
  ok?: boolean;
  showGhost?: boolean;
}) {
  if (status === "next") {
    return <span className="mr-[0.45em] text-ink-muted">{word}</span>;
  }
  if (status === "done") {
    return <span className={cn("mr-[0.45em]", ok ? "text-correct" : "text-wrong")}>{word}</span>;
  }
  const t = typed ?? "";
  const chars = [];
  const n = Math.max(word.length, t.length);
  for (let i = 0; i < n; i++) {
    const expected = word[i] ?? "";
    const got = t[i];
    if (i === t.length) {
      chars.push(<span key={`c-${i}`} className="caret" aria-hidden />);
      if (showGhost) chars.push(<span key="g" className="ghost-caret" aria-hidden />);
    }
    if (got == null) {
      chars.push(
        <span key={i} className="text-ink-muted">
          {expected}
        </span>,
      );
    } else if (got === expected) {
      chars.push(
        <span key={i} className="text-correct">
          {expected}
        </span>,
      );
    } else {
      chars.push(
        <span key={i} className="text-wrong underline decoration-2 underline-offset-4">
          {expected || got}
        </span>,
      );
    }
  }
  if (t.length >= n) {
    chars.push(<span key="end" className="caret" aria-hidden />);
  }
  return <span className="mr-[0.45em]">{chars}</span>;
}

export function PassagePaper({
  passage,
  typed,
  language,
  paceChars,
  disabled,
}: {
  passage: string;
  typed: string;
  language: Language;
  paceChars: number;
  disabled?: boolean;
}) {
  const caretRef = useRef<HTMLSpanElement>(null);
  const windowStart = Math.max(0, typed.length - 90);
  const windowEnd = Math.min(passage.length, typed.length + 220);
  const before = passage.slice(windowStart, typed.length);
  const after = passage.slice(typed.length, windowEnd);

  const painted = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < before.length; i++) {
      const abs = windowStart + i;
      const isOk = typed[abs] === passage[abs];
      nodes.push(
        <span
          key={abs}
          className={isOk ? "text-correct" : "text-wrong underline decoration-2 underline-offset-4"}
        >
          {passage[abs]}
        </span>,
      );
    }
    return nodes;
  }, [before, passage, typed, windowStart]);

  useEffect(() => {
    caretRef.current?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [typed.length]);

  return (
    <p
      className={cn(
        "m-0 text-[21px] leading-[1.9] break-words",
        language === "hi" ? "font-deva" : "font-mono",
        disabled && "opacity-70",
      )}
    >
      {windowStart > 0 ? <span className="text-ink-muted">… </span> : null}
      {painted}
      <span ref={caretRef} className="caret" aria-hidden />
      {paceChars > typed.length ? <span className="ghost-caret" aria-hidden /> : null}
      <span className="text-ink-muted">{after}</span>
    </p>
  );
}
