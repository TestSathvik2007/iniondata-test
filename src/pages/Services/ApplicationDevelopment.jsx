import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const capabilities = [
    {
        title: "Agile Methods & Rapid Deployment",
        desc: "What used to take developers months to release can now take mere seconds to deploy. We implement next-generation processes defined by speed, efficiency, and resilience.",
        icon: "🚀",
        stat: "10×",
        statLabel: "faster releases",
    },
    {
        title: "Automation & Business Integration",
        desc: "Adding automation and business integration into the development process makes for a highly efficient workflow — minimising manual effort and reducing time-to-market.",
        icon: "⚙️",
        stat: "60%",
        statLabel: "effort reduction",
    },
    {
        title: "Heritage Portfolio Modernisation",
        desc: "Transforming legacy monolithic systems into flexible, modular application development portfolios that can adapt to a changing marketplace without losing institutional knowledge.",
        icon: "🏗️",
        stat: "100%",
        statLabel: "portfolio coverage",
    },
    {
        title: "Digital Transformation & CX",
        desc: "Adopting the agile approach to application development enables organisations to keep pace with the competition and the changing marketplace, delivering positive customer experiences.",
        icon: "🌐",
        stat: "Enterprise",
        statLabel: "scale delivery",
    },
];

const lifecycle = [
    { n: "01", title: "Assess", desc: "Evaluate portfolio, identify gaps and transformation priorities" },
    { n: "02", title: "Design", desc: "Architect modular, scalable solutions aligned to business goals" },
    { n: "03", title: "Build", desc: "Agile development in structured sprints with continuous integration" },
    { n: "04", title: "Integrate", desc: "Automate workflows and connect systems for end-to-end efficiency" },
    { n: "05", title: "Evolve", desc: "Continuous improvement as your business and market demands shift" },
];

const techStack = [
    { name: "React / Next.js", tag: "Frontend", color: "rgba(20,184,166,.14)" },
    { name: "Node.js / Python", tag: "Backend", color: "rgba(34,197,94,.11)" },
    { name: "Docker + K8s", tag: "Infra", color: "rgba(20,184,166,.10)" },
    { name: "AWS / Azure / GCP", tag: "Cloud", color: "rgba(34,197,94,.09)" },
];

const pills = ["TypeScript", "GraphQL", "PostgreSQL", "Redis", "Kafka", "Terraform", "GitHub Actions", "Jest / Cypress"];

const deliverables = [
    {
        title: "Faster Time-to-Market",
        desc: "Agile sprints and automated pipelines compress release cycles from months to days — so your teams ship with confidence.",
        icon: "⚡",
    },
    {
        title: "Scalable Architecture",
        desc: "We design modular systems from day one so your platform scales horizontally as your user base and feature set grow.",
        icon: "📐",
    },
    {
        title: "Secure by Default",
        desc: "Security, encryption, and compliance requirements are addressed from the design phase — not bolted on after the fact.",
        icon: "🔒",
    },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* ── APPLICATION DEVELOPMENT VISUAL IDENTITY ── */

.ad-page { --accent-page: #14b8a6; --accent-2-page: #22c55e; }

/* HERO */
.ad-hero {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 60px;
  align-items: center;
}

/* Hero right panel — code editor mockup */
.ad-hero-panel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ad-code-window {
  width: 100%;
  border-radius: 20px;
  background: rgba(7,16,14,.95);
  border: 1px solid rgba(20,184,166,.25);
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,.5), 0 0 0 1px rgba(20,184,166,.12);
}
.ad-code-titlebar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.03);
}
.ad-code-dot {
  width: 10px; height: 10px; border-radius: 50%;
}
.ad-code-filename {
  margin-left: auto;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  letter-spacing: .04em;
}
.ad-code-body {
  padding: 20px 22px;
  font-family: 'Fira Code', 'Cascadia Code', monospace;
  font-size: 13px;
  line-height: 1.75;
}
.ad-code-line { display: flex; align-items: flex-start; gap: 16px; }
.ad-code-ln { color: rgba(255,255,255,.18); font-size: 11px; user-select: none; min-width: 16px; padding-top: 1px; }
.ad-code-kw { color: #2dd4bf; }
.ad-code-fn { color: #4ade80; }
.ad-code-str { color: #f59e0b; }
.ad-code-cm { color: rgba(255,255,255,.3); font-style: italic; }
.ad-code-pu { color: rgba(255,255,255,.55); }

/* Sprint badge floating on hero panel */
.ad-sprint-badge {
  position: absolute;
  bottom: -16px; right: -12px;
  background: rgba(12,26,22,.97);
  border: 1px solid rgba(34,197,94,.3);
  border-radius: 14px;
  padding: 14px 18px;
  min-width: 180px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0,0,0,.35);
}
.ad-sprint-badge-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 10px;
}
.ad-sprint-bar-wrap { margin-bottom: 6px; }
.ad-sprint-bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 4px;
}
.ad-sprint-bar-track {
  height: 5px; border-radius: 999px;
  background: rgba(255,255,255,.08);
  overflow: hidden;
}
.ad-sprint-bar-fill {
  height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, #14b8a6, #22c55e);
}
.ad-sprint-status {
  display: flex; align-items: center; gap: 6px;
  font-size: 11px; color: var(--muted); margin-top: 8px;
}
.ad-sprint-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e;
  animation: ad-blink 2s ease-in-out infinite;
}
@keyframes ad-blink { 0%,100%{opacity:1} 50%{opacity:.35} }

