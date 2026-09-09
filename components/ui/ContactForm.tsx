"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

// ─── Schema ───────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  eventType: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Tell us a little more (min 10 characters)"),
  budget: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const EVENT_TYPES = [
  "Wedding & Reception",
  "Private Celebration",
  "Corporate Event",
  "Sufi / Qabali Night",
  "Brand Experience",
  "Other",
];

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="lmb-contact-field">
      <label
        style={{
          display: "block",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: error ? "#f1aaa2" : "var(--lmb-muted)",
          marginBottom: "0.65rem",
          transition: "color 0.2s ease",
        }}
      >
        {label}
        {required && (
          <span style={{ color: "var(--lmb-gold-soft)", marginLeft: "0.3rem" }}>
            *
          </span>
        )}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              color: "#f1aaa2",
              fontSize: "0.74rem",
              marginTop: "0.4rem",
              letterSpacing: "0.02em",
            }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Shared input/textarea styles
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid var(--lmb-line)",
  borderRadius: 0,
  color: "var(--lmb-text)",
  fontSize: "1rem",
  fontFamily: "var(--font-lmb-sans), Arial, sans-serif",
  padding: "0.75rem 0",
  outline: "none",
  transition: "border-color 0.2s ease",
  minHeight: "48px",
};

const inputErrorStyle: React.CSSProperties = {
  ...inputStyle,
  borderColor: "rgba(241,170,162,0.6)",
};

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ paddingTop: "2rem" }}
    >
      <p className="lmb-eyebrow" style={{ marginBottom: "1.5rem" }}>
        Message received
      </p>
      <h3
        style={{
          fontFamily: "var(--font-lmb-display), Georgia, serif",
          fontSize: "clamp(2.5rem, 4.5vw, 4.8rem)",
          fontWeight: 400,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          margin: "0 0 1.5rem",
          color: "var(--lmb-text)",
        }}
      >
        Thank you,{" "}
        <em style={{ color: "var(--lmb-gold-soft)" }}>
          {name.split(" ")[0]}.
        </em>
      </h3>
      <p
        style={{
          color: "var(--lmb-muted)",
          fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
          lineHeight: 1.7,
          maxWidth: "30rem",
        }}
      >
        We&apos;ve received your enquiry and will get back to you within 24 hours
        to discuss the details of your celebration.
      </p>
      <div
        style={{
          marginTop: "2.5rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href="tel:+919582810267"
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
            padding: "1rem 1.25rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          Call us directly
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    // Simulate a short network delay — replace with your actual API call
    await new Promise((res) => setTimeout(res, 800));
    setSubmittedName(data.name);
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen name={submittedName} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="lmb-eyebrow" style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}>
        Contact form
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "clamp(1.8rem, 3.5vh, 2.8rem)",
        }}
      >
        {/* Name */}
        <Field label="Name" required error={errors.name?.message}>
          <input
            type="text"
            placeholder="Your full name"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            style={errors.name ? inputErrorStyle : inputStyle}
            {...register("name")}
          />
        </Field>

        {/* Email */}
        <Field label="Email" required error={errors.email?.message}>
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            style={errors.email ? inputErrorStyle : inputStyle}
            {...register("email")}
          />
        </Field>

        {/* Event type — styled select */}
        <Field label="Event type" required error={errors.eventType?.message}>
          <div style={{ position: "relative" }}>
            <select
              aria-required="true"
              aria-invalid={!!errors.eventType}
              style={{
                ...(errors.eventType ? inputErrorStyle : inputStyle),
                appearance: "none",
                cursor: "pointer",
                paddingRight: "2rem",
                color: "var(--lmb-text)",
              }}
              {...register("eventType")}
              defaultValue=""
            >
              <option value="" disabled style={{ background: "var(--lmb-surface)" }}>
                Select an event type
              </option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t} style={{ background: "var(--lmb-surface)" }}>
                  {t}
                </option>
              ))}
            </select>
            {/* Custom chevron */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--lmb-muted)",
                fontSize: "0.65rem",
                pointerEvents: "none",
              }}
            >
              ▾
            </span>
          </div>
        </Field>

        {/* Message */}
        <Field label="Tell us about your celebration" required error={errors.message?.message}>
          <textarea
            rows={3}
            placeholder="Venue, date, number of guests, style…"
            aria-required="true"
            aria-invalid={!!errors.message}
            style={{
              ...(errors.message ? inputErrorStyle : inputStyle),
              resize: "vertical",
              minHeight: "88px",
            }}
            {...register("message")}
          />
        </Field>

        {/* Budget — optional */}
        <Field label="Ballpark budget (optional)" error={errors.budget?.message}>
          <input
            type="text"
            placeholder="e.g. ₹1–2 lakh"
            style={errors.budget ? inputErrorStyle : inputStyle}
            {...register("budget")}
          />
        </Field>
      </div>

      {/* Submit */}
      <div style={{ marginTop: "clamp(2rem, 4vh, 3.5rem)" }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: "transparent",
            border: "none",
            cursor: isSubmitting ? "wait" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: "1.1rem",
            color: isSubmitting ? "var(--lmb-muted)" : "var(--lmb-text)",
            fontSize: "0.68rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: 0,
            transition: "color 0.2s ease",
          }}
          aria-label="Send enquiry"
        >
          {/* Animated arrow */}
          <motion.span
            animate={isSubmitting ? { x: [0, 6, 0] } : { x: 0 }}
            transition={{ duration: 0.7, repeat: isSubmitting ? Infinity : 0 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "var(--lmb-gold)",
            }}
          >
            <svg
              width="39"
              height="24"
              viewBox="0 0 39 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 12H37M37 12L25.8201 1M37 12L25.8201 23"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </motion.span>
          {isSubmitting ? "Sending…" : "Send"}
        </button>
      </div>
    </form>
  );
}
