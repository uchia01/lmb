'use client';

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const FILM_DURATION_MS = 7_600;
const INITIAL_FILM_INDEX = 3;

const films = [
  { src: '/videos/Vid1.mp4', label: '01', title: 'First light', detail: 'The opening ritual' },
  { src: '/videos/Vid2.mp4', label: '02', title: 'The pour', detail: 'Precision in motion' },
  { src: '/videos/Vid3.mp4', label: '03', title: 'The reveal', detail: 'A little theatre' },
  { src: '/videos/Vid4.mp4', label: '04', title: 'Transformation', detail: 'Smoke · texture · aroma' },
] as const;

const contentRevealVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const headingRevealVariants: Variants = {
  hidden: { opacity: 0, y: '115%', rotate: 4 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.95, delay: 0.22 + index * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function HeroHeading({ shouldReduceMotion }: { shouldReduceMotion: boolean | null }) {
  const headingLines = ['The night', 'begins with', 'a pour.'];

  return (
    <h1 id="lmb-hero-title">
      {headingLines.map((line, index) => (
        <span key={line}>
          <motion.span
            className="lmb-hero-reveal"
            custom={index}
            initial={shouldReduceMotion ? false : 'hidden'}
            animate="visible"
            variants={shouldReduceMotion ? undefined : headingRevealVariants}
          >
            {index === headingLines.length - 1 ? <em>{line}</em> : line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeFilmIndex, setActiveFilmIndex] = useState(INITIAL_FILM_INDEX);
  const [isReelPlaying, setIsReelPlaying] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const activeFilm = films[activeFilmIndex];

  const selectFilm = useCallback((index: number) => {
    setActiveFilmIndex(index);
    setIsReelPlaying(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    if (!isReelPlaying) {
      video.pause();
      return;
    }

    const play = video.play();
    if (play) {
      play.catch(() => setIsReelPlaying(false));
    }
  }, [activeFilmIndex, isReelPlaying, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion || !isReelPlaying) return;

    const intervalId = window.setInterval(() => {
      setActiveFilmIndex((currentIndex) => (currentIndex + 1) % films.length);
    }, FILM_DURATION_MS);

    return () => window.clearInterval(intervalId);
  }, [activeFilmIndex, isReelPlaying, shouldReduceMotion]);

  const toggleReelPlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (isReelPlaying) {
      video.pause();
      setIsReelPlaying(false);
      return;
    }

    try {
      await video.play();
      setIsReelPlaying(true);
    } catch {
      // Autoplay may be blocked by the browser; retain the accurate UI state.
      setIsReelPlaying(false);
    }
  };

  return (
    <section className="lmb-hero" id="top" aria-labelledby="lmb-hero-title">
      <div className="lmb-hero-ambient" aria-hidden="true" />

      <div className="lmb-hero-layout">
        <motion.div
          className="lmb-hero-content"
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.11, delayChildren: 0.16 } } }}
        >
          <motion.div className="lmb-hero-kicker" variants={shouldReduceMotion ? undefined : contentRevealVariants}>
            <span>Luxury molecular bartending</span>
            <i aria-hidden="true" />
            <span>Delhi · Agra · Across India</span>
          </motion.div>

          <HeroHeading shouldReduceMotion={shouldReduceMotion} />

          <motion.p className="lmb-hero-lead" variants={shouldReduceMotion ? undefined : contentRevealVariants}>
            Bespoke cocktail experiences where molecular craft, impeccable service, and visual theatre meet.
          </motion.p>

          <motion.div className="lmb-hero-actions" variants={shouldReduceMotion ? undefined : contentRevealVariants}>
            <a className="lmb-button" href="#services">Explore our services <Arrow /></a>
            <a className="lmb-hero-link" href="#about">Meet LMB <span aria-hidden="true">↓</span></a>
          </motion.div>
        </motion.div>

        <div className="lmb-hero-media-column">
          <motion.div
            className="lmb-hero-card"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.video
                key={activeFilm.src}
                ref={videoRef}
                className="lmb-hero-video"
                autoPlay={isReelPlaying && !shouldReduceMotion}
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1.015 }}
                exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.35 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <source src={activeFilm.src} type="video/mp4" />
              </motion.video>
            </AnimatePresence>

            <div className="lmb-hero-media-shade" aria-hidden="true" />
            <div className="lmb-hero-frame-meta"><span>Signature / Molecular</span><span>{activeFilm.label} / 04</span></div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={activeFilm.title} className="lmb-hero-film-label" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                <strong>{activeFilm.title}</strong><span>{activeFilm.detail}</span>
              </motion.div>
            </AnimatePresence>

            <button className="lmb-video-control" type="button" onClick={toggleReelPlayback} aria-label={isReelPlaying ? 'Pause the hero film reel' : 'Play the hero film reel'} aria-pressed={isReelPlaying}>
              <span aria-hidden="true" className={isReelPlaying ? 'is-playing' : ''} />
              {isReelPlaying ? 'Pause' : 'Play'}
            </button>
            <div className="lmb-film-progress" aria-hidden="true"><span className={isReelPlaying ? 'is-running' : ''} key={`${activeFilmIndex}-${isReelPlaying}`} /></div>
          </motion.div>

          <div className="lmb-film-selector" role="group" aria-label="Select a hero film">
            {films.map((film, index) => <button key={film.src} className={index === activeFilmIndex ? 'is-active' : ''} type="button" onClick={() => selectFilm(index)} aria-label={`Show ${film.title}`} aria-pressed={index === activeFilmIndex}><span>{film.label}</span><i aria-hidden="true" /></button>)}
          </div>
          <p className="lmb-hero-caption"><span>{activeFilm.label} / 04</span> Every celebration deserves its own signature.</p>
        </div>
      </div>

      <div className="lmb-hero-foot"><span>Weddings</span><span>Private celebrations</span><span>Corporate experiences</span><span>Brand activations</span></div>
    </section>
  );
}
