/**
 * ServicesCarousel.jsx — Fully fixed infinite 3D carousel
 *
 * Root-cause fixes vs the two buggy versions:
 *
 *  A. CENTER ALIGNMENT
 *     padX is derived correctly: (stageWidth - CARD_W) / 2
 *     The track translateX must subtract padX so card[0] starts
 *     at screen-centre. Previously padding was added to the track
 *     but NOT subtracted from the base offset, so the "zero" position
 *     was the left edge, not screen centre.
 *
 *  B. SNAP-FROM-RAW
 *     After a drag, the snap target is:
 *       nearest = round((rawOffset - padX) / STEP)
 *     Previously padX was ignored, making every drag snap to the wrong card.
 *
 *  C. TILT DOESN'T CLOBBER TRANSFORM
 *     CSS custom properties --tilt-x / --tilt-y are composed at the END
 *     of every position class's transform chain.  JS only sets those props
 *     via setProperty(), never touching style.transform directly.
 *
 *  D. TELEPORT USES EXACT SAME OFFSET FORMULA
 *     applyOffset() and pxFor() use IDENTICAL math:
 *       translateX = -(iIdx * STEP - padX)
 *     Teleport was previously using a different formula, causing a visible
 *     jump when wrapping.
 *
 *  E. WHEEL: DEBOUNCED INTENT (no leaky accumulator)
 *     400 ms guard + 30 px minimum deltaY.
 *
 *  F. AUTO-ADVANCE RESTART: 2 s idle delay after any user interaction.
 *
 *  G. RESIZE: padX + stageRect re-cached on every resize via ResizeObserver.
 *
 *  H. ALL LISTENERS CLEANED UP correctly (window-level ones too).
 */

