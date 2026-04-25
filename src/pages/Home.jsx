import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";

/* ── SERVICE IMAGES ── */
import service1  from "../assets/images/app_development.png";
import service2  from "../assets/images/application_integration.png";
import service3  from "../assets/images/application_management.png";
import service4  from "../assets/images/application_maintenance.png";
import service5  from "../assets/images/project_management.png";
import service6  from "../assets/images/consulting_services.png";
import service7  from "../assets/images/teams_application.png";
import service8  from "../assets/images/operational_efficiency.png";
import service9  from "../assets/images/fast_growth.png";
import service10 from "../assets/images/dataanalytics.jpg";
import service11 from "../assets/images/dataengineering.jpg";
import service12 from "../assets/images/cloud.jpg";
import service13 from "../assets/images/datascience.jpg";
import service14 from "../assets/images/hitl2.jpg";

/* ── HERO CAROUSEL IMAGES ── */
import heroImg1 from "../assets/images/hero1.jpg";
import heroImg2 from "../assets/images/hero2.jpg";
import heroImg3 from "../assets/images/hero3.jpg";

const heroSlides = [
  { img: heroImg1, title: "Together, We Create Wonders",          sub: "We become an extension of your team and increase productivity." },
  { img: heroImg2, title: "Professional and Experienced Partners", sub: "Expert partners for reliable, transformative services." },
  { img: heroImg3, title: "Data-Driven Intelligence",              sub: "Transforming raw data into actionable insights." },
];

// ── DATA ──────────────────────────────────────────────────────────────────────

const offerings = [
  { title: "Application Design & Development",   desc: "Full-cycle app delivery — from requirements to release — for enterprise-level projects.",              badge: "Core",          image: service1,  path: "/services/app-development" },
  { title: "Application Integration",            desc: "Connect CRMs, cloud platforms, and legacy systems into a unified, real-time ecosystem.",                badge: "Integration",   image: service2,  path: "/services/app-integration" },
  { title: "Application Management",             desc: "24/7 monitoring, incident response, and performance optimisation for your applications.",               badge: "Support",       image: service3,  path: "/services/app-management" },
  { title: "Application Maintenance",            desc: "Proactive bug fixing, security patching, and continuous performance tuning.",                           badge: "Maintenance",   image: service4,  path: "/services/app-maintenance" },
  { title: "Project Management",                 desc: "End-to-end delivery management — on time, on budget, with full stakeholder transparency.",              badge: "Delivery",      image: service5,  path: "/services/project-management" },
  { title: "Consulting Services",                desc: "Architecture reviews, feasibility studies, and technical roadmaps aligned with your business goals.",   badge: "Advisory",      image: service6,  path: "/services/consulting" },
  { title: "Teams Integration",                  desc: "Custom bots, embedded apps, and message extensions that bring your workflows into Microsoft Teams.",    badge: "Collaboration", image: service7,  path: "/services/teams-integration" },
  { title: "Operational Efficiency",             desc: "Cut cloud costs, modernise legacy systems, and optimise developer workflows for measurable gains.",     badge: "Optimisation",  image: service8,  path: "/services/operational-efficiency" },
  { title: "Fast Growth",                        desc: "Accelerate release cycles, reduce maintenance debt, and scale architecture to match your ambition.",    badge: "Growth",        image: service9,  path: "/services/fast-growth" },
  { title: "Data & Analytics",                   desc: "Turn raw data into actionable insight with scalable analytics platforms, dashboards, and pipelines.",   badge: "Analytics",     image: service10, path: "/services/data-analytics" },
  { title: "Data Engineering Services",          desc: "End-to-end data pipelines, lake and warehouse architecture, ETL automation, and stream processing.",    badge: "Data",          image: service11, path: "/services/data-engineering" },
  { title: "Cloud Engineering Services",         desc: "Cloud-native design, migration, and optimisation across Azure, AWS, and GCP for cost-efficient scale.", badge: "Cloud",         image: service12, path: "/services/cloud-engineering" },
  { title: "Data Science Services",              desc: "Predictive modelling, machine learning, and AI-driven insights that translate data into business value.",badge: "AI/ML",         image: service13, path: "/services/data-science" },
  { title: "Human-in-the-Loop (HITL) Services", desc: "Combining AI automation with human expertise to validate, annotate, and improve model outputs at scale.",badge: "HITL",          image: service14, path: "/services/human-in-the-loop" },
];

const staffingItems = [
  { num: "01", title: "Flexible Hiring Models",   desc: "Contract, contract-to-hire, or direct hire — choose the engagement model that fits your timeline and budget." },
  { num: "02", title: "Rigorous Vetting Process", desc: "Pre-screened professionals who match your technical requirements and team culture — no guesswork." },
  { num: "03", title: "Scalable Teams",            desc: "From a single specialist to a full delivery team — scale up or down instantly as your project demands shift." },
];

const consultingItems = [
  { icon: "◈", title: "Customized Strategies",    desc: "We work closely with you to understand your unique challenges and build tailored solutions aligned with your business goals — not off-the-shelf advice." },
  { icon: "◈", title: "Experienced Consultants",  desc: "Our consultants bring deep industry expertise across technology and operations, so you get guidance from people who've solved problems like yours before." },
  { icon: "◈", title: "Comprehensive Solutions",  desc: "From digital transformation to cybersecurity, we cover the full spectrum of IT consulting — one partner for every challenge." },
];

const pmItems = [
  { icon: "▸", title: "Proven Methodologies",      desc: "Structured execution using industry best practices — so your projects run smoothly from kickoff to go-live." },
  { icon: "▸", title: "Dedicated Support",          desc: "End-to-end project ownership with hands-on management at every stage, from initiation through successful delivery." },
  { icon: "▸", title: "Transparent Communication", desc: "Clear, consistent updates and full visibility at every milestone — so you're never left wondering where things stand." },
];

