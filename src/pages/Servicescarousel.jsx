/**
 * ServicesCarousel.jsx — Fixed infinite 3D carousel
 *
 * Bug fixes applied vs original:
 *  1. Parallax tilt no longer clobbers base CSS transform — uses a
 *     separate CSS custom property (--tilt-y / --tilt-x) that composes
 *     on top of whatever the position class sets.
 *  2. Drag sensitivity is adaptive (mobile vs desktop).
 *  3. Wheel uses debounced intent detection instead of a leaky accumulator,
 *     so trackpads don't fire accidental steps.
 *  4. Snap calculation uses card-centre math, not edge math.
 *  5. Teleport guard uses a clean setTimeout(0) instead of double-rAF.
 *  6. Auto-advance restarts after a 2 s idle delay (not instantly).
 *  7. getBoundingClientRect() is cached in a ref — no layout thrash.
 *  8. All window listeners are registered once and cleaned up correctly.
 */

import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import service1 from "../assets/images/app_development.png";
import service2 from "../assets/images/application_integration.png";
import service3 from "../assets/images/application_management.png";
import service4 from "../assets/images/application_maintenance.png";
import service5 from "../assets/images/project_management.png";
import service6 from "../assets/images/consulting_services.png";
import service7 from "../assets/images/teams_application.png";
import service8 from "../assets/images/operational_efficiency.png";
import service9 from "../assets/images/fast_growth.png";

// ── DATA ──────────────────────────────────────────────────────────────────────

const offerings = [
  { title: "Application Design & Development", desc: "Full-cycle development from requirements to release.", badge: "Core",          image: service1 },
  { title: "Application Integration",          desc: "Seamless connectivity between systems.",              badge: "Integration",   image: service2 },
  { title: "Application Management",           desc: "Keep apps running reliably.",                         badge: "Support",       image: service3 },
  { title: "Application Maintenance",          desc: "Performance & health optimisation.",                  badge: "Maintenance",   image: service4 },
  { title: "Project Management",               desc: "End-to-end delivery management.",                     badge: "Delivery",      image: service5 },
  { title: "Consulting Services",              desc: "Strategic technical guidance.",                       badge: "Advisory",      image: service6 },
  { title: "Teams Integration",                desc: "Microsoft Teams solutions.",                          badge: "Collaboration", image: service7 },
  { title: "Operational Efficiency",           desc: "Modernise legacy systems.",                           badge: "Optimisation",  image: service8 },
  { title: "Fast Growth",                      desc: "Boost growth by reinventing your applications.",      badge: "Growth",        image: service9 },
];

// ── CAROUSEL CONSTANTS ────────────────────────────────────────────────────────

const CARD_W      = 300;
const GAP         = 20;
const STEP        = CARD_W + GAP;
const N           = offerings.length;
const CLONE_COUNT = 3;
const TOTAL       = CLONE_COUNT + N + CLONE_COUNT;

// Build the full items array once (stable reference, no re-creation on render)
const allItems = [
  ...offerings.slice(N - CLONE_COUNT).map((s, i) => ({ ...s, _key: `ct-${i}`, _real: N - CLONE_COUNT + i })),
  ...offerings.map((s, i)            => ({ ...s, _key: `r-${i}`,  _real: i })),
  ...offerings.slice(0, CLONE_COUNT).map((s, i)  => ({ ...s, _key: `ch-${i}`, _real: i })),
];

// ── STYLES ────────────────────────────────────────────────────────────────────

