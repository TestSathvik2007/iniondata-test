import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const responsibilities = [
  {
    title: "Scope & Timeline Architecture",
    desc: "We translate ambiguous requirements into concrete, sequenced work — with dependencies mapped, buffers planned, and milestones that actually mean something.",
    icon: "🗓️",
  },
  {
    title: "Budget Governance",
    desc: "Weekly burn tracking, early-warning flags, and scope change protocols. Every decision that touches the budget is documented and approved before it happens.",
    icon: "📊",
  },
  {
    title: "Risk Register & Mitigation",
    desc: "We maintain a live risk register — continuously updated, severity-weighted, and backed by mitigation plans. No surprises two weeks before launch.",
    icon: "🎯",
  },
  {
    title: "Cross-team Coordination",
    desc: "Engineering, design, QA, and stakeholders rarely align without intervention. We own the coordination layer so your teams stay unblocked.",
    icon: "🤝",
  },
  {
    title: "Documentation & Handover",
    desc: "Every decision, every architecture change, every integration — documented as it happens. Clean handover packages that a new engineer can onboard from.",
    icon: "📋",
  },
];

const phases = [
  { label: "Initiation", desc: "Stakeholder alignment, scope definition, team onboarding" },
  { label: "Planning", desc: "Work breakdown, timeline, resource allocation, risk log" },
  { label: "Execution", desc: "Sprint facilitation, daily standups, blocker removal" },
  { label: "Control", desc: "Progress tracking, scope management, quality gates" },
  { label: "Delivery", desc: "UAT, go-live, handover documentation, retrospective" },
];

const communications = [
  { title: "Weekly Status Report", desc: "Progress against plan, burn rate, risks, decisions made.", cadence: "Weekly" },
  { title: "Stakeholder Check-in", desc: "Structured 30-min call to align on priorities and review demos.", cadence: "Bi-weekly" },
  { title: "Risk Review", desc: "Live risk register review with mitigation updates.", cadence: "Weekly" },
  { title: "Sprint Demo", desc: "Working software demonstrated to stakeholders at end of each sprint.", cadence: "Bi-weekly" },
];

const fakeGantt = [
  { task: "Discovery & Requirements", width: "25%", left: "0%", color: "rgba(20,184,166,.5)" },
  { task: "Architecture Design", width: "20%", left: "20%", color: "rgba(34,197,94,.4)" },
  { task: "Development Sprints", width: "45%", left: "30%", color: "rgba(20,184,166,.65)" },
  { task: "QA & Testing", width: "25%", left: "65%", color: "rgba(34,197,94,.55)" },
  { task: "UAT & Launch", width: "15%", left: "85%", color: "rgba(20,184,166,.8)" },
];

const metrics = [
  { value: "95%", label: "On-time delivery rate" },
  { value: "100%", label: "Budget adherence" },
  { value: "0", label: "Scope surprises" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── TIMELINE / DELIVERY VISUAL IDENTITY ── */

/* HERO */
.pm-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
}
.pm-lottie-col {
  display:flex;
  align-items:center;
  justify-content:center;
}
.pm-lottie-col img {
  width:100%;
  border-radius:20px;
  display:block;
}

/* METRICS */
.pm-metrics-row {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:60px;
}
.pm-metric-card {
  padding:30px;
  text-align:center;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.25s;
}
.pm-metric-card:hover { border-color:rgba(20,184,166,.3); background:rgba(20,184,166,.05) }
.pm-metric-val {
  font-size:46px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  line-height:1;
}
.pm-metric-lbl { font-size:13px; color:var(--muted); margin-top:6px }

/* RESPONSIBILITIES — icon list */
.pm-responsibilities { margin-top:40px; display:flex; flex-direction:column; gap:14px; }
.pm-resp-card {
  display:grid;
  grid-template-columns:64px 1fr;
  gap:20px;
  padding:24px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  align-items:start;
  transition:.25s;
}
.pm-resp-card:hover { border-color:rgba(20,184,166,.3); transform:translateX(4px) }
.pm-resp-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; flex-shrink:0;
}
.pm-resp-card h3 { margin:0 0 8px; font-size:17px; font-weight:700 }
.pm-resp-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* FAKE GANTT CHART */
.pm-gantt {
  margin-top:40px;
  border-radius:20px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.025);
}
.pm-gantt-header {
  padding:18px 24px;
  border-bottom:1px solid rgba(255,255,255,.07);
  display:flex; align-items:center; justify-content:space-between;
}
.pm-gantt-title { font-size:14px; font-weight:700 }

