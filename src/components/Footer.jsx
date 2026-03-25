import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <span className="brand__mark" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2l7 4v6c0 5-3 9-7 10-4-1-7-5-7-10V6l7-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9.2 12.2l1.9 1.9 3.7-4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="brand__text brand__text--light">Inion<span>Data</span></span>
          </div>
          <p className="footer__muted">
            A calm, reliable partner for analytics, cloud, and engineering delivery.
          </p>
        </div>

        <div className="footer__cols">
          <div className="footer__col">
            <div className="footer__title">Company</div>
            <Link to="/" className="footer__link">Home</Link>
            <Link to="/about" className="footer__link">About</Link>
            <Link to="/careers" className="footer__link">Careers</Link>
          </div>
          <div className="footer__col">
            <div className="footer__title">Services</div>
            <Link to="/services" className="footer__link">Consulting</Link>
            <Link to="/services" className="footer__link">Staffing</Link>
            <Link to="/services" className="footer__link">Analytics</Link>
          </div>
          <div className="footer__col">
            <div className="footer__title">Contact</div>
            <div className="footer__meta">Richmond, VA</div>
            <div className="footer__meta">(804) 877-2171</div>
            <div className="footer__meta">hello@iniondata.com</div>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <div>© {year} InionData. All rights reserved.</div>
        <div className="footer__bottomLinks">
          <a className="footer__link" href="#">Privacy</a>
          <a className="footer__link" href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}