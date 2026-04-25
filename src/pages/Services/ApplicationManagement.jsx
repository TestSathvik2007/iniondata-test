import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

// const capabilities = [
//   {
//     title: "24/7 Uptime Monitoring",
//     desc: "Synthetic checks, real-user monitoring, and alerting pipelines that wake our engineers — not yours — when something breaks at 2 AM.",
//     icon: "📡",
//     stat: "99.95%",
//     statLabel: "avg uptime",
//   },
//   {
//     title: "Incident Management",
//     desc: "Structured runbooks, escalation paths, and post-mortems. Every incident is a learning event — we document root causes and close gaps to prevent recurrence.",
//     icon: "🚨",
//     stat: "< 15min",
//     statLabel: "MTTA",
//   },
//   {
//     title: "Performance Optimisation",
//     desc: "From slow database queries to oversized JS bundles — we instrument, profile, and fix. Measurable improvements tracked against your baseline each sprint.",
//     icon: "📈",
//     stat: "40%",
//     statLabel: "avg perf gain",
//   },
//   {
//     title: "Release & Change Management",
//     desc: "Controlled deployments with feature flags, rollback capabilities, and change advisory boards. We de-risk every release so your team ships with confidence.",
//     icon: "🚢",
//     stat: "0",
//     statLabel: "rollback failures",
//   },
// ];

const lifecycle = [
  { title: "Onboarding", desc: "System audit, runbook creation, alert configuration" },
  { title: "Monitoring", desc: "Continuous tracking with intelligent noise reduction" },
  { title: "Maintenance", desc: "Scheduled windows, patching, dependency updates" },
  { title: "Optimisation", desc: "Performance profiling and architectural improvements" },
  { title: "Scaling", desc: "Load testing, capacity planning, autoscaling policies" },
];

const ops = [
  {
    title: "Automated Alerting",
    desc: "PagerDuty / OpsGenie integration with on-call rotations. Alerts are contextual — we suppress noise and escalate only what matters.",
    icon: "🔔",
  },
  {
    title: "Self-healing Infrastructure",
    desc: "Circuit breakers, health-check restarts, and failover automation reduce downtime before a human ever gets paged.",
    icon: "🔄",
  },
  {
    title: "Security & Compliance",
    desc: "OWASP scanning, dependency audits, quarterly pen-test readiness reviews, and audit log management for regulated industries.",
    icon: "🛡️",
  },
];

const platforms = [
  "React / Next.js", "Node.js APIs", "Python / Django", "Mobile (iOS & Android)",
  "Microservices", "Cloud Functions", "Data Pipelines", "Enterprise SaaS",
  "Kubernetes Clusters", "PostgreSQL / MongoDB",
];

