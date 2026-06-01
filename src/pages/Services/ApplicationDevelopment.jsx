import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useReveal, ANIM_CSS } from "../../animations";

// ── DATA ─────────────────────────────────────────

const servicePillars = [
  {
    id: "build",
    icon: "⚡",
    title: "Build",
    short: "Design & Development",
    desc: "From rich UI/UX prototypes through to production-ready full-stack applications. We architect, build, and launch at enterprise scale.",
    items: [
      "Rich UI/UX design, prototyping & QA builds",
      "Full-stack web & mobile application development",
      "Greenfield builds and heritage portfolio modernisation",
      "Agile sprints with CI/CD automation",
      "Agile methods — weeks to release, not months",
    ],
  },
  {
    id: "integrate",
    icon: "🔗",
    title: "Integrate",
    short: "APIs & Connectivity",
    desc: "Connect your applications, data sources, and third-party tools into one coherent ecosystem — eliminating silos and manual handoffs.",
    items: [
      "REST & GraphQL API design and development",
      "Third-party connector & webhook integrations",
      "Microsoft Teams bots, tabs & message extensions",
      "ERP, CRM, and HRIS system connectors",
      "Event-driven architecture with Kafka / SQS",
    ],
  },
  {
    id: "teams",
    icon: "💬",
    title: "Teams Apps",
    short: "Microsoft Teams",
    desc: "Bring critical workflows directly into Teams — the platform your people are already in. We build bots, tabs, meeting integrations, and message extensions.",
    items: [
      "Conversational bots for approvals, helpdesk & HR",
      "Message extensions pulling CRM / ticket data live",
      "Full web apps embedded as interactive tabs",
      "In-meeting sidepanels & automated summaries",
      "Azure AD / SSO authentication built in",
    ],
  },
  {
    id: "maintain",
    icon: "🛡️",
    title: "Maintain",
    short: "Support & Optimisation",
    desc: "Post-launch isn't an afterthought — it's built into every engagement. We monitor, optimise, and evolve your systems as your business grows.",
    items: [
      "24/7 monitoring, alerting & incident response",
      "Performance tuning and load optimisation",
      "Security patching and dependency management",
      "Feature iterations based on real-user data",
      "Documented handover + knowledge transfer",
    ],
  },
];

const capabilities = [
  {
    icon: "🚀",
    title: "Agile Methods & Rapid Deployment",
    desc: "What used to take developers months to release can now take mere seconds to deploy. We implement next-generation processes defined by speed, efficiency, and resilience.",
    stat: "10×", statLabel: "faster releases",
  },
  {
    icon: "⚙️",
    title: "Automation & Business Integration",
    desc: "Adding automation and business integration into the development process makes for a highly efficient workflow — minimising manual effort and reducing time-to-market.",
    stat: "60%", statLabel: "effort reduction",
  },
  {
    icon: "🏗️",
    title: "Heritage Portfolio Modernisation",
    desc: "Transforming legacy monolithic systems into flexible, modular application portfolios that adapt to a changing marketplace without losing institutional knowledge.",
    stat: "100%", statLabel: "portfolio coverage",
  },
  {
    icon: "🌐",
    title: "Digital Transformation & CX",
    desc: "Adopting the agile approach enables organisations to keep pace with the competition and deliver positive customer experiences in a changing marketplace.",
    stat: "Enterprise", statLabel: "scale delivery",
  },
];

const teamsBuilds = [
  {
    icon: "🤖",
    title: "Intelligent Bots",
    desc: "Automate approval workflows, answer internal queries, surface CRM data, and trigger external APIs — all within a Teams chat.",
    example: "e.g. HR leave bot, IT helpdesk bot, sales pipeline bot",
  },
  {
    icon: "🔍",
    title: "Message Extensions",
    desc: "Pull external data — tickets, records, inventory — directly into any Teams conversation without context switching.",
    example: "e.g. Jira ticket preview, order status lookup",
  },
  {
    icon: "📱",
    title: "Embedded Tab Apps",
    desc: "Full web applications rendered inside Teams as interactive tabs — dashboards, approval tools, internal portals.",
    example: "e.g. Project tracker tab, HR portal, reporting dashboard",
  },
  {
    icon: "🎥",
    title: "Meeting Integrations",
    desc: "In-meeting apps, pre/post-meeting sidepanels, and automated summaries. Surface the right data at the right moment.",
    example: "e.g. Live agenda panel, action item capture, CRM lookup",
  },
];

