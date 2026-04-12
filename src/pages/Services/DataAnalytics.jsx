import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

const capabilities = [
  {
    title: "Data Strategy & Consulting",
    icon: "target",
    bullets: [
      "Align data goals with business strategy",
      "Assess data maturity",
      "Create strong governance frameworks",
    ],
  },
  {
    title: "Data Integration & Management",
    icon: "merge",
    bullets: [
      "Connect siloed systems",
      "Build and manage scalable data warehouses",
      "Implement smooth, secure data pipelines",
    ],
  },
  {
    title: "Advanced Analytics & Insights",
    icon: "brain",
    bullets: [
      "Predict trends with machine learning",
      "Uncover patterns that drive innovation",
      "Share insights with dashboards that speak your language",
    ],
  },
  {
    title: "Business Intelligence & Reporting",
    icon: "chart",
    bullets: [
      "Custom BI tools and visual dashboards",
      "Automated, real-time reporting",
      "Data storytelling that drives action",
    ],
  },
  {
    title: "Data Visualization",
    icon: "sparkle",
    bullets: [
      "Complex data made beautifully clear",
      "Visuals that engage, inform, and persuade",
      "Training in-house visualization best practices",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    icon: "gear",
    bullets: [
      "Solving business challenges with smart modelling",
      "NLP, image recognition, and custom AI tools",
      "Ongoing model updates to stay accurate and effective",
    ],
  },
];

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyze your current data landscape, challenges, and goals." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business." },
  { n: "03", title: "Build & Implementation", desc: "We develop pipelines, storage layers, governance frameworks, and integrations." },
  { n: "04", title: "Optimization & Support", desc: "We monitor, refine, and evolve your data ecosystem as your needs grow." },
];

const metrics = [
  { value: "6×", label: "Faster time-to-insight" },
  { value: "80%", label: "Reduction in manual reporting" },
  { value: "100%", label: "Cloud-native delivery" },
];

const industries = ["Financial Services", "Healthcare & Life Sciences", "Retail & eCommerce", "Manufacturing", "Technology & SaaS", "Logistics & Supply Chain"];

const styles = `
@keyframes da-bar  { from{transform:scaleY(0)} to{transform:scaleY(1)} }
@keyframes da-pulse { 0%,100%{opacity:.14} 50%{opacity:.26} }
@keyframes da-drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes da-flow  { 0%{left:0;opacity:1} 100%{left:65%;opacity:0} }

.da-hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; position:relative; }
.da-hero-visual { position:relative; display:flex; align-items:center; justify-content:center; animation:da-drift 7s ease-in-out infinite; }
.da-hero-visual::before { content:''; position:absolute; inset:-60px; border-radius:50%; background:radial-gradient(circle,rgba(20,184,166,.12),transparent 65%); pointer-events:none; animation:da-pulse 5s ease-in-out infinite; }

/* Mobile hero image */
.da-hero-img-mobile { display:none; width:100%; border-radius:20px; overflow:hidden; margin-top:8px; }
.da-hero-img-mobile img { width:100%; display:block; border-radius:20px; max-height:260px; object-fit:cover; }

.da-stat-band { display:grid; grid-template-columns:repeat(3,1fr); margin-top:60px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.da-stat { padding:32px 28px; text-align:center; background:rgba(255,255,255,.03); border-right:1px solid rgba(255,255,255,.08); transition:.25s; }
.da-stat:last-child { border-right:none }
.da-stat:hover { background:rgba(20,184,166,.07) }
.da-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.da-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

.da-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px; }
.da-card { padding:28px 26px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s var(--ease); position:relative; overflow:hidden; }
.da-card::before { content:''; position:absolute; top:-1px; left:-1px; right:-1px; height:2px; background:linear-gradient(90deg,transparent,#14b8a6,transparent); opacity:0; transition:.3s; }
.da-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.da-card:hover::before { opacity:1 }
.da-card-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.25); display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:#2dd4bf; }
.da-card-icon svg { width:20px; height:20px; }
.da-card h3 { margin:0 0 14px; font-size:16px; font-weight:700; color:var(--text) }
.da-card ul { margin:0; padding:0; list-style:none; display:grid; gap:7px }
.da-card li { display:flex; align-items:flex-start; gap:8px; font-size:13px; color:var(--muted); line-height:1.55 }
.da-card li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--teal); flex-shrink:0; margin-top:5px }

.da-process { position:relative; margin-top:40px }
.da-connector { position:absolute; top:28px; left:calc(12.5% + 28px); right:calc(12.5% + 28px); height:1px; background:linear-gradient(90deg,rgba(20,184,166,.7),rgba(20,184,166,.1)); pointer-events:none; }
.da-connector::after { content:''; position:absolute; top:-1px; left:0; width:40%; height:3px; background:linear-gradient(90deg,#14b8a6,transparent); animation:da-flow 3s ease-in-out infinite; }

.da-delivery { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; }
.da-step { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.da-step:hover { border-color:rgba(20,184,166,.3) }
.da-step-n { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:14px; letter-spacing:-0.04em; }
.da-step h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.da-step p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

.da-industries { display:flex; flex-wrap:wrap; gap:10px; margin-top:24px }
.da-ind-pill { padding:8px 18px; border-radius:999px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); font-size:13px; font-weight:500; transition:.2s; }
.da-ind-pill:hover { background:rgba(20,184,166,.1); border-color:rgba(20,184,166,.4); color:var(--teal-2) }

.da-cta-blurb { margin-top:56px; padding:40px 44px; border-radius:20px; background:rgba(20,184,166,.05); border:1px solid rgba(20,184,166,.18); }

@media(max-width:1000px) {
  .da-hero { grid-template-columns:1fr; gap:32px }
  .da-hero-visual { display:none }
  .da-hero-img-mobile { display:block }
  .da-grid { grid-template-columns:1fr 1fr }
  .da-delivery { grid-template-columns:1fr 1fr }
  .da-connector { display:none }
  .da-cta-blurb { padding:28px 24px }
}
@media(max-width:640px) {
  .da-grid { grid-template-columns:1fr }
  .da-stat-band { grid-template-columns:1fr }
  .da-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
  .da-stat:last-child { border-bottom:none }
  .da-delivery { grid-template-columns:1fr }
  .da-cta-blurb { padding:20px 16px }
}
`;

