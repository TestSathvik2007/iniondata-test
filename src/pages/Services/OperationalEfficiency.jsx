import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const pillars = [
  {
    title: "Cost Reduction",
    desc: "Cloud spend audits, right-sizing, reserved instance planning, and architectural changes that eliminate wasteful resource usage — typically 30–50% cloud bill reduction.",
    before: "$18K/mo cloud spend",
    after: "$9K/mo after optimisation",
    icon: "💰",
  },
  {
    title: "Developer Experience",
    desc: "Slow CI pipelines, flaky tests, and poor tooling drain productivity invisibly. We instrument and fix the developer loop — so engineers spend time building, not waiting.",
    before: "45-min CI build times",
    after: "8-min parallelised builds",
    icon: "⚙️",
  },
  {
    title: "Legacy Modernisation",
    desc: "Legacy systems aren't just slow — they're a retention and hiring risk. We modernise incrementally with the strangler-fig pattern, minimising disruption and risk.",
    before: "PHP 5.6 monolith, 2 deploys/month",
    after: "Modular services, daily deploys",
    icon: "🏗️",
  },
  {
    title: "UX & Performance",
    desc: "Every 100ms of page load costs conversion. We profile frontend performance, optimise critical render paths, and deliver measurable Core Web Vitals improvements.",
    before: "LCP: 4.8s · CLS: 0.38",
    after: "LCP: 1.2s · CLS: 0.02",
    icon: "📱",
  },
];

const improvements = [
  {
    area: "Cloud Infrastructure",
    actions: ["Right-size compute and storage", "Reserved & spot instance strategy", "CDN and caching layer audit", "Dead resource identification"],
    icon: "☁️",
  },
  {
    area: "Development Workflow",
    actions: ["CI/CD pipeline optimisation", "Test suite parallelisation", "Dependency management automation", "Local dev environment standardisation"],
    icon: "🔧",
  },
  {
    area: "Application Performance",
    actions: ["Database query profiling", "N+1 query elimination", "Caching strategy implementation", "Frontend bundle optimisation"],
    icon: "⚡",
  },
];

const process = [
  { label: "Audit", desc: "Full system instrumentation and cost analysis" },
  { label: "Identify", desc: "Map the highest-leverage friction points" },
  { label: "Prioritise", desc: "Rank by ROI and implementation effort" },
  { label: "Optimise", desc: "Implement changes with measurable outcomes" },
  { label: "Monitor", desc: "Track improvements and compound gains" },
];

// const metrics = [
//   { value: "40%", label: "Average cost reduction" },
//   { value: "3×", label: "Faster CI/CD pipelines" },
//   { value: "60%", label: "Fewer production incidents" },
// ];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── STREAMLINED / INDUSTRIAL VISUAL IDENTITY ── */

/* HERO — left-heavy with lottie */
.oe-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:60px;
  align-items:center;
}
.oe-lottie { display:flex; align-items:center; justify-content:center; }
.oe-lottie lottie-player { max-width:420px; width:100%; }

