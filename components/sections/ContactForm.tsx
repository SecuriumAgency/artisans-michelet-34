"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type Status = "idle" | "loading" | "success" | "error";

const SERVICE_OPTIONS = [
  { value: "Plomberie", label: "Plomberie" },
  { value: "Serrurerie", label: "Serrurerie" },
  { value: "Autre", label: "Autre" },
];

type ContactFormProps = {
  as?: "h1" | "h2";
  title?: string;
  description?: string;
  defaultService?: string;
  className?: string;
};

export function ContactForm({
  as = "h2",
  title = "Demandez votre devis",
  description = "Décrivez votre projet, un artisan Michelet vous recontacte sous 24h.",
  defaultService,
  className = "",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const Heading = as;
  const headingSize = as === "h1" ? "text-4xl sm:text-5xl lg:text-6xl" : "text-3xl sm:text-4xl lg:text-5xl";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error ?? "Une erreur est survenue.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue.");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      <Heading className={`font-display font-bold text-white ${headingSize}`}>{title}</Heading>
      <p className="mt-4 text-gray-300">{description}</p>

      <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_8px_32px_rgba(0,102,255,0.15)] backdrop-blur-xl md:p-8">
        {status === "success" ? (
          <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center backdrop-blur-md md:p-8">
            <CheckCircle className="mx-auto h-10 w-10 text-green-400" aria-hidden />
            <p className="mt-4 font-semibold text-white">
              Merci, votre demande a bien été envoyée.
            </p>
            <p className="mt-1 text-sm text-green-200">Nous vous recontactons rapidement.</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {status === "error" && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200"
              >
                {errorMessage}
              </div>
            )}

            <Input label="Nom complet" name="name" required />
            <Input label="Téléphone" name="phone" type="tel" required />
            <Input label="Email" name="email" type="email" required />
            <Select
              label="Service concerné"
              name="service"
              options={SERVICE_OPTIONS}
              defaultValue={defaultService ?? SERVICE_OPTIONS[0].value}
            />
            <Textarea label="Décrivez votre besoin" name="message" />
            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
                  Envoi en cours...
                </>
              ) : (
                "Envoyer ma demande"
              )}
            </Button>
          </form>
        )}
      </div>
    </motion.div>
  );
}
