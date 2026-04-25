import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const buildTypes = [
  {
    title: "Intelligent Bots",
    desc: "Conversational bots that automate approval workflows, answer internal queries, surface CRM data, and trigger external APIs — all from within a Teams chat.",
    icon: "🤖",
    example: "e.g. HR leave bot, IT helpdesk bot, sales pipeline bot",
  },
  {
    title: "Message Extensions",
    desc: "Custom search and action commands that let users pull external data — tickets, records, inventory — directly into any Teams conversation without leaving the app.",
    icon: "🔍",
    example: "e.g. Jira ticket preview, order status lookup",
  },
  {
    title: "Embedded Tab Apps",
    desc: "Full web applications rendered directly inside Teams as interactive tabs — dashboards, approval tools, internal portals — without asking users to open a browser.",
    icon: "📱",
    example: "e.g. Project tracker tab, HR portal, reporting dashboard",
  },
  {
    title: "Meeting Integrations",
    desc: "In-meeting apps, pre/post-meeting sidepanels, and automated meeting summaries. Surface the right data at the right moment in every call.",
    icon: "🎥",
    example: "e.g. Live agenda panel, action item capture, CRM lookup",
  },
];

const process = [
  { label: "Discover", desc: "Map the workflows your team wants to streamline inside Teams" },
  { label: "Design", desc: "UX design for bot conversations, tabs, and extension interfaces" },
  { label: "Develop", desc: "Build with Microsoft Bot Framework, Teams JS SDK, and Azure" },
  { label: "Test", desc: "End-to-end testing including Teams-specific edge cases and permissions" },
  { label: "Deploy", desc: "Package, publish to Teams Admin Centre, and train your team" },
];

// const techStack = [
//   { name: "Bot Framework", desc: "Conversation management & adaptive cards" },
//   { name: "Teams JS SDK", desc: "Tab apps & meeting integrations" },
//   { name: "Azure Bot Service", desc: "Scalable cloud hosting" },
//   { name: "Microsoft Graph API", desc: "Calendar, users, presence, messages" },
//   { name: "Power Automate", desc: "Low-code workflow triggers" },
//   { name: "Azure AD / SSO", desc: "Seamless authentication" },
// ];

// const benefits = [
//   {
//     title: "Zero context switching",
//     desc: "Users stay in Teams — the tool they're already in — instead of bouncing between 6 apps to complete one task.",
//     stat: "40%",
//     statLabel: "reduction in app switching",
//   },
//   {
//     title: "Workflow automation",
//     desc: "Manual approval chains, status update requests, and internal lookups become instant automated interactions.",
//     stat: "3×",
//     statLabel: "faster workflow completion",
//   },
//   {
//     title: "Centralised access",
//     desc: "Your CRM, project tracker, HRIS, and support tools — surfaced in one interface your whole company already has open.",
//     stat: "80%",
//     statLabel: "tool consolidation",
//   },
// ];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── TEAMS INTEGRATION — standard teal scheme ── */

/* HERO */
.ti-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
}

.ti-hero-img {
  position:relative;
  border-radius:20px;
  overflow:hidden;
}
.ti-hero-img img {
  width:100%; border-radius:20px; display:block;
}
.ti-hero-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(135deg,rgba(20,184,166,.08),transparent 60%);
  border-radius:20px;
  pointer-events:none;
}

/* STAT BAND */
.ti-stat-band {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1px;
  background:rgba(255,255,255,.07);
  border-radius:20px;
  overflow:hidden;
  margin-top:60px;
}
.ti-stat-cell {
  padding:28px 20px;
  text-align:center;
  background:#07100e;
  transition:.25s;
}
.ti-stat-cell:hover { background:rgba(20,184,166,.07) }
.ti-stat-val {
  font-size:38px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.ti-stat-lbl { font-size:12px; color:var(--muted); margin-top:4px }

/* BUILD TYPES — 2×2 */
.ti-builds {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin-top:40px;
}
.ti-build-card {
  padding:30px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s;
  position:relative;
  overflow:hidden;
}
.ti-build-card::before {
  content:'';
  position:absolute;
  top:0; left:0; right:0;
  height:2px;
  background:linear-gradient(90deg,transparent,#14b8a6,transparent);
  opacity:0; transition:.3s;
}
.ti-build-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px); }
.ti-build-card:hover::before { opacity:1 }
.ti-build-icon { font-size:28px; margin-bottom:14px }
.ti-build-card h3 { margin:0 0 10px; font-size:17px; font-weight:700 }
.ti-build-card p { margin:0 0 12px; font-size:13px; color:var(--muted); line-height:1.65 }
.ti-build-example {
  font-size:11px; color:#2dd4bf;
  font-style:italic;
  padding:6px 10px;
  border-radius:6px;
  background:rgba(20,184,166,.08);
  border:1px solid rgba(20,184,166,.15);
}

/* PROCESS */
.ti-process { margin-top:50px; position:relative }
.ti-process-track {
  position:absolute; top:28px;
  left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.ti-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px }
