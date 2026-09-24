import { createFileRoute } from "@tanstack/react-router";
import { Keyboard, RotateCcw, Timer, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { EarningsButton } from "@/components/ads/earnings";
import { Interstitial } from "@/components/ads/interstitial";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Controls } from "@/components/typing/controls";
import { HistoryChart } from "@/components/typing/history-chart";
import { Hud } from "@/components/typing/hud";
import { Results } from "@/components/typing/results";
import { Stage } from "@/components/typing/stage";
import { loadAdClient, loadAdsense } from "@/lib/ads/ads";
import { examPreset, useTypingSession } from "@/lib/typing/use-session";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const session = useTypingSession();
  const [focused, setFocused] = useState(false);
  const typing = session.phase === "running";
  const locked = session.phase === "done" || session.phase === "ad";
  const restart = session.restart;

  useEffect(() => {
    const client = loadAdClient();
    if (client) loadAdsense(client);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Tab") {
        e.preventDefault();
        restart();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [restart]);

  return (
    <main className="min-h-screen pb-16">
      <header className="border-b border-border">
        <div className="mx-auto flex w-[min(1080px,calc(100%-28px))] items-center justify-between gap-3 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-md border border-border bg-elevated">
              <Keyboard className="size-4 text-accent" />
            </div>
            <div>
              <p className="font-display text-lg leading-none tracking-tight">TypeNxt</p>
              <p className="mt-1 text-xs tracking-[0.12em] text-muted uppercase">Speed · Exam · Hindi</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => session.patch(examPreset("en"))}
            >
              <Timer />
              BSF English
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => session.patch(examPreset("hi"))}
            >
              BSF Hindi
            </Button>
            <EarningsButton />
          </div>
        </div>
      </header>

      <div className="mx-auto w-[min(1080px,calc(100%-28px))]">
        <section className="pt-8 pb-6">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">Typing trainer</p>
          <h1 className="font-display mt-2 max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.95] tracking-tight text-balance">
            Build speed. Keep accuracy.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted">
            A fast English and Hindi trainer with BSF/SSC exam scoring, no-backspace papers, and speed drills. Ads stay
            off while you type.
          </p>
        </section>

        {!typing ? <AdSlot slot="top-banner" className="mb-6" /> : null}

        <Controls settings={session.settings} onPatch={session.patch} />

        <div className="mt-6">
          <Hud snapshot={session.snapshot} urgent={session.snapshot.remaining <= 15 && typing} />
        </div>

        <div className="mt-4">
          <Stage
            isPassage={session.isPassage}
            words={session.words}
            wordIndex={session.wordIndex}
            wordStatus={session.wordStatus}
            buffer={session.buffer}
            passage={session.passage}
            typedPassage={session.typedPassage}
            language={session.settings.language}
            paceChars={session.paceChars}
            disabled={locked}
            focused={focused}
            onFocusChange={setFocused}
            onChars={session.onChars}
            allowBackspace={session.settings.backspace}
          />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-subtle">
            {session.settings.mode === "exam"
              ? "Exam paper · backspace off · 5% error allowance, extra errors deduct 10 words"
              : "Tip: space commits a word. Tab restarts. Ghost caret is your target pace."}
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={session.restart}>
              <RotateCcw />
              Reset
            </Button>
            {typing ? (
              <Button variant="paper" size="sm" onClick={session.finish}>
                Finish
              </Button>
            ) : null}
          </div>
        </div>

        {session.phase === "done" && session.snapshot.typed > 0 ? (
          <div className="mt-6">
            <Results
              snapshot={session.snapshot}
              verdict={session.verdict}
              newBest={session.newBest}
              onRestart={session.restart}
            />
          </div>
        ) : null}

        {!typing ? (
          <div className="mt-6">
            <AdSlot slot="after-test" />
          </div>
        ) : null}

        <Separator className="my-8" />

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">Recent speed</p>
            <h2 className="font-display mt-1 text-2xl tracking-tight">Best {session.best || 0} WPM</h2>
            <div className="mt-3">
              <HistoryChart rows={session.history} />
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">How to get faster</p>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              <li className="flex gap-2">
                <Zap className="mt-0.5 size-4 shrink-0 text-accent" />
                Practice at 40–45 WPM so exam day 35 / 30 feels ordinary.
              </li>
              <li>Use Speed drill for 30-second sprints, then a 10-minute exam paper without backspace.</li>
              <li>Accuracy first. Extra errors after 5% cost 10 words each on the official-style score.</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => session.patch({ mode: "drill", drill: "speed", duration: 30 })}
              >
                30s sprint
              </Button>
              <Button variant="secondary" size="sm" onClick={() => session.patch(examPreset(session.settings.language))}>
                Full exam
              </Button>
            </div>
          </div>
        </section>

        <footer className="pt-10 text-center text-xs text-subtle">
          Progress stays in this browser. Hindi works with Inscript or any phonetic keyboard.
        </footer>
      </div>

      {session.phase === "ad" ? <Interstitial onSkip={session.dismissAd} /> : null}
    </main>
  );
}
