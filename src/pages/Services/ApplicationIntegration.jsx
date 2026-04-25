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

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── NETWORK / CONNECTIVITY VISUAL IDENTITY ── */

.int-page { --accent-page: #14b8a6; --accent-2-page: #2dd4bf; }

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
/* Animated ring behind lottie — connectivity theme */
.int-hero-lottie::before {
  content:'';
  position:absolute;
  inset:-24px;
  border-radius:50%;
  background: conic-gradient(
    from 0deg,
    rgba(20,184,166,.18),
    rgba(34,197,94,.08) 30%,
    transparent 50%,
    rgba(20,184,166,.12) 70%,
    rgba(20,184,166,.18) 100%
  );
  pointer-events:none;
}
.int-hero-lottie::after {
  content:'';
  position:absolute;
  inset:-8px;
  border-radius:50%;
  border: 1px solid rgba(20,184,166,.15);
  animation: int-pulse 4s ease-in-out infinite;
  pointer-events:none;
}
@keyframes int-pulse {
  0%,100% { transform:scale(1); opacity:.6; }
  50%     { transform:scale(1.05); opacity:1; }
}

/* INTEGRATION CARDS */
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
  transition: transform .3s var(--ease), border-color .3s, box-shadow .3s;
  position:relative;
  overflow:hidden;
  opacity:0;
  animation: int-card-in .5s ease forwards;
  animation-delay: calc(var(--i, 0) * 120ms + 80ms);
}
@keyframes int-card-in {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
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
  transition: background .3s, transform .3s, box-shadow .3s;
  position:relative;
}
.int-step-circle::after {
  content:'';
  position:absolute; inset:-5px;
  border-radius:50%;
  border:1px solid rgba(20,184,166,.2);
  opacity:0;
  transform:scale(.85);
  transition: opacity .3s, transform .3s;
}
.int-step:hover .int-step-circle { background:rgba(20,184,166,.2); transform:scale(1.12); box-shadow:0 0 24px rgba(20,184,166,.3) }
.int-step:hover .int-step-circle::after { opacity:1; transform:scale(1); }
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
  transition: border-color .25s, transform .25s;
  position:relative;
  overflow:hidden;
  opacity:0;
  animation: int-card-in .5s ease forwards;
  animation-delay: calc(var(--i, 0) * 90ms + 80ms);
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
.int-tech-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-3px); }
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
  transition: background .2s, border-color .2s, color .2s, transform .2s;
}
.int-pill:hover { background:rgba(20,184,166,.12); border-color:rgba(20,184,166,.4); color:#2dd4bf; transform:translateY(-2px); }

/* DELIVERY APPROACH CARDS */
.int-approach-card {
  padding:28px 24px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  position:relative;
  overflow:hidden;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.int-approach-card::before {
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:linear-gradient(180deg,#14b8a6,#22c55e);
  transform:scaleY(0);
  transform-origin:bottom;
  transition:transform .3s ease;
}
.int-approach-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px); box-shadow:0 12px 36px rgba(20,184,166,.08); }
.int-approach-card:hover::before { transform:scaleY(1); }

/* RESPONSIVE */
@media(max-width:1000px) {
  .int-hero { grid-template-columns:1fr }
  // .int-hero-lottie { display:none }
  .int-what { grid-template-columns:1fr }
  .int-tech-grid { grid-template-columns:1fr 1fr }
}
@media(max-width:700px) {
  .int-process-row { grid-template-columns:1fr 1fr }
  .int-connector { display:none }
  .int-tech-grid { grid-template-columns:1fr }
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
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 700, textAlign: "justify" }}>
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
      </section>

      {/* WHAT WE INTEGRATE */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we connect</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
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
            {coreTech.map((t, i) => (
              <div key={t.name} className="int-tech-card reveal" style={{ background: t.color, "--i": i }}>
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
              <div key={step.n} className="int-approach-card" style={{ "--i": i }}>
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