'use client';

import { useId, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { ScrollBurnText } from '@/components/ui/ScrollBurnText';

const sections = [
  'Luxury is felt before the first pour.',
  'Molecular craft brings flavour, theatre, and precision together.',
  'We make the bar the heartbeat of your celebration.',
];

function AnimatedBurnIntro() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const noiseId = useId().replace(/:/g, '');
  const [activeSection, setActiveSection] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const nextSection = Math.min(sections.length - 1, Math.floor(value * sections.length));
    setActiveSection((current) => (current === nextSection ? current : nextSection));
    if (value > 0.01) setShowHint(false);
  });

  return (
    <div ref={runwayRef} className="lmb-about-burn" style={{ height: `${sections.length * 82}svh` }}>
      <h2 id="about-title" className="lmb-sr-only">About LMB</h2>
      <div className="lmb-sr-only">{sections.join(' ')}</div>

      <div className="lmb-about-burn-sticky" aria-hidden="true">
        <div className="lmb-burn-meta">
          <div className="lmb-section-index"><span>02</span><span>About us</span></div>
          <span className="lmb-burn-counter">0{activeSection + 1} / 0{sections.length}</span>
        </div>

        <div className="lmb-burn-stage" style={{ position: 'relative' }}>
          {sections.map((section, sectionIndex) => (
            <ScrollBurnText
              key={section}
              text={section}
              progress={scrollYProgress}
              windowStart={sectionIndex / sections.length}
              windowSpan={1 / sections.length}
              className="lmb-burn-slide"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            />
          ))}
        </div>

        <motion.div
          className="lmb-burn-hint"
          animate={{ opacity: showHint ? 1 : 0, y: showHint ? [0, 5, 0] : 0 }}
          transition={{ y: { duration: 1.5, repeat: Infinity }, opacity: { duration: 0.25 } }}
        >
          Scroll to discover <span>↓</span>
        </motion.div>

        <svg className="lmb-burn-grain" aria-hidden="true">
          <filter id={noiseId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="8" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
        </svg>
      </div>
    </div>
  );
}

export default function AboutBurnIntro() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className="lmb-about-burn-static">
        <div className="lmb-section-index"><span>02</span><span>About us</span></div>
        <h2 id="about-title">About LMB</h2>
        {sections.map((section) => <p key={section}>{section}</p>)}
      </div>
    );
  }

  return <AnimatedBurnIntro />;
}
