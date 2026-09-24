import { useEffect, useState } from "react";
import { HouseCard } from "@/components/ads/ad-slot";
import { Button } from "@/components/ui/button";
import { pickHouseAd, recordImpression } from "@/lib/ads/ads";

export function Interstitial({ onSkip }: { onSkip: () => void }) {
  const [left, setLeft] = useState(3);
  const ad = pickHouseAd(Date.now() % 9);

  useEffect(() => {
    recordImpression();
    const id = window.setInterval(() => {
      setLeft((n) => {
        if (n <= 1) {
          window.clearInterval(id);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-bg/80 p-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5">
        <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Sponsored</p>
        <h2 className="font-display mt-1 text-2xl tracking-tight text-fg">Before your result</h2>
        <p className="mt-1 text-sm text-muted">This card is how the site earns. It never appears while you type.</p>
        <div className="mt-4">
          <HouseCard ad={ad} />
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="secondary" disabled={left > 0} onClick={onSkip}>
            {left > 0 ? `Continue in ${left}` : "See result"}
          </Button>
        </div>
      </div>
    </div>
  );
}