const daIcons = {
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  merge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 009 9"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 015 5c0 1-.3 2-.8 2.7A4 4 0 0119 13a4 4 0 01-4 4H9a4 4 0 01-4-4 4 4 0 012.8-3.8A5 5 0 0112 2z"/><line x1="12" y1="9" x2="12" y2="17"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="18" y="3" width="4" height="18"/><rect x="10" y="8" width="4" height="13"/><rect x="2" y="13" width="4" height="8"/></svg>,
  sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z"/><path d="M5 18l1 3 1-3 3-1-3-1-1-3-1 3-3 1 3 1z"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
};

export default function DataAnalytics() {
  useReveal();
  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container da-hero">
          <div>
            <div className="kicker reveal">Data & Analytics</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Turn your data into<br />
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                strategic insight.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              At InionData, we help you move beyond data collection to data-driven decision-making. Whether you're just starting out or scaling fast, we transform complex data into clear, actionable strategies that unlock growth and innovation.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
            <div className="da-hero-img-mobile reveal">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75"
                alt="Data analytics dashboard"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>

          <div className="da-hero-visual reveal">
            <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="40" y1={60+i*56} x2="390" y2={60+i*56} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4"/>
              ))}
              {[
                { x: 60,  h: 160, even: true  },
                { x: 120, h: 100, even: false },
                { x: 180, h: 210, even: true  },
                { x: 240, h: 130, even: false },
                { x: 300, h: 250, even: true  },
                { x: 360, h: 175, even: false },
              ].map((b, i) => (
                <rect key={i} x={b.x} y={300-b.h} width="40" height={b.h} rx="6"
                  fill={b.even ? "rgba(20,184,166,.22)" : "rgba(34,197,94,.18)"}
                  style={{ transformOrigin: `${b.x+20}px 300px`, animation: `da-bar 1s ${i*.1}s cubic-bezier(0.22,1,0.36,1) both` }}
                />
              ))}
              <polyline points="80,230 140,260 200,150 260,210 320,90 380,170"
                stroke="#2dd4bf" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity=".85"/>
              {[[80,230],[140,260],[200,150],[260,210],[320,90],[380,170]].map(([cx,cy],i) => (
                <circle key={i} cx={cx} cy={cy} r="5" fill="#14b8a6" opacity=".9"/>
              ))}
              <line x1="40" y1="300" x2="400" y2="300" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5"/>
              <line x1="40" y1="40"  x2="40"  y2="300" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>

        <div className="container">
          <div className="da-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="da-stat">
                <div className="da-stat-val">{m.value}</div>
                <div className="da-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>What we do</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>End-to-end data capabilities — from strategy through to AI-powered insights.</p>
          <div className="da-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="da-card reveal" style={{ "--i": i }}>
                <div className="da-card-icon">{daIcons[cap.icon]}</div>
                <h3>{cap.title}</h3>
                <ul>{cap.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.</p>
          <div className="da-process reveal">
            <div className="da-delivery">
              {deliverySteps.map(s => (
                <div key={s.n} className="da-step">
                  <div className="da-step-n">{s.n}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Industries</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Industries we support</h2>
          <div className="da-industries reveal">
            {industries.map(i => <div key={i} className="da-ind-pill">{i}</div>)}
          </div>
          <div className="da-cta-blurb reveal">
            <h3 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 800 }}>Let's Build Your Data Advantage</h3>
            <p style={{ margin: "0 0 24px", fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>
              Whether you're modernizing legacy systems, scaling analytics, or preparing for AI, InionData engineers the data backbone your business needs to thrive.
            </p>
            <Link className="btn btn--primary" to="/contact">Book a discovery call</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to unlock your data's potential?</h2>
            <Link className="btn cta-band__btn" to="/contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}