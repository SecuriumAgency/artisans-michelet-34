"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type ContactFormProps = {
  as?: "h1" | "h2";
  title?: string;
  description?: string;
  className?: string;
};

export function ContactForm({
  as = "h2",
  title = "Demandez votre devis",
  description = "Décrivez votre projet, un artisan Michelet vous recontacte sous 24h.",
  className = "",
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const Heading = as;
  const headingSize = as === "h1" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl";

  return (
    <div className={className}>
      <Heading className={`font-display font-bold text-white ${headingSize}`}>{title}</Heading>
      <p className="mt-4 text-gray-300">{description}</p>

      {submitted ? (
        <div className="mt-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 p-8 text-center text-blue-100">
          Merci, votre demande a bien été envoyée. Nous vous recontactons rapidement.
        </div>
      ) : (
        <form
          className="mt-12 space-y-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <Input label="Nom complet" name="name" required />
          <Input label="Téléphone" name="phone" type="tel" required />
          <Input label="Email" name="email" type="email" required />
          <Input label="Décrivez votre besoin" name="message" />
          <Button type="submit" variant="primary" className="w-full justify-center">
            Envoyer ma demande
          </Button>
        </form>
      )}
    </div>
  );
}
