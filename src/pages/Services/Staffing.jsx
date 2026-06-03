import { Link } from "react-router-dom";
import { useEffect } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────

const hiringModels = [
  {
    num: "01",
    title: "Contract Staffing",
    desc: "On-demand professionals for project-based or short-term engagements. Immediate start, zero long-term overhead, fully managed.",
    tags: ["Immediate start", "Flexible duration", "Managed payroll"],
    accent: "#14b8a6",
    icon: "⚡",
  },
  {
    num: "02",
    title: "Contract-to-Hire",
    desc: "Evaluate talent on the job before committing. Reduce hiring risk while securing the right long-term fit for your team.",
    tags: ["Trial period", "Risk-free", "Culture fit assured"],
    accent: "#22c55e",
    icon: "⚖",
  },
  {
    num: "03",
    title: "Direct Hire",
    desc: "Permanent placements, sourced and vetted end-to-end. We handle the search so you can focus on the interview.",
    tags: ["Retained search", "Background checked", "Guarantee period"],
    accent: "#2dd4bf",
    icon: "🎯",
  },
];

const process = [
  { icon: "◎", step: "01", title: "Requirements Briefing", desc: "We deep-dive into your tech stack, team culture, and delivery timeline to build a precise candidate profile." },
  { icon: "◈", step: "02", title: "Targeted Sourcing",     desc: "Our network spans pre-screened professionals. We reach passive talent your job posts won't find." },
  { icon: "◇", step: "03", title: "Rigorous Screening",    desc: "Technical assessments, structured interviews, and reference checks — every candidate arrives verified." },
  { icon: "▶", step: "04", title: "Fast Placement",        desc: "First shortlist delivered quickly. Onboarding support included. We stay engaged until your hire is thriving." },
];

const domains = [
  { icon: "⬡", label: "SAP & ERP" },
  { icon: "⬡", label: "Data & AI" },
  { icon: "⬡", label: "Guidewire" },
  { icon: "⬡", label: "Cloud & DevOps" },
  { icon: "⬡", label: "Cybersecurity" },
  { icon: "⬡", label: "Microsoft 365" },
  { icon: "⬡", label: "Java / .NET" },
  { icon: "⬡", label: "QA & Testing" },
  { icon: "⬡", label: "Project Management" },
  { icon: "⬡", label: "Business Analysis" },
];

const whyUs = [
  {
    icon: "◈",
    title: "Rigorous Vetting Process",
    desc: "Every candidate goes through technical assessments, structured interviews, and reference checks before we present them to you. No guesswork.",
  },
  {
    icon: "◎",
    title: "Flexible Hiring Models",
    desc: "Contract, contract-to-hire, or direct hire — choose the engagement model that fits your timeline and budget, with no lock-in.",
  },
  {
    icon: "▶",
    title: "Scalable Teams",
    desc: "From a single specialist to a full delivery team — scale up or down instantly as your project demands shift.",
  },
  {
    icon: "◇",
    title: "Domain Expertise",
    desc: "We specialise in enterprise IT — SAP, Data, Guidewire, Cloud, and more. We understand the roles we place, not just the job titles.",
  },
];