const trust = [
  { title: "Deep domain expertise",   desc: "Decades of combined leadership experience across Data, SAP, Guidewire, and enterprise application delivery.", lottie: "https://assets2.lottiefiles.com/packages/lf20_jcikwtux.json" },
  { title: "Flexible delivery model", desc: "Scale your team up or down quickly — contract, contract-to-hire, or direct hire — to address skill gaps without long-term overhead.", lottie: "https://assets4.lottiefiles.com/packages/lf20_tno6cg2w.json" },
  { title: "AI-driven innovation",    desc: "Vision AI, test automation, risk-based testing, self-healing tests, and performance optimisation baked into every engagement.", lottie: "https://assets1.lottiefiles.com/packages/lf20_kkflmtur.json" },
];

const TW_WORDS = ["enterprise applications.", "data & AI solutions.", "digital transformation."];

// ── CAROUSEL CONSTANTS ────────────────────────────────────────────────────────
const CARD_W      = 300;
const GAP         = 20;
const STEP        = CARD_W + GAP;
const N           = offerings.length;
const CLONE_COUNT = 3;
const TOTAL       = CLONE_COUNT + N + CLONE_COUNT;

const allItems = [
  ...offerings.slice(N - CLONE_COUNT).map((s, i) => ({ ...s, _key: `ct-${i}`, _real: N - CLONE_COUNT + i })),
  ...offerings.map((s, i)                         => ({ ...s, _key: `r-${i}`,  _real: i })),
  ...offerings.slice(0, CLONE_COUNT).map((s, i)   => ({ ...s, _key: `ch-${i}`, _real: i })),
];

