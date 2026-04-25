import { Link, useNavigate } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useEffect, useRef, useState } from "react";

/* ✅ IMPORT IMAGES */
import service1 from "../assets/images/app_development.png";
import service2 from "../assets/images/application_integration.png";
import service3 from "../assets/images/application_management.png";
import service4 from "../assets/images/application_maintenance.png";
import service5 from "../assets/images/project_management.png";
import service6 from "../assets/images/consulting_services.png";
import service7 from "../assets/images/teams_application.png";
import service8 from "../assets/images/operational_efficiency.png";
import service9 from "../assets/images/fast_growth.png";
// New data service images — swap these paths for your actual assets when ready
import service10 from "../assets/images/app_development.png";
import service11 from "../assets/images/application_integration.png";
import service12 from "../assets/images/application_management.png";
import service13 from "../assets/images/application_maintenance.png";
import service14 from "../assets/images/project_management.png";

/* ── DATA ───────────────────────────────── */

const offerings = [
  {
    title: "Application Development",
    path: "/services/app-development",
    desc: "Transforming heritage portfolios to flexible, modular application development.",
    bullets: ["Agile methods for rapid deployment", "Automation & business integration", "Enhance digital transformation & CX"],
    image: service1,
    fullText: "Enterprise organizations are transforming heritage portfolios to flexible, modular application development management portfolios by implementing next-generation processes defined by speed, efficiency and resilience. By adopting agile methods, what used to take developers months to release can now take mere seconds to deploy. Adding automation and business integration into the mix makes for an efficient process. Organizations are adopting the agile approach to application development to enhance their digital transformation smartly, while keeping pace with the competition and the changing marketplace with positive customer experiences."
  },
  {
    title: "Application Design, Development and Integration",
    path: "/services/app-integration",
    desc: "Full range of requirements gathering, prototyping, implementation, and integration.",
    bullets: ["Designing Rich UI/UX for applications", "Builds for QA and client UAT", "API, Web services and connectors"],
    image: service2,
    fullText: "Providing a full range of gathering requirements, designing prototypes, testing, implementation, and integration.\nDesigning a Rich User Interface (UI) and User Experience (UX) for applications\nCreating builds for software releases for quality assurance and client user acceptance testing\nEnabling integration between applications and systems.\nWorking with API, Web services and connectors"
  },
  {
    title: "Application Management and Support",
    path: "/services/app-management",
    desc: "Providing management and support service for new and existing applications.",
    bullets: ["Application management and support", "Resolving technical issues", "Resolving functional issues"],
    image: service3,
    fullText: "Providing application management and support service for new and existing applications.\nResolving technical and functional issues as needed."
  },
  {
    title: "Application Maintenance",
    path: "/services/app-maintenance",
    desc: "Conducting reviews and ensuring standards.",
    bullets: ["Reviews for standards and requirements", "Ensuring systems perform optimally", "Ongoing support and maintenance"],
    image: service4,
    fullText: "Conducting reviews to ensure standards and requirements are being met.\nEnsuring systems are performing optimally."
  },
  {
    title: "Project Management",
    path: "/services/project-management",
    desc: "Establishing and managing timelines to budget.",
    bullets: ["Establishing timelines", "Managing agreed-to-budget", "Assessing and managing risks"],
    image: service5,
    fullText: "Establishing and managing timelines.\nManaging the project to the agreed-to-budget.\nAssessing and managing risks throughout the process\nDocumenting features, fixes and configurations\nCommunicating with stakeholders."
  },
  {
    title: "Consulting Services",
    path: "/services/consulting",
    desc: "Assessing needs, requirements, and goals for cross-functional applications.",
    bullets: ["Reviewing technical design documents", "Analyzing feasibility & performance", "Addressing security & scalability"],
    image: service6,
    fullText: "Assessing needs, requirements, and goals for the development of new cross-functional, multi-platform applications.\nReviewing technical design documents to ensure solutions properly leverage the company’s technology stack\nAnalyzing the feasibility, costs, time, compatibility, and performance of applications\nAddressing performance, scalability, caching, security, encryption, and testing requirements\nPresenting potential solutions to stakeholders across the organization"
  },
  {
    title: "Teams Application Development and Integration",
    path: "/services/teams-integration",
    desc: "Developing bots, message extensions, and Teams integrations.",
    bullets: ["Bots and message extensions", "Integration into Microsoft Teams", "Web app embedded as Tab"],
    image: service7,
    fullText: "Developing bots and message extension based on user story and integration into Microsoft Teams.\nDeveloping Web application and integrating as Tab"
  },
  {
    title: "Operational Efficiency and Fast Growth",
    path: "/services/operational-efficiency",
    desc: "Ensure efficient and cost-effective application development.",
    bullets: ["Efficient app development management", "Expand legacy app capabilities", "Boost growth by reinventing applications"],
    image: service8,
    fullText: "Ensure efficient and cost-effective application development management while using secure practices.\nExpand the capabilities of your legacy applications and enhance use experience by leveraging modern technology. \nBoost growth by reinventing your applications. Speed up the application development process while minimizing maintenance needs."
  }
];

