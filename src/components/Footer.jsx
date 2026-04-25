import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

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

const footerStyles = `
  /* ═══════════════════════════════════════
     FOOTER
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
    padding: clamp(36px, 6vh, 56px) clamp(20px, 5vw, 60px);
    max-width: 1600px;
    margin: 0 auto;
  }

  /* ── Tablet: 2-column ── */
  @media (max-width: 900px) {
    .footer__grid {
      grid-template-columns: 1fr 1fr;
      gap: clamp(20px, 3vw, 32px) clamp(16px, 3vw, 24px);
      padding: clamp(28px, 4vh, 40px) clamp(20px, 5vw, 60px);
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
      padding: clamp(20px, 3vh, 28px) clamp(20px, 5vw, 60px);
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
    margin-bottom: clamp(8px, 1.5vh, 12px);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }
  .footer__brandMark:hover { opacity: 0.8; }

  .footer__logo {
    height: 30px;
    width: auto;
    display: block;
  }

  .footer__tagline {
    font-size: clamp(11px, 2vw, 13px);
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: clamp(12px, 2vh, 16px);
    max-width: 28ch;
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

  /* ── Bottom bar ── */
  .footer__bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: clamp(8px, 2vw, 12px);
    padding: clamp(16px, 3vh, 24px) clamp(20px, 5vw, 60px);
    max-width: 1600px;
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
      padding: clamp(16px, 2vh, 20px) clamp(20px, 5vw, 60px);
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

  .footer__dot {
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--teal, #1D9E75);
    opacity: 0.5;
    flex-shrink: 0;
  }

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
            <img src={logo} alt="InionData" className="footer__logo" />
          </Link>

          <p className="footer__tagline">
            End-to-end data and AI services built for accuracy, scale, and speed.
          </p>
        </div>

        {/* Nav columns */}
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
                  <a key={item.text} href={item.href} className="footer__contactItem">
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
        <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
          <div className="footer__dot" aria-hidden="true" />
          <span>© {year} InionData.</span>
        </div>
        <div className="footer__bottomLinks">
          <a href="#privacy" className="footer__legalLink">Privacy</a>
          <a href="#terms" className="footer__legalLink">Terms</a>
        </div>
      </div>
    </footer>
  );
}