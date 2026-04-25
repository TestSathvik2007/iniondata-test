import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const integrations = [
  {
    title: "API & Microservices",
    desc: "REST, GraphQL, and gRPC bridges that let your services talk fluently — with retry logic, rate-limiting, and observability baked in.",
    icon: "🔗",
  },
  {
    title: "Cloud & SaaS Sync",
    desc: "Unify Salesforce, HubSpot, Stripe, and 200+ cloud tools into a single coherent data layer your teams can trust.",
    icon: "☁️",
  },
  {
    title: "Legacy Modernisation",
    desc: "Wrap aging systems with modern APIs without a full rewrite. Keep institutional knowledge, shed the technical debt.",
    icon: "🏗️",
  },
  {
    title: "Real-time Data Pipelines",
    desc: "Kafka-backed event streams and CDC pipelines that move data the instant it changes — zero-lag synchronisation across your stack.",
    icon: "⚡",
  },
];

const steps = [
  { n: "01", title: "Audit", desc: "Map every system, API contract, and data flow" },
  { n: "02", title: "Architect", desc: "Design the integration blueprint and failure modes" },
  { n: "03", title: "Build", desc: "Implement with full test coverage and error handling" },
  { n: "04", title: "Harden", desc: "Load test, security review, and edge-case validation" },
  { n: "05", title: "Ship", desc: "Phased rollout with live monitoring from day one" },
];

const coreTech = [
  { name: "Kafka", tag: "Event Streaming", color: "rgba(20,184,166,.15)" },
  { name: "REST / GraphQL", tag: "API Layer", color: "rgba(34,197,94,.12)" },
  { name: "Docker + K8s", tag: "Infra", color: "rgba(20,184,166,.1)" },
  { name: "AWS / GCP", tag: "Cloud", color: "rgba(34,197,94,.1)" },
];

const tools = ["Node.js", "Python", "RabbitMQ", "Redis", "PostgreSQL", "Elasticsearch", "Terraform", "GitHub Actions"];

// const metrics = [
//   { value: "3×", label: "Faster data sync" },
//   { value: "65%", label: "Fewer manual errors" },
//   { value: "99.9%", label: "Pipeline uptime" },
// ];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── NETWORK / CONNECTIVITY VISUAL IDENTITY ── */

.int-page { --accent-page: #14b8a6; --accent-2-page: #2dd4bf; }

/* Animated node-graph background ornament */
.int-orb {
  position:absolute;
  border-radius:50%;
  pointer-events:none;
  filter:blur(90px);
  opacity:.18;
}

/* HERO */
.int-hero {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
  position:relative;
}

.int-hero-lottie {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}
.int-hero-lottie lottie-player {
  width:100%;
  max-width:420px;
}
.int-hero-lottie::before {
  content:'';
  position:absolute;
  inset:-20px;
  border-radius:50%;
  background:radial-gradient(circle,rgba(20,184,166,.12),transparent 70%);
  pointer-events:none;
  animation:int-pulse 4s ease-in-out infinite;
}
@keyframes int-pulse {
  0%,100%{transform:scale(1);opacity:1}
  50%{transform:scale(1.06);opacity:.7}
}

/* STATS BAND */
.int-stat-band {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:0;
  border-radius:20px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  margin-top:60px;
}
.int-stat {
  padding:32px 28px;
  text-align:center;
  background:rgba(255,255,255,.03);
  border-right:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.int-stat:last-child { border-right:none }
.int-stat:hover { background:rgba(20,184,166,.08) }
.int-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent }
.int-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

/* INTEGRATION CARDS — asymmetric 2×2 with image inset */
.int-what {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin-top:40px;
}
.int-card {
  padding:28px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s var(--ease);
  position:relative;
  overflow:hidden;
}
.int-card::before {
  content:'';
  position:absolute;
  top:-1px; left:-1px; right:-1px;
  height:2px;
  background:linear-gradient(90deg,transparent,var(--accent-page),transparent);
  opacity:0;
  transition:.3s;
}
.int-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.int-card:hover::before { opacity:1 }
.int-card-icon { font-size:32px; margin-bottom:16px }
.int-card h3 { margin:0 0 10px; font-size:18px; font-weight:700 }
.int-card p { margin:0; font-size:14px; color:var(--muted); line-height:1.65 }

/* PROCESS — horizontal connector */
.int-process { margin-top:50px; position:relative }
.int-connector {
  position:absolute;
  top:28px; left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.7),rgba(20,184,166,.1));
  pointer-events:none;
}
.int-connector::after {
  content:'';
  position:absolute;
  top:-1px; left:0;
  width:40%;
  height:3px;
  background:linear-gradient(90deg,#14b8a6,transparent);
  animation:int-flow 3s ease-in-out infinite;
}
@keyframes int-flow { 0%{left:0;opacity:1} 100%{left:60%;opacity:0} }
.int-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:20px }
.int-step { text-align:center; position:relative }
.int-step-circle {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.int-step:hover .int-step-circle { background:rgba(20,184,166,.2); transform:scale(1.1); box-shadow:0 0 24px rgba(20,184,166,.3) }
.int-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.int-step p { margin:0; font-size:12px; color:var(--muted) }

/* TECH GRID */
.int-tech-grid {
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:16px;
  margin-top:40px;
}
.int-tech-card {
  padding:24px;
  border-radius:16px;
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
  position:relative;
  overflow:hidden;
}
.int-tech-card::after {
  content:'';
  position:absolute;
  bottom:0; left:0; right:0;
  height:2px;
  background:linear-gradient(90deg,#14b8a6,#22c55e);
  transform:scaleX(0);
  transition:.3s;
  transform-origin:left;
}
.int-tech-card:hover { border-color:rgba(20,184,166,.3) }
.int-tech-card:hover::after { transform:scaleX(1) }
.int-tech-name { font-weight:700; font-size:15px; margin-bottom:6px }
.int-tech-tag {
  display:inline-block;
  padding:3px 10px;
  border-radius:999px;
  font-size:11px;
  font-weight:600;
  border:1px solid rgba(20,184,166,.3);
  color:var(--teal-2);
}

/* TOOLS PILLS */
.int-tools { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px }
.int-pill {
  padding:8px 16px; border-radius:999px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  font-size:13px; font-weight:500;
  transition:.2s;
}
.int-pill:hover { background:rgba(20,184,166,.12); border-color:rgba(20,184,166,.4); color:#2dd4bf }

/* CASE STUDY — image + text split */
.int-case {
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  display:grid;
  grid-template-columns:1fr 1fr;
}
.int-case-img {
  position:relative;
  min-height:300px;
}
.int-case-img img {
  width:100%; height:100%; object-fit:cover; display:block;
}
.int-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95) 100%);
}
.int-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.int-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.int-case-body p { font-size:14px; color:var(--muted); margin:0 0 20px; line-height:1.7 }
.int-case-body ul { margin:0; padding:0 0 0 18px }
.int-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.int-case-body li strong { color:var(--teal-2) }

