import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useEffect, useRef, useState } from "react";

import service1 from "../assets/images/app_development.png";

// ── DATA ──────────────────────────────────────────────────────────────────────

const whatWeDo = [
  { label: "Product ideation & requirement analysis" },
  { label: "UI/UX design focused on user experience" },
  { label: "Frontend & backend development" },
  { label: "API development & integrations" },
  { label: "Cloud deployment & DevOps setup" },
  { label: "Quality assurance & testing" },
];

const steps = [
  { n: "01", title: "Discovery",   desc: "Understand your business goals, users, and technical requirements." },
  { n: "02", title: "Design",      desc: "Create intuitive UI/UX and define system architecture." },
  { n: "03", title: "Development", desc: "Agile-based development with continuous feedback loops." },
  { n: "04", title: "Testing",     desc: "Ensure performance, security, and reliability at every layer." },
  { n: "05", title: "Deployment",  desc: "Seamless launch with cloud-ready infrastructure." },
  { n: "06", title: "Support",     desc: "Ongoing maintenance, monitoring, and improvements." },
];

const results = [
  "Faster time to market",
  "Scalable architecture for future growth",
  "Secure and reliable systems",
  "High-performance applications",
  "Improved user engagement",
];

const techStack = [
  { cat: "Frontend",  items: ["React", "Next.js"] },
  { cat: "Backend",   items: ["Node.js", "Python"] },
  { cat: "Databases", items: ["PostgreSQL", "MongoDB"] },
  { cat: "Cloud",     items: ["AWS", "Firebase", "Vercel"] },
  { cat: "Tools",     items: ["Docker", "GitHub Actions"] },
];

const whyUs = [
  { title: "Transparent communication", desc: "Weekly updates and clear timelines — no surprises." },
  { title: "Agile and flexible",        desc: "Iterative delivery so you stay in control at every stage." },
  { title: "Strong technical expertise",desc: "Senior engineers across frontend, backend, cloud, and security." },
  { title: "On-time delivery",          desc: "Milestones are commitments, not suggestions." },
  { title: "Long-term support",         desc: "We stay engaged after launch — patches, improvements, growth." },
  { title: "NDA-ready by default",      desc: "Your IP stays yours. Least-privilege access, clean handoffs." },
];

const resultIcons = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
];

// ── PAGE-SPECIFIC STYLES ──────────────────────────────────────────────────────
// Uses same .container, .section, .h1, .h2, .lead, .kicker, .btn, .card,
// .card-i, .stat-num, .accent-bar, .cta-band classes from global styles
// (already defined in Services.jsx / shared CSS). Only NEW selectors here.

