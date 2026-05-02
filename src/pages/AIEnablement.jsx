import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useEffect, useRef } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>),
    title: "Agent AI Development",
    desc: "AI agents that perceive, reason, act, and continuously improve — far beyond traditional chatbots.",
    bullets: ["Goal-driven reasoning & decision-making", "Multi-step task execution", "Tool & API integration", "Memory-based personalization", "Safety, guardrails & persona alignment"],
    tag: "NEW",
  },
  {
    num: "02",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v5c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 10v5c0 1.66 4 3 9 3s9-1.34 9-3v-5"/></svg>),
    title: "Data Services",
    desc: "Precise, scalable, domain-specific data solutions powered by a permanent workforce of 100+ expert annotators.",
    bullets: ["Image, text, audio & video annotation", "Entity extraction & classification", "Bounding boxes, segmentation & 3D labeling", "Domain-specific annotation (medical, retail, finance)", "Sentiment & intent tagging"],
    tag: null,
  },
  {
    num: "03",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    title: "Human Augmentation",
    desc: "Human-in-the-Loop validation that keeps models accurate, aligned with business goals, and reliably human-centered.",
    bullets: ["Continuous human feedback loops", "Conversational AI tuning", "Safety & guardrail enforcement", "Edge case identification", "Model retraining & drift correction"],
    tag: null,
  },
  {
    num: "04",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>),
    title: "Managed Data Operations",
    desc: "Global data collection and preparation — ethically sourced, compliance-aligned, tailored to your model requirements.",
    bullets: ["Global data sourcing (image, text, speech, video)", "Compliance-aligned data acquisition", "Data cleaning, normalization & structuring", "Custom datasets for model requirements", "Diverse, representative datasets"],
    tag: null,
  },
  {
    num: "05",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>),
    title: "Model Testing & Validation",
    desc: "Structured Dev → Staging → Production validation. Industry-specific testing so your AI performs in the real world.",
    bullets: ["Functional & bias fairness evaluation", "Performance benchmarking", "Stress & edge-case testing", "Regression testing across updates", "Healthcare, retail, automotive, finance & more"],
    tag: null,
  },
  {
    num: "06",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18"/></svg>),
    title: "AI Strategy & Consulting",
    desc: "Define your AI roadmap, identify high-impact use cases, and build scalable architectures with expert guidance.",
    bullets: ["AI maturity assessment", "Use-case discovery workshops", "Architecture & platform design", "Build vs. buy analysis", "Governance & compliance frameworks"],
    tag: null,
  },
  {
    num: "07",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>),
    title: "Model Deployment & MLOps",
    desc: "Operationalize AI with robust pipelines, automated retraining, and real-time monitoring across cloud platforms.",
    bullets: ["CI/CD for ML models", "Automated retraining pipelines", "Model versioning & rollback", "Real-time monitoring & drift detection", "Cloud-native deployment (AWS, Azure, GCP)"],
    tag: null,
  },
  {
    num: "08",
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    title: "Security, Compliance & Governance",
    desc: "AI systems built to be safe, ethical, and compliant with global standards — from data privacy to model explainability.",
    bullets: ["Data privacy & anonymization", "SOC2, GDPR, HIPAA alignment", "Model explainability & transparency", "Risk assessment & mitigation", "Responsible AI frameworks"],
    tag: null,
  },
];

const stats = [
  ["98%", "Annotation accuracy"],
  ["100+", "Expert annotators"],
  ["3+ yrs", "Avg. annotator exp."],
  ["48h", "Project scoping"],
];

const pillars = [
  { label: "Our Value", body: "Strategic partners delivering data-driven solutions for complex AI, data, and security challenges — keeping your business competitive and future-ready." },
  { label: "Our Vision", body: "To build a strong ecosystem of advanced technologies, industry expertise, and delivery excellence, supported by world-class professionals." },
  { label: "Our Mission", body: "Drive innovation through intelligent solutions, accelerate digital transformation, and deliver secure, scalable systems that empower businesses." },
];

const industries = [
  { icon: "🏥", label: "Healthcare" },
  { icon: "🛒", label: "Retail" },
  { icon: "🚗", label: "Automotive" },
  { icon: "💰", label: "Finance" },
  { icon: "🎓", label: "Education" },
  { icon: "📡", label: "Telecom" },
];

const whyUs = [
  { title: "Full AI lifecycle", body: "Raw data to deployed, monitored models — end-to-end." },
  { title: "Human + AI hybrid", body: "100+ trained annotators with 3+ years of domain experience." },
  { title: "Fast onboarding", body: "Pilot to enterprise scale — we ramp quickly and adapt to you." },
  { title: "Quality & compliance", body: "Multi-layer QA, NDA-ready ops, GDPR & HIPAA aligned." },
  { title: "48h project scope", body: "Tell us your project and we'll deliver a tailored scope fast." },
  { title: "Flexible engagement", body: "Managed service, staff augmentation, or full outsource." },
];

