"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContactForm from "@/components/ui/ContactForm";
import WireframeGlobe from "@/components/ui/WireframeGlobe";
import LocationTicker from "@/components/ui/LocationTicker";

// ─── Stagger helpers ──────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

// ─── Heading with large breakline text ───────────────────────────────────────

function ContactHeading() {
  const lines = ["Got an event", "in mind?", "Let's talk."];
  return (
    <motion.h1
      aria-label={lines.join(" ")}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      style={{
        fontFamily: "var(--font-lmb-display), Georgia, serif",
        fontSize: "clamp(4rem, 8.5vw, 9.5rem)",
        fontWeight: 400,
        letterSpacing: "-0.04em",
        lineHeight: 0.88,
        margin: "0 0 clamp(2rem, 4vh, 3.5rem)",
        color: "var(--lmb-text)",
      }}
    >
      {lines.map((line, i) => (
        <span
          key={line}
          style={{ display: "block", overflow: "hidden", padding: "0.04em 0" }}
          aria-hidden="true"
        >
          <motion.span
            style={{ display: "block" }}
            variants={{
              hidden: { y: "110%", rotate: 3, opacity: 0 },
              visible: {
                y: 0,
                rotate: 0,
                opacity: 1,
                transition: { duration: 0.9, delay: i * 0.11, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {i === lines.length - 1 ? (
              <em style={{ color: "var(--lmb-gold-soft)", fontWeight: 300 }}>{line}</em>
            ) : (
              line
            )}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}

// ─── Email link (large, underline on hover) ───────────────────────────────────

function EmailLink() {
  return (
    <motion.a
      href="mailto:lmbmolecular@gmail.com"
      custom={3}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      aria-label="lmbmolecular@gmail.com"
      style={{
        display: "block",
        fontFamily: "var(--font-lmb-display), Georgia, serif",
        fontSize: "clamp(1.4rem, 2.8vw, 3.2rem)",
        fontWeight: 300,
        letterSpacing: "-0.01em",
        color: "var(--lmb-text)",
        textDecoration: "none",
        borderBottom: "1px solid var(--lmb-line)",
        paddingBottom: "clamp(1.2rem, 2.5vw, 2rem)",
        marginBottom: "clamp(2.5rem, 5vh, 4rem)",
        transition: "color 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--lmb-gold-soft)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--lmb-gold)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "var(--lmb-text)";
        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--lmb-line)";
      }}
    >
      lmbmolecular@gmail.com
    </motion.a>
  );
}

// ─── Side info cards (phone, hours, locations) ────────────────────────────────

function InfoCard({
  label,
  children,
  delay,
}: {
  label: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      style={{
        borderTop: "1px solid var(--lmb-line)",
        paddingTop: "1.1rem",
      }}
    >
      <p
        className="lmb-eyebrow"
        style={{ marginBottom: "0.6rem", color: "var(--lmb-muted)" }}
      >
        {label}
      </p>
      {children}
    </motion.div>
  );
}

// ─── Page layout ──────────────────────────────────────────────────────────────

export default function ContactPageClient() {
  return (
    <main
      className="lmb"
      style={{
        background: "var(--lmb-bg)",
        minHeight: "100svh",
        position: "relative",
      }}
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 72% 28%, rgba(201,168,106,.08), transparent 32%), radial-gradient(circle at 12% 80%, rgba(106,137,145,.05), transparent 28%)",
        }}
      />

      {/* Back to home link */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem clamp(1.25rem, 3vw, 4rem)",
          borderBottom: "1px solid transparent",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-lmb-display), Georgia, serif",
            fontSize: "1.5rem",
            letterSpacing: "0.05em",
            color: "var(--lmb-text)",
            textDecoration: "none",
          }}
          aria-label="Back to LMB Molecular home"
        >
          LMB{" "}
          <span
            style={{
              color: "var(--lmb-gold-soft)",
              fontSize: "0.85rem",
              fontStyle: "italic",
            }}
          >
            Molecular
          </span>
        </Link>

        <Link
          href="/"
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--lmb-muted)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            transition: "color 0.2s",
          }}
        >
          <svg
            width="16"
            height="10"
            viewBox="0 0 16 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 5H1M1 5L6 1M1 5L6 9"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          Back
        </Link>
      </motion.div>

      {/* ── Main content wrapper ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "100rem",
          margin: "0 auto",
          padding:
            "clamp(7rem, 13vh, 10rem) clamp(1.25rem, 5vw, 5rem) 0",
        }}
      >
        {/* ── Two-column header ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            marginBottom: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          <motion.p
            className="lmb-eyebrow"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{ marginBottom: "clamp(1.5rem, 3vh, 2.5rem)" }}
          >
            06 / Contact
          </motion.p>

          <ContactHeading />
          <EmailLink />
        </div>

        {/* ── Two-column body: form + globe ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: "clamp(3rem, 7vw, 8rem)",
            alignItems: "start",
          }}
          className="lmb-contact-grid"
        >
          {/* Left col — form */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <ContactForm />
          </motion.div>

          {/* Right col — globe + info */}
          <div>
            {/* Globe */}
            <div
              style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                marginBottom: "clamp(2.5rem, 5vh, 4rem)",
              }}
            >
              {/* FIG.01 label — top left of globe */}
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                style={{
                  position: "absolute",
                  top: "0.6rem",
                  left: "0",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--lmb-muted)",
                }}
              >
                FIG.01
              </motion.span>

              <WireframeGlobe size={420} />
            </div>

            {/* Info cards below the globe */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              <InfoCard label="Phone" delay={4}>
                <a
                  href="tel:+919582810267"
                  style={{
                    color: "var(--lmb-text)",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                >
                  +91 95828 10267
                </a>
              </InfoCard>

              <InfoCard label="Response time" delay={4.5}>
                <p
                  style={{
                    color: "var(--lmb-text)",
                    fontSize: "0.95rem",
                    margin: 0,
                  }}
                >
                  Within 24 hours
                </p>
              </InfoCard>

              <InfoCard label="Based in" delay={5}>
                <p
                  style={{
                    color: "var(--lmb-text)",
                    fontSize: "0.95rem",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Delhi &amp; Agra
                </p>
              </InfoCard>

              <InfoCard label="We travel to" delay={5.5}>
                <p
                  style={{
                    color: "var(--lmb-text)",
                    fontSize: "0.95rem",
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  Across India
                </p>
              </InfoCard>
            </div>
          </div>
        </div>
      </div>

      {/* ── Location ticker at the bottom ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        style={{ marginTop: "clamp(5rem, 10vh, 8rem)" }}
      >
        <LocationTicker />
      </motion.div>

      {/* Responsive overrides injected as a style tag */}
      <style>{`
        @media (max-width: 860px) {
          .lmb-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .lmb-contact-grid {
            gap: 3rem !important;
          }
        }
        /* Remove autofill background in dark mode */
        input:-webkit-autofill,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill,
        select:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #080808 inset !important;
          -webkit-text-fill-color: var(--lmb-text) !important;
          transition: background-color 9999s ease-in-out 0s;
        }
        /* Remove default select arrow in Firefox */
        select { -moz-appearance: none; }
        /* Focus ring on inputs */
        .lmb input:focus,
        .lmb textarea:focus,
        .lmb select:focus {
          border-bottom-color: var(--lmb-gold) !important;
        }
        /* Placeholder color */
        .lmb input::placeholder,
        .lmb textarea::placeholder {
          color: #514d48;
        }
      `}</style>
    </main>
  );
}
