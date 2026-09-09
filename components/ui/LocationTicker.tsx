"use client";

import { useReducedMotion } from "framer-motion";

const LOCATIONS = ["Delhi", "Agra", "Mumbai", "Jaipur", "Bangalore", "Udaipur", "Hyderabad", "Chandigarh"];

// Separator — a small diamond bullet between each city
function Sep() {
  return (
    <span
      className="lmb-locations-sep"
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: "0.38rem",
        height: "0.38rem",
        background: "var(--lmb-gold)",
        borderRadius: "1px",
        transform: "rotate(45deg)",
        margin: "0 clamp(1.5rem, 3vw, 3.5rem)",
        flexShrink: 0,
        verticalAlign: "middle",
      }}
    />
  );
}

function TickerTrack() {
  return (
    <div
      className="lmb-ticker-track"
      aria-hidden="true"
      style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
    >
      {LOCATIONS.map((loc, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "var(--font-lmb-display), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.2vw, 3.6rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "var(--lmb-text)",
            }}
          >
            {loc}
          </span>
          <Sep />
        </span>
      ))}
    </div>
  );
}

export default function LocationTicker() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        style={{
          borderTop: "1px solid var(--lmb-line)",
          borderBottom: "1px solid var(--lmb-line)",
          padding: "clamp(1rem, 2vw, 1.5rem) 0",
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "0 clamp(1.25rem, 5vw, 5rem)" }}>
          {LOCATIONS.map((loc, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-lmb-display), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3.2vw, 3.6rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  textTransform: "uppercase",
                  color: "var(--lmb-text)",
                }}
              >
                {loc}
              </span>
              {i < LOCATIONS.length - 1 && <Sep />}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        borderTop: "1px solid var(--lmb-line)",
        borderBottom: "1px solid var(--lmb-line)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Fade masks on edges */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, var(--lmb-bg) 0%, transparent 8%, transparent 92%, var(--lmb-bg) 100%)",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "clamp(1rem, 2vw, 1.5rem) 0",
        }}
      >
        {/* Two identical tracks — CSS animation scrolls them left; when the
            first track exits, the second seamlessly replaces it */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            animation: "lmb-ticker-scroll 22s linear infinite",
          }}
        >
          <TickerTrack />
          <TickerTrack />
        </div>
      </div>
    </div>
  );
}
