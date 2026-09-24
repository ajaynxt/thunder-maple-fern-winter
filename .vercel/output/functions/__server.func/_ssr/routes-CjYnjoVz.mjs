import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as RotateCcw, c as Copy, i as Timer, l as Check, n as X, o as Keyboard, s as IndianRupee, t as Zap, u as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, c as DialogTrigger$1, i as DialogDescription$1, l as Slot, n as DialogClose, o as DialogPortal, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CjYnjoVz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLIENT_KEY = "typenxt-adsense-client";
var STATS_KEY = "typenxt-ad-stats";
var RPM_KEY = "typenxt-rpm";
var HOUSE_ADS = [
	{
		id: "exam",
		kicker: "Sponsored",
		title: "Advertise on TypeNxt",
		body: "Exam-day traffic: BSF, SSC and daily practice sessions. High intent, repeat visits.",
		cta: "Book a slot",
		href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20ad%20slot"
	},
	{
		id: "keys",
		kicker: "Sponsored",
		title: "Quiet keyboards for long tests",
		body: "A stable ten-minute paper needs a keyboard that does not fight your hands.",
		cta: "Partner with us",
		href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20keyboard%20feature"
	},
	{
		id: "coaching",
		kicker: "Sponsored",
		title: "Coaching institutes: reach aspirants",
		body: "Put your batch, mock test or stenography course in front of people already training.",
		cta: "Get rate card",
		href: "mailto:ajaynxt2004@gmail.com?subject=TypeNxt%20institute%20ads"
	}
];
function loadAdClient() {
	try {
		return localStorage.getItem(CLIENT_KEY) ?? "";
	} catch {
		return "";
	}
}
function saveAdClient(id) {
	const next = id.trim();
	localStorage.setItem(CLIENT_KEY, next);
}
function loadRpm() {
	try {
		const n = Number(localStorage.getItem(RPM_KEY));
		return Number.isFinite(n) && n > 0 ? n : 200;
	} catch {
		return 200;
	}
}
function saveRpm(n) {
	localStorage.setItem(RPM_KEY, String(n));
}
function loadAdStats() {
	try {
		const raw = localStorage.getItem(STATS_KEY);
		if (!raw) return {
			impressions: 0,
			clicks: 0,
			tests: 0
		};
		const parsed = JSON.parse(raw);
		return {
			impressions: parsed.impressions || 0,
			clicks: parsed.clicks || 0,
			tests: parsed.tests || 0
		};
	} catch {
		return {
			impressions: 0,
			clicks: 0,
			tests: 0
		};
	}
}
function writeStats(s) {
	localStorage.setItem(STATS_KEY, JSON.stringify(s));
}
function recordImpression() {
	const s = loadAdStats();
	s.impressions += 1;
	writeStats(s);
}
function recordClick() {
	const s = loadAdStats();
	s.clicks += 1;
	writeStats(s);
}
function recordTest() {
	const s = loadAdStats();
	s.tests += 1;
	writeStats(s);
}
function estimateInr(impressions, rpm) {
	return impressions / 1e3 * rpm;
}
function adsTxtLine(client) {
	const pub = client.replace(/^ca-/, "");
	if (!pub.startsWith("pub-")) return "google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0";
	return `google.com, ${pub}, DIRECT, f08c47fec0942fa0`;
}
function pickHouseAd(seed = 0) {
	return HOUSE_ADS[Math.abs(seed) % HOUSE_ADS.length];
}
function loadAdsense(client) {
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
function pushAdsense() {
	try {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	} catch {}
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatTime(sec) {
	const s = Math.max(0, Math.ceil(sec));
	return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
function formatInr(n) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 2
	}).format(n);
}
function AdSlot({ slot, className, compact = false }) {
	const [client, setClient] = (0, import_react.useState)("");
	const ad = (0, import_react.useMemo)(() => pickHouseAd(slot.length + slot.charCodeAt(0)), [slot]);
	const seen = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		setClient(loadAdClient());
	}, []);
	(0, import_react.useEffect)(() => {
		if (seen.current) return;
		seen.current = true;
		recordImpression();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!client.startsWith("ca-pub-")) return;
		const t = window.setTimeout(() => pushAdsense(), 120);
		return () => window.clearTimeout(t);
	}, [client]);
	if (client.startsWith("ca-pub-")) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-lg border border-border bg-elevated", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "px-3 pt-2 text-xs tracking-[0.14em] text-subtle uppercase",
			children: "Advertisement"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ins", {
			className: "adsbygoogle block min-h-[90px] w-full",
			style: { display: "block" },
			"data-ad-client": client,
			"data-ad-slot": slot,
			"data-ad-format": "auto",
			"data-full-width-responsive": "true"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseCard, {
		ad,
		compact,
		className
	});
}
function HouseCard({ ad, compact, className, onDone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href: ad.href,
		onClick: () => {
			recordClick();
			onDone?.();
		},
		className: cn("block rounded-lg border border-border bg-elevated no-underline transition-[border-color] duration-150 hover:border-border-strong", compact ? "p-3" : "p-4", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-subtle uppercase",
					children: ad.kicker
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 font-medium text-fg", compact ? "text-sm" : "text-base"),
					children: ad.title
				}),
				!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed text-muted",
					children: ad.body
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-1 inline-flex items-center gap-1 text-xs text-accent",
				children: [ad.cta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
			})]
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,border-color] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			paper: "bg-paper text-ink hover:bg-paper-edge",
			secondary: "border border-border bg-elevated text-fg hover:border-border-strong",
			ghost: "text-muted hover:bg-elevated hover:text-fg",
			danger: "bg-wrong text-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-bg/70", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(560px,calc(100%-24px))] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-surface p-6 shadow-[0_24px_80px_rgb(0_0_0_/_0.45)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 grid size-11 place-items-center rounded-md text-muted hover:bg-elevated hover:text-fg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-2xl font-medium tracking-tight text-fg", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm leading-relaxed text-muted", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-md border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-150 focus:border-border-strong focus:ring-2 focus:ring-accent/20", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-[11px] font-medium tracking-[0.12em] text-muted uppercase", className),
		...props
	});
}
function EarningsButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [client, setClient] = (0, import_react.useState)("");
	const [rpm, setRpm] = (0, import_react.useState)("200");
	const [stats, setStats] = (0, import_react.useState)({
		impressions: 0,
		clicks: 0,
		tests: 0
	});
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "secondary",
				size: "sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, {}), "Earn"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Ads and earnings" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Ads never run during a live test. They appear in the banner and as a short card after you finish — that is where the money is." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Impressions",
						value: stats.impressions
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Clicks",
						value: stats.clicks
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Est. revenue",
						value: formatInr(est)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-subtle",
				children: "Estimate uses your RPM. Real AdSense payouts appear in Google after the site is approved."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "pub",
					children: "AdSense publisher ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "pub",
					className: "mt-1.5 font-mono",
					placeholder: "ca-pub-xxxxxxxxxxxxxxxx",
					value: client,
					onChange: (e) => setClient(e.target.value)
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "rpm",
					children: "Assumed RPM (INR per 1000 views)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "rpm",
					className: "mt-1.5",
					inputMode: "decimal",
					value: rpm,
					onChange: (e) => setRpm(e.target.value)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-md border border-border bg-elevated p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-[0.14em] text-muted uppercase",
							children: "ads.txt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "inline-flex items-center gap-1 text-xs text-muted hover:text-fg",
							onClick: () => {
								navigator.clipboard.writeText(line);
								toast.success("Copied ads.txt line");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), "Copy"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs break-all text-fg",
						children: line
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs leading-relaxed text-subtle",
						children: "Put this on your domain root after AdSense approval. Direct deals already work via the mail links on house ads."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => setOpen(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: save,
					children: "Save"
				})]
			})
		] })]
	});
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs tracking-[0.12em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-sm tabular-nums text-fg",
			children: value
		})]
	});
}
function Interstitial({ onSkip }) {
	const [left, setLeft] = (0, import_react.useState)(3);
	const ad = pickHouseAd(Date.now() % 9);
	(0, import_react.useEffect)(() => {
		recordImpression();
		const id = window.setInterval(() => {
			setLeft((n) => {
				if (n <= 1) {
					window.clearInterval(id);
					return 0;
				}
				return n - 1;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/80 p-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-[0.16em] text-subtle uppercase",
					children: "Sponsored"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-1 text-2xl tracking-tight text-fg",
					children: "Before your result"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "This card is how the site earns. It never appears while you type."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HouseCard, { ad })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex justify-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						disabled: left > 0,
						onClick: onSkip,
						children: left > 0 ? `Continue in ${left}` : "See result"
					})
				})
			]
		})
	});
}
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-px w-full bg-border", className),
		role: "separator"
	});
}
function ChipGroup({ label, value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-1.5 text-[11px] tracking-[0.14em] text-muted uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt.id),
			className: cn("h-9 rounded-md px-3 text-[13px] transition-colors duration-150", value === opt.id ? "bg-accent text-accent-fg" : "border border-border bg-elevated text-muted hover:text-fg"),
			children: opt.label
		}, opt.id))
	})] });
}
function Controls({ settings, onPatch }) {
	const times = settings.mode === "exam" ? [{
		id: "300",
		label: "5 min"
	}, {
		id: "600",
		label: "10 min"
	}] : settings.mode === "drill" ? [
		{
			id: "15",
			label: "15s"
		},
		{
			id: "30",
			label: "30s"
		},
		{
			id: "60",
			label: "60s"
		}
	] : [
		{
			id: "15",
			label: "15s"
		},
		{
			id: "30",
			label: "30s"
		},
		{
			id: "60",
			label: "1 min"
		},
		{
			id: "120",
			label: "2 min"
		},
		{
			id: "300",
			label: "5 min"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
			label: "Mode",
			value: settings.mode,
			onChange: (mode) => onPatch({ mode }),
			options: [
				{
					id: "practice",
					label: "Practice"
				},
				{
					id: "exam",
					label: "Exam"
				},
				{
					id: "drill",
					label: "Speed drill"
				}
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					label: "Language",
					value: settings.language,
					onChange: (language) => onPatch({ language }),
					options: [{
						id: "en",
						label: "English"
					}, {
						id: "hi",
						label: "Hindi"
					}]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					label: "Duration",
					value: String(settings.duration),
					onChange: (id) => onPatch({ duration: Number(id) }),
					options: times
				}),
				settings.mode === "drill" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					label: "Drill",
					value: settings.drill,
					onChange: (drill) => onPatch({ drill }),
					options: [
						{
							id: "common",
							label: "Common"
						},
						{
							id: "home",
							label: "Home row"
						},
						{
							id: "numbers",
							label: "Numbers"
						},
						{
							id: "punct",
							label: "Punctuation"
						},
						{
							id: "speed",
							label: "Sprint"
						}
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					label: "Level",
					value: settings.level,
					onChange: (level) => onPatch({ level }),
					options: [
						{
							id: "easy",
							label: "Easy"
						},
						{
							id: "medium",
							label: "Medium"
						},
						{
							id: "hard",
							label: "Hard"
						}
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChipGroup, {
					label: "Backspace",
					value: settings.backspace ? "on" : "off",
					onChange: (v) => onPatch({ backspace: v === "on" }),
					options: [{
						id: "on",
						label: "On"
					}, {
						id: "off",
						label: "Off"
					}]
				})
			]
		})]
	});
}
function HistoryChart({ rows }) {
	const data = (0, import_react.useMemo)(() => rows.slice(-20).map((r) => ({
		wpm: Math.round(r.wpm),
		acc: r.accuracy,
		label: new Date(r.t).toLocaleDateString("en-IN", {
			day: "numeric",
			month: "short"
		})
	})), [rows]);
	if (data.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Finish a couple of tests to see your speed trend here."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-40",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				margin: {
					top: 8,
					right: 8,
					left: -18,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick: {
							fill: "currentColor",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "currentColor",
							fontSize: 11
						},
						axisLine: false,
						tickLine: false,
						width: 36
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "var(--color-elevated)",
						border: "1px solid var(--color-border)",
						borderRadius: 8,
						fontSize: 12,
						color: "var(--color-fg)"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "wpm",
						stroke: "var(--color-accent)",
						fill: "color-mix(in oklab, var(--color-accent) 16%, transparent)",
						strokeWidth: 2
					})
				]
			})
		})
	});
}
function Hud({ snapshot, urgent }) {
	const items = [
		{
			label: "WPM",
			value: String(snapshot.wpm)
		},
		{
			label: "Accuracy",
			value: `${snapshot.accuracy}%`
		},
		{
			label: "Errors",
			value: String(snapshot.errors)
		},
		{
			label: "Time",
			value: formatTime(snapshot.remaining),
			warn: urgent
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
		className: "grid grid-cols-2 gap-2 sm:grid-cols-4",
		children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border border-border bg-surface px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-[11px] tracking-[0.14em] text-muted uppercase",
				children: it.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: `mt-1 font-mono text-[28px] leading-none font-medium tabular-nums ${it.warn ? "text-warn" : "text-fg"}`,
				children: it.value
			})]
		}, it.label))
	});
}
function Results({ snapshot, verdict, newBest, onRestart }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.14em] text-muted uppercase",
						children: "Session complete"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display mt-1 text-3xl tracking-tight text-fg",
						children: verdict ? verdict.passed ? "Qualified" : "Below cutoff" : "Result"
					}),
					newBest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-correct",
						children: "New personal best"
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "paper",
					onClick: onRestart,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "New test"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: verdict ? "Net WPM" : "WPM",
						value: verdict ? verdict.netWpm : snapshot.wpm
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Accuracy",
						value: `${snapshot.accuracy}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Errors",
						value: snapshot.errors
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Characters",
						value: snapshot.typed
					})
				]
			}),
			verdict ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 rounded-lg border border-border bg-elevated p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm",
					children: [verdict.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-correct" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4 text-wrong" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-fg",
						children: [
							"Cutoff ",
							verdict.cutoff,
							" WPM · gross ",
							verdict.grossWpm,
							" · extra errors ",
							verdict.extraErrors,
							" · deducted",
							" ",
							verdict.deductedWords,
							" words"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: [
						"5% mistakes are allowed. Each extra error removes 10 words, matching typical BSF / SSC skill-test scoring. Key depressions this session: ",
						verdict.keyDepressionsPerHour.toLocaleString("en-IN"),
						" per hour."
					]
				})]
			}) : null
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border px-3 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] tracking-[0.12em] text-muted uppercase",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 font-mono text-2xl tabular-nums text-fg",
			children: value
		})]
	});
}
function WordPaper({ words, wordIndex, wordStatus, buffer, language, paceChars, disabled }) {
	const start = Math.max(0, wordIndex - 6);
	const end = Math.min(words.length, wordIndex + 52);
	const slice = words.slice(start, end);
	let charOffset = 0;
	for (let i = 0; i < wordIndex; i++) charOffset += (words[i]?.length ?? 0) + 1;
	const currentAbs = charOffset + buffer.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("m-0 text-[22px] leading-[1.85] break-words", language === "hi" ? "font-deva" : "font-mono", disabled && "opacity-70"),
		children: slice.map((word, i) => {
			const abs = start + i;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Word, {
				word,
				status: abs < wordIndex ? "done" : abs === wordIndex ? "current" : "next",
				typed: abs === wordIndex ? buffer : void 0,
				ok: wordStatus[abs] !== "bad",
				showGhost: paceChars > 0 && currentAbs < paceChars && abs === wordIndex
			}, `${abs}-${word}`);
		})
	});
}
function Word({ word, status, typed, ok = true, showGhost }) {
	if (status === "next") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mr-[0.45em] text-ink-muted",
		children: word
	});
	if (status === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("mr-[0.45em]", ok ? "text-correct" : "text-wrong"),
		children: word
	});
	const t = typed ?? "";
	const chars = [];
	const n = Math.max(word.length, t.length);
	for (let i = 0; i < n; i++) {
		const expected = word[i] ?? "";
		const got = t[i];
		if (i === t.length) {
			chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "caret",
				"aria-hidden": true
			}, `c-${i}`));
			if (showGhost) chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ghost-caret",
				"aria-hidden": true
			}, "g"));
		}
		if (got == null) chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-ink-muted",
			children: expected
		}, i));
		else if (got === expected) chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-correct",
			children: expected
		}, i));
		else chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-wrong underline decoration-2 underline-offset-4",
			children: expected || got
		}, i));
	}
	if (t.length >= n) chars.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "caret",
		"aria-hidden": true
	}, "end"));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mr-[0.45em]",
		children: chars
	});
}
function PassagePaper({ passage, typed, language, paceChars, disabled }) {
	const caretRef = (0, import_react.useRef)(null);
	const windowStart = Math.max(0, typed.length - 90);
	const windowEnd = Math.min(passage.length, typed.length + 220);
	const before = passage.slice(windowStart, typed.length);
	const after = passage.slice(typed.length, windowEnd);
	const painted = (0, import_react.useMemo)(() => {
		const nodes = [];
		for (let i = 0; i < before.length; i++) {
			const abs = windowStart + i;
			const isOk = typed[abs] === passage[abs];
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: isOk ? "text-correct" : "text-wrong underline decoration-2 underline-offset-4",
				children: passage[abs]
			}, abs));
		}
		return nodes;
	}, [
		before,
		passage,
		typed,
		windowStart
	]);
	(0, import_react.useEffect)(() => {
		caretRef.current?.scrollIntoView({
			block: "nearest",
			inline: "nearest"
		});
	}, [typed.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: cn("m-0 text-[21px] leading-[1.9] break-words", language === "hi" ? "font-deva" : "font-mono", disabled && "opacity-70"),
		children: [
			windowStart > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-ink-muted",
				children: "… "
			}) : null,
			painted,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				ref: caretRef,
				className: "caret",
				"aria-hidden": true
			}),
			paceChars > typed.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ghost-caret",
				"aria-hidden": true
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-ink-muted",
				children: after
			})
		]
	});
}
function Stage({ isPassage, words, wordIndex, wordStatus, buffer, passage, typedPassage, language, paceChars, disabled, focused, onFocusChange, onChars, onSpace, allowBackspace }) {
	const ref = (0, import_react.useRef)(null);
	const composing = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (!disabled) ref.current?.focus();
	}, [
		disabled,
		isPassage,
		words
	]);
	function syncFromInput() {
		const el = ref.current;
		if (!el || composing.current) return;
		onChars(el.value);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden rounded-xl bg-paper p-5 text-ink shadow-paper sm:p-7", language === "hi" ? "font-deva" : "font-mono"),
		onClick: () => ref.current?.focus(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				ref,
				className: "absolute inset-0 z-10 resize-none bg-transparent text-transparent caret-transparent outline-none",
				autoCapitalize: "off",
				autoCorrect: "off",
				autoComplete: "off",
				spellCheck: false,
				disabled,
				"aria-label": "Typing input",
				value: isPassage ? typedPassage : buffer,
				onFocus: () => onFocusChange(true),
				onBlur: () => onFocusChange(false),
				onPaste: (e) => e.preventDefault(),
				onDrop: (e) => e.preventDefault(),
				onCompositionStart: () => {
					composing.current = true;
				},
				onCompositionEnd: () => {
					composing.current = false;
					syncFromInput();
				},
				onKeyDown: (e) => {
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
							onSpace();
						}
						return;
					}
					if (!allowBackspace && (e.key === "Backspace" || e.key === "Delete" || (e.ctrlKey || e.metaKey) && [
						"a",
						"x",
						"z",
						"y",
						"v"
					].includes(e.key.toLowerCase()))) e.preventDefault();
				},
				onChange: (e) => {
					if (composing.current) return;
					onChars(e.target.value);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-0 max-h-[340px] min-h-[220px] overflow-auto pr-1",
				children: isPassage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassagePaper, {
					passage,
					typed: typedPassage,
					language,
					paceChars,
					disabled
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WordPaper, {
					words,
					wordIndex,
					wordStatus,
					buffer,
					language,
					paceChars,
					disabled
				})
			}),
			!focused && !disabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 z-20 grid place-items-center bg-paper/80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-md border border-ink/10 bg-paper px-4 py-2 text-sm text-ink-muted",
					children: "Click here, then type"
				})
			}) : null
		]
	});
}
var EN_COMMON = [
	"the",
	"be",
	"to",
	"of",
	"and",
	"a",
	"in",
	"that",
	"have",
	"i",
	"it",
	"for",
	"not",
	"on",
	"with",
	"he",
	"as",
	"you",
	"do",
	"at",
	"this",
	"but",
	"his",
	"by",
	"from",
	"they",
	"we",
	"say",
	"her",
	"she",
	"or",
	"an",
	"will",
	"my",
	"one",
	"all",
	"would",
	"there",
	"their",
	"what",
	"so",
	"up",
	"out",
	"if",
	"about",
	"who",
	"get",
	"which",
	"go",
	"me",
	"when",
	"make",
	"can",
	"like",
	"time",
	"no",
	"just",
	"him",
	"know",
	"take",
	"people",
	"into",
	"year",
	"your",
	"good",
	"some",
	"could",
	"them",
	"see",
	"other",
	"than",
	"then",
	"now",
	"look",
	"only",
	"come",
	"its",
	"over",
	"think",
	"also",
	"back",
	"after",
	"use",
	"two",
	"how",
	"our",
	"work",
	"first",
	"well",
	"way",
	"even",
	"new",
	"want",
	"because",
	"any",
	"these",
	"give",
	"day",
	"most",
	"us",
	"life",
	"child",
	"world",
	"school",
	"state",
	"family",
	"keep",
	"leave",
	"put",
	"while",
	"mean",
	"keep",
	"let",
	"great",
	"seem",
	"help",
	"talk",
	"turn",
	"start",
	"show",
	"play",
	"run",
	"move",
	"live",
	"believe",
	"hold",
	"bring",
	"happen",
	"write",
	"sit",
	"stand",
	"lose",
	"pay",
	"meet",
	"include",
	"continue",
	"set",
	"learn",
	"change",
	"lead",
	"understand",
	"watch",
	"follow",
	"stop",
	"create",
	"speak",
	"read",
	"spend",
	"grow",
	"open",
	"walk",
	"win",
	"offer",
	"remember",
	"love",
	"consider",
	"appear",
	"buy",
	"serve",
	"die",
	"send",
	"build",
	"stay",
	"fall",
	"cut",
	"reach",
	"kill",
	"raise",
	"pass",
	"sell",
	"decide",
	"return",
	"explain",
	"hope",
	"develop",
	"carry",
	"break",
	"receive",
	"agree",
	"support",
	"hit",
	"produce",
	"eat",
	"cover",
	"catch",
	"draw",
	"choose",
	"report",
	"need",
	"try",
	"ask",
	"feel",
	"become",
	"leave",
	"call",
	"come",
	"find",
	"give",
	"tell",
	"work",
	"seem",
	"feel",
	"try",
	"leave",
	"call",
	"paper",
	"letter",
	"number",
	"office",
	"report",
	"test",
	"speed",
	"accuracy",
	"practice",
	"keyboard",
	"finger",
	"rhythm",
	"focus",
	"minute",
	"second",
	"result",
	"error",
	"space",
	"shift",
	"enter",
	"screen",
	"cursor",
	"passage"
];
var EN_EASY = [
	"sit tall and keep both feet on the floor",
	"look at the words not the keys",
	"type with a calm and even rhythm",
	"start slow and stay accurate",
	"rest your fingers on the home row",
	"read a little ahead as you type",
	"short daily practice builds real skill",
	"keep your shoulders loose and quiet",
	"press each key and move to the next",
	"a steady pace is better than a rush",
	"breathe and begin the next sentence",
	"small sessions still count as training"
];
var EN_MEDIUM = [
	"Learning to type well is less about forcing speed and more about building a dependable rhythm. When each hand knows where to travel, attention can stay on the sentence instead of the keyboard.",
	"A focused practice session gives the brain a simple job: recognize the next word, choose the right keys, and keep the rhythm moving. Short, regular sessions create stronger habits than occasional bursts of effort.",
	"Accuracy deserves attention even when the goal is higher speed. Clean keystrokes create a useful foundation. When errors decrease, speed often follows because fewer pauses are needed to repair the text.",
	"Reading a little ahead is one of the easiest ways to make typing smoother. Let your eyes preview the upcoming phrase so the hands can keep a buffer between reading and pressing keys.",
	"Good posture quietly affects performance. Feet rest naturally, shoulders stay loose, and wrists remain neutral. The goal is not a rigid pose, but the removal of unnecessary tension.",
	"A five-minute test is long enough to reveal habits that hide in a short sprint. The first minute may feel energetic, the middle settles, and the last minute exposes fatigue or loss of focus.",
	"Different punctuation marks create different movements. Commas, periods, quotation marks, and brackets interrupt an easy rhythm until they become familiar through varied practice.",
	"When a mistake happens, avoid turning it into a chain of mistakes. Notice it, continue with the next word, and keep the hands emotionally quiet. Frustration adds another layer of error.",
	"Repeatable performance matters more than a single peak score. The useful benchmark is the speed you can reproduce with high accuracy on an ordinary day, not the fastest number you have ever seen.",
	"For many learners, the biggest change comes from stopping the habit of looking down after every few words. Keep the eyes on the text and let the fingers use their learned positions."
];
var EN_HARD = [
	"Efficient keyboarding requires deliberate repetition, accurate finger placement, and the discipline to maintain rhythm when punctuation becomes irregular; 3.14159, 98.6%, and $1,250.00 should not break the line.",
	"Complex sentences challenge attention because commas, semicolons, quotation marks, parentheses, and dashes can interrupt an otherwise familiar sequence — recover without looking down.",
	"Professional writing often mixes short statements with longer clauses, technical vocabulary, numerical references (2026, 10,500, 9,000), and abbreviations that demand precise keystrokes.",
	"If net speed is computed as (gross words minus penalty) divided by minutes, then every extra error after the 5% allowance is expensive: ten words deducted per excess mistake.",
	"Maintain a sustainable pace: 40-45 words per minute in practice makes 35 words per minute on exam day feel ordinary, even with a new keyboard and a printed passage."
];
var HI_COMMON = [
	"और",
	"के",
	"है",
	"में",
	"की",
	"को",
	"से",
	"यह",
	"एक",
	"हैं",
	"नहीं",
	"लिए",
	"पर",
	"कर",
	"इस",
	"होता",
	"था",
	"तो",
	"ही",
	"भी",
	"आप",
	"जो",
	"वह",
	"करने",
	"बाद",
	"लेकिन",
	"अपने",
	"रहा",
	"दिया",
	"गया",
	"सकता",
	"समय",
	"बात",
	"कुछ",
	"अगर",
	"जब",
	"या",
	"हम",
	"भारत",
	"सरकार",
	"परीक्षा",
	"अभ्यास",
	"गति",
	"सटीकता",
	"शब्द",
	"मिनट",
	"गलती",
	"कीबोर्ड",
	"उंगली",
	"ध्यान",
	"नियमित",
	"कागज"
];
var HI_EASY = [
	"नियमित अभ्यास से टाइपिंग आसान होती है",
	"पहले सही लिखें फिर गति बढ़ाएं",
	"शांत रहें और शब्दों को आगे से पढ़ें",
	"हाथ होम रो पर रखें और कंधे ढीले रखें",
	"हर दिन दस मिनट का अभ्यास काफी है",
	"कीबोर्ड की ओर देखने की आदत छोड़ें"
];
var HI_MEDIUM = [
	"अच्छी टाइपिंग केवल गति पर निर्भर नहीं करती। एक समान लय बनाए रखें और हर शब्द को ध्यान से टाइप करें। छोटी गलती को श्रृंखला में बदलने से बचें।",
	"पांच या दस मिनट का लगातार अभ्यास मांसपेशियों की याददाश्त मजबूत करता है। गलती के बाद रुकने के बजाय अगले शब्द पर ध्यान लौटाएं।",
	"परीक्षा के दिन नई कीबोर्ड और छपा हुआ पैसेज दोनों अजीब लग सकते हैं। इसलिए अभ्यास में लक्ष्य सीमा से थोड़ी अधिक गति रखें।",
	"हिंदी टाइपिंग में मंगल फॉन्ट और इंस्क्रिप्ट या रेमिंगटन लेआउट का उपयोग आम है। जिस लेआउट पर परीक्षा होगी उसी पर अभ्यास करें।",
	"सटीकता को प्राथमिकता दें। पांच प्रतिशत से अधिक गलती पर हर अतिरिक्त त्रुटि दस शब्द काट सकती है, इसलिए जल्दबाजी महंगी पड़ती है।",
	"सीधी पीठ, आरामदायक कलाई और स्थिर सांस से लंबे पैराग्राफ आसान लगते हैं। तनाव कम होने पर उंगलियां सही कुंजी तक स्वयं पहुंचती हैं।"
];
var HI_HARD = [
	"कठिन वाक्यों, विराम चिह्नों, संख्याओं जैसे 30, 35, 9,000 और 10,500 तथा लंबे शब्दों के दौरान गति से अधिक सटीकता आवश्यक है।",
	"नेट गति की गणना में अतिरिक्त त्रुटियों पर दस शब्दों की कटौती लागू हो सकती है; इसलिए 97 प्रतिशत या उससे बेहतर सटीकता बनाए रखें।",
	"इंस्क्रिप्ट लेआउट में व्यंजन और मात्रा का संयोजन अभ्यास से स्वचालित होता है। बिना बैकस्पेस के दस मिनट लिखना परीक्षा के सबसे निकट का प्रशिक्षण है।"
];
var EN_EXAM = [
	...EN_MEDIUM,
	...EN_HARD,
	"The skill test is qualifying in nature. Marks from typing are not added to the merit list, but a candidate who does not meet the required speed and accuracy cannot proceed further in the process.",
	"A printed passage is placed beside the computer. The candidate reads the paper and types on the screen. Practice this transfer: eyes on paper, hands on keys, mind on the next phrase.",
	"Official English speed is often stated as thirty-five words per minute, equal to ten thousand five hundred key depressions per hour, for a ten-minute passage with a limited error allowance."
];
var HI_EXAM = [
	...HI_MEDIUM,
	...HI_HARD,
	"यह कौशल परीक्षा अर्हक होती है। टाइपिंग के अंक मेरिट में नहीं जुड़ते, पर पास होना अनिवार्य है। निर्धारित गति और सटीकता पूरी न होने पर आगे की प्रक्रिया रुक सकती है।",
	"अक्सर छपा हुआ पैसेज कंप्यूटर के पास रखा जाता है। आंखें कागज पर, हाथ कुंजी पर, और ध्यान अगले वाक्यांश पर रखना ही सही अभ्यास है।",
	"हिंदी में तीस शब्द प्रति मिनट यानी नौ हजार की डिप्रेशन प्रति घंटा, दस मिनट का पैसेज, और सीमित त्रुटि छूट सामान्य नियम हैं। अधिसूचना से पुष्टि करें।"
];
function shuffle(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}
function takeWords(pool, count) {
	const out = [];
	const src = shuffle(pool);
	while (out.length < count) out.push(...src);
	return out.slice(0, count);
}
function wordsForPractice(lang, level, durationSec) {
	const target = Math.max(80, Math.ceil(durationSec / 60 * 110));
	if (lang === "hi") return takeWords((level === "easy" ? HI_EASY.flatMap((s) => s.split(" ")) : level === "hard" ? [...HI_COMMON, ...HI_HARD.flatMap((s) => s.split(" "))] : [...HI_COMMON, ...HI_MEDIUM.flatMap((s) => s.split(" "))]).filter(Boolean), target);
	if (level === "easy") return takeWords(EN_EASY.flatMap((s) => s.split(" ")), target);
	if (level === "hard") return takeWords([...EN_COMMON, ...EN_HARD.flatMap((s) => s.split(/\s+/))], target);
	return takeWords(EN_COMMON, target);
}
function wordsForDrill(kind, lang, durationSec) {
	const n = Math.max(80, Math.ceil(durationSec / 60 * 130));
	if (kind === "home") return takeWords(lang === "hi" ? [
		"क",
		"ख",
		"ग",
		"घ",
		"च",
		"ज",
		"ट",
		"त",
		"न",
		"प",
		"म",
		"र",
		"ल",
		"स",
		"अ",
		"आ"
	] : [
		"as",
		"ad",
		"af",
		"ask",
		"lad",
		"fall",
		"all",
		"salad",
		"flask",
		"add",
		"lass",
		"fad",
		"jak",
		"kale",
		"alaska",
		"sad"
	], n);
	if (kind === "numbers") return takeWords([
		"2026",
		"35",
		"30",
		"10,500",
		"9,000",
		"98.6",
		"3.14",
		"120",
		"60",
		"15",
		"45",
		"350",
		"5%",
		"10"
	], n);
	if (kind === "punct") return takeWords([
		"it's",
		"don't",
		"we'll",
		"(note)",
		"end.",
		"wait,",
		"yes;",
		"quote:",
		"A.",
		"B,",
		"ok?",
		"done!"
	], n);
	if (kind === "speed") return takeWords(lang === "hi" ? HI_COMMON : EN_COMMON.slice(0, 80), n);
	return takeWords(lang === "hi" ? HI_COMMON : EN_COMMON, n);
}
function passageForExam(lang, durationSec) {
	const need = Math.ceil(durationSec / 60 * 80 * 5 * 1.35);
	const paras = shuffle(lang === "hi" ? HI_EXAM : EN_EXAM);
	const chunks = [];
	let total = 0;
	let i = 0;
	while (total < need) {
		const p = paras[i % paras.length];
		chunks.push(p);
		total += p.length + 1;
		i += 1;
	}
	return chunks.join(" ");
}
function emptySnapshot(duration) {
	return {
		wpm: 0,
		rawWpm: 0,
		accuracy: 100,
		errors: 0,
		correct: 0,
		typed: 0,
		elapsed: 0,
		remaining: duration
	};
}
function computeSnapshot(correct, errors, elapsedSec, duration) {
	const typed = correct + errors;
	const minutes = Math.max(elapsedSec, .5) / 60;
	return {
		wpm: Math.round(correct / 5 / minutes),
		rawWpm: Math.round(typed / 5 / minutes),
		accuracy: typed ? Math.round(correct / typed * 100) : 100,
		errors,
		correct,
		typed,
		elapsed: elapsedSec,
		remaining: Math.max(0, duration - elapsedSec)
	};
}
function examCutoff(lang) {
	return lang === "hi" ? 30 : 35;
}
function scoreExam(correct, errors, elapsedSec, lang) {
	const typed = correct + errors;
	const minutes = Math.max(elapsedSec, 1) / 60;
	const grossWords = typed / 5;
	const allowedErrors = Math.floor(typed * .05);
	const extraErrors = Math.max(0, errors - allowedErrors);
	const deductedWords = extraErrors * 10;
	const netWords = Math.max(0, grossWords - deductedWords);
	const grossWpm = grossWords / minutes;
	const netWpm = netWords / minutes;
	const cutoff = examCutoff(lang);
	return {
		grossWpm: Math.round(grossWpm * 10) / 10,
		netWpm: Math.round(netWpm * 10) / 10,
		allowedErrors,
		extraErrors,
		deductedWords,
		passed: netWpm >= cutoff,
		cutoff,
		keyDepressionsPerHour: Math.round(typed / minutes * 60)
	};
}
function scoreWord(expected, typed) {
	const n = Math.max(expected.length, typed.length);
	let correct = 0;
	let errors = 0;
	for (let i = 0; i < n; i++) if (typed[i] === expected[i]) correct += 1;
	else errors += 1;
	return {
		correct,
		errors
	};
}
function scorePrefix(target, typed) {
	let correct = 0;
	let errors = 0;
	const n = typed.length;
	for (let i = 0; i < n; i++) if (typed[i] === target[i]) correct += 1;
	else errors += 1;
	return {
		correct,
		errors
	};
}
var KEY = "typenxt-history";
var BEST_KEY = "typenxt-best";
function loadHistory() {
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.slice(-80) : [];
	} catch {
		return [];
	}
}
function pushHistory(row) {
	const next = [...loadHistory(), row].slice(-80);
	localStorage.setItem(KEY, JSON.stringify(next));
	const best = Math.max(loadBest(), row.wpm);
	localStorage.setItem(BEST_KEY, String(best));
	return next;
}
function loadBest() {
	try {
		return Number(localStorage.getItem(BEST_KEY) || 0) || 0;
	} catch {
		return 0;
	}
}
var DEFAULTS = {
	mode: "practice",
	language: "en",
	level: "medium",
	duration: 60,
	drill: "common",
	backspace: true,
	showPace: true,
	targetWpm: 40
};
function examPreset(lang) {
	return {
		mode: "exam",
		language: lang,
		duration: 600,
		backspace: false,
		level: "medium",
		targetWpm: lang === "hi" ? 30 : 35,
		showPace: true
	};
}
function useTypingSession() {
	const [settings, setSettings] = (0, import_react.useState)(DEFAULTS);
	const [words, setWords] = (0, import_react.useState)([]);
	const [passage, setPassage] = (0, import_react.useState)("");
	const [wordIndex, setWordIndex] = (0, import_react.useState)(0);
	const [buffer, setBuffer] = (0, import_react.useState)("");
	const [typedPassage, setTypedPassage] = (0, import_react.useState)("");
	const [wordStatus, setWordStatus] = (0, import_react.useState)([]);
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [snapshot, setSnapshot] = (0, import_react.useState)(emptySnapshot(DEFAULTS.duration));
	const [verdict, setVerdict] = (0, import_react.useState)(null);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [best, setBest] = (0, import_react.useState)(0);
	const [newBest, setNewBest] = (0, import_react.useState)(false);
	const startedAt = (0, import_react.useRef)(null);
	const correctRef = (0, import_react.useRef)(0);
	const errorsRef = (0, import_react.useRef)(0);
	const phaseRef = (0, import_react.useRef)("idle");
	const settingsRef = (0, import_react.useRef)(settings);
	const wordsRef = (0, import_react.useRef)(words);
	const passageRef = (0, import_react.useRef)(passage);
	const wordIndexRef = (0, import_react.useRef)(0);
	const bufferRef = (0, import_react.useRef)("");
	const typedRef = (0, import_react.useRef)("");
	const interval = (0, import_react.useRef)(null);
	phaseRef.current = phase;
	settingsRef.current = settings;
	wordsRef.current = words;
	passageRef.current = passage;
	wordIndexRef.current = wordIndex;
	bufferRef.current = buffer;
	typedRef.current = typedPassage;
	const isPassage = settings.mode === "exam";
	const rebuild = (0, import_react.useCallback)((next) => {
		if (next.mode === "exam") {
			setPassage(passageForExam(next.language, next.duration));
			setWords([]);
		} else if (next.mode === "drill") {
			setWords(wordsForDrill(next.drill, next.language, next.duration));
			setPassage("");
		} else {
			setWords(wordsForPractice(next.language, next.level, next.duration));
			setPassage("");
		}
		setWordIndex(0);
		setBuffer("");
		setTypedPassage("");
		setWordStatus([]);
		setPhase("idle");
		setSnapshot(emptySnapshot(next.duration));
		setVerdict(null);
		setNewBest(false);
		startedAt.current = null;
		correctRef.current = 0;
		errorsRef.current = 0;
		if (interval.current) {
			window.clearInterval(interval.current);
			interval.current = null;
		}
	}, []);
	(0, import_react.useEffect)(() => {
		setHistory(loadHistory());
		setBest(loadBest());
		rebuild(DEFAULTS);
	}, [rebuild]);
	const patch = (0, import_react.useCallback)((partial) => {
		const next = {
			...settingsRef.current,
			...partial
		};
		if (partial.mode === "exam" && !partial.duration) next.duration = 600;
		if (partial.mode === "exam") next.backspace = false;
		if (partial.mode === "practice" && settingsRef.current.mode === "exam") {
			next.duration = 60;
			next.backspace = true;
		}
		if (partial.mode === "drill" && settingsRef.current.mode === "exam") {
			next.duration = 30;
			next.backspace = true;
		}
		setSettings(next);
		rebuild(next);
	}, [rebuild]);
	const liveCounts = (0, import_react.useCallback)(() => {
		const s = settingsRef.current;
		let extraC = 0;
		let extraE = 0;
		if (s.mode === "exam") {
			const { correct, errors } = scorePrefix(passageRef.current, typedRef.current);
			extraC = correct;
			extraE = errors;
		} else {
			const expected = wordsRef.current[wordIndexRef.current] ?? "";
			const typed = bufferRef.current;
			const n = Math.max(expected.length, typed.length);
			for (let i = 0; i < n; i++) {
				if (i >= typed.length) break;
				if (typed[i] === expected[i]) extraC += 1;
				else extraE += 1;
			}
		}
		return {
			correct: correctRef.current + extraC,
			errors: errorsRef.current + extraE
		};
	}, []);
	const finish = (0, import_react.useCallback)(() => {
		if (phaseRef.current === "done" || phaseRef.current === "ad") return;
		if (interval.current) {
			window.clearInterval(interval.current);
			interval.current = null;
		}
		const s = settingsRef.current;
		const elapsed = startedAt.current ? Math.min((performance.now() - startedAt.current) / 1e3, s.duration) : 0;
		const { correct, errors } = liveCounts();
		const snap = computeSnapshot(correct, errors, Math.max(elapsed, .5), s.duration);
		setSnapshot(snap);
		const exam = s.mode === "exam" ? scoreExam(correct, errors, Math.max(elapsed, 1), s.language) : null;
		setVerdict(exam);
		const row = {
			t: Date.now(),
			wpm: exam ? exam.netWpm : snap.wpm,
			accuracy: snap.accuracy,
			errors: snap.errors,
			mode: s.mode,
			lang: s.language,
			duration: s.duration,
			passed: exam?.passed
		};
		setHistory(pushHistory(row));
		const prevBest = loadBest();
		if (row.wpm > best && row.wpm > 0) setNewBest(true);
		setBest(Math.max(prevBest, row.wpm));
		recordTest();
		setPhase("ad");
		phaseRef.current = "ad";
	}, [best, liveCounts]);
	const tick = (0, import_react.useCallback)(() => {
		if (phaseRef.current !== "running" || !startedAt.current) return;
		const s = settingsRef.current;
		const elapsed = (performance.now() - startedAt.current) / 1e3;
		if (elapsed >= s.duration) {
			finish();
			return;
		}
		const { correct, errors } = liveCounts();
		setSnapshot(computeSnapshot(correct, errors, elapsed, s.duration));
	}, [finish, liveCounts]);
	const ensureRunning = (0, import_react.useCallback)(() => {
		if (phaseRef.current === "running") return;
		if (phaseRef.current !== "idle") return;
		startedAt.current = performance.now();
		setPhase("running");
		phaseRef.current = "running";
		interval.current = window.setInterval(tick, 200);
	}, [tick]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (interval.current) window.clearInterval(interval.current);
		};
	}, []);
	const commitWord = (0, import_react.useCallback)((typed) => {
		const expected = wordsRef.current[wordIndexRef.current] ?? "";
		if (!expected && !typed) return;
		const { correct, errors } = scoreWord(expected, typed);
		correctRef.current += correct;
		errorsRef.current += errors;
		const nextIndex = wordIndexRef.current + 1;
		setWordStatus((prev) => [...prev, typed === expected ? "ok" : "bad"]);
		setWordIndex(nextIndex);
		setBuffer("");
		bufferRef.current = "";
		if (nextIndex >= wordsRef.current.length) finish();
	}, [finish]);
	const onChars = (0, import_react.useCallback)((value) => {
		if (phaseRef.current === "done" || phaseRef.current === "ad") return;
		const s = settingsRef.current;
		ensureRunning();
		if (s.mode === "exam") {
			const target = passageRef.current;
			let next = value;
			if (!s.backspace && next.length < typedRef.current.length) next = typedRef.current;
			if (next.length > target.length) next = next.slice(0, target.length);
			setTypedPassage(next);
			typedRef.current = next;
			if (next.length >= target.length) finish();
			return;
		}
		setBuffer(value);
		bufferRef.current = value;
	}, [ensureRunning, finish]);
	const onSpace = (0, import_react.useCallback)(() => {
		if (settingsRef.current.mode === "exam") return false;
		if (!bufferRef.current.length) return true;
		ensureRunning();
		commitWord(bufferRef.current);
		return true;
	}, [commitWord, ensureRunning]);
	const dismissAd = (0, import_react.useCallback)(() => {
		setPhase("done");
		phaseRef.current = "done";
	}, []);
	const restart = (0, import_react.useCallback)(() => {
		rebuild(settingsRef.current);
	}, [rebuild]);
	return {
		settings,
		patch,
		words,
		wordStatus,
		passage,
		wordIndex,
		buffer,
		typedPassage,
		phase,
		snapshot,
		verdict,
		history,
		best,
		newBest,
		isPassage,
		paceChars: (0, import_react.useMemo)(() => {
			if (!settings.showPace || snapshot.elapsed <= 0) return 0;
			return Math.floor(settings.targetWpm * 5 * (snapshot.elapsed / 60));
		}, [
			settings.showPace,
			settings.targetWpm,
			snapshot.elapsed
		]),
		onChars,
		onSpace,
		restart,
		finish,
		dismissAd
	};
}
function Home() {
	const session = useTypingSession();
	const [focused, setFocused] = (0, import_react.useState)(false);
	const typing = session.phase === "running";
	const locked = session.phase === "done" || session.phase === "ad";
	const restart = session.restart;
	(0, import_react.useEffect)(() => {
		const client = loadAdClient();
		if (client) loadAdsense(client);
	}, []);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if (e.key === "Tab") {
				e.preventDefault();
				restart();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [restart]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-[min(1080px,calc(100%-28px))] items-center justify-between gap-3 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid size-9 place-items-center rounded-md border border-border bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keyboard, { className: "size-4 text-accent" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none tracking-tight",
							children: "TypeNxt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs tracking-[0.12em] text-muted uppercase",
							children: "Speed · Exam · Hindi"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "ghost",
								size: "sm",
								className: "hidden sm:inline-flex",
								onClick: () => session.patch(examPreset("en")),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {}), "BSF English"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								className: "hidden md:inline-flex",
								onClick: () => session.patch(examPreset("hi")),
								children: "BSF Hindi"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EarningsButton, {})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-[min(1080px,calc(100%-28px))]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "pt-8 pb-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs tracking-[0.18em] text-muted uppercase",
								children: "Typing trainer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-2 max-w-3xl text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.95] tracking-tight text-balance",
								children: "Build speed. Keep accuracy."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted",
								children: "A fast English and Hindi trainer with BSF/SSC exam scoring, no-backspace papers, and speed drills. Ads stay off while you type."
							})
						]
					}),
					!typing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
						slot: "top-banner",
						className: "mb-6"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls, {
						settings: session.settings,
						onPatch: session.patch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hud, {
							snapshot: session.snapshot,
							urgent: session.snapshot.remaining <= 15 && typing
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stage, {
							isPassage: session.isPassage,
							words: session.words,
							wordIndex: session.wordIndex,
							wordStatus: session.wordStatus,
							buffer: session.buffer,
							passage: session.passage,
							typedPassage: session.typedPassage,
							language: session.settings.language,
							paceChars: session.paceChars,
							disabled: locked,
							focused,
							onFocusChange: setFocused,
							onChars: session.onChars,
							onSpace: session.onSpace,
							allowBackspace: session.settings.backspace
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: session.settings.mode === "exam" ? "Exam paper · backspace off · 5% error allowance, extra errors deduct 10 words" : "Tip: space commits a word. Tab restarts. Ghost caret is your target pace."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "secondary",
								size: "sm",
								onClick: session.restart,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Reset"]
							}), typing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "paper",
								size: "sm",
								onClick: session.finish,
								children: "Finish"
							}) : null]
						})]
					}),
					session.phase === "done" && session.snapshot.typed > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Results, {
							snapshot: session.snapshot,
							verdict: session.verdict,
							newBest: session.newBest,
							onRestart: session.restart
						})
					}) : null,
					!typing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, { slot: "after-test" })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "my-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.14em] text-muted uppercase",
									children: "Recent speed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display mt-1 text-2xl tracking-tight",
									children: [
										"Best ",
										session.best || 0,
										" WPM"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryChart, { rows: session.history })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-surface p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs tracking-[0.14em] text-muted uppercase",
									children: "How to get faster"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
									className: "mt-3 space-y-3 text-sm leading-relaxed text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "mt-0.5 size-4 shrink-0 text-accent" }), "Practice at 40–45 WPM so exam day 35 / 30 feels ordinary."]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Use Speed drill for 30-second sprints, then a 10-minute exam paper without backspace." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Accuracy first. Extra errors after 5% cost 10 words each on the official-style score." })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "sm",
										onClick: () => session.patch({
											mode: "drill",
											drill: "speed",
											duration: 30
										}),
										children: "30s sprint"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "secondary",
										size: "sm",
										onClick: () => session.patch(examPreset(session.settings.language)),
										children: "Full exam"
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
						className: "pt-10 text-center text-xs text-subtle",
						children: "Progress stays in this browser. Hindi works with Inscript or any phonetic keyboard."
					})
				]
			}),
			session.phase === "ad" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Interstitial, { onSkip: session.dismissAd }) : null
		]
	});
}
//#endregion
export { Home as component };
