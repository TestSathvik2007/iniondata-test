import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";

// ── DATA ─────────────────────────────────────────────────────────────────────

const topics = ["Data & Analytics","Cloud & Modernization","Engineering Delivery","Staffing","AI Enablement","Other"];

const details = [
  { label: "Location", value: "Richmond, VA" },
  { label: "Phone",    value: "(804) 877-2171" },
  { label: "Email",    value: "hello@iniondata.com" },
  { label: "Hours",    value: "Mon–Fri, 9am–6pm" },
];

const flowSteps = [
  { step: "01", title: "Submit", desc: "Send us a short brief about your project or challenge." },
  { step: "02", title: "Review", desc: "We assess scope and match you to the right team lead." },
  { step: "03", title: "Call",   desc: "A focused 30-min conversation — no fluff, just clarity." },
  { step: "04", title: "Plan",   desc: "Receive 1–2 tailored options within 48 hours." },
];

const guarantees = [
  ["24–48h","Response time"],
  ["30 min","Scoping call"],
  ["NDA","Ready day one"],
  ["No lock-in","Flexible terms"],
];

const clientLogos = ["Accenture","Deloitte","ThoughtWorks","KPMG","McKinsey","Bain & Co","BCG","PwC"];
const fomoLeads   = [
  "A SaaS team in Austin just got in touch.",
  "A fintech startup booked a discovery call.",
  "An e-commerce company requested a proposal.",
  "A healthtech team started a conversation.",
];

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

  @keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
  @keyframes toastOut{from{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(-12px) scale(0.96)}}
  .fomo-toast{position:fixed;bottom:24px;left:24px;z-index:999;background:rgba(255,255,255,0.96);border:0.5px solid rgba(0,0,0,0.10);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 4px 18px rgba(0,0,0,0.10);pointer-events:none;max-width:260px}
  .fomo-toast.entering{animation:toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards}
  .fomo-toast.exiting{animation:toastOut 0.3s ease-in forwards}
  .fomo-dot{width:8px;height:8px;border-radius:50%;background:#10b981;flex-shrink:0;box-shadow:0 0 0 3px rgba(16,185,129,0.2)}

  .contact-hero-img{position:relative;border-radius:20px;overflow:hidden;margin-top:40px;aspect-ratio:21/6;box-shadow:0 16px 48px rgba(0,0,0,0.14)}
  .contact-hero-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(0.75) brightness(0.82)}
  .contact-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,148,136,0.4) 0%,transparent 65%);pointer-events:none}
  .contact-hero-img-label{position:absolute;left:24px;bottom:20px;color:#fff;font-size:14px;font-weight:800;letter-spacing:0.02em;text-shadow:0 2px 10px rgba(0,0,0,0.4)}

  .contact-loc-img{border-radius:12px;overflow:hidden;margin-top:14px;aspect-ratio:16/7}
  .contact-loc-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(0.8);transition:transform 0.5s ease}
  .contact-loc-img:hover img{transform:scale(1.04)}
