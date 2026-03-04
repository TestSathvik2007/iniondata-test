import { useEffect, useState } from "react";
import { useScrollReveal } from "../components/useScrollReveal";

function Counter({ target, suffix = "" }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let v = 0; const step = target / 60;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setN(target); clearInterval(t); } else setN(Math.floor(v));
    }, 25);
    return () => clearInterval(t);
  }, [target]);
  return <>{n}{suffix}</>;
}

const stats = [
  { value: 98,  suffix: "%", label: "Client Retention" },
  { value: 250, suffix: "+", label: "Projects Delivered" },
  { value: 12,  suffix: "+", label: "Years Experience" },
  { value: 40,  suffix: "+", label: "Industries Served" },
];

const services = [
  { icon: "◈", title: "Staffing Solutions",  desc: "Top-tier professionals precisely matched to your requirements and culture.", amber: false },
  { icon: "⬡", title: "Consulting Services", desc: "Navigate complex IT challenges with tailored strategic guidance.", amber: true },
  { icon: "◉", title: "Project Management",  desc: "End-to-end execution with rigorous oversight and guaranteed delivery.", amber: false },
  { icon: "⬥", title: "Data Analytics",      desc: "Transform raw data into actionable insights that drive decisions.", amber: true },
];

const steps = [
  { num: "01", title: "Discovery & Strategy", desc: "We thoroughly understand your objectives and build a tailored roadmap." },
  { num: "02", title: "Solution Design",      desc: "Bespoke solutions aligned with your budget, timeline, and vision." },
  { num: "03", title: "Agile Execution",      desc: "Iterative delivery with continuous feedback at every milestone." },
  { num: "04", title: "Optimize & Scale",     desc: "We monitor, refine, and scale to maximise long-term ROI." },
];

