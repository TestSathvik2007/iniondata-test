import { useEffect, useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  {
    to: "/services",
    label: "Services",
    dropdown: [
      { to: "/services/app-development", label: "Application Design & Development" },
      { to: "/services/app-integration", label: "Application Integration" },
      { to: "/services/app-management", label: "Application Management" },
      { to: "/services/app-maintenance", label: "Application Maintenance" },
      { to: "/services/project-management", label: "Project Management" },
      { to: "/services/consulting", label: "Consulting Services" },
      { to: "/services/teams-integration", label: "Teams Integration" },
      { to: "/services/operational-efficiency", label: "Operational Efficiency" },
      { to: "/services/fast-growth", label: "Fast Growth" },
      { to: "/services/data-analytics", label: "Data & Analytics" },
      { to: "/services/data-engineering", label: "Data Engineering" },
      { to: "/services/cloud-engineering", label: "Cloud Engineering" },
    ],
  },
  { to: "/ai-enablement", label: "AI Enablement" },
  { to: "/contact", label: "Contact" },
];

const navStyles = `
  .nav {
    transition: background 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                box-shadow 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                backdrop-filter 0.35s ease;
  }

  /* ── Brand ── */
  .brand { transition: opacity 0.2s ease; }
  .brand:hover { opacity: 0.85; }
  .brand__mark {
    transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
  }
  .brand:hover .brand__mark { transform: rotate(-8deg) scale(1.08); }

  /* ── Desktop nav links ── */
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

  /* ── Services dropdown trigger ── */
  .nav-dropdown-wrap {
    position: relative;
  }
  .nav-dropdown-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    padding: 9px 15px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    color: var(--muted, #7a9e8e);
    background: none;
    border: none;
    font-family: inherit;
    transition: color 0.2s ease, background 0.2s ease;
  }
  .nav-dropdown-trigger:hover,
  .nav-dropdown-trigger.active {
    background: rgba(20,184,166,0.12);
    color: var(--teal-2, #2dd4bf);
  }
  .nav-dropdown-trigger svg {
    transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }
  .nav-dropdown-trigger[aria-expanded="true"] svg {
    transform: rotate(180deg);
  }

  /* ── Dropdown panel ── */
  .nav-dropdown {
    position: absolute;
    top: calc(100% + 3px);
    left: 50%;
    transform: translateX(-50%);
    width: 280px;
    background: rgba(10, 22, 18, 0.97);
    border: 1px solid rgba(255,255,255,0.10);
    border-radius: 16px;
    padding: 8px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(20,184,166,0.08);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    z-index: 100;
    /* animation */
    animation: dropIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    transform-origin: top center;
  }
  @keyframes dropIn {
    from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.96); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0)   scale(1);    }
  }

  .nav-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    color: rgba(223,240,232,0.80);
    transition: background 0.15s ease, color 0.15s ease, transform 0.15s ease;
    text-decoration: none;
  }
  .nav-dropdown-item::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--teal, #14b8a6);
    flex-shrink: 0;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .nav-dropdown-item:hover {
    background: rgba(20,184,166,0.10);
    color: var(--teal-2, #2dd4bf);
    transform: translateX(3px);
  }
  .nav-dropdown-item:hover::before { opacity: 1; }
  .nav-dropdown-item.active {
    color: var(--teal-2, #2dd4bf);
    background: rgba(20,184,166,0.08);
  }
  .nav-dropdown-item.active::before { opacity: 1; }

  .nav-dropdown-divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 4px 8px;
  }

  .nav-dropdown-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    border-radius: 10px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--teal-2, #2dd4bf);
    text-decoration: none;
    transition: background 0.15s ease;
  }
  .nav-dropdown-footer:hover {
    background: rgba(20,184,166,0.10);
  }

  /* ── Button ── */
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

  /* ── Burger ── */
  .iconbtn { transition: opacity 0.2s ease, transform 0.2s ease; }
  .iconbtn:hover { opacity: 0.75; transform: scale(1.06); }
  .burger {
    transition: background 0.25s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .burger::before, .burger::after {
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                top 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                bottom 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                width 0.35s ease;
  }
  .burger[data-open="true"] { background: transparent; }
  .burger[data-open="true"]::before { top: 0; transform: rotate(45deg); }
  .burger[data-open="true"]::after  { bottom: 0; width: 100%; transform: rotate(-45deg); }

  /* ── Mobile drawer ── */
  .nav__mobile { animation: slideDown 0.32s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .mobilelink {
    transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
    opacity: 0;
    animation: fadeLinkIn 0.28s ease forwards;
  }
  .mobilelink:nth-child(1)  { animation-delay: 0.04s; }
  .mobilelink:nth-child(2)  { animation-delay: 0.08s; }
  .mobilelink:nth-child(3)  { animation-delay: 0.12s; }
  .mobilelink:nth-child(4)  { animation-delay: 0.16s; }
  .mobilelink:nth-child(5)  { animation-delay: 0.20s; }
  .mobilelink:nth-child(6)  { animation-delay: 0.24s; }
  .mobilelink:nth-child(7)  { animation-delay: 0.28s; }
  .mobilelink:nth-child(8)  { animation-delay: 0.32s; }
  .mobilelink:nth-child(9)  { animation-delay: 0.36s; }
  .mobilelink:nth-child(10) { animation-delay: 0.40s; }
  .mobilelink:nth-child(11) { animation-delay: 0.44s; }
  .mobilelink:nth-child(12) { animation-delay: 0.48s; }
  @keyframes fadeLinkIn {
    from { opacity: 0; transform: translateX(-10px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  .mobilelink:hover { transform: translateX(4px); }
  .nav__mobileInner .btn--primary {
    opacity: 0;
    animation: fadeLinkIn 0.28s ease 0.52s forwards;
  }

  /* Mobile Services sub-section */
  .mobile-services-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted-2, #4a6a5a);
    padding: 4px 0 2px;
  }
  .mobile-sub-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    color: rgba(223,240,232,0.65);
    transition: background 0.15s ease, color 0.15s ease;
    text-decoration: none;
    opacity: 0;
    animation: fadeLinkIn 0.28s ease forwards;
  }
  .mobile-sub-link::before {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--teal, #14b8a6);
    flex-shrink: 0;
  }
  .mobile-sub-link:hover {
    background: rgba(20,184,166,0.08);
    color: var(--teal-2, #2dd4bf);
  }
`;