// ── STYLES ────────────────────────────────────────────────────────────────────

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  :root {
    --bg: #07100e;
    --bg-2: #0c1a16;
    --surface: rgba(255,255,255,0.04);
    --surface-2: rgba(255,255,255,0.07);
    --text: #dff0e8;
    --muted: #7a9e8e;
    --border: rgba(255,255,255,0.07);
    --border-2: rgba(255,255,255,0.12);
    --teal: #14b8a6;
    --teal-2: #2dd4bf;
    --teal-d: #0d9488;
    --accent: #22c55e;
    --shadow: 0 24px 80px rgba(0,0,0,0.55);
    --shadow-soft: 0 8px 32px rgba(0,0,0,0.30);
    --radius: 20px;
    --radius-sm: 14px;
    --radius-pill: 999px;
    --container: min(1320px,100%);
    --pad: 40px;
    --font: 'Inter', system-ui, sans-serif;
    --ease: cubic-bezier(0.22,1,0.36,1);
    --dur: 0.25s;
  }

  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  body { margin: 0; font-family: var(--font); line-height: 1.6; color: var(--text); background: var(--bg); overflow-x: hidden; }
  body::before { content:''; position:fixed; inset:0; background:radial-gradient(ellipse 900px 600px at 10% 0%,rgba(20,184,166,0.12),transparent 70%),radial-gradient(ellipse 700px 500px at 90% 10%,rgba(34,197,94,0.09),transparent 70%),radial-gradient(ellipse 600px 400px at 50% 90%,rgba(20,184,166,0.06),transparent 70%); pointer-events:none; z-index:0; }
  a { color:inherit; text-decoration:none; }
  button { font:inherit; cursor:pointer; }
  img { display:block; max-width:100%; }

  .sf-wrap { position:relative; z-index:1; }
  .sf-container { width:100%; max-width:var(--container); margin:0 auto; padding:0 clamp(16px,4vw,var(--pad)); }
  .sf-section { padding:clamp(56px,9vw,110px) 0; position:relative; z-index:1; }
  .sf-section--alt { background:rgba(255,255,255,0.015); }

  .kicker { display:inline-flex; align-items:center; gap:8px; flex-shrink:0; padding:4px 12px 4px 9px; font-size:clamp(9px,1.1vw,11px); font-weight:700; letter-spacing:0.12em; text-transform:uppercase; white-space:nowrap; border:1px solid rgba(255,255,255,0.12); clip-path:polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%); color:var(--text); }
  .kicker::before { content:''; display:block; width:5px; height:5px; flex-shrink:0; background:#1D9E75; clip-path:polygon(50% 0%,100% 100%,0% 100%); }

  .h1 { font-weight:800; font-size:clamp(28px,4.2vw,58px); line-height:1.03; letter-spacing:-0.04em; margin:0; }
  .h2 { font-weight:800; font-size:clamp(22px,3vw,38px); line-height:1.08; letter-spacing:-0.03em; margin:0; }
  .lead { font-size:clamp(13px,1.3vw,15px); font-weight:300; color:var(--muted); line-height:1.75; }

  .btn { display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:clamp(8px,1.5vw,12px) clamp(14px,2vw,22px); border-radius:var(--radius-pill); border:1px solid var(--border-2); background:var(--surface-2); color:var(--text); font-family:var(--font); font-size:clamp(12px,1.4vw,14px); font-weight:500; cursor:pointer; white-space:nowrap; transition:transform var(--dur) var(--ease),box-shadow var(--dur) var(--ease); }
  .btn:hover { transform:translateY(-2px); box-shadow:var(--shadow-soft); }
  .btn--primary { background:#085041; color:#9FE1CB; border-radius:5px; border:1.5px solid #085041; box-shadow:4px 4px 0 #1D9E75; font-weight:600; }
  .btn--primary:hover  { box-shadow:2px 2px 0 #1D9E75; transform:translate(2px,2px); }
  .btn--primary:active { box-shadow:none; transform:translate(4px,4px); }
  .btn--ghost { background:transparent; border-color:rgba(20,184,166,0.22); color:var(--teal-2); }
  .btn--ghost:hover { background:rgba(20,184,166,0.08); border-color:rgba(20,184,166,0.40); }

  .section-divider { width:44px; height:3px; border-radius:2px; background:linear-gradient(90deg,var(--teal),var(--teal-2)); margin:10px 0 18px; }

  /* REVEAL */
  .reveal { opacity:0; transform:translateY(22px); transition:opacity .6s var(--ease),transform .6s var(--ease); }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .reveal-group .reveal { transition-delay:calc(var(--i,0) * .09s); }

  /* ── HERO ── */
  .sf-hero { padding:clamp(64px,10vw,120px) 0 clamp(48px,8vw,90px); }
  .sf-hero-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(32px,5vw,72px);
    align-items:center;
  }
  .sf-hero-btns { display:flex; gap:10px; flex-wrap:wrap; margin-top:28px; }
  .sf-hero-visual { position:relative; }
  .sf-hero-img-wrap { border-radius:20px; overflow:hidden; aspect-ratio:4/3; position:relative; border:1px solid rgba(255,255,255,0.08); }
  .sf-hero-img-wrap img { width:100%; height:100%; object-fit:cover; filter:brightness(0.82) saturate(0.9); }
  .sf-hero-img-wrap::after { content:''; position:absolute; inset:0; background:linear-gradient(to top,rgba(7,16,14,0.72) 0%,transparent 55%); }

  /* ── MODELS ── */
  .sf-models-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-top:40px; }
  .sf-model-card { background:rgba(255,255,255,0.035); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:clamp(20px,3vw,32px); position:relative; overflow:hidden; transition:border-color .3s ease,transform .3s var(--ease),box-shadow .3s ease; }
  .sf-model-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,var(--card-accent,#14b8a6),transparent); opacity:0; transition:opacity .3s ease; }
  .sf-model-card:hover { border-color:rgba(20,184,166,0.30); transform:translateY(-5px); box-shadow:0 24px 60px rgba(0,0,0,0.4); }
  .sf-model-card:hover::before { opacity:1; }
  .sf-model-num { font-size:10px; font-weight:800; letter-spacing:0.16em; color:var(--teal-2); margin-bottom:14px; }
  .sf-model-title { font-size:clamp(16px,1.8vw,20px); font-weight:700; color:var(--text); margin:0 0 10px; letter-spacing:-0.02em; }
  .sf-model-desc { font-size:clamp(12px,1.3vw,13px); color:var(--muted); line-height:1.75; margin:0 0 18px; }
  .sf-model-tags { display:flex; flex-wrap:wrap; gap:6px; }
  .sf-model-tag { font-size:10px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; padding:3px 10px; border-radius:99px; background:rgba(20,184,166,0.10); border:1px solid rgba(20,184,166,0.20); color:var(--teal-2); }
  .sf-model-icon { position:absolute; top:20px; right:20px; width:36px; height:36px; border-radius:10px; background:rgba(20,184,166,0.08); border:1px solid rgba(20,184,166,0.15); display:flex; align-items:center; justify-content:center; font-size:16px; }

  /* ── WHY US ── */
  .sf-why-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; margin-top:40px; }
  .sf-why-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:16px; padding:clamp(20px,3vw,28px); display:grid; grid-template-columns:46px 1fr; gap:16px; align-items:flex-start; transition:border-color .25s ease,background .25s ease; }
  .sf-why-card:hover { border-color:rgba(20,184,166,0.28); background:rgba(20,184,166,0.04); }
  .sf-why-icon { width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,0.10); border:1px solid rgba(20,184,166,0.20); display:flex; align-items:center; justify-content:center; font-size:16px; color:var(--teal-2); flex-shrink:0; }
  .sf-why-title { font-size:clamp(13px,1.5vw,15px); font-weight:700; color:var(--text); margin:0 0 6px; letter-spacing:-0.01em; }
  .sf-why-desc { font-size:clamp(11px,1.2vw,13px); color:var(--muted); line-height:1.75; margin:0; }

  /* ── DOMAINS ── */
  .sf-domains-grid {
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:clamp(24px,5vw,72px);
    align-items:center;
  }
  .sf-domains-wrap { display:flex; flex-wrap:wrap; gap:10px; margin-top:32px; }
  .sf-domain { display:flex; align-items:center; gap:8px; padding:8px 16px; border-radius:10px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); font-size:13px; font-weight:600; color:var(--text); transition:background .2s ease,border-color .2s ease,transform .2s var(--ease); cursor:default; }
  .sf-domain:hover { background:rgba(20,184,166,0.08); border-color:rgba(20,184,166,0.28); transform:translateY(-2px); }
  .sf-domain-icon { color:var(--teal); font-size:10px; }

  /* ── PROCESS ── */
  .sf-process-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:0; margin-top:48px; position:relative; }
  .sf-process-grid::before { content:''; position:absolute; top:28px; left:calc(12.5%); right:calc(12.5%); height:1px; background:linear-gradient(90deg,transparent,rgba(20,184,166,0.4),rgba(20,184,166,0.4),transparent); pointer-events:none; }
  .sf-process-step { padding:0 clamp(12px,2vw,24px); text-align:center; position:relative; }
  .sf-process-node { width:56px; height:56px; border-radius:50%; background:rgba(12,26,22,0.98); border:2px solid rgba(20,184,166,0.35); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:18px; color:var(--teal-2); position:relative; z-index:1; transition:border-color .3s ease,background .3s ease; }
  .sf-process-step:hover .sf-process-node { border-color:var(--teal); background:rgba(20,184,166,0.10); }
  .sf-process-num { font-size:10px; font-weight:800; letter-spacing:0.14em; color:var(--teal); margin-bottom:8px; }
  .sf-process-title { font-size:clamp(13px,1.5vw,15px); font-weight:700; color:var(--text); margin-bottom:8px; letter-spacing:-0.01em; }
  .sf-process-desc { font-size:clamp(11px,1.2vw,12px); color:var(--muted); line-height:1.7; }

  /* ── CTA ── */
  .sf-cta-inner { border-radius:20px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); overflow:hidden; padding:clamp(36px,6vw,64px) clamp(24px,5vw,64px); position:relative; text-align:center; }
  .sf-cta-inner::before { content:''; position:absolute; inset:0; background:radial-gradient(ellipse 700px 400px at 50% 100%,rgba(20,184,166,0.07),transparent 70%); pointer-events:none; }
  .sf-cta-btns { display:flex; gap:10px; flex-wrap:wrap; margin-top:24px; justify-content:center; }

  /* ── RESPONSIVE ── */

  /* Tablet / large mobile */
  @media(max-width:960px) {
    .sf-hero-grid {
      grid-template-columns:1fr;
    }
    /* Show image on mobile — stacked below the text */
    .sf-hero-visual {
      display:block;
    }
    .sf-hero-img-wrap {
      aspect-ratio:16/9;
    }
    .sf-models-grid { grid-template-columns:1fr 1fr; }
    .sf-why-grid { grid-template-columns:1fr 1fr; }
    .sf-domains-grid { grid-template-columns:1fr; }
    .sf-process-grid { grid-template-columns:repeat(2,1fr); gap:32px; }
    .sf-process-grid::before { display:none; }
  }

  /* Small mobile */
  @media(max-width:600px) {
    .kicker { clip-path:none; border-radius:5px; }
    .sf-hero-btns { flex-direction:column; align-items:flex-start; }
    .sf-hero-btns .btn,
    .sf-hero-btns a { width:100%; justify-content:center; }
    .sf-models-grid { grid-template-columns:1fr; }
    .sf-why-grid { grid-template-columns:1fr; }
    .sf-process-grid { grid-template-columns:1fr; }
    .sf-hero-img-wrap { aspect-ratio:4/3; border-radius:14px; }
    .sf-cta-btns { flex-direction:column; align-items:center; }
    .sf-cta-btns .btn,
    .sf-cta-btns a { width:100%; max-width:320px; justify-content:center; }
  }
