'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const navigationItems = ['Home', 'About Us', 'Services', 'Recipe', 'Gallery', 'Contact Us'];

const drinkConcepts = [
  {
    title: 'Smoke Infusions',
    tag: 'Signature pour',
    accent: 'from-amber-400/30 via-orange-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(251,146,60,0.18)]',
  },
  {
    title: 'Edible Spheres',
    tag: 'Texture lab',
    accent: 'from-cyan-400/25 via-sky-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(34,211,238,0.16)]',
  },
  {
    title: 'Cocktail Art',
    tag: 'Visual ritual',
    accent: 'from-fuchsia-400/25 via-violet-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(192,132,252,0.16)]',
  },
  {
    title: 'Molecular Foam',
    tag: 'Airborne finish',
    accent: 'from-emerald-400/25 via-lime-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(74,222,128,0.16)]',
  },
  {
    title: 'Crystal Mist',
    tag: 'Ice memory',
    accent: 'from-indigo-400/25 via-purple-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(129,140,248,0.16)]',
  },
  {
    title: 'Velvet Ember',
    tag: 'Midnight finish',
    accent: 'from-rose-400/25 via-pink-500/10 to-transparent',
    glow: 'shadow-[0_0_80px_rgba(244,114,182,0.16)]',
  },
];

const services = [
  {
    title: 'Private molecular tasting',
    blurb: 'A guided immersion into texture, aroma and light.',
    accent: 'from-amber-300/25 to-orange-500/20',
  },
  {
    title: 'Event beverage direction',
    blurb: 'Curated service with custom garnish systems and theatrical pours.',
    accent: 'from-sky-300/25 to-cyan-500/20',
  },
  {
    title: 'Signature recipe development',
    blurb: 'Experimental formulations tuned for luxury hospitality and palette.',
    accent: 'from-fuchsia-300/25 to-violet-500/20',
  },
  {
    title: 'Editorial bar styling',
    blurb: 'Immersive installations designed for launches, showcases and intimate soirées.',
    accent: 'from-emerald-300/25 to-lime-500/20',
  },
];

