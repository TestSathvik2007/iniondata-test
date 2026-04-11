import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/ai-enablement", label: "AI Enablement" },
  { to: "/contact", label: "Contact" },
];

const navStyles = `
  .nav {
    transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                backdrop-filter 0.35s ease;
  }

  .brand { transition: opacity 0.2s ease; }
  .brand:hover { opacity: 0.85; }
  .brand__mark {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
  }
  .brand:hover .brand__mark { transform: rotate(-8deg) scale(1.08); }

  .navlink {
    position: relative;
    overflow: hidden;
    transition: color 0.2s ease, background 0.2s ease;
  }
  .navlink::after {
    content: '';
    position: absolute;
    bottom: 3px;
    left: 50%;
    width: 0;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transform: translateX(-50%);
    transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    opacity: 0.5;
  }
  .navlink:hover::after { width: 60%; }
  .navlink--active::after { width: 60%; }

  .btn {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
                box-shadow 0.2s ease,
                opacity 0.2s ease;
  }
  .btn--primary:hover {
    transform: translateY(-2px) scale(1.03);
  }
  .btn--primary:active {
    transform: translateY(0) scale(0.98);
  }
  .brand__logo {
  height: 40px;
  width: auto;
}
`;

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
    <>
      <style>{navStyles}</style>

      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="container nav__inner">

          {/* Brand */}
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <img src={logo} alt="InionData Logo" className="brand__logo" />
          </Link>

          {/* Desktop nav */}
          <nav className="nav__links">
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

          {/* Actions */}
          <div className="nav__actions">
            <Link
              to="/contact"
              className="btn btn--primary"
              onClick={() => setOpen(false)}
            >
              Get in touch
            </Link>
          </div>
        </div>

        {/* Mobile drawer */}
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
              <Link
                to="/contact"
                className="btn btn--primary btn--full"
                onClick={() => setOpen(false)}
              >
                Talk to us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}