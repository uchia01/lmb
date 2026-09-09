import TestimonialMarquee from "@/components/ui/marquee-01";

export default function Testimonials() {
  return (
    <section
      className="lmb-testimonials"
      id="testimonials"
      aria-labelledby="testimonials-title"
      style={{
        background: "linear-gradient(180deg, var(--lmb-bg), #0a0a0a 50%, var(--lmb-bg))",
        borderTop: "1px solid var(--lmb-line)",
        padding: "clamp(5rem, 8vw, 8rem) clamp(1.25rem, 4vw, 4.5rem)",
      }}
    >
      <div style={{ margin: "0 auto", maxWidth: "100rem" }}>
        <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)", textAlign: "center" }}>
          <p className="lmb-eyebrow" style={{ marginBottom: "1rem" }}>
            05 / Testimonials
          </p>
          <h2
            id="testimonials-title"
            style={{
              fontFamily: "var(--font-lmb-display), Georgia, serif",
              fontSize: "clamp(3.4rem, 7vw, 7.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              margin: "0 auto",
              maxWidth: "20ch",
            }}
          >
            What our guests say
          </h2>
        </div>

        <TestimonialMarquee />
      </div>
    </section>
  );
}
