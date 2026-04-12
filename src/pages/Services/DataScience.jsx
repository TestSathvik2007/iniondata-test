import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

const capabilities = [
  {
    title: "Intelligent Data Preparation",
    icon: "beaker",
    bullets: [
      "Transform raw, fragmented data into analysis-ready assets.",
      "Advanced feature engineering for high-impact modeling.",
    ],
  },
  {
    title: "Predictive & AI Solutions",
    icon: "brain",
    bullets: [
      "Build models that forecast trends and behaviors.",
      "NLP, computer vision, and custom AI tailored to your business.",
    ],
  },
  {
    title: "Decision Intelligence",
    icon: "target",
    bullets: [
      "Go beyond dashboards with actionable, insight-driven strategies.",
      "Identify opportunities, risks, and optimization paths.",
    ],
  },
  {
    title: "MLOps & Model Lifecycle",
    icon: "loop",
    bullets: [
      "Production-ready model deployment at scale.",
      "Continuous learning, monitoring, and refinement.",
    ],
  },
  {
    title: "Insight Experience",
    icon: "sparkle",
    bullets: [
      "Story-driven visualizations that influence decisions.",
      "Business-friendly outputs for real-world impact.",
    ],
  },
  {
    title: "Explainability & Governance",
    icon: "shield",
    bullets: [
      "Transparent, auditable model outputs for regulated industries.",
      "Bias detection, fairness checks, and compliance-ready reporting.",
    ],
  },
];

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyze your current data landscape, challenges, and goals." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business." },
  { n: "03", title: "Build & Implementation", desc: "We develop pipelines, storage layers, governance frameworks, and integrations." },
  { n: "04", title: "Optimization & Support", desc: "We monitor, refine, and evolve your data ecosystem as your needs grow." },
];

const tools = ["Python", "TensorFlow", "PyTorch", "scikit-learn", "HuggingFace", "MLflow", "Jupyter", "Pandas", "Spark ML", "AutoML", "OpenCV", "LangChain"];
const metrics = [
  { value: "4×", label: "Faster model time-to-production" },
  { value: "85%", label: "Prediction accuracy improvement" },
  { value: "3×", label: "ROI on AI investments" },
];

const styles = `
@keyframes ds-neural { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes ds-scan   { 0%{transform:translateY(0)} 100%{transform:translateY(260px)} }
@keyframes ds-in     { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

.ds-hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.ds-neural-wrap { position:relative; display:flex; align-items:center; justify-content:center; animation:ds-in .9s var(--ease) both; }
.ds-neural-wrap::before { content:''; position:absolute; inset:-50px; border-radius:50%; background:radial-gradient(circle,rgba(20,184,166,.12),transparent 62%); pointer-events:none; }

/* Mobile hero image */
.ds-hero-img-mobile { display:none; width:100%; border-radius:20px; overflow:hidden; margin-top:8px; }
.ds-hero-img-mobile img { width:100%; display:block; border-radius:20px; max-height:260px; object-fit:cover; }

.ds-stat-band { display:grid; grid-template-columns:repeat(3,1fr); margin-top:60px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.ds-stat { padding:32px 28px; text-align:center; background:rgba(255,255,255,.03); border-right:1px solid rgba(255,255,255,.08); transition:.25s; }
.ds-stat:last-child { border-right:none }
.ds-stat:hover { background:rgba(20,184,166,.07) }
.ds-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.ds-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

.ds-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px; }
.ds-card { padding:28px 26px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s var(--ease); position:relative; overflow:hidden; }
.ds-card::before { content:''; position:absolute; top:-1px; left:-1px; right:-1px; height:2px; background:linear-gradient(90deg,transparent,#14b8a6,transparent); opacity:0; transition:.3s; }
.ds-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.ds-card:hover::before { opacity:1 }
.ds-card-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.25); display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:#2dd4bf; }
.ds-card-icon svg { width:20px; height:20px; }
.ds-card h3 { margin:0 0 14px; font-size:16px; font-weight:700; color:var(--text) }
.ds-card ul { margin:0; padding:0; list-style:none; display:grid; gap:7px }
.ds-card li { display:flex; align-items:flex-start; gap:8px; font-size:13px; color:var(--muted); line-height:1.55 }
.ds-card li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--teal); flex-shrink:0; margin-top:5px }

.ds-tools { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px }
.ds-pill { padding:8px 18px; border-radius:999px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); font-size:13px; font-weight:500; transition:.2s; }
.ds-pill:hover { background:rgba(20,184,166,.1); border-color:rgba(20,184,166,.4); color:var(--teal-2) }

.ds-delivery { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
.ds-step { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.ds-step:hover { border-color:rgba(20,184,166,.3) }
.ds-step-n { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:14px; letter-spacing:-0.04em; }
.ds-step h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.ds-step p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

@media(max-width:1000px) {
  .ds-hero { grid-template-columns:1fr; gap:32px }
  .ds-neural-wrap { display:none }
  .ds-hero-img-mobile { display:block }
  .ds-grid { grid-template-columns:1fr 1fr }
  .ds-delivery { grid-template-columns:1fr 1fr }
}
@media(max-width:640px) {
  .ds-grid { grid-template-columns:1fr }
  .ds-stat-band { grid-template-columns:1fr }
  .ds-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
  .ds-stat:last-child { border-bottom:none }
  .ds-delivery { grid-template-columns:1fr }
}
`;