/* Metrics strip */
.oe-metric-strip {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1px;
  background:rgba(255,255,255,.07);
  border-radius:20px;
  overflow:hidden;
  margin-top:60px;
}
.oe-metric-cell {
  padding:28px 24px;
  text-align:center;
  background:#07100e;
  transition:.25s;
}
.oe-metric-cell:hover { background:rgba(20,184,166,.07) }
.oe-metric-val {
  font-size:40px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.oe-metric-lbl { font-size:12px; color:var(--muted); margin-top:4px }

/* PILLAR CARDS — before/after layout */
.oe-pillars { margin-top:40px; display:flex; flex-direction:column; gap:16px; }
.oe-pillar {
  border-radius:20px;
  border:1px solid rgba(255,255,255,.07);
  overflow:hidden;
  transition:.25s;
}
.oe-pillar:hover { border-color:rgba(20,184,166,.3) }
.oe-pillar-top {
  display:grid;
  grid-template-columns:56px 1fr;
  gap:20px;
  padding:28px 28px 20px;
  align-items:start;
}
.oe-pillar-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.1);
  border:1px solid rgba(20,184,166,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; flex-shrink:0;
}
.oe-pillar-top h3 { margin:0 0 8px; font-size:17px; font-weight:700 }
.oe-pillar-top p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }
.oe-pillar-compare {
  display:grid;
  grid-template-columns:1fr auto 1fr;
  gap:0;
  background:rgba(255,255,255,.025);
  border-top:1px solid rgba(255,255,255,.06);
  align-items:center;
}
.oe-compare-before, .oe-compare-after {
  padding:14px 22px;
  font-size:12px;
  font-weight:500;
}
.oe-compare-before { color:rgba(239,68,68,.7); }
.oe-compare-before span { display:block; font-size:10px; color:var(--muted); margin-bottom:3px; font-weight:400; text-transform:uppercase; letter-spacing:.06em }
.oe-compare-after { color:#22c55e; text-align:right }
.oe-compare-after span { display:block; font-size:10px; color:var(--muted); margin-bottom:3px; font-weight:400; text-transform:uppercase; letter-spacing:.06em }
.oe-compare-arrow {
  padding:0 16px;
  font-size:18px;
  color:var(--muted);
  text-align:center;
}

/* IMPROVEMENT AREAS — 3-col */
.oe-improvements {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.oe-improve-card {
  padding:28px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:.3s;
}
.oe-improve-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px) }
.oe-improve-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.08);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; margin-bottom:18px;
}
.oe-improve-card h3 { margin:0 0 16px; font-size:16px; font-weight:700 }
.oe-improve-card ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px }
.oe-improve-card li { font-size:13px; color:var(--muted); display:flex; align-items:flex-start; gap:8px }
.oe-improve-card li::before { content:'→'; color:#14b8a6; flex-shrink:0; font-weight:700 }

/* PROCESS */
.oe-process { margin-top:50px; position:relative }
.oe-process-track {
  position:absolute; top:28px;
  left:calc(10% + 28px); right:calc(10% + 28px);
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.oe-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px }
.oe-step { text-align:center }
.oe-step-node {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.oe-step:hover .oe-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.oe-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.oe-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* CASE STUDY */
.oe-case {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:0;
  border-radius:24px;
  overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
}
.oe-case-img { position:relative; min-height:300px }
.oe-case-img img { width:100%; height:100%; object-fit:cover; display:block }
.oe-case-img::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95));
}
.oe-case-body {
  padding:44px 40px;
  background:rgba(255,255,255,.03);
  display:flex; flex-direction:column; justify-content:center;
}
.oe-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.oe-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 20px }
.oe-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.oe-case-body li strong { color:#2dd4bf }

/* RESPONSIVE */
@media(max-width:1000px) {
  .oe-hero { grid-template-columns:1fr }
  .oe-lottie { display:none }
  .oe-improvements { grid-template-columns:1fr }
  .oe-case { grid-template-columns:1fr }
}
@media(max-width:700px) {
  .oe-process-row { grid-template-columns:1fr 1fr }
  .oe-process-track { display:none }
  .oe-metric-strip { grid-template-columns:1fr }
  .oe-pillar-compare { grid-template-columns:1fr }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function OperationalEfficiency() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container oe-hero">
          <div>
            <div className="kicker reveal">Service</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Operational Efficiency
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Ensuring efficient and cost-effective application development management while using secure practices. We expand the capabilities of your legacy applications and enhance user experience by leveraging modern technology — boosting growth by reinventing your applications and speeding up the development process while minimizing maintenance needs.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Request an audit</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="oe-lottie reveal">
            <svg viewBox="0 0 420 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
              {/* Background glow */}
              <ellipse cx="210" cy="200" rx="180" ry="120" fill="rgba(20,184,166,0.06)" />

              {/* Grid lines */}
              {[60, 110, 160, 210, 260].map((y, i) => (
                <line key={i} x1="40" y1={y} x2="380" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}
              {[80, 140, 200, 260, 320].map((x, i) => (
                <line key={i} x1={x} y1="40" x2={x} y2="280" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              ))}

              {/* Growth curve — filled area */}
              <path
                d="M40 260 C80 255 110 240 150 210 C190 180 210 160 250 120 C280 90 320 65 380 40 L380 280 L40 280 Z"
                fill="rgba(20,184,166,0.10)"
              />
              {/* Growth curve — line */}
              <path
                d="M40 260 C80 255 110 240 150 210 C190 180 210 160 250 120 C280 90 320 65 380 40"
                stroke="url(#oeGrad)" strokeWidth="2.5" strokeLinecap="round"
              />

              {/* Secondary curve (efficiency) */}
              <path
                d="M40 240 C90 238 130 228 170 205 C210 182 240 158 290 130 C320 112 350 95 380 75"
                stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4"
              />

              {/* Data point dots on main curve */}
              {[[40, 260], [150, 210], [250, 120], [380, 40]].map(([cx, cy], i) => (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="6" fill="#0c1a16" stroke="#14b8a6" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="3" fill="#14b8a6" />
                </g>
              ))}

              {/* Bars — legacy vs modern comparison */}
              {[[80, 200, 60, "rgba(255,255,255,0.08)"], [110, 160, 100, "rgba(20,184,166,0.35)"], [160, 190, 70, "rgba(255,255,255,0.08)"], [190, 130, 130, "rgba(20,184,166,0.45)"], [240, 180, 80, "rgba(255,255,255,0.08)"], [270, 100, 160, "rgba(34,197,94,0.4)"]].map(([x, y, h, fill], i) => (
                <rect key={i} x={x} y={y} width="18" height={h} rx="3" fill={fill} />
              ))}

              {/* Labels */}
              <text x="55" y="298" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Inter,sans-serif">Legacy</text>
              <text x="175" y="298" fill="rgba(20,184,166,0.7)" fontSize="10" fontFamily="Inter,sans-serif">Modern</text>
              <text x="250" y="298" fill="rgba(34,197,94,0.7)" fontSize="10" fontFamily="Inter,sans-serif">Optimised</text>

              {/* Speed badge */}
              <rect x="260" y="48" width="110" height="44" rx="10" fill="rgba(12,26,22,0.95)" stroke="rgba(20,184,166,0.3)" strokeWidth="1" />
              <text x="275" y="67" fill="#2dd4bf" fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">10×</text>
              <text x="275" y="82" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Inter,sans-serif">faster releases</text>

              {/* Cost badge */}
              <rect x="28" y="100" width="110" height="44" rx="10" fill="rgba(12,26,22,0.95)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
              <text x="43" y="119" fill="#4ade80" fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">60%</text>
              <text x="43" y="134" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Inter,sans-serif">cost reduction</text>

              <defs>
                <linearGradient id="oeGrad" x1="40" y1="260" x2="380" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* <div className="container">
          <div className="oe-metric-strip reveal">
            {metrics.map(m => (
              <div key={m.label} className="oe-metric-cell">
                <div className="oe-metric-val">{m.value}</div>
                <div className="oe-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div> */}
      </section>

      {/* PILLARS WITH BEFORE/AFTER */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Focus areas</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Where efficiency compounds</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
            Every engagement targets the highest-leverage areas — with before/after metrics to make the
            value visible to both engineers and leadership.
          </p>

          <div className="oe-pillars">
            {pillars.map((p, i) => (
              <div key={p.title} className="oe-pillar reveal" style={{ "--i": i }}>
                <div className="oe-pillar-top">
                  <div className="oe-pillar-icon">{p.icon}</div>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                  </div>
                </div>
                <div className="oe-pillar-compare">
                  <div className="oe-compare-before">
                    <span>Before</span>
                    {p.before}
                  </div>
                  <div className="oe-compare-arrow">→</div>
                  <div className="oe-compare-after">
                    <span>After</span>
                    {p.after}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* PROCESS */}
      {/* <section className="section">
        <div className="container">
          <div className="kicker reveal">How we work</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Efficiency engagement model</h2>

          <div className="oe-process reveal">
            <div className="oe-process-track" />
            <div className="oe-process-row">
              {process.map((p, i) => (
                <div key={p.label} className="oe-step">
                  <div className="oe-step-node">0{i + 1}</div>
                  <h4>{p.label}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* IMPROVEMENT AREAS */}
      {/* <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Scope</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Three dimensions of efficiency</h2>

          <div className="oe-improvements">
            {improvements.map((imp, i) => (
              <div key={imp.area} className="oe-improve-card reveal" style={{ "--i": i }}>
                <div className="oe-improve-icon">{imp.icon}</div>
                <h3>{imp.area}</h3>
                <ul>
                  {imp.actions.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CASE STUDY */}
      {/* <section className="section">
        <div className="container">
          <div className="kicker reveal">Case study</div>
          <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>$120K saved in cloud costs annually</h2>

          <div className="oe-case reveal">
            <div className="oe-case-img">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=75"
                alt="System optimisation"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div className="oe-case-body">
              <div className="kicker" style={{ marginBottom: 16 }}>E-commerce · Mid-market</div>
              <h2>From overspending on AWS to lean, observable infrastructure</h2>
              <p>
                A mid-market e-commerce company was spending $18K/month on AWS with no clear observability
                into which services were responsible. We audited, right-sized, eliminated zombie resources,
                and implemented a caching layer that reduced both cost and latency.
              </p>
              <ul style={{ paddingLeft: 18 }}>
                <li>Cloud bill reduced by <strong>$9K/month ($108K/year)</strong></li>
                <li>API response times improved by <strong>65%</strong></li>
                <li>Developer build times cut from <strong>45min to 8min</strong></li>
                <li>Full observability stack deployed with <strong>zero downtime</strong></li>
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
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Let's find where you're losing efficiency.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Request a free audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}