'use client';

import { useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const recipes = [
  {
    title: 'Velvet Ember',
    note: 'Smoked · Silky · Bittersweet',
    ingredients: ['Bourbon', 'Cacao', 'Orange'],
    video: '/videos/Vid1.mp4',
  },
  {
    title: 'Citrus Cloud',
    note: 'Bright · Airy · Botanical',
    ingredients: ['Gin', 'Citrus', 'Elderflower'],
    video: '/videos/Vid2.mp4',
  },
  {
    title: 'Rose & Saffron',
    note: 'Floral · Golden · Delicate',
    ingredients: ['Vodka', 'Rose', 'Saffron'],
    video: '/videos/Vid3.mp4',
  },
  {
    title: 'Midnight Jamun',
    note: 'Tart · Spiced · Vivid',
    ingredients: ['Gin', 'Jamun', 'Lime'],
    video: '/videos/Vid4.mp4',
  },
];

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={direction === 'left' ? 'm15 5-7 7 7 7' : 'm9 5 7 7-7 7'} />
    </svg>
  );
}

export default function Recipes() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('.lmb-recipe-card');
    if (!track || !card) return;

    const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="lmb-recipes" id="recipes" aria-labelledby="recipes-title">
      <div className="lmb-recipes-shell">
        <header className="lmb-recipes-header">
          <div>
            <p className="lmb-eyebrow">03 / Signature recipes</p>
            <h2 id="recipes-title">Try Our Mixology</h2>
          </div>
          <p className="lmb-recipes-intro">
            Discover expressive serves shaped by flavour, texture, and a little theatre.
          </p>
        </header>

        <div
          className={`lmb-recipe-track${expanded ? ' is-expanded' : ''}`}
          ref={trackRef}
          id="recipe-carousel"
          aria-label="Signature cocktail recipes"
        >
          {recipes.map((recipe, index) => (
            <article className="lmb-recipe-card" key={recipe.title}>
              <div className="lmb-recipe-media">
                <video
                  aria-hidden="true"
                  autoPlay={!reducedMotion}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={recipe.video}
                />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="lmb-recipe-copy">
                <p>{recipe.note}</p>
                <h3>{recipe.title}</h3>
                <ul aria-label={`${recipe.title} ingredients`}>
                  {recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="lmb-recipe-actions">
          <div className="lmb-recipe-arrows" aria-label="Carousel controls">
            <button type="button" onClick={() => move(-1)} disabled={expanded} aria-label="Previous recipe">
              <ArrowIcon direction="left" />
            </button>
            <button type="button" onClick={() => move(1)} disabled={expanded} aria-label="Next recipe">
              <ArrowIcon direction="right" />
            </button>
          </div>
          <button
            className="lmb-recipe-all"
            type="button"
            aria-controls="recipe-carousel"
            aria-expanded={expanded}
            onClick={() => setExpanded((current) => !current)}
          >
            {expanded ? 'Carousel View' : 'All Recipes'}
            <span aria-hidden="true">{expanded ? '−' : '+'}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
