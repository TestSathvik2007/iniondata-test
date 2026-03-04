import { useState } from "react";
import { useScrollReveal } from "../components/useScrollReveal";

const services = [
  { icon:"◈", title:"Staffing Solutions",   tag:"Right talent, right now",     color:false, desc:"We connect businesses with top-tier professionals — engineers, data scientists, analysts — precisely matched to your culture and timeline.", features:["Technical screening & vetting","Culture-fit assessment","Contract & full-time placements","Rapid deployment (72hr)"] },
  { icon:"⬡", title:"Consulting Services",  tag:"Strategy meets execution",    color:true,  desc:"Navigate complex IT and data challenges with tailored strategic guidance. Our consultants bring deep expertise across industries.", features:["IT strategy roadmapping","Digital transformation","Technology audits","Change management"] },
  { icon:"◉", title:"Project Management",   tag:"Delivery guaranteed",         color:false, desc:"End-to-end project execution with rigorous oversight, transparent reporting, and commitment to on-time, on-budget delivery.", features:["Agile & waterfall methodologies","Risk management","Stakeholder reporting","Post-delivery optimization"] },
  { icon:"⬥", title:"Data Analytics",       tag:"Insights that drive action",  color:true,  desc:"Transform raw data into powerful business intelligence. We design analytics platforms that surface insights you need to act decisively.", features:["Business intelligence & dashboards","Predictive modeling","Data pipeline engineering","Real-time analytics"] },
  { icon:"◫", title:"Cloud Services",       tag:"Scale without limits",        color:false, desc:"Modernize your infrastructure with cloud-native architectures delivering scalability, security, and performance without operational overhead.", features:["Cloud migration strategy","AWS, Azure & GCP","Cost optimization","Security & compliance"] },
  { icon:"◯", title:"AI & Machine Learning",tag:"Intelligence at scale",       color:true,  desc:"Harness AI to automate processes, surface predictions, and create capabilities impossible with traditional approaches.", features:["ML model development","NLP & computer vision","MLOps & deployment","AI strategy consulting"] },
];
const industries = ["Healthcare","Finance","Retail","Manufacturing","Technology","Government","Education","Energy","Real Estate","Logistics","Media","Non-profit"];
const diffs = [["72hr","Avg talent deployment"],["100%","Delivery accountability"],["NDA+","Confidentiality guaranteed"],["24/7","Support & monitoring"]];

const SectionLabel = ({ children, light }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${light ? "text-teal-light" : "text-teal"}`}>
    <span className={`w-6 h-0.5 rounded ${light ? "bg-teal-light" : "bg-teal"}`} />{children}
  </div>
);

export default function Services({ navigate }) {
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
          <SectionLabel light>Our Services</SectionLabel>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6 animate-fadeUp delay-2">
            Comprehensive solutions<br />
            <span style={{background:"linear-gradient(135deg,#14B8A6,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              built around your goals
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed animate-fadeUp delay-3">
            From talent acquisition to AI transformation — end-to-end services that meet you where you are and take you where you want to be.
          </p>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s,i) => (
              <div key={i} className="group bg-white border border-teal/10 rounded-2xl p-7 hover:border-teal/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-350 relative overflow-hidden reveal" data-delay={i%3+1}>
                <div className="font-display font-extrabold text-6xl text-teal/5 absolute top-4 right-5 leading-none pointer-events-none select-none">0{i+1}</div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 ${s.color ? "bg-amber/10 text-amber-dark" : "bg-teal/10 text-teal"}`}>
                  {s.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal block mb-1">{s.tag}</span>
                <h3 className="font-display font-bold text-xl text-navy mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="flex flex-col gap-2 mb-6 list-none">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-500">
                      <div className="w-4 h-4 rounded-full bg-teal/10 text-teal flex items-center justify-center text-[10px] font-bold shrink-0">✓</div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("contact")}
                  className="flex items-center gap-2 px-5 py-2.5 bg-teal text-white rounded-full text-xs font-semibold hover:bg-teal-dark transition-all duration-300 border-none cursor-pointer">
                  Enquire Now →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <SectionLabel>Industries We Serve</SectionLabel>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-navy tracking-tight">
              Expertise across <span className="text-teal">40+ industries</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {industries.map((ind,i) => (
              <div key={i} className="px-5 py-2.5 border border-teal/15 rounded-full text-sm text-slate-500 font-medium hover:border-teal hover:text-teal hover:bg-teal/5 hover:-translate-y-0.5 transition-all duration-300 reveal cursor-default" data-delay={i%4+1}>
                {ind}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS + RADIAL */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="reveal-left">
              <SectionLabel>Why Choose InionData</SectionLabel>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy leading-tight tracking-tight mb-5">
                The InionData <span className="text-teal">difference</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                We're not a generalist agency. Every service is backed by specialized expertise, proven frameworks, and a commitment to outcomes over outputs.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {diffs.map(([num,label]) => (
                  <div key={num} className="bg-white border border-teal/10 rounded-xl p-5 hover:border-teal hover:shadow-md transition-all duration-300">
                    <div className="font-display font-extrabold text-2xl text-teal mb-1">{num}</div>
                    <div className="text-slate-500 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radial diagram */}
            <div className="reveal-right relative h-96 hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="150" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="4 4"/>
                  <circle cx="200" cy="200" r="90" stroke="#0D9488" strokeWidth="1" fill="none" opacity="0.1" strokeDasharray="4 4"/>
                  {["Staffing","Analytics","Cloud","AI/ML","Consulting","PM"].map((_,i) => {
                    const angle = (i/6)*360;
                    const rad = angle*Math.PI/180;
                    const x = 200+150*Math.cos(rad-Math.PI/2);
                    const y = 200+150*Math.sin(rad-Math.PI/2);
                    return <line key={i} x1="200" y1="200" x2={x} y2={y} stroke="#0D9488" strokeWidth="1" opacity="0.25" strokeDasharray="3 3"/>;
                  })}
                </svg>
                {/* Center */}
                <div className="absolute w-20 h-20 rounded-full bg-teal flex items-center justify-center font-display font-extrabold text-white text-lg animate-float z-10"
                  style={{boxShadow:"0 0 0 12px rgba(13,148,136,0.1),0 0 0 24px rgba(13,148,136,0.05)"}}>ID</div>
                {/* Nodes */}
                {["Staffing","Analytics","Cloud","AI/ML","Consulting","PM"].map((s,i) => {
                  const angle = (i/6)*360;
                  const rad = angle*Math.PI/180;
                  const x = 50+37.5*Math.cos(rad-Math.PI/2);
                  const y = 50+37.5*Math.sin(rad-Math.PI/2);
                  return (
                    <div key={s} className="absolute px-3 py-1.5 bg-white border border-teal/20 rounded-full text-xs font-semibold text-teal-dark shadow-sm hover:bg-teal hover:text-white hover:border-teal transition-all duration-300 cursor-default z-10"
                      style={{left:`${x}%`,top:`${y}%`,transform:"translate(-50%,-50%)"}}>
                      {s}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10 reveal">
          <SectionLabel light>Ready to Get Started?</SectionLabel>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white tracking-tight mb-8">
            Tell us what you need — <span className="text-amber">we'll make it happen</span>
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => navigate("contact")}
              className="px-8 py-4 bg-amber text-navy rounded-full font-semibold text-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 border-none cursor-pointer">
              Start the Conversation
            </button>
            <button onClick={() => navigate("about")}
              className="px-8 py-4 text-white border-2 border-white/30 rounded-full font-semibold text-sm hover:bg-white/10 transition-all duration-300 cursor-pointer bg-transparent">
              About Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}