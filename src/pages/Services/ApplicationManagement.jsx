import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

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

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── CONTROL PANEL / DASHBOARD VISUAL IDENTITY ── */

/* HERO */
.am-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:20px;
  align-items:center;
}

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
  animation: am-widget-in .6s cubic-bezier(.22,.68,0,1.2) .4s both;
}
@keyframes am-widget-in {
  from { opacity:0; transform: translateY(12px) scale(.95); }
  to   { opacity:1; transform: translateY(0) scale(1); }
}
.am-dash-widget-title { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--muted); margin-bottom:10px }
.am-uptime-bar { display:flex; gap:3px; margin-bottom:8px }
.am-uptime-tick {
  flex:1; height:20px; border-radius:3px;
  background:rgba(20,184,166,.7);
  transform:scaleY(0);
  transform-origin:bottom;
  animation:am-tick-in .25s ease forwards;
  animation-delay: calc(var(--i, 0) * 0.04s + 0.6s);
}
.am-uptime-tick--incident { background:rgba(239,68,68,.6) !important; }
@keyframes am-tick-in { from{transform:scaleY(0);opacity:0} to{transform:scaleY(1);opacity:1} }
.am-dash-status { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted) }
.am-dash-dot { width:8px; height:8px; border-radius:50%; background:#22c55e; animation:am-blink 2s ease-in-out infinite }
@keyframes am-blink { 0%,100%{opacity:1} 50%{opacity:.4} }

/* LIFECYCLE HORIZONTAL TIMELINE */
.am-lifecycle-wrap { margin-top:50px; position:relative; }
.am-lifecycle-track {
  position:absolute;
  top:28px; left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.am-lifecycle-track::after {
  content:'';
  position:absolute;
  top:-1px; left:0;
  width:30px; height:3px;
  background:#14b8a6;
  border-radius:2px;
  box-shadow:0 0 8px #14b8a6;
  animation:am-track-pulse 3s ease-in-out infinite;
}
@keyframes am-track-pulse { 0%{left:0;opacity:1} 80%{left:calc(100% - 30px);opacity:1} 100%{left:calc(100% - 30px);opacity:0} }
.am-lifecycle-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.am-lc-step { text-align:center; position:relative; }
.am-lc-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition: background .3s, transform .3s, box-shadow .3s;
  position:relative;
}
.am-lc-node::after {
  content:'';
  position:absolute; inset:-5px;
  border-radius:50%;
  border:1px solid rgba(20,184,166,.2);
  opacity:0;
  transform:scale(.85);
  transition: opacity .3s, transform .3s;
}
.am-lc-step:hover .am-lc-node { background:rgba(20,184,166,.18); transform:scale(1.12); box-shadow:0 0 24px rgba(20,184,166,.3) }
.am-lc-step:hover .am-lc-node::after { opacity:1; transform:scale(1); }
.am-lc-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.am-lc-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* OPS — 3-col icon cards */
.am-ops { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px; }
.am-op-card {
  padding:28px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition: border-color .25s, transform .25s, box-shadow .25s;
  opacity:0;
  animation: am-card-in .5s ease forwards;
  animation-delay: calc(var(--i, 0) * 120ms + 80ms);
}
@keyframes am-card-in {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
}
.am-op-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-5px); box-shadow:0 16px 40px rgba(20,184,166,.08); }
.am-op-card-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.1);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; margin-bottom:18px;
  transition: background .25s, transform .25s;
}
.am-op-card:hover .am-op-card-icon { background:rgba(20,184,166,.18); transform:scale(1.08); }
.am-op-card h3 { margin:0 0 10px; font-size:17px; font-weight:700 }
.am-op-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* PLATFORMS TAG CLOUD */
.am-platforms { display:flex; flex-wrap:wrap; gap:10px; margin-top:30px; }
.am-platform-tag {
  padding:9px 16px; border-radius:999px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.09);
  font-size:13px; font-weight:500;
  transition: background .2s, border-color .2s, color .2s, transform .2s;
}
.am-platform-tag:hover { background:rgba(20,184,166,.12); border-color:rgba(20,184,166,.4); color:#2dd4bf; transform:translateY(-2px); }

/* DELIVERY APPROACH CARDS */
.am-approach-card {
  padding:28px 24px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  position:relative;
  overflow:hidden;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.am-approach-card::before {
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:linear-gradient(180deg,#14b8a6,#22c55e);
  transform:scaleY(0);
  transform-origin:bottom;
  transition:transform .3s ease;
}
.am-approach-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px); box-shadow:0 12px 36px rgba(20,184,166,.08); }
.am-approach-card:hover::before { transform:scaleY(1); }

/* RESPONSIVE */
@media(max-width:1000px) {
  .am-hero { grid-template-columns:1fr }
  .am-ops { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .am-lifecycle-row { grid-template-columns:1fr 1fr }
  .am-lifecycle-track { display:none }
}
`;

// ── PAGE ─────────────────────────────────────────

// Which tick index to show as the incident (red) tick
const INCIDENT_TICK = 27;

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
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 700, textAlign: "justify" }}>
              Providing application management and support services for new and existing applications. We resolve technical and functional issues as needed, keeping your systems running reliably so your teams stay focused on delivering value.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Talk to us</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* Hero image + animated widget */}
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
                  <div
                    key={i}
                    className={`am-uptime-tick${i === INCIDENT_TICK ? " am-uptime-tick--incident" : ""}`}
                    style={{ "--i": i }}
                  />
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
          <p className="lead reveal" style={{ marginTop: 10 }}>
            We work across the full stack — from frontend SPA to backend microservices to cloud data pipelines.
          </p>

          <div className="am-platforms reveal">
            {platforms.map(p => (
              <div key={p} className="am-platform-tag">{p}</div>
            ))}
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
              <div key={step.n} className="am-approach-card" style={{ "--i": i }}>
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