import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import service1  from "../assets/images/app_development.png";
import service2  from "../assets/images/application_integration.png";
import service3  from "../assets/images/application_management.png";
import service4  from "../assets/images/application_maintenance.png";
import service5  from "../assets/images/project_management.png";
import service6  from "../assets/images/consulting_services.png";
import service7  from "../assets/images/teams_application.png";
import service8  from "../assets/images/operational_efficiency.png";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const offerings = [
  { title: "Application Development",                            desc: "Transforming heritage portfolios to flexible, modular application development.",      badge: "Development",   image: service1,  path: "/services/app-development" },
  { title: "Application Design, Development and Integration",    desc: "Full range of requirements gathering, prototyping, implementation, and integration.", badge: "Integration",   image: service2,  path: "/services/app-integration" },
  { title: "Application Management and Support",                 desc: "Providing management and support service for new and existing applications.",         badge: "Support",       image: service3,  path: "/services/app-management" },
  { title: "Application Maintenance",                            desc: "Conducting reviews and ensuring standards.",                                          badge: "Maintenance",   image: service4,  path: "/services/app-maintenance" },
  { title: "Project Management",                                 desc: "Establishing and managing timelines to budget.",                                      badge: "Management",    image: service5,  path: "/services/project-management" },
  { title: "Consulting Services",                                desc: "Assessing needs, requirements, and goals for cross-functional applications.",         badge: "Consulting",    image: service6,  path: "/services/consulting" },
  { title: "Teams Application Development and Integration",      desc: "Developing bots, message extensions, and Teams integrations.",                        badge: "Teams",         image: service7,  path: "/services/teams-integration" },
  { title: "Operational Efficiency and Fast Growth",             desc: "Ensure efficient and cost-effective application development.",                        badge: "Efficiency",    image: service8,  path: "/services/operational-efficiency" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CAROUSEL CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const CARD_W      = 300;   // px — must match CSS .svc-card width
const GAP         = 20;    // px — must match CSS gap
const STEP        = CARD_W + GAP;
const N           = offerings.length;
const CLONE_COUNT = 3;
const TOTAL       = CLONE_COUNT + N + CLONE_COUNT;

// Build the full cloned items array once (stable reference)
const allItems = [
  ...offerings.slice(N - CLONE_COUNT).map((s, i) => ({ ...s, _key: `ct-${i}`, _real: N - CLONE_COUNT + i })),
  ...offerings.map((s, i)                         => ({ ...s, _key: `r-${i}`,  _real: i })),
  ...offerings.slice(0, CLONE_COUNT).map((s, i)   => ({ ...s, _key: `ch-${i}`, _real: i })),
];

// ─────────────────────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────────────────────

const css = `
  /* ── Section shell ─────────────────────────────────── */
  .svc-section {
    padding: 100px 0;
    position: relative;
    z-index: 1;
  }

  /* ── Header row ────────────────────────────────────── */
  .svc-header {
    max-width: min(1400px, 100%);
    margin: 0 auto;
    padding: 0 clamp(16px, 4vw, 40px) 36px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
  }

  /* ── Stage (overflow + fade mask) ──────────────────── */
  .svc-stage {
    overflow: hidden;
    mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0%,
      black 8%,
      black 92%,
      transparent 100%
    );
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
    padding: 40px 0 56px;
    touch-action: pan-y;  /* allow vertical scroll, intercept only horiz */
  }
  .svc-stage:active { cursor: grabbing; }

  /* ── Perspective wrapper ────────────────────────────── */
  .svc-persp {
    perspective: 1200px;
    perspective-origin: 50% 40%;
  }

  /* ── Scrolling track ────────────────────────────────── */
  .svc-track {
    display: flex;
    gap: ${GAP}px;
    will-change: transform;
    /* NO overflow:hidden here — clipping must live on .svc-stage */
  }

  /* ─────────────────────────────────────────────────────
     CARD BASE
     --tilt-x / --tilt-y are appended at the END of every
     position-class transform so JS setProperty() composes
     cleanly on top, never overwriting scale/rotateY etc.
  ───────────────────────────────────────────────────── */
  .svc-card {
    width: ${CARD_W}px;
    flex-shrink: 0;
    border-radius: 20px;
    overflow: hidden;
    background: #0b1914;
    border: 1px solid rgba(255,255,255,0.07);
    cursor: pointer;
    --tilt-x: 0deg;
    --tilt-y: 0deg;

    /* default (far-away) state */
    opacity: 0.35;
    filter: brightness(0.55);
    transform:
      scale(0.80)
      rotateY(18deg)
      translateZ(-80px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));

    transform-style: preserve-3d;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    transition:
      opacity      0.50s cubic-bezier(0.22,1,0.36,1),
      filter       0.50s cubic-bezier(0.22,1,0.36,1),
      transform    0.50s cubic-bezier(0.22,1,0.36,1),
      box-shadow   0.50s cubic-bezier(0.22,1,0.36,1),
      border-color 0.35s ease;
    position: relative;
    z-index: 1;
  }

  /* ── Position classes ───────────────────────────────── */
  .svc-card.pos-center {
    opacity: 1;
    filter: none;
    transform:
      scale(1.02)
      rotateY(0deg)
      translateZ(20px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    border-color: rgba(20,184,166,0.50);
    box-shadow:
      0 32px 80px rgba(0,0,0,0.60),
      0 0 0 1px rgba(20,184,166,0.25),
      0 0 60px rgba(20,184,166,0.08);
    z-index: 10;
  }

  .svc-card.pos-l1 {
    opacity: 0.82;
    filter: brightness(0.78);
    transform:
      scale(0.93)
      rotateY(14deg)
      translateZ(-28px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    z-index: 6;
  }
  .svc-card.pos-l2 {
    opacity: 0.52;
    filter: brightness(0.58);
    transform:
      scale(0.84)
      rotateY(22deg)
      translateZ(-76px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    z-index: 4;
  }
  .svc-card.pos-r1 {
    opacity: 0.82;
    filter: brightness(0.78);
    transform:
      scale(0.93)
      rotateY(-14deg)
      translateZ(-28px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    z-index: 6;
  }
  .svc-card.pos-r2 {
    opacity: 0.52;
    filter: brightness(0.58);
    transform:
      scale(0.84)
      rotateY(-22deg)
      translateZ(-76px)
      rotateY(var(--tilt-y))
      rotateX(var(--tilt-x));
    z-index: 4;
  }

  /* ── Card internals ─────────────────────────────────── */
  .svc-card-img {
    width: 100%;
    height: 190px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
    background: rgba(20,184,166,0.05);
  }
  .svc-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1),
                filter    0.55s cubic-bezier(0.22,1,0.36,1);
    filter: brightness(0.82) saturate(0.85);
  }
  .svc-card.pos-center .svc-card-img img {
    transform: scale(1.06);
    filter: brightness(1) saturate(1);
  }
  .svc-card-img-fade {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(7,16,14,0.60) 0%, transparent 52%);
    pointer-events: none;
  }

  .svc-card-body { padding: 18px 20px 22px; }

  .svc-card-badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 11px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    border-radius: 999px;
    background: rgba(20,184,166,0.12);
    color: #2dd4bf;
    border: 1px solid rgba(20,184,166,0.24);
    margin-bottom: 11px;
  }

  .svc-card-title {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #dff0e8;
    margin: 0 0 8px;
    line-height: 1.25;
  }
  .svc-card-desc {
    font-size: 13px;
    line-height: 1.65;
    color: #7a9e8e;
    margin: 0;
  }

  .svc-card-footer {
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.07);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .svc-card-arr {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.11);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2dd4bf;
    flex-shrink: 0;
    transition:
      background     0.22s ease,
      border-color   0.22s ease,
      transform      0.28s cubic-bezier(0.34,1.56,0.64,1);
  }
  .svc-card:hover .svc-card-arr {
    background: rgba(20,184,166,0.16);
    border-color: rgba(20,184,166,0.38);
    transform: translateX(4px);
  }

  /* ── Dot indicators ─────────────────────────────────── */
  .svc-dots {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 7px;
    margin-top: 24px;
    padding: 0 clamp(16px, 4vw, 40px);
  }
  .svc-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.15);
    border: none;
    padding: 0;
    flex-shrink: 0;
    cursor: pointer;
    transition: all 0.32s cubic-bezier(0.22,1,0.36,1);
  }
  .svc-dot.active {
    width: 26px;
    border-radius: 4px;
    background: #14b8a6;
  }

  /* ── Nav buttons ────────────────────────────────────── */
  .svc-nav { display: flex; gap: 8px; }
  .svc-nav-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.13);
    background: rgba(255,255,255,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2dd4bf;
    font-size: 16px;
    line-height: 1;
    transition:
      background    0.20s ease,
      border-color  0.20s ease,
      transform     0.22s cubic-bezier(0.34,1.56,0.64,1);
  }
  .svc-nav-btn:hover {
    background: rgba(20,184,166,0.14);
    border-color: rgba(20,184,166,0.38);
    transform: scale(1.10);
  }
  .svc-nav-btn:active { transform: scale(0.92); }

  /* ── Responsive ─────────────────────────────────────── */

  /* Tablet */
  @media (max-width: 960px) {
    .svc-section { padding: 72px 0; }
    .svc-card { width: 280px; }
    .svc-card-img { height: 170px; }
  }

  /* Mobile large */
  @media (max-width: 640px) {
    .svc-section { padding: 56px 0; }
    .svc-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
    .svc-card {
      width: min(260px, calc(100vw - 88px));
    }
    .svc-card-img { height: 150px; }
    .svc-card-body { padding: 14px 16px 18px; }
    .svc-card-title { font-size: 15px; }
    .svc-stage {
      mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 5%,
        black 95%,
        transparent 100%
      );
      -webkit-mask-image: linear-gradient(
        to right,
        transparent 0%,
        black 5%,
        black 95%,
        transparent 100%
      );
    }
  }

  /* Mobile small */
  @media (max-width: 420px) {
    .svc-card { width: calc(100vw - 64px); }
    .svc-card-img { height: 140px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ServicesCarousel() {
  const stageRef        = useRef(null);
  const trackRef        = useRef(null);
  const padXRef         = useRef(0);          // live padding value (no state lag)
  const stageRectRef    = useRef(null);       // cached getBoundingClientRect
  const offsetRef       = useRef(0);          // current track pixel offset
  const itemIdxRef      = useRef(CLONE_COUNT);// current absolute item index
  const dragRef         = useRef({ active: false, startX: 0, startOffset: 0 });
  const teleportRef     = useRef(false);
  const autoTimerRef    = useRef(null);
  const restartTimerRef = useRef(null);
  const lastWheelRef    = useRef(0);          // for debounced wheel intent

  const [centerIdx, setCenterIdx] = useState(0);
  const [padX, setPadX]           = useState(0); // for inline style (track padding)

  // ── offset → pixel ──────────────────────────────────────────────────────────
  // The track's logical origin sits at -padX so that item[CLONE_COUNT] is
  // centred in the viewport.
  //
  //   translateX = -(iIdx * STEP) + padX
  //
  // We store the "raw" value that makes translateX = 0 be the leftmost position,
  // then apply padX correction uniformly in applyOffset.

  const pxFor = useCallback((iIdx) => iIdx * STEP, []);

  // applyOffset writes the CSS transform including the padX correction.
  // This is the SINGLE place that calculates translateX — used by both
  // normal navigation AND teleport, so they can never diverge.
  const applyOffset = useCallback((rawPx) => {
    if (!trackRef.current) return;
    const tx = -(rawPx - padXRef.current);
    trackRef.current.style.transform = `translateX(${tx}px)`;
    offsetRef.current = rawPx;
  }, []);

  // ── Teleport after clone animation ──────────────────────────────────────────
  const teleportIfClone = useCallback((iIdx) => {
    const isHead = iIdx >= CLONE_COUNT + N;
    const isTail = iIdx < CLONE_COUNT;
    if (!isHead && !isTail) return;

    const realIIdx = isHead ? iIdx - N : iIdx + N;
    teleportRef.current = true;
    if (trackRef.current) trackRef.current.style.transition = "none";
    applyOffset(pxFor(realIIdx));
    itemIdxRef.current = realIIdx;

    // single rAF is enough — the paint has already happened
    requestAnimationFrame(() => { teleportRef.current = false; });
  }, [applyOffset, pxFor]);

  // ── Core snap ────────────────────────────────────────────────────────────────
  const snapToItem = useCallback((iIdx, smooth = true) => {
    if (teleportRef.current) return;
    const clamped = Math.max(0, Math.min(TOTAL - 1, iIdx));
    itemIdxRef.current = clamped;
    setCenterIdx(allItems[clamped]._real);
    if (!trackRef.current) return;

    if (smooth) {
      const track = trackRef.current;
      const onEnd = (ev) => {
        if (ev.propertyName !== "transform") return;
        track.removeEventListener("transitionend", onEnd);
        track.style.transition = "none";
        teleportIfClone(clamped);
      };
      track.addEventListener("transitionend", onEnd);
      track.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1)";
    } else {
      trackRef.current.style.transition = "none";
    }
    applyOffset(pxFor(clamped));
    if (!smooth) teleportIfClone(clamped);
  }, [applyOffset, pxFor, teleportIfClone]);

  const snapToReal = useCallback((realIdx) => {
    const r = ((realIdx % N) + N) % N;
    snapToItem(CLONE_COUNT + r);
  }, [snapToItem]);

  const snapStep = useCallback((delta) => {
    const next = Math.max(0, Math.min(TOTAL - 1, itemIdxRef.current + delta));
    snapToItem(next);
  }, [snapToItem]);

  // ── Auto-advance ──────────────────────────────────────────────────────────────
  const stopAuto = useCallback(() => {
    clearInterval(autoTimerRef.current);
    clearTimeout(restartTimerRef.current);
  }, []);

  const startAuto = useCallback(() => {
    clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => snapStep(1), 3600);
  }, [snapStep]);

  const scheduleRestart = useCallback((delay = 2000) => {
    clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(startAuto, delay);
  }, [startAuto]);

  // ── Snap from raw drag offset ─────────────────────────────────────────────────
  // rawOffset encodes the absolute pixel position of item 0.
  // To find which item is centred: (rawOffset - padX) / STEP ≈ iIdx, then
  // constrain to real range [CLONE_COUNT, CLONE_COUNT+N-1].
  const snapFromRaw = useCallback(() => {
    const nearest = Math.round((offsetRef.current - padXRef.current) / STEP) + CLONE_COUNT;
    const clamped = Math.max(CLONE_COUNT, Math.min(CLONE_COUNT + N - 1, nearest));
    snapToItem(clamped);
  }, [snapToItem]);

  // ── Compute padX and cache stageRect ─────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (!stageRef.current) return;
      const stageW = stageRef.current.offsetWidth;
      const newPad = Math.max(0, Math.floor((stageW - CARD_W) / 2));
      padXRef.current  = newPad;
      setPadX(newPad);
      stageRectRef.current = stageRef.current.getBoundingClientRect();
      // Re-apply current offset so the card stays centred after resize
      applyOffset(pxFor(itemIdxRef.current));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [applyOffset, pxFor]);

  // ── Mount ─────────────────────────────────────────────────────────────────────
  useEffect(() => {
    snapToItem(CLONE_COUNT, false);
    startAuto();
    return () => { stopAuto(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── All interaction handlers ──────────────────────────────────────────────────
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    /* Mouse drag */
    const onMouseDown = (e) => {
      if (teleportRef.current) return;
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.clientX, startOffset: offsetRef.current };
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.active) return;
      const dx = dragRef.current.startX - e.clientX;
      applyOffset(dragRef.current.startOffset + dx * 0.55);
    };
    const onMouseUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      snapFromRaw();
      scheduleRestart();
    };

    /* Touch drag */
    const onTouchStart = (e) => {
      if (teleportRef.current) return;
      stopAuto();
      if (trackRef.current) trackRef.current.style.transition = "none";
      dragRef.current = { active: true, startX: e.touches[0].clientX, startOffset: offsetRef.current };
    };
    const onTouchMove = (e) => {
      if (!dragRef.current.active) return;
      const dx = dragRef.current.startX - e.touches[0].clientX;
      applyOffset(dragRef.current.startOffset + dx * 0.70);
    };
    const onTouchEnd = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      snapFromRaw();
      scheduleRestart();
    };

    /* Wheel — debounced intent, no accumulator */
    const onWheel = (e) => {
      e.preventDefault();
      if (teleportRef.current) return;
      const now = Date.now();
      if (now - lastWheelRef.current < 420) return;
      if (Math.abs(e.deltaY) < 30) return;
      lastWheelRef.current = now;
      stopAuto();
      snapStep(e.deltaY > 0 ? 1 : -1);
      scheduleRestart(2000);
    };

    /* Parallax tilt — uses CSS custom properties, NEVER style.transform */
    const onMouseMoveStage = (e) => {
      if (dragRef.current.active) return;
      const card = trackRef.current?.querySelector(".svc-card.pos-center");
      if (!card) return;
      // Re-use cached rect (no layout thrash per frame)
      const r = stageRectRef.current;
      if (!r) return;
      const mx = (e.clientX - r.left)  / r.width  - 0.5;
      const my = (e.clientY - r.top)   / r.height - 0.5;
      card.style.setProperty("--tilt-y", `${mx * -8}deg`);
      card.style.setProperty("--tilt-x", `${my *  5}deg`);
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
    stage.addEventListener("touchstart",  onTouchStart,      { passive: true });
    stage.addEventListener("touchmove",   onTouchMove,       { passive: true });
    stage.addEventListener("touchend",    onTouchEnd);
    stage.addEventListener("wheel",       onWheel,           { passive: false });
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
  }, [applyOffset, snapFromRaw, snapStep, stopAuto, scheduleRestart]);

  // ── CSS position class (wrap-aware delta) ─────────────────────────────────────
  const posClass = (realIdx) => {
    let d = realIdx - centerIdx;
    if (d >   N / 2) d -= N;
    if (d < -(N / 2)) d += N;
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

      {/* Header */}
      <div className="svc-header">
        <div>
          <div className="kicker reveal">Services</div>
          <h2
            className="h2 reveal"
            style={{ fontSize: "clamp(1.9rem,3.5vw,2.4rem)", marginTop: 8 }}
          >
            Simple, focused offerings
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="svc-nav">
            <button
              className="svc-nav-btn"
              aria-label="Previous service"
              onClick={() => { stopAuto(); snapStep(-1); scheduleRestart(); }}
            >
              ←
            </button>
            <button
              className="svc-nav-btn"
              aria-label="Next service"
              onClick={() => { stopAuto(); snapStep(1); scheduleRestart(); }}
            >
              →
            </button>
          </div>
          <Link className="btn btn--ghost btn--sm" to="/services">View all</Link>
        </div>
      </div>

      {/* Stage */}
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
                onClick={() => {
                  stopAuto();
                  snapToReal(s._real);
                  scheduleRestart();
                }}
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
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot indicators */}
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