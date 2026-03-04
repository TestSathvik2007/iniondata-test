import { useState } from "react";
import { useScrollReveal } from "../components/useScrollReveal";

const benefits = [
  { icon:"🏥", title:"Full Health Coverage",  desc:"Medical, dental, and vision for you and your family" },
  { icon:"💰", title:"Competitive Comp",       desc:"Market-beating salaries + performance bonuses" },
  { icon:"🌍", title:"Remote-First",           desc:"Work from anywhere with async-friendly culture" },
  { icon:"📚", title:"$2k Learning Budget",    desc:"Annual budget for courses and conferences" },
  { icon:"🕐", title:"Flexible Hours",         desc:"Results-driven, not hours-driven approach" },
  { icon:"✈️", title:"Annual Retreats",        desc:"Company-wide offsites to connect and recharge" },
];
const openings = [
  { title:"Senior Data Engineer",         dept:"Engineering", type:"Full-time", location:"Remote / Richmond, VA", level:"Senior" },
  { title:"Business Intelligence Analyst",dept:"Analytics",   type:"Full-time", location:"Richmond, VA",          level:"Mid" },
  { title:"IT Staffing Specialist",       dept:"Staffing",    type:"Full-time", location:"Remote",                level:"Mid" },
  { title:"Solutions Architect",          dept:"Consulting",  type:"Full-time", location:"Remote / Hybrid",       level:"Senior" },
  { title:"Machine Learning Engineer",    dept:"AI",          type:"Contract",  location:"Remote",                level:"Senior" },
  { title:"Junior Data Analyst",          dept:"Analytics",   type:"Full-time", location:"Richmond, VA",          level:"Junior" },
];
const depts = ["All","Engineering","Analytics","Staffing","Consulting","AI"];
const levelColor = { Senior:"bg-teal/10 text-teal-dark", Mid:"bg-amber/10 text-amber-dark", Junior:"bg-slate-100 text-slate-500" };