const maintenanceServices = [
  {
    icon: "📡",
    title: "Monitoring & Alerting",
    desc: "Real-time observability across your stack. We catch issues before your users do — uptime monitoring, error tracking, and anomaly detection.",
  },
  {
    icon: "🔧",
    title: "Performance Optimisation",
    desc: "Regular performance audits, query optimisation, caching strategies, and load-testing to keep your apps fast under pressure.",
  },
  {
    icon: "🔒",
    title: "Security & Compliance",
    desc: "Dependency scanning, security patching, penetration testing support, and compliance reviews baked into every maintenance cycle.",
  },
  {
    icon: "📦",
    title: "Feature Iterations",
    desc: "Post-launch isn't a handoff — it's a new phase. We ship incremental improvements based on real user feedback and analytics.",
  },
  {
    icon: "📚",
    title: "Documentation & Handover",
    desc: "Every system we build ships with full technical documentation, architecture diagrams, and structured knowledge transfer to your team.",
  },
  {
    icon: "🤝",
    title: "Dedicated Support",
    desc: "A named point of contact, defined SLAs, and responsive escalation paths. You always know who to call and what to expect.",
  },
];

const lifecycle = [
  { n: "01", title: "Assess", desc: "Evaluate portfolio, identify gaps and transformation priorities" },
  { n: "02", title: "Design", desc: "Architect modular, scalable solutions aligned to business goals" },
  { n: "03", title: "Build", desc: "Agile development in structured sprints with continuous integration" },
  { n: "04", title: "Integrate", desc: "Automate workflows and connect systems for end-to-end efficiency" },
  { n: "05", title: "Evolve", desc: "Continuous improvement as your business and market demands shift" },
];

const techStack = [
  { name: "React / Next.js", tag: "Frontend", color: "rgba(20,184,166,.14)" },
  { name: "Node.js / Python", tag: "Backend", color: "rgba(34,197,94,.11)" },
  { name: "Docker + K8s", tag: "Infra", color: "rgba(20,184,166,.10)" },
  { name: "AWS / Azure / GCP", tag: "Cloud", color: "rgba(34,197,94,.09)" },
];

const pills = ["TypeScript", "GraphQL", "PostgreSQL", "Redis", "Kafka", "Terraform", "GitHub Actions", "Jest / Cypress", "Bot Framework", "Teams JS SDK", "Azure AD", "Power Automate"];

// ── STYLES ───────────────────────────────────────

const styles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');