.pm-gantt-body { padding:20px 24px; }
.pm-gantt-row { margin-bottom:12px; }
.pm-gantt-row:last-child { margin-bottom:0 }
.pm-gantt-row-label { font-size:12px; color:var(--muted); margin-bottom:6px; font-weight:500 }
.pm-gantt-track { position:relative; height:24px; background:rgba(255,255,255,.04); border-radius:6px; overflow:hidden; }
.pm-gantt-bar {
  position:absolute;
  top:3px; bottom:3px;
  border-radius:4px;
  animation:pm-bar-in .8s var(--ease) backwards;
}
@keyframes pm-bar-in { from{opacity:0;transform:scaleX(0);transform-origin:left} to{opacity:1;transform:scaleX(1)} }

.pm-gantt-weeks {
  display:grid;
  grid-template-columns:repeat(10,1fr);
  margin-top:12px;
}
.pm-gantt-week {
  text-align:center;
  font-size:10px;
  color:var(--muted);
  padding:4px 0;
  border-left:1px dashed rgba(255,255,255,.06);
}

/* PROCESS */
.pm-process { margin-top:50px; position:relative }
.pm-process-track {
  position:absolute; top:28px;
  left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.pm-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px }
.pm-step { text-align:center }
.pm-step-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.pm-step:hover .pm-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.pm-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.pm-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* COMMUNICATION CADENCE */
.pm-comms { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:40px; }
.pm-comm-card {
  padding:24px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  display:flex; gap:16px; align-items:flex-start;
  transition:.25s;
}
.pm-comm-card:hover { border-color:rgba(20,184,166,.3) }
.pm-comm-cadence {
  padding:4px 12px; border-radius:999px;
  background:rgba(20,184,166,.12);
  border:1px solid rgba(20,184,166,.25);
  font-size:11px; font-weight:700; color:#2dd4bf;
  white-space:nowrap; flex-shrink:0;
  align-self:flex-start; margin-top:2px;
}
.pm-comm-content h4 { margin:0 0 6px; font-size:15px; font-weight:700 }
.pm-comm-content p { margin:0; font-size:13px; color:var(--muted); line-height:1.55 }