`;

// ── HOOKS ─────────────────────────────────────────────────────────────────────

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
    const interval = setInterval(show, 7000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, []);
  return toast;
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Contact() {
  useReveal();
  const toast = useFomoToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });

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
          <div className="ha ha-1"><span className="kicker">Contact</span></div>
          <h1 className="h1 ha ha-2" style={{ fontSize: "clamp(2.2rem,4.5vw,3.4rem)", lineHeight: 1.1, marginTop: 10, maxWidth: "22ch" }}>
            Let's start with a clear brief.
          </h1>
          <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "52ch" }}>
            Share what you're trying to achieve. We'll reply with focused next steps — no filler, no hard sell.
          </p>

          <div className="ha ha-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 40 }}>
            {guarantees.map(([v, l]) => (
              <div key={l} className="card card-i" style={{ padding: "20px 14px", borderRadius: 14, textAlign: "center" }}>
                <div className="stat-num">{v}</div>
                <div className="lead" style={{ fontSize: 12, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>

          <div className="contact-hero-img ha ha-5">
            <img className="ken-burns" src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80" alt="Modern office space" loading="lazy" />
            <div className="contact-hero-img-overlay" />
            <div className="contact-hero-img-label">We reply within 24–48 hours — no fluff.</div>
          </div>
        </div>
      </section>

      {/* ── MAIN — form + sidebar ── */}
      <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: "start", gap: 24 }}>

          {/* LEFT: form */}
          <div className="card card__p rv">
            <div className="accent-bar" />
            <div className="kicker">Send a message</div>

            {!submitted ? (
              <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
                <div className="grid grid-2" style={{ gap: 12 }}>
                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Name</span>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="input" placeholder="Your name" />
                  </label>
                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Email</span>
                    <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required type="email" className="input" placeholder="you@company.com" />
                  </label>
                </div>

                <div className="grid grid-2" style={{ gap: 12 }}>
                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Company <span style={{ fontWeight: 400, color: "var(--muted)" }}>(optional)</span></span>
                    <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="input" placeholder="Your company" />
                  </label>
                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Topic</span>
                    <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className="input">
                      <option value="">Select a topic…</option>
                      {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </label>
                </div>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>Message</span>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="input" placeholder="What are you trying to achieve? Any timeline or constraints?" rows={6} style={{ resize: "vertical" }} />
                </label>

                <button onClick={() => { if (form.name && form.email && form.message) setSubmitted(true); }} className="btn btn--primary btn--full">
                  Send message
                </button>
                <p className="lead" style={{ fontSize: 12, textAlign: "center" }}>
                  NDA available on request. We reply within 24–48 hours.
                </p>
              </div>
            ) : (
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(13,148,136,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </div>
                <h2 className="h2" style={{ fontSize: 22 }}>Message received</h2>
                <p className="lead" style={{ marginTop: 10, maxWidth: "36ch" }}>
                  Thanks {form.name.split(" ")[0]} — we'll reply within 24–48 hours with clear next steps.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
                  <button className="btn btn--ghost" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", topic: "", message: "" }); }}>
                    Send another
                  </button>
                  <Link className="btn btn--primary" to="/services">View services</Link>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: info + flow */}
          <div style={{ display: "grid", gap: 16 }}>
            <div className="card card__p rv">
              <div className="accent-bar" />
              <div className="kicker">Get in touch</div>
              <div style={{ marginTop: 14, display: "grid", gap: 0 }}>
                {details.map(({ label, value }, i) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < details.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ fontWeight: 800, fontSize: 13, color: "var(--text)" }}>{label}</div>
                    <div className="lead" style={{ fontSize: 13 }}>{value}</div>
                  </div>
                ))}
              </div>
              <div className="contact-loc-img">
                <img src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=700&auto=format&fit=crop&q=80" alt="Richmond VA" loading="lazy" />
              </div>
            </div>

            <div className="card card__p rv">
              <div className="accent-bar" />
              <div className="kicker">What happens next</div>
              <div style={{ marginTop: 14, display: "grid", gap: 0 }}>
                {flowSteps.map((t, i) => (
                  <div key={t.step} style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: 14, padding: "14px 0", borderBottom: i < flowSteps.length - 1 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
                    <div style={{ fontWeight: 800, fontSize: 11, color: "var(--teal)", paddingTop: 2, letterSpacing: "0.06em" }}>{t.step}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 3 }}>{t.title}</div>
                      <p className="lead" style={{ fontSize: 13 }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card card-i rv" style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "var(--text)" }}>Prefer a quick call?</div>
                <p className="lead" style={{ fontSize: 13, marginTop: 4 }}>Book a 30-min scoping session directly.</p>
              </div>
              <Link className="btn btn--primary" to="/contact" style={{ whiteSpace: "nowrap" }}>Book a call</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── LOGO MARQUEE ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: 20 }}>
            <div className="kicker">Trusted by teams at</div>
          </div>
          <div className="marquee-wrap rv">
            <div className="marquee-track">
              {[...clientLogos, ...clientLogos].map((name, i) => (
                <span key={i} style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--muted,#64748b)", whiteSpace: "nowrap", userSelect: "none" }}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENT FLOW ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{ marginBottom: 32 }}>
            <div className="accent-bar" />
            <div className="kicker">How we engage</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.8rem,3vw,2.2rem)", marginTop: 8 }}>From brief to plan in four steps</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "52ch" }}>No lengthy procurement cycles. We move fast and keep things transparent.</p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 22, left: "12.5%", right: "12.5%", height: 2, background: "linear-gradient(90deg,var(--teal),var(--teal-2))", opacity: 0.2, borderRadius: 2, zIndex: 0 }} />
            <div className="grid grid-4 rv-group" style={{ position: "relative", zIndex: 1 }}>
              {flowSteps.map((t) => (
                <div key={t.step} className="card card__p card-i rv" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="step-pill">
                    <span className="step-pill__num">{t.step}</span>
                    <span className="step-pill__label">Step {t.step}</span>
                  </div>
                  <div className="h2" style={{ fontSize: 17, marginBottom: 8 }}>{t.title}</div>
                  <p className="lead" style={{ fontSize: 13, flex: 1 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Not sure where to start?</h2>
              <p className="cta-band__sub">Browse our services and we'll help you identify the best fit.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/services">Explore services</Link>
              <Link className="btn" to="/about" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>How we work</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}