const dsIcons = {
  beaker: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H15M9 3v8l-4.5 9A2 2 0 006.27 23h11.46a2 2 0 001.77-2L15 11V3M9 3h6"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a2.5 2.5 0 015 0v.5a2.5 2.5 0 01-5 0V2zM4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z"/><path d="M12 6v12M8 10h8M8 14h8"/></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  loop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/><path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 18l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1zM18 16l1 2 1-2 2-1-2-1-1-2-1 2-2 1 2 1z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
};

export default function DataScience() {
  useReveal();
  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container ds-hero">
          <div>
            <div className="kicker reveal">Data Science</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Making Your Data<br />
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Work Smarter.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              At InionData, we go beyond dashboards and reports. We help you uncover what your data is really telling you, so you can make faster decisions, predict what's next, and stay ahead of the curve.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
            <div className="ds-hero-img-mobile reveal">
              <img
                src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=700&q=75"
                alt="Data science and machine learning"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>

          <div className="ds-neural-wrap reveal">
            <svg viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
              <defs>
                <radialGradient id="ds-node" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity=".55"/>
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity=".08"/>
                </radialGradient>
              </defs>
              {[60,130,200,270,340].map((y,i) => (
                <circle key={`i${i}`} cx={60} cy={y} r={15} fill="url(#ds-node)" stroke="rgba(20,184,166,.5)" strokeWidth="1.5"
                  style={{ animation: `ds-neural ${2+i*.3}s ease-in-out ${i*.2}s infinite` }}/>
              ))}
              {[100,200,300].map((y,i) => (
                <circle key={`h${i}`} cx={210} cy={y} r={19} fill="rgba(34,197,94,.12)" stroke="rgba(34,197,94,.38)" strokeWidth="1.5"
                  style={{ animation: `ds-neural ${2.5+i*.4}s ease-in-out ${i*.3}s infinite` }}/>
              ))}
              {[160,200,240].map((y,i) => (
                <circle key={`o${i}`} cx={350} cy={y} r={16} fill="rgba(20,184,166,.18)" stroke="#14b8a6" strokeWidth="2"
                  style={{ animation: `ds-neural ${2+i*.5}s ease-in-out ${i*.4}s infinite` }}/>
              ))}
              {[60,130,200,270,340].flatMap((y1,i) => [100,200,300].map((y2,j) => (
                <line key={`c1-${i}-${j}`} x1={75} y1={y1} x2={191} y2={y2} stroke="rgba(20,184,166,.1)" strokeWidth="1"/>
              )))}
              {[100,200,300].flatMap((y1,i) => [160,200,240].map((y2,j) => (
                <line key={`c2-${i}-${j}`} x1={229} y1={y1} x2={334} y2={y2} stroke="rgba(34,197,94,.12)" strokeWidth="1"/>
              )))}
              <rect x={0} y={0} width={400} height={3} fill="url(#ds-node)" opacity=".5"
                style={{ animation: "ds-scan 3s linear infinite" }}/>
            </svg>
          </div>
        </div>

        <div className="container">
          <div className="ds-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="ds-stat">
                <div className="ds-stat-val">{m.value}</div>
                <div className="ds-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Our Capabilities</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>From raw data to intelligent systems — everything your team needs to lead with insight.</p>
          <div className="ds-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="ds-card reveal" style={{ "--i": i }}>
                <div className="ds-card-icon">{dsIcons[cap.icon]}</div>
                <h3>{cap.title}</h3>
                <ul>{cap.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker reveal">Tech stack</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Tools we work with</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 540 }}>Industry-leading frameworks applied with the precision your data deserves.</p>
          <div className="ds-tools reveal">
            {tools.map(t => <div key={t} className="ds-pill">{t}</div>)}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.</p>
          <div className="ds-delivery reveal">
            {deliverySteps.map(s => (
              <div key={s.n} className="ds-step">
                <div className="ds-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to make your data work smarter?</h2>
            <Link className="btn cta-band__btn" to="/contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}