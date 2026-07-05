"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="flex-1 bg-trust-950 px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <span className="text-sm font-semibold uppercase tracking-widest text-action-400">
          Contact
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">
          Demandez votre devis
        </h1>
        <p className="mt-4 text-trust-200">
          Décrivez votre projet, un artisan Michelet vous recontacte sous 24h.
        </p>

        {submitted ? (
          <div className="mt-12 rounded-2xl border border-action-400/30 bg-action-900/20 p-8 text-center text-action-100">
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
    </main>
  );
}
