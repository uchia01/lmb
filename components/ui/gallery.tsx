"use client";

import { Ref, forwardRef, useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Responsive helpers ────────────────────────────────────────────────────────

/**
 * Returns a photo size and spread offset that scales with the viewport.
 *   - ≤ 480px  → 120px cards, 100px spread
 *   - ≤ 640px  → 140px cards, 120px spread
 *   - ≤ 900px  → 165px cards, 145px spread
 *   - > 900px  → 200px cards, 175px spread (capped at 220 / 200 on very wide)
 */
function useGalleryLayout() {
  const [layout, setLayout] = useState({ photoSize: 200, spread: 175 });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w <= 480)      setLayout({ photoSize: 120, spread: 100 });
      else if (w <= 640) setLayout({ photoSize: 140, spread: 120 });
      else if (w <= 900) setLayout({ photoSize: 165, spread: 145 });
      else               setLayout({ photoSize: 210, spread: 185 });
    }
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return layout;
}

// ─── Photo component ───────────────────────────────────────────────────────────

const MotionImage = motion(
  forwardRef(function MotionImage(
    props: ImageProps,
    ref: Ref<HTMLImageElement>
  ) {
    const { alt = "", ...rest } = props;
    return <Image ref={ref} alt={alt} {...rest} />;
  })
);

type Direction = "left" | "right";

function getRandomNumberInRange(min: number, max: number): number {
  if (min >= max) throw new Error("min must be < max");
  return Math.random() * (max - min) + min;
}

export const Photo = ({
  src,
  alt,
  className,
  direction,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: Direction;
  width: number;
  height: number;
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const x = useMotionValue(width / 2);
  const y = useMotionValue(height / 2);

  useEffect(() => {
    setRotation(
      getRandomNumberInRange(1, 4) * (direction === "left" ? -1 : 1)
    );
  }, [direction]);

  const handleMouse = (event: {
    currentTarget: { getBoundingClientRect: () => DOMRect };
    clientX: number;
    clientY: number;
  }) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      whileTap={{ scale: 1.15, zIndex: 9999 }}
      whileHover={{
        scale: 1.08,
        rotateZ: 2 * (direction === "left" ? -1 : 1),
        zIndex: 9999,
      }}
      whileDrag={{ scale: 1.1, zIndex: 9999 }}
      initial={{ rotate: 0 }}
      animate={{ rotate: rotation }}
      style={{
        width,
        height,
        perspective: 400,
        zIndex: 1,
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        touchAction: "none",
        flexShrink: 0,
      }}
      className={cn(
        className,
        "relative mx-auto cursor-grab active:cursor-grabbing"
      )}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(width / 2); y.set(height / 2); }}
      draggable={false}
      tabIndex={0}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-2xl"
        style={{ border: "1px solid rgba(245,242,234,.2)", boxShadow: "0 12px 40px rgba(0,0,0,.5)" }}
      >
        <MotionImage
          className="rounded-2xl object-cover"
          fill
          src={src}
          alt={alt}
          style={{ filter: "brightness(.72) contrast(1.06) saturate(.72)" }}
          sizes="(max-width: 480px) 120px, (max-width: 640px) 140px, (max-width: 900px) 165px, 210px"
          draggable={false}
        />
      </div>
    </motion.div>
  );
};

// ─── Gallery ───────────────────────────────────────────────────────────────────

