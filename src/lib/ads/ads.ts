const CLIENT_KEY = "typenxt-adsense-client";
const STATS_KEY = "typenxt-ad-stats";
const RPM_KEY = "typenxt-rpm";

export type HouseAd = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  cta: string;
  href: string;
};

export const HOUSE_ADS: HouseAd[] = [
  {
    id: "exam",
    kicker: "Sponsored",
    title: "Advertise on TypeNxt",
    body: "Exam-day traffic: BSF, SSC and daily practice sessions. High intent, repeat visits.",
    cta: "Book a slot",
    href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20ad%20slot",
  },
  {
    id: "keys",
    kicker: "Sponsored",
    title: "Quiet keyboards for long tests",
    body: "A stable ten-minute paper needs a keyboard that does not fight your hands.",
    cta: "Partner with us",
    href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20keyboard%20feature",
  },
  {
    id: "coaching",
    kicker: "Sponsored",
    title: "Coaching institutes: reach aspirants",
    body: "Put your batch, mock test or stenography course in front of people already training.",
    cta: "Get rate card",
    href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20institute%20ads",
  },
];

export type AdStats = {
  impressions: number;
  clicks: number;
  tests: number;
};

export function loadAdClient(): string {
  try {
    return localStorage.getItem(CLIENT_KEY) ?? "";
  } catch {
    return "";
  }
}

export function saveAdClient(id: string) {
  const next = id.trim();
  localStorage.setItem(CLIENT_KEY, next);
}

export function loadRpm(): number {
  try {
    const n = Number(localStorage.getItem(RPM_KEY));
    return Number.isFinite(n) && n > 0 ? n : 200;
  } catch {
    return 200;
  }
}

export function saveRpm(n: number) {
  localStorage.setItem(RPM_KEY, String(n));
}

export function loadAdStats(): AdStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return { impressions: 0, clicks: 0, tests: 0 };
    const parsed = JSON.parse(raw) as AdStats;
    return {
      impressions: parsed.impressions || 0,
      clicks: parsed.clicks || 0,
      tests: parsed.tests || 0,
    };
  } catch {
    return { impressions: 0, clicks: 0, tests: 0 };
  }
}

function writeStats(s: AdStats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(s));
}

export function recordImpression() {
  const s = loadAdStats();
  s.impressions += 1;
  writeStats(s);
}

export function recordClick() {
  const s = loadAdStats();
  s.clicks += 1;
  writeStats(s);
}

export function recordTest() {
  const s = loadAdStats();
  s.tests += 1;
  writeStats(s);
}

export function estimateInr(impressions: number, rpm: number) {
  return (impressions / 1000) * rpm;
}

export function adsTxtLine(client: string) {
  const pub = client.replace(/^ca-/, "");
  if (!pub.startsWith("pub-")) {
    return "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0";
  }
  return `google.com, ${pub}, DIRECT, f08c47fec0942fa0`;
}

export function pickHouseAd(seed = 0) {
  return HOUSE_ADS[Math.abs(seed) % HOUSE_ADS.length]!;
}

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

export function loadAdsense(client: string) {
  if (!client.startsWith("ca-pub-")) return;
  const id = "typenxt-adsense";
  if (document.getElementById(id)) return;
  const s = document.createElement("script");
  s.id = id;
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
  document.head.appendChild(s);
}

export function pushAdsense() {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    /* localhost / preview often blocks */
  }
}
