import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales | Artisans Michelet",
  description:
    "Mentions légales du site Artisans Michelet : éditeur, hébergeur et propriété intellectuelle.",
};

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-[#050B14] to-[#0A1626] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Mentions légales
        </h1>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">Éditeur du site</h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Le présent site est édité par Artisans Michelet.
              <br />
              Adresse du siège social : [Adresse à compléter]
              <br />
              SIRET : [SIRET à compléter]
              <br />
              Téléphone : 04 11 93 96 74
              <br />
              Directeur de la publication : [Nom du directeur de la publication à compléter]
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Conception et réalisation
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Ce site a été conçu et réalisé par Securium Digital Agency.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">Hébergement</h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis.
              <br />
              Le routage DNS du nom de domaine est géré par OVH / IONOS.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Propriété intellectuelle
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              L&apos;ensemble des éléments présents sur ce site (textes, images, logos,
              illustrations, structure et charte graphique) est protégé par le droit de la
              propriété intellectuelle et demeure la propriété exclusive d&apos;Artisans
              Michelet, sauf mention contraire. Toute reproduction, représentation,
              modification, publication ou adaptation totale ou partielle de ces éléments, par
              quelque procédé que ce soit, sans l&apos;autorisation écrite préalable
              d&apos;Artisans Michelet, est strictement interdite et pourra donner lieu à des
              poursuites conformément aux articles L.335-2 et suivants du Code de la propriété
              intellectuelle.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
