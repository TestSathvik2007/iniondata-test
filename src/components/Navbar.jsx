import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const links = [
  { to: "/",             label: "Home",          sub: "Start here" },
  { to: "/about",        label: "About",         sub: "Our story" },
  { to: "/services",     label: "Services",      sub: "What we do" },
  { to: "/ai-enablement",label: "AI Enablement", sub: "The future" },
  { to: "/contact",      label: "Contact",       sub: "Let's talk" },
];

const navStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  /* ─── HEADER BAR ─── */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 200;
    transition: background 0.4s ease, box-shadow 0.4s ease;
  }
  .nav--scrolled {
    background: rgba(7, 16, 14, 0.82);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 0 1px 0 rgba(255,255,255,0.05);
  }
  .nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ─── BRAND ─── */
  .brand {
    display: flex; align-items: center; flex-shrink: 0;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .brand:hover { opacity: 0.8; }
  .brand__logo { height: 34px; width: auto; display: block; }
  @media (max-width: 400px) { .brand__logo { height: 28px; } }

  /* ─── DESKTOP LINKS ─── */
  .nav__links {
    display: flex; align-items: center; gap: 4px;
    flex: 1; justify-content: center;
  }
  .navlink {
    position: relative; padding: 6px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.72);
    text-decoration: none; border-radius: 6px; white-space: nowrap;
    transition: color 0.2s, background 0.2s;
  }
  .navlink:hover { color: #fff; background: rgba(255,255,255,0.07); }
  .navlink::after {
    content: ''; position: absolute; bottom: 2px; left: 50%;
    width: 0; height: 2px;
    background: #2dd4bf; border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.35s cubic-bezier(0.34,1.56,0.64,1);
  }
  .navlink:hover::after, .navlink--active::after { width: 55%; }
  .navlink--active { color: #fff; }

  /* ─── DESKTOP CTA ─── */
  .nav__actions { flex-shrink: 0; }
  .btn--cta {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 9px 20px; border-radius: 6px;
    background: #085041; color: #9FE1CB;
    border: 1.5px solid #085041;
    box-shadow: 4px 4px 0 #1D9E75;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    text-decoration: none; white-space: nowrap; cursor: pointer;
    transition: box-shadow 0.18s ease, transform 0.18s ease;
  }
  .btn--cta:hover  { box-shadow: 2px 2px 0 #1D9E75; transform: translate(2px,2px); }
  .btn--cta:active { box-shadow: none; transform: translate(4px,4px); }

  /* ─── HAMBURGER ─── */
  .nav__toggle {
    display: none;
    flex-direction: column; align-items: center; justify-content: center;
    width: 44px; height: 44px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    cursor: pointer;
    gap: 5px;
    flex-shrink: 0;
    z-index: 300;
    transition: background 0.2s, border-color 0.2s;
    position: relative;
    overflow: hidden;
  }
  .nav__toggle::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at center, rgba(20,184,166,0.2), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .nav__toggle:hover::before { opacity: 1; }
  .nav__toggle:hover { border-color: rgba(20,184,166,0.35); }

  .ham-line {
    width: 20px; height: 1.5px;
    background: rgba(255,255,255,0.85);
    border-radius: 2px;
    transition: transform 0.38s cubic-bezier(0.22,1,0.36,1),
                opacity 0.25s ease,
                width 0.3s ease;
    transform-origin: center;
  }
  /* open state — X */
  .nav__toggle.is-open .ham-line:nth-child(1) { transform: translateY(6.5px) rotate(45deg); width: 22px; }
  .nav__toggle.is-open .ham-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .nav__toggle.is-open .ham-line:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); width: 22px; }

  /* ─── RESPONSIVE SHOW/HIDE ─── */
  @media (max-width: 768px) {
    .nav__toggle  { display: flex; }
    .nav__links   { display: none; }
    .nav__actions { display: none; }
    .nav__inner   { height: 58px; padding: 0 16px; }
  }
  @media (max-width: 1024px) and (min-width: 769px) {
    .navlink { font-size: 13px; padding: 6px 8px; }
    .btn--cta { padding: 7px 14px; font-size: 13px; }
  }

  /* ════════════════════════════════════════════
     FULL-SCREEN MOBILE MENU — Portal to body
     Editorial luxury × brutalist data aesthetic
  ════════════════════════════════════════════ */

  .mob-menu {
    position: fixed;
    inset: 0;
    z-index: 250;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    /* clip-path reveal animation */
    clip-path: circle(0% at calc(100% - 38px) 29px);
    transition: clip-path 0.65s cubic-bezier(0.76, 0, 0.24, 1);
    pointer-events: none;
  }
  .mob-menu.is-open {
    clip-path: circle(150% at calc(100% - 38px) 29px);
    pointer-events: auto;
  }

  /* ── Layered background ── */
  .mob-bg {
    position: absolute; inset: 0;
    background: #040d0b;
    z-index: 0;
  }
  /* Animated mesh blobs */
  .mob-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0;
    transition: opacity 0.8s ease;
  }
  .mob-menu.is-open .mob-blob { opacity: 1; }
  .mob-blob-1 {
    width: 420px; height: 420px;
    background: radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%);
    top: -80px; right: -100px;
    animation: blobFloat1 8s ease-in-out infinite alternate;
  }
  .mob-blob-2 {
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(34,197,94,0.10) 0%, transparent 70%);
    bottom: 80px; left: -60px;
    animation: blobFloat2 10s ease-in-out infinite alternate;
  }
  .mob-blob-3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%);
    top: 50%; left: 40%;
    animation: blobFloat3 7s ease-in-out infinite alternate;
  }
  @keyframes blobFloat1 { from { transform: translate(0,0) scale(1); } to { transform: translate(-30px,40px) scale(1.15); } }
  @keyframes blobFloat2 { from { transform: translate(0,0) scale(1); } to { transform: translate(40px,-30px) scale(1.1); } }
  @keyframes blobFloat3 { from { transform: translate(0,0) scale(1); } to { transform: translate(-20px,20px) scale(1.2); } }

  /* Noise grain texture */
  .mob-noise {
    position: absolute; inset: 0; z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.045'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.6;
  }

  /* Diagonal rule lines — brutalist grid */
  .mob-grid-lines {
    position: absolute; inset: 0; z-index: 1; pointer-events: none;
    overflow: hidden;
  }
  .mob-grid-lines::before {
    content: '';
    position: absolute;
    top: 0; left: -200px; right: 0; bottom: 0;
    background:
      repeating-linear-gradient(
        -45deg,
        transparent,
        transparent 80px,
        rgba(255,255,255,0.012) 80px,
        rgba(255,255,255,0.012) 81px
      );
  }

  /* ── Inner layout ── */
  .mob-inner {
    position: relative; z-index: 10;
    display: flex; flex-direction: column;
    height: 100%;
    padding: 0;
  }

  /* Top strip — logo + close hint */
  .mob-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 24px 0;
    flex-shrink: 0;
  }
  .mob-topbar-logo {
    height: 28px; width: auto; opacity: 0.5;
    transform: translateX(-20px);
    transition: opacity 0.5s ease 0.3s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.3s;
  }
  .mob-menu.is-open .mob-topbar-logo { opacity: 0.5; transform: translateX(0); }

  .mob-online {
    display: flex; align-items: center; gap: 7px;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 500; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(255,255,255,0.35);
    transform: translateX(20px); opacity: 0;
    transition: opacity 0.5s ease 0.4s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.4s;
  }
  .mob-menu.is-open .mob-online { opacity: 1; transform: translateX(0); }
  .mob-online-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 0 rgba(16,185,129,0.5);
    animation: pulseOnline 2s ease-in-out infinite;
  }
  @keyframes pulseOnline {
    0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
    50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0); }
  }

  /* ── NAV LINKS — the hero section ── */
  .mob-nav {
    flex: 1; display: flex; flex-direction: column;
    justify-content: center;
    padding: 0 24px;
    gap: 0;
  }

  .mob-link-wrap {
    position: relative;
    display: flex; align-items: baseline; gap: 16px;
    padding: 14px 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow: hidden;
    cursor: pointer;
    /* Staggered slide-in from left */
    transform: translateX(-60px);
    opacity: 0;
    transition:
      transform 0.55s cubic-bezier(0.22,1,0.36,1),
      opacity   0.45s ease;
    text-decoration: none;
  }
  /* Each link has a different delay via inline style set in JSX */
  .mob-menu.is-open .mob-link-wrap {
    transform: translateX(0);
    opacity: 1;
  }

  /* Hover sweep line */
  .mob-link-wrap::after {
    content: '';
    position: absolute; left: 0; bottom: 0;
    width: 0; height: 1px;
    background: linear-gradient(90deg, #14b8a6, #22c55e);
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .mob-link-wrap:hover::after { width: 100%; }

  /* Hover background flash */
  .mob-link-wrap::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(20,184,166,0.05) 0%, transparent 60%);
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1);
  }
  .mob-link-wrap:hover::before { opacity: 1; transform: translateX(0); }

  /* Index number */
  .mob-link-index {
    font-family: 'Syne', sans-serif;
    font-size: 11px; font-weight: 700;
    color: rgba(20,184,166,0.5);
    letter-spacing: 0.05em;
    min-width: 24px;
    transition: color 0.25s ease;
    position: relative; z-index: 1;
    user-select: none;
  }
  .mob-link-wrap:hover .mob-link-index { color: #2dd4bf; }

  /* Main label */
  .mob-link-label {
    font-family: 'Syne', sans-serif;
    font-size: clamp(34px, 9vw, 52px);
    font-weight: 800;
    color: rgba(255,255,255,0.88);
    letter-spacing: -0.03em;
    line-height: 1;
    position: relative; z-index: 1;
    transition: color 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    flex: 1;
  }
  .mob-link-wrap:hover .mob-link-label {
    color: #fff;
    transform: translateX(6px);
  }
  .mob-link-wrap--active .mob-link-label {
    color: #2dd4bf;
  }

  /* Sub-label */
  .mob-link-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px; font-weight: 400;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.06em; text-transform: uppercase;
    align-self: flex-start; margin-top: 6px;
    position: relative; z-index: 1;
    transition: color 0.25s ease;
  }
  .mob-link-wrap:hover .mob-link-sub { color: rgba(45,212,191,0.6); }

  /* Arrow */
  .mob-link-arrow {
    position: relative; z-index: 1;
    color: rgba(255,255,255,0.15);
    align-self: center;
    transition: color 0.25s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
  }
  .mob-link-wrap:hover .mob-link-arrow {
    color: #2dd4bf;
    transform: translateX(8px) rotate(-35deg);
  }

  /* ── BOTTOM STRIP ── */
  .mob-footer {
    flex-shrink: 0;
    padding: 20px 24px 32px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 12px;
    transform: translateY(24px); opacity: 0;
    transition: opacity 0.5s ease 0.5s, transform 0.5s cubic-bezier(0.22,1,0.36,1) 0.5s;
  }
  .mob-menu.is-open .mob-footer { opacity: 1; transform: translateY(0); }

  .mob-footer-contact {
    display: flex; flex-direction: column; gap: 3px;
  }
  .mob-footer-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 9px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.22);
  }
  .mob-footer-val {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 400;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  a.mob-footer-val:hover { color: #2dd4bf; }

  .mob-footer-cta {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 22px;
    background: #1D9E75;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    text-decoration: none; cursor: pointer;
    transition: background 0.2s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .mob-footer-cta:hover { background: #16a34a; transform: scale(1.04); }
  .mob-footer-cta:active { transform: scale(0.97); }

  /* ── Vertical teal rule — decorative ── */
  .mob-rule {
    position: absolute;
    left: 16px; top: 20%; bottom: 20%;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(20,184,166,0.25), transparent);
    z-index: 5; pointer-events: none;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s;
  }
  .mob-menu.is-open .mob-rule { transform: scaleY(1); }

  /* ── Huge faded number watermark ── */
  .mob-watermark {
    position: absolute;
    right: -20px; bottom: 60px;
    font-family: 'Syne', sans-serif;
    font-size: clamp(140px, 35vw, 220px);
    font-weight: 800;
    color: rgba(20,184,166,0.04);
    line-height: 1;
    pointer-events: none;
    z-index: 2;
    user-select: none;
    letter-spacing: -0.05em;
    transition: opacity 0.5s ease;
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [watermark, setWatermark] = useState("IN");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const mobileMenu = createPortal(
    <>
      <style>{navStyles}</style>
      <div
        className={`mob-menu${open ? " is-open" : ""}`}
        aria-hidden={!open}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Layered backgrounds */}
        <div className="mob-bg" />
        <div className="mob-blob mob-blob-1" />
        <div className="mob-blob mob-blob-2" />
        <div className="mob-blob mob-blob-3" />
        <div className="mob-noise" />
        <div className="mob-grid-lines" />

        {/* Vertical rule accent */}
        <div className="mob-rule" />

        {/* Watermark */}
        <div className="mob-watermark" aria-hidden="true">{watermark}</div>

        <div className="mob-inner">
          {/* Top bar */}
          <div className="mob-topbar">
            <img src={logo} alt="InionData" className="mob-topbar-logo" />
            <div className="mob-online">
              <span className="mob-online-dot" />
              Available now
            </div>
          </div>

          {/* Nav links */}
          <nav className="mob-nav" aria-label="Mobile navigation">
            {links.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                onClick={closeMenu}
                onMouseEnter={() => setWatermark(String(i + 1).padStart(2, "0"))}
                onMouseLeave={() => setWatermark("IN")}
                className={({ isActive }) =>
                  `mob-link-wrap${isActive ? " mob-link-wrap--active" : ""}`
                }
                style={{
                  transitionDelay: open
                    ? `${0.08 + i * 0.07}s`
                    : `${(links.length - 1 - i) * 0.04}s`,
                }}
              >
                <span className="mob-link-index">0{i + 1}</span>
                <span className="mob-link-label">{l.label}</span>
                <span className="mob-link-sub">{l.sub}</span>
                <span className="mob-link-arrow" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 19L19 5M19 5H9M19 5V15"
                      stroke="currentColor" strokeWidth="1.8"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </NavLink>
            ))}
          </nav>

          {/* Footer strip */}
          <div className="mob-footer">
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
              <div className="mob-footer-contact">
                <span className="mob-footer-label">Phone</span>
                <a href="tel:+18048772171" className="mob-footer-val">(804) 877-2171</a>
              </div>
              <div className="mob-footer-contact">
                <span className="mob-footer-label">Email</span>
                <a href="mailto:hello@iniondata.com" className="mob-footer-val">hello@iniondata.com</a>
              </div>
            </div>
            <Link to="/contact" className="mob-footer-cta" onClick={closeMenu}>
              Talk to us
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>,
    document.body
  );

  return (
    <>
      <style>{navStyles}</style>

      <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
        <div className="nav__inner">

          <Link to="/" className="brand" onClick={closeMenu}>
            <img src={logo} alt="InionData" className="brand__logo" />
          </Link>

          <nav className="nav__links" aria-label="Main navigation">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `navlink${isActive ? " navlink--active" : ""}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav__actions">
            <Link to="/contact" className="btn--cta">Get in touch</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`nav__toggle${open ? " is-open" : ""}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </button>
        </div>
      </header>

      {mobileMenu}
    </>
  );
}