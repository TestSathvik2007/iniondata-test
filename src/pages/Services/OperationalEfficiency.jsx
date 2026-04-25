import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

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

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── STREAMLINED / INDUSTRIAL VISUAL IDENTITY ── */

/* HERO */
.oe-hero {
  display:grid;
  grid-template-columns:1.1fr 1fr;
  gap:20px;
  align-items:center;
}
.oe-lottie { display:flex; align-items:center; justify-content:center; }

/* SVG chart animations */
.oe-chart-line {
  stroke-dasharray: 700;
  stroke-dashoffset: 700;
  animation: oe-draw-line 1.8s cubic-bezier(.4,0,.2,1) .4s forwards;
}
.oe-chart-line-secondary {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  animation: oe-draw-line 1.8s cubic-bezier(.4,0,.2,1) .7s forwards;
}
@keyframes oe-draw-line { to { stroke-dashoffset: 0; } }

.oe-chart-area {
  opacity: 0;
  animation: oe-area-in .8s ease 2s forwards;
}
@keyframes oe-area-in { to { opacity: 1; } }

.oe-chart-dot {
  opacity: 0;
  animation: oe-dot-pop .35s cubic-bezier(.22,.68,0,1.4) forwards;
}
.oe-chart-bar {
  transform-origin: bottom;
  transform: scaleY(0);
  animation: oe-bar-grow .5s cubic-bezier(.22,.68,0,1.2) forwards;
}
.oe-chart-badge {
  opacity: 0;
  animation: oe-badge-in .5s cubic-bezier(.22,.68,0,1.2) forwards;
}
@keyframes oe-dot-pop   { to { opacity: 1; } }
@keyframes oe-bar-grow  { to { transform: scaleY(1); } }
@keyframes oe-badge-in  { from { opacity:0; transform: scale(.85); } to { opacity:1; transform: scale(1); } }

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
  transition: border-color .3s, transform .3s, box-shadow .3s;
  opacity:0;
  animation: oe-card-in .5s ease forwards;
  animation-delay: calc(var(--i, 0) * 120ms + 80ms);
}
@keyframes oe-card-in {
  from { opacity:0; transform: translateY(18px); }
  to   { opacity:1; transform: translateY(0); }
}
.oe-improve-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-5px); box-shadow:0 16px 40px rgba(20,184,166,.08); }
.oe-improve-icon {
  width:52px; height:52px; border-radius:14px;
  background:rgba(20,184,166,.08);
  display:flex; align-items:center; justify-content:center;
  font-size:22px; margin-bottom:18px;
  transition: background .25s, transform .25s;
}
.oe-improve-card:hover .oe-improve-icon { background:rgba(20,184,166,.16); transform:scale(1.08); }
.oe-improve-card h3 { margin:0 0 16px; font-size:16px; font-weight:700 }
.oe-improve-card ul { margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:8px }
.oe-improve-card li { font-size:13px; color:var(--muted); display:flex; align-items:flex-start; gap:8px }
.oe-improve-card li::before { content:'→'; color:#14b8a6; flex-shrink:0; font-weight:700 }

/* DELIVERY APPROACH CARDS */
.oe-approach-card {
  padding:28px 24px;
  border-radius:20px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  position:relative;
  overflow:hidden;
  transition: border-color .25s, transform .25s, box-shadow .25s;
}
.oe-approach-card::before {
  content:'';
  position:absolute;
  left:0; top:0; bottom:0;
  width:3px;
  background:linear-gradient(180deg,#14b8a6,#22c55e);
  transform:scaleY(0);
  transform-origin:bottom;
  transition:transform .3s ease;
}
.oe-approach-card:hover { border-color:rgba(20,184,166,.3); transform:translateY(-4px); box-shadow:0 12px 36px rgba(20,184,166,.08); }
.oe-approach-card:hover::before { transform:scaleY(1); }

/* RESPONSIVE */
@media(max-width:1000px) {
  .oe-hero { grid-template-columns:1fr }
  .oe-lottie { display:none }
  .oe-improvements { grid-template-columns:1fr }
}
`;

// Bar data: [x, y, height, fill, delay]
const bars = [
  [80, 200, 60, "rgba(255,255,255,0.08)", "1.2s"],
  [110, 160, 100, "rgba(20,184,166,0.35)", "1.3s"],
  [160, 190, 70, "rgba(255,255,255,0.08)", "1.4s"],
  [190, 130, 130, "rgba(20,184,166,0.45)", "1.5s"],
  [240, 180, 80, "rgba(255,255,255,0.08)", "1.6s"],
  [270, 100, 160, "rgba(34,197,94,0.4)", "1.7s"],
];

const dots = [[40, 260, "1.9s"], [150, 210, "2s"], [250, 120, "2.1s"], [380, 40, "2.2s"]];

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
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 700, textAlign: "justify" }}>
              Ensuring efficient and cost-effective application development management while using secure practices. We expand the capabilities of your legacy applications and enhance user experience by leveraging modern technology — boosting growth by reinventing your applications and speeding up the development process while minimizing maintenance needs.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Request an audit</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* Animated SVG chart */}
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

              {/* Growth curve — filled area (fades in after line draws) */}
              <path
                className="oe-chart-area"
                d="M40 260 C80 255 110 240 150 210 C190 180 210 160 250 120 C280 90 320 65 380 40 L380 280 L40 280 Z"
                fill="rgba(20,184,166,0.10)"
              />

              {/* Growth curve — animated draw */}
              <path
                className="oe-chart-line"
                d="M40 260 C80 255 110 240 150 210 C190 180 210 160 250 120 C280 90 320 65 380 40"
                stroke="url(#oeGrad)" strokeWidth="2.5" strokeLinecap="round"
              />

              {/* Secondary curve (efficiency) */}
              <path
                className="oe-chart-line-secondary"
                d="M40 240 C90 238 130 228 170 205 C210 182 240 158 290 130 C320 112 350 95 380 75"
                stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="6 4"
              />

              {/* Data point dots — pop in after line draws */}
              {dots.map(([cx, cy, delay], i) => (
                <g key={i} className="oe-chart-dot" style={{ animationDelay: delay }}>
                  <circle cx={cx} cy={cy} r="6" fill="#0c1a16" stroke="#14b8a6" strokeWidth="1.5" />
                  <circle cx={cx} cy={cy} r="3" fill="#14b8a6" />
                </g>
              ))}

              {/* Bars — grow from bottom */}
              {bars.map(([x, y, h, fill, delay], i) => (
                <rect
                  key={i}
                  className="oe-chart-bar"
                  x={x} y={y} width="18" height={h} rx="3" fill={fill}
                  style={{ animationDelay: delay }}
                />
              ))}

              {/* Labels */}
              <text x="55" y="298" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="Inter,sans-serif">Legacy</text>
              <text x="175" y="298" fill="rgba(20,184,166,0.7)" fontSize="10" fontFamily="Inter,sans-serif">Modern</text>
              <text x="250" y="298" fill="rgba(34,197,94,0.7)" fontSize="10" fontFamily="Inter,sans-serif">Optimised</text>

              {/* Speed badge — pops in */}
              <g className="oe-chart-badge" style={{ animationDelay: "2.3s" }}>
                <rect x="260" y="48" width="110" height="44" rx="10" fill="rgba(12,26,22,0.95)" stroke="rgba(20,184,166,0.3)" strokeWidth="1" />
                <text x="275" y="67" fill="#2dd4bf" fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">10×</text>
                <text x="275" y="82" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Inter,sans-serif">faster releases</text>
              </g>

              {/* Cost badge — pops in */}
              <g className="oe-chart-badge" style={{ animationDelay: "2.5s" }}>
                <rect x="28" y="100" width="110" height="44" rx="10" fill="rgba(12,26,22,0.95)" stroke="rgba(34,197,94,0.3)" strokeWidth="1" />
                <text x="43" y="119" fill="#4ade80" fontSize="18" fontWeight="800" fontFamily="Inter,sans-serif">60%</text>
                <text x="43" y="134" fill="rgba(255,255,255,0.45)" fontSize="10" fontFamily="Inter,sans-serif">cost reduction</text>
              </g>

              <defs>
                <linearGradient id="oeGrad" x1="40" y1="260" x2="380" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      {/* IMPROVEMENT AREAS */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Scope</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Three dimensions of efficiency</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
            Every engagement targets the highest-leverage areas — improving both how your systems run and how your team operates them.
          </p>

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
              <div key={step.n} className="oe-approach-card" style={{ "--i": i }}>
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