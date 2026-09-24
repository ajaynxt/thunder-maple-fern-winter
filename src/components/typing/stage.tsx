import { useEffect, useRef } from "react";
import { PassagePaper, WordPaper } from "@/components/typing/paper";
import type { Language } from "@/lib/typing/corpus";
import type { WordMark } from "@/lib/typing/use-session";
import { cn } from "@/lib/utils";

export function Stage({
  isPassage,
  words,
  wordIndex,
  wordStatus,
  buffer,
  passage,
  typedPassage,
  language,
  paceChars,
  disabled,
  focused,
  onFocusChange,
  onChars,
  allowBackspace,
}: {
  isPassage: boolean;
  words: string[];
  wordIndex: number;
  wordStatus: WordMark[];
  buffer: string;
  passage: string;
  typedPassage: string;
  language: Language;
  paceChars: number;
  disabled?: boolean;
  focused: boolean;
  onFocusChange: (v: boolean) => void;
  onChars: (value: string) => void;
  allowBackspace: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const composing = useRef(false);

  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled, isPassage, words]);

  function syncFromInput() {
    const el = ref.current;
    if (!el || composing.current) return;
    onChars(el.value);
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-paper p-5 text-ink shadow-paper sm:p-7",
        language === "hi" ? "font-deva" : "font-mono",
      )}
      onClick={() => ref.current?.focus()}
    >
      <textarea
        ref={ref}
        className="absolute inset-0 z-10 resize-none bg-transparent text-transparent caret-transparent outline-none"
        autoCapitalize="off"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        disabled={disabled}
        aria-label="Typing input"
        value={isPassage ? typedPassage : buffer}
        onFocus={() => onFocusChange(true)}
        onBlur={() => onFocusChange(false)}
        onPaste={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onCompositionStart={() => {
          composing.current = true;
        }}
        onCompositionEnd={() => {
          composing.current = false;
          syncFromInput();
        }}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            return;
          }
          if (e.key === " ") {
            if (!isPassage) {
              e.preventDefault();
              onChars(e.currentTarget.value + " ");
            }
            return;
          }
          if (
            !allowBackspace &&
            (e.key === "Backspace" ||
              e.key === "Delete" ||
              ((e.ctrlKey || e.metaKey) && ["a", "x", "z", "y", "v"].includes(e.key.toLowerCase())))
          ) {
            e.preventDefault();
          }
        }}
        onChange={(e) => {
          if (composing.current) return;
          onChars(e.target.value);
        }}
      />

      <div className="relative z-0 max-h-[340px] min-h-[220px] overflow-auto pr-1">
        {isPassage ? (
          <PassagePaper
            passage={passage}
            typed={typedPassage}
            language={language}
            paceChars={paceChars}
            disabled={disabled}
          />
        ) : (
          <WordPaper
            words={words}
            wordIndex={wordIndex}
            wordStatus={wordStatus}
            buffer={buffer}
            language={language}
            paceChars={paceChars}
            disabled={disabled}
          />
        )}
      </div>

      {!focused && !disabled ? (
        <div className="pointer-events-none absolute inset-0 z-20 grid place-items-center bg-paper/80">
          <p className="rounded-md border border-ink/10 bg-paper px-4 py-2 text-sm text-ink-muted">
            Click here, then type
          </p>
        </div>
      ) : null}
    </div>
  );
}