const testimonialMetrics = [
  { value: "99.95%", label: "Uptime achieved" },
  { value: "70%", label: "Faster incident resolution" },
  { value: "12h/wk", label: "Eng time reclaimed" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── CONTROL PANEL / DASHBOARD VISUAL IDENTITY ── */

/* HERO — full-width with lottie panel right */
.am-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
}

/* Bento-style capability cards */
.am-caps {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
  margin-top:40px;
}
.am-cap-card {
  padding:30px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s var(--ease);
  position:relative;
  overflow:hidden;
}
.am-cap-card::after {
  content:'';
  position:absolute;
  inset:0;
  background:radial-gradient(circle at top left,rgba(20,184,166,.1),transparent 60%);
  opacity:0;
  transition:.3s;
}
.am-cap-card:hover { transform:translateY(-5px); border-color:rgba(20,184,166,.3); }
.am-cap-card:hover::after { opacity:1 }
.am-cap-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px }
.am-cap-icon { font-size:28px }
.am-cap-stat { text-align:right }
.am-cap-stat-val { font-size:22px; font-weight:800; color:#14b8a6 }
.am-cap-stat-lbl { font-size:11px; color:var(--muted) }
.am-cap-card h3 { margin:0 0 10px; font-size:17px; font-weight:700 }
.am-cap-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* LOTTIE panel */
.am-lottie-panel {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}
.am-lottie-panel lottie-player { width:100%; max-width:440px; }

/* Fake dashboard widget on hero */
.am-dash-widget {
  position:absolute;
  bottom:16px; right:0;
  background:rgba(12,26,22,.95);
  border:1px solid rgba(20,184,166,.25);
  border-radius:16px;
  padding:16px 20px;
  min-width:200px;
  backdrop-filter:blur(8px);
}
.am-dash-widget-title { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:10px }
.am-uptime-bar { display:flex; gap:3px; margin-bottom:8px }
.am-uptime-tick {
  flex:1; height:20px; border-radius:3px;
  background:rgba(20,184,166,.7);
  animation:am-tick-in .3s ease backwards;
}
.am-uptime-tick:nth-child(28) { background:rgba(239,68,68,.6) }
.am-uptime-tick:nth-child(n) { animation-delay:calc(var(--i,0) * 0.03s) }
.am-dash-status { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted) }
.am-dash-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:am-blink 2s ease-in-out infinite }
@keyframes am-blink { 0%,100%{opacity:1} 50%{opacity:.4} }
@keyframes am-tick-in { from{transform:scaleY(0);opacity:0} to{transform:scaleY(1);opacity:1} }