/* CAPABILITIES GRID */
.ad-caps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 40px;
}
.ad-cap-card {
  padding: 30px;
  border-radius: 20px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  transition: .3s var(--ease);
  position: relative;
  overflow: hidden;
}
.ad-cap-card::after {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(circle at top left, rgba(20,184,166,.1), transparent 60%);
  opacity: 0; transition: .3s;
}
.ad-cap-card:hover { transform: translateY(-5px); border-color: rgba(20,184,166,.3); }
.ad-cap-card:hover::after { opacity: 1; }
.ad-cap-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
.ad-cap-icon { font-size: 28px; }
.ad-cap-stat { text-align: right; }
.ad-cap-stat-val { font-size: 22px; font-weight: 800; color: #14b8a6; }
.ad-cap-stat-lbl { font-size: 11px; color: var(--muted); }
.ad-cap-card h3 { margin: 0 0 10px; font-size: 17px; font-weight: 700; }
.ad-cap-card p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; }

/* LIFECYCLE TIMELINE */
.ad-lifecycle-wrap { margin-top: 50px; position: relative; }
.ad-lifecycle-track {
  position: absolute;
  top: 28px; left: calc(10% + 28px); right: calc(10% + 28px);
  height: 1px;
  background: linear-gradient(90deg, rgba(20,184,166,.7), rgba(20,184,166,.1));
}
.ad-lifecycle-track::after {
  content: '';
  position: absolute;
  top: -1px; left: 0;
  width: 35%;
  height: 3px;
  background: linear-gradient(90deg, #14b8a6, transparent);
  animation: ad-flow 3s ease-in-out infinite;
}
@keyframes ad-flow { 0%{left:0;opacity:1} 100%{left:65%;opacity:0} }
.ad-lifecycle-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.ad-lc-step { text-align: center; position: relative; }
.ad-lc-node {
  width: 56px; height: 56px; border-radius: 50%;
  margin: 0 auto 14px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid rgba(20,184,166,.4);
  background: #0c1a16;
  font-weight: 700; font-size: 13px; color: #2dd4bf;
  transition: .3s;
}
.ad-lc-step:hover .ad-lc-node { background: rgba(20,184,166,.18); transform: scale(1.1); box-shadow: 0 0 20px rgba(20,184,166,.3); }
.ad-lc-step h4 { margin: 0 0 6px; font-size: 14px; font-weight: 700; }
.ad-lc-step p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }

/* TECH GRID */
.ad-tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 40px;
}
.ad-tech-card {
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.08);
  transition: .25s;
  position: relative;
  overflow: hidden;
}
.ad-tech-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, #14b8a6, #22c55e);
  opacity: 0; transition: .25s;
}
.ad-tech-card:hover { border-color: rgba(20,184,166,.3); transform: translateY(-3px); }
.ad-tech-card:hover::after { opacity: 1; }
.ad-tech-name { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.ad-tech-tag { font-size: 12px; color: var(--muted); }

/* PILLS */
.ad-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 30px; }
.ad-pill {
  padding: 8px 16px; border-radius: 999px;
  background: rgba(255,255,255,.05);
  border: 1px solid rgba(255,255,255,.09);
  font-size: 13px; font-weight: 500;
  transition: .2s;
}
.ad-pill:hover { background: rgba(20,184,166,.12); border-color: rgba(20,184,166,.4); color: #2dd4bf; }

/* DELIVERABLES */
.ad-deliverables {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}
.ad-deliverable {
  padding: 28px;
  border-radius: 20px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.07);
  transition: .25s;
}
.ad-deliverable:hover { border-color: rgba(20,184,166,.3); transform: translateY(-4px); }
.ad-deliverable-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: rgba(20,184,166,.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; margin-bottom: 18px;
}
.ad-deliverable h3 { margin: 0 0 10px; font-size: 17px; font-weight: 700; }
.ad-deliverable p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; }

