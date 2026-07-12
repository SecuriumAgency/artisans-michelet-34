import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Artisans Michelet pour un devis plomberie ou serrurerie dans l'Hérault (34). Réponse sous 24h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="flex-1 bg-michelet-dark px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-blue-500">
          Contact
        </span>
        <ContactForm as="h1" className="mt-3" />
      </div>
    </main>
  );
}
