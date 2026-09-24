import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { HistoryRow } from "@/lib/history";

export function HistoryChart({ rows }: { rows: HistoryRow[] }) {
  const data = useMemo(
    () =>
      rows.slice(-20).map((r) => ({
        wpm: Math.round(r.wpm),
        acc: r.accuracy,
        label: new Date(r.t).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      })),
    [rows],
  );

  if (data.length < 2) {
    return <p className="text-sm text-muted">Finish a couple of tests to see your speed trend here.</p>;
  }

  return (
    <div className="h-40">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <XAxis dataKey="label" tick={{ fill: "currentColor", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "currentColor", fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
          <Tooltip
            contentStyle={{
              background: "var(--color-elevated)",
              border: "1px solid var(--color-border)",
              borderRadius: 8,
              fontSize: 12,
              color: "var(--color-fg)",
            }}
          />
          <Area
            type="monotone"
            dataKey="wpm"
            stroke="var(--color-accent)"
            fill="color-mix(in oklab, var(--color-accent) 16%, transparent)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