:root {
  --bg: #07100e;
  --bg-2: #0c1a16;
  --surface: rgba(255,255,255,0.04);
  --surface-2: rgba(255,255,255,0.07);
  --text: #dff0e8;
  --muted: #7a9e8e;
  --border: rgba(255,255,255,0.07);
  --border-2: rgba(255,255,255,0.13);
  --teal: #14b8a6;
  --teal-2: #2dd4bf;
  --teal-d: #0d9488;
  --teal-glow: rgba(20,184,166,0.18);
  --accent: #22c55e;
  --accent-2: #4ade80;
  --grad: linear-gradient(135deg, #14b8a6, #22c55e);
  --grad-text: linear-gradient(135deg, #2dd4bf 0%, #4ade80 100%);
  --shadow: 0 24px 80px rgba(0,0,0,0.5);
  --shadow-brand: 0 12px 40px rgba(20,184,166,0.25);
  --radius: 20px;
  --radius-sm: 14px;
  --ease: cubic-bezier(0.22,1,0.36,1);
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
body {
  margin: 0;
  font-family: 'DM Sans', system-ui, sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}
body::before {
  content: '';
  position: fixed; inset: 0;
  background:
    radial-gradient(ellipse 900px 600px at 10% 0%, rgba(20,184,166,0.11), transparent 70%),
    radial-gradient(ellipse 700px 500px at 90% 10%, rgba(34,197,94,0.08), transparent 70%),
    radial-gradient(ellipse 600px 400px at 50% 90%, rgba(20,184,166,0.06), transparent 70%);
  pointer-events: none; z-index: 0;
}
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }

.container { width: 100%; max-width: 1400px; margin: 0 auto; padding: 0 clamp(16px, 5vw, 60px); }
.section { padding: clamp(48px, 8vw, 100px) 0; position: relative; z-index: 1; }
.section--alt { background: rgba(255,255,255,0.015); }

.h1 { font-weight: 800; font-size: clamp(28px, 4vw, 56px); line-height: 1.05; letter-spacing: -0.035em; margin: 0; }
.h2 { font-weight: 800; font-size: clamp(22px, 3vw, 38px); line-height: 1.1; letter-spacing: -0.03em; margin: 0; }
.h3 { font-weight: 700; font-size: clamp(15px, 1.8vw, 20px); line-height: 1.25; margin: 0; }
.lead { font-size: clamp(14px, 1.6vw, 17px); font-weight: 300; color: var(--muted); line-height: 1.8; margin: 0; }
.text-grad { background: var(--grad-text); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

.kicker {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 4px 12px 4px 8px; font-size: 10px; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase; color: var(--text);
  border: 1px solid rgba(255,255,255,0.12);
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}
.kicker::before {
  content: ''; display: block; width: 5px; height: 5px;
  background: #1D9E75; clip-path: polygon(50% 0%, 100% 100%, 0% 100%); flex-shrink: 0;
}

.btn--primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-size: 13px; font-weight: 600; cursor: pointer;
  border: 1.5px solid #085041; white-space: nowrap; font-family: inherit;
  transition: all 0.15s ease; background: #085041; color: #9FE1CB;
  border-radius: 5px; box-shadow: 3px 3px 0 #1D9E75;
}
.btn--primary:hover { box-shadow: 1px 1px 0 #1D9E75; transform: translate(2px,2px); }
.btn--primary:active { box-shadow: none; transform: translate(3px,3px); }

.btn--ghost {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 10px 22px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit;
  border-radius: 999px; border: 1px solid rgba(20,184,166,0.22);
  background: transparent; color: var(--teal-2); transition: all 0.25s var(--ease);
}
.btn--ghost:hover { background: rgba(20,184,166,0.08); border-color: rgba(20,184,166,0.4); }

/* ─── HERO ─── */
.hero-grid { display: grid; grid-template-columns: 1.1fr 1fr; gap: clamp(24px,4vw,56px); align-items: center; }

.hero-code-window {
  border-radius: 20px; background: rgba(7,16,14,0.95);
  border: 1px solid rgba(20,184,166,0.25); overflow: hidden;
  box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(20,184,166,0.1);
  animation: win-in 0.7s cubic-bezier(0.22,0.68,0,1.2) 0.2s both;
}
@keyframes win-in { from{opacity:0;transform:translateY(24px) scale(.97)} to{opacity:1;transform:none} }
.hero-code-bar {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.06);
  background: rgba(255,255,255,0.03);
}
.hero-code-dot { width: 10px; height: 10px; border-radius: 50%; }
.hero-code-fname { margin-left: auto; font-size: 11px; font-weight: 600; color: var(--muted); font-family: 'DM Mono', monospace; letter-spacing: 0.04em; }
.hero-code-body { padding: 20px 22px; font-family: 'DM Mono', monospace; font-size: 12.5px; line-height: 1.75; }
.code-line { display: flex; align-items: flex-start; gap: 16px; opacity: 0; animation: line-in 0.35s ease forwards; }
@keyframes line-in { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:none} }
.code-ln { color: rgba(255,255,255,0.18); font-size: 11px; user-select: none; min-width: 16px; padding-top: 1px; }
.kw { color: #2dd4bf; } .fn { color: #4ade80; } .str { color: #f59e0b; }
.cm { color: rgba(255,255,255,0.3); font-style: italic; } .pu { color: rgba(255,255,255,0.55); }

.sprint-badge {
  margin-top: 16px;
  background: rgba(12,26,22,0.97); border: 1px solid rgba(34,197,94,0.3);
  border-radius: 14px; padding: 16px 20px;
  backdrop-filter: blur(10px); box-shadow: 0 8px 32px rgba(0,0,0,0.35);
  animation: badge-in 0.6s cubic-bezier(0.22,0.68,0,1.2) 0.9s both;
}
@keyframes badge-in { from{opacity:0;transform:translateY(12px) scale(.95)} to{opacity:1;transform:none} }
.sprint-title { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 10px; }
.sprint-bar-label { display: flex; justify-content: space-between; font-size: 11px; color: var(--muted); margin-bottom: 4px; }
.sprint-bar-track { height: 5px; border-radius: 999px; background: rgba(255,255,255,0.08); overflow: hidden; margin-bottom: 8px; }
.sprint-bar-fill { height: 100%; border-radius: 999px; background: var(--grad); width: 0%; transition: width 1.2s cubic-bezier(0.22,0.68,0,1) 1.1s; }
.sprint-bar-fill.animate { width: var(--w); }
.sprint-status { display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted); }
.sprint-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; animation: blink 2s ease-in-out infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:.35} }

