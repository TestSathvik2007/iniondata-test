import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

const capabilities = [
  {
    title: "Cloud Strategy & Consulting",
    icon: "map",
    bullets: [
      "Define cloud roadmap aligned with business goals.",
      "Assess infrastructure and optimize costs.",
    ],
  },
  {
    title: "Cloud Migration",
    icon: "rocket",
    bullets: [
      "Seamless migration with minimal downtime.",
      "Modernize legacy applications.",
    ],
  },
  {
    title: "Cloud Architecture",
    icon: "arch",
    bullets: [
      "Scale, secure, and high-availability designs.",
      "Multi-cloud and hybrid solutions.",
    ],
  },
  {
    title: "DevOps & Automation",
    icon: "gear",
    bullets: [
      "CI/CD pipelines and automated deployments.",
      "Containerization with Docker & Kubernetes.",
    ],
  },
  {
    title: "Cloud Security",
    icon: "shield",
    bullets: [
      "Identity management, encryption, and compliance.",
      "Risk assessment and threat protection.",
    ],
  },
  {
    title: "Managed Services & Optimization",
    icon: "chart",
    bullets: [
      "Performance monitoring and cost optimization.",
      "24/7 support and cloud operations.",
    ],
  },
];

const deliverySteps = [
  { n: "01", title: "Discovery & Assessment", desc: "We analyze your current data landscape, challenges, and goals." },
  { n: "02", title: "Architecture & Roadmap", desc: "We design scalable, future-proof data architecture tailored to your business." },
  { n: "03", title: "Build & Implementation", desc: "We develop pipelines, storage layers, governance frameworks, and integrations." },
  { n: "04", title: "Optimization & Support", desc: "We monitor, refine, and evolve your data ecosystem as your needs grow." },
];

const cloudProviders = ["Microsoft Azure", "Amazon Web Services", "Google Cloud Platform"];
const tools = ["Kubernetes", "Docker", "Terraform", "Ansible", "GitHub Actions", "Prometheus", "Grafana", "ArgoCD", "Helm", "Vault"];
const metrics = [
  { value: "40%", label: "Average cloud cost reduction" },
  { value: "99.99%", label: "Uptime SLA delivered" },
  { value: "3×", label: "Deployment frequency" },
];