export default function Home({ navigate }) {
  useScrollReveal();
  const [statsOn, setStatsOn] = useState(false);

  useEffect(() => {
    const el = document.getElementById("stats-sec");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsOn(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* ─── shared inline style helpers ─── */
  const S = {
    hero: { minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#f8fafc 0%,rgba(13,148,136,0.06) 50%,#f0fdf4 100%)", paddingTop: "7rem" },
    container: { maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 },
    orb1: { position:"absolute", top:-100, right:-100, width:550, height:550, borderRadius:"50%", background:"radial-gradient(circle,rgba(13,148,136,0.22) 0%,transparent 70%)", filter:"blur(80px)", animation:"float 8s ease-in-out infinite", pointerEvents:"none" },
    orb2: { position:"absolute", bottom:50, left:-50,  width:380, height:380, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,158,11,0.18) 0%,transparent 70%)",  filter:"blur(70px)", animation:"float 8s ease-in-out infinite", animationDelay:"-4s", pointerEvents:"none" },
    badge: { display:"inline-flex", alignItems:"center", gap:8, padding:"6px 16px 6px 10px", background:"rgba(13,148,136,0.1)", border:"1px solid rgba(13,148,136,0.22)", borderRadius:9999, fontSize:"0.75rem", fontWeight:600, color:"#0F766E", letterSpacing:"0.02em", marginBottom:"1.5rem" },
    h1: { fontFamily:"Syne,sans-serif", fontSize:"clamp(3rem,7vw,5.5rem)", fontWeight:800, lineHeight:1.06, letterSpacing:"-0.03em", color:"#0F172A", marginBottom:"1.25rem" },
    sub: { fontSize:"1.1rem", color:"#64748B", maxWidth:500, lineHeight:1.75, marginBottom:"2.5rem" },
    ctas: { display:"flex", gap:12, flexWrap:"wrap", marginBottom:"2.5rem" },
    trust: { display:"flex", alignItems:"center", gap:12 },
    avatars: { display:"flex" },
    avatar: (c,i) => ({ width:36, height:36, borderRadius:"50%", border:"2px solid #fff", background:c, marginLeft: i===0?0:-8, zIndex:4-i }),
    trustTxt: { fontSize:"0.875rem", color:"#64748B" },
    /* stats */
    statsSec: { background:"#0F172A", padding:"60px 0" },
    statsGrid: { display:"grid", gridTemplateColumns:"repeat(4,1fr)" },
    statCard: (i) => ({ padding:"2.5rem", textAlign:"center", borderRight: i<3 ? "1px solid rgba(255,255,255,0.06)" : "none" }),
    statNum: { fontFamily:"Syne,sans-serif", fontSize:"3rem", fontWeight:800, letterSpacing:"-0.03em", background:"linear-gradient(135deg,#fff,#14B8A6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1, marginBottom:8 },
    statLbl: { fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", marginBottom:12 },
    barTrack: { height:2, background:"rgba(255,255,255,0.08)", borderRadius:9999, overflow:"hidden" },
    /* section */
    secPad: { padding:"100px 0" },
    label: { display:"inline-flex", alignItems:"center", gap:8, fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:"#0D9488", marginBottom:16 },
    labelBar: { width:22, height:2, background:"#0D9488", borderRadius:2, display:"inline-block" },
    h2: { fontFamily:"Syne,sans-serif", fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700, lineHeight:1.15, letterSpacing:"-0.025em", color:"#0F172A" },
    /* service card */
    svcCard: { background:"#fff", border:"1px solid rgba(13,148,136,0.12)", borderRadius:20, padding:"1.75rem", transition:"all 0.35s ease", cursor:"pointer", position:"relative", overflow:"hidden" },
    svcIcon: (amber) => ({ width:52, height:52, borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.4rem", marginBottom:20, background: amber ? "rgba(245,158,11,0.1)" : "rgba(13,148,136,0.1)", color: amber ? "#D97706" : "#0D9488" }),
    /* navy bg */
    navyBg: { background:"#0F172A", padding:"100px 0", position:"relative", overflow:"hidden" },
    glow: { position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:700, height:350, background:"radial-gradient(ellipse,rgba(13,148,136,0.18) 0%,transparent 70%)", pointerEvents:"none" },
  };

  return (
    <div>
      {/* ── HERO ── */}
      <section style={S.hero}>
        <div style={S.orb1} /><div style={S.orb2} />
        <div className="hero-grid-bg" />
        <div style={S.container}>
          <div style={S.badge} className="animate-fadeUp delay-1">
            <span className="badge-dot" />
            Trusted Data & Consulting Partner
          </div>
          <h1 style={S.h1} className="animate-fadeUp delay-2">
            Intelligent<br />
            <span className="gradient-text">Data-Driven</span><br />
            Consulting
          </h1>
          <p style={S.sub} className="animate-fadeUp delay-3">
            Empowering your growth through expert staffing, strategic consulting, and end-to-end data solutions.
          </p>
          <div style={S.ctas} className="animate-fadeUp delay-4">
            <button className="btn-teal" onClick={() => navigate("contact")}>
              Get In Touch
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn-outline-teal" onClick={() => navigate("services")}>Our Services</button>
          </div>
          <div style={S.trust} className="animate-fadeUp delay-5">
            <div style={S.avatars}>
              {["#0D9488","#0F766E","#14B8A6","#0F172A"].map((c,i) => <div key={i} style={S.avatar(c,i)} />)}
            </div>
            <p style={S.trustTxt}><strong style={{color:"#0F172A"}}>250+ clients</strong> trust InionData</p>
          </div>
        </div>
        {/* Scroll hint */}
        <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, zIndex:2 }} className="animate-fadeUp delay-8">
          <div style={{ width:1, height:40, background:"linear-gradient(to bottom,#0D9488,transparent)", animation:"float 2s ease-in-out infinite" }} />
          <span style={{ fontSize:"0.65rem", letterSpacing:"0.15em", textTransform:"uppercase", color:"#94A3B8" }}>Scroll</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats-sec" style={S.statsSec} className={statsOn ? "stats-visible" : ""}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 2rem" }}>
          <div style={S.statsGrid}>
            {stats.map((s,i) => (
              <div key={i} style={S.statCard(i)} className="reveal" data-delay={i+1}>
                <div style={S.statNum}>{statsOn ? <Counter target={s.value} suffix={s.suffix} /> : `0${s.suffix}`}</div>
                <p style={S.statLbl}>{s.label}</p>
                <div style={S.barTrack}>
                  <div className="stat-bar-fill" style={{ transitionDelay:`${i*0.12}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ ...S.secPad, background:"#F8FAFC" }}>
        <div style={S.container}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"end", marginBottom:"3.5rem" }}>
            <div className="reveal-left">
              <div style={S.label}><span style={S.labelBar} />Our Services</div>
              <h2 style={S.h2}>Extensive array of <span style={{ color:"#0D9488" }}>customized solutions</span></h2>
            </div>
            <div className="reveal-right" style={{ display:"flex", flexDirection:"column", gap:16, alignItems:"flex-start" }}>
              <p style={{ color:"#64748B", lineHeight:1.75 }}>Unlock your potential with our suite of services designed to propel you towards sustainable success.</p>
              <button className="btn-outline-teal" onClick={() => navigate("services")}>View All Services</button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
            {services.map((s,i) => (
              <div key={i} className="reveal" data-delay={i+1}
                style={S.svcCard}
                onClick={() => navigate("services")}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 16px 48px rgba(13,148,136,0.12)"; e.currentTarget.style.borderColor="rgba(13,148,136,0.28)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; e.currentTarget.style.borderColor="rgba(13,148,136,0.12)"; }}
              >
                <div style={S.svcIcon(s.amber)}>{s.icon}</div>
                <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"1rem", color:"#0F172A", marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:"0.85rem", color:"#64748B", lineHeight:1.7, marginBottom:16 }}>{s.desc}</p>
                <span style={{ fontSize:"0.82rem", fontWeight:600, color:"#0D9488", display:"flex", alignItems:"center", gap:6 }}>
                  Learn more <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section style={{ ...S.secPad, background:"#fff", overflow:"hidden" }}>
        <div style={S.container}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
            {/* Visual */}
            <div className="reveal-left" style={{ position:"relative", height:400 }}>
              <div style={{ position:"absolute", inset:0, background:"#0F172A", borderRadius:20, padding:"1.75rem", overflow:"hidden" }}>
                <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"28px 28px" }} />
                <div style={{ position:"relative", display:"inline-flex", flexDirection:"column", background:"rgba(13,148,136,0.2)", border:"1px solid rgba(13,148,136,0.3)", borderRadius:12, padding:"0.75rem 1.25rem", marginBottom:"1.25rem" }}>
                  <span style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"2rem", color:"#14B8A6", lineHeight:1 }}>98%</span>
                  <span style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.5)", marginTop:2 }}>Client Satisfaction</span>
                </div>
                <div style={{ position:"relative", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, padding:"1.25rem" }}>
                  <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:110, marginBottom:10 }}>
                    {[60,80,55,90,70,95,85].map((h,i) => (
                      <div key={i} className={`chart-bar ${i%2===0?"teal":"amber"}`} style={{ height:`${h}%`, animationDelay:`${i*0.1}s` }} />
                    ))}
                  </div>
                  <p style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Revenue Growth</p>
                </div>
              </div>
              {/* Badge */}
              <div className="animate-float" style={{ position:"absolute", bottom:-16, right:-16, display:"flex", alignItems:"center", gap:12, background:"#fff", borderRadius:14, padding:"0.75rem 1.25rem", boxShadow:"0 12px 40px rgba(0,0,0,0.12)" }}>
                <span style={{ fontSize:"1.5rem" }}>🚀</span>
                <div>
                  <div style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#0F172A" }}>250+ Projects</div>
                  <div style={{ fontSize:"0.72rem", color:"#64748B" }}>Successfully delivered</div>
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="reveal-right">
              <div style={S.label}><span style={S.labelBar} />About InionData</div>
              <h2 style={S.h2}>Your trusted partner in <span style={{ color:"#0D9488" }}>data intelligence</span></h2>
              <p style={{ marginTop:20, color:"#64748B", lineHeight:1.8 }}>We've quickly established ourselves as a trusted partner for businesses seeking strategic IT support. Our multidisciplinary team brings together expertise to tackle your most complex challenges.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10, margin:"1.5rem 0" }}>
                {["Expert team of 100+ certified professionals","End-to-end delivery with full accountability","Industry-agnostic approach and deep domain expertise"].map((f,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:"0.875rem", color:"#64748B" }}>
                    <div style={{ width:20, height:20, borderRadius:"50%", background:"rgba(13,148,136,0.1)", color:"#0D9488", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"0.65rem", fontWeight:700, flexShrink:0, marginTop:1 }}>✓</div>
                    {f}
                  </div>
                ))}
              </div>
              <button className="btn-teal" onClick={() => navigate("about")}>
                Learn About Us
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ ...S.secPad, background:"#F8FAFC" }}>
        <div style={S.container}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:60 }}>
            <div style={S.label}><span style={S.labelBar} />Our Process</div>
            <h2 style={S.h2}>From Vision to <span style={{ color:"#F59E0B" }}>Victory</span></h2>
            <p style={{ color:"#64748B", marginTop:12, maxWidth:480, margin:"12px auto 0" }}>Our methodical approach ensures every engagement delivers measurable outcomes.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"2rem", position:"relative" }}>
            <div style={{ display:"none", position:"absolute", top:27, left:"10%", right:"10%", height:1, background:"linear-gradient(90deg,#0D9488,#F59E0B,#0D9488)", opacity:0.2 }} className="process-line" />
            {steps.map((s,i) => (
              <div key={i} className="reveal" data-delay={i+1} style={{ display:"flex", flexDirection:"column" }}>
                <div style={{ width:54, height:54, borderRadius:"50%", border:"2px solid #0D9488", background:"rgba(13,148,136,0.1)", color:"#0D9488", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"0.8rem", marginBottom:20, transition:"all 0.3s ease", cursor:"default" }}
                  onMouseEnter={e => { e.currentTarget.style.background="#0D9488"; e.currentTarget.style.color="#fff"; e.currentTarget.style.transform="scale(1.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="rgba(13,148,136,0.1)"; e.currentTarget.style.color="#0D9488"; e.currentTarget.style.transform="none"; }}
                >{s.num}</div>
                <h3 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"1rem", color:"#0F172A", marginBottom:8 }}>{s.title}</h3>
                <p style={{ fontSize:"0.85rem", color:"#64748B", lineHeight:1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INFOGRAPHICS ── */}
      <section style={{ ...S.secPad, background:"#fff" }}>
        <div style={S.container}>
          <div className="reveal" style={{ textAlign:"center", marginBottom:56 }}>
            <div style={S.label}><span style={S.labelBar} />Why InionData</div>
            <h2 style={S.h2}>The numbers speak for themselves</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.25rem" }}>
            {/* Donut */}
            <div className="reveal card" data-delay="1" style={{ padding:"1.75rem", borderRadius:20, border:"1px solid rgba(13,148,136,0.12)" }}>
              <div style={{ position:"relative", width:80, height:80, marginBottom:20 }}>
                <svg viewBox="0 0 80 80" style={{ width:"100%", height:"100%" }}>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(13,148,136,0.1)" strokeWidth="8"/>
                  <circle cx="40" cy="40" r="30" fill="none" stroke="#0D9488" strokeWidth="8" strokeDasharray="170 188" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne,sans-serif", fontWeight:800, color:"#0D9488", fontSize:"0.95rem" }}>90%</div>
              </div>
              <h4 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#0F172A", marginBottom:6 }}>On Time & Budget</h4>
              <p style={{ fontSize:"0.8rem", color:"#64748B", lineHeight:1.6 }}>9/10 engagements without scope creep</p>
            </div>
            {/* Bars */}
            <div className="reveal" data-delay="2" style={{ padding:"1.75rem", borderRadius:20, border:"1px solid rgba(13,148,136,0.12)" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:16 }}>
                {[["Staffing",95],["Consulting",88],["Analytics",92]].map(([l,p]) => (
                  <div key={l}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:"0.75rem", color:"#64748B", fontWeight:500, marginBottom:4 }}><span>{l}</span><span>{p}%</span></div>
                    <div style={{ height:6, background:"rgba(13,148,136,0.1)", borderRadius:9999, overflow:"hidden" }}>
                      <div className="ibar-fill" style={{"--fill-w":`${p}%`}} />
                    </div>
                  </div>
                ))}
              </div>
              <h4 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#0F172A" }}>Service Excellence</h4>
            </div>
            {/* Rating */}
            <div className="reveal" data-delay="3" style={{ padding:"1.75rem", borderRadius:20, background:"#0F172A", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
              <div style={{ fontFamily:"Syne,sans-serif", fontWeight:800, fontSize:"3.5rem", color:"#14B8A6", lineHeight:1 }}>4.9</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:"1rem", marginBottom:8 }}>/5</div>
              <div style={{ color:"#F59E0B", fontSize:"1.1rem", letterSpacing:4, marginBottom:10 }}>★★★★★</div>
              <h4 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#fff", marginBottom:6 }}>Avg Client Rating</h4>
              <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.4)" }}>Based on 180+ reviews</p>
            </div>
            {/* Map */}
            <div className="reveal" data-delay="4" style={{ padding:"1.75rem", borderRadius:20, border:"1px solid rgba(13,148,136,0.12)" }}>
              <div style={{ height:96, background:"rgba(13,148,136,0.04)", borderRadius:12, marginBottom:16, position:"relative", overflow:"hidden" }}>
                {[{t:"30%",l:"20%"},{t:"45%",l:"50%"},{t:"60%",l:"75%"},{t:"25%",l:"65%"},{t:"70%",l:"35%"}].map((p,i) => (
                  <div key={i} style={{ position:"absolute", width:10, height:10, background:"#0D9488", borderRadius:"50%", border:"2px solid white", top:p.t, left:p.l }} />
                ))}
                <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%" }} viewBox="0 0 200 100" preserveAspectRatio="none">
                  <path d="M40 30 Q100 45 150 60" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3"/>
                  <path d="M40 30 Q60 55 70 70" stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="3 3"/>
                </svg>
              </div>
              <h4 style={{ fontFamily:"Syne,sans-serif", fontWeight:700, fontSize:"0.9rem", color:"#0F172A", marginBottom:6 }}>Global Reach</h4>
              <p style={{ fontSize:"0.8rem", color:"#64748B", lineHeight:1.6 }}>40+ industries worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={S.navyBg}>
        <div style={S.glow} />
        <div style={{ ...S.container, textAlign:"center" }} className="reveal">
          <div style={{ ...S.label, color:"#14B8A6" }}><span style={{ ...S.labelBar, background:"#14B8A6" }} />Ready to Get Started?</div>
          <h2 style={{ ...S.h2, color:"#fff", marginBottom:20 }}>
            Let's build something <span style={{ color:"#F59E0B" }}>extraordinary</span> together
          </h2>
          <p style={{ color:"rgba(255,255,255,0.55)", maxWidth:480, margin:"0 auto 2.5rem", lineHeight:1.75 }}>
            Whether you need expert talent, strategic guidance, or data-driven insights — we're here to make it happen.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button className="btn-amber" onClick={() => navigate("contact")}>
              Start the Conversation
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button className="btn-outline-white" onClick={() => navigate("services")}>Explore Services</button>
          </div>
        </div>
      </section>
    </div>
  );
}