/* ─── SERVICE PILLARS TABS ─── */
.pillars-tabs { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
.pillar-tab {
  display: flex; align-items: center; gap: 8px;
  padding: 10px 18px; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 600;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
  color: var(--muted); transition: all 0.2s var(--ease); font-family: inherit;
}
.pillar-tab:hover { border-color: rgba(20,184,166,0.3); color: var(--teal-2); background: rgba(20,184,166,0.05); }
.pillar-tab.active { border-color: var(--teal); background: rgba(20,184,166,0.12); color: var(--teal-2); box-shadow: 0 0 0 1px rgba(20,184,166,0.2); }
.pillar-tab-icon { font-size: 16px; }

.pillar-content {
  display: grid; grid-template-columns: 1fr 1fr; gap: 32px; align-items: start;
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius); padding: clamp(24px,4vw,40px);
}
.pillar-bullets { list-style: none; padding: 0; margin: 24px 0 0; display: grid; gap: 10px; }
.pillar-bullet { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; color: var(--muted); }
.pillar-bullet::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: var(--teal); flex-shrink: 0; margin-top: 7px; }
.pillar-visual {
  border-radius: var(--radius-sm); aspect-ratio: 4/3;
  background: rgba(20,184,166,0.06); border: 1px solid rgba(20,184,166,0.15);
  display: flex; align-items: center; justify-content: center;
  font-size: 72px; position: relative; overflow: hidden;
}
.pillar-visual::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(20,184,166,0.12), transparent 60%);
}

/* ─── CAPABILITIES ─── */
.caps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 40px; }
.cap-card {
  padding: 30px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  transition: transform 0.3s var(--ease), border-color 0.3s, box-shadow 0.3s;
  position: relative; overflow: hidden;
}
.cap-card::after {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at top left, rgba(20,184,166,0.08), transparent 60%);
  opacity: 0; transition: 0.3s;
}
.cap-card:hover { transform: translateY(-6px); border-color: rgba(20,184,166,0.35); box-shadow: 0 16px 48px rgba(20,184,166,0.1); }
.cap-card:hover::after { opacity: 1; }
.cap-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
.cap-icon { font-size: 28px; }
.cap-card h3 { margin: 0 0 10px; font-size: 17px; font-weight: 700; }
.cap-card p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ─── TEAMS BUILDS ─── */
.teams-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 40px; }
.teams-card {
  padding: 30px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  transition: 0.3s; position: relative; overflow: hidden;
}
.teams-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #14b8a6, transparent);
  opacity: 0; transition: 0.3s;
}
.teams-card:hover { border-color: rgba(20,184,166,0.3); transform: translateY(-4px); }
.teams-card:hover::before { opacity: 1; }
.teams-card-icon { font-size: 28px; margin-bottom: 14px; }
.teams-card h3 { margin: 0 0 10px; font-size: 17px; font-weight: 700; }
.teams-card p { margin: 0 0 12px; font-size: 13px; color: var(--muted); line-height: 1.65; }
.teams-example {
  font-size: 11px; color: #2dd4bf; font-style: italic;
  padding: 6px 10px; border-radius: 6px;
  background: rgba(20,184,166,0.08); border: 1px solid rgba(20,184,166,0.15);
}

