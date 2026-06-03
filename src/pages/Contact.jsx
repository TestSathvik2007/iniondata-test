import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../animations";
import { supabase } from "../lib/supabase";

const topics = ["Data & Analytics", "Web & App Development", "AI Solutions", "Cloud & Modernization", "Other"];

const details = [
  { label: "Location", value: "7950 Legacy Dr, Suite 473, Plano, TX 75024" },
  { label: "Phone",    value: "(424) 425-6499" },
  { label: "Email",    value: "contact@iniondata.com" },
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
  
  .container{width:100%;max-width:1600px;margin:0 auto;padding:0 clamp(16px,5vw,60px);position:relative;z-index:1}
  .section{padding:clamp(48px,8vw,120px) 0}

  .h1{font-weight:800;font-size:clamp(28px,5vw,64px);line-height:1.05;letter-spacing:-0.03em;margin:0}
  .h2{font-weight:700;font-size:clamp(20px,3vw,32px);line-height:1.15;letter-spacing:-0.02em;margin:0}
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
    transition:all var(--dur) var(--ease);border:1px solid transparent;white-space:nowrap;
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
    width:100%;padding:14px 16px;background:rgba(0,0,0,0.2);border:1px solid var(--border);
    border-radius:var(--radius-sm);color:var(--text);font-family:inherit;font-size:15px;
    transition:all 0.2s;
  }
  .input:focus{outline:none;border-color:var(--teal);background:rgba(20,184,166,0.05);box-shadow:0 0 0 4px rgba(20,184,166,0.1)}
  .input::placeholder{color:rgba(255,255,255,0.3)}

  /* 2-col grid → 1-col on small mobile */
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px}
  @media(max-width:520px){.grid-2{grid-template-columns:1fr;gap:0}}

  /* Main two-column layout */
  .contact-layout{
    display:grid;
    grid-template-columns:1.4fr 1fr;
    gap:clamp(28px,6vw,80px);
    align-items:start;
  }
  @media(max-width:900px){.contact-layout{grid-template-columns:1fr}}

  /* Info rows — label left, value right, wraps gracefully */
  .info-row{
    display:flex;justify-content:space-between;align-items:flex-start;
    gap:12px;padding:14px 0;border-bottom:1px solid var(--border);
  }
  .info-row:last-child{border-bottom:none;padding-bottom:0}
  .info-label{font-weight:600;color:var(--muted);white-space:nowrap;flex-shrink:0}
  .info-value{color:var(--text);text-align:right;word-break:break-word;max-width:65%}

  /* Map */
  .map-container{
    width:100%;aspect-ratio:16/10;border-radius:var(--radius-sm);overflow:hidden;
    margin-top:24px;border:1px solid var(--border);
  }
  .map-container iframe{width:100%;height:100%;display:block}

  /* Steps */
  .step-list{display:grid;gap:16px;margin-top:20px}
  .step-item{display:flex;gap:16px;align-items:flex-start}
  .step-num{
    width:28px;height:28px;border-radius:50%;background:rgba(20,184,166,0.1);
    color:var(--teal);display:flex;align-items:center;justify-content:center;
    font-size:12px;font-weight:700;flex-shrink:0;border:1px solid rgba(20,184,166,0.2)
  }

  /* CTA */
  .cta-box{
    background:linear-gradient(135deg,rgba(20,184,166,0.15),rgba(34,197,94,0.05));
    border:1px solid rgba(20,184,166,0.2);border-radius:var(--radius);
    padding:clamp(28px,5vw,56px);text-align:center;
  }
  .cta-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  @media(max-width:400px){.cta-btns .btn{width:100%}}

  /* Hero image */
  @keyframes kenBurns{from{transform:scale(1) translateX(0)}to{transform:scale(1.06) translateX(-10px)}}
  .ken-burns{animation:kenBurns 9s ease-in-out infinite alternate;will-change:transform}

  .contact-hero-img{
    position:relative;border-radius:var(--radius);overflow:hidden;
    margin-top:clamp(24px,5vw,48px);aspect-ratio:21/6;
    border:1px solid var(--border);box-shadow:0 16px 48px rgba(0,0,0,0.14);
  }
  @media(max-width:600px){.contact-hero-img{aspect-ratio:16/7}}
  .contact-hero-img img{width:100%;height:100%;object-fit:cover;display:block;filter:saturate(0.75) brightness(0.82)}
  .contact-hero-img-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(20,184,166,0.4) 0%,transparent 70%);pointer-events:none}
  .contact-hero-img-label{
    position:absolute;left:clamp(16px,4vw,32px);bottom:clamp(12px,2.5vw,24px);
    color:#fff;font-size:clamp(11px,1.4vw,15px);font-weight:700;
    letter-spacing:0.02em;text-shadow:0 2px 10px rgba(0,0,0,0.4);
  }

  /* Success */
  .success-wrap{text-align:center;padding:clamp(32px,6vw,60px) 20px}
  .success-icon{
    width:64px;height:64px;background:rgba(20,184,166,0.15);border-radius:50%;
    display:flex;align-items:center;justify-content:center;margin:0 auto 24px;
  }

  /* Error */
  .form-error{color:#ef4444;font-size:13px;font-weight:500;margin-bottom:12px}
`;

export default function Contact() {
  useReveal();
  const formRef = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", topic: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { error: fnErr } = await supabase.functions.invoke("send-email", { body: form });
      if (fnErr) throw new Error(fnErr.message || "Failed to send email");
      setSubmitted(true);
    } catch (err) {
      console.error("Supabase Edge Function Error:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({ name: "", email: "", company: "", topic: "", message: "" });
  };

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* HERO */}
      <section className="section" style={{ paddingBottom: "40px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div className="ha ha-1" style={{ marginBottom: 16 }}>
            <span className="kicker">Contact Us</span>
          </div>
          <h1 className="h1 ha ha-2" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Let's build something <span style={{ color: "var(--teal)" }}>great</span> together.
          </h1>
          <p className="lead ha ha-3" style={{ maxWidth: "600px", margin: "20px auto 0" }}>
            Whether you need a custom application, data pipeline, or an AI agent, we're here to help you move fast and scale.
          </p>
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

      {/* MAIN */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-layout">

          {/* FORM */}
          <div className="card rv">
            {!submitted ? (
              <form onSubmit={handleSubmit} ref={formRef}>
                <h2 className="h2" style={{ marginBottom: "32px" }}>Send us a message</h2>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Name</label>
                    <input name="name" required value={form.name} onChange={set("name")} className="input" placeholder="Jane Doe" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Email</label>
                    <input name="email" required type="email" value={form.email} onChange={set("email")} className="input" placeholder="jane@company.com" />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="input-group">
                    <label className="input-label">Company (Optional)</label>
                    <input name="company" value={form.company} onChange={set("company")} className="input" placeholder="Acme Corp" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Topic</label>
                    <select name="topic" required value={form.topic} onChange={set("topic")} className="input" style={{ appearance: "none" }}>
                      <option value="" disabled>Select an area of interest...</option>
                      {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Project Details</label>
                  <textarea
                    name="message" required
                    value={form.message} onChange={set("message")}
                    className="input"
                    placeholder="Tell us about your goals, timeline, or current challenges..."
                    rows={5} style={{ resize: "vertical" }}
                  />
                </div>

                {error && <p className="form-error">{error}</p>}

                <button type="submit" disabled={loading} className="btn btn--primary btn--full" style={{ marginTop: 12 }}>
                  {loading ? "Sending…" : "Submit Inquiry"}
                </button>
              </form>
            ) : (
              <div className="success-wrap">
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h2 className="h2">Message Received!</h2>
                <p className="lead" style={{ margin: "16px auto 32px" }}>
                  Thanks for reaching out, {form.name.split(" ")[0]}. We'll get back to you within 24 hours.
                </p>
                <button onClick={resetForm} className="btn btn--ghost">Send another message</button>
              </div>
            )}
          </div>

          {/* INFO + MAP */}
          <div className="rv" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

            <div className="card" style={{ padding: "clamp(20px,3vw,32px)" }}>
              <h3 className="h2" style={{ fontSize: "20px", marginBottom: "16px" }}>Contact Info</h3>
              <div>
                {details.map((d) => (
                  <div key={d.label} className="info-row">
                    <span className="info-label">{d.label}</span>
                    <span className="info-value">{d.value}</span>
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

            <div className="card" style={{ padding: "clamp(20px,3vw,32px)" }}>
              <h3 className="h2" style={{ fontSize: "20px" }}>What happens next?</h3>
              <div className="step-list">
                {[
                  { title: "Review", desc: "We'll carefully review your requirements and assess if we're the right fit." },
                  { title: "Discovery Call", desc: "A quick 30-minute chat to discuss scope, timeline, and technical feasibility." },
                  { title: "Proposal", desc: "We'll provide a transparent plan and estimate for your project." },
                ].map((s, i) => (
                  <div key={s.title} className="step-item">
                    <div className="step-num">{i + 1}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>{s.title}</div>
                      <div style={{ fontSize: "14px", color: "var(--muted)", lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container rv">
          <div className="cta-box">
            <h2 className="h2" style={{ marginBottom: "16px" }}>Not sure what you need yet?</h2>
            <p className="lead" style={{ maxWidth: "500px", margin: "0 auto 32px" }}>
              Explore our services to see how we've helped other startups and enterprises scale their technology.
            </p>
            <div className="cta-btns">
              <Link className="btn btn--primary" style={{ color: "#000" }} to="/services">Explore Services</Link>
              <Link className="btn btn--ghost" to="/about">Learn about us</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}