const styles = `
@keyframes ce-orbit  { from{transform:rotate(0deg)   translateX(110px) rotate(0deg)}    to{transform:rotate(360deg)  translateX(110px) rotate(-360deg)} }
@keyframes ce-orbit2 { from{transform:rotate(120deg) translateX(72px)  rotate(-120deg)} to{transform:rotate(480deg)  translateX(72px)  rotate(-480deg)} }
@keyframes ce-orbit3 { from{transform:rotate(240deg) translateX(48px)  rotate(-240deg)} to{transform:rotate(600deg)  translateX(48px)  rotate(-600deg)} }
@keyframes ce-glow   { 0%,100%{opacity:.13} 50%{opacity:.25} }
@keyframes ce-in     { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }
@keyframes ce-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
@keyframes ce-shimmer{ 0%{background-position:-200% 0} 100%{background-position:200% 0} }

.ce-hero { display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }

/* Orbit visual (desktop) */
.ce-orbit-wrap { position:relative; width:340px; height:340px; margin:0 auto; animation:ce-in .8s var(--ease) both; }
.ce-orbit-wrap::before { content:''; position:absolute; inset:-60px; border-radius:50%; background:radial-gradient(circle,rgba(20,184,166,.14),transparent 60%); animation:ce-glow 5s ease-in-out infinite; }
.ce-orbit-ring { position:absolute; top:50%; left:50%; border-radius:50%; border:1px dashed rgba(20,184,166,.22); transform:translate(-50%,-50%); }
.ce-orbit-core { position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:76px; height:76px; border-radius:50%; background:rgba(20,184,166,.12); border:2px solid rgba(20,184,166,.45); display:flex; align-items:center; justify-content:center; }
.ce-orbit-node { position:absolute; top:50%; left:50%; width:34px; height:34px; border-radius:50%; background:rgba(34,197,94,.14); border:1.5px solid rgba(34,197,94,.45); display:flex; align-items:center; justify-content:center; transform-origin:0 0; }
.ce-orbit-node-1 { animation:ce-orbit  8s linear infinite }
.ce-orbit-node-2 { animation:ce-orbit2 6s linear infinite }
.ce-orbit-node-3 { animation:ce-orbit3 4.5s linear infinite }

/* Mobile hero image fallback */
.ce-hero-img-mobile {
  display:none;
  width:100%;
  border-radius:20px;
  overflow:hidden;
  margin-top:8px;
}
.ce-hero-img-mobile img { width:100%; display:block; border-radius:20px; max-height:260px; object-fit:cover; }

.ce-stat-band { display:grid; grid-template-columns:repeat(3,1fr); margin-top:60px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,.08); }
.ce-stat { padding:32px 28px; text-align:center; background:rgba(255,255,255,.03); border-right:1px solid rgba(255,255,255,.08); transition:.25s; }
.ce-stat:last-child { border-right:none }
.ce-stat:hover { background:rgba(20,184,166,.07) }
.ce-stat-val { font-size:42px; font-weight:800; background:linear-gradient(135deg,#14b8a6,#2dd4bf); -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
.ce-stat-lbl { font-size:13px; color:var(--muted); margin-top:4px }

.ce-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; margin-top:40px; }
.ce-card { padding:28px 26px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.3s var(--ease); position:relative; overflow:hidden; }
.ce-card::before { content:''; position:absolute; top:-1px; left:-1px; right:-1px; height:2px; background:linear-gradient(90deg,transparent,#14b8a6,transparent); opacity:0; transition:.3s; }
.ce-card:hover { transform:translateY(-6px); border-color:rgba(20,184,166,.3); box-shadow:0 20px 60px rgba(20,184,166,.12) }
.ce-card:hover::before { opacity:1 }
.ce-card-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,.1); border:1px solid rgba(20,184,166,.25); display:flex; align-items:center; justify-content:center; margin-bottom:14px; color:#2dd4bf; }
.ce-card-icon svg { width:20px; height:20px; }
.ce-card h3 { margin:0 0 14px; font-size:16px; font-weight:700; color:var(--text) }
.ce-card ul { margin:0; padding:0; list-style:none; display:grid; gap:7px }
.ce-card li { display:flex; align-items:flex-start; gap:8px; font-size:13px; color:var(--muted); line-height:1.55 }
.ce-card li::before { content:''; width:5px; height:5px; border-radius:50%; background:var(--teal); flex-shrink:0; margin-top:5px }

.ce-providers { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:32px; }
.ce-provider { padding:24px; border-radius:16px; border:1px solid rgba(255,255,255,.08); text-align:center; transition:.25s; position:relative; overflow:hidden; }
.ce-provider::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#14b8a6,#22c55e); transform:scaleX(0); transform-origin:left; transition:.3s; }
.ce-provider:hover { border-color:rgba(20,184,166,.3); background:rgba(20,184,166,.05) }
.ce-provider:hover::after { transform:scaleX(1) }
.ce-provider-name { font-weight:700; font-size:15px; margin-bottom:6px; color:var(--text) }
.ce-provider-tag { display:inline-block; padding:3px 10px; border-radius:999px; font-size:11px; font-weight:600; border:1px solid rgba(20,184,166,.3); color:var(--teal-2) }

.ce-tools { display:flex; flex-wrap:wrap; gap:10px; margin-top:20px }
.ce-pill { padding:8px 18px; border-radius:999px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08); font-size:13px; font-weight:500; transition:.2s; }
.ce-pill:hover { background:rgba(20,184,166,.1); border-color:rgba(20,184,166,.4); color:var(--teal-2) }

.ce-delivery { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
.ce-step { padding:28px 24px; border-radius:20px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.07); transition:.25s; }
.ce-step:hover { border-color:rgba(20,184,166,.3) }
.ce-step-n { font-size:48px; font-weight:800; line-height:1; color:rgba(20,184,166,.18); margin-bottom:14px; letter-spacing:-0.04em; }
.ce-step h3 { margin:0 0 10px; font-size:16px; font-weight:700 }
.ce-step p { margin:0; font-size:13px; color:var(--muted); line-height:1.65 }

@media(max-width:1000px) {
  .ce-hero { grid-template-columns:1fr; gap:32px }
  .ce-orbit-wrap { display:none }
  .ce-hero-img-mobile { display:block }
  .ce-grid { grid-template-columns:1fr 1fr }
  .ce-providers { grid-template-columns:1fr }
  .ce-delivery { grid-template-columns:1fr 1fr }
  .ce-stat-band { grid-template-columns:1fr 1fr 1fr }
}
@media(max-width:640px) {
  .ce-grid { grid-template-columns:1fr }
  .ce-stat-band { grid-template-columns:1fr }
  .ce-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,.08) }
  .ce-stat:last-child { border-bottom:none }
  .ce-delivery { grid-template-columns:1fr }
  .ce-providers { grid-template-columns:1fr }
}
`;

