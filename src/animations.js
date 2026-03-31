import { useEffect } from "react";

/**
 * Shared animation utilities for InonData site.
 * Import useReveal() in any page component.
 */

export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv--in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/** Shared CSS injected once per page — safe to duplicate, browser deduplicates <style> content */
export const ANIM_CSS = `
  /* ── Keyframes ─────────────────────────────── */
  @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn   { from { opacity:0; }                              to { opacity:1; } }
  @keyframes scaleIn  { from { opacity:0; transform:scale(0.88); }       to { opacity:1; transform:scale(1); } }
  @keyframes slideRight { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes countUp  { from { opacity:0; transform:translateY(12px); }  to { opacity:1; transform:translateY(0); } }
  @keyframes drawPath { to { stroke-dashoffset: 0; } }
  @keyframes shimmer  {
    0%   { background-position: -400px 0; }
    100% { background-position: 400px 0; }
  }

  /* ── Hero stagger ───────────────────────────── */
  .ha { opacity:0; }
  .ha-1 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s forwards; }
  .ha-2 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s forwards; }
  .ha-3 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.30s forwards; }
  .ha-4 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.42s forwards; }
  .ha-5 { animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.54s forwards; }
  .ha-6 { animation: scaleIn 0.7s cubic-bezier(0.22,1,0.36,1) 0.30s forwards; }

  /* ── Scroll reveal ──────────────────────────── */
  .rv {
    opacity: 0;
    transform: translateY(32px);
    transition:
      opacity  0.65s cubic-bezier(0.22,1,0.36,1),
      transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .rv--in { opacity:1; transform:translateY(0); }

  /* stagger within .rv-group */
  .rv-group > .rv:nth-child(1) { transition-delay: 0.00s; }
  .rv-group > .rv:nth-child(2) { transition-delay: 0.08s; }
  .rv-group > .rv:nth-child(3) { transition-delay: 0.16s; }
  .rv-group > .rv:nth-child(4) { transition-delay: 0.24s; }
  .rv-group > .rv:nth-child(5) { transition-delay: 0.32s; }
  .rv-group > .rv:nth-child(6) { transition-delay: 0.40s; }
  .rv-group > .rv:nth-child(7) { transition-delay: 0.48s; }
  .rv-group > .rv:nth-child(8) { transition-delay: 0.56s; }

  /* ── Card interactions ──────────────────────── */
  .card-i {
    transition:
      transform  0.28s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.28s ease;
    will-change: transform;
  }
  .card-i:hover {
    transform: translateY(-5px) scale(1.01);
    box-shadow: 0 20px 48px rgba(15,23,42,0.13);
  }
  .card-i:active { transform: translateY(-2px) scale(0.995); }

  /* ── Button interactions ────────────────────── */
  .btn {
    transition:
      transform  0.22s cubic-bezier(0.34,1.56,0.64,1),
      box-shadow 0.22s ease,
      opacity    0.2s ease !important;
    will-change: transform;
  }
  .btn:hover  { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(13,148,136,0.25); }
  .btn:active { transform: translateY(0) scale(0.96); }

  /* ── Teal accent bar ────────────────────────── */
  .accent-bar {
    display: inline-block;
    height: 3px;
    width: 36px;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--teal), var(--teal-2));
    margin-bottom: 14px;
    transform-origin: left;
  }
  .rv--in .accent-bar, .ha .accent-bar, .accent-bar {
    animation: slideRight 0.5s cubic-bezier(0.22,1,0.36,1) 0.2s both;
  }

  /* ── Progress bar fill ──────────────────────── */
  .bar-track {
    height: 7px;
    border-radius: 99px;
    background: rgba(13,148,136,0.10);
    overflow: hidden;
  }
  .bar-fill-anim {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--teal), var(--teal-2));
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 1s cubic-bezier(0.22,1,0.36,1);
  }
  .rv--in .bar-fill-anim { transform: scaleX(1); }

  /* ── Stat counter ───────────────────────────── */
  .stat-num {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    color: var(--teal);
    line-height: 1;
    animation: countUp 0.5s cubic-bezier(0.22,1,0.36,1) both;
  }

  /* ── Icon badge ─────────────────────────────── */
  .icon-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--teal), var(--teal-2));
    color: #fff;
    flex-shrink: 0;
    transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .card-i:hover .icon-badge { transform: rotate(-8deg) scale(1.12); }

  /* ── Step pill ──────────────────────────────── */
  .step-pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 4px 12px 4px 4px;
    border-radius: 99px;
    background: rgba(13,148,136,0.08);
    border: 1px solid rgba(13,148,136,0.18);
    margin-bottom: 14px;
  }
  .step-pill__num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--teal), var(--teal-2));
    color: #fff;
    font-size: 11px;
    font-weight: 800;
  }
  .step-pill__label {
    font-size: 11px;
    font-weight: 700;
    color: var(--teal);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  /* ── Sparkline SVG ──────────────────────────── */
  .spark-path {
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    animation: drawPath 1.4s cubic-bezier(0.22,1,0.36,1) 0.6s forwards;
  }

  /* ── Divider ─────────────────────────────────── */
  .section-divider {
    height: 1px;
    background: var(--border);
    margin: 0;
  }

  /* ── CTA band ───────────────────────────────── */
  .cta-band {
    background: linear-gradient(130deg, var(--teal) 0%, var(--teal-2) 100%);
    border-radius: var(--radius);
    padding: 56px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }
  .cta-band::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 50%, rgba(255,255,255,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .cta-band__title {
    font-size: clamp(1.5rem, 2.8vw, 2rem);
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    margin: 0;
  }
  .cta-band__sub {
    color: rgba(255,255,255,0.82);
    font-size: 15px;
    margin-top: 8px;
  }
  .cta-band__btn {
    background: #fff !important;
    color: var(--teal-d) !important;
    font-weight: 700;
    padding: 13px 28px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .cta-band__btn:hover {
    box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important;
    transform: translateY(-2px) !important;
  }

  /* ── Responsive tweaks ──────────────────────── */
  @media (max-width: 768px) {
    .cta-band { padding: 36px 28px; flex-direction: column; text-align: center; }
  }
`;