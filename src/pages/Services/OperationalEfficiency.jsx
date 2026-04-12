import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

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

const metrics = [
  { value: "40%", label: "Average cost reduction" },
  { value: "3×", label: "Faster CI/CD pipelines" },
  { value: "60%", label: "Fewer production incidents" },
];

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyse your current landscape, challenges, and business goals — through stakeholder interviews, technical audits, and scope definition." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof architecture tailored to your business — with a phased delivery plan, tech stack selection, and risk mapping." },
  { n: "03", title: "Build & Implement", desc: "We develop applications, pipelines, integrations, and governance frameworks in structured sprints with weekly stakeholder updates." },
  { n: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your solution as your needs grow — with performance tracking, continuous improvement, and post-delivery support." },
];

const styles = `
/* ── STREAMLINED / INDUSTRIAL VISUAL IDENTITY ── */

.oe-hero { display:grid; grid-template-columns:1.1fr 1fr; gap:60px; align-items:center; }
.oe-lottie { display:flex; align-items:center; justify-content:center; }
.oe-lottie lottie-player { max-width:420px; width:100%; }

/* Mobile hero image */
.oe-hero-img-mobile { display:none; width:100%; border-radius:20px; overflow:hidden; margin-top:8px; }
.oe-hero-img-mobile img { width:100%; display:block; border-radius:20px; max-height:260px; object-fit:cover; }

.oe-metric-strip { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(255,255,255,.07); border-radius:20px; overflow:hidden; margin-top:60px; }
.oe-metric-cell { padding:28px 24px; text-align:center; background:#07100e; transition:.25s; }
.oe-metric-cell:hover { background:rgba(20,184,166,.07) }
.oe-metric-val { font-size:40px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#22c55e); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.oe-metric-lbl { font-size:12px; color:var(--muted); margin-top:4px }

.oe-pillars { margin-top:40px; display:flex; flex-direction:column; gap:16px; }
.oe-pillar { border-radius:20px; border:1px solid rgba(255,255,255,.07); overflow:hidden; transition:.25s; }
.oe-pillar:hover { border-color:rgba(20,184,166,.3) }
.oe-pillar-top { display:grid; grid-template-columns:56px 1fr; gap:20px; padding:28px 28px 20px; align-items:start; }
.oe-pillar-icon { width:52px; height:52px; border-radius:14px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.2); display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
.oe-pillar-top h3 { margin:0 0 8px; font-size:17px; font-weight:700 }
.oe-pillar-top p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }
.oe-pillar-compare { display:grid; grid-template-columns:1fr auto 1fr; gap:0; background:rgba(255,255,255,.025); border-top:1px solid rgba(255,255,255,.06); align-items:center; }
.oe-compare-before, .oe-compare-after { padding:14px 22px; font-size:12px; font-weight:500; }
.oe-compare-before { color:rgba(239,68,68,.7); }
.oe-compare-before span { display:block; font-size:10px; color:var(--muted); margin-bottom:3px; font-weight:400; text-transform:uppercase; letter-spacing:.06em }
.oe-compare-after { color:#22c55e; text-align:right }
.oe-compare-after span { display:block; font-size:10px; color:var(--muted); margin-bottom:3px; font-weight:400; text-transform:uppercase; letter-spacing:.06em }
.oe-compare-arrow { padding:0 16px; font-size:18px; color:var(--muted); text-align:center; }

.oe-improvements { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px; }
.oe-improve-card { padding:28px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s; }
.oe-improve-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px) }
.oe-improve-icon { width:52px; height:52px; border-radius:14px; background:rgba(20,184,166,.08); display:flex; align-items:center; justify-content:center; font-size:22px; margin-bottom:18px; }
.oe-improve-card h3 { margin:0 0 16px; font-size:16px; font-weight:700 }
.oe-improve-card ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px }
.oe-improve-card li { font-size:13px; color:var(--muted); display:flex; align-items:flex-start; gap:8px }
.oe-improve-card li::before { content:'→'; color:#14b8a6; flex-shrink:0; font-weight:700 }

.oe-process { margin-top:50px; position:relative }
.oe-process-track { position:absolute; top:28px; left:calc(10% + 28px); right:calc(10% + 28px); height:1px; background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1)); }
.oe-process-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px }
.oe-step { text-align:center }
.oe-step-node { width:56px; height:56px; border-radius:50%; margin:0 auto 14px; display:flex; align-items:center; justify-content:center; border:1.5px solid rgba(20,184,166,.4); background:#0c1a16; font-weight:700; font-size:13px; color:#2dd4bf; transition:.3s; }
.oe-step:hover .oe-step-node { background:rgba(20,184,166,.18); transform:scale(1.1); box-shadow:0 0 20px rgba(20,184,166,.3) }
.oe-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.oe-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

.oe-case { display:grid; grid-template-columns:1fr 1fr; gap:0; border-radius:24px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.oe-case-img { position:relative; min-height:300px }
.oe-case-img img { width:100%; height:100%; object-fit:cover; display:block }
.oe-case-img::after { content:''; position:absolute; inset:0; background:linear-gradient(to right,transparent 40%,rgba(7,16,14,.95)); }
.oe-case-body { padding:44px 40px; background:rgba(255,255,255,.03); display:flex; flex-direction:column; justify-content:center; }
.oe-case-body h2 { font-size:22px; font-weight:800; margin:0 0 12px }
.oe-case-body p { font-size:14px; color:var(--muted); line-height:1.75; margin:0 0 20px }
.oe-case-body li { font-size:14px; color:var(--muted); margin-bottom:8px }
.oe-case-body li strong { color:#2dd4bf }

.oe-delivery-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
.oe-delivery-card { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.oe-delivery-card:hover { border-color:rgba(20,184,166,.3) }
.oe-delivery-num { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:16px; letter-spacing:-0.04em; }
.oe-delivery-card h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.oe-delivery-card p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

@media(max-width:1000px) {
  .oe-hero { grid-template-columns:1fr; gap:32px }
  .oe-lottie { display:none }
  .oe-hero-img-mobile { display:block }
  .oe-improvements { grid-template-columns:1fr 1fr }
  .oe-case { grid-template-columns:1fr }
  .oe-case-img { min-height:240px }
  .oe-case-img::after { background:linear-gradient(to bottom,transparent 40%,rgba(7,16,14,.95)); }
  .oe-case-body { padding:28px 24px }
  .oe-delivery-grid { grid-template-columns:1fr 1fr }
  .oe-metric-strip { grid-template-columns:1fr 1fr 1fr }
}
@media(max-width:700px) {
  .oe-process-row { grid-template-columns:1fr 1fr }
  .oe-process-track { display:none }
  .oe-metric-strip { grid-template-columns:1fr }
  .oe-improvements { grid-template-columns:1fr }
  .oe-pillar-compare { grid-template-columns:1fr }
  .oe-compare-arrow { display:none }
  .oe-compare-after { text-align:left; padding-top:0 }
  .oe-delivery-grid { grid-template-columns:1fr }
  .oe-case-body { padding:20px 16px }
  .oe-case-body h2 { font-size:18px }
  .oe-pillar-top { padding:20px 16px 14px }
}
`;