/* RESPONSIVE */
@media(max-width:1000px) {
  .int-hero { grid-template-columns:1fr }
  .int-hero-lottie { display:none }
  .int-what { grid-template-columns:1fr }
  .int-tech-grid { grid-template-columns:1fr 1fr }
  .int-case { grid-template-columns:1fr }
  .int-case-img { min-height:200px }
}
@media(max-width:700px) {
  .int-process-row { grid-template-columns:1fr 1fr }
  .int-connector { display:none }
  .int-stat-band { grid-template-columns:1fr }
  .int-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationIntegration() {
  useReveal();

  useEffect(() => {
    if (!customElements.get("lottie-player")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="int-page">
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container int-hero">
          <div>
            <div className="kicker reveal">Service </div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Application Design, Development and Integration
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Providing a full range of gathering requirements, designing prototypes, testing, implementation, and integration. We design rich User Interfaces (UI) and User Experiences (UX), create builds for quality assurance and client user acceptance testing, and enable integration between applications and systems — working with APIs, web services, and connectors.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* Lottie animation — network/connections theme */}
          <div className="int-hero-lottie reveal">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json"
            />
          </div>
        </div>

        {/* Stats band */}
        {/* <div className="container">
          <div className="int-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="int-stat">
                <div className="int-stat-val">{m.value}</div>
                <div className="int-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* WHAT WE INTEGRATE */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we connect</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>
            Whether you're bridging two SaaS tools or rebuilding an enterprise integration layer from scratch,
            we've handled it before.
          </p>

          <div className="int-what">
            {integrations.map((item, i) => (
              <div key={item.title} className="int-card reveal" style={{ "--i": i }}>
                <div className="int-card-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Process</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we integrate</h2>

          <div className="int-process reveal">
            <div className="int-connector" />
            <div className="int-process-row">
              {steps.map(s => (
                <div key={s.n} className="int-step">
                  <div className="int-step-circle">{s.n}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TECH ECOSYSTEM */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Tech ecosystem</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Built on proven infrastructure</h2>

          <div className="int-tech-grid">
            {coreTech.map(t => (
              <div key={t.name} className="int-tech-card reveal" style={{ background: t.color }}>
                <div className="int-tech-name">{t.name}</div>
                <div className="int-tech-tag">{t.tag}</div>
              </div>
            ))}
          </div>

          <div className="int-tools reveal">
            {tools.map(t => (
              <div key={t} className="int-pill">{t}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      {/* <section className="section">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>Retail integration in 6 weeks</h2>

          <div className="int-case reveal">
            <div className="int-case-img">
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=75"
                alt="Retail integration"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="int-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>Retail · E-commerce</div>
              <h2>From 7 disconnected tools to one unified platform</h2>
              <p>
                A mid-size retail brand had inventory in one system, payments in another, and analytics in a third.
                Reconciliation took 3 days a month. We unified the stack via a real-time event mesh.
              </p>
              <ul>
                <li><strong>3× faster</strong> order fulfilment workflows</li>
                <li><strong>65% fewer</strong> manual data entry errors</li>
                <li><strong>Real-time</strong> inventory visibility across 12 channels</li>
                <li>Delivered <strong>on schedule</strong> in 6 weeks</li>
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

          <div className="reveal grid grid-4" style={{ marginTop: 40, gap: 16 }}>
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
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to connect your stack?</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a free scoping call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}