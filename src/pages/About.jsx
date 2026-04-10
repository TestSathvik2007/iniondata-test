import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useEffect, useRef } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────

const points = [
  {
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>),
    title: "Expertise",
    desc: "Benefit from the expertise of seasoned professionals with deep industry knowledge and experience. Global Presence: USA, Mexico, Canada, and India.",
    lottieUrl: "https://assets2.lottiefiles.com/packages/lf20_qp1q7mct.json",
    lottieBg: "transparent",
  },
  {
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
    title: "Customization",
    desc: "Enjoy personalized solutions tailored to your unique business needs and objectives.",
    lottieUrl: "https://assets3.lottiefiles.com/packages/lf20_obhph3t0.json",
    lottieBg: "transparent",
  },
  {
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>),
    title: "AI-Driven Innovation",
    desc: "Vision AI, Test Automation, Risk-based testing, Self-healing tests, Performance optimization.",
    lottieUrl: "https://assets9.lottiefiles.com/packages/lf20_w51pcehl.json",
    lottieBg: "transparent",
  },
  {
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
    title: "Reliability",
    desc: "Count on us for reliable, responsive service and support, ensuring peace of mind throughout our partnership. Whether you're planning a greenfield migration, a brownfield upgrade, or need expert guidance post-Go-Live, InionData brings speed, precision, and reliability to your digital initiatives.",
    lottieUrl: "https://assets4.lottiefiles.com/packages/lf20_tno6cg2w.json",
    lottieBg: "transparent",
  },
  {
    icon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>),
    title: "Results-Driven Approach",
    desc: "Experience measurable impact on your business performance with our results-driven approach.",
    lottieUrl: "https://assets1.lottiefiles.com/packages/lf20_kkflmtur.json",
    lottieBg: "transparent",
  },
];

const timeline = [
  { step: "01", title: "Discovery & Assessment", desc: "We analyse your current landscape, challenges, and business goals.", detail: "Stakeholder interviews, data landscape review, technical audit, scope definition." },
  { step: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof architecture tailored to your business.", detail: "Solution blueprint, tech stack selection, risk mapping, phased delivery plan." },
  { step: "03", title: "Build & Implement", desc: "We develop pipelines, applications, integrations, and governance frameworks.", detail: "Sprint cadence, PR reviews, automated testing, weekly stakeholder updates." },
  { step: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your solution as your needs grow.", detail: "Performance monitoring, continuous improvement, post-delivery support window." },
];

const clientLogos = ["Accenture","Deloitte","ThoughtWorks","KPMG","McKinsey","Bain & Co","BCG","PwC"];

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
  .lead{font-size:17px; font-weight:300; color:var(--muted); line-height:1.5; text-align: justify;text-justify: inter-word;}
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
  .step-pill{display:inline-flex;align-items:center;gap:8px;padding:4px 12px 4px 4px;border-radius:var(--radius-pill);background:rgba(20,184,166,0.08);border:1px solid rgba(20,184,166,0.15);margin-bottom:16px;width:fit-content}
  .step-pill__num{width:26px;height:26px;border-radius:50%;background:var(--grad-brand);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff}
  .step-pill__label{font-size:11px;font-weight:700;color:var(--teal-2);letter-spacing:0.06em;text-transform:uppercase}

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

  .bar-fill-js{height:100%;border-radius:999px;background:linear-gradient(90deg,var(--teal,#0d9488),var(--teal-2,#14b8a6));width:0;transition:width .9s cubic-bezier(.22,1,.36,1)}

  .hero-img-wrap{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/3;box-shadow:0 24px 64px rgba(0,0,0,.18)}
  .hero-img-wrap img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease}
  .hero-img-wrap:hover img{transform:scale(1.04)}
  .hero-img-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,148,136,.18) 0%,rgba(0,0,0,.32) 100%);pointer-events:none}
  .hero-img-badge{position:absolute;bottom:16px;left:16px;background:rgba(255,255,255,.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:10px 16px;color:#fff;font-size:12px;font-weight:700;letter-spacing:.03em}

  .img-strip{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:0 0 48px}
  .img-strip-item{position:relative;border-radius:16px;overflow:hidden;aspect-ratio:16/7;box-shadow:0 8px 32px rgba(0,0,0,.12)}
  .img-strip-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s ease;filter:saturate(.85)}
  .img-strip-item:hover img{transform:scale(1.05);filter:saturate(1)}
  .img-strip-item__label{position:absolute;bottom:10px;left:10px;background:rgba(13,148,136,.85);color:#fff;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:6px}

  .principles-bento{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:auto;gap:12px;margin-top:20px}
  .principles-bento .principle-cell:nth-child(4){grid-column:1/span 2}
  .principles-bento .principle-cell:nth-child(5){grid-column:3/span 1}
  .principle-cell{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transition:border-color .25s ease,background .25s ease}
  .principle-cell:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06)}
  .principle-cell::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,.22) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .45s ease;pointer-events:none}
  .principle-cell:hover::before{opacity:1}
  .principle-cell__icon-wrap{height:180px;display:flex;align-items:center;justify-content:center;background:rgba(20,184,166,.04);border-bottom:1px solid rgba(255,255,255,.06);transition:background .3s ease}
  .principle-cell:hover .principle-cell__icon-wrap{background:rgba(20,184,166,.08)}
  .principle-cell:hover lottie-player{transform:scale(1.08);transition:transform .4s cubic-bezier(.34,1.56,.64,1)}
  .principle-cell__body{padding:20px;display:flex;flex-direction:column;flex:1}
  .principle-cell__head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .principle-cell__title{font-weight:700;font-size:16px;color:var(--text)}
  .principle-cell__desc{font-size:14px;color:var(--muted);line-height:1.65}

  @media(max-width:900px){.principles-bento{grid-template-columns:1fr}}
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

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

