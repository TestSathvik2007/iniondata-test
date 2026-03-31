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
      "Richmond, VA",
      "(804) 877-2171",
      "hello@iniondata.com",
      "Mon–Fri, 9am–6pm",
    ],
  },
];

const stats = [
  ["98%",  "Annotation accuracy"],
  ["50+",  "Enterprise clients"],
  ["24/7", "Managed operations"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* ════════════════════════════════════════
          MAIN BODY
      ════════════════════════════════════════ */}
      <div className="container" style={{ paddingTop: 56, paddingBottom: 40 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}>

          {/* ── brand column ── */}
          <div>
            <div className="footer__brand" style={{ marginBottom: 16 }}>
              <span className="brand__mark" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z"
                    stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"
                  />
                  <path
                    d="M9.2 12.2l1.9 1.9 3.7-4.1"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="brand__text brand__text--light">Inion<span>Data</span></span>
            </div>

            <p className="footer__muted" style={{ lineHeight: 1.65, marginBottom: 28, maxWidth: "28ch" }}>
              End-to-end data and AI services built for accuracy, scale, and speed.
            </p>

            {/* inline stats */}
            <div style={{ display: "grid", gap: 12 }}>
              {stats.map(([v, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    fontWeight: 800,
                    fontSize: 13,
                    color: "var(--teal)",
                    minWidth: 44,
                  }}>
                    {v}
                  </div>
                  <div className="footer__muted" style={{ fontSize: 12 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── nav columns ── */}
          {nav.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column" }}>
              <div className="footer__title" style={{ marginBottom: 14 }}>{col.title}</div>
              {col.links?.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="footer__link"
                  style={{ display: "block", marginBottom: 10 }}
                >
                  {l.label}
                </Link>
              ))}
              {col.items?.map((item) => (
                <div
                  key={item}
                  className="footer__meta"
                  style={{ display: "block", marginBottom: 10 }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* teal → transparent divider */}
        <div style={{
          marginTop: 48,
          height: 1,
          background: "linear-gradient(90deg, var(--teal) 0%, transparent 60%)",
          opacity: 0.2,
        }} />
      </div>

      {/* ════════════════════════════════════════
          BOTTOM BAR
      ════════════════════════════════════════ */}
      <div className="container footer__bottom" style={{ paddingBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            display: "inline-block",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--teal)",
            opacity: 0.6,
            flexShrink: 0,
          }} />
          <span>© {year} InionData. All rights reserved.</span>
        </div>
        <div className="footer__bottomLinks">
          <a className="footer__link" href="#">Privacy</a>
          <a className="footer__link" href="#">Terms</a>
        </div>
      </div>

    </footer>
  );
}