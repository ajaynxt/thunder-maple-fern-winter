import { cn } from "@/lib/utils";
import type { DrillKind, Language, Level } from "@/lib/typing/corpus";
import type { Mode } from "@/lib/typing/engine";
import type { Settings } from "@/lib/typing/use-session";

function ChipGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
      <div className="flex flex-wrap gap-1">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "h-9 rounded-md px-3 text-[13px] transition-colors duration-150",
              value === opt.id
                ? "bg-accent text-accent-fg"
                : "border border-border bg-elevated text-muted hover:text-fg",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Controls({
  settings,
  onPatch,
}: {
  settings: Settings;
  onPatch: (p: Partial<Settings>) => void;
}) {
  const times =
    settings.mode === "exam"
      ? [
          { id: "300", label: "5 min" },
          { id: "600", label: "10 min" },
        ]
      : settings.mode === "drill"
        ? [
            { id: "15", label: "15s" },
            { id: "30", label: "30s" },
            { id: "60", label: "60s" },
          ]
        : [
            { id: "15", label: "15s" },
            { id: "30", label: "30s" },
            { id: "60", label: "1 min" },
            { id: "120", label: "2 min" },
            { id: "300", label: "5 min" },
          ];

  return (
    <div className="flex flex-col gap-4">
      <ChipGroup<Mode>
        label="Mode"
        value={settings.mode}
        onChange={(mode) => onPatch({ mode })}
        options={[
          { id: "practice", label: "Practice" },
          { id: "exam", label: "Exam" },
          { id: "drill", label: "Speed drill" },
        ]}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ChipGroup<Language>
          label="Language"
          value={settings.language}
          onChange={(language) => onPatch({ language })}
          options={[
            { id: "en", label: "English" },
            { id: "hi", label: "Hindi" },
          ]}
        />
        <ChipGroup
          label="Duration"
          value={String(settings.duration)}
          onChange={(id) => onPatch({ duration: Number(id) })}
          options={times}
        />
        {settings.mode === "drill" ? (
          <ChipGroup<DrillKind>
            label="Drill"
            value={settings.drill}
            onChange={(drill) => onPatch({ drill })}
            options={[
              { id: "common", label: "Common" },
              { id: "home", label: "Home row" },
              { id: "numbers", label: "Numbers" },
              { id: "punct", label: "Punctuation" },
              { id: "speed", label: "Sprint" },
            ]}
          />
        ) : (
          <ChipGroup<Level>
            label="Level"
            value={settings.level}
            onChange={(level) => onPatch({ level })}
            options={[
              { id: "easy", label: "Easy" },
              { id: "medium", label: "Medium" },
              { id: "hard", label: "Hard" },
            ]}
          />
        )}
        <ChipGroup
          label="Backspace"
          value={settings.backspace ? "on" : "off"}
          onChange={(v) => onPatch({ backspace: v === "on" })}
          options={[
            { id: "on", label: "On" },
            { id: "off", label: "Off" },
          ]}
        />
      </div>
    </div>
  );
}
