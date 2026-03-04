import { useState } from "react";
import { useScrollReveal } from "../components/useScrollReveal";

const contactInfo = [
  { icon:"📍", label:"Our Office",    value:"Richmond, VA 23220, United States" },
  { icon:"📞", label:"Call Us",       value:"(804) 877-2171" },
  { icon:"✉️", label:"Email Us",      value:"hello@iniondata.com" },
  { icon:"🕐", label:"Business Hours",value:"Mon – Fri, 9am – 6pm EST" },
];
const serviceOptions = ["Staffing Solutions","Consulting Services","Project Management","Data Analytics","Cloud Services","AI & Machine Learning","Other"];

const SectionLabel = ({ children, light }) => (
  <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${light ? "text-teal-light" : "text-teal"}`}>
    <span className={`w-6 h-0.5 rounded ${light ? "bg-teal-light" : "bg-teal"}`} />{children}
  </div>
);

export default function Contact({ navigate }) {
  useScrollReveal();
  const [form, setForm] = useState({ firstName:"", lastName:"", email:"", company:"", service:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-navy pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-48 w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 -left-12 w-72 h-72 bg-amber/15 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionLabel light>Contact Us</SectionLabel>
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-white leading-tight tracking-tight mb-6 animate-fadeUp delay-2">
            Let's start a<br />
            <span style={{background:"linear-gradient(135deg,#14B8A6,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
              conversation
            </span>
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed animate-fadeUp delay-3">
            Whether you have a specific project in mind or just want to explore possibilities — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">

            {/* Info */}
            <div className="reveal-left">
              <h2 className="font-display font-bold text-3xl text-navy tracking-tight mb-8">
                Get in <span className="text-teal">touch</span>
              </h2>
              <div className="flex flex-col gap-3 mb-8">
                {contactInfo.map((c,i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-white border border-teal/10 rounded-xl hover:border-teal/25 hover:shadow-sm transition-all duration-300">
                    <span className="text-xl shrink-0">{c.icon}</span>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-teal mb-0.5">{c.label}</div>
                      <div className="text-sm text-navy font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Map visual */}
              <div className="h-44 bg-white border border-teal/10 rounded-2xl relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0" style={{backgroundImage:"linear-gradient(rgba(13,148,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.04) 1px,transparent 1px)",backgroundSize:"20px 20px"}} />
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-teal rounded-full border-3 border-white shadow-md relative z-10" />
                    <div className="map-pin-ring" />
                  </div>
                  <div className="mt-3 px-3 py-1 bg-white border border-teal/15 rounded-full text-xs font-semibold text-navy shadow-sm">
                    InionData HQ — Richmond, VA
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white border border-teal/10 rounded-2xl p-8 shadow-sm reveal-right">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center text-3xl text-teal mx-auto mb-5 animate-scaleIn">✓</div>
                  <h3 className="font-display font-bold text-xl text-navy mb-3">Message Received!</h3>
                  <p className="text-slate-500 leading-relaxed mb-6">Thank you for reaching out. Our team will get back to you within 24 business hours.</p>
                  <button className="px-6 py-3 bg-teal text-white rounded-full text-sm font-semibold hover:bg-teal-dark transition-all duration-300 border-none cursor-pointer"
                    onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  <h3 className="font-display font-bold text-xl text-navy mb-1">Send us a message</h3>
                  <p className="text-slate-500 text-sm mb-7">Fill in the details and we'll be in touch shortly.</p>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    {[["firstName","First Name","Jane"],["lastName","Last Name","Doe"]].map(([name,label,ph]) => (
                      <div key={name}>
                        <label className="block text-xs font-semibold text-navy mb-1.5 tracking-wide">{label}</label>
                        <input type="text" name={name} placeholder={ph} value={form[name]} onChange={onChange} required
                          className="form-input w-full px-4 py-3 border border-teal/15 rounded-xl text-sm font-body bg-off-white text-navy placeholder-slate-400 transition-all duration-300" />
                      </div>
                    ))}
                  </div>

                  {[["email","Email Address","email","jane@company.com"],["company","Company (optional)","text","Your company name"]].map(([name,label,type,ph]) => (
                    <div key={name} className="mb-5">
                      <label className="block text-xs font-semibold text-navy mb-1.5 tracking-wide">{label}</label>
                      <input type={type} name={name} placeholder={ph} value={form[name]} onChange={onChange} required={name==="email"}
                        className="form-input w-full px-4 py-3 border border-teal/15 rounded-xl text-sm font-body bg-off-white text-navy placeholder-slate-400 transition-all duration-300" />
                    </div>
                  ))}

                  <div className="mb-5">
                    <label className="block text-xs font-semibold text-navy mb-1.5 tracking-wide">Service of Interest</label>
                    <select name="service" value={form.service} onChange={onChange}
                      className="form-input w-full px-4 py-3 border border-teal/15 rounded-xl text-sm font-body bg-off-white text-navy transition-all duration-300">
                      <option value="">Select a service...</option>
                      {serviceOptions.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="mb-7">
                    <label className="block text-xs font-semibold text-navy mb-1.5 tracking-wide">Your Message</label>
                    <textarea name="message" rows={5} placeholder="Tell us about your project..." value={form.message} onChange={onChange} required
                      className="form-input w-full px-4 py-3 border border-teal/15 rounded-xl text-sm font-body bg-off-white text-navy placeholder-slate-400 transition-all duration-300 resize-none" />
                  </div>

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-teal text-white rounded-full font-semibold text-sm hover:bg-teal-dark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal/30 transition-all duration-300 border-none cursor-pointer">
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-display font-bold text-4xl text-navy tracking-tight">Common questions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              ["How quickly can you deploy talent?","Our average deployment time is 72 hours from initial brief to candidate shortlist. For contract placements, onboarding can begin within the same week."],
              ["Do you work with startups?","Absolutely. We serve businesses of all sizes, from early-stage startups to Fortune 500 enterprises. Our solutions scale to your needs."],
              ["What industries do you specialise in?","We operate across 40+ industries including healthcare, finance, technology, retail, and government. Cross-industry experience is one of our key differentiators."],
              ["Can you handle international projects?","Yes. While headquartered in Richmond, VA, we support clients globally through our distributed team of consultants and advisors."],
            ].map(([q,a],i) => (
              <div key={i} className="p-6 bg-off-white border border-teal/10 rounded-2xl hover:border-teal/20 hover:bg-white hover:shadow-sm transition-all duration-300 reveal" data-delay={i%2+1}>
                <h4 className="font-display font-bold text-base text-navy mb-3">{q}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}