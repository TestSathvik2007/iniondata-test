import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home",         page: "home" },
  { label: "About Us",     page: "about" },
  { label: "Our Services", page: "services" },
  { label: "Contact Us",   page: "contact" },
  { label: "Careers",      page: "careers" },
];

export default function Navbar({ currentPage, navigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (page) => { navigate(page); setMenuOpen(false); };

  return (
    <nav className="navbar" style={{ padding: scrolled ? "0.6rem 1.5rem" : "1.25rem 1.5rem" }}>
      <div className="navbar-pill" style={{ boxShadow: scrolled ? "0 6px 28px rgba(0,0,0,0.1)" : "0 2px 16px rgba(0,0,0,0.06)" }}>

        {/* Logo */}
        <button className="navbar-logo" onClick={() => go("home")}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#0D9488"/>
            <path d="M8 22V14a2 2 0 012-2h3.5L16 8l2.5 4H22a2 2 0 012 2v8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="16" cy="18" r="3" fill="white" opacity="0.9"/>
          </svg>
          <span className="navbar-logo-text">Inion<span>Data</span></span>
        </button>

        {/* Desktop links */}
        <ul className="navbar-links">
          {navLinks.map(l => (
            <li key={l.page} style={{ listStyle: "none" }}>
              <button
                className={`nav-btn ${currentPage === l.page ? "active" : ""}`}
                onClick={() => go(l.page)}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className="navbar-cta-btn" onClick={() => go("contact")}>
          Get In Touch
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Hamburger */}
        <button
          className="hamburger"
          style={{ transform: menuOpen ? "rotate(0)" : "none" }}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <ul style={{ listStyle: "none", padding: 0 }}>
            {navLinks.map(l => (
              <li key={l.page}>
                <button
                  className={`mobile-nav-btn ${currentPage === l.page ? "active" : ""}`}
                  onClick={() => go(l.page)}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
          <button className="mobile-cta-btn" onClick={() => go("contact")}>Get In Touch</button>
        </div>
      )}
    </nav>
  );
}