// ── STYLES ────────────────────────────────────────────────────────────────────

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #07100e;
    --bg-2: #0c1a16;
    --surface: rgba(255,255,255,0.04);
    --surface-2: rgba(255,255,255,0.07);
    --text: #dff0e8;
    --muted: #7a9e8e;
    --border: rgba(255,255,255,0.07);
    --border-2: rgba(255,255,255,0.12);
    --teal: #14b8a6;
    --teal-2: #2dd4bf;
    --teal-d: #0d9488;
    --accent: #22c55e;
    --shadow: 0 24px 80px rgba(0,0,0,0.55);
    --shadow-soft: 0 8px 32px rgba(0,0,0,0.30);
    --radius: 20px;
    --radius-sm: 14px;
    --radius-pill: 999px;
    --container: min(1600px,100%);
    --pad: 40px;
    --font: 'Inter', system-ui, sans-serif;
    --ease: cubic-bezier(0.22,1,0.36,1);
    --dur: 0.25s;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { height: 100%; scroll-behavior: smooth; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  body { margin: 0; font-family: var(--font); line-height: 1.6; color: var(--text); background: var(--bg); overflow-x: hidden; min-height: 100%; }
  body::before { content: ''; position: fixed; inset: 0; background: radial-gradient(ellipse 900px 600px at 10% 0%, rgba(20,184,166,0.12), transparent 70%), radial-gradient(ellipse 700px 500px at 90% 10%, rgba(34,197,94,0.09), transparent 70%), radial-gradient(ellipse 600px 400px at 50% 90%, rgba(20,184,166,0.06), transparent 70%); pointer-events: none; z-index: 0; }
  body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; opacity: 0.5; }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; cursor: pointer; }
  img, svg { display: block; max-width: 100%; }

  /* LAYOUT */
  .container { width: 100%; max-width: var(--container); margin: 0 auto; padding: 0 clamp(16px, 4vw, var(--pad)); }
  .section { padding: clamp(48px, 8vw, 100px) 0; position: relative; z-index: 1; }
  .section--alt { background: rgba(255,255,255,0.015); }
  .grid { display: grid; gap: 20px; }
  .grid-2 { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .grid-3 { grid-template-columns: repeat(3, minmax(0,1fr)); }

  /* TYPOGRAPHY — all clamp */
  .h1 { font-weight: 800; font-size: clamp(26px, 5vw, 68px); line-height: 1.04; letter-spacing: -0.04em; margin: 0; }
  .h2 { font-weight: 800; font-size: clamp(20px, 3.5vw, 44px); line-height: 1.08; letter-spacing: -0.03em; margin: 0; }
  .lead { font-size: clamp(13px, 1.6vw, 16px); font-weight: 300; color: var(--muted); line-height: 1.7; }

  .kicker { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; padding: 4px 12px 4px 9px; font-size: clamp(9px,1.1vw,11px); font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap; border: 1px solid rgba(255,255,255,0.12); clip-path: polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); color: var(--text); }
  .kicker::before { content: ''; display: block; width: 5px; height: 5px; flex-shrink: 0; background: #1D9E75; clip-path: polygon(50% 0%,100% 100%,0% 100%); }

  /* BUTTONS */
  .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: clamp(8px,1.5vw,12px) clamp(14px,2vw,22px); border-radius: var(--radius-pill); border: 1px solid var(--border-2); background: var(--surface-2); color: var(--text); font-family: var(--font); font-size: clamp(12px,1.4vw,14px); font-weight: 500; cursor: pointer; white-space: nowrap; transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease); }
  .btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-soft); }
  .btn--primary { background: #085041; color: #9FE1CB; border-radius: 5px; border: 1.5px solid #085041; box-shadow: 4px 4px 0 #1D9E75; font-weight: 600; }
  .btn--primary:hover  { box-shadow: 2px 2px 0 #1D9E75; transform: translate(2px,2px); }
  .btn--primary:active { box-shadow: none; transform: translate(4px,4px); }
  .btn--ghost { background: transparent; border-color: rgba(20,184,166,0.22); color: var(--teal-2); }
  .btn--ghost:hover { background: rgba(20,184,166,0.08); border-color: rgba(20,184,166,0.40); }
  .btn--sm { padding: 7px 14px; font-size: 12px; }

  /* CARDS */
  .card { position: relative; border-radius: var(--radius); border: 1px solid var(--border); background: rgba(255,255,255,0.05); box-shadow: var(--shadow-soft); transition: transform var(--dur) var(--ease), box-shadow var(--dur) var(--ease), border-color var(--dur) var(--ease); }
  .card:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: rgba(20,184,166,0.28); }
  .card__p { padding: clamp(16px,3vw,24px); }
  .card-lift { transition: transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease; }
  .card-lift:hover { transform: translateY(-4px); }

  .bar-track   { height: 5px; border-radius: 999px; background: rgba(13,148,136,0.15); overflow: hidden; }
  .bar-fill-js { height: 100%; border-radius: 999px; background: linear-gradient(90deg,var(--teal),var(--teal-2)); width: 0; transition: width .9s cubic-bezier(.22,1,.36,1); }

  /* TRUST CARDS */
  .trust-card { overflow: hidden; }
  .trust-lottie-wrap { height: clamp(110px,16vw,180px); display: flex; align-items: center; justify-content: center; background: rgba(20,184,166,0.04); border-bottom: 1px solid rgba(255,255,255,0.06); transition: background .35s ease; overflow: hidden; }
  .trust-card:hover .trust-lottie-wrap { background: rgba(20,184,166,0.09); }
  .trust-lottie-wrap lottie-player { width: clamp(80px,12vw,150px); height: clamp(80px,12vw,150px); transition: transform .45s cubic-bezier(.34,1.56,.64,1); }
  .trust-card:hover .trust-lottie-wrap lottie-player { transform: scale(1.08); }
  .trust-card-body { padding: clamp(12px,2vw,20px); }
  .trust-card-body h3 { font-size: clamp(13px,1.6vw,16px); font-weight: 700; margin: 0 0 7px; color: var(--text); letter-spacing: -0.01em; }
  .trust-card-body p  { font-size: clamp(11px,1.3vw,13px); color: var(--muted); line-height: 1.7; margin: 0; }

  /* HERO IMAGE CAROUSEL */
  .hic-root { position: relative; width: 100%; border-radius: 14px; overflow: hidden; aspect-ratio: 4/3; background: #001b2e; }
  .hic-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.75s ease; pointer-events: none; }
  .hic-slide.active { opacity: 1; pointer-events: auto; }
  .hic-slide img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.05); transition: transform 6s ease; }
  .hic-slide.active img { transform: scale(1); }
  .hic-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,8,18,0.75) 0%, rgba(0,8,18,0.12) 55%, transparent 100%); pointer-events: none; }
  .hic-text { position: absolute; bottom: 0; left: 0; right: 0; padding: clamp(12px,3vw,18px) clamp(14px,3vw,20px) clamp(28px,5vw,40px); color: #fff; text-align: center; }
  .hic-text h3 { font-size: clamp(13px,2vw,20px); font-weight: 700; margin: 0 0 4px; line-height: 1.2; }
  .hic-text p  { font-size: clamp(10px,1.2vw,13px); opacity: 0.80; margin: 0; }
  .hic-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.20); border-radius: 50%; width: clamp(28px,4vw,36px); height: clamp(28px,4vw,36px); display: flex; align-items: center; justify-content: center; cursor: pointer; color: #fff; z-index: 10; transition: background 0.2s,transform 0.2s; }
  .hic-arrow:hover { background: rgba(255,255,255,0.22); transform: translateY(-50%) scale(1.1); }
  .hic-arrow-left  { left: 8px; }
  .hic-arrow-right { right: 8px; }
  .hic-dots { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 7px; z-index: 10; }
  .hic-dot { width: 22px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.30); border: none; cursor: pointer; padding: 0; transition: background 0.3s, width 0.3s; }
  .hic-dot.active { background: #fff; width: 30px; }

  /* TYPEWRITER */
  @keyframes blinkCursor { 0%,100%{opacity:1} 50%{opacity:0} }
  .tw-cursor { display: inline-block; width: 3px; height: 0.85em; background: currentColor; margin-left: 3px; vertical-align: middle; animation: blinkCursor .75s step-end infinite; }
  .tw-word-block { display: block; min-height: calc(1.04em * 2); overflow: hidden; }

  /* ANIMATIONS */
  @keyframes heroFadeUp { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
  .h-anim-1 { opacity:0; animation:heroFadeUp .55s var(--ease) .05s forwards; }
  .h-anim-2 { opacity:0; animation:heroFadeUp .55s var(--ease) .15s forwards; }
  .h-anim-3 { opacity:0; animation:heroFadeUp .55s var(--ease) .25s forwards; }
  .h-anim-4 { opacity:0; animation:heroFadeUp .55s var(--ease) .35s forwards; }
  .h-anim-5 { opacity:0; animation:heroFadeUp .55s var(--ease) .45s forwards; }
  .reveal { opacity:0; transform:translateY(22px); transition:opacity .6s var(--ease),transform .6s var(--ease); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-group .reveal { transition-delay:calc(var(--i,0) * .09s); }

  /* SERVICES CAROUSEL */
  .svc-section { padding: clamp(48px,8vw,100px) 0; position: relative; z-index: 1; }
  .svc-header { max-width: var(--container); margin: 0 auto; padding: 0 clamp(16px,4vw,var(--pad)) clamp(20px,3vw,36px); display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 14px; }
  .svc-stage { overflow: hidden; mask-image: linear-gradient(to right,transparent 0%,black 9%,black 91%,transparent 100%); -webkit-mask-image: linear-gradient(to right,transparent 0%,black 9%,black 91%,transparent 100%); cursor: grab; user-select: none; -webkit-user-select: none; padding: clamp(20px,4vw,40px) 0 clamp(36px,5vw,56px); touch-action: pan-y; }
  .svc-stage:active { cursor: grabbing; }
  .svc-persp { perspective: 1200px; perspective-origin: 50% 40%; }
  .svc-track { display: flex; gap: ${GAP}px; will-change: transform; }
  .svc-card { width: ${CARD_W}px; flex-shrink: 0; border-radius: 20px; overflow: hidden; background: #0b1914; border: 1px solid rgba(255,255,255,0.07); cursor: pointer; --tilt-x:0deg; --tilt-y:0deg; opacity: 0.35; filter: brightness(0.55); transform: scale(0.80) rotateY(18deg) translateZ(-80px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); transform-style: preserve-3d; backface-visibility: hidden; -webkit-backface-visibility: hidden; transition: opacity .52s cubic-bezier(0.22,1,0.36,1),filter .52s cubic-bezier(0.22,1,0.36,1),transform .52s cubic-bezier(0.22,1,0.36,1),box-shadow .52s cubic-bezier(0.22,1,0.36,1),border-color .35s ease; position: relative; z-index: 1; }
  .svc-card.pos-center { opacity:1; filter:none; transform:scale(1.02) rotateY(0deg) translateZ(20px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); border-color:rgba(20,184,166,0.50); box-shadow:0 32px 80px rgba(0,0,0,0.60),0 0 0 1px rgba(20,184,166,0.25),0 0 60px rgba(20,184,166,0.08); z-index:10; }
  .svc-card.pos-l1 { opacity:0.82; filter:brightness(0.78); transform:scale(0.93) rotateY(14deg) translateZ(-28px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); z-index:6; }
  .svc-card.pos-l2 { opacity:0.52; filter:brightness(0.58); transform:scale(0.84) rotateY(22deg) translateZ(-76px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); z-index:4; }
  .svc-card.pos-r1 { opacity:0.82; filter:brightness(0.78); transform:scale(0.93) rotateY(-14deg) translateZ(-28px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); z-index:6; }
  .svc-card.pos-r2 { opacity:0.52; filter:brightness(0.58); transform:scale(0.84) rotateY(-22deg) translateZ(-76px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x)); z-index:4; }
  .svc-card-img { width:100%; height: clamp(130px,18vw,190px); overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.06); position:relative; background:rgba(20,184,166,0.05); }
  .svc-card-img img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .55s cubic-bezier(0.22,1,0.36,1),filter .55s cubic-bezier(0.22,1,0.36,1); filter:brightness(0.82) saturate(0.85); pointer-events:none; user-select:none; -webkit-user-select:none; }
  .svc-card.pos-center .svc-card-img img { transform:scale(1.06); filter:brightness(1) saturate(1); }
  .svc-card-img-fade { position:absolute; inset:0; background:linear-gradient(to top,rgba(7,16,14,0.60) 0%,transparent 52%); pointer-events:none; }
  .svc-card-body { padding: clamp(12px,2vw,18px) clamp(14px,2vw,20px) clamp(14px,2vw,22px); }
  .svc-card-badge { display:inline-flex; align-items:center; padding:3px 10px; font-size:10px; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; border-radius:999px; background:rgba(20,184,166,0.12); color:#2dd4bf; border:1px solid rgba(20,184,166,0.24); margin-bottom:9px; }
  .svc-card-title { font-size: clamp(13px,1.8vw,17px); font-weight:700; letter-spacing:-0.025em; color:#dff0e8; margin:0 0 7px; line-height:1.25; }
  .svc-card-desc  { font-size: clamp(11px,1.3vw,13px); line-height:1.65; color:#7a9e8e; margin:0; }
  .svc-card-footer { margin-top: clamp(10px,1.5vw,18px); padding-top: clamp(10px,1.5vw,14px); border-top:1px solid rgba(255,255,255,0.07); display:flex; align-items:center; justify-content:space-between; gap:8px; }
  .svc-card-arr { width:30px; height:30px; border-radius:50%; border:1px solid rgba(255,255,255,0.11); display:flex; align-items:center; justify-content:center; color:#2dd4bf; flex-shrink:0; transition:background .22s ease,border-color .22s ease,transform .28s cubic-bezier(.34,1.56,.64,1); }
  .svc-card:hover .svc-card-arr { background:rgba(20,184,166,0.16); border-color:rgba(20,184,166,0.38); transform:translateX(4px); }
  .svc-dots { display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:6px; margin-top:20px; padding:0 clamp(16px,4vw,40px); }
  .svc-dot { width:7px; height:7px; border-radius:50%; background:rgba(255,255,255,0.15); border:none; padding:0; flex-shrink:0; cursor:pointer; transition:all 0.32s cubic-bezier(0.22,1,0.36,1); }
  .svc-dot.active { width:24px; border-radius:4px; background:#14b8a6; }
  .svc-nav { display:flex; gap:8px; }
  .svc-nav-btn { width:38px; height:38px; border-radius:50%; border:1px solid rgba(255,255,255,0.13); background:rgba(255,255,255,0.05); display:flex; align-items:center; justify-content:center; color:#2dd4bf; font-size:16px; line-height:1; transition:background .2s ease,border-color .2s ease,transform .22s cubic-bezier(.34,1.56,.64,1); }
  .svc-nav-btn:hover  { background:rgba(20,184,166,0.14); border-color:rgba(20,184,166,0.38); transform:scale(1.10); }
  .svc-nav-btn:active { transform:scale(0.92); }

  /* CONTENT SECTIONS */
  .intro-band { border-left: 3px solid var(--teal); padding-left: clamp(14px,3vw,24px); }
  .intro-band p { font-size: clamp(13px,1.5vw,15px); line-height: 1.8; color: var(--muted); margin: 0; }
  .our-svc-strip { background: rgba(20,184,166,0.05); border: 1px solid rgba(20,184,166,0.12); border-radius: var(--radius); padding: clamp(20px,4vw,36px) clamp(18px,4vw,40px); display: flex; flex-direction: column; justify-content: center; }
  .our-svc-strip p { font-size: clamp(13px,1.5vw,15px); line-height: 1.8; color: var(--muted); margin: 0; }
  .staffing-card { padding: clamp(16px,3vw,28px); border-radius: var(--radius-sm); border: 1px solid var(--border); background: rgba(255,255,255,0.03); transition: border-color .25s ease, background .25s ease; }
  .staffing-card:hover { border-color: rgba(20,184,166,0.30); background: rgba(20,184,166,0.04); }
  .staffing-num   { font-size: 10px; font-weight: 800; letter-spacing: 0.14em; color: var(--teal-2); margin-bottom: 10px; }
  .staffing-title { font-size: clamp(13px,1.6vw,16px); font-weight: 700; color: var(--text); margin: 0 0 7px; letter-spacing: -0.01em; }
  .staffing-desc  { font-size: clamp(11px,1.3vw,13px); line-height: 1.7; color: var(--muted); margin: 0; }
  .icon-list { display: flex; flex-direction: column; }
  .icon-item { display: grid; grid-template-columns: 46px 1fr; align-items: flex-start; padding: clamp(14px,2.5vw,22px) 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .icon-item:last-child { border-bottom: none; }
  .icon-item-icon { width: 34px; height: 34px; border-radius: 9px; background: rgba(20,184,166,0.10); border: 1px solid rgba(20,184,166,0.18); display: flex; align-items: center; justify-content: center; font-size: 13px; color: var(--teal-2); flex-shrink: 0; margin-top: 2px; }
  .icon-item-body h4 { font-size: clamp(13px,1.5vw,15px); font-weight: 700; color: var(--text); margin: 0 0 5px; letter-spacing: -0.01em; }
  .icon-item-body p  { font-size: clamp(11px,1.3vw,13px); line-height: 1.7; color: var(--muted); margin: 0; }
  .section-divider { width: 44px; height: 3px; border-radius: 2px; background: linear-gradient(90deg,var(--teal),var(--teal-2)); margin: 10px 0 18px; }
  .content-two-col { grid-template-columns: 1fr 1fr; }

  /* RESPONSIVE */
  @media(max-width:960px) {
    :root { --pad: 24px; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .content-two-col { grid-template-columns: 1fr !important; }
    .trust-grid { grid-template-columns: repeat(2,1fr) !important; }
    .cta-grid  { grid-template-columns: 1fr !important; }
    .cta-photo { min-height: 220px !important; }
  }
  @media(max-width:640px) {
    :root { --pad: 16px; }
    .trust-grid { grid-template-columns: 1fr !important; }
    .kicker { clip-path: none; border-radius: 5px; }
    .btn-row { flex-wrap: wrap !important; }
    .svc-header { flex-direction: column; align-items: flex-start; gap: 10px; }
    .svc-card { width: min(260px, calc(100vw - 88px)); }
    .svc-stage { mask-image: linear-gradient(to right,transparent 0%,black 5%,black 95%,transparent 100%); -webkit-mask-image: linear-gradient(to right,transparent 0%,black 5%,black 95%,transparent 100%); }
    .cta-photo { display: block !important; min-height: 180px !important; }
  }
  @media(max-width:420px) {
    .svc-card { width: calc(100vw - 64px); }
    .tw-word-block { min-height: calc(1.04em * 3); }
    .kicker { clip-path: none; border-radius: 6px; }
  }
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useLottieScript() {
  useEffect(() => {
    if (customElements.get("lottie-player") || document.getElementById("lottie-cdn")) return;
    const s = document.createElement("script");
    s.id  = "lottie-cdn";
    s.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    document.head.appendChild(s);
  }, []);
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io  = new IntersectionObserver(
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
      ([entry]) => { if (entry.isIntersecting) { ref.current.querySelectorAll(".bar-fill-js").forEach((b) => { b.style.width = b.dataset.targetWidth; }); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
}

function useTypewriter() {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setDel]  = useState(false);
  useEffect(() => {
    const word = TW_WORDS[wordIdx % TW_WORDS.length];
    if (!isDeleting && display === word) { const t = setTimeout(() => setDel(true), 1800); return () => clearTimeout(t); }
    if (isDeleting && display === "") { setDel(false); setWordIdx((i) => i + 1); return; }
    const next = isDeleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1);
    const t = setTimeout(() => setDisplay(next), isDeleting ? 35 : 55);
    return () => clearTimeout(t);
  }, [display, isDeleting, wordIdx]);
  return display;
}

// ── HERO IMAGE CAROUSEL ───────────────────────────────────────────────────────

function HeroImageCarousel() {
  const [cur, setCur] = useState(0);
  const go = useCallback((n) => setCur((n + heroSlides.length) % heroSlides.length), []);
  useEffect(() => {
    const t = setInterval(() => setCur((c) => (c + 1) % heroSlides.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hic-root">
      {heroSlides.map((s, i) => (
        <div key={i} className={`hic-slide${i === cur ? " active" : ""}`}>
          <img src={s.img} alt={s.title} />
        </div>
      ))}
      <div className="hic-overlay" />
      <div className="hic-text">
        <h3>{heroSlides[cur].title}</h3>
        <p>{heroSlides[cur].sub}</p>
      </div>
      <button className="hic-arrow hic-arrow-left" onClick={() => go(cur - 1)} aria-label="Previous">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <button className="hic-arrow hic-arrow-right" onClick={() => go(cur + 1)} aria-label="Next">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>
      <div className="hic-dots">
        {heroSlides.map((_, i) => (
          <button key={i} className={`hic-dot${i === cur ? " active" : ""}`} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

// ── 3D SERVICES CAROUSEL ─────────────────────────────────────────────────────

function ServicesCarousel() {
  const stageRef = useRef(null), trackRef = useRef(null), padXRef = useRef(0);
  const stageRectRef = useRef(null), offsetRef = useRef(0), itemIdxRef = useRef(CLONE_COUNT);
  const stepRef = useRef(STEP), dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const teleportRef = useRef(false), autoTimerRef = useRef(null), restartTimerRef = useRef(null), lastWheelRef = useRef(0);
  const [centerIdx, setCenterIdx] = useState(0);
  const [padX, setPadX] = useState(0);

  const pxFor       = useCallback((i) => i * stepRef.current, []);
  const applyOffset = useCallback((px) => { if (!trackRef.current) return; trackRef.current.style.transform = `translateX(${-px}px)`; offsetRef.current = px; }, []);
  const teleportIfClone = useCallback((iIdx) => {
    const isHead = iIdx >= CLONE_COUNT + N, isTail = iIdx < CLONE_COUNT;
    if (!isHead && !isTail) return;
    const real = isHead ? iIdx - N : iIdx + N;
    teleportRef.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
    applyOffset(pxFor(real)); itemIdxRef.current = real;
    requestAnimationFrame(() => { teleportRef.current = false; });
  }, [applyOffset, pxFor]);

  const snapToItem = useCallback((iIdx, smooth = true) => {
    if (teleportRef.current) return;
    const c = Math.max(0, Math.min(TOTAL - 1, iIdx));
    itemIdxRef.current = c; setCenterIdx(allItems[c]._real);
    if (!trackRef.current) return;
    for (let i = 0; i < trackRef.current.children.length; i++) { trackRef.current.children[i].style.removeProperty("--tilt-y"); trackRef.current.children[i].style.removeProperty("--tilt-x"); }
    if (smooth) { trackRef.current.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)"; applyOffset(pxFor(c)); }
    else { trackRef.current.style.transition = "none"; applyOffset(pxFor(c)); requestAnimationFrame(() => teleportIfClone(c)); }
  }, [applyOffset, pxFor, teleportIfClone]);

  const snapToReal      = useCallback((r) => snapToItem(CLONE_COUNT + ((r % N + N) % N)), [snapToItem]);
  const snapStep        = useCallback((d) => snapToItem(Math.max(0, Math.min(TOTAL - 1, itemIdxRef.current + d))), [snapToItem]);
  const stopAuto        = useCallback(() => { clearInterval(autoTimerRef.current); clearTimeout(restartTimerRef.current); }, []);
  const startAuto       = useCallback(() => { clearInterval(autoTimerRef.current); autoTimerRef.current = setInterval(() => snapStep(1), 3600); }, [snapStep]);
  const scheduleRestart = useCallback((delay = 2000) => { clearTimeout(restartTimerRef.current); restartTimerRef.current = setTimeout(startAuto, delay); }, [startAuto]);
  const snapFromRaw     = useCallback(() => snapToItem(Math.max(0, Math.min(TOTAL - 1, Math.round(offsetRef.current / stepRef.current)))), [snapToItem]);

  useEffect(() => {
    const upd = () => {
      if (!stageRef.current) return;
      const cw = trackRef.current?.firstElementChild?.offsetWidth || CARD_W;
      stepRef.current = cw + GAP;
      const sw = stageRef.current.getBoundingClientRect().width;
      const np = Math.max(0, Math.floor((sw - cw) / 2));
      padXRef.current = np; setPadX(np);
      stageRectRef.current = stageRef.current.getBoundingClientRect();
      applyOffset(itemIdxRef.current * stepRef.current);
    };
    upd();
    const ro = new ResizeObserver(upd);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [applyOffset]);

  useEffect(() => { snapToItem(CLONE_COUNT, false); startAuto(); return () => stopAuto(); }, []); // eslint-disable-line

  useEffect(() => {
    const stage = stageRef.current; if (!stage) return;
    const md  = (e) => { if (teleportRef.current) return; stopAuto(); if (trackRef.current) trackRef.current.style.transition = "none"; dragRef.current = { active:true, startX:e.clientX, startOffset:offsetRef.current }; };
    const mm  = (e) => { if (!dragRef.current.active) return; applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.clientX)); };
    const mu  = () => { if (!dragRef.current.active) return; dragRef.current.active = false; snapFromRaw(); scheduleRestart(); };
    const ts  = (e) => { if (teleportRef.current) return; stopAuto(); if (trackRef.current) trackRef.current.style.transition = "none"; dragRef.current = { active:true, startX:e.touches[0].clientX, startOffset:offsetRef.current }; };
    const tm  = (e) => { if (!dragRef.current.active) return; applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.touches[0].clientX) * 1.5); };
    const te  = () => { if (!dragRef.current.active) return; dragRef.current.active = false; snapFromRaw(); scheduleRestart(); };
    const wh  = (e) => { const isH = Math.abs(e.deltaX) > Math.abs(e.deltaY); if (isH) e.preventDefault(); if (teleportRef.current) return; const now = Date.now(); if (now - lastWheelRef.current < 420) return; const val = isH ? e.deltaX : e.deltaY; if (Math.abs(val) < 15) return; lastWheelRef.current = now; stopAuto(); snapStep(val > 0 ? 1 : -1); scheduleRestart(2000); };
    const smm = (e) => { if (dragRef.current.active) return; const card = trackRef.current?.children[itemIdxRef.current]; if (!card) return; const r = stageRectRef.current; if (!r) return; card.style.setProperty("--tilt-y", `${((e.clientX - r.left)/r.width - 0.5)*-8}deg`); card.style.setProperty("--tilt-x", `${((e.clientY - r.top)/r.height - 0.5)*5}deg`); };
    const sml = () => { const card = trackRef.current?.children[itemIdxRef.current]; if (!card) return; card.style.setProperty("--tilt-y","0deg"); card.style.setProperty("--tilt-x","0deg"); };
    stage.addEventListener("mousedown", md); window.addEventListener("mousemove", mm); window.addEventListener("mouseup", mu);
    stage.addEventListener("touchstart", ts, { passive:true }); stage.addEventListener("touchmove", tm, { passive:true }); stage.addEventListener("touchend", te);
    stage.addEventListener("wheel", wh, { passive:false }); stage.addEventListener("mousemove", smm); stage.addEventListener("mouseleave", sml);
    return () => {
      stage.removeEventListener("mousedown", md); window.removeEventListener("mousemove", mm); window.removeEventListener("mouseup", mu);
      stage.removeEventListener("touchstart", ts); stage.removeEventListener("touchmove", tm); stage.removeEventListener("touchend", te);
      stage.removeEventListener("wheel", wh); stage.removeEventListener("mousemove", smm); stage.removeEventListener("mouseleave", sml);
    };
  }, [applyOffset, snapFromRaw, snapStep, stopAuto, scheduleRestart]);

  const posClass = (ri) => {
    let d = ri - centerIdx;
    if (d > N/2) d -= N; if (d < -N/2) d += N;
    if (d===0)  return "svc-card pos-center";
    if (d===-1) return "svc-card pos-l1";
    if (d===-2) return "svc-card pos-l2";
    if (d===1)  return "svc-card pos-r1";
    if (d===2)  return "svc-card pos-r2";
    return "svc-card";
  };

  return (
    <section className="svc-section section--alt">
      <div className="svc-header">
        <div>
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ marginTop:8 }}>End-to-end solutions, built to scale</h2>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <div className="svc-nav">
            <button className="svc-nav-btn" onClick={() => { stopAuto(); snapStep(-1); scheduleRestart(); }}>←</button>
            <button className="svc-nav-btn" onClick={() => { stopAuto(); snapStep(1);  scheduleRestart(); }}>→</button>
          </div>
          <Link className="btn btn--ghost btn--sm" to="/services">View all</Link>
        </div>
      </div>
      <div className="svc-stage" ref={stageRef}>
        <div className="svc-persp">
          <div className="svc-track" ref={trackRef} style={{ paddingLeft:padX, paddingRight:padX }}
            onTransitionEnd={(ev) => { if (ev.propertyName !== "transform" || ev.target !== trackRef.current) return; trackRef.current.style.transition = "none"; teleportIfClone(itemIdxRef.current); }}
          >
            {allItems.map((s) => (
              <div key={s._key} className={posClass(s._real)} onClick={() => { stopAuto(); snapToReal(s._real); scheduleRestart(); }}>
                <div className="svc-card-img">
                  <img src={s.image} alt={s.title} loading="lazy" draggable={false} />
                  <div className="svc-card-img-fade" />
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-badge">{s.badge}</div>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                  <div className="svc-card-footer">
                    <Link to={s.path} className="btn btn--ghost btn--sm" onClick={(e) => e.stopPropagation()}>Learn more</Link>
                    <div className="svc-card-arr">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="svc-dots">
        {offerings.map((s, i) => (
          <button key={i} className={`svc-dot${i===centerIdx?" active":""}`} onClick={() => { stopAuto(); snapToReal(i); scheduleRestart(); }} aria-label={s.title} />
        ))}
      </div>
    </section>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────

export default function Home() {
  useReveal();
  useLottieScript();
  const twWord = useTypewriter();
  const ctaRef = useRef(null);
  useBarFillOnScroll(ctaRef);

  return (
    <div>
      <style>{pageStyles}</style>

      {/* ══ HERO ══ */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2 hero-grid" style={{ alignItems:"center", gap:"clamp(24px,4vw,40px)" }}>
            <div>
              <div className="kicker h-anim-1">Enterprise IT services</div>
              <h1 className="h1 h-anim-2" style={{ marginTop:12 }}>
                Build, scale, and transform your technology faster —
                <span className="tw-word-block">{twWord}<span className="tw-cursor" aria-hidden="true" /></span>
              </h1>
              <p className="lead h-anim-3" style={{ marginTop:16, maxWidth:"56ch" }}>
                Flexible consulting, staffing, and data solutions designed to help you deliver results —
                without long-term overhead. We adapt to your needs, quickly and cost-effectively.
              </p>
              <div className="h-anim-4 btn-row" style={{ display:"flex", gap:10, marginTop:22, flexWrap:"wrap" }}>
                <Link className="btn btn--primary" to="/contact">Get in touch</Link>
                <Link className="btn btn--ghost"   to="/services">View services</Link>
              </div>
            </div>
            <div className="h-anim-5">
              <HeroImageCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES CAROUSEL ══ */}
      <ServicesCarousel />

      {/* ══ WHAT WE DO INTRO ══ */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">What we do</div>
          <h2 className="h2 reveal" style={{ marginTop:8 }}>The right talent, tools, and strategy —<br />exactly when you need them</h2>
          <div className="section-divider reveal" />
          <div className="grid content-two-col reveal" style={{ gap:"clamp(24px,5vw,48px)", marginTop:8, alignItems:"stretch" }}>
            <div className="intro-band">
              <p>
                We help businesses solve complex technology challenges by providing the right people and expertise — on demand. Whether you're filling a short-term skill gap or delivering a large-scale transformation, our flexible model adapts to your timeline and budget.
              </p>
              <p style={{ marginTop:14 }}>
                From critical technical skills to full project delivery — we're ready to become an extension of your team, immediately.
              </p>
            </div>
            <div className="our-svc-strip">
              <div className="kicker" style={{ marginBottom:14 }}>Our Services</div>
              <p>
                From IT staffing to strategic consulting and data engineering, we offer a comprehensive range of services tailored to modern businesses. One partner, every capability — so you can focus on what matters most: delivering results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STAFFING SOLUTIONS ══ */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid content-two-col" style={{ gap:"clamp(24px,5vw,64px)", alignItems:"center" }}>
            <div className="reveal">
              <div className="kicker">Staffing</div>
              <h2 className="h2" style={{ marginTop:10 }}>Get the right talent — at the right time</h2>
              <div className="section-divider" />
              <p className="lead">
                Build high-performing teams without the hiring overhead. We provide pre-vetted professionals who are ready to contribute from day one — matched to your technical requirements and team culture.
              </p>
              <div style={{ marginTop:24 }}>
                <Link className="btn btn--primary" to="/services">Explore staffing</Link>
              </div>
            </div>
            <div className="reveal-group" style={{ display:"flex", flexDirection:"column", gap:"clamp(10px,2vw,16px)" }}>
              {staffingItems.map((item, i) => (
                <div key={item.num} className="staffing-card reveal" style={{ "--i": i }}>
                  <div className="staffing-num">{item.num}</div>
                  <div className="staffing-title">{item.title}</div>
                  <p className="staffing-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONSULTING SERVICES ══ */}
      <section className="section">
        <div className="container">
          <div className="grid content-two-col" style={{ gap:"clamp(24px,5vw,64px)", alignItems:"flex-start" }}>
            <div className="reveal">
              <div className="icon-list">
                {consultingItems.map((item) => (
                  <div key={item.title} className="icon-item">
                    <div className="icon-item-icon">{item.icon}</div>
                    <div className="icon-item-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal" style={{ position:"sticky", top:120 }}>
              <div className="kicker">Advisory</div>
              <h2 className="h2" style={{ marginTop:10 }}>Expert guidance for complex technology decisions</h2>
              <div className="section-divider" />
              <p className="lead">
                Turn technology challenges into strategic advantages. Our consultants bring deep domain expertise and a track record of delivering results across industries.
              </p>
              <div style={{ marginTop:24 }}>
                <Link className="btn btn--primary" to="/services/consulting">Learn more</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROJECT MANAGEMENT ══ */}
      <section className="section section--alt">
        <div className="container">
          <div className="grid content-two-col" style={{ gap:"clamp(24px,5vw,64px)", alignItems:"flex-start" }}>
            <div className="reveal" style={{ position:"sticky", top:120 }}>
              <div className="kicker">Delivery</div>
              <h2 className="h2" style={{ marginTop:10 }}>Deliver projects on time — and with confidence</h2>
              <div className="section-divider" />
              <p className="lead">
                We ensure your projects stay on track, within scope, and aligned with your goals. End-to-end ownership, from kickoff to go-live — so nothing falls through the cracks.
              </p>
              <div style={{ marginTop:24 }}>
                <Link className="btn btn--primary" to="/services/project-management">Learn more</Link>
              </div>
            </div>
            <div className="reveal">
              <div className="icon-list">
                {pmItems.map((item) => (
                  <div key={item.title} className="icon-item">
                    <div className="icon-item-icon">{item.icon}</div>
                    <div className="icon-item-body">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TRUST ══ */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Why teams trust us</div>
          <h2 className="h2 reveal" style={{ marginTop:8 }}>Built for enterprise-scale delivery</h2>
          <div className="reveal trust-banner" style={{ marginTop:20, borderRadius:14, overflow:"hidden", height:"clamp(100px,14vw,170px)", position:"relative" }}>
            <img style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=75" alt="Team" loading="lazy" onError={(e)=>{e.currentTarget.style.display="none";}} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(0,0,0,.58) 0%,transparent 65%)", pointerEvents:"none" }} />
            <div style={{ position:"absolute", bottom:"clamp(10px,3%,18px)", left:"clamp(14px,3%,22px)", color:"#fff" }}>
              <div style={{ fontSize:"clamp(10px,1.3vw,13px)", opacity:0.8, marginBottom:3 }}>Trusted by enterprises across Financial Services, Healthcare, Retail, Manufacturing &amp; more</div>
              <div style={{ fontSize:"clamp(13px,1.8vw,18px)", fontWeight:600 }}>Specialised. Scalable. Results-driven.</div>
            </div>
          </div>
          <div className="grid grid-3 trust-grid reveal-group" style={{ marginTop:20 }}>
            {trust.map((t, i) => (
              <div key={t.title} className="card card-lift trust-card reveal" style={{ "--i": i }}>
                <div className="trust-lottie-wrap"><lottie-player autoplay loop mode="normal" src={t.lottie} /></div>
                <div className="trust-card-body"><h3>{t.title}</h3><p>{t.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="section section--alt">
        <div className="container card reveal" style={{ padding:0, overflow:"hidden" }}>
          <div className="grid grid-2 cta-grid" style={{ alignItems:"stretch", gap:0 }}>
            <div style={{ padding:"clamp(22px,4vw,40px)" }}>
              <div className="kicker">Next step</div>
              <h2 className="h2" style={{ marginTop:10 }}>Tell us what you need to build.</h2>
              <p className="lead" style={{ marginTop:10 }}>
                From greenfield projects to post-Go-Live support — we bring speed, precision, and reliability to every engagement. Let's make it happen.
              </p>
              <div className="btn-row" style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
                <Link className="btn btn--primary" to="/contact">Contact us</Link>
                <Link className="btn btn--ghost"   to="/about">About us</Link>
              </div>
            </div>
            <div className="cta-photo" ref={ctaRef} style={{ position:"relative", minHeight:220, overflow:"hidden" }}>
              <img style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=75" alt="Team" loading="lazy" onError={(e)=>{e.currentTarget.style.display="none";}} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to left,transparent 35%,rgba(7,16,14,0.96) 100%)", pointerEvents:"none" }} />
              <div className="card" style={{ position:"absolute", bottom:14, right:14, padding:"clamp(10px,2vw,14px) clamp(12px,2vw,18px)", minWidth:165, backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)" }}>
                <div className="kicker" style={{ marginBottom:9 }}>Timeline</div>
                <div style={{ display:"grid", gap:8 }}>
                  {[["Discovery",24],["Plan",48],["Deliver",72]].map(([label,pct]) => (
                    <div key={label} style={{ display:"grid", gridTemplateColumns:"60px 1fr 34px", alignItems:"center", gap:7, fontSize:"clamp(10px,1.3vw,12px)" }}>
                      <div style={{ fontWeight:600, color:"var(--text)" }}>{label}</div>
                      <div className="bar-track"><div className="bar-fill-js" data-target-width={`${pct}%`} /></div>
                      <div style={{ fontWeight:800, color:"var(--muted)", textAlign:"right" }}>{pct}h</div>
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