/* LIFECYCLE HORIZONTAL TIMELINE */
.am-lifecycle-wrap { margin-top:50px; position:relative; }
.am-lifecycle-track {
  position:absolute;
  top:28px; left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.am-lifecycle-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.am-lc-step { text-align:center; position:relative; }
.am-lc-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.am-lc-step:hover .am-lc-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.am-lc-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.am-lc-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* OPS — 3-col icon cards */
.am-ops { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px; }
.am-op-card {
  padding:28px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.25s;
}
.am-op-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px) }
.am-op-card-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.1);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; margin-bottom:18px;
}
.am-op-card h3 { margin:0 0 10px; font-size:17px; font-weight:700 }
.am-op-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* PLATFORMS TAG CLOUD */
.am-platforms { display:flex; flex-wrap:wrap; gap:10px; margin-top:30px; }
.am-platform-tag {
  padding:9px 16px; border-radius:999px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.09);
  font-size:13px; font-weight:500;
  transition:.2s;
}
.am-platform-tag:hover { background:rgba(20,184,166,.12); border-color:rgba(20,184,166,.4); color:#2dd4bf }

/* CASE STUDY */
.am-case {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.am-case-img { position:relative; min-height:300px; }
.am-case-img img { width:100%; height:100%; object-fit:cover; display:block; }
.am-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95) 100%);
}
.am-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.am-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.am-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 24px }
.am-case-metrics { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
.am-case-metric { text-align:center; padding:16px 10px; border-radius:14px; background:rgba(20,184,166,.08); border:1px solid rgba(20,184,166,.2) }
.am-case-metric-val { font-size:22px; font-weight:800; color:#14b8a6 }
.am-case-metric-lbl { font-size:11px; color:var(--muted); margin-top:3px }

/* RESPONSIVE */
@media(max-width:1000px) {
  .am-hero { grid-template-columns:1fr }
  .am-lottie-panel { display:none }
  .am-caps { grid-template-columns:1fr }
  .am-ops { grid-template-columns:1fr }
  .am-case { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .am-lifecycle-row { grid-template-columns:1fr 1fr }
  .am-lifecycle-track { display:none }
  .am-case-metrics { grid-template-columns:1fr }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationManagement() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container am-hero">
          <div>
            <div className="kicker reveal">Service</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Application Management and Support
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Providing application management and support services for new and existing applications. We resolve technical and functional issues as needed, keeping your systems running reliably so your teams stay focused on delivering value.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Talk to us</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* Hero image + fake widget */}
          <div className="am-lottie-panel reveal" style={{ position: "relative" }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75"
              alt="Application monitoring"
              loading="lazy"
              style={{ width: "100%", borderRadius: 20, display: "block" }}
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="am-dash-widget">
              <div className="am-dash-widget-title">System status · Live</div>
              <div className="am-uptime-bar">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="am-uptime-tick" style={{ "--i": i, opacity: i === 27 ? 0.5 : 1 }} />
                ))}
              </div>
              <div className="am-dash-status">
                <div className="am-dash-dot" />
                All systems operational
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we manage</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>
            From the first alert to the post-mortem — we own the reliability of your application end-to-end.
          </p>

          <div className="am-caps">
            {capabilities.map((c, i) => (
              <div key={c.title} className="am-cap-card reveal" style={{ "--i": i }}>
                <div className="am-cap-top">
                  <div className="am-cap-icon">{c.icon}</div>
                  <div className="am-cap-stat">
                    <div className="am-cap-stat-val">{c.stat}</div>
                    <div className="am-cap-stat-lbl">{c.statLabel}</div>
                  </div>
                </div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* LIFECYCLE */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Lifecycle</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we onboard and operate</h2>

          <div className="am-lifecycle-wrap reveal">
            <div className="am-lifecycle-track" />
            <div className="am-lifecycle-row">
              {lifecycle.map((l, i) => (
                <div key={l.title} className="am-lc-step">
                  <div className="am-lc-node">0{i + 1}</div>
                  <h4>{l.title}</h4>
                  <p>{l.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Operations</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Reliability engineering</h2>

          <div className="am-ops">
            {ops.map((o, i) => (
              <div key={o.title} className="am-op-card reveal" style={{ "--i": i }}>
                <div className="am-op-card-icon">{o.icon}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Coverage</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Platforms we manage</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 520 }}>
            We work across the full stack — from frontend SPA to backend microservices to cloud data pipelines.
          </p>

          <div className="am-platforms reveal">
            {platforms.map(p => (
              <div key={p} className="am-platform-tag">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>99.95% uptime for a global SaaS product</h2>

          <div className="am-case reveal">
            <div className="am-case-img">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75"
                alt="Dashboard monitoring"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="am-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>Enterprise SaaS</div>
              <h2>From monthly outages to a year of clean operations</h2>
              <p>
                A global SaaS company with users across 14 time zones was experiencing monthly
                degradations and inconsistent performance. We took over management with a full
                observability stack, automation runbooks, and a dedicated on-call structure.
              </p>
              <div className="am-case-metrics">
                {testimonialMetrics.map(m => (
                  <div key={m.label} className="am-case-metric">
                    <div className="am-case-metric-val">{m.value}</div>
                    <div className="am-case-metric-lbl">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* DELIVERY APPROACH */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
            Every InionData engagement follows the same proven four-step model — so you always know
            where things stand and what comes next.
          </p>

          <div className="reveal" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[
              { n: "01", title: "Discovery & Assessment", desc: "We analyse your current landscape, challenges, and business goals — through stakeholder interviews, technical audits, and scope definition." },
              { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof architecture tailored to your business — with a phased delivery plan, tech stack selection, and risk mapping." },
              { n: "03", title: "Build & Implement", desc: "We develop applications, pipelines, integrations, and governance frameworks in structured sprints with weekly stakeholder updates." },
              { n: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your solution as your needs grow — with performance tracking, continuous improvement, and post-delivery support." },
            ].map((step, i) => (
              <div key={step.n} style={{
                padding: "28px 24px",
                borderRadius: 20,
                background: "rgba(255,255,255,.04)",
                border: "1px solid rgba(255,255,255,.07)",
                position: "relative",
                transition: ".25s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(20,184,166,.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"}
              >
                <div style={{
                  fontSize: 48, fontWeight: 800, lineHeight: 1,
                  color: "rgba(20,184,166,.18)",
                  marginBottom: 16,
                  letterSpacing: "-0.04em",
                }}>
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
      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>We'll own the reliability. You own the roadmap.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}