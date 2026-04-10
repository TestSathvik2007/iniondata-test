import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png"; // 🔴 replace if possible

// ── DATA ─────────────────────────────────────────

const intro = `InionData generates more data than ever, but turning that raw information into reliable, actionable insight requires the right foundation. Our Data Engineering Services help you build that foundation—scalable, secure, and designed for real world decision making.

We architect and implement end to end data solutions that empower your teams to trust their data, automate workflows, and unlock new opportunities for growth.`;

const sections = [
    {
        title: "Modern Data Architecture",
        icon: "🏗️",
        items: [
            "Cloud native, scalable data platforms",
            "Data lake and data warehouse design",
            "Real time and batch data processing",
            "Architecture modernization and migration",
        ],
    },
    {
        title: "Data Pipeline Development",
        icon: "🔄",
        items: [
            "ETL/ELT pipeline design and automation",
            "High volume ingestion from diverse sources",
            "Stream processing for real time insights",
            "Orchestration and workflow management",
        ],
    },
    {
        title: "Data Quality & Governance",
        icon: "✅",
        items: [
            "Data validation and monitoring frameworks",
            "Master data management",
            "Metadata management and lineage tracking",
            "Compliance ready governance models",
        ],
    },
    {
        title: "Cloud Data Engineering",
        icon: "☁️",
        items: [
            "Azure, AWS, and Google Cloud expertise",
            "Serverless data processing",
            "Cost optimized storage and compute strategies",
            "Cloud migration and optimization",
        ],
    },
    {
        title: "Analytics & AI Enablement",
        icon: "🤖",
        items: [
            "Feature engineering for machine learning",
            "Data models for BI and reporting",
            "Integration with analytics and AI platforms",
            "Operationalization of ML pipelines",
        ],
    },
];

const metrics = [
    { value: "5×", label: "Faster data processing" },
    { value: "99%", label: "Data reliability" },
    { value: "60%", label: "Cost optimization" },
];

