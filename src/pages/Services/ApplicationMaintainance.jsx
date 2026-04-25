import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const services = [
  {
    title: "Proactive Bug Resolution",
    desc: "We don't wait for your users to report issues. Automated error tracking (Sentry, Datadog) catches exceptions before they escalate, with root-cause analysis and same-sprint fixes.",
    icon: "🐛",
  },
  {
    title: "Performance Tuning",
    desc: "Slow queries, memory leaks, bloated bundles — we profile at every layer and ship measurable improvements. Lighthouse scores, Core Web Vitals, and APM metrics all move in the right direction.",
    icon: "⚡",
  },
  {
    title: "Security & Dependency Hygiene",
    desc: "CVE scanning, Dependabot automation, and quarterly security reviews keep your application hardened against evolving threats — without disrupting your team.",
    icon: "🔒",
  },
  {
    title: "Feature Iterations",
    desc: "Maintenance isn't just keeping the lights on. We run controlled feature sprints alongside your stable baseline, so your product keeps growing while staying rock-solid.",
    icon: "🚀",
  },
];

const lifecycle = [
  { label: "Monitor", desc: "24/7 automated health checks, uptime pings, and error rate tracking" },
  { label: "Detect", desc: "Anomaly detection surfaces issues before users notice them" },
  { label: "Triage", desc: "Severity classification and on-call escalation in minutes" },
  { label: "Fix", desc: "Root-cause analysis, patch, and staged rollout" },
  { label: "Verify", desc: "Post-deploy smoke tests and regression checks before sign-off" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── PULSE / HEARTBEAT VISUAL IDENTITY ── */

/* HERO — two-col */
.amn-hero {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  align-items:center;
}
.amn-lottie-wrap {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}
.amn-lottie-wrap img { width:100%; border-radius:20px; display:block; }

/* ECG LINE ornament */
.amn-ecg {
  margin-top:32px;
  height:40px;
  position:relative;
  overflow:visible;
}
.amn-ecg svg { width:100%; height:100%; overflow:visible; }
.amn-ecg-line {
  stroke-dasharray:700;
  stroke-dashoffset:700;
  animation:amn-draw 2.2s cubic-bezier(.4,0,.2,1) .3s forwards;
}
@keyframes amn-draw { to { stroke-dashoffset:0 } }

/* Travelling pulse dot along ECG */
.amn-ecg-travel-dot {
  offset-path: path("M0 20 L80 20 L100 5 L120 35 L140 5 L160 20 L240 20 L260 10 L280 30 L300 10 L320 20 L400 20 L420 8 L440 32 L460 8 L480 20 L600 20");
  offset-rotate: 0deg;
  fill: #14b8a6;
  filter: drop-shadow(0 0 4px #14b8a6) drop-shadow(0 0 8px rgba(20,184,166,.5));
  opacity: 0;
  animation: amn-dot-travel 2.2s cubic-bezier(.4,0,.2,1) .3s forwards;
}
@keyframes amn-dot-travel {
  0%   { offset-distance: 0%; opacity: 1; }
  90%  { offset-distance: 90%; opacity: 1; }
  100% { offset-distance: 100%; opacity: 0; }
}

/* SERVICES — alternate layout */
.amn-service-list { margin-top:40px; display:flex; flex-direction:column; gap:2px; }
.amn-service-row {
  display:grid;
  grid-template-columns:72px 1fr;
  gap:24px;
  align-items:start;
  padding:28px 24px;
  border-radius:16px;
  background:rgba(255,255,255,.025);
  border:1px solid rgba(255,255,255,.06);
  transition: background .25s, border-color .25s, transform .25s;
  opacity: 0;
  animation: amn-row-in .5s ease forwards;
  animation-delay: calc(var(--i, 0) * 110ms + 80ms);
}
@keyframes amn-row-in {
  from { opacity:0; transform: translateX(-12px); }
  to   { opacity:1; transform: translateX(0); }
}
.amn-service-row:hover {
  background:rgba(20,184,166,.05);
  border-color:rgba(20,184,166,.25);
  transform:translateX(6px);
}
.amn-service-icon {
  width:56px; height:56px;
  border-radius:14px;
  background:rgba(20,184,166,.1);
  border:1px solid rgba(20,184,166,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:24px;
  flex-shrink:0;
  transition: background .25s, transform .25s;
}
.amn-service-row:hover .amn-service-icon { background:rgba(20,184,166,.18); transform:scale(1.08); }
.amn-service-row h3 { margin:0 0 8px; font-size:17px; font-weight:700 }
.amn-service-row p { margin:0; font-size:14px; color:var(--muted); line-height:1.65 }

/* LIFECYCLE */
.amn-lifecycle { margin-top:50px; position:relative; }
.amn-lifecycle-track {
  position:absolute;
  top:28px; left:10%; right:10%;
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.amn-lifecycle-pulse {
  position:absolute;
  top:-1px; left:0;
  width:30px; height:3px;
  background:#14b8a6;
  animation:amn-pulse-move 3s ease-in-out infinite;
  border-radius:2px;
  box-shadow: 0 0 8px #14b8a6;
}
@keyframes amn-pulse-move { 0%{left:0;opacity:1} 80%{left:calc(100% - 30px);opacity:1} 100%{left:calc(100% - 30px);opacity:0} }
.amn-lifecycle-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.amn-lc-step { text-align:center; }
.amn-lc-circle {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition: background .3s, transform .3s, box-shadow .3s;
  position:relative;
}
.amn-lc-circle::after {
  content:'';
  position:absolute; inset:-5px;
  border-radius:50%;
  border:1px solid rgba(20,184,166,.2);
  opacity:0;
  transform:scale(.85);
  transition: opacity .3s, transform .3s;
}
.amn-lc-step:hover .amn-lc-circle { background:rgba(20,184,166,.18); transform:scale(1.12); box-shadow:0 0 24px rgba(20,184,166,.25) }
.amn-lc-step:hover .amn-lc-circle::after { opacity:1; transform:scale(1); }
.amn-lc-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.amn-lc-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* DELIVERY APPROACH CARDS */
.amn-approach-card {
  padding:28px 24px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  position:relative;
  overflow:hidden;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.amn-approach-card::before {
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:linear-gradient(180deg,#14b8a6,#22c55e);
  transform:scaleY(0);
  transform-origin:bottom;
  transition:transform .3s ease;
}
.amn-approach-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px); box-shadow:0 12px 36px rgba(20,184,166,.08); }
.amn-approach-card:hover::before { transform:scaleY(1); }

/* RESPONSIVE */
@media(max-width:1000px) {
  .amn-hero { grid-template-columns:1fr }
  .amn-lottie-wrap { display:none }
}
@media(max-width:700px) {
  .amn-lifecycle-row { grid-template-columns:1fr 1fr }
  .amn-lifecycle-track { display:none }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationMaintenance() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container amn-hero">
          <div>
            <div className="kicker reveal">Service</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Application Maintenance
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 700, textAlign: "justify" }}>
              Conducting reviews to ensure standards and requirements are being met, while ensuring systems are performing optimally. We proactively monitor, patch, and tune your applications so your engineering team stays focused on building — not firefighting.
            </p>

            {/* ECG line with travelling dot */}
            <div className="amn-ecg reveal" style={{ marginTop: 24, marginBottom: 24, position: "relative" }}>
              <svg viewBox="0 0 600 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
                <path
                  className="amn-ecg-line"
                  d="M0 20 L80 20 L100 5 L120 35 L140 5 L160 20 L240 20 L260 10 L280 30 L300 10 L320 20 L400 20 L420 8 L440 32 L460 8 L480 20 L600 20"
                  stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" fill="none"
                />
                <circle className="amn-ecg-travel-dot" cx="0" cy="0" r="4" />
              </svg>
            </div>

            <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Get a maintenance plan</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="amn-lottie-wrap reveal">
            <img
              src="https://images.unsplash.com/photo-1573495627361-d9b87960b12d?w=700&q=75"
              alt="Application monitoring"
              loading="lazy"
              style={{ width: "100%", borderRadius: 20, display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What's included</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
            Maintenance isn't just bug fixes. It's a continuous practice that keeps your system healthy, fast, and secure.
          </p>

          <div className="amn-service-list">
            {services.map((s, i) => (
              <div key={s.title} className="amn-service-row reveal" style={{ "--i": i }}>
                <div className="amn-service-icon">{s.icon}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFECYCLE */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Lifecycle</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How incidents are handled</h2>

          <div className="amn-lifecycle reveal">
            <div className="amn-lifecycle-track">
              <div className="amn-lifecycle-pulse" />
            </div>
            <div className="amn-lifecycle-row">
              {lifecycle.map((l, i) => (
                <div key={l.label} className="amn-lc-step">
                  <div className="amn-lc-circle">0{i + 1}</div>
                  <h4>{l.label}</h4>
                  <p>{l.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY APPROACH */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
            Every InionData engagement follows the same proven four-step model — so you always know
            where things stand and what comes next.
          </p>

          <div className="reveal grid grid-4" style={{ marginTop: 40, gap: 16 }}>
            {[
              { n: "01", title: "Discovery & Assessment", desc: "We analyse your current landscape, challenges, and business goals — through stakeholder interviews, technical audits, and scope definition." },
              { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof architecture tailored to your business — with a phased delivery plan, tech stack selection, and risk mapping." },
              { n: "03", title: "Build & Implement", desc: "We develop applications, pipelines, integrations, and governance frameworks in structured sprints with weekly stakeholder updates." },
              { n: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your solution as your needs grow — with performance tracking, continuous improvement, and post-delivery support." },
            ].map((step, i) => (
              <div key={step.n} className="amn-approach-card" style={{ "--i": i }}>
                <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1, color: "rgba(20,184,166,.18)", marginBottom: 16, letterSpacing: "-0.04em" }}>
                  {step.n}
                </div>
                <h3 style={{ margin: "0 0 10px", fontSize: 16, fontWeight: 700 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 13, color: "var(--muted)", lineHeight: 1.65 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band reveal">
            <h2>We'll keep your system healthy.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              View maintenance plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}