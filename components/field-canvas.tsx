'use client';

import { useEffect, useRef } from 'react';

/**
 * The ambient arrow field behind every page, plus the crosshair cursor.
 *
 * Ported from the hand-written `assets/field.js`. This is the site's only
 * genuinely interactive piece, and the only Client Component that carries real
 * logic — everything else prerenders to HTML and ships no JavaScript of its own.
 */

const CELL = 30;
const ARROW_LEN = 11;

/* The field is painted, not styled, so it reads its own colour out of the
   stylesheet rather than hardcoding one: on white the dark-theme blue at 0.42
   is far too loud, and the light theme sets a deeper hue and a lower alpha. */
const FALLBACK = { color: '#5b9bff', alpha: 0.42 };

function readFieldPalette() {
  const style = getComputedStyle(document.documentElement);
  const color = style.getPropertyValue('--field').trim();
  const alpha = Number.parseFloat(style.getPropertyValue('--field-alpha'));
  return {
    color: color || FALLBACK.color,
    alpha: Number.isFinite(alpha) ? alpha : FALLBACK.alpha,
  };
}

// Cloud-like coverage: two octaves of value noise sampled per cell, slowly
// translated over time. A cell is either drawn or it isn't — no per-cell alpha
// fade — so the field reads as a noise map where arrows switch on and off at the
// drifting cloud edge, not as soft static blobs.
const NOISE_SCALE = 0.0048;
const NOISE_THRESHOLD = 0.63;
const DRIFT_SPEED_X = 0.000018;
const DRIFT_SPEED_Y = 0.000011;

// Magnetic-field scatter: cells within FIELD_RADIUS of the cursor are pushed
// radially outward, like iron filings parting around a pole, while still
// pointing at it. Falls off to zero displacement beyond FIELD_RADIUS.
const FIELD_RADIUS = 150;
const MAX_DISPLACE = 16;

type Cell = { bx: number; by: number; x: number; y: number };

export function FieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let palette = readFieldPalette();
    const noiseSeed = Math.random() * 10000;

    let width = 0;
    let height = 0;
    let cells: Cell[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let startTime = performance.now();
    let raf: number | null = null;

    const hash = (ix: number, iy: number) => {
      const s = Math.sin(ix * 127.1 + iy * 311.7 + noiseSeed) * 43758.5453123;
      return s - Math.floor(s);
    };
    const smooth = (t: number) => t * t * (3 - 2 * t);
    const valueNoise = (x: number, y: number) => {
      const ix = Math.floor(x);
      const iy = Math.floor(y);
      const fx = x - ix;
      const fy = y - iy;
      const a = hash(ix, iy);
      const b = hash(ix + 1, iy);
      const c = hash(ix, iy + 1);
      const d = hash(ix + 1, iy + 1);
      const u = smooth(fx);
      const v = smooth(fy);
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    };
    const cloudNoise = (x: number, y: number) =>
      valueNoise(x, y) * 0.7 + valueNoise(x * 2.3 + 50, y * 2.3 - 50) * 0.3;

    const layout = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(width / CELL);
      const rows = Math.ceil(height / CELL);
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({ bx: c * CELL + CELL / 2, by: r * CELL + CELL / 2, x: 0, y: 0 });
        }
      }
    };

    const draw = (elapsed: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = palette.color;
      ctx.lineCap = 'round';
      ctx.lineWidth = 1.4;
      ctx.globalAlpha = palette.alpha;

      const half = ARROW_LEN / 2;
      const driftX = elapsed * DRIFT_SPEED_X;
      const driftY = elapsed * DRIFT_SPEED_Y;

      for (const cell of cells) {
        const v = cloudNoise(
          cell.bx * NOISE_SCALE + driftX,
          cell.by * NOISE_SCALE + driftY,
        );
        if (v <= NOISE_THRESHOLD) continue;

        const dx = cell.bx - mouseX;
        const dy = cell.by - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        const t = Math.max(0, 1 - dist / FIELD_RADIUS);
        const push = t * t * MAX_DISPLACE;
        cell.x = cell.bx + (dx / dist) * push;
        cell.y = cell.by + (dy / dist) * push;

        // Rotation always tracks the cursor from the cell's displaced position.
        // Small, gentle motion of tiny marks, not the kind of large/fast motion
        // prefers-reduced-motion targets, and it's this site's one deliberate
        // signature interaction — so it isn't gated behind that media feature
        // the way the ambient drift and the scroll-reveal animations are.
        const angle = Math.atan2(mouseY - cell.y, mouseX - cell.x);

        ctx.save();
        ctx.translate(cell.x, cell.y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-half, 0);
        ctx.lineTo(half, 0);
        ctx.moveTo(half - ARROW_LEN * 0.34, -ARROW_LEN * 0.26);
        ctx.lineTo(half, 0);
        ctx.lineTo(half - ARROW_LEN * 0.34, ARROW_LEN * 0.26);
        ctx.stroke();
        ctx.restore();
      }
    };

    const tick = (now: number) => {
      // Reduced motion freezes the ambient cloud drift (elapsed pinned to 0),
      // but the loop keeps running so cursor-reactive rotation still redraws
      // live — that's a direct response to real mouse movement, not autoplaying
      // ambient motion, so it isn't what reduced-motion targets.
      draw(reduceMotion ? 0 : now - startTime);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (raf !== null || document.hidden) return;
      startTime = performance.now();
      raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      if (raf === null) return;
      cancelAnimationFrame(raf);
      raf = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    // The toggle flips data-theme on <html>; the field has to repaint in the
    // new palette, and a paused tab needs a fresh frame rather than a stale one.
    const themeWatcher = new MutationObserver(() => {
      palette = readFieldPalette();
      if (raf === null) draw(0);
    });
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Cell tracking is never gated behind pointer-type detection: some hybrid
    // touch+mouse laptops mis-report (hover:none)/(pointer:coarse) for a real
    // mouse, which would silently kill all reactivity. mousemove simply never
    // fires on pure touch devices, so this is safe unconditionally.
    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!coarsePointer && cursor) {
        cursor.style.transform = `translate3d(${event.clientX - 8}px,${event.clientY - 8}px,0)`;
        cursor.style.opacity = '1';
      }
    };
    const onMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };

    layout();
    draw(0);
    start();

    window.addEventListener('resize', layout);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      themeWatcher.disconnect();
      window.removeEventListener('resize', layout);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <>
      <canvas id="field" ref={canvasRef} aria-hidden="true" />
      <div className="cursor-plus" ref={cursorRef} />
    </>
  );
}
