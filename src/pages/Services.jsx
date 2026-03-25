import { Link } from "react-router-dom";

const offerings = [
  {
    title: "Data & Analytics",
    desc: "Dashboards, pipelines, and metrics your teams can trust.",
    bullets: ["BI & dashboards", "Data pipelines", "Data quality checks", "Governance-friendly delivery"],
  },
  {
    title: "Cloud & Modernization",
    desc: "Secure infrastructure and pragmatic modernization.",
    bullets: ["Migration planning", "Cost optimization", "Security baselines", "Observability setup"],
  },
  {
    title: "Engineering Delivery",
    desc: "Product-focused teams that ship, review, and document.",
    bullets: ["Feature delivery", "API integrations", "Performance tuning", "Handover & docs"],
  },
  {
    title: "Staffing & Augmentation",
    desc: "Vetted talent aligned to your culture and timelines.",
    bullets: ["Screening & vetting", "Culture-fit alignment", "Contract or full-time", "Fast onboarding"],
  },
];

export default function Services() {
  return (
    <div>
      <section className="section">
        <div className="container">
          <div className="kicker">Services</div>
          <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3rem)", marginTop: 10 }}>
            Simple offerings. Real outcomes.
          </h1>
          <p className="lead" style={{ marginTop: 14, maxWidth: "70ch" }}>
            We keep scope tight, communication clear, and delivery measurable — so the work fits your customers and your operating reality.
          </p>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container grid grid-2" style={{ alignItems: "start" }}>
          <div className="card card__p">
            <div className="kicker">Infographic</div>
            <div className="h2" style={{ fontSize: 18, marginTop: 10 }}>Engagement health</div>
            <p className="lead" style={{ marginTop: 8, fontSize: 14 }}>
              We aim for predictable delivery and clear ownership.
            </p>
            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              {[
                ["Clarity", 92],
                ["Quality", 88],
                ["Security", 90],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "grid", gridTemplateColumns: "90px 1fr 48px", gap: 10, alignItems: "center" }}>
                  <div style={{ fontWeight: 800, color: "var(--text)" }}>{l}</div>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(13,148,136,0.12)", overflow: "hidden" }}>
                    <div style={{ width: `${v}%`, height: "100%", background: "linear-gradient(90deg,var(--teal),var(--teal-2))" }} />
                  </div>
                  <div style={{ fontWeight: 800, color: "var(--muted-2)" }}>{v}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card card__p">
            <div className="kicker">What you get</div>
            <div className="grid grid-2" style={{ marginTop: 12 }}>
              {[
                ["Clear plan", "Scope, timeline, and success metrics."],
                ["Visible progress", "Weekly check-ins and artifacts."],
                ["Clean handover", "Docs + knowledge transfer."],
                ["Confidentiality", "NDA-ready and least access."],
              ].map(([t, d]) => (
                <div key={t} className="card" style={{ padding: 14, borderRadius: 14 }}>
                  <div style={{ fontWeight: 900 }}>{t}</div>
                  <div className="lead" style={{ fontSize: 13, marginTop: 6 }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <Link to="/contact" className="btn btn--primary btn--full">Request a quick call</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Offerings</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
            Choose what you need
          </h2>
          <div className="grid grid-2" style={{ marginTop: 18 }}>
            {offerings.map((o) => (
              <div key={o.title} className="card card__p">
                <div className="h2" style={{ fontSize: 18 }}>{o.title}</div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{o.desc}</p>
                <ul style={{ margin: "14px 0 0", paddingLeft: 18, color: "var(--muted)" }}>
                  {o.bullets.map((b) => <li key={b} style={{ margin: "8px 0" }}>{b}</li>)}
                </ul>
                <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Link className="btn" to="/contact">Enquire</Link>
                  <Link className="btn btn--ghost" to="/about">How we work</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}