export const PhotoGallery = ({
  animationDelay = 0.5,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { photoSize, spread } = useGalleryLayout();

  useEffect(() => {
    const tV = setTimeout(() => setIsVisible(true), animationDelay * 1000);
    const tA = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000);
    return () => { clearTimeout(tV); clearTimeout(tA); };
  }, [animationDelay]);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const photoVariants = {
    hidden: () => ({ x: 0, y: 0, rotate: 0, scale: 1 }),
    visible: (custom: { x: number; y: number; order: number }) => ({
      x: custom.x,
      y: custom.y,
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 12,
        mass: 1,
        delay: custom.order * 0.15,
      },
    }),
  };

  // Spread the five photos symmetrically around a center origin.
  // Offsets are numeric (px) and computed from the responsive `spread` value.
  const photos = [
    { id: 1, order: 0, x: -spread * 2,     y: 15,  zIndex: 50, direction: "left"  as Direction, src: "/images/gallery/lmb-gallery-01.png" },
    { id: 2, order: 1, x: -spread,          y: 28,  zIndex: 40, direction: "left"  as Direction, src: "/images/gallery/lmb-gallery-02.png" },
    { id: 3, order: 2, x: 0,                y: 8,   zIndex: 30, direction: "right" as Direction, src: "/images/gallery/lmb-gallery-03.png" },
    { id: 4, order: 3, x: spread,            y: 22,  zIndex: 20, direction: "right" as Direction, src: "/images/gallery/lmb-gallery-04.png" },
    { id: 5, order: 4, x: spread * 2,        y: 40,  zIndex: 10, direction: "left"  as Direction, src: "/images/gallery/lmb-gallery-01.png" },
  ];

  // Height of the stage = photoSize + max y-offset + top headroom
  const stageH  = photoSize + 60;
  // Width of the stage = total spread + one card width + margins
  const stageW  = spread * 2 * 2 + photoSize + 40;

  return (
    <section
      aria-labelledby="gallery-heading"
      style={{
        background: "#050505",
        borderTop: "1px solid var(--lmb-line)",
        padding: "clamp(4rem, 7vw, 7rem) clamp(1.25rem, 5vw, 5rem) clamp(3rem, 5vw, 5rem)",
      }}
    >
      {/* Section header */}
      <div style={{ maxWidth: "100rem", margin: "0 auto clamp(2.5rem, 5vw, 4rem)" }}>
        <p className="lmb-eyebrow" style={{ marginBottom: "clamp(0.75rem, 1.5vh, 1.25rem)" }}>
          04 / Gallery
        </p>
        <h2
          id="gallery-heading"
          style={{
            fontFamily: "var(--font-lmb-display), Georgia, serif",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 400,
            letterSpacing: "-0.045em",
            lineHeight: 0.88,
            color: "var(--lmb-text)",
            margin: 0,
          }}
        >
          Evenings,{" "}
          <em style={{ color: "var(--lmb-gold-soft)", fontWeight: 300 }}>
            captured
          </em>
        </h2>
      </div>

      {/* Photo stack */}
      <div
        style={{
          position: "relative",
          margin: "0 auto clamp(2rem, 4vw, 3.5rem)",
          /* Clip the sides so photos that overlap the edge don't cause horizontal scroll */
          overflow: "hidden",
          /* Leave breathing room: stageH px tall, full width */
          height: stageH + "px",
          maxWidth: "100%",
        }}
        aria-hidden="true"
      >
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            style={{ position: "relative", width: stageW, height: stageH }}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {/* Origin anchor — photos spread from the horizontal centre of this box */}
            <div
              style={{
                position: "absolute",
                left: stageW / 2 - photoSize / 2,
                top: 0,
                width: photoSize,
                height: photoSize,
              }}
            >
              {[...photos].reverse().map((photo) => (
                <motion.div
                  key={photo.id}
                  style={{ position: "absolute", left: 0, top: 0, zIndex: photo.zIndex }}
                  variants={photoVariants}
                  custom={{ x: photo.x, y: photo.y, order: photo.order }}
                >
                  <Photo
                    width={photoSize}
                    height={photoSize}
                    src={photo.src}
                    alt="LMB Molecular bar experience"
                    direction={photo.direction}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA + hint */}
      <div
        style={{
          maxWidth: "100rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        <a
          href="#contact"
          className="lmb-button"
          style={{
            background: "var(--lmb-gold)",
            borderColor: "var(--lmb-gold)",
            color: "#17130d",
            fontSize: "0.68rem",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            minHeight: "48px",
            padding: "1rem 1.5rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8rem",
            textDecoration: "none",
          }}
        >
          Book an Experience
          <span aria-hidden="true">↗</span>
        </a>

        <p
          style={{
            color: "rgba(245,242,234,.48)",
            fontSize: "0.61rem",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Drag photos to explore
        </p>
      </div>
    </section>
  );
};
