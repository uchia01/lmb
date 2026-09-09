'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import About from '@/components/sections/About';
import Footer from '@/components/sections/Footer';
import Gallery from '@/components/sections/Gallery';
import Recipes from '@/components/sections/Recipes';
import Services from '@/components/sections/Services';
import Testimonials from '@/components/sections/Testimonials';
import { SterlingGateKineticNavigation } from '@/components/ui/sterling-gate-kinetic-navigation';
import HeroSection from './HeroSection';

export default function LmbExperience() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    lenis.on('scroll', ScrollTrigger.update);

    // Framer Motion owns the hero entrance and reel transitions. Keep GSAP
    // limited to scroll-driven movement so animation libraries never compete
    // for the same transform styles.
    gsap.to('.lmb-hero-media-column', { yPercent: -2.5, ease: 'none', scrollTrigger: { trigger: '.lmb-hero', start: 'top top', end: 'bottom top', scrub: 0.5 } });
    gsap.to('.lmb-hero-content', { opacity: 0.28, y: -24, ease: 'none', scrollTrigger: { trigger: '.lmb-hero', start: 'top top', end: 'bottom 20%', scrub: 0.5 } });
    gsap.fromTo('.lmb-about-image-wrap',
      { clipPath: 'inset(10% 4% 10% 4%)', scale: 0.97 },
      { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, ease: 'none', scrollTrigger: { trigger: '.lmb-about-image-wrap', start: 'top 88%', end: 'center 56%', scrub: 0.7 } }
    );
    gsap.fromTo('.lmb-about-photo',
      { scale: 1.08, yPercent: -3 },
      { scale: 1.02, yPercent: 3, ease: 'none', scrollTrigger: { trigger: '.lmb-about-image-wrap', start: 'top bottom', end: 'bottom top', scrub: 0.8 } }
    );
    gsap.utils.toArray<HTMLElement>('.lmb-about-scroll').forEach((element) => {
      gsap.from(element, { opacity: 0, y: 30, duration: 0.55, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 86%' } });
    });

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, { scope });

  return (
    <main className="lmb" ref={scope}>
      <SterlingGateKineticNavigation />

      <HeroSection />

      <About />

      <Services />

      <Recipes />

      <Gallery />

      <Testimonials />

      <Footer />
    </main>
  );
}
