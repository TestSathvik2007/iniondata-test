import { useState } from "react";

const topics = ["Data & Analytics", "Cloud & Modernization", "Engineering Delivery", "Staffing", "Other"];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });

  return (
    <div>
      <section className="section">
        <div className="container grid grid-2" style={{ alignItems: "start" }}>
          <div>
            <div className="kicker">Contact</div>
            <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 4.2vw, 3rem)", marginTop: 10 }}>
              Let’s start with a clear brief.
            </h1>
            <p className="lead" style={{ marginTop: 14 }}>
              Share what you’re trying to achieve. We’ll reply with next steps and a short set of options.
            </p>

            <div className="card card__p" style={{ marginTop: 18 }}>
              <div className="kicker">Details</div>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                {[
                  ["Location", "Richmond, VA"],
                  ["Phone", "(804) 877-2171"],
                  ["Email", "hello@iniondata.com"],
                  ["Hours", "Mon–Fri, 9am–6pm"],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 12, borderBottom: "1px solid rgba(15,23,42,0.06)", paddingBottom: 10 }}>
                    <div style={{ fontWeight: 900 }}>{k}</div>
                    <div className="lead" style={{ fontSize: 14 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ marginTop: 18, padding: 16, borderRadius: 14 }}>
              <div className="kicker">Infographic</div>
              <div className="lead" style={{ fontSize: 14, marginTop: 10 }}>Expected response flow</div>
              <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                {[
                  ["Reply", "24–48h"],
                  ["Call", "30 min"],
                  ["Plan", "1–2 options"],
                ].map(([l, v]) => (
                  <div key={l} style={{ display: "grid", gridTemplateColumns: "90px 1fr", gap: 10, alignItems: "center" }}>
                    <div style={{ fontWeight: 900 }}>{l}</div>
                    <div style={{ height: 8, borderRadius: 999, background: "rgba(13,148,136,0.12)", position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", inset: 0, width: l === "Reply" ? "80%" : l === "Call" ? "55%" : "70%", background: "linear-gradient(90deg,var(--teal),var(--teal-2))" }} />
                    </div>
                    <div className="lead" style={{ fontSize: 13, gridColumn: "2 / 3", marginTop: -6 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card card__p">
            <div className="kicker">Message</div>
            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                style={{ marginTop: 12, display: "grid", gap: 12 }}
              >
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13 }}>Name</span>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="input"
                    placeholder="Your name"
                  />
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13 }}>Email</span>
                  <input
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="input"
                    placeholder="you@company.com"
                    type="email"
                  />
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13 }}>Company (optional)</span>
                  <input
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="input"
                    placeholder="Company"
                  />
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13 }}>Topic</span>
                  <select
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="input"
                  >
                    <option value="">Select…</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 13 }}>Message</span>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="input"
                    placeholder="What are you trying to achieve?"
                    rows={6}
                    style={{ resize: "vertical" }}
                  />
                </label>

                <button type="submit" className="btn btn--primary btn--full">
                  Send message
                </button>
              </form>
            ) : (
              <div style={{ marginTop: 12 }}>
                <div className="h2" style={{ fontSize: 20 }}>Message received</div>
                <p className="lead" style={{ marginTop: 10 }}>
                  Thanks — we’ll reply within 24–48 hours with next steps.
                </p>
                <div style={{ marginTop: 14 }}>
                  <button className="btn" onClick={() => setSubmitted(false)}>Send another</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}