const SectionLabel = ({ children, light }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${light ? "text-teal-light" : "text-teal"}`}>
    <span className={`w-6 h-0.5 rounded ${light ? "bg-teal-light" : "bg-teal"}`} />{children}
  </div>
);

export default function Careers({ navigate }) {
  useScrollReveal();
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);
  const filtered = filter === "All" ? openings : openings.filter(j => j.dept === filter);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-navy pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-48 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -left-12 w-72 h-72 bg-amber/15 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel light>Careers at InionData</SectionLabel>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6 animate-fadeUp delay-2">
            Shape the future of<br />
            <span style={{background:"linear-gradient(135deg,#14B8A6,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              data-driven business
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-8 animate-fadeUp delay-3">
            Join a team of passionate experts building next-generation data and consulting solutions. We move fast, think deep, and grow together.
          </p>
          <div className="flex gap-3 flex-wrap animate-fadeUp delay-4">
            {[["100+","Team Members"],["4.8★","Glassdoor Rating"],["Remote-first","Culture"]].map(([bold, label]) => (
              <div key={label} className="flex items-center gap-1.5 px-4 py-2 bg-white/8 border border-white/12 rounded-full text-xs text-white/70">
                <strong className="text-teal-light">{bold}</strong> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SectionLabel>Why Join Us</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy tracking-tight">
              We invest in <span className="text-teal">our people</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b,i) => (
              <div key={i} className="bg-white border border-teal/10 rounded-2xl p-6 hover:border-teal/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-350 reveal" data-delay={i%3+1}>
                <div className="text-3xl mb-4">{b.icon}</div>
                <h4 className="font-display font-bold text-base text-navy mb-1">{b.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-left">
              <SectionLabel>Our Culture</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-5">
                Where curious minds <span className="text-amber">thrive</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-6">
                At InionData, we believe the best work happens when people feel trusted, challenged, and supported. We're humble experts who love solving hard problems — and who celebrate wins together.
              </p>
              <div className="flex flex-col gap-3">
                {["High ownership, low bureaucracy","Direct feedback, kind delivery","Diverse perspectives, one mission","Build → Learn → Iterate"].map((v,i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-2 h-2 bg-teal rounded-full shrink-0" />
                    {v}
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right grid grid-cols-2 gap-4">
              {[{e:"🚀",t:"Fast-paced & ambitious"},{e:"🤝",t:"Collaborative & inclusive"},{e:"📊",t:"Data-informed decisions"},{e:"🌱",t:"Growth mindset"}].map((c,i) => (
                <div key={i} className="bg-off-white border border-teal/10 rounded-2xl p-5 hover:border-teal/20 hover:bg-white transition-all duration-300 animate-float" style={{animationDelay:`${i*0.2}s`}}>
                  <span className="text-3xl block mb-3">{c.e}</span>
                  <p className="font-semibold text-sm text-navy">{c.t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* JOBS */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 reveal">
            <div>
              <SectionLabel>Open Positions</SectionLabel>
              <h2 className="font-display font-bold text-4xl text-navy tracking-tight">
                Find your <span className="text-teal">next role</span>
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {depts.map(d => (
                <button key={d} onClick={() => setFilter(d)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-250 cursor-pointer
                    ${filter===d ? "bg-teal text-white border-teal" : "bg-white text-slate-500 border-teal/15 hover:border-teal hover:text-teal"}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map((job,i) => (
              <div key={i} className={`bg-white border rounded-2xl overflow-hidden transition-all duration-350 cursor-pointer reveal ${expanded===i ? "border-teal shadow-md" : "border-teal/10 hover:border-teal/25 hover:shadow-sm"}`}
                data-delay={i%3+1} onClick={() => setExpanded(expanded===i ? null : i)}>
                <div className="flex items-center justify-between gap-4 p-6 flex-wrap">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-0.5">{job.dept}</div>
                    <h3 className="font-display font-bold text-lg text-navy mb-2">{job.title}</h3>
                    <div className="flex gap-2 flex-wrap">
                      {[job.type, job.location].map(t => (
                        <span key={t} className="px-3 py-1 bg-off-white border border-teal/10 rounded-full text-xs text-slate-500 font-medium">{t}</span>
                      ))}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${levelColor[job.level]}`}>{job.level}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button onClick={e => { e.stopPropagation(); navigate("contact"); }}
                      className="px-5 py-2.5 bg-teal text-white rounded-full text-xs font-semibold hover:bg-teal-dark transition-all duration-300 border-none cursor-pointer">
                      Apply Now
                    </button>
                    <div className={`w-8 h-8 rounded-full border border-teal/15 flex items-center justify-center text-slate-400 text-sm transition-all duration-300 ${expanded===i ? "bg-teal text-white border-teal" : ""}`}>
                      {expanded===i ? "↑" : "↓"}
                    </div>
                  </div>
                </div>
                {expanded === i && (
                  <div className="px-6 pb-6 pt-0 border-t border-teal/8 animate-fadeIn">
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">
                      We're looking for a talented {job.title} to join our growing {job.dept} team. You'll work on high-impact projects with a collaborative team of experts who care deeply about quality and craft.
                    </p>
                    <div>
                      <strong className="text-xs text-navy font-bold uppercase tracking-wider">Key Requirements</strong>
                      <ul className="mt-2 list-none flex flex-col gap-1.5">
                        {["3+ years of relevant experience","Strong communication and collaboration","Proven track record of delivering results","Passion for continuous learning and growth"].map(r => (
                          <li key={r} className="flex items-center gap-2.5 text-sm text-slate-500">
                            <div className="w-4 h-4 rounded-full bg-teal/10 text-teal flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12 reveal">
            <p className="text-slate-500 text-sm mb-4">Don't see a perfect fit? We're always looking for exceptional talent.</p>
            <button onClick={() => navigate("contact")}
              className="px-7 py-3.5 text-teal border-2 border-teal rounded-full font-semibold text-sm hover:bg-teal hover:text-white transition-all duration-300 cursor-pointer bg-transparent">
              Send Us Your Resume
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}