// ── STYLES ────────────────────────────────────────────────────────────────────

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #07100e;
    --text: #dff0e8;
    --muted: #7a9e8e;
    --muted-2: #4a6a5a;
    --border: rgba(255,255,255,0.07);
    --border-2: rgba(255,255,255,0.12);
    --teal: #14b8a6;
    --teal-2: #2dd4bf;
    --teal-d: #0d9488;
    --accent: #22c55e;
    --accent-2: #4ade80;
    --navy: #020c09;
    --grad-brand: linear-gradient(135deg,var(--teal),var(--accent));
    --grad-text: linear-gradient(135deg,var(--teal-2) 0%,var(--accent-2) 100%);
    --shadow-soft: 0 8px 32px rgba(0,0,0,0.30);
    --shadow: 0 24px 80px rgba(0,0,0,0.55);
    --radius: 16px;
    --radius-sm: 11px;
    --radius-pill: 999px;
    --ease: cubic-bezier(0.22,1,0.36,1);
    --dur: 0.25s;
  }

  *,*::before,*::after{box-sizing:border-box}
  html{height:100%;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  body{margin:0;font-family:'Inter',system-ui,sans-serif;line-height:1.6;color:var(--text);background:var(--bg);overflow-x:hidden;min-height:100%}
  body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%);pointer-events:none;z-index:0}
  a{color:inherit;text-decoration:none} button{font:inherit;cursor:pointer} img,svg{display:block;max-width:100%}

  .app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}
  .main{flex:1;padding-top:80px}
  .container{width:100%;max-width:1280px;margin:0 auto;padding:0 clamp(20px,5vw,64px)}
  .section{padding:clamp(40px,7vw,90px) 0;position:relative}
  .section--alt{background:rgba(255,255,255,0.015)}

  /* TYPOGRAPHY */
  .h1{font-weight:800;font-size:clamp(26px,3.8vw,52px);line-height:1.05;letter-spacing:-0.04em;margin:0}
  .h2{font-weight:800;font-size:clamp(20px,2.8vw,36px);line-height:1.1;letter-spacing:-0.03em;margin:0}
  .lead{font-size:clamp(12px,1.5vw,16px);color:var(--muted);line-height:1.7;margin:0}

  .kicker{display:inline-flex;align-items:center;gap:8px;padding:4px 12px 4px 9px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--text);border:1px solid rgba(255,255,255,0.12);clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
  .kicker::before{content:'';display:block;width:5px;height:5px;background:#1D9E75;clip-path:polygon(50% 0%,100% 100%,0% 100%);flex-shrink:0}

  /* BUTTONS */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:9px 18px;border-radius:var(--radius-pill);border:1px solid var(--border-2);background:rgba(255,255,255,0.07);color:var(--text);font-size:clamp(11px,1.3vw,13px);font-weight:500;cursor:pointer;transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease);white-space:nowrap}
  .btn:hover{transform:translateY(-2px);box-shadow:var(--shadow-soft)}
  .btn--primary{background:#085041;color:#9FE1CB;border:1.5px solid #085041;border-radius:5px;box-shadow:4px 4px 0 #1D9E75;font-weight:600}
  .btn--primary:hover{box-shadow:2px 2px 0 #1D9E75;transform:translate(2px,2px)}
  .btn--primary:active{box-shadow:none;transform:translate(4px,4px)}
  .btn--ghost{background:transparent;border-color:rgba(20,184,166,0.22);color:var(--teal-2)}
  .btn--ghost:hover{background:rgba(20,184,166,0.08);border-color:rgba(20,184,166,0.40)}
  .btn--full{width:100%}

  /* CARDS */
  .card{position:relative;border-radius:var(--radius);border:1px solid var(--border);background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);box-shadow:var(--shadow-soft);transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease)}
  .card:hover{transform:translateY(-4px);box-shadow:var(--shadow);border-color:rgba(20,184,166,0.18)}
  .card::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,0.28) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity 0.45s var(--ease);pointer-events:none}
  .card:hover::before{opacity:1}
  .card-i{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-sm)}

  /* UTILITIES */
  .accent-bar{width:26px;height:3px;border-radius:2px;background:var(--grad-brand);margin-bottom:12px}
  .icon-badge{width:32px;height:32px;border-radius:9px;background:rgba(20,184,166,0.10);border:1px solid rgba(20,184,166,0.18);display:flex;align-items:center;justify-content:center;color:var(--teal-2);flex-shrink:0}
  .bar-track{height:5px;border-radius:999px;background:rgba(13,148,136,0.15);overflow:hidden}
  .bar-fill-js{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--teal-d),var(--teal-2));width:0;transition:width 0.9s cubic-bezier(0.22,1,0.36,1)}
  .stat-num{font-weight:800;font-size:clamp(20px,3.5vw,42px);letter-spacing:-0.04em;background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}

  /* CTA BAND */
  .cta-band{background:var(--grad-brand);border-radius:var(--radius);padding:clamp(22px,5vw,44px) clamp(18px,5vw,40px);display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
  .cta-band__title{font-weight:800;font-size:clamp(16px,3vw,28px);letter-spacing:-0.03em;color:#fff;margin:0 0 5px}
  .cta-band__sub{font-size:clamp(11px,1.5vw,14px);color:rgba(255,255,255,0.82);margin:0}
  .cta-band__btn{background:#fff;color:var(--teal-d);border:none;font-weight:700}
  .cta-band__btn:hover{background:rgba(255,255,255,0.90)}

  /* HERO BANNER */
  .ai-hero-banner{position:relative;border-radius:var(--radius);overflow:hidden;margin-top:clamp(20px,4vw,36px);aspect-ratio:21/7;box-shadow:0 16px 48px rgba(0,0,0,.16)}
  .ai-hero-banner img{width:100%;height:100%;object-fit:cover;filter:saturate(.7) brightness(.8)}
  .ai-hero-banner-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,148,136,.45) 0%,rgba(0,0,0,.2) 100%)}
  .ai-hero-banner-text{position:absolute;left:clamp(14px,4%,28px);bottom:clamp(10px,3%,20px);color:#fff}
  .ai-hero-banner-text h3{font-size:clamp(11px,2.5vw,17px);font-weight:800;margin:0 0 3px;text-shadow:0 2px 8px rgba(0,0,0,.3)}
  .ai-hero-banner-text p{font-size:clamp(9px,1.4vw,12px);margin:0;opacity:.85}

  /* PARTNER IMAGE */
  .ai-partner-img{border-radius:var(--radius);overflow:hidden;aspect-ratio:4/3;margin-top:18px}
  .ai-partner-img img{width:100%;height:100%;object-fit:cover;filter:saturate(.85);transition:transform .6s ease}
  .ai-partner-img:hover img{transform:scale(1.03)}

  /* SERVICE BENTO — 4 cols desktop */
  .ai-svc-bento{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.5vw,18px)}
  .ai-svc-cell{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;position:relative;transition:border-color .25s,background .25s}
  .ai-svc-cell:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06)}
  .ai-svc-cell::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,.22) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .45s;pointer-events:none}
  .ai-svc-cell:hover::before{opacity:1}
  .ai-svc-cell__body{padding:clamp(10px,2.5vw,18px);display:flex;flex-direction:column;flex:1}
  .ai-svc-cell__head{display:flex;align-items:flex-start;gap:8px;margin-bottom:8px}
  .ai-svc-cell__footer{display:flex;gap:6px;margin-top:12px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.07);flex-wrap:wrap}
  .svc-tag{font-size:8px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-2);background:rgba(34,197,94,.12);border:1px solid rgba(34,197,94,.25);border-radius:4px;padding:2px 6px;white-space:nowrap}
  .svc-num{font-size:9px;font-weight:700;color:var(--teal);letter-spacing:.06em;text-transform:uppercase;line-height:1;margin-bottom:2px}
  .svc-title{font-weight:700;font-size:clamp(11px,1.6vw,14px);line-height:1.2;color:var(--text)}
  .svc-desc{font-size:clamp(10px,1.3vw,12px);color:var(--muted);line-height:1.5;margin:0 0 8px}
  .svc-bullet{display:flex;align-items:flex-start;gap:6px;font-size:clamp(9px,1.2vw,11px);color:var(--muted);line-height:1.4}
  .svc-dot{width:4px;height:4px;border-radius:50%;background:var(--teal);flex-shrink:0;margin-top:5px}

  /* PILLAR VISUAL */
  .pillar-visual{width:100%;height:clamp(90px,12vw,150px);overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.06);background:rgba(255,255,255,0.02);display:flex;align-items:center;justify-content:center;position:relative}
  .pillar-visual svg{overflow:visible}

  /* STATS — 4 cols always, 2 on small mobile */
  .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(6px,1.5vw,12px);margin-top:clamp(16px,3vw,36px)}

  /* TWO COL */
  .two-col{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(14px,3vw,28px);align-items:start}

  /* QA MINI GRID */
  .qa-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:7px;margin-top:12px}

  /* WHY US — 2 cols mobile, 3 desktop */
  .why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(7px,1.5vw,12px)}
  .why-card{padding:clamp(12px,2vw,18px);border-radius:var(--radius-sm);border:1px solid var(--border);background:rgba(255,255,255,0.03);transition:border-color .25s,transform .25s var(--ease)}
  .why-card:hover{border-color:rgba(20,184,166,.2);transform:translateY(-3px)}
  .why-card__title{font-weight:700;font-size:clamp(11px,1.4vw,13px);color:var(--text);margin-bottom:4px}
  .why-card__body{font-size:clamp(10px,1.2vw,12px);color:var(--muted);line-height:1.5;margin:0}

  /* INDUSTRIES — 3 cols mobile, 6 desktop */
  .industry-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(7px,1.5vw,12px)}
  .industry-chip{display:flex;flex-direction:column;align-items:center;gap:5px;padding:clamp(10px,2vw,16px) 8px;border-radius:var(--radius-sm);border:1px solid var(--border);background:rgba(255,255,255,0.03);text-align:center;transition:border-color .2s,transform .2s}
  .industry-chip:hover{border-color:rgba(20,184,166,.25);transform:translateY(-2px)}
  .industry-chip__emoji{font-size:clamp(16px,3vw,22px);line-height:1}
  .industry-chip__label{font-size:clamp(9px,1.1vw,11px);font-weight:600;color:var(--muted)}

  /* AGENT CHIPS */
  .agent-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(6px,1.2vw,9px);margin-top:14px}
  .agent-chip{padding:clamp(9px,1.5vw,12px) clamp(9px,1.8vw,13px);border-radius:9px;border:1px solid rgba(20,184,166,.15);background:rgba(20,184,166,.04);display:flex;align-items:center;gap:7px;font-size:clamp(9px,1.2vw,12px);font-weight:600;color:var(--text)}
  .agent-chip__dot{width:5px;height:5px;border-radius:50%;background:var(--teal);flex-shrink:0}

  /* ANIMATIONS */
  @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.06) translateX(-8px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate}
  @keyframes pv-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
  @keyframes pv-pulse{0%,100%{opacity:.14}50%{opacity:.30}}
  @keyframes pv-scan{from{transform:translateX(-100%)}to{transform:translateX(400%)}}
  @keyframes pv-dash{from{stroke-dashoffset:300}to{stroke-dashoffset:0}}
  @keyframes pv-blink{0%,100%{opacity:1}50%{opacity:.25}}
  @keyframes pv-grow{from{transform:scaleY(0)}to{transform:scaleY(1)}}
  @keyframes pv-orbit{from{transform:rotate(0deg) translateX(52px) rotate(0deg)}to{transform:rotate(360deg) translateX(52px) rotate(-360deg)}}
  @keyframes pv-orbit2{from{transform:rotate(180deg) translateX(32px) rotate(-180deg)}to{transform:rotate(540deg) translateX(32px) rotate(-540deg)}}
  @keyframes pv-ping{0%{r:4;opacity:.8}100%{r:12;opacity:0}}
  @keyframes pv-tick{0%{stroke-dashoffset:40}100%{stroke-dashoffset:0}}
  @keyframes pv-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}

  /* RESPONSIVE */
  @media(min-width:900px){
    .why-grid{grid-template-columns:repeat(3,1fr)}
    .industry-grid{grid-template-columns:repeat(6,1fr)}
  }
  @media(max-width:1200px){
    .ai-svc-bento{grid-template-columns:repeat(2,minmax(0,1fr))}
  }
  @media(max-width:680px){
    .two-col{grid-template-columns:1fr}
    .stats-grid{grid-template-columns:repeat(2,1fr)}
    .ai-hero-banner{aspect-ratio:4/3}
  }
  @media(max-width:380px){
    .ai-svc-cell__footer .btn{font-size:10px;padding:6px 10px}
  }
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useBarFillOnScroll(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        ref.current.querySelectorAll(".bar-fill-js").forEach(b => { b.style.width = b.dataset.targetWidth; });
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
}

