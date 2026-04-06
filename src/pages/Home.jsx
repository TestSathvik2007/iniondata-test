import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

/* ── SERVICE IMAGES (same as Services page) ── */
import service1 from "../assets/images/app_development.png";
import service2 from "../assets/images/application_integration.png";
import service3 from "../assets/images/application_management.png";
import service4 from "../assets/images/application_maintenance.png";
import service5 from "../assets/images/project_management.png";
import service6 from "../assets/images/consulting_services.png";
import service7 from "../assets/images/teams_application.png";
import service8 from "../assets/images/operational_efficiency.png";
import service9 from "../assets/images/fast_growth.png";

// ── DATA ──────────────────────────────────────────────────────────────────────

const offerings = [
  { title: "Application Design & Development", desc: "Full-cycle development from requirements to release.", badge: "Core", image: service1 },
  { title: "Application Integration", desc: "Seamless connectivity between systems.", badge: "Integration", image: service2 },
  { title: "Application Management", desc: "Keep apps running reliably.", badge: "Support", image: service3 },
  { title: "Application Maintenance", desc: "Performance & health optimisation.", badge: "Maintenance", image: service4 },
  { title: "Project Management", desc: "End-to-end delivery management.", badge: "Delivery", image: service5 },
  { title: "Consulting Services", desc: "Strategic technical guidance.", badge: "Advisory", image: service6 },
  { title: "Teams Integration", desc: "Microsoft Teams solutions.", badge: "Collaboration", image: service7 },
  { title: "Operational Efficiency", desc: "Modernise legacy systems.", badge: "Optimisation", image: service8 },
  { title: "Fast Growth", desc: "Boost growth by reinventing your applications.", badge: "Growth", image: service9 },
];

const trust = [
  {
    title: "Confidential by default",
    desc: "NDA-ready engagements, least-privilege access, and clean handoffs.",
    lottie: "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json",
  },
  {
    title: "Clear delivery",
    desc: "Milestones, weekly updates, and measurable outcomes — no surprises.",
    lottie: "https://assets4.lottiefiles.com/packages/lf20_tno6cg2w.json",
  },
  {
    title: "Culture-aligned teams",
    desc: "We adapt to your working style, time zones, and communication norms.",
    lottie: "https://assets1.lottiefiles.com/packages/lf20_kkflmtur.json",
  },
];

const clientLogos = ["Accenture", "Deloitte", "ThoughtWorks", "KPMG", "McKinsey", "Bain & Co", "BCG", "PwC"];

const fomoLeads = [
  "A SaaS team in Austin just got in touch.",
  "A fintech startup booked a discovery call.",
  "An e-commerce company requested a proposal.",
  "A healthtech team started a conversation.",
  "A logistics firm just reached out.",
];

const TW_WORDS = ["data pipelines.", "cloud infra.", "product teams."];

// ── CAROUSEL CONSTANTS ────────────────────────────────────────────────────────
const CARD_W = 300;
const GAP = 20;
const STEP = CARD_W + GAP;
const N = offerings.length;
const CLONE_COUNT = 3;
const TOTAL = CLONE_COUNT + N + CLONE_COUNT;

const allItems = [
  ...offerings.slice(N - CLONE_COUNT).map((s, i) => ({ ...s, _key: `ct-${i}`, _real: N - CLONE_COUNT + i })),
  ...offerings.map((s, i) => ({ ...s, _key: `r-${i}`, _real: i })),
  ...offerings.slice(0, CLONE_COUNT).map((s, i) => ({ ...s, _key: `ch-${i}`, _real: i })),
];

