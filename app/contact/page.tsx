import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
  return (
    <main className="flex-1 bg-trust-950 px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-action-400">
          Contact
        </span>
        <ContactForm as="h1" className="mt-3" />
      </div>
    </main>
  );
}