`;

// ── REVEAL HOOK ───────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.10 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function StaffingSolutions() {
  useReveal();

  return (
    <div className="sf-wrap">
      <style>{css}</style>

      {/* ══ HERO ══ */}
      <section className="sf-section sf-hero">
        <div className="sf-container">
          <div className="sf-hero-grid">
            <div>
              <div className="kicker" style={{ marginBottom: 14 }}>IT Staffing Solutions</div>
              <h1 className="h1">
                The right talent,<br />
                <span style={{ color: "var(--teal-2)" }}>exactly when</span><br />
                you need it.
              </h1>
              <p className="lead" style={{ marginTop: 18, maxWidth: "52ch" }}>
                We source, vet, and place pre-screened IT professionals who contribute from
                day one — across contract, contract-to-hire, and permanent roles.
                No guesswork, no delays.
              </p>
              <div className="sf-hero-btns">
                <Link className="btn btn--primary" to="/contact">Start hiring →</Link>
                <Link className="btn btn--ghost" to="/contact">Talk to our team</Link>
              </div>
            </div>

            <div className="sf-hero-visual">
              <div className="sf-hero-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="IT staffing team"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ HIRING MODELS ══ */}
      <section className="sf-section sf-section--alt">
        <div className="sf-container">
          <div className="reveal">
            <div className="kicker">Hiring Models</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Choose the engagement that fits</h2>
            <div className="section-divider" />
            <p className="lead" style={{ maxWidth: "60ch" }}>
              Whether you need someone this week or a permanent hire in three months —
              our three engagement models give you full flexibility with zero long-term commitment.
            </p>
          </div>
          <div className="sf-models-grid reveal-group">
            {hiringModels.map((m, i) => (
              <div
                key={m.num}
                className="sf-model-card reveal"
                style={{ "--i": i, "--card-accent": m.accent }}
              >
                <div className="sf-model-icon">{m.icon}</div>
                <div className="sf-model-num">{m.num}</div>
                <div className="sf-model-title">{m.title}</div>
                <p className="sf-model-desc">{m.desc}</p>
                <div className="sf-model-tags">
                  {m.tags.map((t) => (
                    <span key={t} className="sf-model-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY US ══ */}
      <section className="sf-section">
        <div className="sf-container">
          <div className="reveal">
            <div className="kicker">Why Innovise IT</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Built around the way you actually hire</h2>
            <div className="section-divider" />
            <p className="lead" style={{ maxWidth: "58ch" }}>
              We're not a job board. We're a specialist staffing partner that takes the time
              to understand your team, your stack, and your delivery pressures.
            </p>
          </div>
          <div className="sf-why-grid reveal-group">
            {whyUs.map((w, i) => (
              <div key={w.title} className="sf-why-card reveal" style={{ "--i": i }}>
                <div className="sf-why-icon">{w.icon}</div>
                <div>
                  <div className="sf-why-title">{w.title}</div>
                  <p className="sf-why-desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOMAINS ══ */}
      <section className="sf-section sf-section--alt">
        <div className="sf-container">
          <div className="sf-domains-grid">
            <div className="reveal">
              <div className="kicker">Specialisations</div>
              <h2 className="h2" style={{ marginTop: 10 }}>We place across every critical IT domain</h2>
              <div className="section-divider" />
              <p className="lead">
                Our focus is enterprise IT — from legacy ERP modernisation through to
                cutting-edge AI and cloud infrastructure. We understand the roles we place,
                not just the job titles.
              </p>
              <div style={{ marginTop: 24 }}>
                <Link className="btn btn--ghost" to="/contact">Discuss your requirements →</Link>
              </div>
            </div>
            <div className="reveal">
              <div className="sf-domains-wrap">
                {domains.map((d) => (
                  <div key={d.label} className="sf-domain">
                    <span className="sf-domain-icon">{d.icon}</span>
                    {d.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section className="sf-section">
        <div className="sf-container">
          <div style={{ textAlign: "center" }} className="reveal">
            <div className="kicker" style={{ justifyContent: "center" }}>How it works</div>
            <h2 className="h2" style={{ marginTop: 10 }}>Simple, fast, and transparent</h2>
            <div className="section-divider" style={{ margin: "10px auto 0" }} />
            <p className="lead" style={{ marginTop: 14, maxWidth: "52ch", margin: "14px auto 0" }}>
              From your first brief to a placed candidate — here's exactly what working
              with Innovise IT looks like.
            </p>
          </div>
          <div className="sf-process-grid reveal-group">
            {process.map((p, i) => (
              <div key={p.step} className="sf-process-step reveal" style={{ "--i": i }}>
                <div className="sf-process-node">{p.icon}</div>
                <div className="sf-process-num">{p.step}</div>
                <div className="sf-process-title">{p.title}</div>
                <p className="sf-process-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="sf-section sf-section--alt">
        <div className="sf-container">
          <div className="sf-cta-inner reveal">
            <div className="kicker" style={{ justifyContent: "center" }}>Ready to hire?</div>
            <h2 className="h2" style={{ marginTop: 10 }}>
              Tell us who you need —<br />
              <span style={{ color: "var(--teal-2)" }}>we'll find them.</span>
            </h2>
            <p className="lead" style={{ marginTop: 14, maxWidth: "50ch", margin: "14px auto 0" }}>
              Share your requirements and our team will get back to you promptly with a
              sourcing plan tailored to your needs.
            </p>
            <div className="sf-cta-btns">
              <Link className="btn btn--primary" to="/contact">Submit a requirement →</Link>
              <Link className="btn btn--ghost" to="/about">About Innovise IT</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}