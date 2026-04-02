import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png";

// ── DATA ─────────────────────────────────────────

const services = [
  { title: "Bug Fixes", desc: "Identify and resolve issues quickly to ensure smooth operation." },
  { title: "Performance Tuning", desc: "Optimize speed, responsiveness, and efficiency." },
  { title: "Security Updates", desc: "Regular patching and vulnerability management." },
  { title: "Feature Enhancements", desc: "Continuously improve and extend functionality." },
];

const lifecycle = [
  "Monitoring",
  "Issue Detection",
  "Fix & Update",
  "Testing",
  "Release",
];

const support = [
  { title: "Basic", desc: "Scheduled maintenance and essential support." },
  { title: "Standard", desc: "Priority fixes with faster turnaround times." },
  { title: "Premium", desc: "24/7 support with proactive monitoring." },
];

const metrics = [
  { value: "99.9%", label: "Uptime" },
  { value: "60%", label: "Faster issue resolution" },
  { value: "24/7", label: "Monitoring" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
.amn-hero{
  display:grid;
  grid-template-columns:1.2fr 1fr;
  gap:40px;
  align-items:center;
}
.amn-hero img{
  width:100%;
  border-radius:18px;
}

/* Services */
.amn-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:18px;
  margin-top:40px;
}
.amn-card{
  padding:22px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.amn-card:hover{
  transform:translateY(-6px);
  border-color:rgba(20,184,166,.4);
}

/* TIMELINE */
.amn-process{
  margin-top:50px;
  position:relative;
}
.amn-process::before{
  content:'';
  position:absolute;
  top:30px;
  left:8%;
  right:8%;
  height:2px;
  background:linear-gradient(90deg,#14b8a6,rgba(20,184,166,.2));
}
.amn-row{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:10px;
}
.amn-step{
  text-align:center;
}
.amn-circle{
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
  transition:.25s;
}
.amn-step:hover .amn-circle{
  transform:scale(1.1);
  background:rgba(20,184,166,.15);
}

/* Support */
.amn-support{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.amn-tier{
  padding:26px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  text-align:center;
}
.amn-tier:hover{
  border-color:#14b8a6;
}

/* Metrics */
.amn-metrics{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.amn-metric{
  padding:24px;
  text-align:center;
  border-radius:16px;
  background:rgba(20,184,166,.08);
  border:1px solid rgba(20,184,166,.2);
  font-weight:700;
}

/* Case */
.amn-case{
  padding:40px;
  border-radius:20px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.08);
}

/* Responsive */
@media(max-width:900px){
  .amn-hero{grid-template-columns:1fr}
  .amn-grid{grid-template-columns:1fr 1fr}
  .amn-row{grid-template-columns:repeat(2,1fr)}
  .amn-support{grid-template-columns:1fr}
  .amn-metrics{grid-template-columns:1fr}
}
`;

// ── PAGE ─────────────────────────────────────────

export default function ApplicationMaintenance() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container amn-hero">

          <div>
            <div className="kicker">Application Maintenance</div>
            <h1 className="h1">Keep your applications stable, secure, and fast.</h1>
            <p className="lead">
              We ensure your applications run smoothly with continuous monitoring,
              quick fixes, and ongoing improvements.
            </p>

            <div style={{marginTop:20, display:"flex", gap:10}}>
              <Link className="btn btn--primary" to="/contact">Get support</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <img src={service1} alt="maintenance"/>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Maintenance services</h2>

          <div className="amn-grid">
            {services.map(s=>(
              <div key={s.title} className="amn-card">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFECYCLE */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Maintenance lifecycle</h2>

          <div className="amn-process">
            <div className="amn-row">
              {lifecycle.map((l,i)=>(
                <div key={l} className="amn-step">
                  <div className="amn-circle">0{i+1}</div>
                  <h4>{l}</h4>
                  <p style={{fontSize:"12px"}}>
                    {[
                      "Continuous system tracking",
                      "Detect issues early",
                      "Fix bugs & deploy updates",
                      "Validate stability",
                      "Release improvements"
                    ][i]}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SUPPORT */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Support plans</h2>

          <div className="amn-support">
            {support.map(s=>(
              <div key={s.title} className="amn-tier">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Performance impact</h2>

          <div className="amn-metrics">
            {metrics.map(m=>(
              <div key={m.label} className="amn-metric">
                <div style={{fontSize:"24px"}}>{m.value}</div>
                <div>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE */}
      <section className="section section--alt">
        <div className="container">
          <div className="amn-case">
            <h2>SaaS maintenance transformation</h2>
            <p>
              A SaaS platform struggled with recurring bugs and downtime.
              We implemented proactive monitoring and structured maintenance.
            </p>

            <ul style={{marginTop:20}}>
              <li>50% fewer incidents</li>
              <li>Faster resolution times</li>
              <li>Improved system stability</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>We’ll keep your apps running.</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}