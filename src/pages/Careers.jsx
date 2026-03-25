import { Link } from "react-router-dom";

const roles = [
  { title: "Data Engineer", type: "Full-time", location: "Remote / Hybrid" },
  { title: "BI Analyst", type: "Full-time", location: "Richmond, VA" },
  { title: "Solutions Architect", type: "Contract", location: "Remote" },
];

const values = [
  { title: "Respectful collaboration", desc: "Clear communication, no ego, and shared ownership." },
  { title: "Quality over rush", desc: "We ship, review, and document — sustainably." },
  { title: "Growth mindset", desc: "We invest in learning and steady improvement." },
];

export default function Careers() {
  return (
    <div>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "center" }}>
          <div>
            <div className="kicker">Careers</div>
            <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3rem)", marginTop: 10 }}>
              Join a team that delivers with care.
            </h1>
            <p className="lead" style={{ marginTop: 14, maxWidth: "70ch" }}>
              Small, focused teams. Calm process. High standards.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
              <Link className="btn btn--primary" to="/contact">Send your profile</Link>
              <Link className="btn btn--ghost" to="/about">How we work</Link>
            </div>
          </div>

          <div className="card card__p">
            <div className="kicker">Infographic</div>
            <div className="h2" style={{ fontSize: 18, marginTop: 10 }}>What we optimize for</div>
            <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
              {[
                ["Clarity", 9],
                ["Ownership", 8],
                ["Learning", 8],
                ["Balance", 7],
              ].map(([l, v]) => (
                <div key={l} style={{ display: "grid", gridTemplateColumns: "96px 1fr 30px", gap: 10, alignItems: "center" }}>
                  <div style={{ fontWeight: 800 }}>{l}</div>
                  <div style={{ height: 8, borderRadius: 999, background: "rgba(13,148,136,0.12)", overflow: "hidden" }}>
                    <div style={{ width: `${v * 10}%`, height: "100%", background: "linear-gradient(90deg,var(--teal),var(--teal-2))" }} />
                  </div>
                  <div style={{ fontWeight: 900, color: "var(--muted-2)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="kicker">Culture</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
            What it feels like to work here
          </h2>
          <div className="grid grid-3" style={{ marginTop: 18 }}>
            {values.map((v) => (
              <div key={v.title} className="card card__p">
                <div className="h2" style={{ fontSize: 18 }}>{v.title}</div>
                <p className="lead" style={{ marginTop: 10, fontSize: 14 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="kicker">Open roles</div>
          <h2 className="h2" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)", marginTop: 8 }}>
            Current opportunities
          </h2>
          <div className="grid grid-2" style={{ marginTop: 18 }}>
            {roles.map((r) => (
              <div key={r.title} className="card card__p">
                <div className="h2" style={{ fontSize: 18 }}>{r.title}</div>
                <div className="lead" style={{ fontSize: 14, marginTop: 8 }}>{r.type} · {r.location}</div>
                <div style={{ marginTop: 14 }}>
                  <Link to="/contact" className="btn btn--primary">Apply</Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <div className="lead">Don’t see your role? Send your profile anyway.</div>
          </div>
        </div>
      </section>
    </div>
  );
}