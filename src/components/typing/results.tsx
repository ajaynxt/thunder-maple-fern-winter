import { Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ExamVerdict, Snapshot } from "@/lib/typing/engine";

export function Results({
  snapshot,
  verdict,
  newBest,
  onRestart,
}: {
  snapshot: Snapshot;
  verdict: ExamVerdict | null;
  newBest: boolean;
  onRestart: () => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[11px] tracking-[0.14em] text-muted uppercase">Session complete</p>
          <h2 className="font-display mt-1 text-3xl tracking-tight text-fg">
            {verdict ? (verdict.passed ? "Qualified" : "Below cutoff") : "Result"}
          </h2>
          {newBest ? <p className="mt-1 text-sm text-correct">New personal best</p> : null}
        </div>
        <Button variant="paper" onClick={onRestart}>
          <RotateCcw />
          New test
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Stat label={verdict ? "Net WPM" : "WPM"} value={verdict ? verdict.netWpm : snapshot.wpm} />
        <Stat label="Accuracy" value={`${snapshot.accuracy}%`} />
        <Stat label="Errors" value={snapshot.errors} />
        <Stat label="Characters" value={snapshot.typed} />
      </div>

      {verdict ? (
        <div className="mt-5 rounded-lg border border-border bg-elevated p-4">
          <div className="flex items-center gap-2 text-sm">
            {verdict.passed ? (
              <Check className="size-4 text-correct" />
            ) : (
              <X className="size-4 text-wrong" />
            )}
            <p className="text-fg">
              Cutoff {verdict.cutoff} WPM · gross {verdict.grossWpm} · extra errors {verdict.extraErrors} · deducted{" "}
              {verdict.deductedWords} words
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            5% mistakes are allowed. Each extra error removes 10 words, matching typical BSF / SSC skill-test scoring.
            Key depressions this session: {verdict.keyDepressionsPerHour.toLocaleString("en-IN")} per hour.
          </p>
        </div>
      ) : null}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border px-3 py-3">
      <p className="text-[11px] tracking-[0.12em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-mono text-2xl tabular-nums text-fg">{value}</p>
    </div>
  );
}
