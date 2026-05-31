import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { supabase } from "../lib/supabase";

const topics = ["Data & Analytics", "Web & App Development", "AI Solutions", "Cloud & Modernization", "Other"];

const details = [
  { label: "Location", value: "Suite 473, 7950 Legacy Drive, Plano, TX" },
  { label: "Phone",    value: "(804) 877-2171" },
  { label: "Email",    value: "contact@iniondata.com" },
  { label: "Hours",    value: "Mon–Fri, 9am–6pm EST" },
];

const pageStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
  :root {
    --bg:#07100e; 
    --surface:rgba(255,255,255,0.03); 
    --surface-2:rgba(255,255,255,0.06); 
    --text:#dff0e8; 
    --muted:#7a9e8e; 
    --border:rgba(255,255,255,0.08); 
    --border-2:rgba(255,255,255,0.15);
    --teal:#14b8a6; 
    --teal-2:#2dd4bf; 
    --accent:#22c55e;
    --grad-brand:linear-gradient(135deg,var(--teal),var(--accent));
    --shadow-soft:0 8px 32px rgba(0,0,0,0.30);
    --radius:16px; 
    --radius-sm:10px;
    --ease:cubic-bezier(0.22,1,0.36,1); 
    --dur:0.25s;
  }

  *,*::before,*::after{box-sizing:border-box}
  body{margin:0;font-family:'Inter',system-ui,sans-serif;font-size:15px;line-height:1.6;color:var(--text);background:var(--bg);overflow-x:hidden}
  
  body::before{
    content:'';position:fixed;inset:0;
    background:
      radial-gradient(ellipse 800px 500px at 20% -10%,rgba(20,184,166,0.12),transparent 70%),
      radial-gradient(ellipse 600px 400px at 80% 110%,rgba(34,197,94,0.08),transparent 70%);
    pointer-events:none;z-index:0
  }

  a{color:inherit;text-decoration:none}
  button{font:inherit;cursor:pointer}
  
  .container{width:100%;max-width:1400px;margin:0 auto;padding:0 clamp(16px,5vw,60px);position:relative;z-index:1}
  .section{padding:clamp(48px,8vw,120px) 0}

  .h1{font-weight:800;font-size:clamp(28px,3.8vw,52px);line-height:1.05;letter-spacing:-0.03em;margin:0}
  .h2{font-weight:700;font-size:clamp(20px,2.8vw,32px);line-height:1.15;letter-spacing:-0.02em;margin:0}
  .lead{font-size:clamp(14px,1.6vw,18px);font-weight:300;color:var(--muted);line-height:1.7}

  .kicker{
    display:inline-flex;align-items:center;gap:8px;padding:4px 12px;font-size:11px;font-weight:700;
    letter-spacing:0.14em;text-transform:uppercase;color:var(--text);
    border:1px solid rgba(255,255,255,0.15);border-radius:4px;
  }
  .kicker::before{content:'';width:6px;height:6px;background:var(--teal);border-radius:50%;flex-shrink:0}

  .btn{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    padding:12px 24px;border-radius:8px;font-weight:600;font-size:14px;
    transition:all var(--dur) var(--ease);border:1px solid transparent;
    white-space:nowrap;
  }
  .btn--primary{background:var(--teal);color:#000}
  .btn--primary:hover{background:var(--teal-2);transform:translateY(-2px);box-shadow:0 6px 20px rgba(20,184,166,0.25)}
  .btn--primary:disabled{opacity:0.6;cursor:not-allowed;transform:none}
  .btn--ghost{background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:var(--text)}
  .btn--ghost:hover{background:rgba(255,255,255,0.1);transform:translateY(-2px)}
  .btn--full{width:100%}

  .card{
    background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);
    padding:clamp(20px,4vw,40px);backdrop-filter:blur(20px);
    transition:transform var(--dur), border-color var(--dur), box-shadow var(--dur);
  }
  .card:hover{border-color:rgba(20,184,166,0.3);box-shadow:var(--shadow-soft)}

  .input-group{display:grid;gap:8px;margin-bottom:20px}
  .input-label{font-size:13px;font-weight:600;color:var(--text)}
  .input{
    width:100%;padding:12px 14px;background:rgba(0,0,0,0.2);border:1px solid var(--border);
    border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:15px;
    transition:all 0.2s;
  }
  .input:focus{outline:none;border-color:var(--teal);background:rgba(20,184,166,0.05);box-shadow:0 0 0 4px rgba(20,184,166,0.1)}
  .input::placeholder{color:rgba(255,255,255,0.3)}

  /* 2-col on tablet+, 1-col on mobile */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:0 20px}
  @media(max-width:520px){.grid-2{grid-template-columns:1fr}}

  /* Main layout: form | sidebar */
  .contact-layout{
    display:grid;
    grid-template-columns:1.4fr 1fr;
    gap:clamp(24px,5vw,80px);
    align-items:start;
  }
  @media(max-width:900px){.contact-layout{grid-template-columns:1fr}}

  /* Info rows — wrap value on tiny screens */
  .info-row{
    display:flex;flex-wrap:wrap;justify-content:space-between;gap:4px 12px;
    padding:14px 0;border-bottom:1px solid var(--border);
  }
  .info-row:last-child{border-bottom:none;padding-bottom:0}
  .info-row__label{font-weight:600;color:var(--muted);flex-shrink:0;font-size:13px}
  .info-row__value{color:var(--text);font-size:13px;text-align:right;word-break:break-word;max-width:100%}
  @media(max-width:420px){
    .info-row{flex-direction:column}
    .info-row__value{text-align:left}
  }

  .map-container{
    width:100%;aspect-ratio:16/10;border-radius:var(--radius-sm);overflow:hidden;
    margin-top:20px;border:1px solid var(--border);
  }
  .map-container iframe{width:100%;height:100%;display:block;}

  .step-list{display:grid;gap:16px;margin-top:20px}
  .step-item{display:flex;gap:14px;align-items:flex-start}
  .step-num{
    width:28px;height:28px;border-radius:50%;background:rgba(20,184,166,0.1);
    color:var(--teal);display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;flex-shrink:0;border:1px solid rgba(20,184,166,0.2)
  }

  .cta-box{
    background:linear-gradient(135deg,rgba(20,184,166,0.15),rgba(34,197,94,0.05));
    border:1px solid rgba(20,184,166,0.2);border-radius:var(--radius);
    padding:clamp(28px,5vw,56px) clamp(20px,4vw,56px);text-align:center;
  }
  .cta-box__btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}

  @keyframes kenBurns{from{transform:scale(1) translateX(0)}to{transform:scale(1.06) translateX(-10px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate;will-change:transform}

  .contact-hero-img{
    position:relative;border-radius:var(--radius);overflow:hidden;
    margin-top:40px;
    aspect-ratio:21/6;
    border:1px solid var(--border);box-shadow:0 16px 48px rgba(0,0,0,0.14)
  }
  @media(max-width:700px){.contact-hero-img{aspect-ratio:16/7}}
  @media(max-width:480px){.contact-hero-img{aspect-ratio:4/3;margin-top:28px}}

  .contact-hero-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(0.75) brightness(0.82)}
  .contact-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,184,166,0.4) 0%,transparent 70%);pointer-events:none}
  .contact-hero-img-label{
    position:absolute;left:clamp(16px,4vw,32px);bottom:clamp(14px,3vw,24px);
    color:#fff;font-size:clamp(12px,1.4vw,15px);font-weight:700;
    letter-spacing:0.02em;text-shadow:0 2px 10px rgba(0,0,0,0.4)
  }

  /* Hero text center on all screens */
  .hero-text{max-width:800px;margin:0 auto}

  /* Success state */
  .success-inner{text-align:center;padding:clamp(32px,6vw,60px) 20px}
  .success-icon{
    width:64px;height:64px;background:rgba(20,184,166,0.15);border-radius:50%;
    display:flex;align-items:center;justify-content:center;margin:0 auto 24px
  }

  /* Error message */
  .form-error{color:#ef4444;font-size:13px;margin-top:4px;margin-bottom:12px;font-weight:500}
`;

export default function Contact() {
  useReveal();
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: form
      });

      if (error) throw new Error(error.message || "Failed to send email");

      setSubmitted(true);
    } catch (err) {
      console.error("Supabase Edge Function Error:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section" style={{ paddingBottom: "40px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="ha ha-1" style={{ marginBottom: 16 }}>
            <span className="kicker">Contact Us</span>
          </div>
          <div className="hero-text">
            <h1 className="h1 ha ha-2">
              Let's build something <span style={{ color: "var(--teal)" }}>great</span> together.
            </h1>
            <p className="lead ha ha-3" style={{ maxWidth: "600px", margin: "16px auto 0" }}>
              Whether you need a custom application, data pipeline, or an AI agent, we're here to help you move fast and scale.
            </p>
          </div>

          <div className="contact-hero-img ha ha-4">
            <img
              className="ken-burns"
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&auto=format&fit=crop&q=80"
              alt="Modern office space"
              loading="lazy"
            />
            <div className="contact-hero-img-overlay" />
            <div className="contact-hero-img-label">We reply within 24–48 hours — no fluff.</div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT AREA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-layout">

          {/* LEFT: FORM */}
          <div className="card rv">
            {!submitted ? (
              <form onSubmit={handleSubmit} ref={formRef}>
                <h2 className="h2" style={{ marginBottom: "28px" }}>Send us a message</h2>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Name</label>
                    <input
                      name="name" required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="input" placeholder="Jane Doe"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input
                      name="email" required type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="input" placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Company (Optional)</label>
                    <input
                      name="company" value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="input" placeholder="Acme Corp"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Topic</label>
                    <select
                      name="topic" required value={form.topic}
                      onChange={e => setForm({ ...form, topic: e.target.value })}
                      className="input" style={{ appearance: "none" }}
                    >
                      <option value="" disabled>Select an area...</option>
                      {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Project Details</label>
                  <textarea
                    name="message" required value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="input"
                    placeholder="Tell us about your goals, timeline, or current challenges..."
                    rows={5}
                    style={{ resize: "vertical" }}
                  />
                </div>

                {error && <div className="form-error">{error}</div>}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn--primary btn--full"
                  style={{ marginTop: 8 }}
                >
                  {loading ? "Sending…" : "Submit Inquiry"}
                </button>
              </form>
            ) : (
              <div className="success-inner">
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="h2">Message Received!</h2>
                <p className="lead" style={{ margin: "16px auto 32px", maxWidth: "36ch" }}>
                  Thanks for reaching out, {form.name.split(" ")[0]}. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", topic: "", message: "" }); }}
                  className="btn btn--ghost"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: INFO & MAP */}
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            <div className="card" style={{ padding: "clamp(18px,3vw,32px)" }}>
              <h3 className="h2" style={{ fontSize: "clamp(17px,2vw,20px)", marginBottom: "12px" }}>Contact Info</h3>
              <div>
                {details.map(d => (
                  <div key={d.label} className="info-row">
                    <span className="info-row__label">{d.label}</span>
                    <span className="info-row__value">{d.value}</span>
                  </div>
                ))}
              </div>

              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.4783195891433!2d-96.82310572357!3d33.07313687341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c3c633c16b9b9%3A0x2f7d88eb8e0f2b63!2s7950%20Legacy%20Dr%2C%20Plano%2C%20TX%2075024!5e0!3m2!1sen!2sus!4v1714081044321!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>

            <div className="card" style={{ padding: "clamp(18px,3vw,32px)" }}>
              <h3 className="h2" style={{ fontSize: "clamp(17px,2vw,20px)" }}>What happens next?</h3>
              <div className="step-list">
                {[
                  { n: "1", title: "Review",         desc: "We'll carefully review your requirements and assess if we're the right fit." },
                  { n: "2", title: "Discovery Call", desc: "A quick 30-minute chat to discuss scope, timeline, and technical feasibility." },
                  { n: "3", title: "Proposal",       desc: "We'll provide a transparent plan and estimate for your project." },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="step-item">
                    <div className="step-num">{n}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>{title}</div>
                      <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rv">
          <div className="cta-box">
            <h2 className="h2" style={{ marginBottom: "16px" }}>Not sure what you need yet?</h2>
            <p className="lead" style={{ maxWidth: "500px", margin: "0 auto 32px" }}>
              Explore our services to see how we've helped other startups and enterprises scale their technology.
            </p>
            <div className="cta-box__btns">
              <Link className="btn btn--primary" style={{ color: "#000" }} to="/services">Explore Services</Link>
              <Link className="btn btn--ghost" to="/about">Learn about us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}