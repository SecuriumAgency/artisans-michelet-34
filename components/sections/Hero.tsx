import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      aria-label="Présentation d'Artisans Michelet"
      className="relative flex min-h-[85vh] items-center overflow-hidden bg-trust-950"
    >
      <Image
        src="/hero/hero-michelet.jpg"
        alt="Réalisation artisanale Michelet"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-trust-950/60" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-section text-center text-white">
        <span className="inline-block rounded-full border border-action-400/50 bg-action-900/40 px-4 py-1.5 text-sm font-semibold tracking-widest text-action-200">
          ARTISANS MICHELET — HÉRAULT (34)
        </span>
        <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          L&apos;excellence artisanale,
          <br className="hidden sm:block" /> transmise avec passion.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-trust-100 sm:text-xl">
          Un savoir-faire d&apos;exception au service de vos projets, dans tout le
          département de l&apos;Hérault.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary" className="bg-action-500 text-trust-950 hover:bg-action-400">
            Demander un devis
          </Button>
          <Button href="/realisations" variant="outline" className="border-white/40 text-white hover:border-white hover:text-white">
            Voir nos réalisations
          </Button>
        </div>
      </div>
    </section>
  );
}
