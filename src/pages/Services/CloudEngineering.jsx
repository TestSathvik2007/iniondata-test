import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png"; // replace if needed

// ── DATA ─────────────────────────────────────────

const intro = `At InionData, we design and deliver cloud solutions that enhance agility, scalability, and performance. From migration to optimization, we help businesses modernize their infrastructure and accelerate innovation.`;

const sections = [
  {
    title: "Cloud Strategy & Consulting",
    items: [
      "Define cloud roadmap aligned with business goals.",
      "Assess infrastructure and optimize costs.",
    ],
  },
  {
    title: "Cloud Migration",
    items: [
      "Seamless migration with minimal downtime.",
      "Modernize legacy applications.",
    ],
  },
  {
    title: "Cloud Architecture",
    items: [
      "Scale, secure, and high-availability designs.",
      "Multi-cloud and hybrid solutions.",
    ],
  },
  {
    title: "DevOps & Automation",
    items: [
      "CI/CD pipelines and automated deployments.",
      "Containerization with Docker & Kubernetes.",
    ],
  },
  {
    title: "Cloud Security",
    items: [
      "Identity management, encryption, and compliance.",
      "Risk assessment and threat protection.",
    ],
  },
  {
    title: "Managed Services & Optimization",
    items: [
      "Performance monitoring and cost optimization.",
      "24/7 support and cloud operations.",
    ],
  },
];

const delivery = [
  {
    title: "Assess",
    desc: "Evaluate infrastructure, workloads, and readiness for cloud adoption.",
  },
  {
    title: "Plan",
    desc: "Define strategy, architecture, and migration roadmap.",
  },
  {
    title: "Migrate",
    desc: "Move applications and data securely with minimal downtime.",
  },
  {
    title: "Optimize",
    desc: "Improve performance, cost efficiency, and scalability.",
  },
  {
    title: "Operate",
    desc: "Continuous monitoring, support, and cloud operations.",
  },
];

// ── STYLES ───────────────────────────────────────

const styles = `
/* HERO */
.ce-hero{
  display:grid;
  grid-template-columns:1.2fr 1fr;
  gap:40px;
  align-items:center;
  position:relative;
}
.ce-row {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  align-items: stretch; /* ADD THIS */
}

.ce-step {
  display: flex;          /* ADD */
  flex-direction: column; /* ADD */
}

.ce-box {
  margin-top: 20px;
  padding: 20px;
  border-radius: 16px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);

  flex: 1; /* THIS makes all boxes same height */
}
.ce-hero::before{
  content:'';
  position:absolute;
  width:300px;
  height:300px;
  background:radial-gradient(circle, rgba(20,184,166,.2), transparent);
  top:-80px;
  left:-80px;
  z-index:-1;
}

.ce-hero img{
  width:100%;
  border-radius:18px;
  box-shadow:0 20px 60px rgba(0,0,0,.3);
}

.ce-intro{
  margin-top:20px;
  color:var(--muted);
  line-height:1.7;
}

/* CAPABILITIES */
.ce-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.ce-card{
  padding:24px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.ce-card:hover{
  transform:translateY(-6px);
  border-color:#14b8a6;
}

.ce-card ul{
  margin-top:10px;
  padding-left:18px;
}

/* DELIVERY TIMELINE */
.ce-timeline{
  margin-top:60px;
  position:relative;
}

.ce-timeline::before{
  content:'';
  position:absolute;
  top:40px;
  left:5%;
  right:5%;
  height:2px;
  background:linear-gradient(90deg,#14b8a6,transparent);
}

.ce-row{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:20px;
}

.ce-step{
  text-align:center;
  position:relative;
}

.ce-circle{
  width:60px;
  height:60px;
  border-radius:50%;
  margin:auto;
  display:flex;
  align-items:center;
  justify-content:center;
  background:#0c1a16;
  border:1.5px solid rgba(20,184,166,.4);
  font-weight:700;
  transition:.25s;
}

.ce-step:hover .ce-circle{
  transform:scale(1.1);
  background:rgba(20,184,166,.2);
}

.ce-box{
  margin-top:20px;
  padding:20px;
  border-radius:16px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
}

/* CTA */
.ce-highlight{
  margin-top:40px;
  padding:30px;
  border-radius:20px;
  background:linear-gradient(135deg, rgba(20,184,166,.15), transparent);
  border:1px solid rgba(20,184,166,.25);
}

/* RESPONSIVE */
@media(max-width:900px){
  .ce-hero{grid-template-columns:1fr}
  .ce-grid{grid-template-columns:1fr}
  .ce-row{grid-template-columns:1fr}
}
`;

// ── PAGE ─────────────────────────────────────────

export default function CloudEngineering(){
  useReveal();

  return(
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container ce-hero">

          <div>
            <div className="kicker">Cloud Engineering Services</div>
            <h1 className="h1">Scale, Secure, and Innovate in the Cloud</h1>

            <p className="ce-intro">{intro}</p>

            <div style={{marginTop:20}}>
              <Link className="btn btn--primary" to="/contact">
                Start your cloud journey
              </Link>
            </div>
          </div>

          <img src={service1} alt="cloud engineering"/>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Our Capabilities</h2>

          <div className="ce-grid">
            {sections.map((s)=>(
              <div key={s.title} className="ce-card">
                <h3>{s.title}</h3>
                <ul>
                  {s.items.map(item=>(
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERY APPROACH (LIKE YOUR IMAGE) */}
      <section className="section">
        <div className="container">
          <h2 className="h2">Delivery Approach</h2>

          <div className="ce-timeline">
            <div className="ce-row">
              {delivery.map((step,i)=>(
                <div key={step.title} className="ce-step">
                  
                  <div className="ce-circle">0{i+1}</div>

                  <div className="ce-box">
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* HIGHLIGHT */}
      <section className="section section--alt">
        <div className="container">
          <div className="ce-highlight">
            <h2>Cloud built for performance and growth</h2>
            <p>
              From strategy to operations, we ensure your cloud ecosystem is optimized,
              secure, and ready to scale with your business.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Accelerate your cloud transformation</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}