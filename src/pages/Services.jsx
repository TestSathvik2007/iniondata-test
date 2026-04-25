import { Link, useNavigate } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { useRef } from "react";

/* ── IMAGES ── */
import service1 from "../assets/images/app_development.png";
import service2 from "../assets/images/application_integration.png";
import service3 from "../assets/images/application_management.png";
import service4 from "../assets/images/application_maintenance.png";
import service5 from "../assets/images/project_management.png";
import service6 from "../assets/images/consulting_services.png";
import service7 from "../assets/images/teams_application.png";
import service8 from "../assets/images/operational_efficiency.png";
import service9 from "../assets/images/fast_growth.png";

/* ── DATA ── */
const offerings = [
  {
    title: "Application Development",
    path: "/services/app-development",
    desc: "Transforming heritage portfolios to flexible, modular application development.",
    bullets: ["Agile methods for rapid deployment", "Automation & business integration", "Enhance digital transformation & CX"],
    image: service1,
    slug: "/services/app-development",
  },
  {
    title: "Application Design, Development and Integration",
    path: "/services/app-integration",
    desc: "Full range of requirements gathering, prototyping, implementation, and integration.",
    bullets: ["Designing Rich UI/UX for applications", "Builds for QA and client UAT", "API, Web services and connectors"],
    image: service2,
    slug: "/services/app-integration",
  },
  {
    title: "Application Management and Support",
    path: "/services/app-management",
    desc: "Providing management and support service for new and existing applications.",
    bullets: ["Application management and support", "Resolving technical issues", "Resolving functional issues"],
    image: service3,
    slug: "/services/app-management",
  },
  {
    title: "Application Maintenance",
    path: "/services/app-maintenance",
    desc: "Conducting reviews and ensuring standards.",
    bullets: ["Reviews for standards and requirements", "Ensuring systems perform optimally", "Ongoing support and maintenance"],
    image: service4,
    slug: "/services/app-maintenance",
  },
  {
    title: "Project Management",
    path: "/services/project-management",
    desc: "Establishing and managing timelines to budget.",
    bullets: ["Establishing timelines", "Managing agreed-to-budget", "Assessing and managing risks"],
    image: service5,
    slug: "/services/project-management",
  },
  {
    title: "Consulting Services",
    path: "/services/consulting",
    desc: "Assessing needs, requirements, and goals for cross-functional applications.",
    bullets: ["Reviewing technical design documents", "Analyzing feasibility & performance", "Addressing security & scalability"],
    image: service6,
    slug: "/services/consulting",
  },
  {
    title: "Teams Application Development and Integration",
    path: "/services/teams-integration",
    desc: "Developing bots, message extensions, and Teams integrations.",
    bullets: ["Bots and message extensions", "Integration into Microsoft Teams", "Web app embedded as Tab"],
    image: service7,
    slug: "/services/teams-integration",
  },
  {
    title: "Operational Efficiency and Fast Growth",
    path: "/services/operational-efficiency",
    desc: "Ensure efficient and cost-effective application development.",
    bullets: ["Efficient app development management", "Expand legacy app capabilities", "Boost growth by reinventing applications"],
    image: service8,
    slug: "/services/operational-efficiency",
  },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We dive deep into your business objectives, technical constraints, and user needs." },
  { step: "02", title: "Strategy", desc: "Drafting a comprehensive roadmap, choosing the right stack, and defining architecture." },
  { step: "03", title: "Development", desc: "Agile sprints with continuous integration, ensuring transparent and rapid progress." },
  { step: "04", title: "Delivery", desc: "Rigorous QA, secure deployment, and seamless handover with complete documentation." },
];

const techStack = [
  { category: "Frontend", tools: "React, Vue, Next.js, TailwindCSS" },
  { category: "Backend", tools: "Node.js, Python, Java, Go" },
  { category: "Cloud & DevOps", tools: "AWS, Azure, GCP, Kubernetes" },
  { category: "Data & AI", tools: "PyTorch, TensorFlow, Snowflake, Spark" }
];