// ── PILLAR SVG VISUALS ────────────────────────────────────────────────────────

function VisualAgentAI() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="100" ry="42" fill="rgba(20,184,166,.05)" style={{animation:"pv-pulse 4s ease-in-out infinite"}}/>
        <circle cx="160" cy="65" r="24" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.4)" strokeWidth="1.5"/>
        <circle cx="160" cy="65" r="30" fill="none" stroke="rgba(20,184,166,.2)" strokeWidth="1" strokeDasharray="8 6" style={{animation:"pv-spin 8s linear infinite",transformOrigin:"160px 65px"}}/>
        <circle cx="160" cy="63" r="8" fill="none" stroke="#2dd4bf" strokeWidth="1.6"/>
        <circle cx="160" cy="63" r="3" fill="#14b8a6"/>
        <line x1="152" y1="63" x2="146" y2="63" stroke="#2dd4bf" strokeWidth="1.4" strokeLinecap="round"/>
        <line x1="168" y1="63" x2="174" y2="63" stroke="#2dd4bf" strokeWidth="1.4" strokeLinecap="round"/>
        <text x="160" y="78" textAnchor="middle" fill="#14b8a6" fontSize="5.5" fontWeight="800" letterSpacing=".1em">AGENT</text>
        {[{label:"REASON",angle:0,col:"#14b8a6"},{label:"ACT",angle:72,col:"#2dd4bf"},{label:"LEARN",angle:144,col:"#22c55e"},{label:"MEMORY",angle:216,col:"#4ade80"},{label:"ADAPT",angle:288,col:"#14b8a6"}].map(({label,angle,col})=>{
          const rad=(angle*Math.PI)/180,r=56,cx=160+r*Math.cos(rad),cy=65+r*Math.sin(rad);
          return(<g key={label} style={{animation:`pv-float 3.5s ease-in-out ${angle*.01}s infinite`}}>
            <circle cx={cx} cy={cy} r="12" fill="rgba(255,255,255,.03)" stroke={`${col}55`} strokeWidth="1"/>
            <text x={cx} y={cy+3.5} textAnchor="middle" fill={col} fontSize="5" fontWeight="800" letterSpacing=".05em">{label}</text>
            <line x1={160+24*Math.cos(rad)} y1={65+24*Math.sin(rad)} x2={cx-12*Math.cos(rad)} y2={cy-12*Math.sin(rad)} stroke={`${col}38`} strokeWidth="1" strokeDasharray="3 3"/>
          </g>);
        })}
        <circle cx="160" cy="65" r="5" fill="rgba(20,184,166,.3)" style={{animation:"pv-ping 2s ease-out infinite"}}/>
      </svg>
    </div>
  );
}