// Chevron icon
function ChevronDown() {
  return (
    <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Services dropdown component
function ServicesDropdown({ items, onClose }) {
  return (
    <div className="nav-dropdown" role="menu">
      {items.map((item, i) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClose}
          className={({ isActive }) => `nav-dropdown-item${isActive ? " active" : ""}`}
          role="menuitem"
        >
          {item.label}
        </NavLink>
      ))}
      <div className="nav-dropdown-divider" />
      <NavLink to="/services" onClick={onClose} className="nav-dropdown-footer">
        <svg width="13" height="13" viewBox="0 0 12 12" fill="none">
          <rect x="1" y="1" width="4" height="4" rx="1" fill="currentColor" opacity=".6" />
          <rect x="7" y="1" width="4" height="4" rx="1" fill="currentColor" opacity=".6" />
          <rect x="1" y="7" width="4" height="4" rx="1" fill="currentColor" opacity=".6" />
          <rect x="7" y="7" width="4" height="4" rx="1" fill="currentColor" />
        </svg>
        All services overview
      </NavLink>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key closes both dropdown and mobile menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); setDropdownOpen(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Click outside closes dropdown
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  const servicesItem = links.find((l) => l.dropdown);

  return (
    <>
      <style>{navStyles}</style>

      <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="container nav__inner">

          {/* Brand */}
          <Link to="/" className="brand" onClick={() => { setOpen(false); setDropdownOpen(false); }} aria-label="Go to home">
            <span className="brand__mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.8" stfrokeLinejoin="round" />
                <path d="M9.2 12.2l1.9 1.9 3.7-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="brand__text">Inion<span>Data</span></span>
          </Link>

          {/* Desktop nav */}
          <nav className="nav__links" aria-label="Primary">
            {links.map((l) =>
              l.dropdown ? (
                // Services with dropdown
                <div
                  key={l.to}
                  className="nav-dropdown-wrap"
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`nav-dropdown-trigger${dropdownOpen ? " active" : ""}`}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="menu"
                    onMouseEnter={() => setDropdownOpen(true)}
                  >
                    {l.label}
                    <ChevronDown />
                  </button>
                  {dropdownOpen && (
                    <ServicesDropdown
                      items={l.dropdown}
                      onClose={() => setDropdownOpen(false)}
                    />
                  )}
                </div>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({ isActive }) => `navlink ${isActive ? "navlink--active" : ""}`}
                >
                  {l.label}
                </NavLink>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="nav__actions">
            <Link
              to="/contact"
              className="btn btn--primary"
              onClick={() => { setOpen(false); setDropdownOpen(false); }}
            >
              Get in touch
            </Link>
            {/* <button
              className="iconbtn nav__burger"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Menu"
            >
              <span className="burger" aria-hidden="true" data-open={open ? "true" : "false"} />
            </button> */}
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="nav__mobile">
            <div className="container nav__mobileInner">
              {links.map((l, idx) =>
                l.dropdown ? (
                  // Services section in mobile
                  <div key={l.to}>
                    {/* "Services" parent link */}
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) => `mobilelink ${isActive ? "mobilelink--active" : ""}`}
                      style={{ animationDelay: `${0.04 + idx * 0.04}s` }}
                    >
                      {l.label}
                    </NavLink>

                    {/* Toggle to expand sub-links */}
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                        color: "var(--teal, #14b8a6)",
                        padding: "2px 4px 8px",
                        fontFamily: "inherit",
                      }}
                    >
                      <svg
                        width="10" height="10" viewBox="0 0 12 12" fill="none"
                        style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }}
                      >
                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {mobileServicesOpen ? "Hide" : "Show"} all services
                    </button>

                    {mobileServicesOpen && (
                      <div style={{ paddingLeft: 8, display: "flex", flexDirection: "column", gap: 2, marginBottom: 8 }}>
                        {l.dropdown.map((sub, si) => (
                          <NavLink
                            key={sub.to}
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="mobile-sub-link"
                            style={{ animationDelay: `${si * 0.03}s` }}
                          >
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `mobilelink ${isActive ? "mobilelink--active" : ""}`}
                  >
                    {l.label}
                  </NavLink>
                )
              )}
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