/* RESPONSIVE */
@media(max-width: 1000px) {
  .ad-hero { grid-template-columns: 1fr; }
  .ad-hero-panel { display: none; }
  .ad-caps { grid-template-columns: 1fr; }
  .ad-tech-grid { grid-template-columns: 1fr 1fr; }
  .ad-deliverables { grid-template-columns: 1fr; }
}
@media(max-width: 700px) {
  .ad-lifecycle-row { grid-template-columns: 1fr 1fr; }
  .ad-lifecycle-track { display: none; }
  .ad-tech-grid { grid-template-columns: 1fr; }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationDevelopment() {
    useReveal();

    return (
        <div className="ad-page">
            <style>{styles}</style>
            <style>{ANIM_CSS}</style>

            {/* HERO */}
            <section className="section" style={{ overflow: "hidden" }}>
                <div className="container ad-hero">
                    <div>
                        <div className="kicker reveal">Service</div>
                        <h1 className="h1 reveal" style={{ marginTop: 14 }}>
                            <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                                Application Development
                            </span>
                        </h1>
                        <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
                            Enterprise organisations are transforming heritage portfolios to flexible, modular application development portfolios by implementing next-generation processes defined by speed, efficiency, and resilience. By adopting agile methods, what used to take developers months to release can now take mere seconds to deploy. Adding automation and business integration into the mix makes for an efficient process — keeping pace with the competition and the changing marketplace with positive customer experiences.
                        </p>
                        <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <Link className="btn btn--primary" to="/contact">Start a project</Link>
                            <Link className="btn btn--ghost" to="/services">All services</Link>
                        </div>
                    </div>

                    {/* Code editor mockup panel */}
                    <div className="ad-hero-panel reveal">
                        <div className="ad-code-window">
                            <div className="ad-code-titlebar">
                                <div className="ad-code-dot" style={{ background: "#ef4444" }} />
                                <div className="ad-code-dot" style={{ background: "#f59e0b" }} />
                                <div className="ad-code-dot" style={{ background: "#22c55e" }} />
                                <div className="ad-code-filename">app/deploy.ts</div>
                            </div>
                            <div className="ad-code-body">
                                {[
                                    [<><span className="ad-code-cm">// Agile deployment pipeline</span></>],
                                    [<><span className="ad-code-kw">import</span><span className="ad-code-pu"> {"{"} </span><span className="ad-code-fn">pipeline</span><span className="ad-code-pu"> {"}"} </span><span className="ad-code-kw">from</span><span className="ad-code-str"> '@inion/core'</span></>],
                                    [<></>],
                                    [<><span className="ad-code-kw">const</span><span className="ad-code-pu"> release </span><span className="ad-code-kw">=</span><span className="ad-code-pu"> </span><span className="ad-code-kw">await</span><span className="ad-code-pu"> </span><span className="ad-code-fn">pipeline</span><span className="ad-code-pu">{"({"}</span></>],
                                    [<><span className="ad-code-pu">  env: </span><span className="ad-code-str">'production'</span><span className="ad-code-pu">,</span></>],
                                    [<><span className="ad-code-pu">  strategy: </span><span className="ad-code-str">'blue-green'</span><span className="ad-code-pu">,</span></>],
                                    [<><span className="ad-code-pu">  autoRollback: </span><span className="ad-code-kw">true</span><span className="ad-code-pu">,</span></>],
                                    [<><span className="ad-code-pu">  tests: </span><span className="ad-code-str">'full-suite'</span><span className="ad-code-pu">,</span></>],
                                    [<><span className="ad-code-pu">{"})"}</span></>],
                                    [<></>],
                                    [<><span className="ad-code-cm">// ✅ Deployed in {"<"}3s</span></>],
                                ].map((content, i) => (
                                    <div key={i} className="ad-code-line">
                                        <span className="ad-code-ln">{i + 1}</span>
                                        <span>{content}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sprint status badge */}
                        <div className="ad-sprint-badge">
                            <div className="ad-sprint-badge-title">Sprint 12 · Live</div>
                            {[["Features shipped", 87], ["Test coverage", 94]].map(([label, pct]) => (
                                <div key={label} className="ad-sprint-bar-wrap">
                                    <div className="ad-sprint-bar-label">
                                        <span>{label}</span><span style={{ color: "#2dd4bf" }}>{pct}%</span>
                                    </div>
                                    <div className="ad-sprint-bar-track">
                                        <div className="ad-sprint-bar-fill" style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                            ))}
                            <div className="ad-sprint-status">
                                <div className="ad-sprint-dot" />
                                All systems go
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="section section--alt">
                <div className="container">
                    <div className="kicker reveal">Capabilities</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we develop</h2>
                    <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>
                        From heritage portfolio modernisation to greenfield agile builds — we bring the right process and people to deliver on time, on budget.
                    </p>

                    <div className="ad-caps">
                        {capabilities.map((c) => (
                            <div key={c.title} className="ad-cap-card reveal">
                                <div className="ad-cap-top">
                                    <div className="ad-cap-icon">{c.icon}</div>
                                    <div className="ad-cap-stat">
                                        <div className="ad-cap-stat-val">{c.stat}</div>
                                        <div className="ad-cap-stat-lbl">{c.statLabel}</div>
                                    </div>
                                </div>
                                <h3>{c.title}</h3>
                                <p>{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LIFECYCLE */}
            <section className="section">
                <div className="container">
                    <div className="kicker reveal">Lifecycle</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we deliver</h2>

                    <div className="ad-lifecycle-wrap reveal">
                        <div className="ad-lifecycle-track" />
                        <div className="ad-lifecycle-row">
                            {lifecycle.map((step) => (
                                <div key={step.n} className="ad-lc-step">
                                    <div className="ad-lc-node">{step.n}</div>
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TECH STACK */}
            <section className="section section--alt">
                <div className="container">
                    <div className="kicker reveal">Tech ecosystem</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>Built on proven technology</h2>

                    <div className="ad-tech-grid">
                        {techStack.map((t) => (
                            <div key={t.name} className="ad-tech-card reveal" style={{ background: t.color }}>
                                <div className="ad-tech-name">{t.name}</div>
                                <div className="ad-tech-tag">{t.tag}</div>
                            </div>
                        ))}
                    </div>

                    <div className="ad-pills reveal">
                        {pills.map((p) => (
                            <div key={p} className="ad-pill">{p}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHAT YOU GET */}
            <section className="section">
                <div className="container">
                    <div className="kicker reveal">What you get</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>Every engagement includes</h2>
                    <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
                        We deliver production-ready applications with full documentation, knowledge transfer, and ongoing support built in from the start.
                    </p>

                    <div className="ad-deliverables">
                        {deliverables.map((d) => (
                            <div key={d.title} className="ad-deliverable reveal">
                                <div className="ad-deliverable-icon">{d.icon}</div>
                                <h3>{d.title}</h3>
                                <p>{d.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW EVERY ENGAGEMENT RUNS */}
            <section className="section section--alt">
                <div className="container">
                    <div className="kicker reveal">Our approach</div>
                    <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
                    <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>
                        Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.
                    </p>

                    <div className="reveal grid grid-4" style={{ marginTop: 40, gap: 16 }}>
                        {[
                            { n: "01", title: "Discovery & Assessment", desc: "We analyse your current application landscape, business goals, and transformation priorities through stakeholder interviews and technical audits." },
                            { n: "02", title: "Architecture & Planning", desc: "We design scalable, modular architecture with a phased delivery plan, technology stack selection, and risk mapping." },
                            { n: "03", title: "Agile Build & Deploy", desc: "We develop in structured sprints with CI/CD automation, full test coverage, and weekly stakeholder updates throughout." },
                            { n: "04", title: "Optimise & Evolve", desc: "We monitor performance, iterate on features, and evolve your applications as your business and market demands shift." },
                        ].map((step) => (
                            <div
                                key={step.n}
                                style={{ padding: "28px 24px", borderRadius: 20, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", position: "relative", transition: ".25s" }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(20,184,166,.3)"}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"}
                            >
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
                        <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff" }}>
                            Ready to modernise your application portfolio?
                        </h2>
                        <Link className="btn cta-band__btn" to="/contact">
                            Start a conversation
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}