function VisualDataServices() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="110" ry="44" fill="rgba(20,184,166,.05)" style={{animation:"pv-pulse 4s ease-in-out infinite"}}/>
        {[0,1,2].map(i=>(
          <g key={i} style={{animation:`pv-float ${3+i*.4}s ease-in-out ${i*.3}s infinite`}}>
            <ellipse cx="72" cy={40+i*18} rx="22" ry="6" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.35)" strokeWidth="1.2"/>
            <rect x="50" y={40+i*18} width="44" height="13" fill="rgba(20,184,166,.05)" stroke="rgba(20,184,166,.22)" strokeWidth="1.2"/>
            <ellipse cx="72" cy={53+i*18} rx="22" ry="6" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.22)" strokeWidth="1.2"/>
          </g>
        ))}
        {[38,56,74].map((y,i)=><line key={i} x1="94" y1={y} x2="130" y2={y} stroke="rgba(20,184,166,.4)" strokeWidth="1.5" strokeDasharray="5 4" style={{animation:`pv-dash ${1.5+i*.2}s linear ${i*.3}s infinite`}}/>)}
        {[{y:30,label:"IMG",col:"#14b8a6"},{y:48,label:"TXT",col:"#2dd4bf"},{y:66,label:"AUD",col:"#22c55e"},{y:84,label:"VID",col:"#4ade80"}].map(({y,label,col})=>(
          <g key={label} style={{animation:`pv-float 4s ease-in-out ${y*.01}s infinite`}}>
            <rect x="138" y={y} width="38" height="15" rx="4" fill="rgba(255,255,255,.04)" stroke={`${col}55`} strokeWidth="1"/>
            <text x="157" y={y+10.5} textAnchor="middle" fill={col} fontSize="8" fontWeight="700" letterSpacing=".04em">{label}</text>
          </g>
        ))}
        <rect x="138" y="26" width="6" height="76" fill="rgba(20,184,166,.10)" style={{animation:"pv-scan 2.5s linear infinite"}}/>
        <rect x="186" y="40" width="64" height="38" rx="7" fill="rgba(20,184,166,.07)" stroke="rgba(20,184,166,.3)" strokeWidth="1.2"/>
        <text x="218" y="56" textAnchor="middle" fill="#2dd4bf" fontSize="7" fontWeight="700" letterSpacing=".07em">PIPELINE</text>
        {[62,72,80].map((y,i)=><rect key={i} x="193" y={y} width={[36,24,30][i]} height="3" rx="2" fill={`rgba(20,184,166,${[.25,.15,.20][i]})`}/>)}
        <circle cx="266" cy="65" r="8" fill="rgba(20,184,166,.15)" stroke="#14b8a6" strokeWidth="1.5" style={{animation:"pv-ping 2s ease-out infinite"}}/>
      </svg>
    </div>
  );
}