const ceIcons = {
  map: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
  rocket: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  arch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
  gear: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

export default function CloudEngineering() {
  useReveal();
  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container ce-hero">
          <div>
            <div className="kicker reveal">Cloud Engineering</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              Scale, Secure, and<br />
              <span style={{ background: "linear-gradient(135deg,#14b8a6,#22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Innovate in the Cloud.
              </span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 520 }}>
              At InionData, we design and deliver cloud solutions that enhance agility, scalability, and performance. From migration to optimization, we help businesses modernize their infrastructure and accelerate innovation.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn btn--primary" to="/contact">Start a project</Link>
              <Link className="btn btn--ghost" to="/services">All services</Link>
            </div>
            {/* Mobile image */}
            <div className="ce-hero-img-mobile reveal">
              <img
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=75"
                alt="Cloud infrastructure"
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>

          <div className="reveal" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div className="ce-orbit-wrap">
              <div className="ce-orbit-ring" style={{ width: 220, height: 220 }} />
              <div className="ce-orbit-ring" style={{ width: 144, height: 144 }} />
              <div className="ce-orbit-ring" style={{ width: 96, height: 96 }} />
              <div className="ce-orbit-core">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{width:28,height:28}}><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
              </div>
              <div className="ce-orbit-node ce-orbit-node-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              </div>
              <div className="ce-orbit-node ce-orbit-node-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4"/></svg>
              </div>
              <div className="ce-orbit-node ce-orbit-node-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:16,height:16}}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="ce-stat-band reveal">
            {metrics.map(m => (
              <div key={m.label} className="ce-stat">
                <div className="ce-stat-val">{m.value}</div>
                <div className="ce-stat-lbl">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Capabilities</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Our Capabilities</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 600 }}>Everything you need to move to the cloud — and thrive once you're there.</p>
          <div className="ce-grid">
            {capabilities.map((cap, i) => (
              <div key={cap.title} className="ce-card reveal" style={{ "--i": i }}>
                <div className="ce-card-icon">{ceIcons[cap.icon]}</div>
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
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Cloud platforms we master</h2>
          <div className="ce-providers">
            {cloudProviders.map(p => (
              <div key={p} className="ce-provider reveal">
                <div className="ce-provider-name">{p}</div>
                <div className="ce-provider-tag">Cloud</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36 }}>
            <div className="kicker reveal" style={{ marginBottom: 16 }}>Tools & Automation</div>
            <div className="ce-tools reveal">
              {tools.map(t => <div key={t} className="ce-pill">{t}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker reveal">Our approach</div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: 580 }}>Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.</p>
          <div className="ce-delivery reveal">
            {deliverySteps.map(s => (
              <div key={s.n} className="ce-step">
                <div className="ce-step-n">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <h2>Ready to move to the cloud?</h2>
            <Link className="btn cta-band__btn" to="/contact">Book a free scoping call</Link>
          </div>
        </div>
      </section>
    </div>
  );
}