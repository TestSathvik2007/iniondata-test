import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useReveal, ANIM_CSS } from "../animations";
import careersImg from "../assets/images/careers.jpg";

// ── STYLES ─────────────────────────────────────────────────────────────────

const pageStyles = `
  /* ── CAREERS HERO ── */
  .careers-hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .careers-hero-img-wrap {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    aspect-ratio: 4/3;
    box-shadow: 0 24px 64px rgba(0,0,0,.35);
  }
  .careers-hero-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .6s ease;
    filter: saturate(.9) brightness(.88);
  }
  .careers-hero-img-wrap:hover img { transform: scale(1.04); }
  .careers-hero-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(13,148,136,.18) 0%, rgba(0,0,0,.28) 100%);
    pointer-events: none;
  }
  .careers-hero-badge {
    position: absolute;
    bottom: 16px;
    left: 16px;
    background: rgba(255,255,255,.12);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,.2);
    border-radius: 12px;
    padding: 10px 16px;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .03em;
  }

  /* ── PERKS ── */
  .perks-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .perk-card {
    position: relative;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: border-color .25s, background .25s, transform .25s;
    overflow: hidden;
  }
  .perk-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(130deg, transparent 0%, rgba(20,184,166,.25) 50%, transparent 100%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity .45s ease;
    pointer-events: none;
  }
  .perk-card:hover {
    border-color: rgba(20,184,166,.28);
    background: rgba(255,255,255,.05);
    transform: translateY(-3px);
  }
  .perk-card:hover::before { opacity: 1; }
  .perk-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    background: rgba(20,184,166,0.10);
    border: 1px solid rgba(20,184,166,0.18);
    display: flex; align-items: center; justify-content: center;
    color: #2dd4bf;
    flex-shrink: 0;
  }
  .perk-title {
    font-size: 15px;
    font-weight: 700;
    color: var(--text, #dff0e8);
    letter-spacing: -0.01em;
    margin: 0;
  }
  .perk-desc {
    font-size: 13px;
    color: var(--muted, #7a9e8e);
    line-height: 1.6;
    margin: 0;
    font-weight: 300;
  }

  /* ── ROLES SECTION ── */
  .roles-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }
  .roles-count {
    font-size: 13px;
    color: var(--muted, #7a9e8e);
    font-weight: 500;
    padding-bottom: 4px;
  }

  .jobs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  /* ── JOB CARD ── */
  .job-card {
    position: relative;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: border-color .25s, background .25s, transform .25s, box-shadow .25s;
    overflow: hidden;
  }
  .job-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(130deg, transparent 0%, rgba(20,184,166,.25) 50%, transparent 100%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity .45s ease;
    pointer-events: none;
  }
  .job-card:hover {
    border-color: rgba(20,184,166,.28);
    background: rgba(255,255,255,.05);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0,0,0,.35);
  }
  .job-card:hover::before { opacity: 1; }

  .job-card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
  }
  .job-title {
    font-size: clamp(16px, 1.6vw, 20px);
    font-weight: 700;
    color: var(--text, #dff0e8);
    margin: 0;
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .job-type-pill {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 11px;
    border-radius: 999px;
    background: rgba(20,184,166,0.1);
    color: #14b8a6;
    border: 1px solid rgba(20,184,166,0.2);
    white-space: nowrap;
    flex-shrink: 0;
  }
  .job-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--muted, #7a9e8e);
    font-weight: 400;
  }
  .job-desc {
    font-size: 14px;
    color: var(--muted, #7a9e8e);
    line-height: 1.7;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin: 0;
    flex: 1;
    font-weight: 300;
  }
  .job-apply-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 22px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    white-space: nowrap;
    transition: all 0.15s ease;
    background: #085041;
    color: #9FE1CB;
    border-radius: 5px;
    border: 1.5px solid #085041;
    box-shadow: 4px 4px 0 #1D9E75;
    text-decoration: none;
    margin-top: auto;
    font-family: inherit;
  }
  .job-apply-btn:hover { box-shadow: 2px 2px 0 #1D9E75; transform: translate(2px, 2px); }
  .job-apply-btn:active { box-shadow: none; transform: translate(4px, 4px); }
  .job-apply-btn svg { transition: transform 0.2s; }
  .job-apply-btn:hover svg { transform: translateX(3px); }

  /* ── EMPTY STATE ── */
  .empty-roles {
    text-align: center;
    padding: 72px 24px;
    background: rgba(255,255,255,0.02);
    border-radius: 20px;
    border: 1px dashed rgba(255,255,255,0.08);
  }
  .empty-roles-title {
    font-size: clamp(18px, 2vw, 24px);
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text, #dff0e8);
    margin: 0 0 12px;
  }
  .empty-roles-desc {
    font-size: 15px;
    color: var(--muted, #7a9e8e);
    line-height: 1.7;
    max-width: 420px;
    margin: 0 auto 24px;
    font-weight: 300;
  }
  .empty-roles-desc a { color: #2dd4bf; text-decoration: none; }
  .empty-roles-desc a:hover { text-decoration: underline; }

  /* ── LOADING ── */
  .loading-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 80px 0;
  }
  .loading-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #14b8a6;
    animation: dotPulse 1.2s ease-in-out infinite;
  }
  .loading-dot:nth-child(2) { animation-delay: .2s; }
  .loading-dot:nth-child(3) { animation-delay: .4s; }
  @keyframes dotPulse {
    0%, 100% { opacity: .2; transform: scale(.75); }
    50%       { opacity: 1;  transform: scale(1);   }
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .careers-hero { grid-template-columns: 1fr; gap: 32px; }
    .careers-hero-img-wrap { aspect-ratio: 16/9; }
    .perks-row { grid-template-columns: 1fr 1fr; }
    .jobs-grid { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .perks-row { grid-template-columns: 1fr 1fr; gap: 10px; }
    .perk-card { padding: 18px 14px; }
    .job-card { padding: 22px 18px; }
    .roles-header { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 400px) {
    .perks-row { grid-template-columns: 1fr; }
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const PERKS = [
  {
    title: "Flexible Hours",
    desc: "Trust over timesheets. Ship great work, your way.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    title: "Remote-First",
    desc: "Distributed across India and beyond. Work from anywhere.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: "Deep Impact",
    desc: "Your work shapes how enterprises handle their data.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Small Team",
    desc: "No bureaucracy. Own your domain and move fast.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function Careers() {
  useReveal();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchJobs(); }, []);

  // Re-trigger reveal after async jobs render into the DOM
  useEffect(() => {
    if (loading || jobs.length === 0) return;
    const timer = setTimeout(() => {
      document.querySelectorAll(".rv:not(.rv--in)").forEach((el) => {
        el.classList.add("rv--in");
      });
    }, 80);
    return () => clearTimeout(timer);
  }, [jobs, loading]);

  async function fetchJobs() {
    try {
      const { data, error } = await supabase
        .from("careers")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) setJobs(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <style>{pageStyles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section">
        <div className="container">
          <div className="careers-hero">

            {/* Left: copy */}
            <div>
              <div className="ha ha-1">
                <span className="kicker">Join Our Team</span>
              </div>
              <h1 className="h1 ha ha-2" style={{ marginTop: 10 }}>
                Build what{" "}
                <span className="text-grad">matters</span>,<br />
                with people who care.
              </h1>
              <p className="lead ha ha-3" style={{ marginTop: 16, maxWidth: "58ch" }}>
                At InionData, we solve hard problems at the intersection of enterprise
                software and data intelligence. We move fast, think deeply, and build
                things that last — and we're always looking for people who do the same.
              </p>
              <div
                className="ha ha-4"
                style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}
              >
                <a href="#open-roles" className="btn btn--primary">
                  See Open Roles
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
                <Link to="/contact" className="btn btn--ghost">Get in touch</Link>
              </div>
            </div>

            {/* Right: image */}
            <div className="ha ha-6">
              <div className="careers-hero-img-wrap">
                <img src={careersImg} alt="InionData team at work" />
                <div className="careers-hero-img-overlay" />
                <div className="careers-hero-badge">🌍 Global team, local impact</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── WHY INIONDATA ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="rv" style={{ marginBottom: 28 }}>
            <div className="accent-bar" />
            <div className="kicker">Why InionData</div>
            <h2 className="h2" style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", marginTop: 8 }}>
              A place where great work thrives
            </h2>
          </div>
          <div className="perks-row rv-group">
            {PERKS.map((p) => (
              <div key={p.title} className="perk-card rv">
                <div className="perk-icon">{p.icon}</div>
                <p className="perk-title">{p.title}</p>
                <p className="perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="section" id="open-roles">
        <div className="container">
          <div className="roles-header rv">
            <div>
              <div className="accent-bar" />
              <div className="kicker">Open Positions</div>
              <h2 className="h2" style={{ fontSize: "clamp(1.4rem,2.8vw,2rem)", marginTop: 8 }}>
                Current openings
              </h2>
            </div>
            {!loading && jobs.length > 0 && (
              <span className="roles-count">
                {jobs.length} role{jobs.length !== 1 ? "s" : ""} available
              </span>
            )}
          </div>

          {loading ? (
            <div className="loading-dots">
              <div className="loading-dot" />
              <div className="loading-dot" />
              <div className="loading-dot" />
            </div>
          ) : jobs.length > 0 ? (
            <div className="jobs-grid rv-group">
              {jobs.map((job, i) => (
                <div
                  key={job.id}
                  className="job-card rv"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="job-card-top">
                    <h3 className="job-title">{job.title}</h3>
                    <span className="job-type-pill">{job.type}</span>
                  </div>
                  <div className="job-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    {job.location}
                  </div>
                  <p className="job-desc">{job.description}</p>
                  <Link to={`/apply/${job.id}`} className="job-apply-btn">
                    Apply for this role
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-roles rv">
              <p className="empty-roles-title">No open roles right now</p>
              <p className="empty-roles-desc">
                We don't have specific openings at the moment, but we're always keen to
                meet talented people. Drop us a line at{" "}
                <a href="mailto:hello@iniondata.com">hello@iniondata.com</a>.
              </p>
              <Link to="/contact" className="btn btn--ghost">Get in touch</Link>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section section--alt">
        <div className="container rv">
          <div className="cta-band">
            <div>
              <h2 className="cta-band__title">Don't see a role that fits?</h2>
              <p className="cta-band__sub">
                We're always interested in exceptional people. Send us your profile
                and let's start a conversation.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="btn cta-band__btn" to="/contact">Reach out</Link>
              <Link
                className="btn"
                to="/about"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                About us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}