'use client';

import { useMemo, type CSSProperties } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';

type ScrollBurnTextProps = {
  text: string;
  progress: MotionValue<number>;
  windowStart: number;
  windowSpan: number;
  holdForever?: boolean;
  className?: string;
  style?: CSSProperties;
};

function stableUnit(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

export function ScrollBurnText({
  text,
  progress,
  windowStart,
  windowSpan,
  holdForever = false,
  className,
  style,
}: ScrollBurnTextProps) {
  const raw = useTransform(progress, (value) => (value - windowStart) / windowSpan);
  const opacity = useTransform(
    raw,
    holdForever ? [-0.15, 0.3] : [-0.15, 0.3, 1.2, 1.4],
    holdForever ? [0, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(
    raw,
    holdForever ? [-0.15, 0.3] : [-0.15, 0.3, 0.8, 1.2],
    holdForever ? [0.94, 1] : [0.94, 1, 1.015, 1.04],
  );
  const aberration = useTransform(raw, [0.7, 1.2], [0, 3]);
  const textShadow = useTransform(aberration, (amount) =>
    !holdForever && amount > 0.05
      ? `-${amount.toFixed(1)}px 0 rgba(226,75,74,0.6), ${amount.toFixed(1)}px 0 rgba(55,138,221,0.6)`
      : 'none',
  );

  const wordChars = useMemo(
    () => text.split(' ').map((word, wordIndex) =>
      word.split('').map((character, characterIndex) => {
        const seed = text.length * 97 + wordIndex * 31 + characterIndex * 17;

        return {
          character,
          burnPoint: 0.72 + stableUnit(seed) * 0.5,
          flicker: stableUnit(seed + 11),
        };
      }),
    ),
    [text],
  );

  return (
    <motion.p
      className={className}
      style={{ margin: 0, opacity, scale, textShadow, willChange: 'transform', ...style }}
    >
      {wordChars.map((characters, wordIndex) => (
        <span className="lmb-burn-word-shell" key={`${text}-${wordIndex}`}>
          {characters.map(({ character, burnPoint, flicker }, characterIndex) => (
            <BurnCharacter
              key={`${character}-${characterIndex}`}
              character={character}
              burnPoint={burnPoint}
              flicker={flicker}
              raw={raw}
              holdForever={holdForever}
            />
          ))}
        </span>
      ))}
    </motion.p>
  );
}

function BurnCharacter({
  character,
  burnPoint,
  flicker,
  raw,
  holdForever,
}: {
  character: string;
  burnPoint: number;
  flicker: number;
  raw: MotionValue<number>;
  holdForever: boolean;
}) {
  const entranceStart = -0.15 + flicker * 0.15;
  const entranceEnd = entranceStart + 0.2;
  const opacity = useTransform(
    raw,
    holdForever ? [entranceStart, entranceEnd] : [burnPoint - 0.06, burnPoint],
    holdForever ? [0, 1] : [1, 0],
  );

  return <motion.span style={{ display: 'inline-block', opacity }}>{character}</motion.span>;
}
