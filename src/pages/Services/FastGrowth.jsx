import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const drivers = [
  {
    title: "Shorten Release Cycles",
    desc: "CI/CD pipelines, feature flags, and trunk-based development compress your time-to-market from weeks to days. Ship more, risk less.",
    stat: "3×",
    statLabel: "faster releases",
    icon: "🚀",
  },
  {
    title: "Cut Maintenance Drag",
    desc: "Technical debt and legacy code slow your entire team. We identify high-friction areas and refactor strategically — freeing engineers to build what matters.",
    stat: "50%",
    statLabel: "less maintenance effort",
    icon: "✂️",
  },
  {
    title: "Architect for Scale",
    desc: "Systems that creak at 10K users won't survive 100K. We design load-tested, horizontally scalable architectures from the start.",
    stat: "10×",
    statLabel: "growth capacity",
    icon: "📐",
  },
  {
    title: "Modernise Your Stack",
    desc: "Outdated tech is a hiring and velocity problem. We guide stack migrations that unlock developer productivity and attract the right talent.",
    stat: "60%",
    statLabel: "dev velocity gain",
    icon: "⚡",
  },
];

const phases = [
  { label: "Baseline", desc: "Benchmark current velocity and bottlenecks" },
  { label: "Diagnose", desc: "Identify the highest-leverage friction points" },
  { label: "Prioritise", desc: "Sequence improvements by ROI" },
  { label: "Implement", desc: "Ship changes with measurable outcomes" },
  { label: "Compound", desc: "Build on gains — velocity compounds" },
];

const industries = [
  "SaaS Platforms", "E-commerce", "FinTech", "HealthTech",
  "Logistics", "EdTech", "MarketplaceApps", "D2C Brands",
];

const growthSignals = [
  "Your release cycle is longer than 2 weeks",
  "More than 30% of sprint time goes to bugs and maintenance",
  "Engineers complain about the same system pain points repeatedly",
  "You've missed a market window due to slow delivery",
  "Onboarding new engineers takes more than a month",
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── KINETIC / GROWTH VISUAL IDENTITY ── */

/* Animated gradient speed lines ornament */
.fg-speedlines {
  position:absolute;
  inset:0;
  overflow:hidden;
  pointer-events:none;
  z-index:0;
}
.fg-speedline {
  position:absolute;
  top:50%;
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(20,184,166,.4),transparent);
  animation:fg-speed 2s ease-in-out infinite;
  opacity:0;
}
.fg-speedline:nth-child(1) { width:200px; left:-220px; top:30%; animation-delay:0s; animation-duration:1.8s }
.fg-speedline:nth-child(2) { width:300px; left:-320px; top:50%; animation-delay:.3s; animation-duration:2.2s }
.fg-speedline:nth-child(3) { width:150px; left:-170px; top:70%; animation-delay:.6s; animation-duration:1.6s }
.fg-speedline:nth-child(4) { width:250px; left:-270px; top:40%; animation-delay:.9s; animation-duration:2s }
@keyframes fg-speed {
  0%  { transform:translateX(0);   opacity:0 }
  10% { opacity:.7 }
  90% { opacity:.7 }
  100%{ transform:translateX(120vw); opacity:0 }
}

/* HERO — centered with lottie */
.fg-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
  position:relative; z-index:1;
}

.fg-hero-left { }

.fg-hero-right {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:24px;
}

.fg-lottie-hero {
  width:100%;
  max-width:340px;
}

.fg-big-number {
  display:inline-block;
  font-size:clamp(80px,14vw,160px);
  font-weight:800;
  line-height:1;
  background:linear-gradient(135deg,#14b8a6 0%,#22c55e 50%,#2dd4bf 100%);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  letter-spacing:-0.06em;
  margin-bottom:8px;
}

.fg-subtitle {
  font-size:clamp(18px,3vw,26px);
  font-weight:700;
  color:var(--text);
  letter-spacing:-0.02em;
  margin-bottom:16px;
}

/* DRIVER CARDS — 2×2 with big stat */
.fg-drivers {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin-top:40px;
}
.fg-driver {
  padding:32px;
  border-radius:22px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s var(--ease);
  position:relative;
  overflow:hidden;
}
.fg-driver::before {
  content:'';
  position:absolute;
  top:0; right:0;
  width:120px; height:120px;
  border-radius:0 22px 0 120px;
  background:linear-gradient(135deg,rgba(20,184,166,.08),transparent);
  pointer-events:none;
}
.fg-driver:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.35); box-shadow:0 20px 60px rgba(20,184,166,.1) }
.fg-driver-top { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:18px }
.fg-driver-icon { font-size:30px }
.fg-driver-stat { text-align:right }
.fg-driver-stat-val {
  font-size:34px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  line-height:1;
}
.fg-driver-stat-lbl { font-size:11px; color:var(--muted); margin-top:2px }
.fg-driver h3 { margin:0 0 10px; font-size:18px; font-weight:700 }
.fg-driver p { margin:0; font-size:14px; color:var(--muted); line-height:1.65 }

/* PROCESS */
.fg-process { margin-top:50px; position:relative }
.fg-process-track {
  position:absolute; top:28px;
  left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.fg-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px }