/* ─── MAINTENANCE ─── */
.maint-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 40px; }
.maint-card {
  padding: 28px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  position: relative; overflow: hidden;
}
.maint-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--grad); transform: scaleY(0); transform-origin: bottom; transition: transform 0.3s ease;
}
.maint-card:hover { border-color: rgba(20,184,166,0.3); transform: translateY(-4px); box-shadow: 0 12px 36px rgba(20,184,166,0.08); }
.maint-card:hover::before { transform: scaleY(1); }
.maint-icon {
  width: 48px; height: 48px; border-radius: 12px;
  background: rgba(20,184,166,0.1); display: flex; align-items: center; justify-content: center;
  font-size: 20px; margin-bottom: 16px; transition: background 0.25s, transform 0.25s;
}
.maint-card:hover .maint-icon { background: rgba(20,184,166,0.18); transform: scale(1.08); }
.maint-card h3 { margin: 0 0 10px; font-size: 16px; font-weight: 700; }
.maint-card p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ─── LIFECYCLE ─── */
.lifecycle-wrap { margin-top: 50px; position: relative; }
.lifecycle-track {
  position: absolute; top: 28px; left: calc(10% + 28px); right: calc(10% + 28px);
  height: 1px; background: linear-gradient(90deg, rgba(20,184,166,0.7), rgba(20,184,166,0.1));
}
.lifecycle-track::after {
  content: ''; position: absolute; top: -1px; left: 0; width: 35%; height: 3px;
  background: linear-gradient(90deg, #14b8a6, transparent);
  animation: flow 3s ease-in-out infinite;
}
@keyframes flow { 0%{left:0;opacity:1} 100%{left:65%;opacity:0} }
.lifecycle-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; }
.lc-step { text-align: center; }
.lc-node {
  width: 56px; height: 56px; border-radius: 50%; margin: 0 auto 14px;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid rgba(20,184,166,0.4); background: #0c1a16;
  font-weight: 700; font-size: 13px; color: #2dd4bf;
  transition: transform 0.3s, background 0.3s, box-shadow 0.3s; position: relative;
}
.lc-node::after {
  content: ''; position: absolute; inset: -5px; border-radius: 50%;
  border: 1px solid rgba(20,184,166,0.2); opacity: 0; transform: scale(0.85);
  transition: opacity 0.3s, transform 0.3s;
}
.lc-step:hover .lc-node { background: rgba(20,184,166,0.18); transform: scale(1.12); box-shadow: 0 0 24px rgba(20,184,166,0.35); }
.lc-step:hover .lc-node::after { opacity: 1; transform: scale(1); }
.lc-step h4 { margin: 0 0 6px; font-size: 14px; font-weight: 700; }
.lc-step p { margin: 0; font-size: 12px; color: var(--muted); line-height: 1.5; }

