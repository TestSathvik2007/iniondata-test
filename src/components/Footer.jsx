export default function Footer({ navigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-navy text-white pt-20 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_2fr] gap-14 pb-12 border-b border-white/8">

          {/* Brand */}
          <div>
            <button onClick={() => navigate("home")} className="flex items-center gap-2.5 bg-transparent border-none cursor-pointer mb-5">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#0D9488"/>
                <path d="M8 22V14a2 2 0 012-2h3.5L16 8l2.5 4H22a2 2 0 012 2v8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="18" r="3" fill="white" opacity="0.9"/>
              </svg>
              <span className="font-display font-extrabold text-2xl text-white tracking-tight">
                Inion<span className="text-teal-light">Data</span>
              </span>
            </button>
            <p className="text-white/50 text-sm leading-7 mb-6 max-w-xs">
              Transforming business challenges into data-driven opportunities through expert consulting and intelligent staffing.
            </p>
            <div className="flex gap-2">
              {["LinkedIn","Twitter","GitHub"].map(s => (
                <a key={s} href="#" className="px-4 py-1.5 border border-white/12 rounded-full text-xs text-white/50 hover:border-teal hover:text-teal-light transition-all duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Nav grid */}
          <div className="grid grid-cols-3 gap-8">
            {[
              { heading:"Company",  links:[["Home","home"],["About Us","about"],["Careers","careers"]] },
              { heading:"Services", links:[["Staffing Solutions","services"],["Consulting","services"],["Data Analytics","services"],["Cloud Services","services"],["AI & ML","services"]] },
              { heading:"Contact",  info:[["📍","Richmond, VA 23220"],["📞","(804) 877-2171"],["✉️","hello@iniondata.com"],["🕐","Mon–Fri, 9am–6pm EST"]] },
            ].map(col => (
              <div key={col.heading}>
                <h4 className="text-teal-light text-xs font-bold uppercase tracking-widest mb-5">{col.heading}</h4>
                <ul className="flex flex-col gap-2.5 list-none">
                  {col.links?.map(([l,p]) => (
                    <li key={l}>
                      <button onClick={() => navigate(p)} className="text-white/50 hover:text-white text-sm transition-colors duration-200 bg-transparent border-none cursor-pointer p-0">
                        {l}
                      </button>
                    </li>
                  ))}
                  {col.info?.map(([icon, val]) => (
                    <li key={val} className="flex items-start gap-2 text-white/50 text-sm">
                      <span className="shrink-0">{icon}</span>
                      <span>{val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4 text-white/30 text-xs">
          <p>© {year} InionData. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-light transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal-light transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}