function LottieIcon({ url, bg, size = 220 }) {
  useEffect(() => {
    if (customElements.get("lottie-player")) return;
    if (document.querySelector("#lottie-player-script")) return;
    const s = document.createElement("script");
    s.id  = "lottie-player-script";
    s.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    document.head.appendChild(s);
  }, []);
  return (
    <div style={{ width: "100%", height: 200, background: bg, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "10px 10px 0 0", overflow: "hidden" }}>
      <lottie-player autoplay loop mode="normal" src={url} style={{ width: size, height: size }} />
    </div>
  );
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function About() {
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
          <div className="grid grid-2" style={{ alignItems: "center", gap: 48 }}>
            <div>
              <div className="ha ha-1"><span className="kicker">About</span></div>
              <h1 className="h1 ha ha-2" style={{ fontSize: "clamp(2.2rem,4.4vw,3.2rem)", lineHeight: 1.1, marginTop: 10 }}>
                A specialized IT partner for enterprise-scale transformation.
              </h1>
              <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "65ch" }}>
                InionData is a specialized IT services company focused on delivering transformative solutions in Data as a Service, Application Development, SAP, Guidewire, and Testing. With decades of combined leadership experience, InionData provides end-to-end project support, application maintenance, testing services, and system transformation for enterprises across industries.
As a trusted Services Partner, and with growing capabilities in Guidewire Insurance Platform services, InionData is committed to being the partner of choice for enterprise IT success.

              </p>
              <div className="ha ha-4" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
                <Link className="btn btn--primary" to="/contact">Talk to us</Link>
                <Link className="btn btn--ghost"   to="/services">See services</Link>
              </div>
              <div className="ha ha-5" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginTop: 32 }}>
                {[["12+","Industries served"],["4 Countries","USA · Mexico · Canada · India"],["NDA","Ready on day one"]].map(([v, l]) => (
                  <div key={l} className="card card-i" style={{ padding: "14px 12px", borderRadius: 14, textAlign: "center" }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--teal)", lineHeight: 1 }}>{v}</div>
                    <div className="lead" style={{ fontSize: 11, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ha ha-6">
              <div className="hero-img-wrap">
                <img className="ken-burns" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80" alt="Team collaborating on a project" loading="lazy" />
                <div className="hero-img-overlay" />
                <div className="hero-img-badge">⚡ Trusted partner for enterprise IT success</div>
              </div>
              <div ref={barRef} className="card" style={{ marginTop: 16, padding: "16px 20px", display: "grid", gap: 9 }}>
                {[["Delivery clarity",92],["Code quality",88],["Security posture",90]].map(([l, v]) => (
                  <div key={l} style={{ display: "grid", gridTemplateColumns: "130px 1fr 38px", gap: 10, alignItems: "center" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, color: "var(--text)" }}>{l}</div>
                    <div className="bar-track"><div className="bar-fill-js" data-target-width={`${v}%`} /></div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "var(--muted-2)", textAlign: "right" }}>{v}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES — bento ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{ marginBottom: 28 }}>
            <div className="accent-bar" />
            <div className="kicker">Why InionData</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8 }}>Why InionData?</h2>
          </div>

          <div className="marquee-wrap rv" style={{ marginBottom: 24, padding: "8px 0" }}>
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted,#64748b)", whiteSpace: "nowrap", userSelect: "none" }}>{name}</span>
              ))}
            </div>
          </div>

          <div className="principles-bento rv-group">
            {points.map((p) => (
              <div key={p.title} className="principle-cell rv" style={{ position: "relative" }}>
                <div className="principle-cell__icon-wrap">
                  <LottieIcon url={p.lottieUrl} bg={p.lottieBg} size={160} />
                </div>
                <div className="principle-cell__body">
                  <div className="principle-cell__head">
                    <div className="icon-badge">{p.icon}</div>
                    <div className="principle-cell__title">{p.title}</div>
                  </div>
                  <p className="principle-cell__desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE STRIP ── */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div className="img-strip rv">
            <div className="img-strip-item">
              <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=80" alt="Code on screen" loading="lazy" />
              <span className="img-strip-item__label">Deep engineering</span>
            </div>
            <div className="img-strip-item">
              <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900&auto=format&fit=crop&q=80" alt="Team working together" loading="lazy" />
              <span className="img-strip-item__label">Real collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT FLOW ── */}
      {/* <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: 32 }}>
            <div className="accent-bar" />
            <div className="kicker">Our delivery approach</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8 }}>How every engagement runs</h2>
          </div>

          <div style={{ position: "relative" }}>
            {/* <div style={{ position: "absolute", top: 22, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg,var(--teal),var(--teal-2))", opacity: 0.2, borderRadius: 2, zIndex: 0 }} /> */}
            {/* <div className="grid grid-4 rv-group" style={{ position: "relative", zIndex: 1 }}>
              {timeline.map((t) => (
                <div key={t.title} className="card card__p card-i rv" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="step-pill">
                    <span className="step-pill__num">{t.step}</span>
                    <span className="step-pill__label">Step {t.step}</span>
                  </div>
                  <div className="h2" style={{ fontSize: 17, marginBottom: 8 }}>{t.title}</div>
                  <p className="lead" style={{ fontSize: 13, flex: 1 }}>{t.desc}</p>
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{t.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */} 

      {/* ── CTA ── */}
      <section className="section section--alt">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Ready to transform your enterprise?</h2>
              <p className="cta-band__sub">Whether you're planning a greenfield migration, a brownfield upgrade, or need expert guidance post-Go-Live — InionData brings speed, precision, and reliability.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/contact">Talk to us</Link>
              <Link className="btn" to="/services" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>Our services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}