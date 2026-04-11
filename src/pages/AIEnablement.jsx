import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useEffect, useRef, useState } from "react";


// ── DATA ─────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v5c0 1.66 4 3 9 3s9-1.34 9-3V5" /><path d="M3 10v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" /></svg>),
    title: "Data Services",
    desc: "End-to-end data services designed to power high-performance AI systems.",
    bullets: ["Data annotation & labeling", "Image, text, speech & video", "Segmentation & curation", "Scalable data pipelines"],
  },
  {
    num: "02",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>),
    title: "Human Augmentation",
    desc: "Human-in-the-Loop validation that keeps your models accurate and reliable.",
    bullets: ["Continuous human feedback", "Model accuracy improvement", "Clean training data", "GIGO prevention"],
  },
  {
    num: "03",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" /></svg>),
    title: "Managed Services",
    desc: "Fully managed data operations so your teams can focus on core innovation.",
    bullets: ["Large-scale annotation ops", "Multi-layer quality checks", "Bias-free datasets", "Production-ready delivery"],
  },
  {
    num: "04",
    icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
    title: "Model Testing & Validation",
    desc: "Industry-specific testing to ensure your AI performs in the real world.",
    bullets: ["Real-time workflow testing", "Performance optimisation", "Bug detection", "Production standards audit"],
  },
];

const pillars = [
  { label: "Our Value", body: "We act as strategic partners, delivering data-driven solutions that address complex challenges in AI, data, and security — helping your business stay competitive and future-ready." },
  { label: "Our Vision", body: "To build a strong ecosystem of advanced technologies, industry expertise, and delivery excellence, supported by world-class professionals." },
  { label: "Our Mission", body: "To drive innovation through intelligent solutions, accelerate digital transformation, and deliver secure, scalable systems that empower businesses." },
];

const stats = [["98%", "Annotation accuracy"], ["10×", "Faster pipeline delivery"], ["50+", "Enterprise clients"], ["24/7", "Managed operations"]];
const clientLogos = ["OpenAI", "Anthropic", "Google DeepMind", "Hugging Face", "Scale AI", "Cohere", "Mistral", "Stability AI"];
const fomoLeads = ["An AI lab just kicked off a data project.", "A computer vision team started a call.", "An NLP startup requested annotation support.", "A healthcare AI firm just got in touch."];

// ── STYLES ────────────────────────────────────────────────────────────────────