// const metrics = [["12+", "Industries served"], ["4", "Global locations"], ["10×", "Faster releases"], ["100%", "Budget adherence"]];
// const clientLogos = ["Accenture", "Deloitte", "ThoughtWorks", "KPMG", "McKinsey", "Bain & Co", "BCG", "PwC"];
// const fomoLeads = ["A SaaS team in Austin just got in touch.", "A fintech startup booked a discovery call.", "An e-commerce company requested a proposal.", "A logistics firm just reached out."];

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
    --container:min(1600px,100%); --pad:10px;
    --font-display:'Inter',system-ui,sans-serif; --font-body:'Inter',system-ui,sans-serif;
    --ease:cubic-bezier(0.22,1,0.36,1); --dur:0.25s; --dur-slow:0.45s;
  }

  /* ── SHARED: BASE ── */
  *,*::before,*::after{box-sizing:border-box}
  html{height:100%;scroll-behavior:smooth;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;overflow-x:hidden}
  body{margin:0;font-family:var(--font-body);font-size:16px;font-weight:400;line-height:1.6;color:var(--text);background:var(--bg);overflow-x:hidden;min-height:100%}
  body::before{content:'';position:fixed;inset:0;background:radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%),radial-gradient(ellipse 600px 400px at 50% 90%,rgba(20,184,166,0.06),transparent 70%);pointer-events:none;z-index:0}
  body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");pointer-events:none;z-index:0;opacity:0.5}
  a{color:inherit;text-decoration:none} button{font:inherit;cursor:pointer} img,svg{display:block;max-width:100%}

  /* ── SHARED: LAYOUT ── */
  .app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}
  .main{flex:1;padding-top:80px}
  .container{width:100%;max-width:var(--container);margin:0 auto;padding:0 clamp(12px,4vw,var(--pad))}
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

  .card-lift{transition:transform .25s cubic-bezier(.34,1.56,.64,1),box-shadow .25s ease}
  .card-lift:hover{transform:translateY(-4px);box-shadow:0 8px 24px rgba(0,0,0,.08)}

  .svc-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
  .svc-hero-img{width:100%;border-radius:16px;overflow:hidden;aspect-ratio:4/3;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.45)}
  .svc-hero-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.8) brightness(.85)}
  .svc-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,148,136,.25) 0%,transparent 60%);pointer-events:none}
  .svc-hero-img-label{position:absolute;left:18px;bottom:16px;color:#fff;font-size:12px;font-weight:700;letter-spacing:.04em;text-shadow:0 2px 8px rgba(0,0,0,.5);background:rgba(7,16,14,.6);padding:4px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.12)}
  @media(max-width:900px){.svc-hero-grid{grid-template-columns:1fr}.svc-hero-img{aspect-ratio:16/7;margin-top:32px}}

  .offerings-bento{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));grid-auto-rows:auto;gap:16px}
  .offering-cell{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;position:relative;transition:border-color .25s ease,background .25s ease}
  .offering-cell:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06)}
  .offering-cell::before{content:'';position:absolute;inset:0;border-radius:inherit;padding:1px;background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,.22) 50%,transparent 100%);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;opacity:0;transition:opacity .45s ease;pointer-events:none}
  .offering-cell:hover::before{opacity:1}
  .offering-cell__body{padding:20px;display:flex;flex-direction:column;flex:1}
  .offering-cell__head{display:flex;align-items:center;gap:12px;margin-bottom:12px}
  .offering-cell__footer{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.07)}

  /* ── "Has detail page" badge on linkable cards ── */
  .offering-cell--linked .offering-cell-img-wrap::after {
    content: 'View details →';
    position: absolute; bottom: 10px; right: 12px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
    color: var(--teal-2);
    background: rgba(7,16,14,0.80);
    border: 1px solid rgba(20,184,166,0.28);
    border-radius: 999px; padding: 3px 10px;
    opacity: 0; transition: opacity .2s;
  }
  .offering-cell--linked:hover .offering-cell-img-wrap::after { opacity: 1; }
  .offering-cell-img-wrap { position: relative; }

  @media(max-width:768px){.offerings-bento{grid-template-columns:1fr}}
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

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Services() {
  useReveal();
  const barRef = useRef(null);
  useBarFillOnScroll(barRef);
  const toast = useFomoToast();
  const navigate = useNavigate();

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section">
        <div className="container svc-hero-grid">
          {/* Left — text */}
          <div>
            <div className="ha ha-1"><span className="kicker">Services</span></div>
            <h1 className="h1 ha ha-2" style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", lineHeight: 1.1, marginTop: 10, maxWidth: "18ch" }}>Enterprise IT services, end to end.</h1>
            <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "52ch" }}>At InionData, we offer a comprehensive range of data services designed to meet the diverse needs of businesses in today's digital landscape. From IT staffing to strategic consulting, we provide tailored solutions that empower our clients to succeed. Explore our services below to learn how we can help you achieve your business goals.</p>
          </div>

          {/* Right — image */}
          <div className="svc-hero-img ha ha-4">
            <img className="ken-burns" src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&auto=format&fit=crop&q=80" alt="Developer writing code" loading="lazy" />
            <div className="svc-hero-img-overlay" />
            <div className="svc-hero-img-label">Full-lifecycle application delivery</div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW 2-col ── */}
      {/* <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: "start", gap: 24 }}>
          <div ref={barRef} className="card card__p rv">
            <div className="accent-bar" />
            <div className="kicker">Engagement health</div>
            <div className="h2" style={{ fontSize: 18, marginTop: 6 }}>Predictable delivery metrics</div>
            <p className="lead" style={{ marginTop: 8, fontSize: 14 }}>We aim for clear ownership and measurable outcomes on every engagement.</p>
            <div style={{ marginTop: 20, display: "grid", gap: 14 }}>
              {[["Clarity", 92], ["Quality", 88], ["Security", 90]].map(([l, v]) => (
                <div key={l} style={{ display: "grid", gridTemplateColumns: "90px 1fr 42px", gap: 12, alignItems: "center" }}>
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
            <div className="h2" style={{ fontSize: 18, marginTop: 6 }}>Every engagement includes</div>
            <div className="grid grid-2" style={{ marginTop: 16, gap: 10 }}>
              {[["Agile delivery", "Weeks to release, not months."], ["Fast growth", "Reinvent apps, boost velocity."], ["Clean handover", "Docs + knowledge transfer."], ["Confidentiality", "NDA-ready, least-access ops."]].map(([t, d]) => (
                <div key={t} className="card card-i" style={{ padding: 14, borderRadius: 14 }}>
                  <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)", marginBottom: 5 }}>{t}</div>
                  <div className="lead" style={{ fontSize: 12 }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}><Link to="/contact" className="btn btn--primary btn--full">Request a quick call</Link></div>
          </div>
        </div>
      </section> */}

      {/* ── OFFERINGS BENTO ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: 28 }}>
            <div className="accent-bar" />
            <div className="kicker">Offerings</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8 }}>Choose what you need</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "58ch" }}>From IT staffing to data engineering and AI — we cover the full spectrum of enterprise technology needs.</p>
          </div>

          <div className="offerings-bento rv-group">
            {offerings.map((o) => (
              <div
                key={o.title}
                className={`offering-cell rv offering-cell--linked`}
              >
                {/* Image wrapper — gets the "View details →" pill on hover for linked cards */}
                <div
                  className="offering-cell-img-wrap"
                  style={{ width: "100%", height: 200, overflow: "hidden", borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
                  onClick={() => navigate(o.path)}
                >
                  <img
                    src={o.image}
                    alt={o.title}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .45s var(--ease)" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                </div>

                <div className="offering-cell__body">
                  <div className="offering-cell__head">
                    <div className="icon-badge">{o.icon}</div>
                    {/* Title triggers navigation */}
                    <Link
                      to={o.path}
                      className="h2"
                      style={{ fontSize: 17, color: "inherit", transition: "color .2s", background: "none", border: "none", padding: 0, textAlign: "left", cursor: "pointer", display: "inline-block" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--teal-2)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "inherit"; }}
                    >
                      {o.title}
                    </Link>
                  </div>

                  <p className="lead" style={{ fontSize: 13, marginBottom: 14 }}>{o.desc}</p>

                  <ul style={{ paddingLeft: 0, listStyle: "none", display: "grid", gap: 6, flex: 1 }}>
                    {o.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />{b}
                      </li>
                    ))}
                  </ul>

                  <div className="offering-cell__footer">
                    {/* Primary action: Navigate */}
                    <Link
                      className="btn btn--primary"
                      to={o.path}
                      style={{ fontSize: 13, padding: "8px 16px" }}
                    >
                      Explore
                    </Link>
                    <Link className="btn btn--ghost" to="/about" style={{ fontSize: 13, padding: "8px 16px" }}>How we work</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section--alt">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Ready to transform your digital operations?</h2>
              <p className="cta-band__sub">From staffing solutions to full system transformation — we bring the right expertise to deliver results.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/contact">Get in touch</Link>
              <Link className="btn" to="/about" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}>How we work</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}