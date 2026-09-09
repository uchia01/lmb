import { RuixenGradientFooter } from "@/components/ui/ruixen-gradient-footer";

const columns = [
  {
    title: "Services",
    links: [
      { label: "Private Celebrations", href: "#services" },
      { label: "Weddings & Receptions", href: "#services" },
      { label: "Sufi & Qabali Nights", href: "#services" },
      { label: "Signature Bar Concepts", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Delhi", href: "#contact" },
      { label: "Agra", href: "#contact" },
      { label: "Across India", href: "#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <RuixenGradientFooter
      gradientHeight="45vh"
      className="lmb-footer"
      id="contact"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pt-16">
        <div className="grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand section */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 40 40"
                className="size-8"
                aria-hidden="true"
                style={{ color: "var(--lmb-gold-soft)" }}
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" r="3" fill="currentColor" />
                <circle
                  cx="20"
                  cy="8"
                  r="2"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="20"
                  cy="32"
                  r="2"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="8"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  opacity="0.6"
                />
                <circle
                  cx="32"
                  cy="20"
                  r="2"
                  fill="currentColor"
                  opacity="0.6"
                />
              </svg>
              <span
                className="lmb-wordmark"
                style={{
                  fontFamily: "var(--font-lmb-display), Georgia, serif",
                  fontSize: "1.5rem",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                  color: "var(--lmb-text)",
                }}
              >
                LMB <span style={{ color: "var(--lmb-gold-soft)", fontSize: "0.85rem", fontStyle: "italic" }}>Molecular</span>
              </span>
            </div>
            <p
              className="mt-5 max-w-md text-sm"
              style={{
                color: "var(--lmb-muted)",
                lineHeight: 1.7,
              }}
            >
              Luxury molecular bartending services for weddings, private celebrations, and brand experiences across Delhi, Agra, and India. Where science, craft, and theatre meet exceptional taste.
            </p>

            <div className="mt-8 flex max-w-md flex-col gap-2">
              <p
                className="lmb-eyebrow"
                style={{ fontSize: "0.6rem", marginBottom: "0.5rem" }}
              >
                Get in touch
              </p>
              <a
                href="tel:+919582810267"
                className="text-sm font-medium transition-colors"
                style={{
                  color: "var(--lmb-gold-soft)",
                  textDecoration: "none",
                }}
              >
                +91 95828 10267
              </a>
              <a
                href="mailto:lmbmolecular@gmail.com"
                className="text-sm font-medium transition-colors"
                style={{
                  color: "var(--lmb-gold-soft)",
                  textDecoration: "none",
                }}
              >
                lmbmolecular@gmail.com
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <nav
            className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-3"
            style={{
              fontFamily: "var(--font-lmb-sans), Arial, sans-serif",
            }}
          >
            {columns.map((col) => (
              <div key={col.title}>
                <h3
                  className="lmb-eyebrow"
                  style={{
                    color: "var(--lmb-gold-soft)",
                    marginBottom: "1rem",
                  }}
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors"
                        style={{
                          color: "var(--lmb-muted)",
                          textDecoration: "none",
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t py-8 text-xs sm:flex-row"
          style={{
            borderColor: "var(--lmb-line)",
            color: "var(--lmb-muted)",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>© 2026 LMB Molecular</span>
          <span className="flex items-center gap-2">
            <span
              className="size-1.5 rounded-full"
              style={{ background: "var(--lmb-gold)" }}
            />
            Available for bookings
          </span>
          <span>Delhi · Agra · India</span>
        </div>
      </div>
    </RuixenGradientFooter>
  );
}