// ── STYLES ────────────────────────────────────────────────────────────────────

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg:#07100e; --bg-2:#0c1a16;
    --surface:rgba(255,255,255,0.04); --surface-2:rgba(255,255,255,0.07);
    --text:#dff0e8; --muted:#7a9e8e; --muted-2:#4a6a5a;
    --border:rgba(255,255,255,0.07); --border-2:rgba(255,255,255,0.12);
    --teal:#14b8a6; --teal-2:#2dd4bf; --teal-d:#0d9488;
    --accent:#22c55e; --accent-2:#4ade80; --accent-d:#16a34a;
    --navy:#020c09;
    --grad-brand:linear-gradient(135deg,var(--teal),var(--accent));
    --grad-text:linear-gradient(135deg,var(--teal-2) 0%,var(--accent-2) 100%);
    --shadow:0 24px 80px rgba(0,0,0,0.55);
    --shadow-soft:0 8px 32px rgba(0,0,0,0.30);
    --shadow-brand:0 12px 40px rgba(20,184,166,0.30);
    --shadow-brand-lg:0 20px 60px rgba(20,184,166,0.40);
    --radius:20px; --radius-sm:14px; --radius-pill:999px;
    --container:min(1600px,92vw); --pad:40px;
    --font:'Inter',system-ui,sans-serif;
    --ease:cubic-bezier(0.22,1,0.36,1); --dur:0.25s; --dur-slow:0.45s;
  }

  *,*::before,*::after { box-sizing:border-box }
  html { height:100%; scroll-behavior:smooth; -webkit-font-smoothing:antialiased }
  body {
    margin:0; font-family:var(--font); font-size:16px; font-weight:400;
    line-height:1.6; color:var(--text); background:var(--bg);
    overflow-x:hidden; min-height:100%;
  }
  body::before {
    content:''; position:fixed; inset:0;
    background:
      radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),
      radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%),
      radial-gradient(ellipse 600px 400px at 50% 90%,rgba(20,184,166,0.06),transparent 70%);
    pointer-events:none; z-index:0;
  }
  body::after {
    content:''; position:fixed; inset:0;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events:none; z-index:0; opacity:0.5;
  }
  a { color:inherit; text-decoration:none }
  button { font:inherit; cursor:pointer }
  img,svg { display:block; max-width:100% }

  /* ── Layout ── */
  .container { width:100%; max-width:var(--container); margin:0 auto; padding:0 var(--pad) }
  .section    { padding:100px 0; position:relative; z-index:1 }
  .section--alt { background:rgba(255,255,255,0.015) }
  .grid   { display:grid; gap:20px }
  .grid-2 { grid-template-columns:repeat(2,1fr) }
  .grid-3 { grid-template-columns:repeat(3,1fr) }

  /* ── Typography ── */
  .h1 { font-family:var(--font); font-weight:800; font-size:clamp(36px,5vw,68px); line-height:1.02; letter-spacing:-0.04em; margin:0 }
  .h2 { font-family:var(--font); font-weight:800; font-size:clamp(28px,3.5vw,44px); line-height:1.08; letter-spacing:-0.03em; margin:0 }
  .lead { font-size:17px; font-weight:300; color:var(--muted); line-height:1.75 }
  .kicker {
    display:inline-flex; align-items:center; gap:10px;
    padding:5px 14px 5px 10px; font-size:11px; font-weight:700;
    letter-spacing:0.14em; text-transform:uppercase;
    background:transparent; border:1px solid rgba(255,255,255,0.12);
    clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%);
    color:var(--text);
  }
  .kicker::before {
    content:''; display:block; width:6px; height:6px;
    background:#1D9E75; clip-path:polygon(50% 0%,100% 100%,0% 100%); flex-shrink:0;
  }

  /* ── Buttons ── */
  .btn {
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    padding:12px 22px; border-radius:var(--radius-pill);
    border:1px solid var(--border-2); background:var(--surface-2);
    color:var(--text); font-family:var(--font); font-size:14px; font-weight:500;
    cursor:pointer;
    transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),
               border-color var(--dur) var(--ease),background var(--dur) var(--ease);
  }
  .btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-soft) }
  .btn--primary {
    background:#085041; color:#9FE1CB; border-radius:5px;
    border:1.5px solid #085041; box-shadow:4px 4px 0 #1D9E75;
    font-weight:600; font-size:13px; padding:10px 22px; white-space:nowrap;
  }
  .btn--primary:hover { box-shadow:2px 2px 0 #1D9E75; transform:translate(2px,2px) }
  .btn--primary:active { box-shadow:none; transform:translate(4px,4px) }
  .btn--ghost { background:transparent; border-color:rgba(20,184,166,0.22); color:var(--teal-2) }
  .btn--ghost:hover { background:rgba(20,184,166,0.08); border-color:rgba(20,184,166,0.40) }
  .btn--sm { padding:8px 16px; font-size:13px }

  /* ── Cards ── */
  .card {
    position:relative; border-radius:var(--radius);
    border:1px solid var(--border); background:rgba(255,255,255,0.05);
    box-shadow:var(--shadow-soft);
    transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease);
  }
  .card::before { display:none }
  .card:hover { transform:translateY(-4px); box-shadow:var(--shadow); border-color:rgba(20,184,166,0.28) }
  .card__p { padding:24px }
  .card-i { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:var(--radius-sm) }
  .card-lift { transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease }
  .card-lift:hover { transform:translateY(-4px) }

  /* ── Utilities ── */
  .bar-track   { height:6px; border-radius:999px; background:rgba(13,148,136,0.15); overflow:hidden }
  .bar-fill-js { height:100%; border-radius:999px; background:linear-gradient(90deg,var(--teal),var(--teal-2)); width:0; transition:width .9s cubic-bezier(.22,1,.36,1) }
  .img-cover   { width:100%; height:100%; object-fit:cover; display:block }

  /* ── Trust Lottie cards ── */
  .trust-card { overflow:hidden }
  .trust-lottie-wrap {
    height:200px;
    display:flex; align-items:center; justify-content:center;
    background:rgba(20,184,166,0.04);
    border-bottom:1px solid rgba(255,255,255,0.06);
    transition:background 0.35s ease;
    overflow:hidden;
  }
  .trust-card:hover .trust-lottie-wrap { background:rgba(20,184,166,0.09) }
  .trust-lottie-wrap lottie-player {
    width:170px; height:170px;
    transition:transform 0.45s cubic-bezier(0.34,1.56,0.64,1);
  }
  .trust-card:hover .trust-lottie-wrap lottie-player { transform:scale(1.08) }
  .trust-card-body { padding:20px 22px 24px }
  .trust-card-body h3 { font-size:17px; font-weight:700; margin:0 0 8px; color:var(--text); letter-spacing:-0.01em }
  .trust-card-body p  { font-size:14px; color:var(--muted); line-height:1.7; margin:0 }

  /* ── Animations ── */
  @keyframes kenBurns { from{transform:scale(1)} to{transform:scale(1.06) translateX(-8px)} }
  .ken-burns { animation:kenBurns 9s ease-in-out infinite alternate; will-change:transform }

  @keyframes blinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
  .tw-cursor { display:inline-block; width:3px; height:1em; background:currentColor; margin-left:4px; vertical-align:text-bottom; animation:blinkCursor .75s step-end infinite }

  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-track { display:flex; gap:48px; width:max-content; animation:marquee 28s linear infinite }
  .marquee-track:hover { animation-play-state:paused }
  .marquee-wrap {
    overflow:hidden;
  }

  @keyframes toastIn  { from{opacity:0;transform:translateY(16px) scale(.96)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes toastOut { from{opacity:1;transform:translateY(0) scale(1)} to{opacity:0;transform:translateY(-12px) scale(.96)} }
  .fomo-toast {
    position:fixed; bottom:24px; left:24px; z-index:999;
    background:rgba(255,255,255,.96); border:.5px solid rgba(0,0,0,.10);
    border-radius:12px; padding:10px 14px; display:flex; align-items:center;
    gap:10px; box-shadow:0 4px 18px rgba(0,0,0,.10);
    pointer-events:none; max-width:260px;
  }
  .fomo-toast.entering { animation:toastIn .4s cubic-bezier(.34,1.56,.64,1) forwards }
  .fomo-toast.exiting  { animation:toastOut .3s ease-in forwards }
  .fomo-dot { width:8px; height:8px; border-radius:50%; background:#10b981; flex-shrink:0; box-shadow:0 0 0 3px rgba(16,185,129,.2) }

  @keyframes heroFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  .h-anim-1 { opacity:0; animation:heroFadeUp .55s var(--ease) .05s forwards }
  .h-anim-2 { opacity:0; animation:heroFadeUp .55s var(--ease) .15s forwards }
  .h-anim-3 { opacity:0; animation:heroFadeUp .55s var(--ease) .25s forwards }
  .h-anim-4 { opacity:0; animation:heroFadeUp .55s var(--ease) .35s forwards }
  .h-anim-5 { opacity:0; animation:heroFadeUp .55s var(--ease) .45s forwards }

  .reveal { opacity:0; transform:translateY(24px); transition:opacity .6s var(--ease),transform .6s var(--ease) }
  .reveal.visible { opacity:1; transform:translateY(0) }
  .reveal-group .reveal { transition-delay:calc(var(--i,0) * .09s) }

  @keyframes drawLine { from{stroke-dashoffset:200} to{stroke-dashoffset:0} }
  .sparkline-path { stroke-dasharray:200; stroke-dashoffset:200; animation:drawLine 1.2s var(--ease) .5s forwards }

  /* ══════════════════════════════════════
     3D CAROUSEL
  ══════════════════════════════════════ */
  .svc-section { padding:100px 0; position:relative; z-index:1 }

  .svc-header {
    max-width:var(--container); margin:0 auto; padding:0 var(--pad) 36px;
    display:flex; align-items:flex-end; justify-content:space-between;
    flex-wrap:wrap; gap:16px;
  }

  .svc-stage {
    overflow:hidden;
    mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%);
    -webkit-mask-image:linear-gradient(to right,transparent 0%,black 10%,black 90%,transparent 100%);
    cursor:grab; user-select:none; padding:32px 0 48px;
  }
  .svc-stage:active { cursor:grabbing }

  .svc-persp { perspective:1400px; perspective-origin:50% 38% }

  .svc-track { display:flex; gap:20px; will-change:transform }

  .svc-card {
  width:300px;
  flex-shrink:0;
  border-radius:18px;
  overflow:hidden;

  /* 🔥 FIX: solid background instead of rgba */
  background:#0c1a16;
  border:1px solid rgba(255,255,255,0.07);

  cursor:pointer;

  /* 🔥 FIX: remove opacity */
  opacity:1;

  /* 🔥 FIX: remove rotateY (3D) */
  transform:scale(0.84) translateX(0);

  transition:
    transform   0.55s cubic-bezier(0.16,1,0.3,1),
    box-shadow  0.55s cubic-bezier(0.16,1,0.3,1),
    border-color 0.35s ease,
    filter 0.4s ease;

  /* 🔥 stability */
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  transform-style:preserve-3d;
  will-change:transform;

  position:relative;
}

/* CENTER */
.svc-card.pos-center {
  transform:scale(1) translateX(0);
  border-color:rgba(20,184,166,0.42);
  box-shadow:0 28px 70px rgba(0,0,0,0.52),0 0 0 1px rgba(20,184,166,0.22);
  z-index:10;
  filter:none;
}

/* LEFT */
.svc-card.pos-l1 {
  transform:scale(0.92) translateX(-20px);
  z-index:5;
  filter:brightness(0.75);
}

.svc-card.pos-l2 {
  transform:scale(0.83) translateX(-40px);
  z-index:3;
  filter:brightness(0.55);
}

/* RIGHT */
.svc-card.pos-r1 {
  transform:scale(0.92) translateX(20px);
  z-index:5;
  filter:brightness(0.75);
}

.svc-card.pos-r2 {
  transform:scale(0.83) translateX(40px);
  z-index:3;
  filter:brightness(0.55);
}

  .svc-card-img {
    width:100%; height:190px; overflow:hidden;
    border-bottom:1px solid rgba(255,255,255,0.06);
    position:relative; background:rgba(20,184,166,0.05);
  }
  .svc-card-img img {
    width:100%; height:100%; object-fit:cover; display:block;
    transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);
    filter:brightness(0.88) saturate(0.9);
  }
  .svc-card.pos-center .svc-card-img img { transform:scale(1.05); filter:brightness(1) saturate(1) }
  .svc-card-img-fade {
    position:absolute; inset:0;
    background:linear-gradient(to top,rgba(7,16,14,0.55) 0%,transparent 55%);
    pointer-events:none;
  }
  .svc-card-body { padding:18px 20px 20px }
  .svc-card-badge {
    display:inline-flex; align-items:center; padding:3px 10px;
    font-size:10px; font-weight:700; letter-spacing:0.12em; text-transform:uppercase;
    border-radius:999px; background:rgba(20,184,166,0.12); color:#2dd4bf;
    border:1px solid rgba(20,184,166,0.22); margin-bottom:10px;
  }
  .svc-card-title { font-size:17px; font-weight:700; letter-spacing:-0.02em; color:#dff0e8; margin:0 0 7px; line-height:1.25 }
  .svc-card-desc  { font-size:13px; line-height:1.65; color:#7a9e8e; margin:0 }
  .svc-card-footer {
    margin-top:16px; padding-top:14px;
    border-top:1px solid rgba(255,255,255,0.06);
    display:flex; align-items:center; justify-content:space-between;
  }
  .svc-card-arr {
    width:32px; height:32px; border-radius:50%;
    border:1px solid rgba(255,255,255,0.10);
    display:flex; align-items:center; justify-content:center; color:#2dd4bf;
    transition:background .2s,border-color .2s,transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .svc-card:hover .svc-card-arr { background:rgba(20,184,166,0.14); border-color:rgba(20,184,166,0.35); transform:translateX(3px) }

  .svc-dots { display:flex; align-items:center; justify-content:center; gap:7px; margin-top:20px }
  .svc-dot {
    width:7px; height:7px; border-radius:50%;
    background:rgba(255,255,255,0.15); border:none; padding:0; flex-shrink:0;
    transition:all 0.3s var(--ease); cursor:pointer;
  }
  .svc-dot.active { width:24px; border-radius:4px; background:#14b8a6 }

  .svc-nav { display:flex; gap:8px }
  .svc-nav-btn {
    width:38px; height:38px; border-radius:50%;
    border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04);
    display:flex; align-items:center; justify-content:center;
    color:#2dd4bf; font-size:15px; line-height:1;
    transition:background .2s,border-color .2s,transform .2s cubic-bezier(.34,1.56,.64,1);
  }
  .svc-nav-btn:hover { background:rgba(20,184,166,0.12); border-color:rgba(20,184,166,0.35); transform:scale(1.08) }
  .svc-nav-btn:active { transform:scale(0.94) }

  /* ── Responsive ── */
  @media(max-width:900px) {
    :root { --pad:24px }
    .grid-2,.grid-3 { grid-template-columns:1fr }
    .section { padding:72px 0 }
    .svc-card { width:270px }
    .svc-card-img { height:160px }
    .trust-lottie-wrap { height:170px }
    .trust-lottie-wrap lottie-player { width:140px; height:140px }
  }
  @media(max-width:560px) {
    :root { --pad:18px }
    .svc-card { width:248px }
  }
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

/* Load lottie-player custom element once */
function useLottieScript() {
  useEffect(() => {
    if (customElements.get("lottie-player") || document.getElementById("lottie-cdn")) return;
    const s = document.createElement("script");
    s.id = "lottie-cdn";
    s.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    document.head.appendChild(s);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useBarFillOnScroll(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.querySelectorAll(".bar-fill-js").forEach((b) => { b.style.width = b.dataset.targetWidth; });
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
}

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = TW_WORDS[wordIdx % TW_WORDS.length];
    if (!isDeleting && display === word) { const t = setTimeout(() => setDeleting(true), 1800); return () => clearTimeout(t); }
    if (isDeleting && display === "") { setDeleting(false); setWordIdx((i) => i + 1); return; }
    const next = isDeleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1);
    const t = setTimeout(() => setDisplay(next), isDeleting ? 35 : 55);
    return () => clearTimeout(t);
  }, [display, isDeleting, wordIdx]);
  return display;
}

function useFomoToast() {
  const [toast, setToast] = useState(null);
  const idxRef = useRef(0);
  useEffect(() => {
    const show = () => {
      const text = fomoLeads[idxRef.current % fomoLeads.length];
      idxRef.current += 1;
      setToast({ text, phase: "entering" });
      setTimeout(() => setToast((t) => t ? { ...t, phase: "exiting" } : null), 3500);
      setTimeout(() => setToast(null), 3900);
    };
    const first = setTimeout(show, 4000);
    const iv = setInterval(show, 7000);
    return () => { clearTimeout(first); clearInterval(iv); };
  }, []);
  return toast;
}

// ── 3D INFINITE CAROUSEL ──────────────────────────────────────────────────────

function ServicesCarousel() {
  const stageRef = useRef(null);
  const trackRef = useRef(null);
  const autoRef = useRef(null);
  const offsetRef = useRef(0);
  const itemIdxRef = useRef(CLONE_COUNT);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const teleportRef = useRef(false);
  const wheelTmrRef = useRef(null);
  // Momentum scroll state
  const momentumRef = useRef({ velocity: 0, target: 0, rafId: null, active: false });

  const [centerIdx, setCenterIdx] = useState(0);
  const [padX, setPadX] = useState(0);

  const pxFor = (iIdx) => iIdx * STEP;

  const applyOffset = (px) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${-px}px)`;
    offsetRef.current = px;
  };

  const teleportIfClone = (iIdx) => {
    const isHead = iIdx >= CLONE_COUNT + N;
    const isTail = iIdx < CLONE_COUNT;
    if (!isHead && !isTail) return;
    const realIIdx = isHead ? iIdx - N : iIdx + N;
    teleportRef.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
    applyOffset(pxFor(realIIdx));
    itemIdxRef.current = realIIdx;
    requestAnimationFrame(() => requestAnimationFrame(() => { teleportRef.current = false; }));
  };

  const snapToItem = (iIdx, smooth = true) => {
    if (teleportRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, iIdx));
    itemIdxRef.current = clamped;
    setCenterIdx(allItems[clamped]._real);
    if (!trackRef.current) return;
    if (smooth) {
      const track = trackRef.current;
      const onEnd = (ev) => {
        if (ev.propertyName !== "transform") return;
        track.removeEventListener("transitionend", onEnd);
        track.style.transition = "none";
        teleportIfClone(clamped);
      };
      track.addEventListener("transitionend", onEnd);
      track.style.transition = "transform 0.68s cubic-bezier(0.16,1,0.3,1)";
    } else {
      trackRef.current.style.transition = "none";
      teleportIfClone(clamped);
    }
    applyOffset(pxFor(clamped));
  };

  const snapToReal = (realIdx) => snapToItem(CLONE_COUNT + ((realIdx % N) + N) % N);
  const snapStep = (delta) => {
    const next = Math.max(0, Math.min(TOTAL - 1, itemIdxRef.current + delta));
    snapToItem(next);
  };

  const startAuto = () => { clearInterval(autoRef.current); autoRef.current = setInterval(() => snapStep(1), 3400); };
  const stopAuto = () => clearInterval(autoRef.current);

  /* Padding: centre first card in viewport */
  useEffect(() => {
    const calc = () => {
      if (!stageRef.current) return;
      setPadX(Math.max(0, Math.floor((stageRef.current.offsetWidth - CARD_W) / 2)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  /* Mount */
  useEffect(() => {
    snapToItem(CLONE_COUNT, false);
    startAuto();
    return stopAuto;
  }, []); // eslint-disable-line

  /* All interactions */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const snapFromRaw = () => {
      const nearest = Math.round((offsetRef.current) / STEP);
      const clamped = Math.max(CLONE_COUNT, Math.min(CLONE_COUNT + N - 1, nearest));
      snapToItem(clamped);
    };

    const onMouseDown = (e) => {
      if (teleportRef.current) return;  
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.active) return;
      applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.clientX) * 0.65);
    };
    const onMouseUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      snapFromRaw();
      startAuto();
    };

    const onTouchStart = (e) => {
      if (teleportRef.current) return;
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.touches[0].clientX, startOffset: offsetRef.current };
    };
    const onTouchMove = (e) => {
      if (!dragRef.current.active) return;
      applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.touches[0].clientX) * 0.65);
    };
    const onTouchEnd = () => {
      dragRef.current.active = false;
      snapFromRaw();
      startAuto();
    };

    const runMomentum = () => {
      const m = momentumRef.current;
      if (!m.active) return;

      // Decay velocity smoothly (friction)
      m.velocity *= 0.82;
      m.target += m.velocity;

      // Apply the continuous offset while momentum is live
      if (!teleportRef.current && trackRef.current) {
        trackRef.current.style.transition = "none";
        applyOffset(m.target);
        // Teleport at clone boundaries mid-scroll
        const nearest = Math.round(m.target / STEP);
        const clamped = Math.max(0, Math.min(TOTAL - 1, nearest));
        const isHead = clamped >= CLONE_COUNT + N;
        const isTail = clamped < CLONE_COUNT;
        if (isHead || isTail) {
          const realIIdx = isHead ? clamped - N : clamped + N;
          teleportRef.current = true;
          applyOffset(pxFor(realIIdx));
          m.target = pxFor(realIIdx);
          itemIdxRef.current = realIIdx;
          requestAnimationFrame(() => requestAnimationFrame(() => { teleportRef.current = false; }));
        }
      }

      if (Math.abs(m.velocity) > 0.4) {
        m.rafId = requestAnimationFrame(runMomentum);
      } else {
        // Momentum died — snap to nearest card
        m.active = false;
        const nearest = Math.round(offsetRef.current / STEP);
        const clamped = Math.max(CLONE_COUNT, Math.min(CLONE_COUNT + N - 1, nearest));
        snapToItem(clamped);
        wheelTmrRef.current = setTimeout(startAuto, 1600);
      }
    };

    const onWheel = (e) => {
      e.preventDefault();
      if (teleportRef.current) return;
      stopAuto();
      clearTimeout(wheelTmrRef.current);
      cancelAnimationFrame(momentumRef.current.rafId);

      const m = momentumRef.current;
      // Accumulate velocity — trackpads fire many small events, mice fire a few big ones.
      // Cap per-event contribution so a single large tick doesn't overshoot.
      const contribution = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) * 0.55, 18);
      m.velocity = (m.active ? m.velocity : 0) + contribution;
      m.target = offsetRef.current;
      m.active = true;
      m.rafId = requestAnimationFrame(runMomentum);
    };

    const onTilt = (e) => {
      if (dragRef.current.active) return;
      const card = trackRef.current?.querySelector(".svc-card.pos-center");
      if (!card) return;
      const r = stage.getBoundingClientRect();
      const mx = (e.clientX - r.left) / r.width - 0.5;
      const my = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `scale(1) translateZ(0) rotateY(${mx * -7}deg) rotateX(${my * 4}deg)`;
    };
    const onTiltLeave = () => {
      const card = trackRef.current?.querySelector(".svc-card.pos-center");
      if (card) card.style.transform = "scale(1) rotateY(0deg) rotateX(0deg) translateZ(0)";
    };

    stage.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: true });
    stage.addEventListener("touchend", onTouchEnd);
    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("mousemove", onTilt);
    stage.addEventListener("mouseleave", onTiltLeave);

    return () => {
      stage.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("mousemove", onTilt);
      stage.removeEventListener("mouseleave", onTiltLeave);
      clearTimeout(wheelTmrRef.current);
    };
  }, []); // eslint-disable-line

  const posClass = (realIdx) => {
    let d = realIdx - centerIdx;
    if (d > N / 2) d -= N;
    if (d < -N / 2) d += N;
    if (d === 0) return "svc-card pos-center";
    if (d === -1) return "svc-card pos-l1";
    if (d === -2) return "svc-card pos-l2";
    if (d === 1) return "svc-card pos-r1";
    if (d === 2) return "svc-card pos-r2";
    return "svc-card";
  };

  return (
    <section className="svc-section section--alt">
      <div className="svc-header">
        <div>
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ fontSize: "clamp(1.9rem,3.5vw,2.4rem)", marginTop: 8 }}>
            Simple, focused offerings
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="svc-nav">
            <button className="svc-nav-btn" aria-label="Previous"
              onClick={() => { stopAuto(); snapStep(-1); startAuto(); }}>←</button>
            <button className="svc-nav-btn" aria-label="Next"
              onClick={() => { stopAuto(); snapStep(1); startAuto(); }}>→</button>
          </div>
          <Link className="btn btn--ghost btn--sm" to="/services">View all</Link>
        </div>
      </div>

      <div className="svc-stage" ref={stageRef}>
        <div className="svc-persp">
          <div className="svc-track" ref={trackRef} style={{ paddingLeft: padX, paddingRight: padX }}>
            {allItems.map((s) => (
              <div key={s._key} className={posClass(s._real)}
                onClick={() => { stopAuto(); snapToReal(s._real); startAuto(); }}>
                <div className="svc-card-img">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <div className="svc-card-img-fade" />
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-badge">{s.badge}</div>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                  <div className="svc-card-footer">
                    <Link to="/services" className="btn btn--ghost btn--sm">Learn more</Link>
                    <div className="svc-card-arr">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="svc-dots">
        {offerings.map((_, i) => (
          <button key={i} className={`svc-dot${i === centerIdx ? " active" : ""}`}
            onClick={() => { stopAuto(); snapToReal(i); startAuto(); }}
            aria-label={`Go to ${offerings[i].title}`} />
        ))}
      </div>
    </section>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();
  useLottieScript();           // ← loads lottie-player for trust cards
  const twWord = useTypewriter();
  const toast = useFomoToast();
  const ctaRef = useRef(null);
  useBarFillOnScroll(ctaRef);

  return (
    <div>
      <style>{pageStyles}</style>

      {/* FOMO Toast */}
      {toast && (
        <div className={`fomo-toast ${toast.phase}`}>
          <div className="fomo-dot" />
          <span style={{ fontSize: 12, color: "#1a1a1a", lineHeight: 1.4 }}>{toast.text}</span>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center", gap: 40 }}>

          {/* Left col */}
          <div>
            <div className="kicker h-anim-1">Trust-first partner</div>
            <h1 className="h1 h-anim-2" style={{ marginTop: 12 }}>
              Clean delivery for{" "}
              <span style={{ whiteSpace: "nowrap" }}>
                {twWord}<span className="tw-cursor" aria-hidden="true" />
              </span>
            </h1>
            <p className="lead h-anim-3" style={{ marginTop: 16, maxWidth: "50ch" }}>
              A simple, reliable approach that respects your customers, your culture, and your timelines.
            </p>
            <div className="h-anim-4" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
              <Link className="btn btn--primary" to="/contact">Get in touch</Link>
              <Link className="btn btn--ghost" to="/services">View services</Link>
            </div>
            <div className="grid grid-3 h-anim-5" style={{ marginTop: 24 }}>
              {[["24–48h", "First response"], ["Weekly", "Delivery updates"], ["NDA", "Ready"]].map(([a, b]) => (
                <div key={a} className="card card__p card-lift" style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: 20, color: "var(--text)" }}>{a}</div>
                  <div className="lead" style={{ fontSize: 13, marginTop: 4 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right col */}
          <div className="h-anim-5" style={{ display: "grid", gap: 14 }}>
            <div style={{ height: 210, borderRadius: 16, overflow: "hidden", position: "relative" }}>
              <img
                className="img-cover ken-burns"
                src="https://www.iniondata.com/images/3.png"
                alt="Team working on data dashboards"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.45) 0%,transparent 60%)", pointerEvents: "none" }} />
              <span style={{ position: "absolute", bottom: 12, left: 14, background: "rgba(255,255,255,.92)", color: "#1a1a1a", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em" }}>
                Delivery health
              </span>
            </div>

            <div className="card" style={{ padding: 22 }}>
              <div className="kicker" style={{ marginBottom: 14 }}>Snapshot</div>
              <div className="card card-i" style={{ padding: 16, borderRadius: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--text)" }}>On-time trend</div>
                    <div className="lead" style={{ fontSize: 13 }}>On-time / on-budget</div>
                  </div>
                  <svg width="96" height="36" viewBox="0 0 96 36" fill="none" aria-hidden="true">
                    <path className="sparkline-path" d="M4 28 C18 20,28 24,40 16 C52 8,62 14,74 10 C82 7,88 10,92 8" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M4 30H92" stroke="rgba(255,255,255,.07)" strokeWidth="1" />
                  </svg>
                </div>
              </div>
              <div className="grid grid-2" style={{ marginTop: 12 }}>
                {[["Quality", "Review-led", "PR checks + handover docs"], ["Security", "Least access", "Tight scopes & auditability"]].map(([k, v, d]) => (
                  <div key={k} className="card card-i card-lift" style={{ padding: 14, borderRadius: 14 }}>
                    <div className="kicker" style={{ marginBottom: 6 }}>{k}</div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: "var(--text)" }}>{v}</div>
                    <div className="lead" style={{ fontSize: 12, marginTop: 4 }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Why teams trust us</div>
          <h2 className="h2 reveal" style={{ fontSize: "clamp(1.9rem,3.5vw,2.4rem)", marginTop: 8 }}>
            Built for long-term partnerships
          </h2>

          <div className="reveal" style={{ marginTop: 24, borderRadius: 16, overflow: "hidden", height: 170, position: "relative" }}>
            <img
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=75"
              alt="Collaborative team" loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,.58) 0%,transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 18, left: 22, color: "#fff" }}>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>Trusted by distributed teams across 12+ industries</div>
              <div style={{ fontSize: 18, fontWeight: 600 }}>Culture-aligned. Outcome-focused.</div>
            </div>
          </div>

          <div className="marquee-wrap reveal" style={{ marginTop: 24, padding: "8px 0" }}>
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--muted)", whiteSpace: "nowrap", userSelect: "none" }}>
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* ── Trust cards with Lottie ── */}
          <div className="grid grid-3 reveal-group" style={{ marginTop: 22 }}>
            {trust.map((t, i) => (
              <div key={t.title} className="card card-lift trust-card reveal" style={{ "--i": i }}>
                {/* Lottie animation panel */}
                <div className="trust-lottie-wrap">
                  <lottie-player
                    autoplay
                    loop
                    mode="normal"
                    src={t.lottie}
                  />
                </div>
                {/* Text body */}
                <div className="trust-card-body">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES 3D CAROUSEL ── */}
      <ServicesCarousel />

      {/* ── CTA ── */}
      <section className="section section--alt">
        <div className="container card reveal" style={{ padding: 0, overflow: "hidden" }}>
          <div className="grid grid-2" style={{ alignItems: "stretch", gap: 0 }}>
            <div style={{ padding: 36 }}>
              <div className="kicker">Next step</div>
              <h2 className="h2" style={{ fontSize: "clamp(1.7rem,3vw,2.1rem)", marginTop: 10 }}>
                Tell us what you're building.
              </h2>
              <p className="lead" style={{ marginTop: 10, fontSize: 15 }}>
                We'll respond with a clear plan, timeline, and a small set of options.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
                <Link className="btn btn--primary" to="/contact">Contact</Link>
                <Link className="btn btn--ghost" to="/about">About us</Link>
              </div>
            </div>
            <div ref={ctaRef} style={{ position: "relative", minHeight: 240, overflow: "hidden" }}>
              <img
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=75"
                alt="Team collaborating" loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left,transparent 35%,rgba(7,16,14,0.96) 100%)", pointerEvents: "none" }} />
              <div className="card" style={{ position: "absolute", bottom: 16, right: 16, padding: "14px 18px", minWidth: 176, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                <div className="kicker" style={{ marginBottom: 10 }}>Timeline</div>
                <div style={{ display: "grid", gap: 9 }}>
                  {[["Discovery", 24], ["Plan", 48], ["Deliver", 72]].map(([label, pct]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "68px 1fr 38px", alignItems: "center", gap: 8, fontSize: 12 }}>
                      <div style={{ fontWeight: 600, color: "var(--text)" }}>{label}</div>
                      <div className="bar-track">
                        <div className="bar-fill-js" data-target-width={`${pct}%`} />
                      </div>
                      <div style={{ fontWeight: 800, color: "var(--muted)", textAlign: "right" }}>{pct}h</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}