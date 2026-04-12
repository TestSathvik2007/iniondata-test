import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

const capabilities = [
  {
    title: "Modern Data Architecture",
    icon: "arch",
    bullets: [
      "Cloud-native, scalable data platforms",
      "Data lake and data warehouse design",
      "Real-time and batch data processing",
      "Architecture modernization and migration",
    ],
  },
  {
    title: "Data Pipeline Development",
    icon: "bolt",
    bullets: [
      "ETL/ELT pipeline design and automation",
      "High-volume ingestion from diverse sources",
      "Stream processing for real-time insights",
      "Orchestration and workflow management",
    ],
  },
  {
    title: "Data Quality & Governance",
    icon: "shield",
    bullets: [
      "Data validation and monitoring frameworks",
      "Master data management",
      "Metadata management and lineage tracking",
      "Compliance-ready governance models",
    ],
  },
  {
    title: "Cloud Data Engineering",
    icon: "cloud",
    bullets: [
      "Azure, AWS, and Google Cloud expertise",
      "Serverless data processing",
      "Cost-optimized storage and compute strategies",
      "Cloud migration and optimization",
    ],
  },
  {
    title: "Analytics & AI Enablement",
    icon: "brain",
    bullets: [
      "Feature engineering for machine learning",
      "Data models for BI and reporting",
      "Integration with analytics and AI platforms",
      "Operationalization of ML pipelines",
    ],
  },
  {
    title: "Observability & Reliability",
    icon: "monitor",
    bullets: [
      "Pipeline monitoring and alerting frameworks",
      "SLA-driven data availability guarantees",
      "Incident response and root-cause analysis",
      "Automated recovery and self-healing pipelines",
    ],
  },
];

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyze your current data landscape, challenges, and goals." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business." },
  { n: "03", title: "Build & Implementation", desc: "We develop pipelines, storage layers, governance frameworks, and integrations." },
  { n: "04", title: "Optimization & Support", desc: "We monitor, refine, and evolve your data ecosystem as your needs grow." },
];

const techStack = ["Apache Spark", "dbt", "Airflow", "Kafka", "Databricks", "Snowflake", "Azure Data Factory", "BigQuery", "Redshift", "Great Expectations", "Terraform", "dlt"];

const metrics = [
  { value: "10×", label: "Pipeline throughput gains" },
  { value: "99.9%", label: "Data availability SLA" },
  { value: "50%", label: "Cloud cost reduction" },
];

const styles = `
@keyframes de-flow  { 0%{stroke-dashoffset:200} 100%{stroke-dashoffset:0} }
@keyframes de-pulse { 0%,100%{opacity:.14} 50%{opacity:.26} }
@keyframes de-in    { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }

.de-hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
.de-pipeline-wrap { position:relative; display:flex; align-items:center; justify-content:center; animation:de-in .9s var(--ease) both; }
.de-pipeline-wrap::before { content:''; position:absolute; inset:-40px; border-radius:50%; background:radial-gradient(circle,rgba(20,184,166,.12),transparent 65%); animation:de-pulse 5s ease-in-out infinite; }

/* Mobile hero image */
.de-hero-img-mobile { display:none; width:100%; border-radius:20px; overflow:hidden; margin-top:8px; }
.de-hero-img-mobile img { width:100%; display:block; border-radius:20px; max-height:260px; object-fit:cover; }

.de-stat-band { display:grid; grid-template-columns:repeat(3,1fr); margin-top:60px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.de-stat { padding:32px 28px; text-align:center; background:rgba(255,255,255,.03); border-right:1px solid rgba(255,255,255,.08); transition:.25s; }
.de-stat:last-child { border-right:none }
.de-stat:hover { background:rgba(20,184,166,.07) }
.de-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.de-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

.de-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px; }
.de-card { padding:28px 26px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s var(--ease); position:relative; overflow:hidden; }
.de-card::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#14b8a6,#22c55e); transform:scaleX(0); transform-origin:left; transition:.3s; }
.de-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.de-card:hover::after { transform:scaleX(1) }
.de-card-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.25); display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:#2dd4bf; }
.de-card-icon svg { width:20px; height:20px; }
.de-card h3 { margin:0 0 14px; font-size:16px; font-weight:700; color:var(--text) }
.de-card ul { margin:0; padding:0; list-style:none; display:grid; gap:7px }
.de-card li { display:flex; align-items:flex-start; gap:8px; font-size:13px; color:var(--muted); line-height:1.55 }
.de-card li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--teal); flex-shrink:0; margin-top:5px }

.de-tech { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px }
.de-pill { padding:8px 18px; border-radius:999px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); font-size:13px; font-weight:500; transition:.2s; }
.de-pill:hover { background:rgba(20,184,166,.1); border-color:rgba(20,184,166,.4); color:var(--teal-2) }

.de-delivery { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
.de-step { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.de-step:hover { border-color:rgba(20,184,166,.3) }
.de-step-n { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:14px; letter-spacing:-0.04em; }
.de-step h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.de-step p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

.de-banner { padding:40px 44px; border-radius:20px; background:rgba(20,184,166,.05); border:1px solid rgba(20,184,166,.18); display:grid; grid-template-columns:1fr auto; align-items:center; gap:32px; margin-top:56px; }

@media(max-width:1000px) {
  .de-hero { grid-template-columns:1fr; gap:32px }
  .de-pipeline-wrap { display:none }
  .de-hero-img-mobile { display:block }
  .de-grid { grid-template-columns:1fr 1fr }
  .de-delivery { grid-template-columns:1fr 1fr }
  .de-banner { grid-template-columns:1fr; padding:28px 24px }
}
@media(max-width:640px) {
  .de-grid { grid-template-columns:1fr }
  .de-stat-band { grid-template-columns:1fr }
  .de-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
  .de-stat:last-child { border-bottom:none }
  .de-delivery { grid-template-columns:1fr }
  .de-banner { padding:20px 16px }
}
`;