const pageStyles = `
  /* Hero image banner — matches .svc-hero-img exactly */
  @keyframes kenBurns{from{transform:scale(1) translateX(0)}to{transform:scale(1.06) translateX(-10px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate;will-change:transform}

  .appdev-hero-img{
    width:100%;border-radius:16px;overflow:hidden;
    aspect-ratio:21/7;margin-top:40px;position:relative;
    box-shadow:0 12px 40px rgba(0,0,0,.14);
  }
  .appdev-hero-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(.8) brightness(.85)}
  .appdev-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,148,136,.35) 0%,transparent 60%);pointer-events:none}
  .appdev-hero-img-label{position:absolute;left:24px;bottom:20px;color:#fff;font-size:13px;font-weight:700;letter-spacing:.04em;text-shadow:0 2px 8px rgba(0,0,0,.4)}

  /* Metrics row */
  .appdev-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:36px}

  /* What we do grid */
  .appdev-services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:28px}
  .appdev-service-item{
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
    border-radius:16px;padding:20px;position:relative;overflow:hidden;
    transition:border-color .25s,background .25s,transform .25s ease;
  }
  .appdev-service-item::before{
    content:'';position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(135deg,#14b8a6,#22c55e);opacity:0;transition:opacity .3s;
  }
  .appdev-service-item:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06);transform:translateY(-3px)}
  .appdev-service-item:hover::before{opacity:1}
  .appdev-service-num{font-size:10px;font-weight:800;letter-spacing:.14em;color:var(--teal);text-transform:uppercase;margin-bottom:10px;display:block}
  .appdev-service-label{font-weight:700;font-size:14px;color:var(--text);line-height:1.4}

  /* Process */
  .appdev-process-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:0;margin-top:36px;position:relative}
  .appdev-process-grid::before{
    content:'';position:absolute;
    top:27px;left:calc(100%/12);right:calc(100%/12);
    height:1px;background:linear-gradient(90deg,#14b8a6,rgba(34,197,94,.25));z-index:0;
  }
  .appdev-process-step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 6px;position:relative;z-index:1}
  .appdev-process-node{
    width:54px;height:54px;border-radius:50%;
    border:1.5px solid rgba(20,184,166,.35);background:#0c1a16;
    display:flex;align-items:center;justify-content:center;
    font-weight:800;font-size:13px;color:var(--teal-2);
    margin-bottom:14px;flex-shrink:0;
    transition:border-color .25s,background .25s,transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .appdev-process-step:hover .appdev-process-node{border-color:var(--teal);background:rgba(20,184,166,.12);transform:scale(1.10)}
  .appdev-process-title{font-weight:700;font-size:12px;color:var(--text);margin-bottom:5px}
  .appdev-process-desc{font-size:11px;color:var(--muted);line-height:1.55}

  /* Results */
  .appdev-results-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:28px}
  .appdev-result-card{
    padding:22px 16px;border-radius:14px;text-align:center;
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
    transition:border-color .25s,transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .appdev-result-card:hover{border-color:rgba(20,184,166,.25);transform:translateY(-4px)}
  .appdev-result-dot{
    width:36px;height:36px;border-radius:10px;margin:0 auto 12px;
    background:rgba(20,184,166,.10);border:1px solid rgba(20,184,166,.18);
    display:flex;align-items:center;justify-content:center;color:var(--teal-2);
  }
  .appdev-result-label{font-weight:700;font-size:12px;color:var(--text);line-height:1.4}

  /* Tech stack */
  .appdev-tech-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:28px}
  .appdev-tech-col{
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
    border-radius:14px;padding:18px;text-align:center;
    transition:border-color .25s,transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .appdev-tech-col:hover{border-color:rgba(20,184,166,.25);transform:translateY(-3px)}
  .appdev-tech-cat{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--teal);margin-bottom:12px}
  .appdev-tech-pills{display:flex;flex-direction:column;gap:6px}
  .appdev-tech-pill{
    padding:5px 8px;border-radius:8px;font-size:12px;font-weight:600;
    background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);
    color:var(--text);transition:background .2s,border-color .2s,color .2s;
  }
  .appdev-tech-pill:hover{background:rgba(20,184,166,.12);border-color:rgba(20,184,166,.3);color:var(--teal-2)}

  /* Case study */
  .appdev-case-grid{
    display:grid;grid-template-columns:1fr 1fr;
    border-radius:18px;overflow:hidden;
    border:1px solid rgba(255,255,255,0.08);margin-top:28px;
  }
  .appdev-case-left{padding:36px;background:rgba(20,184,166,.055);border-right:1px solid rgba(255,255,255,0.07)}
  .appdev-case-right{padding:36px;background:rgba(255,255,255,.025)}
  .appdev-case-tag{
    display:inline-flex;padding:3px 12px;border-radius:999px;
    background:rgba(20,184,166,.15);border:1px solid rgba(20,184,166,.28);
    font-size:10px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;
    color:var(--teal-2);margin-bottom:14px;
  }
  .appdev-case-title{font-weight:800;font-size:22px;color:var(--text);margin:0 0 16px;letter-spacing:-.02em;line-height:1.2}
  .appdev-case-field{margin-bottom:16px}
  .appdev-case-field-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:5px}
  .appdev-case-field-val{font-size:14px;color:var(--text);line-height:1.65}
  .appdev-case-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
  .appdev-case-stat{text-align:center;padding:16px 10px;border-radius:12px;background:rgba(20,184,166,.08);border:1px solid rgba(20,184,166,.18)}
  .appdev-case-stat-val{font-weight:800;font-size:28px;color:var(--teal-2);line-height:1}
  .appdev-case-stat-label{font-size:11px;color:var(--muted);margin-top:4px;line-height:1.4}

  /* Why us */
  .appdev-why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:28px}
  .appdev-why-item{
    display:flex;gap:14px;padding:20px;border-radius:14px;
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
    transition:border-color .25s,transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .appdev-why-item:hover{border-color:rgba(20,184,166,.22);transform:translateX(4px)}
  .appdev-why-check{
    width:34px;height:34px;border-radius:10px;flex-shrink:0;
    background:rgba(20,184,166,.12);border:1px solid rgba(20,184,166,.22);
    display:flex;align-items:center;justify-content:center;color:var(--teal-2);margin-top:1px;
  }
  .appdev-why-title{font-weight:700;font-size:14px;color:var(--text);margin-bottom:3px}
  .appdev-why-desc{font-size:13px;color:var(--muted);line-height:1.6}

  /* ── RESPONSIVE ── */
  @media(max-width:1024px){
    .appdev-metrics{grid-template-columns:repeat(2,1fr)}
    .appdev-process-grid{grid-template-columns:repeat(3,1fr);gap:20px}
    .appdev-process-grid::before{display:none}
    .appdev-tech-grid{grid-template-columns:repeat(3,1fr)}
    .appdev-results-grid{grid-template-columns:repeat(3,1fr)}
    .appdev-services-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:768px){
    .appdev-services-grid{grid-template-columns:1fr}
    .appdev-process-grid{grid-template-columns:repeat(2,1fr);gap:16px}
    .appdev-case-grid{grid-template-columns:1fr}
    .appdev-case-left{border-right:none;border-bottom:1px solid rgba(255,255,255,.07)}
    .appdev-why-grid{grid-template-columns:1fr}
    .appdev-results-grid{grid-template-columns:repeat(2,1fr)}
    .appdev-tech-grid{grid-template-columns:repeat(2,1fr)}
    .appdev-metrics{grid-template-columns:repeat(2,1fr)}
    .appdev-hero-img{aspect-ratio:16/9}
  }
  @media(max-width:480px){
    .appdev-results-grid{grid-template-columns:1fr 1fr}
    .appdev-tech-grid{grid-template-columns:1fr 1fr}
    .appdev-case-stats{grid-template-columns:1fr}
    .appdev-process-grid{grid-template-columns:1fr 1fr}
  }
`;