const pipeline = [
    { label: "Ingest", desc: "High-volume ingestion from APIs, databases, streams, and files" },
    { label: "Transform", desc: "ETL/ELT pipelines with validation, enrichment, and deduplication" },
    { label: "Store", desc: "Optimised data lakes and warehouses at cloud scale" },
    { label: "Govern", desc: "Lineage tracking, quality gates, and compliance-ready models" },
    { label: "Serve", desc: "BI, AI, and analytics platforms powered by trusted data" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* HERO — two-col */
.de-hero {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:60px;
  align-items:center;
}
.de-hero-img-wrap {
  position:relative;
  display:flex;
  align-items:center;
  justify-content:center;
}
.de-hero-img-wrap img {
  width:100%;
  border-radius:20px;
  display:block;
}

/* ECG / flow ornament */
.de-ecg {
  margin-top:32px;
  height:40px;
  position:relative;
  overflow:hidden;
}
.de-ecg svg { width:100%; height:100%; }
.de-ecg-line {
  stroke-dasharray:600;
  stroke-dashoffset:600;
  animation:de-draw 2.5s ease forwards;
}
@keyframes de-draw { to { stroke-dashoffset:0 } }

/* METRICS STRIP */
.de-metrics-strip {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:1px;
  background:rgba(255,255,255,.07);
  border-radius:20px;
  overflow:hidden;
  margin-top:60px;
}
.de-metric-cell {
  padding:28px 20px;
  text-align:center;
  background:rgba(7,16,14,1);
  transition:.25s;
}
.de-metric-cell:hover { background:rgba(20,184,166,.07) }
.de-metric-val {
  font-size:36px; font-weight:800;
  background:linear-gradient(135deg,#14b8a6,#22c55e);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
}
.de-metric-lbl { font-size:12px; color:var(--muted); margin-top:4px; line-height:1.4 }

/* CAPABILITIES — same row layout as amn-service-list */
.de-service-list { margin-top:40px; display:flex; flex-direction:column; gap:2px; }
.de-service-row {
  display:grid;
  grid-template-columns:72px 1fr;
  gap:24px;
  align-items:start;
  padding:28px 24px;
  border-radius:16px;
  background:rgba(255,255,255,.025);
  border:1px solid rgba(255,255,255,.06);
  transition:.25s;
}
.de-service-row:hover {
  background:rgba(20,184,166,.05);
  border-color:rgba(20,184,166,.25);
  transform:translateX(4px);
}
.de-service-icon {
  width:56px; height:56px;
  border-radius:14px;
  background:rgba(20,184,166,.1);
  border:1px solid rgba(20,184,166,.2);
  display:flex; align-items:center; justify-content:center;
  font-size:24px;
  flex-shrink:0;
}
.de-service-row h3 { margin:0 0 8px; font-size:17px; font-weight:700 }
.de-service-row ul {
  margin:0; padding-left:16px;
  font-size:13px; color:var(--muted); line-height:1.85;
}

/* PIPELINE (lifecycle equivalent) */
.de-pipeline { margin-top:50px; position:relative; }
.de-pipeline-track {
  position:absolute;
  top:28px; left:10%; right:10%;
  height:1px;
  background:linear-gradient(90deg,rgba(20,184,166,.6),rgba(20,184,166,.1));
}
.de-pipeline-pulse {
  position:absolute;
  top:-1px; left:0;
  width:30px; height:3px;
  background:#14b8a6;
  animation:de-pulse-move 3s ease-in-out infinite;
  border-radius:2px;
}
@keyframes de-pulse-move { 0%{left:0;opacity:1} 80%{left:70%;opacity:1} 100%{left:70%;opacity:0} }
.de-pipeline-row { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
.de-pipeline-step { text-align:center; }
.de-pipeline-circle {
  width:56px; height:56px; border-radius:50%;
  margin:0 auto 14px;
  display:flex; align-items:center; justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700; font-size:13px; color:#2dd4bf;
  transition:.3s;
}
.de-pipeline-step:hover .de-pipeline-circle {
  background:rgba(20,184,166,.18);
  transform:scale(1.1);
  box-shadow:0 0 20px rgba(20,184,166,.25);
}
.de-pipeline-step h4 { margin:0 0 6px; font-size:14px; font-weight:700 }
.de-pipeline-step p { margin:0; font-size:12px; color:var(--muted); line-height:1.5 }

/* CASE */
.de-case {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:48px;
  align-items:center;
  padding:44px;
  border-radius:24px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.07);
}
.de-case h2 { font-size:clamp(1.4rem,2.5vw,1.9rem); font-weight:800; margin:0 0 14px; letter-spacing:-0.02em }
.de-case p { font-size:14px; color:var(--muted); line-height:1.7; margin:0 0 16px }
.de-case ul { padding-left:18px; margin:0; font-size:14px; line-height:2 }
.de-case-img { border-radius:16px; overflow:hidden; }
.de-case-img img { width:100%; border-radius:16px; display:block; }

/* HIGHLIGHT BAND */
.de-highlight {
  padding:40px;
  border-radius:20px;
  background:linear-gradient(135deg, rgba(20,184,166,.12), transparent);
  border:1px solid rgba(20,184,166,.22);
  text-align:center;
}
.de-highlight h2 { margin:0 0 12px; font-size:clamp(1.4rem,2.5vw,1.9rem); font-weight:800 }
.de-highlight p { margin:0; font-size:15px; color:var(--muted); max-width:56ch; margin:8px auto 0; line-height:1.7 }

/* RESPONSIVE */
@media(max-width:900px){
  .de-hero { grid-template-columns:1fr }
  .de-pipeline-row { grid-template-columns:repeat(2,1fr) }
  .de-case { grid-template-columns:1fr }
  .de-metrics-strip { grid-template-columns:1fr }
}
@media(max-width:600px){
  .de-service-row { grid-template-columns:1fr }
  .de-pipeline-row { grid-template-columns:1fr }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function DataEngineering() {
    useReveal();

    return (
        <div>
            <style>{styles}</style>
            <style>{ANIM_CSS}</style>

            {/* HERO */}
            <section className="section">
                <div className="container">
                    <div className="de-hero">
                        <div>
                            <div className="kicker reveal">Data Engineering Services</div>
                            <h1 className="h1 reveal" style={{ marginTop: 10 }}>
                                Transform Your Data into a Strategic Advantage
                            </h1>
                            <p className="lead reveal" style={{ marginTop: 16, maxWidth: "58ch" }}>
                                {intro}
                            </p>
                            <div className="reveal" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
                                <Link className="btn btn--primary" to="/contact">
                                    Build your data foundation
                                </Link>
                                <Link className="btn btn--ghost" to="/services">All services</Link>
                            </div>

                            {/* ECG ornament */}
                            <div className="de-ecg reveal">
                                {/* <svg viewBox="0 0 600 40" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        className="de-ecg-line"
                                        d="M0 20 L80 20 L100 5 L120 35 L140 10 L160 30 L180 20 L260 20 L280 5 L300 35 L320 10 L340 30 L360 20 L600 20"
                                        stroke="#14b8a6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"
                                    />
                                </svg> */}
                            </div>
                        </div>

                        <div className="de-hero-img-wrap reveal">
                            <img
                                src={service1}
                                alt="Data engineering"
                                style={{ width: "100%", borderRadius: 20, display: "block" }}
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
                        </div>
                    </div>

                    {/* Metrics strip */}
                    <div className="de-metrics-strip reveal">
                        {metrics.map(m => (
                            <div key={m.label} className="de-metric-cell">
                                <div className="de-metric-val">{m.value}</div>
                                <div className="de-metric-lbl">{m.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="section section--alt">
                <div className="container">
                    <div className="kicker reveal">Capabilities</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>Our Core Capabilities</h2>
                    <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
                        End-to-end data solutions — from ingestion to insights — built for reliability and scale.
                    </p>

                    <div className="de-service-list">
                        {sections.map((s, i) => (
                            <div key={s.title} className="de-service-row reveal" style={{ "--i": i }}>
                                <div className="de-service-icon">{s.icon}</div>
                                <div>
                                    <h3>{s.title}</h3>
                                    <ul>
                                        {s.items.map(item => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PIPELINE */}
            <section className="section">
                <div className="container">
                    <div className="kicker reveal">Pipeline</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>How data flows through our systems</h2>

                    <div className="de-pipeline reveal">
                        <div className="de-pipeline-track">
                            <div className="de-pipeline-pulse" />
                        </div>
                        <div className="de-pipeline-row">
                            {pipeline.map((p, i) => (
                                <div key={p.label} className="de-pipeline-step">
                                    <div className="de-pipeline-circle">0{i + 1}</div>
                                    <h4>{p.label}</h4>
                                    <p>{p.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* HIGHLIGHT */}
            <section className="section section--alt">
                <div className="container">
                    <div className="de-highlight reveal">
                        <h2>Built for scale. Designed for trust.</h2>
                        <p>
                            We create systems that ensure reliability, performance, and long-term scalability,
                            helping your organization confidently rely on its data.
                        </p>
                    </div>
                </div>
            </section>

            {/* CASE STUDY */}
            <section className="section">
                <div className="container">
                    <div className="kicker reveal">Case study</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10, marginBottom: 30 }}>Enterprise data transformation</h2>

                    <div className="de-case reveal">
                        <div>
                            <div className="kicker" style={{ marginBottom: 16 }}>Enterprise · Data Platform</div>
                            <h2>Fragmented pipelines, solved at scale.</h2>
                            <p>
                                A company struggled with fragmented pipelines and unreliable data.
                                We implemented scalable architecture, automated pipelines, and governance frameworks.
                            </p>
                            <ul>
                                <li><strong>⚡ Faster</strong> data availability across the organization</li>
                                <li><strong>📊 Improved</strong> data trust and quality scores</li>
                                <li><strong>📈 Scalable</strong> infrastructure for future growth</li>
                            </ul>
                        </div>
                        <div className="de-case-img">
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75"
                                alt="Data dashboard"
                                loading="lazy"
                                onError={(e) => { e.currentTarget.style.display = "none"; }}
                            />
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
                        Every InionData data engagement follows a proven four-step model — so you always know
                        where things stand and what comes next.
                    </p>

                    <div className="reveal" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                        {[
                            { n: "01", title: "Discovery & Assessment", desc: "We analyse your current data landscape, challenges, and business goals — through stakeholder interviews, technical audits, and scope definition." },
                            { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business — with a phased delivery plan, tech stack selection, and risk mapping." },
                            { n: "03", title: "Build & Implement", desc: "We develop pipelines, integrations, and governance frameworks in structured sprints with weekly stakeholder updates." },
                            { n: "04", title: "Optimise & Support", desc: "We monitor, refine, and evolve your data solution as your needs grow — with performance tracking, continuous improvement, and post-delivery support." },
                        ].map((step) => (
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
                        <h2>Build a data foundation that scales</h2>
                        <Link className="btn cta-band__btn" to="/contact">
                            Book a consultation
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}