const valueProps = [
  { label: "Agile delivery", detail: "Weeks to release, not months." },
  { label: "Fast growth", detail: "Reinvent apps, boost velocity." },
  { label: "Clean handover", detail: "Docs + knowledge transfer included." },
  { label: "Confidentiality", detail: "NDA-ready, least-access ops." },
];

/* ── STYLES ── */
const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg:#07100e; --bg-2:#0c1a16;
    --surface:rgba(255,255,255,0.04); --surface-2:rgba(255,255,255,0.07);
    --text:#dff0e8; --muted:#7a9e8e; --muted-2:#4a6a5a;
    --border:rgba(255,255,255,0.07); --border-2:rgba(255,255,255,0.12);
    --teal:#14b8a6; --teal-2:#2dd4bf; --teal-d:#0d9488; --teal-glow:rgba(20,184,166,0.20);
    --accent:#22c55e; --accent-2:#4ade80;
    --grad-brand:linear-gradient(135deg,var(--teal),var(--accent));
    --grad-text:linear-gradient(135deg,var(--teal-2) 0%,var(--accent-2) 100%);
    --shadow:0 24px 80px rgba(0,0,0,0.55); --shadow-soft:0 8px 32px rgba(0,0,0,0.30);
    --shadow-brand:0 12px 40px rgba(20,184,166,0.30);
    --radius:20px; --radius-sm:14px; --radius-pill:999px;
    --ease:cubic-bezier(0.22,1,0.36,1); --dur:0.25s; --dur-slow:0.45s;
  }

  *,*::before,*::after{box-sizing:border-box}
  html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;overflow-x:hidden}
  body{margin:0;font-family:'Inter',system-ui,sans-serif;color:var(--text);background:var(--bg);overflow-x:hidden}

  body::before{
    content:'';position:fixed;inset:0;
    background:
      radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),
      radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%),
      radial-gradient(ellipse 600px 400px at 50% 90%,rgba(20,184,166,0.06),transparent 70%);
    pointer-events:none;z-index:0
  }

  a{color:inherit;text-decoration:none}
  img{display:block;max-width:100%}

  .app{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column}
  .main{flex:1;padding-top:80px}

  /* ── CONTAINER ── */
  .container{width:100%;max-width:1600px;margin:0 auto;padding:0 clamp(20px,5vw,60px)}

  /* ── SECTIONS ── */
  .section{padding:clamp(56px,8vw,100px) 0;position:relative}
  .section--alt{background:rgba(255,255,255,0.015)}

  /* ── TYPOGRAPHY ── */
  .h1{font-weight:800;font-size:clamp(28px,5vw,60px);line-height:1.05;letter-spacing:-0.035em;margin:0}
  .h2{font-weight:800;font-size:clamp(22px,3vw,42px);line-height:1.1;letter-spacing:-0.03em;margin:0}
  .h3{font-weight:700;font-size:clamp(15px,1.8vw,20px);line-height:1.25;letter-spacing:-0.02em;margin:0}
  .text-grad{background:var(--grad-text);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .lead{font-size:clamp(14px,1.6vw,17px);font-weight:300;color:var(--muted);line-height:1.75;margin:0}

  .kicker{
    display:inline-flex;align-items:center;gap:8px;
    padding:4px 12px 4px 8px;font-size:10px;font-weight:700;
    letter-spacing:0.14em;text-transform:uppercase;color:var(--text);
    background:transparent;border:1px solid rgba(255,255,255,0.12);
    clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)
  }
  .kicker::before{content:'';display:block;width:5px;height:5px;background:#1D9E75;clip-path:polygon(50% 0%,100% 100%,0% 100%);flex-shrink:0}

  /* ── BUTTONS ── */
  .btn--primary{
    display:inline-flex;align-items:center;gap:8px;
    padding:9px 20px;font-size:13px;font-weight:600;cursor:pointer;
    border:1.5px solid #085041;white-space:nowrap;
    transition:all 0.15s ease;background:#085041;color:#9FE1CB;
    border-radius:5px;box-shadow:3px 3px 0 #1D9E75
  }
  .btn--primary:hover{box-shadow:1px 1px 0 #1D9E75;transform:translate(2px,2px)}
  .btn--primary:active{box-shadow:none;transform:translate(3px,3px)}

  .btn--ghost{
    display:inline-flex;align-items:center;gap:8px;
    padding:9px 20px;font-size:13px;font-weight:500;cursor:pointer;
    border-radius:var(--radius-pill);border:1px solid rgba(20,184,166,0.22);
    background:transparent;color:var(--teal-2);transition:all var(--dur) var(--ease)
  }
  .btn--ghost:hover{background:rgba(20,184,166,0.08);border-color:rgba(20,184,166,0.40)}

  /* ── ACCENT ── */
  .accent-bar{width:28px;height:3px;border-radius:2px;background:var(--grad-brand);margin-bottom:12px}

  /* ── HERO ── */
  .hero__inner{display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,4vw,56px);align-items:stretch}
  .hero__left{display:flex;flex-direction:column;justify-content:center}
  .hero__img{border-radius:16px;overflow:hidden;position:relative;box-shadow:var(--shadow);min-height:320px}
  .hero__img img{width:100%;height:100%;object-fit:cover;filter:saturate(.8) brightness(.85);position:absolute;inset:0}
  .hero__img-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(13,148,136,.35),transparent 60%)}

  @keyframes kenBurns{from{transform:scale(1)}to{transform:scale(1.06) translateX(-10px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate;will-change:transform}

  /* ── VALUE PROPS ── */
  .value-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(8px,1.5vw,14px)}
  .value-card{
    background:rgba(255,255,255,0.04);border:1px solid var(--border);
    border-radius:var(--radius-sm);padding:clamp(14px,2vw,20px);
    transition:border-color var(--dur),background var(--dur)
  }
  .value-card:hover{border-color:rgba(20,184,166,0.22);background:rgba(255,255,255,0.06)}
  .value-card__label{font-weight:800;font-size:clamp(12px,1.2vw,14px);color:var(--text);margin-bottom:5px}
  .value-card__detail{font-size:clamp(11px,1vw,12px);color:var(--muted);line-height:1.55}

  /* ── OFFERINGS GRID: 3 cols ── */
  .offerings-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2vw,24px)}

  .offering-cell{
    background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);
    border-radius:16px;overflow:hidden;display:flex;flex-direction:column;
    position:relative;transition:border-color .25s ease,background .25s ease
  }
  .offering-cell:hover{border-color:rgba(20,184,166,.22);background:rgba(255,255,255,.06)}
  .offering-cell::before{
    content:'';position:absolute;inset:0;border-radius:inherit;
    padding:1px;
    background:linear-gradient(130deg,transparent 0%,rgba(20,184,166,.22) 50%,transparent 100%);
    -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
    -webkit-mask-composite:xor;mask-composite:exclude;
    opacity:0;transition:opacity .45s ease;pointer-events:none
  }
  .offering-cell:hover::before{opacity:1}

  .offering-cell__img{width:100%;height:clamp(130px,20vw,180px);overflow:hidden;border-bottom:1px solid rgba(255,255,255,0.06)}
  .offering-cell__img img{width:100%;height:100%;object-fit:cover;transition:transform .45s var(--ease)}
  .offering-cell:hover .offering-cell__img img{transform:scale(1.04)}

  .offering-cell__body{padding:clamp(14px,2vw,20px);display:flex;flex-direction:column;flex:1;gap:10px}
  .offering-cell__title{font-weight:700;font-size:clamp(13px,1.5vw,16px);color:var(--text);transition:color .2s;line-height:1.25}
  .offering-cell__title:hover{color:var(--teal-2)}
  .offering-cell__desc{font-size:clamp(11px,1.1vw,13px);color:var(--muted);line-height:1.6;margin:0}

  .offering-cell__bullets{list-style:none;padding:0;margin:0;display:grid;gap:5px;flex:1}
  .offering-cell__bullet{display:flex;align-items:flex-start;gap:7px;font-size:clamp(10px,1vw,12px);color:var(--muted)}
  .offering-cell__dot{width:4px;height:4px;border-radius:50%;background:var(--teal);flex-shrink:0;margin-top:5px}

  .offering-cell__footer{display:flex;gap:8px;flex-wrap:wrap;padding-top:12px;border-top:1px solid rgba(255,255,255,0.07);margin-top:4px}

  /* ── CTA BAND ── */
  .cta-band{
    background:var(--grad-brand);border-radius:var(--radius);
    padding:clamp(28px,5vw,48px) clamp(20px,4vw,40px);
    display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap
  }
  .cta-band__title{font-size:clamp(18px,2.8vw,30px);font-weight:800;letter-spacing:-0.03em;color:#fff;margin:0 0 6px}
  .cta-band__sub{font-size:clamp(13px,1.4vw,15px);color:rgba(255,255,255,0.80);margin:0}
  .cta-band__btn{background:#fff;color:var(--teal-d);border:none;font-weight:700;padding:10px 22px;border-radius:var(--radius-pill);font-size:14px;cursor:pointer;transition:opacity .2s}
  .cta-band__btn:hover{opacity:.9}

  /* ── PROCESS & TECH GRIDS ── */
  .process-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(16px,2vw,24px)}
  .process-card{
    background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);
    border-radius:16px;padding:clamp(20px,3vw,30px);
    transition:transform .3s var(--ease), border-color .3s;
  }
  .process-card:hover{transform:translateY(-5px);border-color:var(--teal-2)}
  .process-card__step{font-size:clamp(32px,4vw,48px);font-weight:800;color:var(--teal-glow);line-height:1;margin-bottom:16px}
  .process-card__title{font-size:clamp(16px,2vw,20px);font-weight:700;color:var(--text);margin:0 0 8px}
  .process-card__desc{font-size:clamp(13px,1.5vw,15px);color:var(--muted);line-height:1.6;margin:0}

  .tech-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:clamp(12px,1.5vw,20px)}
  .tech-card{
    background:rgba(255,255,255,0.03);border:1px solid var(--border);
    border-radius:12px;padding:clamp(16px,2.5vw,24px);text-align:center;
    transition:border-color .3s, transform .3s;
  }
  .tech-card:hover{border-color:var(--teal-2);transform:translateY(-3px)}
  .tech-card__cat{font-size:13px;font-weight:700;color:var(--teal-2);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px}
  .tech-card__tools{font-size:15px;font-weight:600;color:var(--text)}

  /* ── RESPONSIVE ── */
  @media(max-width:1100px){
    .offerings-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:900px){
    .hero__inner{grid-template-columns:1fr}
    .hero__img{min-height:240px;aspect-ratio:16/9}
    .value-grid{grid-template-columns:repeat(2,1fr)}
    .process-grid, .tech-grid{grid-template-columns:repeat(2,1fr)}
  }
  @media(max-width:600px){
    .value-grid{grid-template-columns:1fr 1fr}
    .cta-band{flex-direction:column;align-items:flex-start}
    .process-grid, .tech-grid{grid-template-columns:1fr}
  }
  @media(max-width:480px){
    .offerings-grid{grid-template-columns:1fr}
  }
