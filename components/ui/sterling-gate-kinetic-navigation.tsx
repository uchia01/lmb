'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import './sterling-gate-kinetic-navigation.css';

export function SterlingGateKineticNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (typeof window === 'undefined' || !container) return;

    const ctx = gsap.context(() => {
      const menuItems = container.querySelectorAll('.menu-list-item[data-shape]');
      const shapesContainer = container.querySelector('.ambient-background-shapes');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      menuItems?.forEach((item) => {
        const element = item as HTMLElement & { _cleanup?: () => void };
        const shapeIndex = element.getAttribute('data-shape');
        const shape = shapesContainer?.querySelector(`.bg-shape-${shapeIndex}`) as HTMLElement | null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll('.shape-element');

        const onEnter = () => {
          shapesContainer?.querySelectorAll('.bg-shape').forEach((bgShape) => {
            bgShape.classList.remove('active');
          });

          shape.classList.add('active');
          if (reducedMotion) {
            gsap.set(shapeEls, { scale: 1, opacity: 1, rotation: 0 });
            return;
          }
          gsap.fromTo(
            shapeEls,
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.7)', overwrite: 'auto' }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto'
          });
        };

        element.addEventListener('mouseenter', onEnter);
        element.addEventListener('mouseleave', onLeave);
        element._cleanup = () => {
          element.removeEventListener('mouseenter', onEnter);
          element.removeEventListener('mouseleave', onLeave);
        };
      });
    }, container);

    return () => {
      ctx.revert();
      container.querySelectorAll('.menu-list-item[data-shape]').forEach((item) => {
        const element = item as HTMLElement & { _cleanup?: () => void };
        element._cleanup?.();
      });
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const navWrap = container.querySelector<HTMLElement>('.nav-overlay-wrapper');
    const menu = container.querySelector<HTMLElement>('.menu-content');
    const overlay = container.querySelector<HTMLElement>('.overlay');
    const bgPanels = container.querySelectorAll<HTMLElement>('.backdrop-layer');
    const menuLinks = container.querySelectorAll<HTMLElement>('.nav-link');
    const menuButtonTexts = container.querySelectorAll<HTMLElement>('.nav-close-btn p');
    const menuButtonIcon = container.querySelector<HTMLElement>('.menu-button-icon');

    if (!navWrap || !menu || !overlay || !menuButtonIcon) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    gsap.set(navWrap, { display: 'none' });
    gsap.set(menu, { xPercent: 120 });
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(bgPanels, { xPercent: 101 });
    gsap.set(menuLinks, { yPercent: 140, rotate: 10 });

    const timeline = gsap.timeline({
      paused: true,
      defaults: { ease: 'cubic-bezier(0.65, 0.01, 0.05, 0.99)', duration: 0.7 },
      onStart: () => {
        navWrap.style.display = 'block';
        navWrap.setAttribute('data-nav', 'open');
      },
      onReverseComplete: () => {
        navWrap.style.display = 'none';
        navWrap.setAttribute('data-nav', 'closed');
      },
    });

    timeline
      .to(menu, { xPercent: 0 }, 0)
      .to(overlay, { autoAlpha: 1 }, 0)
      .to(menuButtonTexts, { yPercent: -100, stagger: 0.08 }, 0)
      .to(menuButtonIcon, { rotate: 315 }, 0)
      .to(bgPanels, { xPercent: 0, stagger: 0.1, duration: 0.55 }, 0.08)
      .to(menuLinks, { yPercent: 0, rotate: 0, stagger: 0.045 }, 0.28);

    menuTimelineRef.current = timeline;

    return () => {
      menuTimelineRef.current = null;
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const navWrap = container.querySelector<HTMLElement>('.nav-overlay-wrapper');
    const menu = container.querySelector<HTMLElement>('.menu-content');
    const overlay = container.querySelector<HTMLElement>('.overlay');
    const bgPanels = container.querySelectorAll<HTMLElement>('.backdrop-layer');
    const menuLinks = container.querySelectorAll<HTMLElement>('.nav-link');
    const menuButtonTexts = container.querySelectorAll<HTMLElement>('.nav-close-btn p');
    const menuButtonIcon = container.querySelector<HTMLElement>('.menu-button-icon');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      navWrap?.setAttribute('data-nav', isMenuOpen ? 'open' : 'closed');
      gsap.set(navWrap, { display: isMenuOpen ? 'block' : 'none' });
      gsap.set(menu, { xPercent: isMenuOpen ? 0 : 120 });
      gsap.set(overlay, { autoAlpha: isMenuOpen ? 1 : 0 });
      gsap.set(bgPanels, { xPercent: isMenuOpen ? 0 : 101 });
      gsap.set(menuLinks, { yPercent: isMenuOpen ? 0 : 140, rotate: isMenuOpen ? 0 : 10 });
      gsap.set(menuButtonTexts, { yPercent: isMenuOpen ? -100 : 0 });
      gsap.set(menuButtonIcon, { rotate: isMenuOpen ? 315 : 0 });
      return;
    }

    const timeline = menuTimelineRef.current;
    if (!timeline) return;
    if (isMenuOpen) timeline.play();
    else timeline.reverse();
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen || !containerRef.current) return;

    const previousOverflow = document.body.style.overflow;
    const triggerButton = menuButtonRef.current;
    document.body.style.overflow = 'hidden';
    document.body.dataset.menuOpen = 'true';

    const focusable = Array.from(
      containerRef.current.querySelectorAll<HTMLElement>(
        '.nav-close-btn, .menu-content a[href]'
      )
    );
    const firstMenuLink = containerRef.current.querySelector<HTMLElement>('.menu-content a[href]');
    window.requestAnimationFrame(() => firstMenuLink?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.menuOpen;
      window.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => triggerButton?.focus());
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef} className="sterling-kinetic-shell">
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row">
              <a href="#top" aria-label="LMB Molecular home" className="nav-logo-row">
                <span>LMB</span>
                <small>Molecular</small>
              </a>
              <div className="nav-row__right">
                <span className="nav-toggle-label" aria-hidden="true">Explore</span>

                <button ref={menuButtonRef} type="button" className="nav-close-btn" onClick={toggleMenu} aria-expanded={isMenuOpen} aria-controls="sterling-kinetic-menu" aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 16 16" fill="none" className="menu-button-icon">
                      <path d="M7.33333 16L7.33333 -3.2055e-07L8.66667 -3.78832e-07L8.66667 16L7.33333 16Z" fill="currentColor" />
                      <path d="M16 8.66667L-2.62269e-07 8.66667L-3.78832e-07 7.33333L16 7.33333L16 8.66667Z" fill="currentColor" />
                      <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor" />
                      <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor" />
                      <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor" />
                      <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div id="sterling-kinetic-menu" data-nav="closed" className="nav-overlay-wrapper" role="dialog" aria-modal="true" aria-label="Primary navigation" aria-hidden={!isMenuOpen}>
          <div className="overlay" onClick={closeMenu} />
          <nav className="menu-content" aria-label="Primary">
            <div className="menu-bg">
              <div className="backdrop-layer first" />
              <div className="backdrop-layer second" />
              <div className="backdrop-layer" />

              <div className="ambient-background-shapes">
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(99,102,241,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(139,92,246,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(236,72,153,0.1)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(99,102,241,0.15)" />
                </svg>

                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M0 200 Q100 100, 200 200 T 400 200" stroke="rgba(99,102,241,0.2)" strokeWidth="60" fill="none" />
                  <path className="shape-element" d="M0 280 Q100 180, 200 280 T 400 280" stroke="rgba(139,92,246,0.15)" strokeWidth="40" fill="none" />
                </svg>

                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(139,92,246,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(236,72,153,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(99,102,241,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(236,72,153,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(99,102,241,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(139,92,246,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(236,72,153,0.3)" />
                </svg>

                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path className="shape-element" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" fill="rgba(99,102,241,0.12)" />
                  <path className="shape-element" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" fill="rgba(236,72,153,0.1)" />
                </svg>

                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(99,102,241,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(139,92,246,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(236,72,153,0.1)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                <li className="menu-list-item" data-shape="1">
                  <a href="#about" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-index">01</span>
                    <p className="nav-link-text">About Us</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="2">
                  <a href="#services" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-index">02</span>
                    <p className="nav-link-text">Services</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="3">
                  <a href="#gallery" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-index">03</span>
                    <p className="nav-link-text">Gallery</p>
                    <div className="nav-link-hover-bg" />
                  </a>
                </li>
                <li className="menu-list-item" data-shape="5">
                  <Link href="/contact" className="nav-link" onClick={closeMenu}>
                    <span className="nav-link-index">04</span>
                    <p className="nav-link-text">Contact Us</p>
                    <div className="nav-link-hover-bg" />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}

export default function DemoOne() {
  return <SterlingGateKineticNavigation />;
}

export { SterlingGateKineticNavigation as Component };
