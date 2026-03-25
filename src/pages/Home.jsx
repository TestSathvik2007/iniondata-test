import { Link } from "react-router-dom";

const trust = [
  { title: "Confidential by default", desc: "NDA-ready engagements, least-privilege access, and clean handoffs." },
  { title: "Clear delivery", desc: "Milestones, weekly updates, and measurable outcomes — no surprises." },
  { title: "Culture-aligned teams", desc: "We adapt to your working style, time zones, and communication norms." },
];

const services = [
  { title: "Data & Analytics", desc: "Dashboards, pipelines, and decision-ready metrics." },
  { title: "Cloud & Modernization", desc: "Migration, optimization, and secure infrastructure." },
  { title: "Engineering Delivery", desc: "Product-focused teams that ship with quality." },
  { title: "Staffing & Augmentation", desc: "Vetted talent aligned to your team and timeline." },
];

export default function Home() {
  return (
    <div>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <div className="kicker">Trust-first partner</div>
            <h1 className="h1" style={{ fontSize: "clamp(2.6rem, 5vw, 3.6rem)", marginTop: 10 }}>
              Clean delivery for data, cloud, and engineering.
            </h1>
            <p className="lead" style={{ marginTop: 14, maxWidth: 52 * 10 }}>
              A simple, reliable approach that respects your customers, your culture, and your timelines.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
              <Link className="btn btn--primary" to="/contact">Get in touch</Link>
              <Link className="btn btn--ghost" to="/services">View services</Link>
            </div>

            <div className="grid grid-3" style={{ marginTop: 22 }}>
              {[
                ["24–48h", "First response"],
                ["Weekly", "Delivery updates"],
                ["NDA", "Ready"],
              ].map(([a, b]) => (
                <div key={a} className="card card__p">
                  <div className="h2" style={{ fontSize: 20 }}>{a}</div>
                  <div className="lead" style={{ fontSize: 14 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 22 }}>
            <div className="kicker">Snapshot</div>
            <div className="grid" style={{ gap: 14, marginTop: 12 }}>
              <div className="card" style={{ padding: 16, borderRadius: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div className="h2" style={{ fontSize: 18 }}>Delivery health</div>
                    <div className="lead" style={{ fontSize: 13 }}>On-time / on-budget trend</div>
                  </div>
                  <svg width="96" height="36" viewBox="0 0 96 36" fill="none" aria-hidden="true">
                    <path d="M4 28 C 18 20, 28 24, 40 16 C 52 8, 62 14, 74 10 C 82 7, 88 10, 92 8" stroke="var(--teal)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M4 30H92" stroke="rgba(15,23,42,0.10)" strokeWidth="1" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-2">
                <div className="card card__p">
                  <div className="kicker">Quality</div>
                  <div className="h2" style={{ fontSize: 22, marginTop: 6 }}>Review-led</div>
                  <div className="lead" style={{ fontSize: 13, marginTop: 4 }}>PR checks + handover docs</div>
                </div>
                <div className="card card__p">
                  <div className="kicker">Security</div>
                  <div className="h2" style={{ fontSize: 22, marginTop: 6 }}>Least access</div>
                  <div className="lead" style={{ fontSize: 13, marginTop: 4 }}>Tight scopes & auditability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker">Why teams trust us</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.4rem)", marginTop: 8 }}>Built for long-term partnerships</h2>
          <div className="grid grid-3" style={{ marginTop: 18 }}>
            {trust.map((t) => (
              <div key={t.title} className="card card__p">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="brand__mark" style={{ width: 34, height: 34, borderRadius: 12 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                      <path d="M9.2 12.2l1.9 1.9 3.7-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="h2" style={{ fontSize: 18 }}>{t.title}</div>
                </div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Services</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.4rem)", marginTop: 8 }}>Simple, focused offerings</h2>
          <div className="grid grid-4" style={{ marginTop: 18 }}>
            {services.map((s) => (
              <div key={s.title} className="card card__p">
                <div className="h2" style={{ fontSize: 18 }}>{s.title}</div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{s.desc}</p>
                <div style={{ marginTop: 14 }}>
                  <Link to="/services" className="btn">Learn more</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container card" style={{ padding: 22 }}>
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <div className="kicker">Next step</div>
              <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
                Tell us what you’re building.
              </h2>
              <p className="lead" style={{ marginTop: 10 }}>
                We’ll respond with a clear plan, timeline, and a small set of options.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                <Link className="btn btn--primary" to="/contact">Contact</Link>
                <Link className="btn btn--ghost" to="/about">About us</Link>
              </div>
            </div>
            <div className="card" style={{ padding: 16, borderRadius: 14 }}>
              <div className="kicker">Infographic</div>
              <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
                {[
                  ["Discovery", 24],
                  ["Plan", 48],
                  ["Deliver", 72],
                ].map(([label, hours]) => (
                  <div key={label} style={{ display: "grid", gridTemplateColumns: "90px 1fr 50px", alignItems: "center", gap: 10 }}>
                    <div style={{ fontWeight: 800, color: "var(--text)" }}>{label}</div>
                    <div style={{ height: 8, borderRadius: 999, background: "rgba(13,148,136,0.12)", overflow: "hidden" }}>
                      <div style={{ width: `${Math.min(100, hours)}%`, height: "100%", background: "linear-gradient(90deg,var(--teal),var(--teal-2))" }} />
                    </div>
                    <div style={{ color: "var(--muted-2)", fontWeight: 700 }}>{hours}h</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}