.fg-step { text-align:center }
.fg-step-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.fg-step:hover .fg-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.fg-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.fg-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* GROWTH SIGNALS — diagnostic checklist */
.fg-signals {
  margin-top:40px;
  border-radius:22px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.fg-signal-header {
  padding:24px 32px;
  background:rgba(20,184,166,.08);
  border-bottom:1px solid rgba(20,184,166,.15);
}
.fg-signal-header h3 { margin:0; font-size:16px; font-weight:700 }
.fg-signal-header p { margin:4px 0 0; font-size:13px; color:var(--muted) }
.fg-signal-list { background:rgba(255,255,255,.025) }
.fg-signal-item {
  display:flex; align-items:center; gap:16px;
  padding:18px 32px;
  border-bottom:1px solid rgba(255,255,255,.05);
  font-size:14px; color:var(--muted);
  transition:.2s;
}
.fg-signal-item:last-child { border-bottom:none }
.fg-signal-item:hover { background:rgba(20,184,166,.05); color:var(--text) }
.fg-signal-check {
  width:20px; height:20px; border-radius:50%;
  background:rgba(239,68,68,.15);
  border:1px solid rgba(239,68,68,.3);
  flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:10px;
  color:#f87171;
}

/* INDUSTRIES */
.fg-industries { display:flex; flex-wrap:wrap; gap:10px; margin-top:30px }
.fg-industry {
  padding:9px 16px; border-radius:999px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.09);
  font-size:13px; font-weight:500; transition:.2s;
}
.fg-industry:hover { background:rgba(20,184,166,.12); border-color:rgba(20,184,166,.4); color:#2dd4bf }

/* CASE STUDY */
.fg-case {
  margin-top:40px;
  display:grid;
  grid-template-columns:1fr 1.2fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.fg-case-img { position:relative; min-height:300px }
.fg-case-img img { width:100%; height:100%; object-fit:cover; display:block }
.fg-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95));
}
.fg-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.fg-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.fg-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 22px }
.fg-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.fg-case-body li strong { color:#2dd4bf }

/* RESPONSIVE */
@media(max-width:900px) {
  .fg-hero { grid-template-columns:1fr }
  .fg-hero-right { display:none }
  .fg-drivers { grid-template-columns:1fr }
  .fg-case { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .fg-process-row { grid-template-columns:1fr 1fr }
  .fg-process-track { display:none }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function FastGrowth() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section" style={{ overflow: "hidden", position: "relative" }}>
        <div className="fg-speedlines">
          <div className="fg-speedline" />
          <div className="fg-speedline" />
          <div className="fg-speedline" />
          <div className="fg-speedline" />
        </div>

        <div className="container fg-hero">
          <div className="fg-hero-left">
            <div className="kicker reveal">Fast Growth</div>
            <div className="fg-big-number reveal">3×</div>
            <div className="fg-subtitle reveal">Faster releases. Compounding velocity.</div>
            <h1 className="h1 reveal" style={{ fontSize: "clamp(28px,4vw,52px)", marginTop: 8 }}>
              Scale faster with a smarter application strategy.
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Slow release cycles, mounting maintenance debt, and brittle architecture are growth killers.
              We help ambitious companies eliminate velocity blockers and build the technical foundation to scale.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start scaling</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="fg-hero-right reveal">
            <div className="fg-lottie-hero">
              <lottie-player
                autoplay loop mode="normal"
                src="https://assets4.lottiefiles.com/packages/lf20_raiw2hpe.json"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GROWTH SIGNALS — diagnostic */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Diagnosis</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Signs you're leaving growth on the table</h2>

          <div className="fg-signals reveal">
            <div className="fg-signal-header">
              <h3>Growth velocity audit — check off what applies</h3>
              <p>If more than two of these sound familiar, your engineering setup is capping your growth.</p>
            </div>
            <div className="fg-signal-list">
              {growthSignals.map(s => (
                <div key={s} className="fg-signal-item">
                  <div className="fg-signal-check">✗</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DRIVERS */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">How we help</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Four levers for faster growth</h2>

          <div className="fg-drivers">
            {drivers.map((d, i) => (
              <div key={d.title} className="fg-driver reveal" style={{ "--i": i }}>
                <div className="fg-driver-top">
                  <div className="fg-driver-icon">{d.icon}</div>
                  <div className="fg-driver-stat">
                    <div className="fg-driver-stat-val">{d.stat}</div>
                    <div className="fg-driver-stat-lbl">{d.statLabel}</div>
                  </div>
                </div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Engagement model</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we accelerate you</h2>

          <div className="fg-process reveal">
            <div className="fg-process-track" />
            <div className="fg-process-row">
              {phases.map((p, i) => (
                <div key={p.label} className="fg-step">
                  <div className="fg-step-node">0{i + 1}</div>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Who we work with</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Built for high-growth companies</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 520 }}>
            Across every vertical — from pre-seed startups to Series C scale-ups — velocity compounds when engineering is a strategic asset.
          </p>

          <div className="fg-industries reveal">
            {industries.map(i => (
              <div key={i} className="fg-industry">{i}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE STUDY */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>From fortnightly deploys to daily</h2>

          <div className="fg-case reveal">
            <div className="fg-case-img">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=700&q=75"
                alt="Fast-growth engineering team"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="fg-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>SaaS · Series B</div>
              <h2>Engineering velocity unlocked at scale</h2>
              <p>
                A Series B SaaS company was releasing every two weeks due to fragile deployment scripts,
                no feature flagging, and a monolith with poorly bounded modules. We delivered CI/CD
                infrastructure, a modular architecture migration, and dev tooling in 10 weeks.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Release cycle went from <strong>14 days to 1 day</strong></li>
                <li>Maintenance overhead dropped by <strong>50%</strong></li>
                <li>Team shipped <strong>3× more features</strong> in Q3 vs Q2</li>
                <li>Engineering NPS increased from 28 to <strong>71</strong></li>
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
      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Let's remove the brakes on your growth.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a velocity audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}