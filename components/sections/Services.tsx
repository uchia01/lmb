'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

type Service = {
  title: string;
  description: string;
  includes: string;
  imagePosition: string;
};

const services: Service[] = [
  {
    title: 'Private Celebrations',
    description: 'Personal bar experiences for the moments that deserve more than an ordinary toast.',
    includes: 'Cocktail Parties · Anniversaries · Birthdays',
    imagePosition: '18% 48%',
  },
  {
    title: 'Weddings & Receptions',
    description: 'Complete bar direction, signature menus and seamless service from welcome drinks to the last dance.',
    includes: 'Weddings · Receptions · Private Functions',
    imagePosition: '42% 54%',
  },
  {
    title: 'Sufi & Qabali Nights',
    description: 'Soulful serves and theatrical presentation paced around the rhythm of a live evening.',
    includes: 'Sufi Nights · Qabali Nights · Live Events',
    imagePosition: '67% 47%',
  },
  {
    title: 'Signature Bar Concepts',
    description: 'Showpiece formats that turn the bar itself into one of the most memorable parts of the room.',
    includes: 'Mocktails · Ice Bar · Celebrity Bar',
    imagePosition: '86% 58%',
  },
];

function PlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16">
      <path d="M8 2v12M2 8h12" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m12 2 1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2Z" />
    </svg>
  );
}

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const active = services[activeIndex];
  const previewTransition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const };

  const activate = (index: number) => setActiveIndex(index);

  return (
    <section className="lmb-services" id="services" aria-labelledby="services-title">
      <div className="lmb-services-shell">
        <header className="lmb-services-label">
          <h2 id="services-title">Our Services</h2>
          <span aria-hidden="true" />
        </header>

        <div className="lmb-services-intro">
          <p>Luxury bar experiences, crafted for every celebration.</p>
        </div>

        <div className="lmb-hover-services">
          <div className="lmb-hover-preview" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.article
                key={active.title}
                className="lmb-hover-card"
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={previewTransition}
              >
                <div className="lmb-hover-card-image">
                  <Image
                    src="/images/about-bar-guests.png"
                    alt="Guests enjoying a tailored LMB bar experience"
                    fill
                    sizes="(max-width: 760px) 100vw, 35vw"
                    style={{ objectPosition: active.imagePosition }}
                  />
                </div>
                <div className="lmb-hover-card-copy">
                  <h3>{active.title}</h3>
                  <p>{active.description}</p>
                  <small>{active.includes}</small>
                </div>
              </motion.article>
            </AnimatePresence>

            <a className="lmb-hover-card-cta" href="#contact">
              <span>Explore More</span>
              <PlusIcon />
            </a>
          </div>

          <div className="lmb-hover-service-list" role="list" aria-label="Service categories">
            {services.map((service, index) => (
              <div className="lmb-hover-service-row" role="listitem" key={service.title}>
                <button
                  type="button"
                  className={activeIndex === index ? 'is-active' : ''}
                  aria-pressed={activeIndex === index}
                  onMouseEnter={() => activate(index)}
                  onFocus={() => activate(index)}
                  onClick={() => activate(index)}
                >
                  <span className="lmb-hover-sparkle" aria-hidden="true">
                    {activeIndex === index && <SparkleIcon />}
                  </span>
                  <span>{service.title}</span>
                </button>
                <span className="lmb-hover-divider" aria-hidden="true">
                  <motion.i
                    initial={false}
                    animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                    transition={reducedMotion ? { duration: 0 } : { duration: 0.55, ease: 'easeOut' }}
                  />
                </span>
              </div>
            ))}

            <a className="lmb-hover-more" href="#contact">
              <span><PlusIcon /></span>
              Explore More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
