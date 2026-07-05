import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      aria-label="Services d'artisanat dans l'Hérault"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-trust-900"
    >
      <Image
        src="/hero/hero-michelet.jpg"
        alt="Réalisation artisanale Michelet"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-trust-900/60" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-section text-center text-white">
        <span className="inline-block rounded-full border border-action-400/50 bg-action-900/40 px-4 py-1.5 text-sm font-semibold tracking-widest text-action-200">
          ARTISANS MICHELET — HÉRAULT (34)
        </span>
        <h1 className="mt-8 font-display text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Plomberie et Serrurerie
          <br className="hidden sm:block" /> dans l&apos;Hérault (34)
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg text-trust-100 sm:text-xl">
          Un savoir-faire d&apos;exception au service de vos projets, dans tout le
          département de l&apos;Hérault.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            href="/contact"
            variant="primary"
            className="bg-trust-700 text-white hover:bg-trust-600 hover:shadow-[0_0_30px_rgba(44,80,121,0.5)]"
          >
            Demander un devis
          </Button>
          <Button
            href="tel:0411939674"
            variant="outline"
            className="border-action-400 text-action-300 hover:border-action-300 hover:text-action-200"
          >
            Appeler l&apos;expert 04 11 93 96 74
          </Button>
        </div>
      </div>
    </section>
  );
}
