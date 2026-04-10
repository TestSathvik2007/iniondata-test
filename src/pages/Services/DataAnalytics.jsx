import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";
import service1 from "../../assets/images/app_development.png"; // REPLACE THIS

// ── DATA ─────────────────────────────────────────

const sections = [
  {
    title: "Data Strategy & Consulting",
    items: [
      "Align data goals with business strategy",
      "Assess data maturity",
      "Create strong governance frameworks",
    ],
  },
  {
    title: "Data Integration & Management",
    items: [
      "Connect siloed systems",
      "Build and manage scalable data warehouses",
      "Implement smooth, secure data pipelines",
    ],
  },
  {
    title: "Advanced Analytics & Insights",
    items: [
      "Predict trends with machine learning",
      "Uncover patterns that drive innovation",
      "Share insights with dashboards that speak your language",
    ],
  },
  {
    title: "Business Intelligence & Reporting",
    items: [
      "Custom BI tools and visual dashboards",
      "Automated, real-time reporting",
      "Data storytelling that drives action",
    ],
  },
  {
    title: "Data Visualization",
    items: [
      "Complex data made beautifully clear",
      "Visuals that engage, inform, and persuade",
      "Training in-house visualization best practices",
    ],
  },
  {
    title: "Data Science & Machine Learning",
    items: [
      "Solving business challenges with smart modelling",
      "NLP, image recognition, and custom AI tools",
      "Ongoing model updates to stay accurate and effective",
    ],
  },
];

const metrics = [
  { value: "10×", label: "Faster insights" },
  { value: "70%", label: "Better decision speed" },
  { value: "100%", label: "Data clarity" },
];

// ── STYLES ───────────────────────────────────────

const styles = `
.da-hero{
  display:grid;
  grid-template-columns:1.2fr 1fr;
  gap:40px;
  align-items:center;
}
.da-hero img{
  width:100%;
  border-radius:18px;
}

/* Sections */
.da-grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  gap:20px;
  margin-top:40px;
}
.da-card{
  padding:26px;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  transition:.25s;
}
.da-card:hover{
  transform:translateY(-6px);
  border-color:#14b8a6;
}
.da-card h3{
  margin-bottom:10px;
}
.da-card ul{
  padding-left:18px;
}

/* Highlight Band */
.da-highlight{
  margin-top:40px;
  padding:30px;
  border-radius:20px;
  background:linear-gradient(135deg, rgba(20,184,166,.15), transparent);
  border:1px solid rgba(20,184,166,.3);
}

/* Metrics */
.da-metrics{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:20px;
  margin-top:40px;
}
.da-metric{
  padding:26px;
  text-align:center;
  border-radius:18px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.08);
  font-weight:700;
}

/* Case */
.da-case{
  padding:40px;
  border-radius:20px;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.08);
}

/* Responsive */
@media(max-width:900px){
  .da-hero{grid-template-columns:1fr}
  .da-grid{grid-template-columns:1fr}
  .da-metrics{grid-template-columns:1fr}
}
`;

// ── PAGE ─────────────────────────────────────────

export default function DataAnalytics() {
  useReveal();

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section">
        <div className="container da-hero">

          <div>
            <div className="kicker">Data & Analytics</div>
            <h1 className="h1">Turn your data into strategic insight</h1>
            <p className="lead">
              At InionData, we help you move beyond data collection to data-driven decision-making.
              Whether you’re just starting out or scaling fast, we transform complex data into clear,
              actionable strategies that unlock growth and innovation.
            </p>

            <div style={{marginTop:20, display:"flex", gap:10}}>
              <Link className="btn btn--primary" to="/contact">Start your data journey</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          {/* 🔴 REPLACE THIS IMAGE */}
          <img src={service1} alt="data analytics"/>

        </div>
      </section>

      {/* SERVICES */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">What we do</h2>

          <div className="da-grid">
            {sections.map((s)=>(
              <div key={s.title} className="da-card">
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

      {/* HIGHLIGHT */}
      <section className="section">
        <div className="container">
          <div className="da-highlight">
            <h2>From raw data to real decisions</h2>
            <p>
              We don’t just process data — we make it meaningful. Our approach focuses
              on clarity, usability, and impact, ensuring your teams can act with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="section section--alt">
        <div className="container">
          <h2 className="h2">Impact</h2>

          <div className="da-metrics">
            {metrics.map(m=>(
              <div key={m.label} className="da-metric">
                <div style={{fontSize:"28px"}}>{m.value}</div>
                <div>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASE */}
      <section className="section">
        <div className="container">
          <div className="da-case">
            <h2>Data transformation success</h2>
            <p>
              A growing company struggled with fragmented data across systems.
              We unified their data, built dashboards, and implemented predictive models.
            </p>

            <ul style={{marginTop:20}}>
              <li>📊 Centralized data platform</li>
              <li>⚡ Real-time reporting</li>
              <li>📈 Improved strategic decisions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section section--alt">
        <div className="container">
          <div className="cta-band">
            <h2>Unlock the power of your data</h2>
            <Link className="btn cta-band__btn" to="/contact">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}