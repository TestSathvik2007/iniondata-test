import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import service1 from "../assets/images/app_development.png";
import service2 from "../assets/images/application_integration.png";
import service3 from "../assets/images/application_management.png";
import service4 from "../assets/images/application_maintenance.png";
import service5 from "../assets/images/project_management.png";
import service6 from "../assets/images/consulting_services.png";
import service7 from "../assets/images/teams_application.png";
import service8 from "../assets/images/operational_efficiency.png";
import service9 from "../assets/images/dataengineering.jpg";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const offerings = [
  { title: "Application Development",                         desc: "Transforming heritage portfolios to flexible, modular application development.",      badge: "Development", image: service1, path: "/services/app-development" },
  { title: "Application Design, Development and Integration", desc: "Full range of requirements gathering, prototyping, implementation, and integration.", badge: "Integration", image: service2, path: "/services/app-integration" },
  { title: "Application Management and Support",              desc: "Providing management and support service for new and existing applications.",         badge: "Support",     image: service3, path: "/services/app-management" },
  { title: "Data Engineering",                                desc: "Building scalable, secure data pipelines and analytics platforms.",                   badge: "Data",        image: service9, path: "/services/data-engineering" },
  { title: "Application Maintenance",                         desc: "Conducting reviews and ensuring standards.",                                          badge: "Maintenance", image: service4, path: "/services/app-maintenance" },
  { title: "Project Management",                              desc: "Establishing and managing timelines to budget.",                                      badge: "Management",  image: service5, path: "/services/project-management" },
  { title: "Consulting Services",                             desc: "Assessing needs, requirements, and goals for cross-functional applications.",         badge: "Consulting",  image: service6, path: "/services/consulting" },
  { title: "Teams Application Development and Integration",   desc: "Developing bots, message extensions, and Teams integrations.",                       badge: "Teams",       image: service7, path: "/services/teams-integration" },
  { title: "Operational Efficiency and Fast Growth",          desc: "Ensure efficient and cost-effective application development.",                        badge: "Efficiency",  image: service8, path: "/services/operational-efficiency" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const GAP         = 16;
const N           = offerings.length;
const CLONE_COUNT = 3;
const TOTAL       = CLONE_COUNT + N + CLONE_COUNT;

// Infinite loop item list: [tail clones] [real items] [head clones]
const allItems = [
  ...offerings.slice(N - CLONE_COUNT).map((s, i) => ({ ...s, _key: `ct-${i}`, _real: N - CLONE_COUNT + i })),
  ...offerings.map((s, i)             => ({ ...s, _key: `r-${i}`,  _real: i })),
  ...offerings.slice(0, CLONE_COUNT).map((s, i)  => ({ ...s, _key: `ch-${i}`, _real: i })),
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

// Card width is purely JS-driven — no CSS width rules for .svc-card
function calcCardWidth(stageW) {
  if (stageW <= 400) return stageW - 56;          // ~full width, 28px peek each side
  if (stageW <= 640) return Math.round(stageW * 0.78); // ~78% on small mobile
  if (stageW <= 960) return 280;
  return 300;
}

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const css = `
  .svc-section {
    padding: clamp(40px,7vw,100px) 0;
    position: relative;
    z-index: 1;
  }

  .svc-header {
    max-width: min(1400px,100%);
    margin: 0 auto;
    padding: 0 clamp(16px,4vw,40px) clamp(16px,3vw,32px);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
  }

  /* Stage: overflow hidden, NO touch-action so JS can capture horizontal swipes */
  .svc-stage {
    overflow: hidden;
    position: relative;
    padding: 36px 0 52px;
    /* Soft fade edges */
    mask-image: linear-gradient(to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%);
    -webkit-mask-image: linear-gradient(to right,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%);
  }

  .svc-persp {
    perspective: 1400px;
    perspective-origin: 50% 38%;
  }

  .svc-track {
    display: flex;
    gap: ${GAP}px;
    will-change: transform;
    /* transition applied by JS only during snap, never CSS-only */
  }

  /* ── Cards ── */
  .svc-card {
    flex-shrink: 0;
    border-radius: 18px;
    overflow: hidden;
    background: #0b1914;
    border: 1px solid rgba(255,255,255,0.07);
    cursor: pointer;
    --tilt-x: 0deg;
    --tilt-y: 0deg;
    opacity: 0.30;
    filter: brightness(0.50);
    transform:
      scale(0.78)
      rotateY(20deg)
      translateZ(-90px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition:
      opacity      0.48s cubic-bezier(0.22,1,0.36,1),
      filter       0.48s cubic-bezier(0.22,1,0.36,1),
      transform    0.48s cubic-bezier(0.22,1,0.36,1),
      box-shadow   0.48s cubic-bezier(0.22,1,0.36,1),
      border-color 0.32s ease;
    position: relative;
    z-index: 1;
  }

  .svc-card.pos-center {
    opacity: 1; filter: none;
    transform:
      scale(1.02) rotateY(0deg) translateZ(18px)
      rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    border-color: rgba(20,184,166,0.50);
    box-shadow:
      0 28px 70px rgba(0,0,0,0.55),
      0 0 0 1px rgba(20,184,166,0.22),
      0 0 48px rgba(20,184,166,0.07);
    z-index: 10;
  }
  .svc-card.pos-l1 {
    opacity: 0.80; filter: brightness(0.76);
    transform: scale(0.92) rotateY(13deg) translateZ(-26px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 6;
  }
  .svc-card.pos-l2 {
    opacity: 0.48; filter: brightness(0.55);
    transform: scale(0.83) rotateY(22deg) translateZ(-72px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 4;
  }
  .svc-card.pos-r1 {
    opacity: 0.80; filter: brightness(0.76);
    transform: scale(0.92) rotateY(-13deg) translateZ(-26px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 6;
  }
  .svc-card.pos-r2 {
    opacity: 0.48; filter: brightness(0.55);
    transform: scale(0.83) rotateY(-22deg) translateZ(-72px) rotateY(var(--tilt-y)) rotateX(var(--tilt-x));
    z-index: 4;
  }

  /* ── Card internals ── */
  .svc-card-img {
    width: 100%; height: 160px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
    background: rgba(20,184,166,0.05);
  }
  @media(min-width:641px) { .svc-card-img { height: 175px; } }
  @media(min-width:961px) { .svc-card-img { height: 190px; } }

  .svc-card-img img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                filter    0.55s cubic-bezier(0.22,1,0.36,1);
    filter: brightness(0.80) saturate(0.82);
    pointer-events: none; user-select: none; -webkit-user-select: none;
  }
  .svc-card.pos-center .svc-card-img img {
    transform: scale(1.06);
    filter: brightness(1) saturate(1);
  }
  .svc-card-img-fade {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(7,16,14,0.58) 0%, transparent 52%);
    pointer-events: none;
  }

  .svc-card-body { padding: 14px 16px 18px; }

  .svc-card-badge {
    display: inline-flex; align-items: center;
    padding: 3px 10px; font-size: 10px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; border-radius: 999px;
    background: rgba(20,184,166,0.12); color: #2dd4bf;
    border: 1px solid rgba(20,184,166,0.22); margin-bottom: 8px;
  }

  .svc-card-title {
    font-size: 15px; font-weight: 700;
    letter-spacing: -0.022em; color: #dff0e8;
    margin: 0 0 6px; line-height: 1.25;
  }
  .svc-card-desc {
    font-size: 12px; line-height: 1.65; color: #7a9e8e; margin: 0;
  }

  .svc-card-footer {
    margin-top: 14px; padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex; align-items: center; justify-content: space-between; gap: 8px;
  }

  .svc-card-arr {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.10);
    display: flex; align-items: center; justify-content: center;
    color: #2dd4bf; flex-shrink: 0;
    transition: background 0.2s ease, border-color 0.2s ease,
                transform 0.26s cubic-bezier(0.34,1.56,0.64,1);
  }
  .svc-card:hover .svc-card-arr {
    background: rgba(20,184,166,0.15);
    border-color: rgba(20,184,166,0.36);
    transform: translateX(3px);
  }

  /* ── Dots ── */
  .svc-dots {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; gap: 6px;
    margin-top: 18px; padding: 0 16px;
  }
  .svc-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none; padding: 0; flex-shrink: 0; cursor: pointer;
    transition: all 0.30s cubic-bezier(0.22,1,0.36,1);
  }
  .svc-dot.active { width: 22px; border-radius: 4px; background: #14b8a6; }

  /* ── Nav buttons ── */
  .svc-nav { display: flex; gap: 8px; }
  .svc-nav-btn {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.13);
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    color: #2dd4bf; font-size: 15px; line-height: 1;
    transition: background 0.18s ease, border-color 0.18s ease,
                transform  0.20s cubic-bezier(0.34,1.56,0.64,1);
  }
  .svc-nav-btn:hover  { background: rgba(20,184,166,0.13); border-color: rgba(20,184,166,0.36); transform: scale(1.08); }
  .svc-nav-btn:active { transform: scale(0.93); }

  /* ── Mobile header stacks ── */
  @media(max-width:600px) {
    .svc-header { flex-direction: column; align-items: flex-start; gap: 10px; }
    .svc-stage  { padding: 24px 0 40px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesCarousel() {
  const stageRef     = useRef(null);
  const trackRef     = useRef(null);
  const padXRef      = useRef(0);
  const cardWRef     = useRef(300);
  const stepRef      = useRef(316);
  const stageRectRef = useRef(null);

  // Current pixel offset (what iIdx * step the track is sitting at)
  const offsetRef  = useRef(0);
  const itemIdxRef = useRef(CLONE_COUNT);

  // Drag / touch state — all in one ref to avoid stale closures
  const pointerRef = useRef({
    active:      false,
    startX:      0,
    startOffset: 0,
    lastX:       0,
    lastT:       0,
    velocityX:   0,
    isTouchLocked: false, // true once we've decided this is a horizontal gesture
    isVertLocked:  false, // true once we've decided this is a vertical scroll
  });

  const teleportRef     = useRef(false);
  const autoTimerRef    = useRef(null);
  const restartTimerRef = useRef(null);
  const rafRef          = useRef(null);
  const lastWheelRef    = useRef(0);

  const [centerIdx, setCenterIdx] = useState(0);
  const [trackIdx,  setTrackIdx]  = useState(CLONE_COUNT);

  // ── Low-level transform ─────────────────────────────────────────────────────

  const setTranslate = useCallback((rawPx) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${padXRef.current - rawPx}px)`;
    offsetRef.current = rawPx;
  }, []);

  // ── Card width sync ─────────────────────────────────────────────────────────

  const syncCardWidths = useCallback(() => {
    if (!trackRef.current) return;
    const w = `${cardWRef.current}px`;
    Array.from(trackRef.current.children).forEach((el) => { el.style.width = w; });
  }, []);

  // ── Teleport for infinite loop ──────────────────────────────────────────────

  const teleportIfClone = useCallback((iIdx) => {
    const isHead = iIdx >= CLONE_COUNT + N;
    const isTail = iIdx < CLONE_COUNT;
    if (!isHead && !isTail) return;
    const target = isHead ? iIdx - N : iIdx + N;
    teleportRef.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
    setTranslate(target * stepRef.current);
    itemIdxRef.current = target;
    setTrackIdx(target);
    requestAnimationFrame(() => { teleportRef.current = false; });
  }, [setTranslate]);

  // ── Snap to item index ──────────────────────────────────────────────────────

  const snapToItem = useCallback((iIdx, smooth = true) => {
    if (teleportRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, iIdx));
    itemIdxRef.current = clamped;
    setCenterIdx(allItems[clamped]._real);
    setTrackIdx(clamped);
    if (!trackRef.current) return;

    if (smooth) {
      const track = trackRef.current;
      track.style.transition = "transform 0.50s cubic-bezier(0.22,1,0.36,1)";
      const onEnd = (ev) => {
        if (ev.propertyName !== "transform") return;
        track.removeEventListener("transitionend", onEnd);
        track.style.transition = "none";
        teleportIfClone(clamped);
      };
      track.addEventListener("transitionend", onEnd);
    } else {
      trackRef.current.style.transition = "none";
    }

    setTranslate(clamped * stepRef.current);
    if (!smooth) teleportIfClone(clamped);
  }, [setTranslate, teleportIfClone]);

  const snapToReal = useCallback((realIdx) => {
    snapToItem(CLONE_COUNT + (((realIdx % N) + N) % N));
  }, [snapToItem]);

  const snapStep = useCallback((delta) => {
    snapToItem(Math.max(0, Math.min(TOTAL - 1, itemIdxRef.current + delta)));
  }, [snapToItem]);

  // ── Snap from raw pixel offset (used after drag/momentum ends) ──────────────

  const snapFromOffset = useCallback((currentOffset) => {
    const raw     = Math.round((currentOffset - padXRef.current) / stepRef.current) + CLONE_COUNT;
    const nearest = Math.round(currentOffset / stepRef.current);
    // prefer nearest-to-current which accounts for padding correctly
    const best = Math.round((currentOffset) / stepRef.current);
    const clamped = Math.max(CLONE_COUNT, Math.min(CLONE_COUNT + N - 1, best));
    snapToItem(clamped);
  }, [snapToItem]);

  // ── Auto-advance ────────────────────────────────────────────────────────────

  const stopAuto = useCallback(() => {
    clearInterval(autoTimerRef.current);
    clearTimeout(restartTimerRef.current);
  }, []);

  const startAuto = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => snapStep(1), 3800);
  }, [snapStep]);

  const scheduleRestart = useCallback((delay = 2200) => {
    clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(startAuto, delay);
  }, [startAuto]);

  // ── Resize: recalculate card width, step, padding, re-center ───────────────

  useEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      const stageW   = stageRef.current.offsetWidth;
      const newCardW = calcCardWidth(stageW);
      const newStep  = newCardW + GAP;

      cardWRef.current = newCardW;
      stepRef.current  = newStep;
      padXRef.current  = Math.floor((stageW - newCardW) / 2);

      stageRectRef.current = stageRef.current.getBoundingClientRect();
      syncCardWidths();
      // Re-center current card without animation
      if (trackRef.current) trackRef.current.style.transition = "none";
      setTranslate(itemIdxRef.current * newStep);
    };

    update();
    const ro = new ResizeObserver(update);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [syncCardWidths, setTranslate]);

  // Initial position + auto-start
  useEffect(() => {
    snapToItem(CLONE_COUNT, false);
    startAuto();
    return () => {
      stopAuto();
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pointer / touch events ──────────────────────────────────────────────────

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // ── MOUSE ──

    const onMouseDown = (e) => {
      if (teleportRef.current) return;
      cancelAnimationFrame(rafRef.current);
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      pointerRef.current = {
        ...pointerRef.current,
        active:      true,
        startX:      e.clientX,
        startOffset: offsetRef.current,
        lastX:       e.clientX,
        lastT:       Date.now(),
        velocityX:   0,
        isTouchLocked: true,
        isVertLocked:  false,
      };
      e.preventDefault();
    };

    const onMouseMove = (e) => {
      const p = pointerRef.current;
      if (!p.active) return;
      const now  = Date.now();
      const dt   = now - p.lastT || 16;
      const dx   = e.clientX - p.lastX;
      p.velocityX  = dx / dt;   // px/ms
      p.lastX      = e.clientX;
      p.lastT      = now;
      setTranslate(p.startOffset + (p.startX - e.clientX));
    };

    const onMouseUp = () => {
      const p = pointerRef.current;
      if (!p.active) return;
      p.active = false;
      applyMomentum(p.velocityX);
      scheduleRestart();
    };

    // ── TOUCH ──

    const onTouchStart = (e) => {
      if (teleportRef.current || e.touches.length !== 1) return;
      cancelAnimationFrame(rafRef.current);
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      const t = e.touches[0];
      pointerRef.current = {
        active:        true,
        startX:        t.clientX,
        startY:        t.clientY,
        startOffset:   offsetRef.current,
        lastX:         t.clientX,
        lastT:         Date.now(),
        velocityX:     0,
        isTouchLocked: false,  // undecided
        isVertLocked:  false,
      };
    };

    const onTouchMove = (e) => {
      const p = pointerRef.current;
      if (!p.active) return;

      const t  = e.touches[0];
      const dx = t.clientX - p.startX;
      const dy = t.clientY - p.startY;

      // Decide axis on first significant move (>4px)
      if (!p.isTouchLocked && !p.isVertLocked) {
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 4) {
          p.isTouchLocked = true;   // horizontal — we own this gesture
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 4) {
          p.isVertLocked = true;    // vertical — let browser scroll
          p.active = false;
          return;
        }
      }

      if (!p.isTouchLocked) return; // not decided yet

      // We own it — prevent page scroll
      e.preventDefault();

      const now = Date.now();
      const dt  = now - p.lastT || 16;
      const vx  = (t.clientX - p.lastX) / dt;
      p.velocityX = vx;
      p.lastX     = t.clientX;
      p.lastT     = now;

      setTranslate(p.startOffset + (p.startX - t.clientX));
    };

    const onTouchEnd = () => {
      const p = pointerRef.current;
      if (!p.active) return;
      p.active = false;
      if (p.isTouchLocked) {
        applyMomentum(p.velocityX);
      }
      scheduleRestart();
    };

    // ── MOMENTUM ──

    function applyMomentum(velocityX) {
      // velocityX is px/ms, positive = moved right = dragged right = offset decreased
      const FRICTION   = 0.92;        // per frame decay
      const MIN_V      = 0.05;        // px/ms threshold to stop
      const SNAP_BOOST = 340;         // amplify to cross at least one card on a quick flick

      let v = -velocityX * SNAP_BOOST * 0.01; // convert to per-frame offset delta

      // If swipe was strong enough to skip a card, just step ±1
      if (Math.abs(v) > stepRef.current * 0.35) {
        snapStep(v > 0 ? 1 : -1);
        return;
      }

      // Otherwise momentum-scroll then snap
      let current = offsetRef.current;

      const tick = () => {
        v *= FRICTION;
        current += v;
        setTranslate(current);
        if (Math.abs(v) > MIN_V) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          snapFromOffset(current);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    // ── WHEEL ──

    const onWheel = (e) => {
      e.preventDefault();
      if (teleportRef.current) return;
      const now = Date.now();
      if (now - lastWheelRef.current < 600) return;
      const val = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(val) < 12) return;
      lastWheelRef.current = now;
      stopAuto();
      snapStep(val > 0 ? 1 : -1);
      scheduleRestart(2200);
    };

    // ── MOUSE TILT (desktop only) ──

    const onMouseMoveTilt = (e) => {
      if (pointerRef.current.active) return;
      const card = trackRef.current?.children[itemIdxRef.current];
      if (!card || !stageRectRef.current) return;
      const r = stageRectRef.current;
      card.style.setProperty("--tilt-y", `${((e.clientX - r.left) / r.width - 0.5) * -7}deg`);
      card.style.setProperty("--tilt-x", `${((e.clientY - r.top)  / r.height - 0.5) * 5}deg`);
    };
    const onMouseLeave = () => {
      const card = trackRef.current?.children[itemIdxRef.current];
      if (!card) return;
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--tilt-x", "0deg");
    };

    // Register — touchmove must be NON-passive so we can preventDefault
    stage.addEventListener("mousedown",  onMouseDown,  { passive: false });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup",   onMouseUp);
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove",  onTouchMove,  { passive: false }); // ← critical
    stage.addEventListener("touchend",   onTouchEnd,   { passive: true });
    stage.addEventListener("wheel",      onWheel,      { passive: false });
    stage.addEventListener("mousemove",  onMouseMoveTilt);
    stage.addEventListener("mouseleave", onMouseLeave);

    return () => {
      stage.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup",   onMouseUp);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove",  onTouchMove);
      stage.removeEventListener("touchend",   onTouchEnd);
      stage.removeEventListener("wheel",      onWheel);
      stage.removeEventListener("mousemove",  onMouseMoveTilt);
      stage.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [setTranslate, snapStep, snapFromOffset, stopAuto, scheduleRestart]);

  // ── Position class ──────────────────────────────────────────────────────────

  const getPosClass = (idx) => {
    const d = idx - trackIdx;
    if (d === 0)  return "svc-card pos-center";
    if (d === -1) return "svc-card pos-l1";
    if (d === -2) return "svc-card pos-l2";
    if (d === 1)  return "svc-card pos-r1";
    if (d === 2)  return "svc-card pos-r2";
    return "svc-card";
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <section className="svc-section section--alt">
      <style>{css}</style>

      <div className="svc-header">
        <div>
          <div className="kicker reveal">Services</div>
          <h2 className="h2 reveal" style={{ marginTop: 8 }}>End-to-end solutions, built to scale</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="svc-nav">
            <button className="svc-nav-btn" aria-label="Previous"
              onClick={() => { stopAuto(); snapStep(-1); scheduleRestart(); }}>←</button>
            <button className="svc-nav-btn" aria-label="Next"
              onClick={() => { stopAuto(); snapStep(1);  scheduleRestart(); }}>→</button>
          </div>
          <Link className="btn btn--ghost btn--sm" to="/services">View all</Link>
        </div>
      </div>

      <div className="svc-stage" ref={stageRef}>
        <div className="svc-persp">
          <div className="svc-track" ref={trackRef}>
            {allItems.map((s, idx) => (
              <div
                key={s._key}
                className={getPosClass(idx)}
                onClick={() => { stopAuto(); snapToReal(s._real); scheduleRestart(); }}
              >
                <div className="svc-card-img">
                  <img src={s.image} alt={s.title} loading="lazy" draggable={false} />
                  <div className="svc-card-img-fade" />
                </div>
                <div className="svc-card-body">
                  <div className="svc-card-badge">{s.badge}</div>
                  <h3 className="svc-card-title">{s.title}</h3>
                  <p className="svc-card-desc">{s.desc}</p>
                  <div className="svc-card-footer">
                    <Link
                      to={s.path}
                      className="btn btn--ghost btn--sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Learn more
                    </Link>
                    <div className="svc-card-arr" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7"
                          strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="svc-dots" role="tablist" aria-label="Service slides">
        {offerings.map((s, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === centerIdx}
            aria-label={`Go to ${s.title}`}
            className={`svc-dot${i === centerIdx ? " active" : ""}`}
            onClick={() => { stopAuto(); snapToReal(i); scheduleRestart(); }}
          />
        ))}
      </div>
    </section>
  );
}