import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const advisory = [
  {
    title: "Architecture Review",
    desc: "We audit your current system design against your growth trajectory — identifying hidden risks in scalability, coupling, and data boundaries before they become production crises.",
    num: "01",
  },
  {
    title: "Technology Selection",
    desc: "Frameworks, cloud vendors, data stores — every choice carries long-term cost. We run structured evaluations grounded in your team's skills, your budget, and your 5-year plan.",
    num: "02",
  },
  {
    title: "Feasibility & Trade-off Analysis",
    desc: "Build vs. buy, rewrite vs. refactor, monolith vs. microservices. We map out the realistic costs, timelines, and risks of each path — so leadership can decide with full information.",
    num: "03",
  },
  {
    title: "Roadmap Planning",
    desc: "We translate technical decisions into a sequenced delivery plan your board and engineering team can both read — prioritised by risk, dependency, and business impact.",
    num: "04",
  },
];

const approach = [
  { label: "Discover", desc: "Stakeholder interviews, codebase audit, system mapping" },
  { label: "Evaluate", desc: "Deep review of current architecture and constraints" },
  { label: "Analyse", desc: "Trade-off modelling across cost, risk, and capability" },
  { label: "Recommend", desc: "Prioritised options with clear rationale and next steps" },
  { label: "Align", desc: "Stakeholder workshops to build shared understanding" },
];

const evaluationAreas = [
  {
    title: "Scalability",
    desc: "Can your system handle 10×, 100× traffic? We stress-test assumptions against load models and growth projections.",
    icon: "📊",
  },
  {
    title: "Security Posture",
    desc: "Threat modelling, OWASP gap analysis, and zero-trust readiness — aligned with your compliance obligations.",
    icon: "🛡️",
  },
  {
    title: "Operational Cost",
    desc: "Cloud spend, staffing overhead, and tooling licenses mapped against outcome. We find where you're overpaying.",
    icon: "💰",
  },
  {
    title: "Team Capability",
    desc: "The best architecture is the one your team can actually operate. We align recommendations to real skills on the ground.",
    icon: "👥",
  },
];

const deliverables = [
  "Architecture Decision Records (ADRs)",
  "System diagram with identified risks annotated",
  "Technology evaluation scorecard",
  "Phased implementation roadmap",
  "Stakeholder-ready executive summary",
  "Follow-up Q&A session included",
];

