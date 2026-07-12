"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/Button";
import { CenterLogo3D } from "@/components/ui/CenterLogo3D";
import { TrustBar } from "@/components/ui/TrustBar";

function handleCallClick() {
  // TODO: Injecter le label de conversion Google Ads (ex: sendGAEvent({ event: 'conversion', send_to: 'AW-1849890923/LABEL_A_DEFINIR' }))
}

export function Hero() {
  return (
    <section
      aria-label="Artisans Michelet — Plomberie et Serrurerie dans l'Hérault"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-28"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-michelet-dark/60 via-michelet-dark/35 to-michelet-dark/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,11,20,0.15)_0%,rgba(5,11,20,0.85)_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-10 text-center">
        <h1 className="sr-only">Artisans Michelet</h1>

        <CenterLogo3D />

        <p className="max-w-2xl text-center font-sans text-sm font-light leading-relaxed tracking-wide text-gray-300 md:text-base">
          Plomberie et serrurerie d&apos;exception dans tout le département de l&apos;Hérault.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/contact" variant="primary">
            Demander un devis
          </Button>
          <Button href="tel:0411939674" variant="outline" onClick={handleCallClick}>
            Appeler l&apos;expert 04 11 93 96 74
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-16 flex w-full justify-center">
        <TrustBar />
      </div>
    </section>
  );
}
