import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────
// All copy word-for-word from WebSite_Content.docx

const capabilities = [
  {
    title: "Data Annotation & Labeling",
    icon: "tag",
    bullets: [
      "High-quality labeling for text, image, audio, and video data.",
      "Domain-specific annotation with human accuracy.",
    ],
  },
  {
    title: "AI Model Validation",
    icon: "check",
    bullets: [
      "Human review of model predictions and outputs.",
      "Feedback loops to improve model performance.",
    ],
  },
  {
    title: "Content Moderation",
    icon: "shield",
    bullets: [
      "Context-aware human review for sensitive or complex content.",
      "Scalable moderation workflows.",
    ],
  },
  {
    title: "Exception Handling & Decision Support",
    icon: "bolt",
    bullets: [
      "Human intervention for edge cases and critical decisions.",
      "Hybrid workflows combining automation with expert review.",
    ],
  },
  {
    title: "Continuous Learning Loops",
    icon: "loop",
    bullets: [
      "Iterative feedback to retrain and refine AI models.",
      "Improve accuracy over time with human insights.",
    ],
  },
];

// Delivery approach – word-for-word from docx
const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyze your current data landscape, challenges, and goals." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business." },
  { n: "03", title: "Build & Implementation", desc: "We develop pipelines, storage layers, governance frameworks, and integrations." },
  { n: "04", title: "Optimization & Support", desc: "We monitor, refine, and evolve your data ecosystem as your needs grow." },
];

