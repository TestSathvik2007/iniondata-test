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

const plans = [
  {
    name: "Essential",
    cadence: "Monthly",
    features: ["Scheduled maintenance windows", "Bug fix SLA: 72h", "Security patch deployment", "Monthly health report"],
    accent: "rgba(20,184,166,.08)",
  },
  {
    name: "Standard",
    cadence: "Weekly",
    features: ["Priority bug queue", "Bug fix SLA: 24h", "Performance monitoring", "Weekly status updates", "Dependency management"],
    accent: "rgba(34,197,94,.1)",
    highlight: true,
  },
  {
    name: "Premium",
    cadence: "Continuous",
    features: ["24/7 incident response", "Bug fix SLA: 4h", "Proactive monitoring", "Dedicated engineer", "Daily stand-up available", "SLA-backed uptime"],
    accent: "rgba(20,184,166,.12)",
  },
];

const metrics = [
  { value: "99.9%", label: "Target uptime SLA" },
  { value: "< 4h", label: "P1 response time" },
  { value: "60%", label: "Fewer production incidents" },
  { value: "3×", label: "Faster mean time to resolve" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── PULSE / HEARTBEAT VISUAL IDENTITY ── */

/* HERO — two-col with lottie right */
.amn-hero {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
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
  overflow:hidden;
}
.amn-ecg svg { width:100%; height:100%; }
.amn-ecg-line {
  stroke-dasharray:600;
  stroke-dashoffset:600;
  animation:amn-draw 2.5s ease forwards;
}
@keyframes amn-draw { to { stroke-dashoffset:0 } }

/* METRICS STRIP */
.amn-metrics-strip {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1px;
  background:rgba(255,255,255,.07);
  border-radius:20px;
  overflow:hidden;
  margin-top:60px;
}
.amn-metric-cell {
  padding:28px 20px;
  text-align:center;
  background:rgba(7,16,14,1);
  transition:.25s;
}
.amn-metric-cell:hover { background:rgba(20,184,166,.07) }
.amn-metric-val {
  font-size:36px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.amn-metric-lbl { font-size:12px; color:var(--muted); margin-top:4px; line-height:1.4 }

/* SERVICES — alternate layout: icon + content */
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
  transition:.25s;
}
.amn-service-row:hover {
  background:rgba(20,184,166,.05);
  border-color:rgba(20,184,166,.25);
  transform:translateX(4px);
}
.amn-service-icon {
  width:56px; height:56px;
  border-radius:14px;
  background:rgba(20,184,166,.1);
  border:1px solid rgba(20,184,166,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:24px;
  flex-shrink:0;
}
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
}
@keyframes amn-pulse-move { 0%{left:0;opacity:1} 80%{left:70%;opacity:1} 100%{left:70%;opacity:0} }
.amn-lifecycle-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.amn-lc-step { text-align:center; }
.amn-lc-circle {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.amn-lc-step:hover .amn-lc-circle { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.25) }
.amn-lc-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.amn-lc-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* PLANS */
.amn-plans {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
  align-items:start;
}
.amn-plan {
  border-radius:22px;
  border:1px solid rgba(255,255,255,.08);
  overflow:hidden;
  transition:.3s;
}
.amn-plan:hover { transform:translateY(-6px); }
.amn-plan-head {
  padding:28px 28px 20px;
  border-bottom:1px solid rgba(255,255,255,.07);
}
.amn-plan-name { font-size:20px; font-weight:800; margin-bottom:4px }
.amn-plan-cadence {
  display:inline-block;
  padding:3px 10px; border-radius:999px;
  font-size:11px; font-weight:600;
  background:rgba(20,184,166,.15);
  border:1px solid rgba(20,184,166,.3);
  color:#2dd4bf;
}
.amn-plan-body { padding:24px 28px 30px; }
.amn-plan-body ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:10px }
.amn-plan-body li {
  display:flex; align-items:flex-start; gap:10px;
  font-size:14px; color:var(--muted);
}
.amn-plan-body li::before {
  content:'✓';
  color:#14b8a6;
  font-weight:700;
  flex-shrink:0;
  margin-top:1px;
}
.amn-plan--highlight {
  border-color:rgba(20,184,166,.4);
  box-shadow:0 0 40px rgba(20,184,166,.1);
  transform:translateY(-8px);
}

/* CASE STUDY */
.amn-case {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.amn-case-content {
  padding:48px 44px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.amn-case-content h2 { font-size:24px; font-weight:800; margin:0 0 14px }
.amn-case-content p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 22px }
.amn-case-content li { font-size:14px; color:var(--muted); margin-bottom:8px }
.amn-case-content li strong { color:#2dd4bf }
.amn-case-img { position:relative; min-height:320px; }
.amn-case-img img { width:100%; height:100%; object-fit:cover; display:block; }
.amn-case-img::before {
  content:'';
  position:absolute; inset:0; z-index:1;
  background:linear-gradient(to right,rgba(7,16,14,.9) 0%,transparent 50%);
}

/* RESPONSIVE */
@media(max-width:1000px) {
  .amn-hero { grid-template-columns:1fr }
  .amn-lottie-wrap { display:none }
  .amn-metrics-strip { grid-template-columns:1fr 1fr }
  .amn-plans { grid-template-columns:1fr }
  .amn-plan--highlight { transform:none }
  .amn-case { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .amn-lifecycle-row { grid-template-columns:1fr 1fr }
  .amn-lifecycle-track { display:none }
  .amn-metrics-strip { grid-template-columns:1fr }
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
            <div className="kicker reveal">Application Maintenance</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Your app, always{" "}
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                at its best.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 500 }}>
              Production systems degrade without attention. We handle the monitoring,
              patching, performance tuning, and incident response so your team stays focused on building, not firefighting.
            </p>

            {/* ECG line */}
            <div className="amn-ecg reveal" style={{ marginTop: 24, marginBottom: 24 }}>
              <svg viewBox="0 0 600 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  className="amn-ecg-line"
                  d="M0 20 L80 20 L100 5 L120 35 L140 5 L160 20 L240 20 L260 10 L280 30 L300 10 L320 20 L400 20 L420 8 L440 32 L460 8 L480 20 L600 20"
                  stroke="#14b8a6" strokeWidth="2" strokeLinecap="round" fill="none"
                />
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

        {/* Metrics strip */}
        <div className="container">
          <div className="amn-metrics-strip reveal">
            {metrics.map(m => (
              <div key={m.label} className="amn-metric-cell">
                <div className="amn-metric-val">{m.value}</div>
                <div className="amn-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What's included</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
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

      {/* PLANS */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Pricing</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Support plans</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 520 }}>
            Pick the level of coverage that matches your team's risk tolerance and release cadence.
          </p>

          <div className="amn-plans">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`amn-plan reveal ${plan.highlight ? "amn-plan--highlight" : ""}`}
                style={{ background: plan.accent, "--i": i }}
              >
                <div className="amn-plan-head">
                  <div className="amn-plan-name">{plan.name}</div>
                  <div className="amn-plan-cadence">{plan.cadence}</div>
                </div>
                <div className="amn-plan-body">
                  <ul>
                    {plan.features.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <div style={{ marginTop: 24 }}>
                    <Link className="btn btn--primary" to="/contact" style={{ width: "100%", justifyContent: "center" }}>
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>From 40% downtime to 99.9% uptime</h2>

          <div className="amn-case reveal">
            <div className="amn-case-content">
              <div className="kicker" style={{ marginBottom: 16 }}>SaaS · B2B Platform</div>
              <h2>A recurring-incident nightmare, solved.</h2>
              <p>
                A B2B SaaS company was experiencing weekly production incidents — each one requiring
                all-hands war rooms lasting 4–6 hours. Their on-call rotation was burning out the team.
                We implemented proactive monitoring, an incident runbook, and a structured maintenance cadence.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li><strong>50% fewer</strong> production incidents in month one</li>
                <li>Mean time to resolve dropped from <strong>4h to 35min</strong></li>
                <li><strong>Zero P1 incidents</strong> in the following quarter</li>
                <li>Engineering team reclaimed <strong>12h/week</strong> of on-call burden</li>
              </ul>
            </div>
            <div className="amn-case-img">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75"
                alt="Monitoring dashboard"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
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