const metrics = [
  { value: "40%", label: "Average infrastructure cost reduction" },
  { value: "2×", label: "Faster stakeholder alignment" },
  { value: "6wk", label: "Average engagement length" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── BLUEPRINT / STRATEGIC ADVISORY VISUAL IDENTITY ── */

/* Blueprint grid background */
.cs-page { position:relative; }
.cs-blueprint-bg {
  position:fixed;
  inset:0;
  background-image:
    linear-gradient(rgba(20,184,166,.025) 1px,transparent 1px),
    linear-gradient(90deg,rgba(20,184,166,.025) 1px,transparent 1px);
  background-size:60px 60px;
  pointer-events:none;
  z-index:0;
}

/* HERO — editorial left-heavy */
.cs-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
}
.cs-hero-badge {
  display:inline-flex;
  align-items:center;
  gap:10px;
  padding:10px 18px;
  border-radius:12px;
  background:rgba(20,184,166,.08);
  border:1px solid rgba(20,184,166,.2);
  font-size:13px;
  font-weight:600;
  color:#2dd4bf;
  margin-bottom:24px;
}
.cs-hero-badge-dot { width:8px; height:8px; border-radius:50%; background:#14b8a6; animation:cs-blink 2s infinite }
@keyframes cs-blink { 0%,100%{opacity:1} 50%{opacity:.3} }

.cs-lottie-col {
  position:relative;
  display:flex; align-items:center; justify-content:center;
}
.cs-lottie-col lottie-player { max-width:440px; width:100% }

/* ADVISORY — numbered editorial list */
.cs-advisory { margin-top:50px; display:flex; flex-direction:column; gap:0; }
.cs-advisory-row {
  display:grid;
  grid-template-columns:80px 1fr;
  gap:24px;
  padding:30px 0;
  border-bottom:1px solid rgba(255,255,255,.07);
  transition:.25s;
  align-items:start;
}
.cs-advisory-row:first-child { border-top:1px solid rgba(255,255,255,.07) }
.cs-advisory-row:hover { padding-left:8px; }
.cs-advisory-num {
  font-size:48px;
  font-weight:800;
  color:rgba(20,184,166,.25);
  line-height:1;
  transition:.25s;
}
.cs-advisory-row:hover .cs-advisory-num { color:rgba(20,184,166,.6) }
.cs-advisory-row h3 { margin:0 0 10px; font-size:18px; font-weight:700 }
.cs-advisory-row p { margin:0; font-size:14px; color:var(--muted); line-height:1.7 }

/* PROCESS */
.cs-process-wrap { margin-top:50px; position:relative; }
.cs-process-track {
  position:absolute; top:28px;
  left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.cs-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.cs-step { text-align:center; }
.cs-step-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.cs-step:hover .cs-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.cs-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.cs-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* EVALUATION AREAS — 2x2 grid */
.cs-eval {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
  margin-top:40px;
}
.cs-eval-card {
  padding:28px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s;
}
.cs-eval-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px) }
.cs-eval-icon { font-size:28px; margin-bottom:14px }
.cs-eval-card h3 { margin:0 0 10px; font-size:17px; font-weight:700 }
.cs-eval-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* DELIVERABLES — compact checklist */
.cs-deliverables {
  margin-top:40px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}
.cs-deliverable {
  display:flex; align-items:flex-start; gap:12px;
  padding:16px 20px;
  border-radius:14px;
  background:rgba(20,184,166,.06);
  border:1px solid rgba(20,184,166,.15);
  font-size:14px;
  font-weight:500;
  transition:.2s;
}
.cs-deliverable:hover { background:rgba(20,184,166,.1) }
.cs-deliverable::before { content:'✓'; color:#14b8a6; font-weight:700; flex-shrink:0; margin-top:1px }

/* METRICS */
.cs-metrics {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.cs-metric {
  padding:32px 24px;
  text-align:center;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.cs-metric:hover { border-color:rgba(20,184,166,.3); background:rgba(20,184,166,.06) }
.cs-metric-val {
  font-size:44px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.cs-metric-lbl { font-size:13px; color:var(--muted); margin-top:6px }

/* CASE STUDY */
.cs-case {
  display:grid;
  grid-template-columns:1fr 1.2fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.cs-case-img { position:relative; min-height:300px; }
.cs-case-img img { width:100%; height:100%; object-fit:cover; display:block; }
.cs-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95));
}
.cs-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.cs-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.cs-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 20px }
.cs-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.cs-case-body li strong { color:#2dd4bf }

/* RESPONSIVE */
@media(max-width:1000px) {
  .cs-hero { grid-template-columns:1fr }
  .cs-lottie-col { display:none }
  .cs-eval { grid-template-columns:1fr }
  .cs-deliverables { grid-template-columns:1fr }
  .cs-metrics { grid-template-columns:1fr }
  .cs-case { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .cs-process-row { grid-template-columns:1fr 1fr }
  .cs-process-track { display:none }
  .cs-advisory-num { font-size:32px }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ConsultingServices() {
  useReveal();

  return (
    <div className="cs-page">
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>
      <div className="cs-blueprint-bg" />

      {/* HERO */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container cs-hero">
          <div>
            <div className="cs-hero-badge reveal">
              <div className="cs-hero-badge-dot" />
              Technical Advisory · Strategy · Architecture
            </div>
            <h1 className="h1 reveal">
              Make the right calls{" "}
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                before they cost you.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Bad architectural decisions compound. InionData brings deep industry knowledge and customised consulting strategies to help you evaluate your options rigorously — from requirement analysis and architecture reviews to feasibility studies and phased implementation roadmaps. Every recommendation aligns technical decisions with your business goals.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Book a consultation</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="cs-lottie-col reveal">
            <lottie-player
              autoplay loop mode="normal"
              src="https://assets6.lottiefiles.com/packages/lf20_w51pcehl.json"
            />
          </div>
        </div>

        {/* Metrics */}
        <div className="container">
          <div className="cs-metrics reveal" style={{ marginTop: 60 }}>
            {metrics.map(m => (
              <div key={m.label} className="cs-metric">
                <div className="cs-metric-val">{m.value}</div>
                <div className="cs-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADVISORY */}
      <section className="section section--alt" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="kicker reveal">What we do</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Consulting engagements</h2>

          <div className="cs-advisory">
            {advisory.map((a, i) => (
              <div key={a.title} className="cs-advisory-row reveal" style={{ "--i": i }}>
                <div className="cs-advisory-num">{a.num}</div>
                <div>
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="kicker reveal">Process</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we work</h2>

          <div className="cs-process-wrap reveal">
            <div className="cs-process-track" />
            <div className="cs-process-row">
              {approach.map((a, i) => (
                <div key={a.label} className="cs-step">
                  <div className="cs-step-node">0{i + 1}</div>
                  <h4>{a.label}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVALUATION AREAS */}
      <section className="section section--alt" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="kicker reveal">Scope</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we evaluate</h2>

          <div className="cs-eval">
            {evaluationAreas.map((e, i) => (
              <div key={e.title} className="cs-eval-card reveal" style={{ "--i": i }}>
                <div className="cs-eval-icon">{e.icon}</div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="kicker reveal">Deliverables</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What you walk away with</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 560 }}>
            Every engagement ends with concrete artefacts your team can act on immediately — not just a presentation.
          </p>

          <div className="cs-deliverables">
            {deliverables.map(d => (
              <div key={d} className="cs-deliverable reveal">{d}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section--alt" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>Avoiding a $1.2M rewrite</h2>

          <div className="cs-case reveal">
            <div className="cs-case-img">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&q=75"
                alt="Technical strategy session"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="cs-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>FinTech · Growth-stage startup</div>
              <h2>The right architecture decision saved 14 months of rework</h2>
              <p>
                A Series A fintech company was about to embark on a complete microservices rewrite based
                on advice from an earlier consultant. We reviewed their codebase, team size, and traffic
                patterns and recommended a modular monolith instead — with a clear migration path for scale.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li><strong>14 months</strong> of unnecessary rewrite avoided</li>
                <li>Infrastructure costs reduced by <strong>40%</strong></li>
                <li>Team shipped their target feature in <strong>6 weeks</strong> instead of 6 months</li>
                <li>Clear ADR documentation for future engineering decisions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


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
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <div className="container">
          <div className="cta-band reveal">
            <h2>Let's plan it right, from the start.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a strategy call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}