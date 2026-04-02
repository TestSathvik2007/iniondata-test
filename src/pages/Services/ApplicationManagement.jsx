import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png";

// ── DATA ─────────────────────────────────────────

const capabilities = [
    {
        title: "24/7 Monitoring",
        desc: "Continuous tracking of application performance, uptime, and system health.",
    },
    {
        title: "Incident Management",
        desc: "Rapid detection, escalation, and resolution of system issues.",
    },
    {
        title: "Performance Optimization",
        desc: "Identify bottlenecks and improve speed, responsiveness, and scalability.",
    },
    {
        title: "Release Management",
        desc: "Controlled deployments, updates, and version tracking.",
    },
];

const lifecycle = [
    "Onboarding",
    "Monitoring",
    "Maintenance",
    "Optimization",
    "Scaling",
];

const ops = [
    {
        title: "Real-time Alerts",
        desc: "Get notified instantly when something breaks or slows down.",
    },
    {
        title: "Automated Recovery",
        desc: "Reduce downtime with self-healing systems and failover.",
    },
    {
        title: "Security & Compliance",
        desc: "Regular audits, patching, and vulnerability management.",
    },
];

const platforms = [
    "Web Applications",
    "Mobile Apps",
    "Cloud Systems",
    "Enterprise Software",
    "Microservices",
    "APIs",
];

// ── STYLES ───────────────────────────────────────

const styles = `
.am-hero{
  display:grid;
  grid-template-columns:1.2fr 1fr;
  gap:40px;
  align-items:center;
}
.am-hero img{
  width:100%;
  border-radius:18px;
}

/* Capabilities */
.am-cap-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
  margin-top:40px;
}
.am-cap{
  padding:26px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.am-cap:hover{
  transform:translateY(-6px);
  border-color:rgba(20,184,166,.4);
}

/* Lifecycle */
.am-lifecycle{
  margin-top:40px;
  display:flex;
  justify-content:space-between;
  gap:10px;
}
.am-stage{
  flex:1;
  text-align:center;
  padding:16px;
  border-radius:12px;
  background:rgba(20,184,166,.08);
  border:1px solid rgba(20,184,166,.2);
  font-size:13px;
  font-weight:600;
}

/* Ops */
.am-ops{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.am-op{
  padding:24px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
}

/* Platforms */
.am-platforms{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:14px;
  margin-top:30px;
}
.am-platform{
  padding:16px;
  text-align:center;
  border-radius:12px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
}

/* Case */
.am-case{
  padding:40px;
  border-radius:20px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.08);
}

/* Responsive */
@media(max-width:900px){
  .am-hero{grid-template-columns:1fr}
  .am-cap-grid{grid-template-columns:1fr}
  .am-ops{grid-template-columns:1fr}
  .am-platforms{grid-template-columns:1fr 1fr}
}

/* HORIZONTAL LIFECYCLE (TIMELINE STYLE) */
.am-process {
  margin-top:50px;
  position:relative;
}

.am-process::before {
  content:'';
  position:absolute;
  top:30px;
  left:8%;
  right:8%;
  height:2px;
  background:linear-gradient(90deg,#14b8a6,rgba(20,184,166,.2));
}

.am-process-row {
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:10px;
}

.am-step {
  text-align:center;
  position:relative;
}

.am-step-circle {
  width:56px;
  height:56px;
  border-radius:50%;
  margin:0 auto 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  border:1.5px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700;
  color:var(--teal-2);
  transition:.25s;
}

.am-step:hover .am-step-circle {
  transform:scale(1.1);
  background:rgba(20,184,166,.15);
  border-color:#14b8a6;
}

.am-step-title {
  font-weight:700;
  font-size:13px;
  margin-bottom:4px;
}

.am-step-desc {
  font-size:12px;
  color:var(--muted);
}

/* responsive */
@media(max-width:900px){
  .am-process-row {
    grid-template-columns:repeat(2,1fr);
  }
  .am-process::before {
    display:none;
  }
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationManagement() {
    useReveal();

    return (
        <div>
            <style>{styles}</style>
            <style>{ANIM_CSS}</style>

            {/* HERO */}
            <section className="section">
                <div className="container am-hero">

                    <div>
                        <div className="kicker">Application Management</div>
                        <h1 className="h1">Keep your applications running at their best.</h1>
                        <p className="lead">
                            We manage, monitor, and optimize your applications so you can focus
                            on growth — not firefighting issues.
                        </p>

                        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                            <Link className="btn btn--primary" to="/contact">Get support</Link>
                            <Link className="btn btn--ghost" to="/services">All services</Link>
                        </div>
                    </div>

                    <img src={service1} alt="management" />
                </div>
            </section>

            {/* CAPABILITIES */}
            <section className="section section--alt">
                <div className="container">
                    <h2 className="h2">Core capabilities</h2>

                    <div className="am-cap-grid">
                        {capabilities.map(c => (
                            <div key={c.title} className="am-cap">
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
                    <h2 className="h2">Lifecycle management</h2>

                    <div className="am-process">
                        <div className="am-process-row">
                            {lifecycle.map((l, i) => (
                                <div key={l} className="am-step">
                                    <div className="am-step-circle">0{i + 1}</div>
                                    <div className="am-step-title">{l}</div>
                                    <p className="am-step-desc">
                                        {[
                                            "Initial setup and onboarding",
                                            "Continuous tracking & alerts",
                                            "Regular updates & fixes",
                                            "Performance tuning",
                                            "Scaling as demand grows"
                                        ][i]}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* OPS */}
            <section className="section section--alt">
                <div className="container">
                    <h2 className="h2">Operations & reliability</h2>

                    <div className="am-ops">
                        {ops.map(o => (
                            <div key={o.title} className="am-op">
                                <h3>{o.title}</h3>
                                <p>{o.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PLATFORMS */}
            <section className="section">
                <div className="container">
                    <h2 className="h2">Platforms we manage</h2>

                    <div className="am-platforms">
                        {platforms.map(p => (
                            <div key={p} className="am-platform">{p}</div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE */}
            <section className="section section--alt">
                <div className="container">
                    <div className="am-case">
                        <h2>Enterprise app management</h2>
                        <p>
                            A SaaS company struggled with downtime and inconsistent performance.
                            We implemented monitoring, automation, and optimization pipelines.
                        </p>

                        <ul style={{ marginTop: 20 }}>
                            <li>99.95% uptime achieved</li>
                            <li>70% faster incident resolution</li>
                            <li>Improved performance across all regions</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container">
                    <div className="cta-band">
                        <h2>We’ll take care of your apps.</h2>
                        <Link className="btn cta-band__btn" to="/contact">
                            Book a consultation
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}