/* CASE STUDY */
.pm-case {
  display:grid;
  grid-template-columns:1fr 1.2fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.pm-case-img { position:relative; min-height:300px; }
.pm-case-img img { width:100%; height:100%; object-fit:cover; display:block }
.pm-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95));
}
.pm-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.pm-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.pm-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 20px }
.pm-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.pm-case-body li strong { color:#2dd4bf }

/* DELIVERY GRID */
.pm-delivery-grid {
  margin-top:40px;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
}
.pm-delivery-card {
  padding:28px 24px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  position:relative;
  transition:.25s;
}
.pm-delivery-card:hover { border-color:rgba(20,184,166,.3) }
.pm-delivery-num {
  font-size:48px; font-weight:800; line-height:1;
  color:rgba(20,184,166,.18);
  margin-bottom:16px;
  letter-spacing:-0.04em;
}
.pm-delivery-card h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.pm-delivery-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

/* ── RESPONSIVE ── */
@media(max-width:1000px) {
  .pm-hero { grid-template-columns:1fr; gap:32px }
  .pm-lottie-col { display:flex }
  .pm-lottie-col img { max-height:280px; object-fit:cover }
  .pm-metrics-row { grid-template-columns:1fr 1fr }
  .pm-comms { grid-template-columns:1fr }
  .pm-case { grid-template-columns:1fr }
  .pm-case-img { min-height:240px }
  .pm-case-img::after {
    background:linear-gradient(to bottom,transparent 40%,rgba(7,16,14,.95));
  }
  .pm-case-body { padding:28px 24px }
  .pm-delivery-grid { grid-template-columns:1fr 1fr }
}

@media(max-width:700px) {
  .pm-hero { gap:24px }
  .pm-process-row { grid-template-columns:1fr 1fr }
  .pm-process-track { display:none }
  .pm-metrics-row { grid-template-columns:1fr }
  .pm-metric-val { font-size:36px }
  .pm-resp-card { grid-template-columns:48px 1fr; gap:14px; padding:18px }
  .pm-resp-icon { width:44px; height:44px; font-size:18px }
  .pm-delivery-grid { grid-template-columns:1fr }
  .pm-comms { grid-template-columns:1fr }
  .pm-comm-card { flex-direction:column; gap:10px }
  .pm-gantt-week { font-size:9px }
  .pm-case-body { padding:20px 16px }
  .pm-case-body h2 { font-size:18px }
}
`;

// ── PAGE ─────────────────────────────────────────

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyse your current landscape, challenges, and business goals — through stakeholder interviews, technical audits, and scope definition." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof architecture tailored to your business — with a phased delivery plan, tech stack selection, and risk mapping." },
  { n: "03", title: "Build & Implement", desc: "We develop applications, pipelines, integrations, and governance frameworks in structured sprints with weekly stakeholder updates." },
  { n: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your solution as your needs grow — with performance tracking, continuous improvement, and post-delivery support." },
];

export default function ProjectManagement() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container pm-hero">
          <div>
            <div className="kicker reveal">Project Management</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              On time. On budget.{" "}
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                No surprises.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Projects fail from poor coordination, not bad engineering. InionData manages the entire delivery lifecycle — scope, timelines, budget, risks, and stakeholder communication — using proven methodologies and dedicated project managers. We believe in transparent communication: keeping you informed at every step, with no surprises.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="pm-lottie-col reveal">
            <img
              src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=75"
              alt="Project planning"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>

        <div className="container">
          <div className="pm-metrics-row reveal">
            {metrics.map(m => (
              <div key={m.label} className="pm-metric-card">
                <div className="pm-metric-val">{m.value}</div>
                <div className="pm-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSIBILITIES */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">What we own</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Full-lifecycle project management</h2>

          <div className="pm-responsibilities">
            {responsibilities.map((r, i) => (
              <div key={r.title} className="pm-resp-card reveal" style={{ "--i": i }}>
                <div className="pm-resp-icon">{r.icon}</div>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GANTT VISUAL */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Timeline visibility</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Always know where you stand</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 540 }}>
            Every project gets a living delivery plan. Milestones are visible to all stakeholders in real time — not just in end-of-sprint updates.
          </p>

          <div className="pm-gantt reveal">
            <div className="pm-gantt-header">
              <div className="pm-gantt-title">Sample project timeline · 10-week delivery</div>
            </div>
            <div className="pm-gantt-body">
              {fakeGantt.map((row, i) => (
                <div key={row.task} className="pm-gantt-row">
                  <div className="pm-gantt-row-label">{row.task}</div>
                  <div className="pm-gantt-track">
                    <div
                      className="pm-gantt-bar"
                      style={{
                        left: row.left,
                        width: row.width,
                        background: row.color,
                        animationDelay: `${i * 0.1 + 0.2}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="pm-gantt-weeks">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="pm-gantt-week">W{i + 1}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHASES */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Methodology</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Project lifecycle</h2>

          <div className="pm-process reveal">
            <div className="pm-process-track" />
            <div className="pm-process-row">
              {phases.map((p, i) => (
                <div key={p.label} className="pm-step">
                  <div className="pm-step-node">0{i + 1}</div>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNICATION */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Transparency</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Communication cadence</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 520 }}>
            No black boxes. Stakeholders always know the current state — through structured, predictable communication rituals.
          </p>

          <div className="pm-comms">
            {communications.map((c, i) => (
              <div key={c.title} className="pm-comm-card reveal" style={{ "--i": i }}>
                <div className="pm-comm-cadence">{c.cadence}</div>
                <div className="pm-comm-content">
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>6-team delivery, shipped 3 weeks early</h2>

          <div className="pm-case reveal">
            <div className="pm-case-img">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=75"
                alt="Project delivery"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="pm-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>Enterprise · Multi-team transformation</div>
              <h2>Cross-functional delivery without the chaos</h2>
              <p>
                A 6-team enterprise initiative — spanning engineering, design, compliance, and an external
                integration partner — was at risk of missing a contractual deadline. We stepped in as
                lead project managers 8 weeks before go-live.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Delivered <strong>3 weeks ahead</strong> of contractual deadline</li>
                <li>Stayed within <strong>100%</strong> of approved budget</li>
                <li>Risk log captured and resolved <strong>14 blockers</strong> before they escalated</li>
                <li><strong>Full stakeholder alignment</strong> maintained throughout</li>
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

          <div className="pm-delivery-grid reveal">
            {deliverySteps.map((step) => (
              <div
                key={step.n}
                className="pm-delivery-card"
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(20,184,166,.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"}
              >
                <div className="pm-delivery-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Let's deliver your project the right way.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Start the conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}