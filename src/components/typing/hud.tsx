import { formatTime } from "@/lib/utils";
import type { Snapshot } from "@/lib/typing/engine";

export function Hud({ snapshot, urgent }: { snapshot: Snapshot; urgent?: boolean }) {
  const items = [
    { label: "WPM", value: String(snapshot.wpm) },
    { label: "Accuracy", value: `${snapshot.accuracy}%` },
    { label: "Errors", value: String(snapshot.errors) },
    { label: "Time", value: formatTime(snapshot.remaining), warn: urgent },
  ];
  return (
    <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-lg border border-border bg-surface px-4 py-3"
        >
          <dt className="text-[11px] tracking-[0.14em] text-muted uppercase">{it.label}</dt>
          <dd
            className={`mt-1 font-mono text-[28px] leading-none font-medium tabular-nums ${it.warn ? "text-warn" : "text-fg"}`}
          >
            {it.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