/* ─── TECH STACK ─── */
.tech-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 40px; }
.tech-card {
  padding: 22px; border-radius: var(--radius-sm);
  border: 1px solid rgba(255,255,255,0.08); transition: border-color 0.25s, transform 0.25s;
  position: relative; overflow: hidden;
}
.tech-card::after {
  content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: var(--grad); transform: scaleX(0); transition: transform 0.3s ease; transform-origin: left;
}
.tech-card:hover { border-color: rgba(20,184,166,0.3); transform: translateY(-3px); }
.tech-card:hover::after { transform: scaleX(1); }
.tech-name { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
.tech-tag { font-size: 12px; color: var(--muted); }

.pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.pill {
  padding: 8px 16px; border-radius: 999px; background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09); font-size: 13px; font-weight: 500;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
}
.pill:hover { background: rgba(20,184,166,0.12); border-color: rgba(20,184,166,0.4); color: #2dd4bf; transform: translateY(-2px); }

/* ─── CTA BAND ─── */
.cta-band {
  background: var(--grad); border-radius: var(--radius);
  padding: clamp(28px,5vw,48px) clamp(20px,4vw,40px);
  display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap;
}
.cta-band h2 { margin: 0 0 6px; font-size: clamp(18px,2.8vw,30px); font-weight: 800; letter-spacing: -0.03em; color: #fff; }
.cta-band p { margin: 0; font-size: clamp(13px,1.4vw,15px); color: rgba(255,255,255,0.8); }
.cta-band-btn {
  background: #fff; color: var(--teal-d); border: none; font-weight: 700;
  padding: 10px 24px; border-radius: 999px; font-size: 14px; cursor: pointer;
  transition: opacity 0.2s; white-space: nowrap; font-family: inherit;
  display: inline-flex; align-items: center;
}
.cta-band-btn:hover { opacity: 0.9; }

/* ─── APPROACH CARDS ─── */
.approach-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-top: 40px; }
.approach-card {
  padding: 28px 24px; border-radius: var(--radius);
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
  position: relative; overflow: hidden;
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
}
.approach-card::before {
  content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px;
  background: var(--grad); transform: scaleY(0); transform-origin: bottom; transition: transform 0.3s ease;
}
.approach-card:hover { border-color: rgba(20,184,166,0.3); transform: translateY(-4px); box-shadow: 0 12px 36px rgba(20,184,166,0.08); }
.approach-card:hover::before { transform: scaleY(1); }
.approach-num { font-size: 48px; font-weight: 800; line-height: 1; color: rgba(20,184,166,0.18); margin-bottom: 16px; letter-spacing: -0.04em; }
.approach-card h3 { margin: 0 0 10px; font-size: 16px; font-weight: 700; }
.approach-card p { margin: 0; font-size: 13px; color: var(--muted); line-height: 1.65; }

/* ─── RESPONSIVE ─── */
@media(max-width: 1100px) {
  .tech-grid { grid-template-columns: 1fr 1fr; }
}
@media(max-width: 1000px) {
  .hero-grid { grid-template-columns: 1fr; }
  .caps-grid { grid-template-columns: 1fr; }
  .teams-grid { grid-template-columns: 1fr; }
  .maint-grid { grid-template-columns: 1fr 1fr; }
  .approach-grid { grid-template-columns: 1fr 1fr; }
  .pillar-content { grid-template-columns: 1fr; }
  .pillar-visual { aspect-ratio: 16/7; font-size: 48px; }
}
@media(max-width: 700px) {
  .lifecycle-row { grid-template-columns: 1fr 1fr; }
  .lifecycle-track { display: none; }
  .tech-grid { grid-template-columns: 1fr; }
  .maint-grid { grid-template-columns: 1fr; }
  .approach-grid { grid-template-columns: 1fr; }
  .cta-band { flex-direction: column; align-items: flex-start; }
  .pillars-tabs { gap: 6px; }
  .pillar-tab { padding: 8px 12px; font-size: 12px; }
}
@media(max-width: 480px) {
  .teams-grid { grid-template-columns: 1fr; }
  .caps-grid { grid-template-columns: 1fr; }
}
`;

// ── COMPONENT ─────────────────────────────────────

export default function ApplicationDevelopment() {
  useReveal();
  const [activeTab, setActiveTab] = useState("build");
  const badgeRef = useRef(null);

  const activePillar = servicePillars.find(p => p.id === activeTab);

  const initBars = (el) => {
    if (!el) return;
    setTimeout(() => {
      el.querySelectorAll(".sprint-bar-fill").forEach(b => b.classList.add("animate"));
    }, 1200);
  };

  return (
    <div>
      <style>{styles}</style>
      <style>{ANIM_CSS}</style>

      {/* ── HERO ── */}
      <section className="section" style={{ overflow: "hidden" }}>
        <div className="container hero-grid">
          <div>
            <div className="kicker reveal">Service</div>
            <h1 className="h1 reveal" style={{ marginTop: 14 }}>
              <span className="text-grad">Application Development</span>
            </h1>
            <p className="lead reveal" style={{ marginTop: 16, maxWidth: 640, textAlign: "justify" }}>
              Enterprise organisations are transforming heritage portfolios to flexible, modular application development portfolios by implementing next-generation processes defined by speed, efficiency, and resilience. From greenfield builds and Teams integrations to ongoing maintenance — we deliver end-to-end application services that keep your business moving.
            </p>
            <div className="reveal" style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="btn--primary" to="/contact">Start a project</Link>
              <Link className="btn--ghost" to="/services">All services</Link>
            </div>
          </div>

          <div ref={initBars}>
            <div className="hero-code-window">
              <div className="hero-code-bar">
                <div className="hero-code-dot" style={{ background: "#ef4444" }} />
                <div className="hero-code-dot" style={{ background: "#f59e0b" }} />
                <div className="hero-code-dot" style={{ background: "#22c55e" }} />
                <div className="hero-code-fname">app/deploy.ts</div>
              </div>
              <div className="hero-code-body">
                {[
                  <><span className="cm">// Agile deployment pipeline</span></>,
                  <><span className="kw">import</span><span className="pu"> {"{"} </span><span className="fn">pipeline</span><span className="pu"> {"}"} </span><span className="kw">from</span><span className="str"> '@inion/core'</span></>,
                  <></>,
                  <><span className="kw">const</span><span className="pu"> release </span><span className="kw">=</span><span className="pu"> </span><span className="kw">await</span><span className="pu"> </span><span className="fn">pipeline</span><span className="pu">{"({"}</span></>,
                  <><span className="pu">  env: </span><span className="str">'production'</span><span className="pu">,</span></>,
                  <><span className="pu">  strategy: </span><span className="str">'blue-green'</span><span className="pu">,</span></>,
                  <><span className="pu">  autoRollback: </span><span className="kw">true</span><span className="pu">,</span></>,
                  <><span className="pu">  tests: </span><span className="str">'full-suite'</span><span className="pu">,</span></>,
                  <><span className="pu">{"})"};</span></>,
                  <></>,
                  <><span className="cm">// ✅ Deployed in {"<"}3s</span></>,
                ].map((content, i) => (
                  <div key={i} className="code-line" style={{ animationDelay: `${0.5 + i * 0.07}s` }}>
                    <span className="code-ln">{i + 1}</span>
                    <span>{content}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="sprint-badge">
              <div className="sprint-title">Sprint 12 · Live</div>
              {[["Features shipped", 87], ["Test coverage", 94]].map(([label, pct]) => (
                <div key={label}>
                  <div className="sprint-bar-label">
                    <span>{label}</span><span style={{ color: "#2dd4bf" }}>{pct}%</span>
                  </div>
                  <div className="sprint-bar-track">
                    <div className="sprint-bar-fill" style={{ "--w": `${pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="sprint-status">
                <div className="sprint-dot" />All systems go
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE PILLARS ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="reveal" style={{ marginBottom: 10 }}><span className="kicker">What we cover</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Build · Integrate · Teams · Maintain</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: "60ch" }}>
            One team, full coverage — from the first line of code through to long-term maintenance and everything in between.
          </p>

          <div className="pillars-tabs reveal" style={{ marginTop: 28 }}>
            {servicePillars.map(p => (
              <button
                key={p.id}
                className={`pillar-tab${activeTab === p.id ? " active" : ""}`}
                onClick={() => setActiveTab(p.id)}
              >
                <span className="pillar-tab-icon">{p.icon}</span>
                {p.title}
                <span style={{ fontSize: 11, color: "var(--muted)", fontWeight: 400 }}>— {p.short}</span>
              </button>
            ))}
          </div>

          <div className="pillar-content reveal">
            <div>
              <h3 style={{ fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 800, marginBottom: 12 }}>
                {activePillar.icon} {activePillar.title}
              </h3>
              <p className="lead">{activePillar.desc}</p>
              <ul className="pillar-bullets">
                {activePillar.items.map(item => (
                  <li key={item} className="pillar-bullet">{item}</li>
                ))}
              </ul>
              <div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link className="btn--primary" to="/contact">Discuss this service</Link>
              </div>
            </div>
            <div className="pillar-visual">{activePillar.icon}</div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES ── */}
      <section className="section">
        <div className="container">
          <div className="reveal"><span className="kicker">Capabilities</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we develop</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
            From heritage portfolio modernisation to greenfield agile builds — the right process and people, on time and on budget.
          </p>
          <div className="caps-grid">
            {capabilities.map((c, i) => (
              <div key={c.title} className="cap-card reveal" style={{ "--i": i }}>
                <div className="cap-top"><div className="cap-icon">{c.icon}</div></div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAMS INTEGRATION ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="reveal"><span className="kicker">Microsoft Teams</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Teams Application Development & Integration</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: "62ch" }}>
            We develop bots, message extensions, and full web applications embedded as tabs — bringing your critical workflows directly into the Teams interface your people already use. No context switching, no extra logins.
          </p>
          <div className="teams-grid">
            {teamsBuilds.map((b, i) => (
              <div key={b.title} className="teams-card reveal" style={{ "--i": i }}>
                <div className="teams-card-icon">{b.icon}</div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
                <div className="teams-example">{b.example}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAINTENANCE & SUPPORT ── */}
      <section className="section">
        <div className="container">
          <div className="reveal"><span className="kicker">Maintenance & Support</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>We don't just build and leave</h2>
          <p className="lead reveal" style={{ marginTop: 10, maxWidth: "60ch" }}>
            Post-launch support, monitoring, and iteration are built into every engagement from day one — not charged as an afterthought.
          </p>
          <div className="maint-grid">
            {maintenanceServices.map((m, i) => (
              <div key={m.title} className="maint-card reveal" style={{ "--i": i }}>
                <div className="maint-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIFECYCLE ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="reveal"><span className="kicker">Lifecycle</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How we deliver</h2>
          <div className="lifecycle-wrap reveal">
            <div className="lifecycle-track" />
            <div className="lifecycle-row">
              {lifecycle.map(step => (
                <div key={step.n} className="lc-step">
                  <div className="lc-node">{step.n}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="section">
        <div className="container">
          <div className="reveal"><span className="kicker">Tech ecosystem</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>Built on proven technology</h2>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={t.name} className="tech-card reveal" style={{ background: t.color, "--i": i }}>
                <div className="tech-name">{t.name}</div>
                <div className="tech-tag">{t.tag}</div>
              </div>
            ))}
          </div>
          <div className="pills reveal">
            {pills.map(p => <div key={p} className="pill">{p}</div>)}
          </div>
        </div>
      </section>

      {/* ── HOW EVERY ENGAGEMENT RUNS ── */}
      <section className="section section--alt">
        <div className="container">
          <div className="reveal"><span className="kicker">Our approach</span></div>
          <h2 className="h2 reveal" style={{ marginTop: 10 }}>How every engagement runs</h2>
          <p className="lead reveal" style={{ marginTop: 10 }}>
            Every InionData engagement follows the same proven four-step model — so you always know where things stand and what comes next.
          </p>
          <div className="approach-grid">
            {[
              { n: "01", title: "Discovery & Assessment", desc: "We analyse your current application landscape, business goals, and transformation priorities through stakeholder interviews and technical audits." },
              { n: "02", title: "Architecture & Planning", desc: "We design scalable, modular architecture with a phased delivery plan, technology stack selection, and risk mapping." },
              { n: "03", title: "Agile Build & Deploy", desc: "We develop in structured sprints with CI/CD automation, full test coverage, and weekly stakeholder updates throughout." },
              { n: "04", title: "Optimise & Evolve", desc: "We monitor performance, iterate on features, and evolve your applications as your business and market demands shift." },
            ].map(step => (
              <div key={step.n} className="approach-card reveal">
                <div className="approach-num">{step.n}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section">
        <div className="container">
          <div className="cta-band reveal">
            <div>
              <h2>Ready to modernise your application portfolio?</h2>
              <p>From consulting to full system transformation — we bring the right expertise to deliver results.</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link className="cta-band-btn" to="/contact">Start a conversation</Link>
              <Link
                className="btn--ghost"
                to="/services"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}
              >
                All services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}