function VisualHumanAugmentation() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="90" ry="44" fill="rgba(20,184,166,.05)" style={{animation:"pv-pulse 5s ease-in-out infinite"}}/>
        <ellipse cx="160" cy="65" rx="66" ry="38" stroke="rgba(20,184,166,.15)" strokeWidth="1" strokeDasharray="6 4"/>
        <ellipse cx="160" cy="65" rx="66" ry="38" stroke="rgba(20,184,166,.6)" strokeWidth="2" fill="none" strokeDasharray="50 300" style={{animation:"pv-dash 3s linear infinite"}}/>
        <circle cx="94" cy="65" r="22" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.4)" strokeWidth="1.5"/>
        <circle cx="94" cy="58" r="6" fill="none" stroke="#2dd4bf" strokeWidth="1.5"/>
        <path d="M82,75 Q94,68 106,75" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <text x="94" y="87" textAnchor="middle" fill="#14b8a6" fontSize="6" fontWeight="700" letterSpacing=".07em">HUMAN</text>
        <circle cx="226" cy="65" r="22" fill="rgba(34,197,94,.06)" stroke="rgba(34,197,94,.38)" strokeWidth="1.5"/>
        <rect x="216" y="57" width="20" height="16" rx="3" fill="none" stroke="#4ade80" strokeWidth="1.4"/>
        {[60,66,71].map(y=><line key={y} x1="218" y1={y} x2="234" y2={y} stroke="rgba(34,197,94,.4)" strokeWidth="1"/>)}
        <text x="226" y="87" textAnchor="middle" fill="#22c55e" fontSize="6" fontWeight="700" letterSpacing=".07em">AI MODEL</text>
        <circle r="5" fill="#14b8a6" opacity=".9" style={{animation:"pv-orbit 3.5s linear infinite",transformOrigin:"160px 65px"}}/>
        <circle r="4" fill="#4ade80" opacity=".8" style={{animation:"pv-orbit2 2.8s linear infinite",transformOrigin:"160px 65px"}}/>
        <rect x="144" y="58" width="32" height="13" rx="4" fill="rgba(20,184,166,.1)" stroke="rgba(20,184,166,.3)" strokeWidth="1"/>
        <text x="160" y="68.5" textAnchor="middle" fill="#2dd4bf" fontSize="6.5" fontWeight="700">LOOP</text>
      </svg>
    </div>
  );
}

function VisualManagedOps() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="120" ry="42" fill="rgba(20,184,166,.04)" style={{animation:"pv-pulse 6s ease-in-out infinite"}}/>
        <rect x="52" y="18" width="216" height="96" rx="8" fill="rgba(255,255,255,.03)" stroke="rgba(20,184,166,.25)" strokeWidth="1.2"/>
        <rect x="52" y="18" width="216" height="17" rx="8" fill="rgba(20,184,166,.08)"/>
        {[67,79,91].map((x,i)=><circle key={i} cx={x} cy="26.5" r="3.5" fill={["rgba(239,68,68,.5)","rgba(234,179,8,.5)","rgba(34,197,94,.5)"][i]}/>)}
        <text x="172" y="30.5" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="6" fontWeight="600">OPS DASHBOARD</text>
        {[{label:"Annotation",val:88,y:50,col:"#14b8a6"},{label:"QA Layer",val:94,y:66,col:"#2dd4bf"},{label:"Delivery",val:76,y:82,col:"#22c55e"},{label:"Accuracy",val:98,y:98,col:"#4ade80"}].map(({label,val,y,col})=>(
          <g key={label}>
            <text x="62" y={y+3} fill="rgba(255,255,255,.45)" fontSize="6.5" fontWeight="600">{label}</text>
            <rect x="120" y={y-4} width="96" height="7" rx="3.5" fill="rgba(255,255,255,.06)"/>
            <rect x="120" y={y-4} width={val*.96} height="7" rx="3.5" fill={col} opacity=".75" style={{transformOrigin:"120px center",animation:"pv-grow .9s cubic-bezier(.22,1,.36,1) both"}}/>
            <text x="222" y={y+3} fill={col} fontSize="6" fontWeight="700">{val}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function VisualModelTesting() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="120" ry="38" fill="rgba(20,184,166,.04)" style={{animation:"pv-pulse 5s ease-in-out 1s infinite"}}/>
        {[38,65,92].map(y=><line key={y} x1="34" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="4 4"/>)}
        <line x1="34" y1="96" x2="280" y2="96" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        <polyline points="34,65 62,65 72,34 82,100 92,65 130,65 144,30 154,106 164,65 200,65 210,40 220,96 230,65 272,65" stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" strokeDasharray="500" style={{animation:"pv-dash 2.5s linear infinite"}}/>
        <polyline points="34,65 62,65 72,34 82,100 92,65 130,65 144,30 154,106 164,65 200,65 210,40 220,96 230,65 272,65" stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".07"/>
        {[{x:92,ok:true},{x:164,ok:true},{x:230,ok:false}].map(({x,ok})=>(
          <g key={x} style={{animation:`pv-float 3.5s ease-in-out ${x*.005}s infinite`}}>
            <circle cx={x} cy="65" r="9" fill={ok?"rgba(20,184,166,.15)":"rgba(239,68,68,.12)"} stroke={ok?"#14b8a6":"#ef4444"} strokeWidth="1.5"/>
            {ok?<polyline points={`${x-4},65 ${x-1},68 ${x+4},61`} stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" style={{animation:"pv-tick .6s ease both"}}/>:<><line x1={x-4} y1="61" x2={x+4} y2="69" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/><line x1={x+4} y1="61" x2={x-4} y2="69" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></>}
          </g>
        ))}
        <text x="92" y="52" textAnchor="middle" fill="#14b8a6" fontSize="6" fontWeight="700">PASS</text>
        <text x="164" y="52" textAnchor="middle" fill="#14b8a6" fontSize="6" fontWeight="700">PASS</text>
        <text x="230" y="52" textAnchor="middle" fill="#ef4444" fontSize="6" fontWeight="700">FIX</text>
        <rect x="274" y="58" width="2" height="14" rx="1" fill="#2dd4bf" style={{animation:"pv-blink 1s step-end infinite"}}/>
      </svg>
    </div>
  );
}

function VisualStrategy() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="110" ry="40" fill="rgba(20,184,166,.04)" style={{animation:"pv-pulse 5s ease-in-out infinite"}}/>
        <line x1="42" y1="65" x2="278" y2="65" stroke="rgba(20,184,166,.18)" strokeWidth="2" strokeDasharray="6 4"/>
        {[{x:62,label:"ASSESS",col:"#14b8a6"},{x:122,label:"DESIGN",col:"#2dd4bf"},{x:182,label:"BUILD",col:"#22c55e"},{x:242,label:"SCALE",col:"#4ade80"}].map(({x,label,col},i)=>(
          <g key={label} style={{animation:`pv-float ${3.5+i*.3}s ease-in-out ${i*.4}s infinite`}}>
            <circle cx={x} cy="65" r="14" fill={`${col}18`} stroke={col} strokeWidth="1.5"/>
            <text x={x} y="69" textAnchor="middle" fill={col} fontSize="7.5" fontWeight="800">{i+1}</text>
            <text x={x} y="90" textAnchor="middle" fill={col} fontSize="5.5" fontWeight="700" letterSpacing=".05em">{label}</text>
          </g>
        ))}
        <text x="160" y="30" textAnchor="middle" fill="rgba(20,184,166,.45)" fontSize="7" fontWeight="700" letterSpacing=".1em">AI STRATEGY ROADMAP</text>
      </svg>
    </div>
  );
}