const css = `
  .svc-section { padding: 100px 0; position: relative; z-index: 1; }

  .svc-header {
    max-width: min(1600px, 92vw);
    margin: 0 auto;
    padding: 0 40px 36px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  .svc-stage {
    overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
    cursor: grab;
    user-select: none;
    padding: 32px 0 48px;
  }
  .svc-stage:active { cursor: grabbing; }

  .svc-persp {
    perspective: 1400px;
    perspective-origin: 50% 38%;
  }

  .svc-track {
    display: flex;
    gap: ${GAP}px;
    will-change: transform;
  }

  /*
   * FIX 1 — Tilt is composed via CSS custom properties so it never
   * overwrites the base transform set by the position class.
   *
   * Each .svc-card position class defines its own base values for
   * scale, rotateY, and translateZ. JS only touches --tilt-x / --tilt-y
   * which are appended to the end of the transform chain.
   */
  .svc-card {
    width: ${CARD_W}px;
    flex-shrink: 0;
    border-radius: 18px;
    overflow: hidden;
    background: rgba(255,255,255,0.035);
    border: 1px solid rgba(255,255,255,0.07);
    cursor: pointer;
    opacity: 0.40;
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    transform:
      scale(0.84)
      rotateY(16deg)
      translateZ(-60px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    transition:
      opacity     0.46s cubic-bezier(0.22,1,0.36,1),
      transform   0.46s cubic-bezier(0.22,1,0.36,1),
      box-shadow  0.46s cubic-bezier(0.22,1,0.36,1),
      border-color 0.3s ease;
    transform-style: preserve-3d;
    position: relative;
  }

  .svc-card.pos-center {
    opacity: 1;
    transform:
      scale(1)
      rotateY(0deg)
      translateZ(0)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    border-color: rgba(20,184,166,0.42);
    box-shadow: 0 28px 70px rgba(0,0,0,0.52), 0 0 0 1px rgba(20,184,166,0.22);
    z-index: 10;
  }
  .svc-card.pos-l1 {
    opacity: 0.78;
    transform: scale(0.92) rotateY(13deg)  translateZ(-26px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 5;
  }
  .svc-card.pos-l2 {
    opacity: 0.48;
    transform: scale(0.83) rotateY(21deg)  translateZ(-72px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 3;
  }
  .svc-card.pos-r1 {
    opacity: 0.78;
    transform: scale(0.92) rotateY(-13deg) translateZ(-26px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 5;
  }
  .svc-card.pos-r2 {
    opacity: 0.48;
    transform: scale(0.83) rotateY(-21deg) translateZ(-72px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 3;
  }

  /* Card internals — unchanged from original */
  .svc-card-img {
    width: 100%; height: 190px; overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative; background: rgba(20,184,166,0.05);
  }
  .svc-card-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
    filter: brightness(0.88) saturate(0.9);
  }
  .svc-card.pos-center .svc-card-img img {
    transform: scale(1.05);
    filter: brightness(1) saturate(1);
  }
  .svc-card-img-fade {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(7,16,14,0.55) 0%, transparent 55%);
    pointer-events: none;
  }
  .svc-card-body { padding: 18px 20px 20px; }
  .svc-card-badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase;
    border-radius: 999px;
    background: rgba(20,184,166,0.12); color: #2dd4bf;
    border: 1px solid rgba(20,184,166,0.22); margin-bottom: 10px;
  }
  .svc-card-title {
    font-size: 17px; font-weight: 700; letter-spacing: -0.02em;
    color: #dff0e8; margin: 0 0 7px; line-height: 1.25;
  }
  .svc-card-desc { font-size: 13px; line-height: 1.65; color: #7a9e8e; margin: 0; }
  .svc-card-footer {
    margin-top: 16px; padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
  }
  .svc-card-arr {
    width: 32px; height: 32px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.10);
    display: flex; align-items: center; justify-content: center; color: #2dd4bf;
    transition: background .2s, border-color .2s, transform .25s cubic-bezier(.34,1.56,.64,1);
  }
  .svc-card:hover .svc-card-arr {
    background: rgba(20,184,166,0.14); border-color: rgba(20,184,166,0.35); transform: translateX(3px);
  }

  /* Dots */
  .svc-dots { display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 20px; }
  .svc-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: rgba(255,255,255,0.15); border: none; padding: 0; flex-shrink: 0;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1); cursor: pointer;
  }
  .svc-dot.active { width: 24px; border-radius: 4px; background: #14b8a6; }

  /* Nav buttons */
  .svc-nav { display: flex; gap: 8px; }
  .svc-nav-btn {
    width: 38px; height: 38px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04);
    display: flex; align-items: center; justify-content: center;
    color: #2dd4bf; font-size: 15px; line-height: 1;
    transition: background .2s, border-color .2s, transform .2s cubic-bezier(.34,1.56,.64,1);
  }
  .svc-nav-btn:hover { background: rgba(20,184,166,0.12); border-color: rgba(20,184,166,0.35); transform: scale(1.08); }
  .svc-nav-btn:active { transform: scale(0.94); }

  @media (max-width: 900px) {
    .svc-header { padding: 0 24px 36px; }
    .svc-card { width: 270px; }
    .svc-card-img { height: 160px; }
  }
  @media (max-width: 560px) {
    .svc-card { width: 248px; }
  }
`;

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function ServicesCarousel() {
  const stageRef    = useRef(null);
  const trackRef    = useRef(null);
  const offsetRef   = useRef(0);
  const itemIdxRef  = useRef(CLONE_COUNT);
  const dragRef     = useRef({ active: false, startX: 0, startOffset: 0 });
  const teleportRef = useRef(false);
  const autoTimerRef     = useRef(null);
  const autoRestartRef   = useRef(null);
  const lastWheelTimeRef = useRef(0);         // FIX 3 — debounced wheel intent
  const stageRectRef     = useRef(null);      // FIX 7 — cached bounding rect

  const [centerIdx, setCenterIdx] = useState(0);
  const [padX, setPadX]           = useState(0);

  // ── Pixel offset of a given item index ──────────────────────────────────────
  const pxFor = (iIdx) => iIdx * STEP;

  // ── Write transform directly (skip React reconciliation) ────────────────────
  const applyOffset = (px) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${-px}px)`;
    offsetRef.current = px;
  };

  // ── Teleport: after animation into a clone, silently jump to real card ──────
  const teleportIfClone = (iIdx) => {
    const isHead = iIdx >= CLONE_COUNT + N;
    const isTail = iIdx < CLONE_COUNT;
    if (!isHead && !isTail) return;

    const realIIdx = isHead ? iIdx - N : iIdx + N;
    teleportRef.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
    applyOffset(pxFor(realIIdx));
    itemIdxRef.current = realIIdx;

    // FIX 5 — setTimeout(0) is simpler and reliable enough; double-rAF had
    // a rare race where the browser painted before the guard cleared.
    setTimeout(() => { teleportRef.current = false; }, 0);
  };

  // ── Core snap ───────────────────────────────────────────────────────────────
  const snapToItem = (iIdx, smooth = true) => {
    if (teleportRef.current) return;

    const clamped = Math.max(0, Math.min(TOTAL - 1, iIdx));
    itemIdxRef.current = clamped;
    setCenterIdx(allItems[clamped]._real);

    if (!trackRef.current) return;

    if (smooth) {
      const track = trackRef.current;
      const handleEnd = (ev) => {
        if (ev.propertyName !== "transform") return;
        track.removeEventListener("transitionend", handleEnd);
        track.style.transition = "none";
        teleportIfClone(clamped);
      };
      track.addEventListener("transitionend", handleEnd);
      track.style.transition = "transform 0.52s cubic-bezier(0.22,1,0.36,1)";
      applyOffset(pxFor(clamped));
    } else {
      trackRef.current.style.transition = "none";
      applyOffset(pxFor(clamped));
      teleportIfClone(clamped);
    }
  };

  const snapToReal = (realIdx) => {
    const r = ((realIdx % N) + N) % N;
    snapToItem(CLONE_COUNT + r);
  };

  const snapStep = (delta) => {
    let next = itemIdxRef.current + delta;
    next = Math.max(0, Math.min(TOTAL - 1, next));
    snapToItem(next);
  };

  // ── FIX 6 — Auto-advance with idle restart delay ─────────────────────────
  const stopAuto = () => {
    clearInterval(autoTimerRef.current);
    clearTimeout(autoRestartRef.current);
  };
  const startAuto = () => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => snapStep(1), 3400);
  };
  const scheduleAutoRestart = (delay = 2000) => {
    clearTimeout(autoRestartRef.current);
    autoRestartRef.current = setTimeout(startAuto, delay);
  };

  // ── Snap from raw drag offset (FIX 4 — card-centre math) ─────────────────
  const snapFromRaw = () => {
    // Centre of the currently visible pixel → which item index is closest?
    const centreOffset = offsetRef.current + CARD_W / 2;
    const nearest = Math.round((centreOffset - padX) / STEP) + CLONE_COUNT;
    const clamped = Math.max(CLONE_COUNT, Math.min(CLONE_COUNT + N - 1, nearest));
    snapToItem(clamped);
  };

  // ── Compute padding to centre the first card in the stage ────────────────
  useEffect(() => {
    const calc = () => {
      if (!stageRef.current) return;
      const newPad = Math.max(0, Math.floor((stageRef.current.offsetWidth - CARD_W) / 2));
      setPadX(newPad);
      // Recache rect whenever stage resizes
      stageRectRef.current = stageRef.current.getBoundingClientRect();
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // ── Mount: snap to first real card, start auto ────────────────────────────
  useEffect(() => {
    snapToItem(CLONE_COUNT, false);
    startAuto();
    return stopAuto;
  }, []); // eslint-disable-line

  // ── All interaction event handlers ────────────────────────────────────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // FIX 7 — cache rect once; invalidated on resize in the effect above
    stageRectRef.current = stage.getBoundingClientRect();

    /* ── Mouse drag ── */
    const onMouseDown = (e) => {
      if (teleportRef.current) return;
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.active) return;
      // FIX 2 — adaptive sensitivity: lighter on mobile, more precise on desktop
      const speed = window.innerWidth < 768 ? 0.85 : 0.50;
      applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.clientX) * speed);
    };
    const onMouseUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      snapFromRaw();
      scheduleAutoRestart();
    };

    /* ── Touch ── */
    const onTouchStart = (e) => {
      if (teleportRef.current) return;
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.touches[0].clientX, startOffset: offsetRef.current };
    };
    const onTouchMove = (e) => {
      if (!dragRef.current.active) return;
      const speed = 0.75;
      applyOffset(dragRef.current.startOffset + (dragRef.current.startX - e.touches[0].clientX) * speed);
    };
    const onTouchEnd = () => {
      dragRef.current.active = false;
      snapFromRaw();
      scheduleAutoRestart();
    };

    /* ── Wheel (FIX 3) ────────────────────────────────────────────────────────
     * Instead of an accumulator (which leaks tiny trackpad deltas and fires
     * accidentally), we use debounced intent detection:
     *   - A 400 ms guard prevents a second step while the animation is settling.
     *   - The deltaY threshold (30) filters micro-scroll noise.
     * This feels intentional on both trackpads and scroll wheels.
     */
    const onWheel = (e) => {
      e.preventDefault();
      if (teleportRef.current) return;

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 400) return; // still settling
      if (Math.abs(e.deltaY) < 30) return;              // ignore micro-deltas

      lastWheelTimeRef.current = now;
      stopAuto();
      snapStep(e.deltaY > 0 ? 1 : -1);
      scheduleAutoRestart(2000);
    };

    /* ── Parallax tilt (FIX 1) ───────────────────────────────────────────────
     * We no longer write card.style.transform directly (which wiped the
     * position-class base values). Instead, we set CSS custom properties
     * --tilt-y and --tilt-x which are appended at the end of the transform
     * chain in every .svc-card rule, so they compose cleanly on top of
     * whatever scale/rotateY/translateZ the position class has set.
     */
    const onMouseMoveStage = (e) => {
      if (dragRef.current.active) return;
      const card = trackRef.current?.querySelector(".svc-card.pos-center");
      if (!card) return;

      // Use cached rect (FIX 7) — no layout recalc per mousemove
      const r  = stageRectRef.current;
      if (!r) return;
      const mx = (e.clientX - r.left)  / r.width  - 0.5;
      const my = (e.clientY - r.top)   / r.height - 0.5;

      card.style.setProperty("--tilt-y", `${mx * -7}deg`);
      card.style.setProperty("--tilt-x", `${my *  4}deg`);
    };
    const onMouseLeaveStage = () => {
      const card = trackRef.current?.querySelector(".svc-card.pos-center");
      if (!card) return;
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--tilt-x", "0deg");
    };

    stage.addEventListener("mousedown",   onMouseDown);
    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    onMouseUp);
    stage.addEventListener("touchstart",  onTouchStart,     { passive: true });
    stage.addEventListener("touchmove",   onTouchMove,      { passive: true });
    stage.addEventListener("touchend",    onTouchEnd);
    stage.addEventListener("wheel",       onWheel,          { passive: false });
    stage.addEventListener("mousemove",   onMouseMoveStage);
    stage.addEventListener("mouseleave",  onMouseLeaveStage);

    return () => {
      stage.removeEventListener("mousedown",   onMouseDown);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    onMouseUp);
      stage.removeEventListener("touchstart",  onTouchStart);
      stage.removeEventListener("touchmove",   onTouchMove);
      stage.removeEventListener("touchend",    onTouchEnd);
      stage.removeEventListener("wheel",       onWheel);
      stage.removeEventListener("mousemove",   onMouseMoveStage);
      stage.removeEventListener("mouseleave",  onMouseLeaveStage);
    };
  }, []); // eslint-disable-line

  // ── CSS position class (wrap-aware delta) ─────────────────────────────────
  const posClass = (realIdx) => {
    let d = realIdx - centerIdx;
    if (d >  N / 2) d -= N;
    if (d < -N / 2) d += N;
    if (d ===  0) return "svc-card pos-center";
    if (d === -1) return "svc-card pos-l1";
    if (d === -2) return "svc-card pos-l2";
    if (d ===  1) return "svc-card pos-r1";
    if (d ===  2) return "svc-card pos-r2";
    return "svc-card";
  };

  return (
    <section className="svc-section section--alt">
      <style>{css}</style>

      <div className="svc-header">
        <div>
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ fontSize: "clamp(1.9rem,3.5vw,2.4rem)", marginTop: 8 }}>
            Simple, focused offerings
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="svc-nav">
            <button
              className="svc-nav-btn"
              aria-label="Previous"
              onClick={() => { stopAuto(); snapStep(-1); scheduleAutoRestart(); }}
            >←</button>
            <button
              className="svc-nav-btn"
              aria-label="Next"
              onClick={() => { stopAuto(); snapStep(1); scheduleAutoRestart(); }}
            >→</button>
          </div>
          <Link className="btn btn--ghost btn--sm" to="/services">View all</Link>
        </div>
      </div>

      <div className="svc-stage" ref={stageRef}>
        <div className="svc-persp">
          <div
            className="svc-track"
            ref={trackRef}
            style={{ paddingLeft: padX, paddingRight: padX }}
          >
            {allItems.map((s) => (
              <div
                key={s._key}
                className={posClass(s._real)}
                onClick={() => { stopAuto(); snapToReal(s._real); scheduleAutoRestart(); }}
              >
                <div className="svc-card-img">
                  <img src={s.image} alt={s.title} loading="lazy" />
                  <div className="svc-card-img-fade" />
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-badge">{s.badge}</div>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                  <div className="svc-card-footer">
                    <Link to="/services" className="btn btn--ghost btn--sm">Learn more</Link>
                    <div className="svc-card-arr">
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="svc-dots">
        {offerings.map((_, i) => (
          <button
            key={i}
            className={`svc-dot${i === centerIdx ? " active" : ""}`}
            onClick={() => { stopAuto(); snapToReal(i); scheduleAutoRestart(); }}
            aria-label={`Go to ${offerings[i].title}`}
          />
        ))}
      </div>
    </section>
  );
}