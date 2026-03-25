import { Link } from "react-router-dom";

const points = [
  { title: "Trust & confidentiality", desc: "We treat security, privacy, and access as first-class requirements." },
  { title: "Clarity & accountability", desc: "Clear ownership, clear milestones, and visible progress." },
  { title: "Cultural alignment", desc: "We adapt to how your team works — not the other way around." },
];

const timeline = [
  ["Discovery", "Understand domain realities, success metrics, and constraints."],
  ["Design", "Define the simplest architecture that fits the goal."],
  ["Deliver", "Ship in increments with reviews and measurable outcomes."],
  ["Handover", "Documentation, knowledge transfer, and operational readiness."],
];

export default function About() {
  return (
    <div>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <div className="kicker">About</div>
            <h1 className="h1" style={{ fontSize: "clamp(2.2rem, 4.4vw, 3.1rem)", marginTop: 10 }}>
              A calm partner for high-stakes delivery.
            </h1>
            <p className="lead" style={{ marginTop: 14 }}>
              We focus on disciplined execution and respectful collaboration — especially when teams, customers, and constraints vary.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <Link className="btn btn--primary" to="/contact">Talk to us</Link>
              <Link className="btn btn--ghost" to="/services">See services</Link>
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div className="kicker">Infographic</div>
            <div style={{ marginTop: 14 }}>
              <svg viewBox="0 0 520 220" width="100%" height="auto" role="img" aria-label="Trust process diagram">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="var(--teal)" />
                    <stop offset="1" stopColor="var(--teal-2)" />
                  </linearGradient>
                </defs>
                <rect x="10" y="10" width="500" height="200" rx="18" fill="rgba(255,255,255,0.7)" stroke="rgba(15,23,42,0.10)" />
                {["Trust", "Clarity", "Quality"].map((t, i) => (
                  <g key={t} transform={`translate(${40 + i * 160}, 54)`}>
                    <circle cx="40" cy="40" r="34" fill="url(#g)" opacity="0.14" />
                    <circle cx="40" cy="40" r="18" fill="url(#g)" />
                    <text x="40" y="92" textAnchor="middle" fontFamily="var(--font-body)" fontWeight="700" fontSize="14" fill="var(--text)">{t}</text>
                  </g>
                ))}
                <path d="M120 94H200" stroke="rgba(13,148,136,0.35)" strokeWidth="4" strokeLinecap="round" />
                <path d="M280 94H360" stroke="rgba(13,148,136,0.35)" strokeWidth="4" strokeLinecap="round" />
                <text x="260" y="170" textAnchor="middle" fontFamily="var(--font-body)" fontSize="13" fill="var(--muted-2)">
                  Outcomes over output. Collaboration over friction.
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker">Principles</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
            What clients should expect
          </h2>
          <div className="grid grid-3" style={{ marginTop: 18 }}>
            {points.map((p) => (
              <div key={p.title} className="card card__p">
                <div className="h2" style={{ fontSize: 18 }}>{p.title}</div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">How we work</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
            A simple engagement flow
          </h2>
          <div className="grid grid-2" style={{ marginTop: 18 }}>
            {timeline.map(([t, d], i) => (
              <div key={t} className="card card__p">
                <div className="kicker">Step {String(i + 1).padStart(2, "0")}</div>
                <div className="h2" style={{ fontSize: 18, marginTop: 8 }}>{t}</div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}