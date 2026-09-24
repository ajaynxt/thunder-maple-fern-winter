import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  loadAdClient,
  pickHouseAd,
  pushAdsense,
  recordClick,
  recordImpression,
  type HouseAd,
} from "@/lib/ads/ads";
import { cn } from "@/lib/utils";

export function AdSlot({
  slot,
  className,
  compact = false,
}: {
  slot: string;
  className?: string;
  compact?: boolean;
}) {
  const [client, setClient] = useState("");
  const ad = useMemo(() => pickHouseAd(slot.length + slot.charCodeAt(0)), [slot]);
  const seen = useRef(false);

  useEffect(() => {
    setClient(loadAdClient());
  }, []);

  useEffect(() => {
    if (seen.current) return;
    seen.current = true;
    recordImpression();
  }, []);

  useEffect(() => {
    if (!client.startsWith("ca-pub-")) return;
    const t = window.setTimeout(() => pushAdsense(), 120);
    return () => window.clearTimeout(t);
  }, [client]);

  if (client.startsWith("ca-pub-")) {
    return (
      <div className={cn("overflow-hidden rounded-lg border border-border bg-elevated", className)}>
        <p className="px-3 pt-2 text-xs tracking-[0.14em] text-subtle uppercase">Advertisement</p>
        <ins
          className="adsbygoogle block min-h-[90px] w-full"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  return <HouseCard ad={ad} compact={compact} className={className} />;
}

export function HouseCard({
  ad,
  compact,
  className,
  onDone,
}: {
  ad: HouseAd;
  compact?: boolean;
  className?: string;
  onDone?: () => void;
}) {
  return (
    <a
      href={ad.href}
      onClick={() => {
        recordClick();
        onDone?.();
      }}
      className={cn(
        "block rounded-lg border border-border bg-elevated no-underline transition-[border-color] duration-150 hover:border-border-strong",
        compact ? "p-3" : "p-4",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.16em] text-subtle uppercase">{ad.kicker}</p>
          <p className={cn("mt-1 font-medium text-fg", compact ? "text-sm" : "text-base")}>{ad.title}</p>
          {!compact ? <p className="mt-1 text-sm leading-relaxed text-muted">{ad.body}</p> : null}
        </div>
        <span className="mt-1 inline-flex items-center gap-1 text-xs text-accent">
          {ad.cta}
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </a>
  );
}
