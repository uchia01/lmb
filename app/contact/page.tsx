import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | LMB Molecular — Luxury Molecular Bartending",
  description:
    "Plan your next celebration with LMB Molecular. Reach out to book bespoke cocktail experiences, molecular bar services, and luxury event bartending across Delhi, Agra, and India.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