// ── COUNTER-UP HOOK ───────────────────────────────────────────────────────────

function useCountUp(target, duration = 1100) {
  const [value, setValue]     = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now) => {
      const p    = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { value, ref };
}

function AnimatedStat({ value, suffix, label }) {
  const { value: count, ref } = useCountUp(value);
  return (
    <div className="appdev-case-stat" ref={ref}>
      <div className="appdev-case-stat-val">{count}{suffix}</div>
      <div className="appdev-case-stat-label">{label}</div>
    </div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function AppDevelopment() {
  useReveal();

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section">
        <div className="container">

          <div className="ha ha-1"><span className="kicker">Application Design &amp; Development</span></div>
          <h1
            className="h1 ha ha-2"
            style={{ fontSize: "clamp(2.2rem,4.5vw,3.2rem)", lineHeight: 1.1, marginTop: 10, maxWidth: "22ch" }}
          >
            Build scalable, high-performance applications.
          </h1>
          <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "60ch" }}>
            From startups to enterprise systems — we design and develop applications that are fast, secure, and built for growth. Strong engineering meets modern design, shipped on time.
          </p>
          <div className="ha ha-4" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
            <Link className="btn btn--primary" to="/contact">Book a consultation</Link>
            <Link className="btn btn--ghost"   to="/services">View all services</Link>
          </div>

          {/* Metrics — identical card style to Services.jsx hero metrics */}
          <div className="appdev-metrics ha ha-4">
            {[["4×","Avg. performance gain"],["60%","Reduction in downtime"],["24h","First response"],["100%","NDA-ready"]].map(([v, l]) => (
              <div key={l} className="card card-i" style={{ padding: "20px 16px", borderRadius: 14, textAlign: "center" }}>
                <div className="stat-num">{v}</div>
                <div className="lead" style={{ fontSize: 12, marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Hero image — uses imported service1 asset */}
          <div className="appdev-hero-img ha ha-5">
            <img className="ken-burns" src={service1} alt="Application design and development" loading="lazy" />
            <div className="appdev-hero-img-overlay" />
            <div className="appdev-hero-img-label">Full-lifecycle application delivery</div>
          </div>

        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">What we do</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>End-to-end application services</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "58ch" }}>
              Every engagement covers the full lifecycle — from the first requirement to long-term maintenance.
            </p>
          </div>
          <div className="appdev-services-grid rv-group">
            {whatWeDo.map((s, i) => (
              <div key={s.label} className="appdev-service-item rv" style={{ "--i": i }}>
                <span className="appdev-service-num">0{i + 1}</span>
                <div className="appdev-service-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Our process</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>How we work</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "52ch" }}>
              Six clear stages. No ambiguity, no surprises — steady delivery from kickoff to launch.
            </p>
          </div>
          <div className="appdev-process-grid rv-group">
            {steps.map((s, i) => (
              <div key={s.n} className="appdev-process-step rv" style={{ "--i": i }}>
                <div className="appdev-process-node">{s.n}</div>
                <div className="appdev-process-title">{s.title}</div>
                <p className="appdev-process-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Results</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>What you can expect</h2>
          </div>
          <div className="appdev-results-grid rv-group">
            {results.map((r, i) => (
              <div key={r} className="appdev-result-card rv" style={{ "--i": i }}>
                <div className="appdev-result-dot">{resultIcons[i]}</div>
                <div className="appdev-result-label">{r}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Tech stack</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>Technologies we use</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "50ch" }}>
              Modern, proven tools chosen for performance, maintainability, and your team's long-term ownership.
            </p>
          </div>
          <div className="appdev-tech-grid rv-group">
            {techStack.map((cat, i) => (
              <div key={cat.cat} className="appdev-tech-col rv" style={{ "--i": i }}>
                <div className="appdev-tech-cat">{cat.cat}</div>
                <div className="appdev-tech-pills">
                  {cat.items.map((item) => (
                    <div key={item} className="appdev-tech-pill">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Sample use case</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>Real results, real client</h2>
          </div>
          <div className="appdev-case-grid rv">
            <div className="appdev-case-left">
              <div className="appdev-case-tag">Fintech</div>
              <div className="appdev-case-title">Legacy system modernisation</div>
              <div className="appdev-case-field">
                <div className="appdev-case-field-label">Challenge</div>
                <div className="appdev-case-field-val">A slow, unreliable legacy platform was causing customer churn and blocking product growth.</div>
              </div>
              <div className="appdev-case-field">
                <div className="appdev-case-field-label">Solution</div>
                <div className="appdev-case-field-val">We rebuilt it as a scalable microservices platform with modern APIs, automated pipelines, and cloud-native deployment.</div>
              </div>
            </div>
            <div className="appdev-case-right">
              <div className="appdev-case-field-label" style={{ marginBottom: 16 }}>Measured outcomes</div>
              <div className="appdev-case-stats">
                <AnimatedStat value={4}  suffix="×" label="Faster performance" />
                <AnimatedStat value={60} suffix="%" label="Less downtime" />
                <AnimatedStat value={38} suffix="%" label="Retention lift" />
              </div>
              <div style={{ padding: "16px 18px", borderRadius: 12, background: "rgba(20,184,166,0.07)", border: "1px solid rgba(20,184,166,0.18)" }}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--muted)", fontStyle: "italic" }}>
                  "The team delivered faster than promised, kept us in the loop every step of the way, and built something we're proud to show our customers."
                </p>
                <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: "var(--teal-2)", letterSpacing: "0.06em" }}>
                  — Engineering Lead, Fintech Client
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="section">
        <div className="container">
          <div className="rv">
            <div className="accent-bar" />
            <div className="kicker">Why choose us</div>
            <h2 className="h2" style={{ marginTop: 8, fontSize: "clamp(1.8rem,3vw,2.2rem)" }}>Built for long-term partnerships</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "50ch" }}>
              We don't just ship and disappear. We align with your culture, timelines, and goals from day one.
            </p>
          </div>
          <div className="appdev-why-grid rv-group">
            {whyUs.map((w, i) => (
              <div key={w.title} className="appdev-why-item rv" style={{ "--i": i }}>
                <div className="appdev-why-check">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8l3.5 3.5L13 4" />
                  </svg>
                </div>
                <div>
                  <div className="appdev-why-title">{w.title}</div>
                  <div className="appdev-why-desc">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA — same .cta-band as Services.jsx ── */}
      <section className="section section--alt">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Let's build your next application.</h2>
              <p className="cta-band__sub">Whether you're starting from scratch or improving an existing system, we'll scope a solution within 48 hours.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/contact">Book a consultation</Link>
              <Link className="btn" to="/about" style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}>About us</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}