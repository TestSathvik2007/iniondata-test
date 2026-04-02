import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png";

// ── DATA ─────────────────────────────────────────

const integrations = [
  { title: "API Integrations", desc: "Connect CRMs, payments, and external services." },
  { title: "Cloud Sync", desc: "Unify SaaS and cloud infrastructure." },
  { title: "Legacy Systems", desc: "Bridge old systems with modern platforms." },
  { title: "Data Pipelines", desc: "Enable real-time data movement." },
];

const steps = [
  { n: "01", title: "Audit", desc: "Understand systems & flows" },
  { n: "02", title: "Design", desc: "Plan architecture" },
  { n: "03", title: "Build", desc: "Develop integrations" },
  { n: "04", title: "Test", desc: "Validate & optimize" },
  { n: "05", title: "Deploy", desc: "Launch with monitoring" },
];

const coreTech = [
  { name: "REST APIs", desc: "Scalable communication layer" },
  { name: "Kafka", desc: "Real-time event streaming" },
  { name: "Docker", desc: "Containerized deployments" },
  { name: "Kubernetes", desc: "Orchestration & scaling" },
];

const tools = ["GraphQL", "RabbitMQ", "AWS", "GCP", "Node.js", "Python"];

// ── STYLES ───────────────────────────────────────

const styles = `
.int-hero{
  display:grid;
  grid-template-columns:1.2fr 1fr;
  gap:40px;
  align-items:center;
}
.int-hero-img img{
  width:100%;
  border-radius:18px;
}

/* Cards */
.int-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-top:40px;
}
.int-card{
  padding:22px;
  border-radius:16px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);
  transition:.25s;
}
.int-card:hover{
  transform:translateY(-6px);
  border-color:rgba(20,184,166,.4);
}

/* HORIZONTAL PROCESS */
.int-process{
  margin-top:50px;
  position:relative;
}
.int-process::before{
  content:'';
  position:absolute;
  top:30px;
  left:0;
  right:0;
  height:2px;
  background:linear-gradient(90deg,#14b8a6,transparent);
}
.int-process-row{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:20px;
}
.int-step{
  text-align:center;
  position:relative;
}
.int-step-circle{
  width:60px;
  height:60px;
  border-radius:50%;
  margin:0 auto 12px;
  display:flex;
  align-items:center;
  justify-content:center;
  border:2px solid rgba(20,184,166,.4);
  background:#0c1a16;
  font-weight:700;
}
.int-step:hover .int-step-circle{
  background:rgba(20,184,166,.15);
  transform:scale(1.1);
}

/* TECH */
.int-tech-main{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-top:40px;
}
.int-tech-card{
  padding:22px;
  border-radius:16px;
  background:rgba(255,255,255,0.04);
  border:1px solid rgba(255,255,255,0.08);
}
.int-tech-card h4{
  margin-bottom:6px;
}
.int-tech-sub{
  margin-top:30px;
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}
.int-pill{
  padding:8px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.05);
  border:1px solid rgba(255,255,255,.08);
  font-size:13px;
}

/* CASE */
.int-case{
  padding:40px;
  border-radius:20px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.08);
}

/* RESPONSIVE */
@media(max-width:900px){
  .int-hero{grid-template-columns:1fr}
  .int-grid{grid-template-columns:1fr 1fr}
  .int-process-row{grid-template-columns:repeat(2,1fr)}
  .int-tech-main{grid-template-columns:1fr 1fr}
}
@media(max-width:600px){
  .int-grid{grid-template-columns:1fr}
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationIntegration() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container int-hero">

          <div>
            <div className="kicker">Application Integration</div>
            <h1 className="h1">Connect everything. Effortlessly.</h1>
            <p className="lead">
              We integrate your systems into a unified ecosystem that enables
              automation, real-time data flow, and scalability.
            </p>

            <div style={{marginTop:20, display:"flex", gap:10}}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div className="int-hero-img">
            <img src={service1} alt="integration"/>
          </div>

        </div>
      </section>

      {/* WHAT */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">What we integrate</h2>

          <div className="int-grid">
            {integrations.map(i=>(
              <div key={i.title} className="int-card">
                <h3>{i.title}</h3>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <h2 className="h2">How it works</h2>

          <div className="int-process">
            <div className="int-process-row">
              {steps.map(s=>(
                <div key={s.n} className="int-step">
                  <div className="int-step-circle">{s.n}</div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* TECH */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Tech ecosystem</h2>

          <div className="int-tech-main">
            {coreTech.map(t=>(
              <div key={t.name} className="int-tech-card">
                <h4>{t.name}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>

          <div className="int-tech-sub">
            {tools.map(t=>(
              <div key={t} className="int-pill">{t}</div>
            ))}
          </div>

        </div>
      </section>

      {/* CASE */}
      <section className="section">
        <div className="container">
          <div className="int-case">
            <h2>Retail integration system</h2>
            <p>
              We unified inventory, payments, and analytics systems into a
              real-time ecosystem.
            </p>

            <ul style={{marginTop:20}}>
              <li>3× faster workflows</li>
              <li>65% fewer manual errors</li>
              <li>Real-time data visibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <h2>Let’s connect your systems.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}