import { useScrollReveal } from "../components/useScrollReveal";

const values = [
  { icon:"◈", title:"Data-Driven",  desc:"Every decision we make is grounded in evidence, analytics, and measurable outcomes." },
  { icon:"⬡", title:"Client-First", desc:"Your success is our success. We go beyond deliverables to build lasting partnerships." },
  { icon:"◉", title:"Innovation",   desc:"We continuously explore emerging technologies to stay ahead for our clients." },
  { icon:"⬥", title:"Integrity",    desc:"Transparent, honest, and accountable in everything we do — always." },
];
const team = [
  { name:"Aisha Thompson", role:"Chief Executive Officer",  color:"#0D9488" },
  { name:"Marcus Chen",    role:"Head of Consulting",       color:"#0F172A" },
  { name:"Priya Patel",    role:"Data Solutions Lead",      color:"#F59E0B" },
  { name:"James Okafor",   role:"Staffing Director",        color:"#14B8A6" },
];
const milestones = [
  { year:"2012", event:"InionData founded with a vision to democratize data consulting" },
  { year:"2015", event:"Expanded to serve enterprise clients across 15 industries" },
  { year:"2018", event:"Launched proprietary analytics platform InionInsights" },
  { year:"2021", event:"Reached 200+ clients milestone, opened second office" },
  { year:"2024", event:"Named Top 50 Data Consulting Firms by BI Review" },
];

const SectionLabel = ({ children, light }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${light ? "text-teal-light" : "text-teal"}`}>
    <span className={`w-6 h-0.5 rounded ${light ? "bg-teal-light" : "bg-teal"}`} />{children}
  </div>
);

export default function About({ navigate }) {
  useScrollReveal();
  return (
    <div>
      {/* HERO */}
      <section className="relative bg-navy pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-48 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -left-12 w-72 h-72 bg-amber/15 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel light>About InionData</SectionLabel>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6 animate-fadeUp delay-2">
            More than consultants —<br />
            <span style={{background:"linear-gradient(135deg,#14B8A6,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              your growth partners
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed animate-fadeUp delay-3">
            A team of passionate data scientists, strategists, and technology experts committed to transforming how businesses leverage data and talent.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon:"🎯", title:"Our Mission", bg:false, desc:"To empower businesses of all sizes to unlock the full potential of their data, talent, and technology — enabling smarter decisions and lasting advantage." },
              { icon:"🔭", title:"Our Vision",  bg:true,  desc:"To be the world's most trusted data consulting partner — known not just for what we build, but for the transformational impact we create for every client." },
              { icon:"💡", title:"Our Approach",bg:false, desc:"We combine deep domain expertise with agile delivery to create solutions that are technically excellent and genuinely transformative for your business." },
            ].map((c,i) => (
              <div key={i} className={`p-8 rounded-2xl border transition-all duration-350 hover:shadow-xl hover:-translate-y-1 reveal ${c.bg ? "bg-teal border-transparent text-white" : "bg-white border-teal/10"}`} data-delay={i+1}>
                <div className="text-3xl mb-4">{c.icon}</div>
                <h3 className={`font-display font-bold text-lg mb-3 ${c.bg ? "text-white" : "text-navy"}`}>{c.title}</h3>
                <p className={`text-sm leading-relaxed ${c.bg ? "text-white/80" : "text-slate-500"}`}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY + TIMELINE */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="reveal-left">
              <SectionLabel>Our Story</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-6">
                Built on the belief that <span className="text-teal">data changes everything</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                InionData was founded in 2012 by a team of data scientists and business strategists who saw a gap: most consulting firms were either too technical or too strategic, but rarely both. We set out to bridge that divide.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Today, 100+ experts serve clients across 40 industries worldwide. But our core belief remains — the right data, in the right hands, at the right time, transforms organizations.
              </p>
            </div>

            <div className="reveal-right relative pl-14 timeline-line">
              {milestones.map((m,i) => (
                <div key={i} className="grid grid-cols-[56px_16px_1fr] items-start gap-3 pb-8 relative">
                  <span className="font-display font-bold text-xs text-teal text-right pt-0.5">{m.year}</span>
                  <div className="relative">
                    <div className="w-3 h-3 bg-teal rounded-full border-2 border-white shadow-sm mt-1 relative z-10" style={{boxShadow:"0 0 0 3px rgba(13,148,136,0.2)"}} />
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed pt-0.5">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14 reveal">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy tracking-tight">
              Principles that guide <span className="text-teal">everything we do</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v,i) => (
              <div key={i} className="bg-white border border-teal/10 rounded-2xl p-6 hover:border-teal hover:shadow-lg hover:-translate-y-1 transition-all duration-350 reveal" data-delay={i+1}>
                <div className="text-3xl text-teal mb-4">{v.icon}</div>
                <h3 className="font-display font-bold text-base text-navy mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12 reveal">
            <SectionLabel>Leadership Team</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy tracking-tight">
              The minds behind <span className="text-amber">InionData</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t,i) => (
              <div key={i} className="text-center border border-teal/10 rounded-2xl p-6 hover:border-teal/25 hover:shadow-lg hover:-translate-y-1 transition-all duration-350 reveal" data-delay={i+1}>
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 font-display font-extrabold text-2xl text-white" style={{background:t.color}}>
                  {t.name.split(" ").map(n=>n[0]).join("")}
                </div>
                <h4 className="font-display font-bold text-sm text-navy">{t.name}</h4>
                <p className="text-slate-500 text-xs mb-3">{t.role}</p>
                <span className="inline-block px-3 py-1 border border-teal/15 rounded-full text-xs text-slate-500 hover:border-teal hover:text-teal transition-all duration-200 cursor-pointer">
                  LinkedIn ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 reveal">
          <SectionLabel light>Join Our Journey</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white leading-tight tracking-tight mb-8">
            Want to work with us or<br /><span className="text-amber">join the team?</span>
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("contact")}
              className="px-8 py-4 bg-amber text-navy rounded-full font-semibold text-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 border-none cursor-pointer">
              Get In Touch
            </button>
            <button onClick={() => navigate("careers")}
              className="px-8 py-4 text-white border-2 border-white/30 rounded-full font-semibold text-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 cursor-pointer bg-transparent">
              View Careers
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}