export default function OperationalEfficiency() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section">
        <div className="container oe-hero">
          <div>
            <div className="kicker reveal">Operational Efficiency</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Less waste.{" "}
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                More output.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              Inefficient cloud spend, slow developer workflows, legacy systems, and performance regressions silently cap your ceiling. InionData identifies the drag, quantifies it, and eliminates it — with cost optimisation, secure development practices, legacy modernisation, and improved UX that delivers measurable ROI.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Request an audit</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
            <div className="oe-hero-img-mobile reveal">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=75"
                alt="System optimisation"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>

          <div className="oe-lottie reveal">
            <lottie-player autoplay loop mode="normal" src="https://assets8.lottiefiles.com/packages/lf20_hy4txm7l.json" />
          </div>
        </div>

        <div className="container">
          <div className="oe-metric-strip reveal">
            {metrics.map(m => (
              <div key={m.label} className="oe-metric-cell">
                <div className="oe-metric-val">{m.value}</div>
                <div className="oe-metric-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Focus areas</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Where efficiency compounds</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
            Every engagement targets the highest-leverage areas — with before/after metrics to make the value visible to both engineers and leadership.
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
      </section>

      <section className="section">
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
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Scope</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Three dimensions of efficiency</h2>
          <div className="oe-improvements">
            {improvements.map((imp, i) => (
              <div key={imp.area} className="oe-improve-card reveal" style={{ "--i": i }}>
                <div className="oe-improve-icon">{imp.icon}</div>
                <h3>{imp.area}</h3>
                <ul>{imp.actions.map(a => <li key={a}>{a}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
            Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.
          </p>
          <div className="oe-delivery-grid reveal">
            {deliverySteps.map((step) => (
              <div
                key={step.n}
                className="oe-delivery-card"
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(20,184,166,.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"}
              >
                <div className="oe-delivery-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Let's find where you're losing efficiency.</h2>
            <Link className="btn cta-band__btn" to="/contact">Request a free audit</Link>
          </div>
        </div>
      </section>
    </div>
  );
}