const pageStyles = `
  /* ── SHARED: ROOT THEME ── */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  :root {
    --bg:#07100e; --bg-2:#0c1a16;
    --surface:rgba(255,255,255,0.04); --surface-2:rgba(255,255,255,0.07); --surface-3:rgba(255,255,255,0.10);
    --text:#dff0e8; --muted:#7a9e8e; --muted-2:#4a6a5a;
    --border:rgba(255,255,255,0.07); --border-2:rgba(255,255,255,0.12);
    --teal:#14b8a6; --teal-2:#2dd4bf; --teal-d:#0d9488; --teal-glow:rgba(20,184,166,0.20);
    --accent:#22c55e; --accent-2:#4ade80; --accent-d:#16a34a; --accent-glow:rgba(34,197,94,0.18);
    --navy:#020c09;
    --grad-brand:linear-gradient(135deg,var(--teal),var(--accent));
    --grad-brand-soft:linear-gradient(135deg,rgba(20,184,166,0.15),rgba(34,197,94,0.10));
    --grad-text:linear-gradient(135deg,var(--teal-2) 0%,var(--accent-2) 100%);
    --shadow:0 24px 80px rgba(0,0,0,0.55); --shadow-soft:0 8px 32px rgba(0,0,0,0.30);
    --shadow-brand:0 12px 40px rgba(20,184,166,0.30); --shadow-brand-lg:0 20px 60px rgba(20,184,166,0.40);
    --radius:20px; --radius-sm:14px; --radius-xs:10px; --radius-pill:999px;
    --container:min(1600px,92vw); --pad:10px;
    --font-display:'Inter',system-ui,sans-serif; --font-body:'Inter',system-ui,sans-serif;
    --ease:cubic-bezier(0.22,1,0.36,1); --dur:0.25s; --dur-slow:0.45s;
  }

  /* ── SHARED: BASE ── */
  *,*::before,*::after{box-sizing:border-box}
  html{height:100%;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
  body{margin:0;font-family:var(--font-body);font-size:16px;font-weight:400;line-height:1.6;color:var(--text);background:var(--bg);overflow-x:hidden;min-height:100%}
  body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%),radial-gradient(ellipse 600px 400px at 50% 90%,rgba(20,184,166,0.06),transparent 70%);pointer-events:none;z-index:0}
  body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:0.5}
  a{color:inherit;text-decoration:none} button{font:inherit;cursor:pointer} img,svg{display:block;max-width:100%}

  /* ── SHARED: LAYOUT ── */
  .app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}
  .main{flex:1;padding-top:80px}
  .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 var(--pad)}
  .section{padding:100px 0;position:relative}
  .section--alt{background:rgba(255,255,255,0.015)}

  /* ── SHARED: TYPOGRAPHY ── */
  .h1{font-family:var(--font-display);font-weight:800;font-size:clamp(40px,5.5vw,72px);line-height:1.02;letter-spacing:-0.04em;margin:0}
  .h2{font-family:var(--font-display);font-weight:800;font-size:clamp(30px,3.5vw,48px);line-height:1.08;letter-spacing:-0.03em;margin:0}
  .h3{font-family:var(--font-display);font-weight:700;font-size:clamp(20px,2vw,26px);line-height:1.2;letter-spacing:-0.02em;margin:0}
  .text-grad{background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .lead{font-size:18px;font-weight:300;color:var(--muted);line-height:1.75}
  .kicker{display:inline-flex;align-items:center;gap:10px;padding:5px 14px 5px 10px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--text-primary);background:transparent;border:1px solid rgba(0,0,0,0.15);clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)}
  .kicker::before{content:'';display:block;width:6px;height:6px;background:#1D9E75;clip-path:polygon(50% 0%,100% 100%,0% 100%);flex-shrink:0}

  /* ── SHARED: BUTTONS ── */
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 22px;border-radius:var(--radius-pill);border:1px solid var(--border-2);background:var(--surface-2);color:var(--text);font-family:var(--font-body);font-size:14px;font-weight:500;cursor:pointer;transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease),background var(--dur) var(--ease)}
  .btn:hover{transform:translateY(-2px);box-shadow:var(--shadow-soft)}
  .btn--primary{display:inline-flex;align-items:center;gap:8px;padding:10px 22px;font-size:13px;font-weight:600;cursor:pointer;border:none;white-space:nowrap;transition:all 0.15s ease;background:#085041;color:#9FE1CB;border-radius:5px;border:1.5px solid #085041;box-shadow:4px 4px 0 #1D9E75}
  .btn--primary:hover{box-shadow:2px 2px 0 #1D9E75;transform:translate(2px,2px)}
  .btn--primary:active{box-shadow:none;transform:translate(4px,4px)}
  .btn--ghost{background:transparent;border-color:rgba(20,184,166,0.22);color:var(--teal-2)}
  .btn--ghost:hover{background:rgba(20,184,166,0.08);border-color:rgba(20,184,166,0.40)}
  .btn--sm{padding:8px 16px;font-size:13px} .btn--lg{padding:15px 30px;font-size:16px} .btn--full{width:100%}

  /* ── SHARED: CARDS ── */
  .card{position:relative;border-radius:var(--radius);border:1px solid var(--border);background:rgba(255,255,255,0.03);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:var(--shadow-soft);transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease),border-color var(--dur) var(--ease)}
  .card:hover{transform:translateY(-5px);box-shadow:var(--shadow);border-color:rgba(20,184,166,0.18)}
  .card::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,0.28) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity var(--dur-slow) var(--ease);pointer-events:none}
  .card:hover::before{opacity:1}
  .card__p{padding:24px} .card-i{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-sm)}

  /* ── SHARED: GRID ── */
  .grid{display:grid;gap:20px}
  .grid-2{grid-template-columns:repeat(2,1fr)}
  .grid-3{grid-template-columns:repeat(3,1fr)}
  .grid-4{grid-template-columns:repeat(4,1fr)}

  /* ── SHARED: NAVBAR ── */
  .nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(7,16,14,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);transition:background var(--dur)}
  .nav.scrolled{background:rgba(7,16,14,0.90)}
  .nav__inner{display:flex;align-items:center;justify-content:space-between;height:80px;max-width:var(--container);margin:0 auto;padding:0 var(--pad)}
  .brand{display:flex;align-items:center;gap:10px;font-family:var(--font-display);font-weight:800;font-size:19px;letter-spacing:-0.03em}
  .brand__mark{width:36px;height:36px;border-radius:11px;display:flex;align-items:center;justify-content:center;background:var(--grad-brand);box-shadow:var(--shadow-brand);transition:box-shadow var(--dur) var(--ease),transform var(--dur) var(--ease)}
  .brand:hover .brand__mark{transform:rotate(-6deg) scale(1.05);box-shadow:var(--shadow-brand-lg)}
  .nav__links{display:flex;align-items:center;gap:2px}
  .navlink{padding:9px 15px;border-radius:var(--radius-pill);font-size:14px;font-weight:500;color:var(--muted);transition:background var(--dur),color var(--dur)}
  .navlink:hover,.navlink.active{background:rgba(20,184,166,0.12);color:var(--teal-2)}

  /* ── SHARED: INPUTS ── */
  .input{width:100%;padding:12px 16px;border-radius:var(--radius-sm);border:1px solid var(--border);background:rgba(255,255,255,0.05);color:var(--text);font-family:var(--font-body);font-size:15px;outline:none;transition:border-color var(--dur),box-shadow var(--dur)}
  .input::placeholder{color:var(--muted-2)} .input:hover{border-color:var(--border-2)}
  .input:focus{border-color:var(--teal);box-shadow:0 0 0 4px rgba(20,184,166,0.18)}

  /* ── SHARED: UTILITIES ── */
  .divider{height:1px;background:linear-gradient(90deg,transparent,var(--border-2),transparent);border:none;margin:0}
  .accent-bar{width:32px;height:3px;border-radius:2px;background:var(--grad-brand);margin-bottom:14px}
  .stat-num{font-family:var(--font-display);font-size:clamp(28px,4vw,48px);font-weight:800;letter-spacing:-0.04em;background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
  .bar-track{height:6px;border-radius:999px;background:rgba(13,148,136,0.15);overflow:hidden}
  .bar-fill-js{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--teal,#0d9488),var(--teal-2,#14b8a6));width:0;transition:width .9s cubic-bezier(.22,1,.36,1)}
  .icon-badge{width:36px;height:36px;border-radius:10px;background:rgba(20,184,166,0.10);border:1px solid rgba(20,184,166,0.18);display:flex;align-items:center;justify-content:center;color:var(--teal-2);flex-shrink:0}
  .cta-band{background:var(--grad-brand);border-radius:var(--radius);padding:48px 40px;display:flex;align-items:center;justify-content:space-between;gap:32px;flex-wrap:wrap}
  .cta-band__title{font-family:var(--font-display);font-size:clamp(22px,3vw,32px);font-weight:800;letter-spacing:-0.03em;color:#fff;margin:0 0 8px}
  .cta-band__sub{font-size:15px;color:rgba(255,255,255,0.80);margin:0}
  .cta-band__btn{background:#fff;color:var(--teal-d);border:none;font-weight:700}
  .cta-band__btn:hover{background:rgba(255,255,255,0.90);box-shadow:0 8px 24px rgba(0,0,0,0.15)}

  /* ── SHARED: FOOTER ── */
  .footer{background:var(--navy);border-top:1px solid var(--border);padding:64px 0 36px;position:relative;z-index:1}
  .footer__grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:40px;margin-bottom:48px}
  .footer__about{font-size:14px;color:var(--muted);line-height:1.75;font-weight:300;margin-top:14px;max-width:260px}
  .footer__col-title{font-family:var(--font-display);font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted-2);margin-bottom:16px}
  .footer__links{list-style:none;display:flex;flex-direction:column;gap:10px}
  .footer__link{font-size:14px;color:var(--muted);transition:color var(--dur)}
  .footer__link:hover{color:var(--teal-2)}
  .footer__bottom{border-top:1px solid var(--border);padding-top:28px;display:flex;align-items:center;justify-content:space-between}
  .footer__copy{font-size:13px;color:var(--muted-2)}

  /* ── SHARED: RESPONSIVE ── */
  @media(max-width:1024px){.grid-4{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:900px){
    :root{--pad:24px}
    .grid-2,.grid-3{grid-template-columns:1fr}
    .nav__links{display:none}
    .main{padding-top:72px}
    .section{padding:72px 0}
    .footer__grid{grid-template-columns:1fr 1fr}
    .cta-band{padding:32px 24px;flex-direction:column;align-items:flex-start}
  }
  @media(max-width:560px){
    :root{--pad:18px}
    .grid-4{grid-template-columns:1fr}
    .footer__grid{grid-template-columns:1fr}
    .h1{letter-spacing:-0.03em}
  }

  /* ── PAGE-SPECIFIC ── */
  @keyframes kenBurns{from{transform:scale(1) translateX(0)}to{transform:scale(1.06) translateX(-10px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate;will-change:transform}

  @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .marquee-track{display:flex;gap:48px;width:max-content;animation:marquee 22s linear infinite}
  .marquee-track:hover{animation-play-state:paused}
  .marquee-wrap{overflow:hidden;mask-image:linear-gradient(to right,transparent 0%,black 12%,black 88%,transparent 100%);-webkit-mask-image:linear-gradient(to right,transparent 0%,black 12%,black 88%,transparent 100%)}

  @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes toastOut{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(-12px) scale(.96)}}
  .fomo-toast{position:fixed;bottom:24px;left:24px;z-index:999;background:rgba(255,255,255,.96);border:.5px solid rgba(0,0,0,.10);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 4px 18px rgba(0,0,0,.10);pointer-events:none;max-width:260px}
  .fomo-toast.entering{animation:toastIn .4s cubic-bezier(.34,1.56,.64,1) forwards}
  .fomo-toast.exiting{animation:toastOut .3s ease-in forwards}
  .fomo-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0;box-shadow:0 0 0 3px rgba(16,185,129,.2)}

  .ai-hero-banner{position:relative;border-radius:20px;overflow:hidden;margin-top:40px;aspect-ratio:21/7;box-shadow:0 16px 48px rgba(0,0,0,.16)}
  .ai-hero-banner img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.7) brightness(.8)}
  .ai-hero-banner-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,148,136,.45) 0%,rgba(0,0,0,.2) 100%);pointer-events:none}
  .ai-hero-banner-text{position:absolute;left:28px;bottom:22px;color:#fff}
  .ai-hero-banner-text h3{font-size:18px;font-weight:800;margin:0 0 4px;text-shadow:0 2px 8px rgba(0,0,0,.3)}
  .ai-hero-banner-text p{font-size:13px;margin:0;opacity:.85}

  .ai-partner-img{border-radius:16px;overflow:hidden;aspect-ratio:4/3;margin-top:24px;box-shadow:0 8px 32px rgba(0,0,0,.12)}
  .ai-partner-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.85);transition:transform .6s ease}
  .ai-partner-img:hover img{transform:scale(1.03)}

  .ai-svc-bento{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:auto;gap:12px}
  .ai-svc-cell{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;position:relative;transition:border-color .25s ease,background .25s ease}
  .ai-svc-cell:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06)}
  .ai-svc-cell::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,.22) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .45s ease;pointer-events:none}
  .ai-svc-cell:hover::before{opacity:1}
  .ai-svc-cell:hover lottie-player{transform:scale(1.08)}
  .ai-svc-cell__body{padding:20px;display:flex;flex-direction:column;flex:1}
  .ai-svc-cell__head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .ai-svc-cell__footer{display:flex;gap:10px;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07)}

  /* ── PILLAR SVG VISUALS ── */
  .pillar-visual { width:100%; height:200px; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); display:flex; align-items:center; justify-content:center; position:relative; }
  .pillar-visual svg { overflow:visible; }

  @keyframes pv-float   { 0%,100%{transform:translateY(0)}   50%{transform:translateY(-6px)} }
  @keyframes pv-pulse   { 0%,100%{opacity:.18} 50%{opacity:.35} }
  @keyframes pv-scan    { from{transform:translateX(-100%)} to{transform:translateX(400%)} }
  @keyframes pv-dash    { from{stroke-dashoffset:300} to{stroke-dashoffset:0} }
  @keyframes pv-blink   { 0%,100%{opacity:1} 50%{opacity:.3} }
  @keyframes pv-grow    { from{transform:scaleY(0)} to{transform:scaleY(1)} }
  @keyframes pv-orbit   { from{transform:rotate(0deg) translateX(52px) rotate(0deg)} to{transform:rotate(360deg) translateX(52px) rotate(-360deg)} }
  @keyframes pv-orbit2  { from{transform:rotate(180deg) translateX(32px) rotate(-180deg)} to{transform:rotate(540deg) translateX(32px) rotate(-540deg)} }
  @keyframes pv-flow    { 0%{stroke-dashoffset:80} 100%{stroke-dashoffset:0} }
  @keyframes pv-ping    { 0%{r:4;opacity:.8} 100%{r:14;opacity:0} }
  @keyframes pv-wave    { 0%,100%{d:path("M0,20 Q30,10 60,20 Q90,30 120,20")} 50%{d:path("M0,20 Q30,30 60,20 Q90,10 120,20")} }
  @keyframes pv-tick    { 0%{stroke-dashoffset:40} 100%{stroke-dashoffset:0} }

  @media(max-width:768px){.ai-svc-bento{grid-template-columns:1fr}}
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

function useBarFillOnScroll(ref) {
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { ref.current.querySelectorAll(".bar-fill-js").forEach((b) => { b.style.width = b.dataset.targetWidth; }); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref]);
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

// ── PILLAR SVG VISUALS ────────────────────────────────────────────────────────

// 01 Data Services — animated data pipeline with flowing rows of labeled data points
function VisualDataServices() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 320, height: 160 }}>
        {/* glow */}
        <ellipse cx="160" cy="80" rx="110" ry="55" fill="rgba(20,184,166,.06)" style={{ animation: "pv-pulse 4s ease-in-out infinite" }} />
        {/* database stack */}
        {[0,1,2].map(i => (
          <g key={i} style={{ animation: `pv-float ${3+i*0.4}s ease-in-out ${i*0.3}s infinite` }}>
            <ellipse cx="72" cy={56+i*22} rx="28" ry="8" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.35)" strokeWidth="1.2"/>
            <rect x="44" y={56+i*22} width="56" height="16" fill="rgba(20,184,166,.05)" stroke="rgba(20,184,166,.25)" strokeWidth="1.2"/>
            <ellipse cx="72" cy={72+i*22} rx="28" ry="8" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.25)" strokeWidth="1.2"/>
          </g>
        ))}
        {/* flow lines */}
        {[52, 72, 92].map((y, i) => (
          <line key={i} x1="100" y1={y} x2="140" y2={y} stroke="rgba(20,184,166,.4)" strokeWidth="1.5" strokeDasharray="6 4"
            style={{ animation: `pv-dash ${1.5+i*0.2}s linear ${i*0.3}s infinite` }} />
        ))}
        {/* label chips in the centre */}
        {[
          { y: 46, label: "IMG", col: "#14b8a6" },
          { y: 68, label: "TXT", col: "#2dd4bf" },
          { y: 90, label: "AUD", col: "#22c55e" },
          { y: 112, label: "VID", col: "#4ade80" },
        ].map(({ y, label, col }) => (
          <g key={label} style={{ animation: `pv-float 4s ease-in-out ${y*0.01}s infinite` }}>
            <rect x="148" y={y} width="44" height="18" rx="5" fill="rgba(255,255,255,.04)" stroke={`${col}55`} strokeWidth="1"/>
            <text x="170" y={y+13} textAnchor="middle" fill={col} fontSize="9" fontWeight="700" letterSpacing=".05em">{label}</text>
          </g>
        ))}
        {/* scan line */}
        <rect x="148" y="40" width="8" height="96" fill="rgba(20,184,166,.12)" style={{ animation: "pv-scan 2.5s linear infinite" }}/>
        {/* output pipeline */}
        <rect x="200" y="58" width="72" height="44" rx="8" fill="rgba(20,184,166,.07)" stroke="rgba(20,184,166,.3)" strokeWidth="1.2"/>
        <text x="236" y="76" textAnchor="middle" fill="#2dd4bf" fontSize="8" fontWeight="700" letterSpacing=".08em">PIPELINE</text>
        {[66,80,94].map((y,i) => (
          <rect key={i} x="208" y={y} width={[40,28,36][i]} height="3" rx="2" fill={`rgba(20,184,166,${[.25,.15,.20][i]})`}/>
        ))}
        {/* right arrow */}
        <path d="M276,80 L296,80 M289,73 L296,80 L289,87" stroke="rgba(20,184,166,.5)" strokeWidth="1.5" strokeLinecap="round"/>
        {/* output dot */}
        <circle cx="304" cy="80" r="5" fill="rgba(20,184,166,.2)" stroke="#14b8a6" strokeWidth="1.5"/>
        <circle cx="304" cy="80" r="9" fill="none" stroke="rgba(20,184,166,.15)" strokeWidth="1"
          style={{ animation: "pv-ping 2s ease-out infinite" }}/>
      </svg>
    </div>
  );
}

// 02 Human Augmentation — human↔AI feedback loop orbit
function VisualHumanAugmentation() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 320, height: 160 }}>
        <ellipse cx="160" cy="80" rx="90" ry="55" fill="rgba(20,184,166,.05)" style={{ animation: "pv-pulse 5s ease-in-out infinite" }}/>
        {/* orbit path */}
        <ellipse cx="160" cy="80" rx="70" ry="42" stroke="rgba(20,184,166,.15)" strokeWidth="1" strokeDasharray="6 4"/>
        <ellipse cx="160" cy="80" rx="70" ry="42" stroke="rgba(20,184,166,.6)" strokeWidth="2" fill="none"
          strokeDasharray="50 300" style={{ animation: "pv-dash 3s linear infinite" }}/>
        {/* human node */}
        <circle cx="90" cy="80" r="26" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.4)" strokeWidth="1.5"/>
        {/* person icon */}
        <circle cx="90" cy="72" r="7" fill="none" stroke="#2dd4bf" strokeWidth="1.5"/>
        <path d="M76,92 Q90,84 104,92" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <text x="90" y="104" textAnchor="middle" fill="#14b8a6" fontSize="7" fontWeight="700" letterSpacing=".08em">HUMAN</text>
        {/* AI node */}
        <circle cx="230" cy="80" r="26" fill="rgba(34,197,94,.06)" stroke="rgba(34,197,94,.38)" strokeWidth="1.5"/>
        {/* chip/brain icon */}
        <rect x="220" y="70" width="20" height="20" rx="3" fill="none" stroke="#4ade80" strokeWidth="1.4"/>
        {[73,78,83].map(y => <line key={y} x1="222" y1={y} x2="238" y2={y} stroke="rgba(34,197,94,.4)" strokeWidth="1"/>)}
        <text x="230" y="104" textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="700" letterSpacing=".08em">AI MODEL</text>
        {/* orbiting feedback dot */}
        <circle r="5" fill="#14b8a6" opacity=".9" style={{ animation: "pv-orbit 3.5s linear infinite", transformOrigin: "160px 80px" }}/>
        <circle r="4" fill="#4ade80" opacity=".8" style={{ animation: "pv-orbit2 2.8s linear infinite", transformOrigin: "160px 80px" }}/>
        {/* centre label */}
        <rect x="143" y="72" width="34" height="16" rx="4" fill="rgba(20,184,166,.1)" stroke="rgba(20,184,166,.3)" strokeWidth="1"/>
        <text x="160" y="84" textAnchor="middle" fill="#2dd4bf" fontSize="7.5" fontWeight="700">LOOP</text>
      </svg>
    </div>
  );
}

// 03 Managed Services — ops dashboard with progress bars & quality layers
function VisualManagedServices() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 320, height: 160 }}>
        <ellipse cx="160" cy="80" rx="120" ry="52" fill="rgba(20,184,166,.04)" style={{ animation: "pv-pulse 6s ease-in-out infinite" }}/>
        {/* monitor frame */}
        <rect x="60" y="30" width="200" height="110" rx="8" fill="rgba(255,255,255,.03)" stroke="rgba(20,184,166,.25)" strokeWidth="1.2"/>
        <rect x="60" y="30" width="200" height="20" rx="8" fill="rgba(20,184,166,.08)"/>
        {/* traffic lights */}
        {[76,88,100].map((x,i) => (
          <circle key={i} cx={x} cy="40" r="4" fill={["rgba(239,68,68,.5)","rgba(234,179,8,.5)","rgba(34,197,94,.5)"][i]}/>
        ))}
        <text x="180" y="44" textAnchor="middle" fill="rgba(255,255,255,.3)" fontSize="7" fontWeight="600">OPS DASHBOARD</text>
        {/* progress bars */}
        {[
          { label: "Annotation", val: 88, y: 70, col: "#14b8a6" },
          { label: "QA Layer",   val: 94, y: 90, col: "#2dd4bf" },
          { label: "Delivery",   val: 76, y: 110, col: "#22c55e" },
          { label: "Accuracy",   val: 96, y: 130, col: "#4ade80" },
        ].map(({ label, val, y, col }) => (
          <g key={label}>
            <text x="72" y={y+4} fill="rgba(255,255,255,.45)" fontSize="7.5" fontWeight="600">{label}</text>
            <rect x="130" y={y-4} width="100" height="8" rx="4" fill="rgba(255,255,255,.06)"/>
            <rect x="130" y={y-4} width={val} height="8" rx="4" fill={col} opacity=".7"
              style={{ transformOrigin: "130px center", animation: `pv-grow .8s cubic-bezier(.22,1,.36,1) both` }}/>
            <text x="236" y={y+4} fill={col} fontSize="7" fontWeight="700">{val}%</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// 04 Model Testing & Validation — signal waveform with pass/fail checkpoints
function VisualModelTesting() {
  return (
    <div className="pillar-visual">
      <svg viewBox="0 0 320 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 320, height: 160 }}>
        <ellipse cx="160" cy="80" rx="120" ry="46" fill="rgba(20,184,166,.04)" style={{ animation: "pv-pulse 5s ease-in-out 1s infinite" }}/>
        {/* grid lines */}
        {[50,80,110].map(y => (
          <line key={y} x1="40" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1" strokeDasharray="4 4"/>
        ))}
        {/* axis */}
        <line x1="40" y1="115" x2="280" y2="115" stroke="rgba(255,255,255,.1)" strokeWidth="1"/>
        {/* ECG/signal waveform */}
        <polyline
          points="40,80 70,80 80,45 90,120 100,80 140,80 155,40 165,125 175,80 210,80 220,50 230,115 240,80 280,80"
          stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
          strokeDasharray="500" style={{ animation: "pv-dash 2.5s linear infinite" }}/>
        {/* glow beneath */}
        <polyline
          points="40,80 70,80 80,45 90,120 100,80 140,80 155,40 165,125 175,80 210,80 220,50 230,115 240,80 280,80"
          stroke="#14b8a6" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".07"/>
        {/* checkpoint markers */}
        {[
          { x: 100, passed: true },
          { x: 175, passed: true },
          { x: 240, passed: false },
        ].map(({ x, passed }) => (
          <g key={x} style={{ animation: `pv-float 3.5s ease-in-out ${x*0.005}s infinite` }}>
            <circle cx={x} cy="80" r="10" fill={passed ? "rgba(20,184,166,.15)" : "rgba(239,68,68,.12)"} stroke={passed ? "#14b8a6" : "#ef4444"} strokeWidth="1.5"/>
            {passed
              ? <polyline points={`${x-4},80 ${x-1},83 ${x+5},76`} stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="40" style={{ animation: "pv-tick .6s ease both" }}/>
              : <><line x1={x-4} y1="76" x2={x+4} y2="84" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1={x+4} y1="76" x2={x-4} y2="84" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/></>
            }
          </g>
        ))}
        {/* PASS / FAIL labels */}
        <text x="100" y="67" textAnchor="middle" fill="#14b8a6" fontSize="7" fontWeight="700">PASS</text>
        <text x="175" y="67" textAnchor="middle" fill="#14b8a6" fontSize="7" fontWeight="700">PASS</text>
        <text x="240" y="67" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="700">FIX</text>
        {/* blinking cursor at end */}
        <rect x="282" y="72" width="2" height="16" rx="1" fill="#2dd4bf" style={{ animation: "pv-blink 1s step-end infinite" }}/>
      </svg>
    </div>
  );
}

const pillarVisuals = [VisualDataServices, VisualHumanAugmentation, VisualManagedServices, VisualModelTesting];



// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function AIEnablement() {
  useReveal();
  const barRef = useRef(null);
  useBarFillOnScroll(barRef);
  const toast = useFomoToast();

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {toast && (
        <div className={`fomo-toast ${toast.phase}`}>
          <div className="fomo-dot" />
          <span style={{ fontSize: 12, color: "#1a1a1a", lineHeight: 1.4 }}>{toast.text}</span>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="section">
        <div className="container">
          <div className="ha ha-1"><span className="kicker">AI Enablement</span></div>
          <h1 className="h1 ha ha-2" style={{ fontSize: "clamp(2.2rem,4.5vw,3.4rem)", lineHeight: 1.1, marginTop: 10, maxWidth: "20ch" }}>Powering the intelligence behind your AI.</h1>
          <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "58ch" }}>End-to-end data and AI services built for accuracy, scale, and speed — from raw annotation to validated models.</p>
          <div className="ha ha-4" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <Link to="/contact" className="btn btn--primary">Start a project</Link>
            <Link to="/services" className="btn btn--ghost">View all services</Link>
          </div>
          <div className="ha ha-5" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 40 }}>
            {stats.map(([v, l]) => (
              <div key={l} className="card card-i" style={{ padding: "20px 14px", borderRadius: 14, textAlign: "center" }}>
                <div className="stat-num">{v}</div>
                <div className="lead" style={{ fontSize: 12, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="ai-hero-banner ha ha-6">
            <img className="ken-burns" src="https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=1400&auto=format&fit=crop&q=80" alt="AI neural network visualization" loading="lazy" />
            <div className="ai-hero-banner-overlay" />
            <div className="ai-hero-banner-text">
              <h3>From raw data to production-ready models</h3>
              <p>Annotation · Validation · Managed Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW 2-col ── */}
      <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: "start", gap: 24 }}>
          <div ref={barRef} className="card card__p rv">
            <div className="accent-bar" />
            <div className="kicker">How we work</div>
            <div className="h2" style={{ fontSize: 18, marginTop: 6 }}>AI pipeline health</div>
            <p className="lead" style={{ marginTop: 8, fontSize: 14 }}>Every engagement is measured against the outcomes that matter.</p>
            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              {[["Data Quality", 96], ["Model Accuracy", 94], ["Delivery Speed", 91]].map(([l, v]) => (
                <div key={l} style={{ display: "grid", gridTemplateColumns: "120px 1fr 42px", gap: 12, alignItems: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{l}</div>
                  <div className="bar-track"><div className="bar-fill-js" data-target-width={`${v}%`} /></div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "var(--muted-2)", textAlign: "right" }}>{v}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card__p rv">
            <div className="accent-bar" />
            <div className="kicker">What you get</div>
            <div className="h2" style={{ fontSize: 18, marginTop: 6 }}>Built-in quality assurance</div>
            <div className="grid grid-2" style={{ marginTop: 16, gap: 10 }}>
              {[["High accuracy", "Rigorous QA at every stage."], ["Full coverage", "Image, text, audio & video."], ["Clean handover", "Structured, production-ready data."], ["Confidentiality", "NDA-ready with least-access ops."]].map(([t, d]) => (
                <div key={t} className="card card-i" style={{ padding: 14, borderRadius: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)", marginBottom: 5 }}>{t}</div>
                  <div className="lead" style={{ fontSize: 12 }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}><Link to="/contact" className="btn btn--primary btn--full">Request a quick call</Link></div>
          </div>
        </div>
      </section>

      {/* ── 4 SERVICE PILLARS ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: 28 }}>
            <div className="accent-bar" />
            <div className="kicker">Our services</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8 }}>Four pillars of AI enablement</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "58ch" }}>A complete stack — from raw data to validated models.</p>
          </div>

          <div className="marquee-wrap rv" style={{ marginBottom: 24, padding: "8px 0" }}>
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted,#64748b)", whiteSpace: "nowrap", userSelect: "none" }}>{name}</span>
              ))}
            </div>
          </div>

          <div className="ai-svc-bento rv-group">
            {services.map((s, idx) => {
              const Visual = pillarVisuals[idx];
              return (
              <div key={s.title} className="ai-svc-cell rv">
                <Visual />

                <div className="ai-svc-cell__body">
                  <div className="ai-svc-cell__head">
                    <div className="icon-badge">{s.icon}</div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--teal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                        {s.num}
                      </div>
                      <div className="h2" style={{ fontSize: 17, lineHeight: 1.2 }}>
                        {s.title}
                      </div>
                    </div>
                  </div>

                  <p className="lead" style={{ fontSize: 13, marginBottom: 14 }}>
                    {s.desc}
                  </p>

                  <ul style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: 6, flex: 1 }}>
                    {s.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="ai-svc-cell__footer">
                    <Link className="btn" to="/contact" style={{ fontSize: 13, padding: "8px 16px" }}>
                      Enquire
                    </Link>
                    <Link className="btn btn--ghost" to="/about" style={{ fontSize: 13, padding: "8px 16px" }}>
                      How we work
                    </Link>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VALUE / VISION / MISSION ── */}
      <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: "start", gap: 48 }}>
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Who we are</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8, lineHeight: 1.2 }}>More than a vendor.<br />A strategic partner.</h2>
            <p className="lead" style={{ marginTop: 12, maxWidth: "40ch" }}>We embed ourselves in your AI roadmap — aligning every deliverable to real business outcomes.</p>
            <div style={{ marginTop: 24 }}><Link to="/contact" className="btn btn--primary">Talk to us</Link></div>
            <div className="ai-partner-img">
              <img className="ken-burns" src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&auto=format&fit=crop&q=80" alt="Strategic partnership at a whiteboard" loading="lazy" />
            </div>
          </div>
          <div className="rv-group" style={{ display: "grid" }}>
            {pillars.map((p, i) => (
              <div key={p.label} className="rv" style={{ padding: "24px 0", borderBottom: "1px solid var(--border)", borderTop: i === 0 ? "1px solid var(--border)" : "none", display: "grid", gridTemplateColumns: "32px 1fr", gap: 16, alignItems: "start" }}>
                <div style={{ fontWeight: 800, fontSize: 11, color: "var(--teal)", paddingTop: 3, letterSpacing: "0.06em" }}>0{i + 1}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)", marginBottom: 6 }}>{p.label}</div>
                  <p className="lead" style={{ fontSize: 14 }}>{p.body}</p>
                </div>
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
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/contact">Get in touch</Link>
              <Link className="btn" to="/services" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}>All services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}