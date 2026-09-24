import { useEffect, useState } from "react";
import { Copy, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  adsTxtLine,
  estimateInr,
  loadAdClient,
  loadAdStats,
  loadRpm,
  saveAdClient,
  saveRpm,
  type AdStats,
} from "@/lib/ads/ads";
import { formatInr } from "@/lib/utils";

export function EarningsButton() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState("");
  const [rpm, setRpm] = useState("200");
  const [stats, setStats] = useState<AdStats>({ impressions: 0, clicks: 0, tests: 0 });

  useEffect(() => {
    setClient(loadAdClient());
    setRpm(String(loadRpm()));
    setStats(loadAdStats());
  }, [open]);

  const est = estimateInr(stats.impressions, Number(rpm) || loadRpm());
  const line = adsTxtLine(client);

  function save() {
    saveAdClient(client);
    const n = Number(rpm);
    if (Number.isFinite(n) && n > 0) saveRpm(n);
    toast.success("Ad settings saved");
    setOpen(false);
    window.location.reload();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <IndianRupee />
          Earn
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Ads and earnings</DialogTitle>
        <DialogDescription>
          Ads never run during a live test. They appear in the banner and as a short card after you finish — that is
          where the money is.
        </DialogDescription>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Mini label="Impressions" value={stats.impressions} />
          <Mini label="Clicks" value={stats.clicks} />
          <Mini label="Est. revenue" value={formatInr(est)} />
        </div>
        <p className="mt-2 text-xs text-subtle">
          Estimate uses your RPM. Real AdSense payouts appear in Google after the site is approved.
        </p>

        <div className="mt-5 space-y-3">
          <div>
            <Label htmlFor="pub">AdSense publisher ID</Label>
            <Input
              id="pub"
              className="mt-1.5 font-mono"
              placeholder="ca-pub-xxxxxxxxxxxxxxxx"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="rpm">Assumed RPM (INR per 1000 views)</Label>
            <Input
              id="rpm"
              className="mt-1.5"
              inputMode="decimal"
              value={rpm}
              onChange={(e) => setRpm(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 rounded-md border border-border bg-elevated p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs tracking-[0.14em] text-muted uppercase">ads.txt</p>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-xs text-muted hover:text-fg"
              onClick={() => {
                void navigator.clipboard.writeText(line);
                toast.success("Copied ads.txt line");
              }}
            >
              <Copy className="size-3.5" />
              Copy
            </button>
          </div>
          <p className="mt-2 font-mono text-xs break-all text-fg">{line}</p>
          <p className="mt-2 text-xs leading-relaxed text-subtle">
            Put this on your domain root after AdSense approval. Direct deals already work via the mail links on house
            ads.
          </p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={save}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Mini({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-border px-3 py-2">
      <p className="text-xs tracking-[0.12em] text-muted uppercase">{label}</p>
      <p className="mt-1 font-mono text-sm tabular-nums text-fg">{value}</p>
    </div>
  );
}