function VisualMLOps() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="110" ry="40" fill="rgba(20,184,166,.04)" style={{animation:"pv-pulse 4s ease-in-out infinite"}}/>
        {[{x:52,label:"DEV",col:"#14b8a6"},{x:136,label:"STAGE",col:"#2dd4bf"},{x:220,label:"PROD",col:"#22c55e"}].map(({x,label,col})=>(
          <g key={label}>
            <rect x={x-26} y="48" width="52" height="34" rx="7" fill="rgba(255,255,255,.04)" stroke={col} strokeWidth="1.2" opacity=".75"/>
            <text x={x} y="70" textAnchor="middle" fill={col} fontSize="7.5" fontWeight="800">{label}</text>
          </g>
        ))}
        {[[78,136],[162,220]].map(([x1,x2],i)=>(
          <g key={i}>
            <line x1={x1} y1="65" x2={x2-26} y2="65" stroke="rgba(20,184,166,.5)" strokeWidth="1.5" strokeDasharray="5 3" style={{animation:`pv-dash 1.5s linear ${i*.3}s infinite`}}/>
            <path d={`M${x2-31},61 L${x2-26},65 L${x2-31},69`} stroke="rgba(20,184,166,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        ))}
        <text x="160" y="24" textAnchor="middle" fill="rgba(20,184,166,.45)" fontSize="7" fontWeight="700" letterSpacing=".1em">CI/CD · MONITOR · RETRAIN</text>
        {[{x:258,col:"#ff9500",label:"AWS"},{x:274,col:"#0080ff",label:"AZ"},{x:290,col:"#ea4335",label:"GCP"}].map(({x,col,label})=>(
          <g key={label}>
            <circle cx={x} cy="65" r="9" fill={`${col}18`} stroke={`${col}55`} strokeWidth="1"/>
            <text x={x} y="68.5" textAnchor="middle" fill={col} fontSize="5" fontWeight="800">{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function VisualSecurity() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",height:"100%"}}>
        <ellipse cx="160" cy="65" rx="100" ry="40" fill="rgba(20,184,166,.04)" style={{animation:"pv-pulse 5s ease-in-out infinite"}}/>
        <path d="M160,20 L192,35 L192,60 Q192,88 160,100 Q128,88 128,60 L128,35 Z" fill="rgba(20,184,166,.07)" stroke="rgba(20,184,166,.4)" strokeWidth="1.5"/>
        <path d="M160,29 L184,41 L184,60 Q184,82 160,92 Q136,82 136,60 L136,41 Z" fill="rgba(20,184,166,.04)" stroke="rgba(20,184,166,.2)" strokeWidth="1"/>
        <polyline points="150,60 158,68 170,53" stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" style={{animation:"pv-tick .8s ease both"}}/>
        {[{label:"SOC2",angle:-55,col:"#14b8a6"},{label:"GDPR",angle:0,col:"#2dd4bf"},{label:"HIPAA",angle:55,col:"#22c55e"}].map(({label,angle,col})=>{
          const rad=(angle*Math.PI)/180,cx=160+62*Math.cos(rad),cy=65+62*Math.sin(rad);
          return(<g key={label} style={{animation:`pv-float 4s ease-in-out ${angle*.02}s infinite`}}>
            <rect x={cx-16} y={cy-8} width="32" height="16" rx="5" fill="rgba(255,255,255,.04)" stroke={`${col}50`} strokeWidth="1"/>
            <text x={cx} y={cy+4} textAnchor="middle" fill={col} fontSize="6.5" fontWeight="800">{label}</text>
          </g>);
        })}
      </svg>
    </div>
  );
}

const pillarVisuals = [VisualAgentAI,VisualDataServices,VisualHumanAugmentation,VisualManagedOps,VisualModelTesting,VisualStrategy,VisualMLOps,VisualSecurity];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function AIEnablement() {
  useReveal();
  const barRef = useRef(null);
  useBarFillOnScroll(barRef);

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section">
        <div className="container">
          <div className="ha ha-1"><span className="kicker">AI Enablement</span></div>
          <h1 className="h1 ha ha-2" style={{marginTop:12,maxWidth:"16ch"}}>Powering the intelligence behind your AI.</h1>
          <p className="lead ha ha-3" style={{marginTop:12,maxWidth:"50ch"}}>End-to-end data and AI services built for accuracy, scale, and speed — from raw annotation to validated, deployed models.</p>
          <div className="ha ha-4" style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:20}}>
            <Link to="/contact" className="btn btn--primary">Start a project</Link>
            <Link to="/services" className="btn btn--ghost">View all services</Link>
          </div>
          <div className="stats-grid ha ha-5">
            {stats.map(([v,l])=>(
              <div key={l} className="card card-i" style={{padding:"clamp(10px,2.5vw,16px) 8px",borderRadius:11,textAlign:"center"}}>
                <div className="stat-num">{v}</div>
                <div className="lead" style={{fontSize:"clamp(9px,1.3vw,11px)",marginTop:4}}>{l}</div>
              </div>
            ))}
          </div>
          <div className="ai-hero-banner ha ha-6">
            <img className="ken-burns" src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=1400&auto=format&fit=crop&q=80" alt="AI neural network" loading="lazy"/>
            <div className="ai-hero-banner-overlay"/>
            <div className="ai-hero-banner-text">
              <h3>From raw data to production-ready models</h3>
              <p>Annotation · Validation · Agent AI · Managed Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="section section--alt">
        <div className="container two-col">
          <div ref={barRef} className="card rv" style={{padding:"clamp(16px,3.5vw,26px)"}}>
            <div className="accent-bar"/>
            <div className="kicker">How we work</div>
            <div style={{fontWeight:800,fontSize:"clamp(14px,1.8vw,17px)",marginTop:8,color:"var(--text)"}}>AI pipeline health</div>
            <p className="lead" style={{marginTop:6}}>Every engagement measured against outcomes that matter.</p>
            <div style={{marginTop:16,display:"grid",gap:11}}>
              {[["Data Quality",96],["Model Accuracy",94],["Delivery Speed",91],["Annotation Precision",98]].map(([l,v])=>(
                <div key={l} style={{display:"grid",gridTemplateColumns:"minmax(80px,110px) 1fr 34px",gap:8,alignItems:"center"}}>
                  <div style={{fontWeight:700,fontSize:"clamp(10px,1.3vw,12px)",color:"var(--text)"}}>{l}</div>
                  <div className="bar-track"><div className="bar-fill-js" data-target-width={`${v}%`}/></div>
                  <div style={{fontWeight:800,fontSize:"clamp(10px,1.3vw,12px)",color:"var(--muted-2)",textAlign:"right"}}>{v}%</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card rv" style={{padding:"clamp(16px,3.5vw,26px)"}}>
            <div className="accent-bar"/>
            <div className="kicker">What you get</div>
            <div style={{fontWeight:800,fontSize:"clamp(14px,1.8vw,17px)",marginTop:8,color:"var(--text)"}}>Built-in quality assurance</div>
            <div className="qa-grid">
              {[["High accuracy","Rigorous multi-layer QA at every stage."],["Full coverage","Image, text, audio, video & more."],["Clean handover","Structured, production-ready data."],["Confidentiality","NDA-ready with least-access ops."],["Fast onboarding","Rapid ramp from pilot to enterprise."],["Compliance-ready","GDPR, HIPAA & SOC2 aligned."]].map(([t,d])=>(
                <div key={t} className="card-i" style={{padding:"clamp(9px,1.8vw,13px)",borderRadius:9}}>
                  <div style={{fontWeight:800,fontSize:"clamp(10px,1.3vw,12px)",color:"var(--text)",marginBottom:3}}>{t}</div>
                  <div className="lead" style={{fontSize:"clamp(9px,1.2vw,11px)"}}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:12}}><Link to="/contact" className="btn btn--primary btn--full">Request a quick call</Link></div>
          </div>
        </div>
      </section>

      {/* ── 8 SERVICE PILLARS ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{marginBottom:22}}>
            <div className="accent-bar"/>
            <div className="kicker">Our services</div>
            <h2 className="h2" style={{marginTop:8}}>Complete AI enablement stack</h2>
            <p className="lead" style={{marginTop:8,maxWidth:"52ch"}}>Every capability your AI programme needs — from agent development and raw data to deployed, monitored models.</p>
          </div>
          <div className="ai-svc-bento rv-group">
            {services.map((s,idx)=>{
              const Visual=pillarVisuals[idx];
              return(
                <div key={s.title} className="ai-svc-cell rv">
                  <Visual/>
                  <div className="ai-svc-cell__body">
                    <div className="ai-svc-cell__head">
                      <div className="icon-badge">{s.icon}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div className="svc-num">{s.num}</div>
                        <div className="svc-title">{s.title}</div>
                      </div>
                      {s.tag&&<span className="svc-tag">{s.tag}</span>}
                    </div>
                    <p className="svc-desc">{s.desc}</p>
                    <ul style={{padding:0,listStyle:"none",display:"grid",gap:4,flex:1}}>
                      {s.bullets.map(b=>(
                        <li key={b} className="svc-bullet"><span className="svc-dot"/>{b}</li>
                      ))}
                    </ul>
                    <div className="ai-svc-cell__footer">
                      <Link className="btn" to="/contact" style={{fontSize:"clamp(10px,1.3vw,12px)",padding:"6px 12px"}}>Enquire</Link>
                      <Link className="btn btn--ghost" to="/about" style={{fontSize:"clamp(10px,1.3vw,12px)",padding:"6px 12px"}}>How we work</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AGENT AI CALLOUT ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{marginBottom:20}}>
            <div className="accent-bar"/>
            <div className="kicker">Agent AI</div>
            <h2 className="h2" style={{marginTop:8}}>AI that reasons, acts, and adapts</h2>
            <p className="lead" style={{marginTop:8,maxWidth:"54ch"}}>Our Agent AI goes beyond chatbots — systems that autonomously execute complex tasks, integrate with your tools, and continuously improve.</p>
          </div>
          <div className="two-col rv">
            <div>
              <div className="agent-grid">
                {["Customer support automation","Digital human simulations","Workflow automation & orchestration","Knowledge assistants","Enterprise operational copilots","Real-time behavior adaptation"].map(uc=>(
                  <div key={uc} className="agent-chip"><span className="agent-chip__dot"/>{uc}</div>
                ))}
              </div>
            </div>
            <div className="card" style={{padding:"clamp(14px,3vw,22px)",display:"grid",gap:12}}>
              {[{label:"Goal-driven reasoning",body:"Agents understand objectives and plan multi-step execution — not just respond to prompts."},{label:"Tool & API integration",body:"Natively connect with your existing systems, APIs, databases, and workflows."},{label:"Memory & personalization",body:"Agents retain context across sessions for experiences that feel natural and tailored."},{label:"Safety & guardrails",body:"Every agent aligned with defined personas and safety boundaries — responsible by design."}].map(({label,body})=>(
                <div key={label} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div className="icon-badge" style={{marginTop:1,flexShrink:0}}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:"clamp(11px,1.4vw,13px)",color:"var(--text)",marginBottom:3}}>{label}</div>
                    <p className="lead" style={{fontSize:"clamp(10px,1.2vw,12px)"}}>{body}</p>
                  </div>
                </div>
              ))}
              <Link to="/contact" className="btn btn--primary" style={{marginTop:4}}>Discuss your agent project</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{marginBottom:20}}>
            <div className="accent-bar"/>
            <div className="kicker">Industries served</div>
            <h2 className="h2" style={{marginTop:8}}>Built for your sector</h2>
            <p className="lead" style={{marginTop:8,maxWidth:"46ch"}}>Domain-specific expertise across industries where AI performance is mission-critical.</p>
          </div>
          <div className="industry-grid rv">
            {industries.map(ind=>(
              <div key={ind.label} className="industry-chip">
                <span className="industry-chip__emoji">{ind.icon}</span>
                <span className="industry-chip__label">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE / VISION / MISSION ── */}
      <section className="section section--alt">
        <div className="container two-col" style={{gap:"clamp(18px,5vw,52px)"}}>
          <div className="rv">
            <div className="accent-bar"/>
            <div className="kicker">Who we are</div>
            <h2 className="h2" style={{marginTop:8,lineHeight:1.15}}>More than a vendor.<br/>A strategic partner.</h2>
            <p className="lead" style={{marginTop:10,maxWidth:"36ch"}}>We embed ourselves in your AI roadmap — aligning every deliverable to real business outcomes.</p>
            <div style={{marginTop:18}}><Link to="/contact" className="btn btn--primary">Talk to us</Link></div>
            <div className="ai-partner-img">
              <img className="ken-burns" src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&auto=format&fit=crop&q=80" alt="Strategic partnership" loading="lazy"/>
            </div>
          </div>
          <div className="rv-group" style={{display:"grid",alignContent:"start"}}>
            {pillars.map((p,i)=>(
              <div key={p.label} className="rv" style={{padding:"clamp(14px,2.5vw,22px) 0",borderBottom:"1px solid var(--border)",borderTop:i===0?"1px solid var(--border)":"none",display:"grid",gridTemplateColumns:"26px 1fr",gap:12,alignItems:"start"}}>
                <div style={{fontWeight:800,fontSize:9,color:"var(--teal)",paddingTop:2,letterSpacing:"0.06em"}}>0{i+1}</div>
                <div>
                  <div style={{fontWeight:700,fontSize:"clamp(12px,1.5vw,14px)",color:"var(--text)",marginBottom:4}}>{p.label}</div>
                  <p className="lead" style={{fontSize:"clamp(11px,1.3vw,13px)"}}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{marginBottom:22}}>
            <div className="accent-bar"/>
            <div className="kicker">Why us</div>
            <h2 className="h2" style={{marginTop:8}}>Why organizations choose us</h2>
          </div>
          <div className="why-grid rv-group">
            {whyUs.map(w=>(
              <div key={w.title} className="why-card rv">
                <div style={{color:"var(--teal-2)",fontSize:16,fontWeight:800,marginBottom:8,lineHeight:1}}>→</div>
                <div className="why-card__title">{w.title}</div>
                <p className="why-card__body">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Ready to enable smarter AI?</h2>
              <p className="cta-band__sub">Tell us about your project and we'll scope a solution within 48 hours.</p>
            </div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              <Link className="btn cta-band__btn" to="/contact">Get in touch</Link>
              <Link className="btn" to="/services" style={{background:"rgba(255,255,255,.15)",color:"#fff",border:"1px solid rgba(255,255,255,.3)"}}>All services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}