// ★ Added by Claude
const metrics = [
  { value: "98%", label: "Annotation accuracy rate" },
  { value: "5×", label: "Model improvement speed" },
  { value: "60%", label: "Reduction in false positives" },
];
const dataTypes = ["Text & NLP", "Images & Video", "Audio & Speech", "Documents & Forms", "Medical Imaging", "Geospatial Data", "Sensor Data", "Code & Logs"];
const loopSteps = [
  { icon: "AI", title: "AI Generates", desc: "Model produces predictions, labels, or decisions" },
  { icon: "HU", title: "Human Reviews", desc: "Expert validates, corrects, and annotates edge cases" },
  { icon: "FB", title: "Feedback Ingested", desc: "Corrections are captured and structured for retraining" },
  { icon: "UP", title: "Model Improves", desc: "AI is retrained and deployed with higher accuracy" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
@keyframes hitl-loop { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
@keyframes hitl-ping { 0%{transform:scale(1);opacity:.7} 80%,100%{transform:scale(2.2);opacity:0} }
@keyframes hitl-in   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
@keyframes hitl-glow { 0%,100%{opacity:.13} 50%{opacity:.24} }

.hitl-hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.hitl-diagram-wrap { position:relative; display:flex; align-items:center; justify-content:center; animation:hitl-in .9s var(--ease) both; }
.hitl-diagram-wrap::before { content:''; position:absolute; inset:-50px; border-radius:50%; background:radial-gradient(circle,rgba(20,184,166,.12),transparent 62%); animation:hitl-glow 5s ease-in-out infinite; }

.hitl-ping-dot { position:absolute; width:14px; height:14px; border-radius:50%; background:var(--teal); top:calc(50% - 98px); left:50%; transform:translateX(-50%); }
.hitl-ping-dot::before { content:''; position:absolute; inset:-4px; border-radius:50%; background:var(--teal); animation:hitl-ping 2s ease-out infinite; }

.hitl-stat-band { display:grid; grid-template-columns:repeat(3,1fr); margin-top:60px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.hitl-stat { padding:32px 28px; text-align:center; background:rgba(255,255,255,.03); border-right:1px solid rgba(255,255,255,.08); transition:.25s; }
.hitl-stat:last-child { border-right:none }
.hitl-stat:hover { background:rgba(20,184,166,.07) }
.hitl-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.hitl-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

/* LOOP DIAGRAM */
.hitl-loop { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:40px; position:relative; }
.hitl-loop-step { text-align:center; padding:0 12px; position:relative; }
.hitl-loop-circle { width:64px; height:64px; border-radius:50%; background:rgba(20,184,166,.1); border:2px solid rgba(20,184,166,.35); margin:0 auto 16px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; color:#2dd4bf; letter-spacing:.04em; transition:.3s; }
.hitl-loop-step:hover .hitl-loop-circle { background:rgba(20,184,166,.2); box-shadow:0 0 28px rgba(20,184,166,.25); transform:scale(1.08) }
.hitl-loop-arrow { position:absolute; top:32px; right:-8px; font-size:18px; color:rgba(20,184,166,.45); z-index:1; }
.hitl-loop-step:last-child .hitl-loop-arrow { display:none }
.hitl-loop-step h4 { font-size:14px; font-weight:700; margin:0 0 6px; color:var(--text) }
.hitl-loop-step p { font-size:12px; color:var(--muted); margin:0; line-height:1.55 }

/* CAPABILITY GRID — all 5 in one row */
.hitl-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; margin-top:40px; }
.hitl-card { padding:24px 20px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s var(--ease); position:relative; overflow:hidden; }
.hitl-card::before { content:''; position:absolute; top:-1px; left:-1px; right:-1px; height:2px; background:linear-gradient(90deg,transparent,#14b8a6,transparent); opacity:0; transition:.3s; }
.hitl-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.hitl-card:hover::before { opacity:1 }
.hitl-card-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.25); display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
.hitl-card-icon svg { width:20px; height:20px; stroke:#2dd4bf; fill:none; stroke-width:1.8; stroke-linecap:round; stroke-linejoin:round; }
.hitl-card h3 { margin:0 0 14px; font-size:15px; font-weight:700; color:var(--text) }
.hitl-card ul { margin:0; padding:0; list-style:none; display:grid; gap:7px }
.hitl-card li { display:flex; align-items:flex-start; gap:8px; font-size:12px; color:var(--muted); line-height:1.55 }
.hitl-card li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--teal); flex-shrink:0; margin-top:4px }

.hitl-types { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px }
.hitl-type-pill { padding:8px 18px; border-radius:999px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); font-size:13px; font-weight:500; transition:.2s; }
.hitl-type-pill:hover { background:rgba(20,184,166,.1); border-color:rgba(20,184,166,.4); color:var(--teal-2) }

.hitl-delivery { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
.hitl-step { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.hitl-step:hover { border-color:rgba(20,184,166,.3) }
.hitl-step-n { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:14px; letter-spacing:-0.04em; }
.hitl-step h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.hitl-step p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

@media(max-width:1200px) { .hitl-grid { grid-template-columns:repeat(3,1fr) } }
@media(max-width:1000px) { .hitl-hero { grid-template-columns:1fr } .hitl-diagram-wrap { display:none } .hitl-grid { grid-template-columns:1fr 1fr } .hitl-loop { grid-template-columns:1fr 1fr; gap:24px } .hitl-loop-arrow { display:none } .hitl-delivery { grid-template-columns:1fr 1fr } }
@media(max-width:640px) { .hitl-grid { grid-template-columns:1fr } .hitl-stat-band { grid-template-columns:1fr } .hitl-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) } .hitl-loop { grid-template-columns:1fr } .hitl-delivery { grid-template-columns:1fr } }
`;

// SVG icon map for HITL cards
const hitlIcons = {
  tag: <svg viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>,
  check: <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>,
  shield: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  bolt: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  loop: <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>,
};

export default function HumanInTheLoop() {
  useReveal();
  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container hitl-hero">
          <div>
            <div className="kicker reveal">Human in the Loop (HITL)</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Where Human Judgment<br />
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Meets AI Precision.
              </span>
            </h1>
            {/* Word-for-word from docx */}
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              At InionData, we bridge the gap between automation and human intelligence. Our Human-in-the-Loop approach enhances AI systems with real-time human validation, ensuring accuracy, reliability, and continuous improvement.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* ★ Added by Claude — Human↔AI loop SVG using site palette */}
          <div className="hitl-diagram-wrap reveal">
            <svg viewBox="0 0 400 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
              <defs>
                <linearGradient id="hitl-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#14b8a6"/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity=".4"/>
                </linearGradient>
              </defs>
              {/* Orbit ring */}
              <ellipse cx={200} cy={190} rx={140} ry={110} stroke="rgba(20,184,166,.18)" strokeWidth="1.5" strokeDasharray="8 4"/>
              {/* Animated flow */}
              <ellipse cx={200} cy={190} rx={140} ry={110} stroke="url(#hitl-grad)" strokeWidth="2.5" fill="none"
                strokeDasharray="60 700" style={{ animation: "hitl-loop 4s linear infinite" }}/>
              {/* Human node */}
              <circle cx={80} cy={190} r={44} fill="rgba(20,184,166,.1)" stroke="rgba(20,184,166,.38)" strokeWidth="2"/>
              <text x={80} y={184} textAnchor="middle" fill="#2dd4bf" fontSize="13" fontWeight="700">HUMAN</text>
              <text x={80} y={200} textAnchor="middle" fill="#14b8a6" fontSize="10">Expert</text>
              {/* AI node */}
              <circle cx={320} cy={190} r={44} fill="rgba(34,197,94,.08)" stroke="rgba(34,197,94,.35)" strokeWidth="2"/>
              <text x={320} y={184} textAnchor="middle" fill="#4ade80" fontSize="13" fontWeight="700">AI</text>
              <text x={320} y={200} textAnchor="middle" fill="#22c55e" fontSize="10">Model</text>
              {/* Top label — moved up so dot doesn't overlap text */}
              <circle cx={200} cy={80} r={5} fill="#14b8a6" opacity=".9"/>
              <rect x={150} y={30} width={100} height={28} rx="6" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.28)" strokeWidth="1"/>
              <text x={200} y={49} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600">VALIDATE</text>
              {/* Bottom label — moved down so dot doesn't overlap text */}
              <circle cx={200} cy={300} r={5} fill="#14b8a6" opacity=".9"/>
              <rect x={125} y={315} width={150} height={28} rx="6" fill="rgba(20,184,166,.08)" stroke="rgba(20,184,166,.28)" strokeWidth="1"/>
              <text x={200} y={334} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="600">LEARN & IMPROVE</text>
            </svg>
            <div className="hitl-ping-dot" />
          </div>
        </div>

        {/* Stats — ★ Added by Claude */}
        <div className="container">
          <div className="hitl-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="hitl-stat">
                <div className="hitl-stat-val">{m.value}</div>
                <div className="hitl-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HITL LOOP — ★ Added by Claude */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">How it works</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>The HITL feedback cycle</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Human expertise and AI efficiency in a continuous loop — each improving the other over time.</p>
          <div className="hitl-loop reveal">
            {loopSteps.map((s, i) => (
              <div key={s.title} className="hitl-loop-step">
                <div className="hitl-loop-circle">{s.icon}</div>
                {i < loopSteps.length - 1 && <div className="hitl-loop-arrow">→</div>}
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER — word-for-word from docx */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">What We Deliver</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What We Deliver</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>From data labeling to continuous learning — every layer of the human-AI interface, covered.</p>
          <div className="hitl-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="hitl-card reveal" style={{ "--i": i }}>
                <div className="hitl-card-icon">{hitlIcons[cap.icon]}</div>
                <h3>{cap.title}</h3>
                <ul>{cap.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DATA TYPES — ★ Added by Claude */}
      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Data types</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Data types we annotate</h2>
          <div className="hitl-types reveal">
            {dataTypes.map(t => <div key={t} className="hitl-type-pill">{t}</div>)}
          </div>
        </div>
      </section>

      {/* DELIVERY APPROACH — word-for-word from docx */}
      <section className="section">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.</p>
          <div className="hitl-delivery reveal">
            {deliverySteps.map(s => (
              <div key={s.n} className="hitl-step">
                <div className="hitl-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to enhance your AI with human intelligence?</h2>
            <Link className="btn cta-band__btn" to="/contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}