`;

/* ── COMPONENT ── */
export default function Services() {
  useReveal();

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── 1. HERO ── */}
      <section className="section">
        <div className="container">
          <div className="hero__inner">
            {/* Left: copy */}
            <div className="hero__left ha ha-1">
              <div style={{ marginBottom: 14 }}>
                <span className="kicker">Services</span>
              </div>
              <h1 className="h1">
                Enterprise IT services,{" "}
                <span className="text-grad">end to end.</span>
              </h1>
              <p className="lead" style={{ marginTop: 16, maxWidth: "52ch" }}>
                We offer a comprehensive range of data and technology services tailored to meet the diverse needs of modern businesses — from application development to AI-powered workflows.
              </p>
              <div style={{ marginTop: 24, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn--primary" to="/contact">Book a discovery call</Link>
                <Link className="btn--ghost" to="/about">How we work</Link>
              </div>
            </div>

            {/* Right: image — stretches to match left column height */}
            <div className="hero__img ha ha-2">
              <img
                className="ken-burns"
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80"
                alt="Developer writing code"
                loading="lazy"
              />
              <div className="hero__img-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT YOU GET ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{ marginBottom: clamp(20, 28) }}>
            <span className="kicker">Every engagement</span>
            <h2 className="h2" style={{ marginTop: 10, fontSize: "clamp(18px,2.5vw,28px)" }}>What you get by default</h2>
          </div>
          <div className="value-grid rv">
            {valueProps.map(({ label, detail }) => (
              <div key={label} className="value-card">
                <div className="value-card__label">{label}</div>
                <div className="value-card__detail">{detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES GRID ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: "clamp(20px,4vw,36px)" }}>
            <span className="kicker">Offerings</span>
            <h2 className="h2" style={{ marginTop: 10 }}>Choose what you need</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "56ch" }}>
              From application development to data science and AI — we cover the full spectrum of enterprise technology needs.
            </p>
          </div>

          <div className="offerings-grid rv-group">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="offering-cell rv"
              >
                {/* Image */}
                <div className="offering-cell__img">
                  <Link to={o.slug} style={{ display: "block", width: "100%", height: "100%" }}>
                    <img src={o.image} alt={o.title} loading="lazy" />
                  </Link>
                </div>

                {/* Body */}
                <div className="offering-cell__body">
                  <Link to={o.slug} className="offering-cell__title">{o.title}</Link>
                  <p className="offering-cell__desc">{o.desc}</p>

                  <ul className="offering-cell__bullets">
                    {o.bullets.map((b) => (
                      <li key={b} className="offering-cell__bullet">
                        <span className="offering-cell__dot" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="offering-cell__footer">
                    <Link className="btn--primary" to={o.slug} style={{ fontSize: 12, padding: "7px 14px" }}>Explore</Link>
                    <Link className="btn--ghost" to="/contact" style={{ fontSize: 12, padding: "7px 14px" }}>Enquire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW WE WORK (PROCESS) ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{ marginBottom: "clamp(20px,4vw,36px)" }}>
            <span className="kicker">Our Process</span>
            <h2 className="h2" style={{ marginTop: 10 }}>How we deliver excellence</h2>
            <p className="lead" style={{ marginTop: 10, maxWidth: "56ch" }}>
              A proven methodology that ensures quality, transparency, and speed from concept to production.
            </p>
          </div>
          <div className="process-grid rv-group">
            {processSteps.map((p) => (
              <div key={p.step} className="process-card rv">
                <div className="process-card__step">{p.step}</div>
                <h3 className="process-card__title">{p.title}</h3>
                <p className="process-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TECH STACK ── */}
      <section className="section">
        <div className="container">
          <div className="rv" style={{ marginBottom: "clamp(20px,4vw,36px)", textAlign: "center" }}>
            <span className="kicker">Technologies</span>
            <h2 className="h2" style={{ marginTop: 10 }}>Powered by modern tools</h2>
          </div>
          <div className="tech-grid rv-group">
            {techStack.map((t) => (
              <div key={t.category} className="tech-card rv">
                <div className="tech-card__cat">{t.category}</div>
                <div className="tech-card__tools">{t.tools}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="section section--alt">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Ready to transform your digital operations?</h2>
              <p className="cta-band__sub">From consulting to full system transformation — we bring the right expertise to deliver results.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="cta-band__btn" to="/contact">Get in touch</Link>
              <Link
                className="btn--ghost"
                to="/about"
                style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.3)" }}
              >
                How we work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// tiny helper used inline in JSX (not imported)
function clamp(min, max) { return `clamp(${min}px,3vw,${max}px)`; }