.ti-step { text-align:center }
.ti-step-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.ti-step:hover .ti-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.ti-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.ti-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* TECH STACK */
.ti-tech { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:40px }
.ti-tech-card {
  padding:20px 22px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.25s;
}
.ti-tech-card:hover { border-color:rgba(20,184,166,.3); background:rgba(20,184,166,.06) }
.ti-tech-name { font-weight:700; font-size:14px; margin-bottom:4px }
.ti-tech-desc { font-size:12px; color:var(--muted) }

/* BENEFITS */
.ti-benefits {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.ti-benefit {
  padding:30px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.25s;
  text-align:center;
}
.ti-benefit:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px) }
.ti-benefit-stat {
  font-size:42px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  line-height:1; margin-bottom:4px;
}
.ti-benefit-stat-lbl { font-size:11px; color:var(--muted); margin-bottom:14px }
.ti-benefit h3 { margin:0 0 8px; font-size:16px; font-weight:700 }
.ti-benefit p { margin:0; font-size:13px; color:var(--muted); line-height:1.6 }

/* CASE STUDY */
.ti-case {
  display:grid;
  grid-template-columns:1fr 1.2fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.ti-case-img { position:relative; min-height:300px }
.ti-case-img img { width:100%; height:100%; object-fit:cover; display:block }
.ti-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95));
}
.ti-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.ti-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.ti-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 20px }
.ti-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.ti-case-body li strong { color:#2dd4bf }

/* RESPONSIVE */
@media(max-width:1000px) {
  .ti-hero { grid-template-columns:1fr }
  .ti-builds { grid-template-columns:1fr }
  .ti-tech { grid-template-columns:1fr 1fr }
  .ti-benefits { grid-template-columns:1fr }
  .ti-case { grid-template-columns:1fr }
  .ti-stat-band { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .ti-process-row { grid-template-columns:1fr 1fr }
  .ti-process-track { display:none }
  .ti-tech { grid-template-columns:1fr }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function TeamsIntegration() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container ti-hero">
          <div>
            <div className="kicker reveal">Service</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Teams Application Development and Integration
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Developing bots and message extensions based on user story and integrating them into Microsoft Teams. We also develop web applications and integrate them as Tabs — bringing your critical workflows directly into the Teams interface your people already use.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Build your Teams app</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="ti-hero-img reveal">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=700&q=75"
              alt="Teams collaboration"
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </div>
        </div>

        {/* <div className="container">
          <div className="ti-stat-band reveal">
            {benefits.map(b => (
              <div key={b.title} className="ti-stat-cell">
                <div className="ti-stat-val">{b.stat}</div>
                <div className="ti-stat-lbl">{b.statLabel}</div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* WHAT WE BUILD */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we build for Teams</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
            From simple notification bots to full embedded web apps — every integration is
            designed to fit your team's actual workflow, not a generic template.
          </p>

          <div className="ti-builds">
            {buildTypes.map((b, i) => (
              <div key={b.title} className="ti-build-card reveal" style={{ "--i": i }}>
                <div className="ti-build-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <div className="ti-build-example">{b.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">How we work</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>From idea to deployed Teams app</h2>

          <div className="ti-process reveal">
            <div className="ti-process-track" />
            <div className="ti-process-row">
              {process.map((p, i) => (
                <div key={p.label} className="ti-step">
                  <div className="ti-step-node">0{i + 1}</div>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Technology</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Microsoft ecosystem expertise</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 520 }}>
            We build natively with Microsoft's own toolchain — no workarounds, no third-party
            abstractions that create fragility down the line.
          </p>

          <div className="ti-tech">
            {techStack.map((t, i) => (
              <div key={t.name} className="ti-tech-card reveal" style={{ "--i": i }}>
                <div className="ti-tech-name">{t.name}</div>
                <div className="ti-tech-desc">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* BENEFITS */}
      {/* <section className="section">
        <div className="container">
          <div className="kicker reveal">Impact</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What your team gains</h2>

          <div className="ti-benefits">
            {benefits.map((b, i) => (
              <div key={b.title} className="ti-benefit reveal" style={{ "--i": i }}>
                <div className="ti-benefit-stat">{b.stat}</div>
                <div className="ti-benefit-stat-lbl">{b.statLabel}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CASE STUDY */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>Approval process from 3 days to 20 minutes</h2>

          <div className="ti-case reveal">
            <div className="ti-case-img">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=75"
                alt="Team collaboration"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="ti-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>Professional Services · 400+ employees</div>
              <h2>One bot eliminated a 3-day approval bottleneck</h2>
              <p>
                A professional services firm's internal purchase approval process involved emails,
                manager forwards, and manual Jira updates — averaging 3 business days per request.
                We built a Teams bot that handled the entire flow inside chat.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Approval time reduced from <strong>3 days to 20 minutes</strong></li>
                <li><strong>94% adoption rate</strong> among approvers within week one</li>
                <li>Finance team saved <strong>12h/week</strong> of manual reconciliation</li>
                <li>Zero training required — all interactions happen in Teams naturally</li>
              </ul>
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
            <h2>Bring your workflows into Teams.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Start building
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}