const deIcons = {
  arch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  cloud: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 015 5c0 1-.3 2-.8 2.7A4 4 0 0119 13a4 4 0 01-4 4H9a4 4 0 01-4-4 4 4 0 012.8-3.8A5 5 0 0112 2z"/><line x1="12" y1="9" x2="12" y2="17"/></svg>,
  monitor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
};

export default function DataEngineering() {
  useReveal();
  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container de-hero">
          <div>
            <div className="kicker reveal">Data Engineering</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Transform Your Data into a<br />
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Strategic Advantage.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: "65ch" }}>
              InionData generates more data than ever, but turning that raw information into reliable, actionable insight requires the right foundation. Our Data Engineering Services help you build that foundation — scalable, secure, and designed for real-world decision-making.
            </p>
            <p className="lead reveal" style={{ marginTop: 12, maxWidth: "65ch", fontSize: 15 }}>
              We architect and implement end-to-end data solutions that empower your teams to trust their data, automate workflows, and unlock new opportunities for growth.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
            <div className="de-hero-img-mobile reveal">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=75"
                alt="Data engineering pipelines"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>

          <div className="de-pipeline-wrap reveal">
            <svg viewBox="0 0 420 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
              <defs>
                <linearGradient id="de-grad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity=".9"/>
                  <stop offset="100%" stopColor="#22c55e" stopOpacity=".3"/>
                </linearGradient>
              </defs>
              {[[60,80],[60,190],[60,300]].map(([cx,cy],i) => (
                <g key={i}>
                  <rect x={cx-28} y={cy-18} width={56} height={36} rx="8" fill="rgba(20,184,166,.1)" stroke="rgba(20,184,166,.35)" strokeWidth="1.5"/>
                  <rect x={cx-14} y={cy-6} width={28} height={12} rx="3" fill="rgba(20,184,166,.22)"/>
                </g>
              ))}
              {[[60,80],[60,190],[60,300]].map(([sx,sy],i) => (
                <path key={i} d={`M${sx+28},${sy} C${sx+80},${sy} 150,190 180,190`}
                  stroke="url(#de-grad)" strokeWidth="2" fill="none" strokeDasharray="200"
                  style={{ animation: `de-flow ${1.5+i*.3}s linear infinite` }}/>
              ))}
              <rect x={160} y={160} width={100} height={60} rx="14" fill="rgba(20,184,166,.14)" stroke="#14b8a6" strokeWidth="2"/>
              <text x={210} y={195} textAnchor="middle" fill="#2dd4bf" fontSize="10" fontWeight="700">PIPELINE</text>
              {[[360,110],[360,190],[360,270]].map(([dx,dy],i) => (
                <path key={i} d={`M260,190 C290,190 320,${dy} ${dx-28},${dy}`}
                  stroke="url(#de-grad)" strokeWidth="2" fill="none" strokeDasharray="200"
                  style={{ animation: `de-flow ${1.8+i*.25}s linear infinite` }}/>
              ))}
              {[[360,110],[360,190],[360,270]].map(([cx,cy],i) => (
                <g key={i}>
                  <rect x={cx-28} y={cy-18} width={56} height={36} rx="8" fill="rgba(34,197,94,.08)" stroke="rgba(34,197,94,.35)" strokeWidth="1.5"/>
                  <circle cx={cx} cy={cy} r="8" fill="rgba(34,197,94,.22)"/>
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="container">
          <div className="de-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="de-stat">
                <div className="de-stat-val">{m.value}</div>
                <div className="de-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Core Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Our Core Capabilities</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>Every layer of your data infrastructure, engineered for reliability and scale.</p>
          <div className="de-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="de-card reveal" style={{ "--i": i }}>
                <div className="de-card-icon">{deIcons[cap.icon]}</div>
                <h3>{cap.title}</h3>
                <ul>{cap.bullets.map(b => <li key={b}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker reveal">Tech ecosystem</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Built on proven infrastructure</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 560 }}>We work with the tools your team already knows — and the platforms that scale as you grow.</p>
          <div className="de-tech reveal">
            {techStack.map(t => <div key={t} className="de-pill">{t}</div>)}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.</p>
          <div className="de-delivery reveal">
            {deliverySteps.map(s => (
              <div key={s.n} className="de-step">
                <div className="de-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="de-banner reveal">
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 800 }}>Let's Build Your Data Advantage</h3>
              <p style={{ margin: 0, fontSize: 15, color: "var(--muted)", lineHeight: 1.7 }}>
                Whether you're modernizing legacy systems, scaling analytics, or preparing for AI, InionData engineers the data backbone your business needs to thrive.
              </p>
            </div>
            <Link className="btn btn--primary" to="/contact" style={{ whiteSpace: "nowrap" }}>Get in touch</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to build your data foundation?</h2>
            <Link className="btn cta-band__btn" to="/contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}