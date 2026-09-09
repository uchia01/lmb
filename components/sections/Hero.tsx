'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ─── Video sources ─────────────────────────────────────────────────────────────
const VIDS = [
  '/videos/Vid1.mp4',
  '/videos/Vid2.mp4',
  '/videos/Vid3.mp4',
  '/videos/Vid4.mp4',
];

// ─── Staircase scroll windows ──────────────────────────────────────────────────
// Each video starts exiting at a different scroll point — staggered like stairs.
// All go UP (0% → -110%). Column boxes stay fixed; only the video translates.
//   Video 1: 0.00 → 0.18
//   Video 2: 0.10 → 0.28
//   Video 3: 0.20 → 0.38
//   Video 4: 0.30 → 0.48
const STAGGER = [
  [0.00, 0.18],
  [0.10, 0.28],
  [0.20, 0.38],
  [0.30, 0.48],
];

// Content section fades in after last video is gone (0.42 → 0.56)
const CONTENT_IN  = [0.42, 0.56];

// ─── Single video panel ────────────────────────────────────────────────────────
function VideoPanel({
  src,
  scrollYProgress,
  window: [start, end],
}: {
  src: string;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  window: [number, number];
}) {
  const y = useTransform(scrollYProgress, [start, end], ['0%', '-110%']);

  return (
    // Column box: STATIC, never moves. overflow-hidden clips the video as it exits.
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Only the video moves — slides up through the static clip box */}
      <motion.video
        style={{ y, willChange: 'transform', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        className="transform-gpu"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={src} type="video/mp4" />
      </motion.video>

      {/* Bottom vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 60%, rgba(14,15,17,0.7))',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Content fades in after all 4 videos have exited
  const contentOpacity = useTransform(scrollYProgress, CONTENT_IN, [0, 1]);
  // Content slides up slightly as it reveals
  const contentY = useTransform(scrollYProgress, CONTENT_IN, ['2vh', '0vh']);

  // Scroll indicator fades on first scroll
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    // 350vh gives comfortable scroll travel for all 4 stagger windows + content reveal
    <section ref={ref} style={{ height: '350vh', position: 'relative', background: '#0E0F11' }}>

      {/* Sticky frame — everything inside is pinned here */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── BACKGROUND CONTENT (z=0) ─────────────────────────────────────────
            Sits behind the curtain. Invisible until all videos exit.
        ─────────────────────────────────────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: contentOpacity,
            y: contentY,
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            background: '#0E0F11',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0 8vw',
          }}
        >
          <h1 style={{
            color: '#fff',
            fontWeight: 200,
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}>
            LUXURY MOLECULAR BAR
          </h1>
          <p style={{
            color: '#525252',
            fontWeight: 300,
            fontSize: '0.7rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            Delhi · Agra
          </p>
        </motion.div>

        {/* ── VIDEO CURTAIN (z=10) ─────────────────────────────────────────────
            4-column grid. Each column is a STATIC clip box.
            Each video exits upward on its own staggered scroll window.
        ─────────────────────────────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            pointerEvents: 'none',
          }}
        >
          {VIDS.map((src, i) => (
            <VideoPanel
              key={src}
              src={src}
              scrollYProgress={scrollYProgress}
              window={STAGGER[i] as [number, number]}
            />
          ))}
        </div>

        {/* ── SCROLL INDICATOR (z=20) ──────────────────────────────────────── */}
        <motion.div
          style={{
            opacity: dotOpacity,
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            fontFamily: 'monospace',
            fontSize: '8px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: '#737373',
            whiteSpace: 'nowrap',
          }}>
            Scroll to Open
          </span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '1.5rem', background: '#525252' }}
          />
        </motion.div>

      </div>
    </section>
  );
}