export default function LuxuryMolecularLanding() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [hoveredDrink, setHoveredDrink] = useState(drinkConcepts[0].title);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [hoveredService, setHoveredService] = useState(services[0].title);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-zinc-100">
      <div className="absolute inset-0 lmb-grid-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_26%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <header className="sticky top-4 z-30 mb-8 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href="#home" className="text-[0.62rem] font-medium uppercase tracking-[0.38em] text-zinc-400">
              Luxury Molecular Bar
            </a>

            <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
              {navigationItems.map((item) => {
                const isHovered = hoveredNav === item;
                return (
                  <div key={item} className="relative">
                    <motion.a
                      href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="relative px-2 py-2 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-zinc-300 transition-colors duration-200 hover:text-white"
                      onHoverStart={() => setHoveredNav(item)}
                      onHoverEnd={() => setHoveredNav(null)}
                    >
                      <span className="relative z-10">{item}</span>
                      {isHovered ? (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-1 left-0 right-0 h-px bg-white/80"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      ) : null}
                    </motion.a>
                  </div>
                );
              })}
            </nav>
          </div>
        </header>

        <section id="home" className="flex flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-[0.6rem] uppercase tracking-[0.42em] text-zinc-500">
                Experiential hospitality / molecular atelier
              </p>
              <h1 className="text-4xl font-semibold tracking-[0.22em] text-white sm:text-5xl lg:text-6xl">
                Kinetic rituals, distilled into light and texture.
              </h1>
            </div>

            <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`rounded-full px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.34em] transition-all ${
                  viewMode === 'grid' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`rounded-full px-4 py-2 text-[0.64rem] font-medium uppercase tracking-[0.34em] transition-all ${
                  viewMode === 'list' ? 'bg-white text-black shadow-lg shadow-white/10' : 'text-zinc-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {drinkConcepts.map((drink, index) => {
                const isActive = hoveredDrink === drink.title;
                return (
                  <motion.article
                    key={drink.title}
                    layout
                    onHoverStart={() => setHoveredDrink(drink.title)}
                    onHoverEnd={() => setHoveredDrink(drinkConcepts[0].title)}
                    whileHover={{ scale: 1.02, y: -6, transition: { type: 'spring', stiffness: 240, damping: 24 } }}
                    className={`group relative min-h-[320px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-zinc-950/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.032),0_28px_80px_rgba(0,0,0,0.45)] ${drink.glow}`}
                  >
                    <div className="absolute inset-0 rounded-[1.75rem] border border-white/10" />
                    <div className="absolute left-4 top-4 right-4 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.36em] text-zinc-500">
                      <span>{drink.tag}</span>
                      <span>0{index + 1}</span>
                    </div>

                    <motion.div
                      className="absolute inset-0 rounded-[1.75rem] p-4"
                      animate={{ scale: isActive ? 1.01 : 0.98, opacity: isActive ? 1 : 0.95 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    >
                      <div className={`relative h-full overflow-hidden rounded-[1.2rem] border border-white/10 bg-gradient-to-br ${drink.accent}`}>
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.14),transparent_16%),linear-gradient(135deg,rgba(255,255,255,0.18),transparent_60%)]" />
                        <div className="absolute inset-x-4 bottom-4 top-12 rounded-[1rem] border border-white/10 bg-black/20 backdrop-blur-sm" />
                        <div className="absolute bottom-8 left-6 right-6 flex items-end justify-between">
                          <motion.p
                            key={drink.title}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -14 }}
                            className="max-w-[70%] text-lg font-semibold uppercase tracking-[0.24em] text-white"
                          >
                            {drink.title}
                          </motion.p>
                          <span className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-300">
                            {isActive ? 'Focused' : 'Hover'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                );
              })}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
              <motion.div className="relative min-h-[540px] overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_90px_rgba(0,0,0,0.52)]">
                <div className="absolute inset-0 rounded-[2rem] border border-white/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_20%)]" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hoveredService}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="absolute inset-0 p-4"
                  >
                    <div className="relative h-full overflow-hidden rounded-[1.3rem] border border-white/10 bg-gradient-to-br from-white/10 via-zinc-900/80 to-black/80">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.14),transparent_20%),radial-gradient(circle_at_80%_40%,rgba(249,115,22,0.16),transparent_24%)]" />
                      <div className="absolute bottom-10 left-8 right-8 max-w-lg">
                        <p className="mb-3 text-[0.6rem] uppercase tracking-[0.38em] text-zinc-500">Featured experience</p>
                        <h2 className="mb-3 text-3xl font-semibold uppercase tracking-[0.2em] text-white sm:text-4xl">
                          {hoveredService}
                        </h2>
                        <p className="max-w-md text-sm leading-7 text-zinc-300">
                          {services.find((service) => service.title === hoveredService)?.blurb}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className="rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_90px_rgba(0,0,0,0.46)]">
                <div className="mb-5 flex items-center justify-between px-1">
                  <p className="text-[0.58rem] uppercase tracking-[0.4em] text-zinc-500">Molecular bar services</p>
                  <p className="text-[0.58rem] uppercase tracking-[0.36em] text-zinc-600">Hover to reveal</p>
                </div>

                <div className="space-y-2">
                  {services.map((service, index) => {
                    const isActive = hoveredService === service.title;
                    return (
                      <motion.button
                        key={service.title}
                        type="button"
                        onHoverStart={() => setHoveredService(service.title)}
                        onHoverEnd={() => setHoveredService(services[0].title)}
                        whileHover={{ x: 4, scale: 1.01, transition: { type: 'spring', stiffness: 240, damping: 24 } }}
                        className={`flex w-full items-center justify-between rounded-[1.1rem] border px-4 py-4 text-left transition-all ${
                          isActive
                            ? 'border-white/20 bg-white/10 shadow-[0_0_40px_rgba(255,255,255,0.06)]'
                            : 'border-white/10 bg-transparent hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div>
                          <p className="text-[0.78rem] uppercase tracking-[0.3em] text-white/90">{service.title}</p>
                          <p className="mt-1 text-sm text-zinc-400">{service.blurb}</p>
                        </div>
                        <span className="text-[0.56rem] uppercase tracking-[0.34em] text-zinc-500">0{index + 1}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
