import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)} aria-label="Go to home">
          <span className="brand__mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9.2 12.2l1.9 1.9 3.7-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="brand__text">Inion<span>Data</span></span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `navlink ${isActive ? "navlink--active" : ""}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>
            Get in touch
          </Link>

          <button className="iconbtn nav__burger" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu">
            <span className="burger" aria-hidden="true" data-open={open ? "true" : "false"} />
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          <div className="container nav__mobileInner">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => `mobilelink ${isActive ? "mobilelink--active" : ""}`}
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn btn--primary btn--full" onClick={() => setOpen(false)}>
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}