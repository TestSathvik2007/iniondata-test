import { Link } from "react-router-dom";

const nav = [
  {
    title: "Company",
    links: [
      { label: "Home",    to: "/" },
      { label: "About",   to: "/about" },
      { label: "Careers", to: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Enablement", to: "/ai-enablement" },
      { label: "Consulting",    to: "/services" },
      { label: "Staffing",      to: "/services" },
      { label: "Analytics",     to: "/services" },
    ],
  },
  {
    title: "Contact",
    items: [
      { text: "Richmond, VA",       href: null },
      { text: "(804) 877-2171",     href: "tel:+18048772171" },
      { text: "hello@iniondata.com",href: "mailto:hello@iniondata.com" },
      { text: "Mon–Fri, 9am–6pm",   href: null },
    ],
  },
];

const stats = [
  ["98%",  "Annotation accuracy"],
  ["50+",  "Enterprise clients"],
  ["24/7", "Managed operations"],
];

const footerStyles = `
  /* ═══════════════════════════════════════
     FOOTER — ULTRA-COMPACT MOBILE
  ═══════════════════════════════════════ */

  .footer {
    background: var(--footer-bg, #07100e);
    color: rgba(255,255,255,0.65);
    font-size: clamp(12px, 2vw, 14px);
    margin-top: clamp(40px, 8vh, 80px);
  }

  /* ── Desktop: Full 4-column layout ── */
  .footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1fr;
    gap: clamp(24px, 4vw, 40px) clamp(20px, 3vw, 32px);
    align-items: start;
    padding: clamp(36px, 6vh, 56px) clamp(16px, 4vw, 24px) clamp(28px, 5vh, 40px);
    max-width: 1200px;
    margin: 0 auto;
  }

  /* ── Tablet: 2-column ── */
  @media (max-width: 900px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px);
      padding: clamp(28px, 4vh, 40px) clamp(16px, 4vw, 20px) clamp(20px, 3vh, 32px);
    }
    .footer__brandCol {
      grid-column: 1 / -1;
      max-width: 100%;
    }
  }

  /* ── Mobile: COMPACT 1-column ── */
  @media (max-width: 640px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: clamp(16px, 3vw, 20px);
      padding: clamp(20px, 3vh, 28px) clamp(12px, 3vw, 16px);
    }
    .footer__brandCol {
      grid-column: auto;
      max-width: 100%;
    }
  }

  /* ── Brand column ── */
  .footer__brandMark {
    display: inline-flex;
    align-items: center;
    gap: clamp(6px, 2vw, 8px);
    margin-bottom: clamp(8px, 1.5vh, 12px);
    text-decoration: none;
  }

  .footer__iconCircle {
    width: clamp(26px, 5vw, 32px);
    height: clamp(26px, 5vw, 32px);
    border-radius: 6px;
    background: rgba(29, 158, 117, 0.15);
    border: 1px solid rgba(29, 158, 117, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--teal, #1D9E75);
    flex-shrink: 0;
  }

  .footer__brandText {
    font-size: clamp(14px, 2.8vw, 17px);
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .footer__brandText span {
    color: var(--teal, #1D9E75);
  }

  .footer__tagline {
    font-size: clamp(11px, 2vw, 13px);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: clamp(12px, 2vh, 16px);
    max-width: 28ch;
  }

  /* Stats — hide on mobile, show on tablet+ */
  .footer__stats {
    display: grid;
    gap: clamp(6px, 1.5vw, 10px);
  }

  @media (max-width: 640px) {
    .footer__stats {
      display: none;
    }
  }

  .footer__stat {
    display: flex;
    align-items: center;
    gap: clamp(8px, 2vw, 12px);
  }

  .footer__statVal {
    font-size: clamp(10px, 1.8vw, 12px);
    font-weight: 800;
    color: var(--teal, #1D9E75);
    min-width: 32px;
    letter-spacing: 0.01em;
  }

  .footer__statLabel {
    font-size: clamp(10px, 1.8vw, 12px);
    color: rgba(255, 255, 255, 0.4);
  }

  /* ── Nav columns ── */
  .footer__colTitle {
    font-size: clamp(9px, 1.6vw, 11px);
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.3);
    margin-bottom: clamp(8px, 1.5vh, 12px);
  }

  .footer__navLink {
    display: block;
    font-size: clamp(12px, 2vw, 14px);
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin-bottom: clamp(6px, 1.2vh, 10px);
    transition: color 0.18s ease, transform 0.18s ease;
    line-height: 1.4;
  }

  .footer__navLink:hover {
    color: #fff;
    transform: translateX(2px);
  }

  .footer__contactItem {
    display: block;
    font-size: clamp(12px, 2vw, 14px);
    color: rgba(255, 255, 255, 0.55);
    margin-bottom: clamp(6px, 1.2vh, 10px);
    text-decoration: none;
    transition: color 0.18s ease;
    line-height: 1.4;
  }

  a.footer__contactItem:hover {
    color: var(--teal, #1D9E75);
  }

  /* ── Divider ── */
  .footer__divider {
    height: 1px;
    background: linear-gradient(90deg, var(--teal, #1D9E75) 0%, transparent 60%);
    opacity: 0.15;
    margin: 0 clamp(12px, 4vw, 24px);
  }

  /* ── Bottom bar — ULTRA COMPACT ON MOBILE ── */
  .footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: clamp(8px, 2vw, 12px);
    padding: clamp(12px, 2vh, 16px) clamp(12px, 4vw, 24px) clamp(16px, 3vh, 20px);
    max-width: 1200px;
    margin: 0 auto;
    font-size: clamp(10px, 1.6vw, 12px);
    color: rgba(255, 255, 255, 0.3);
  }

  @media (max-width: 640px) {
    .footer__bottom {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 6px;
      padding: clamp(12px, 2vh, 14px) clamp(12px, 3vw, 16px);
    }
  }

  .footer__bottomLinks {
    display: flex;
    gap: clamp(10px, 2vw, 16px);
  }

  .footer__legalLink {
    color: rgba(255, 255, 255, 0.3);
    text-decoration: none;
    font-size: clamp(10px, 1.6vw, 12px);
    transition: color 0.18s ease;
  }

  .footer__legalLink:hover {
    color: rgba(255, 255, 255, 0.6);
  }

  /* Dot separator */
  .footer__dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--teal, #1D9E75);
    opacity: 0.5;
    flex-shrink: 0;
  }

  /* Prevent horizontal scroll on small screens */
  @media (max-width: 480px) {
    .footer {
      overflow: hidden;
    }
    .footer__grid {
      gap: clamp(12px, 2vw, 16px);
    }
  }
`;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <style>{footerStyles}</style>

      {/* Main grid */}
      <div className="footer__grid">
        {/* Brand column */}
        <div className="footer__brandCol">
          <Link to="/" className="footer__brandMark">
            <div className="footer__iconCircle" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.2 12.2l1.9 1.9 3.7-4.1"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="footer__brandText">
              Inion<span>Data</span>
            </span>
          </Link>

          <p className="footer__tagline">
            End-to-end data and AI services built for accuracy, scale, and speed.
          </p>

          {/* Stats — hidden on mobile */}
          <div className="footer__stats">
            {stats.map(([val, label]) => (
              <div key={label} className="footer__stat">
              <div className="footer__statVal">{val}</div>
                <div className="footer__statLabel">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nav columns — hidden on small mobile, shown on tablet+ */}
        {nav.map((col) => (
          <div key={col.title}>
            <div className="footer__colTitle">{col.title}</div>

            {col.links?.map((l) => (
              <Link key={l.label} to={l.to} className="footer__navLink">
                {l.label}
              </Link>
            ))}

            {col.items?.map((item) => {
              if (item.href) {
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    className="footer__contactItem"
                  >
                    {item.text}
                  </a>
                );
              }
              return (
                <span key={item.text} className="footer__contactItem">
                  {item.text}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="footer__divider" />

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div className="footer__dot" aria-hidden="true" />
          <span>© {year} InionData.</span>
        </div>
        <div className="footer__bottomLinks">
          <a href="#privacy" className="footer__legalLink">
            Privacy
          </a>
          <a href="#terms" className="footer__legalLink">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}