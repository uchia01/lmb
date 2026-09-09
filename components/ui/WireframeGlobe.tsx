"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Generates a wireframe sphere using projected 3D lat/lng lines
function generateGlobeLines(
  radius: number,
  cx: number,
  cy: number,
  latCount = 10,
  lngCount = 16,
  tiltX = 20, // degrees of tilt (x axis, gives the slight lean)
  rotY = 0    // current rotation angle in radians
) {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const tiltRad = toRad(tiltX);

  // Project a 3D point (on unit sphere) to 2D SVG space
  function project(lat: number, lng: number) {
    const latR = toRad(lat);
    const lngR = toRad(lng) + rotY;
    // 3D point
    const x = Math.cos(latR) * Math.sin(lngR);
    const y = Math.sin(latR);
    const z = Math.cos(latR) * Math.cos(lngR);
    // Apply tilt around x axis
    const y2 = y * Math.cos(tiltRad) - z * Math.sin(tiltRad);
    const z2 = y * Math.sin(tiltRad) + z * Math.cos(tiltRad);
    // Perspective divide (subtle depth)
    const fov = 2.2;
    const scale = fov / (fov + z2);
    return {
      sx: cx + x * radius * scale,
      sy: cy - y2 * radius * scale,
      z: z2,
    };
  }

  const paths: string[] = [];

  // Latitude lines
  for (let i = 1; i < latCount; i++) {
    const lat = -90 + (180 / latCount) * i;
    const segments = 72;
    let d = "";
    for (let j = 0; j <= segments; j++) {
      const lng = -180 + (360 / segments) * j;
      const { sx, sy, z } = project(lat, lng);
      if (j === 0 || z < -0.1) {
        d += `M ${sx.toFixed(2)} ${sy.toFixed(2)} `;
      } else {
        d += `L ${sx.toFixed(2)} ${sy.toFixed(2)} `;
      }
    }
    paths.push(d.trim());
  }

  // Longitude lines
  for (let i = 0; i < lngCount; i++) {
    const lng = (360 / lngCount) * i;
    const segments = 72;
    let d = "";
    for (let j = 0; j <= segments; j++) {
      const lat = -90 + (180 / segments) * j;
      const { sx, sy, z } = project(lat, lng);
      if (j === 0 || z < -0.1) {
        d += `M ${sx.toFixed(2)} ${sy.toFixed(2)} `;
      } else {
        d += `L ${sx.toFixed(2)} ${sy.toFixed(2)} `;
      }
    }
    paths.push(d.trim());
  }

  return paths;
}

export default function WireframeGlobe({
  size = 480,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const animRef = useRef<SVGGElement>(null);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.44;

  // Initial static paths (rotY = 0)
  const staticPaths = generateGlobeLines(radius, cx, cy);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const group = animRef.current;
    if (!group) return;

    let last = performance.now();
    function tick(now: number) {
      const dt = (now - last) / 1000;
      last = now;
      rotRef.current += dt * 0.18; // slow rotation
      const paths = generateGlobeLines(radius, cx, cy, 10, 16, 20, rotRef.current);
      const pathEls = group?.querySelectorAll("path");
      paths.forEach((d, i) => {
        pathEls?.[i]?.setAttribute("d", d);
      });
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduceMotion, radius, cx, cy]);

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
      style={{ overflow: "visible" }}
    >
      {/* Outer glow circle */}
      <circle
        cx={cx}
        cy={cy}
        r={radius * 1.04}
        fill="none"
        stroke="var(--lmb-gold-soft)"
        strokeWidth="0.5"
        opacity="0.12"
      />
      <g ref={animRef}>
        {staticPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--lmb-text)"
            strokeWidth="0.7"
            opacity="0.45"
          />
        ))}
      </g>
    </motion.svg>
  );
}
