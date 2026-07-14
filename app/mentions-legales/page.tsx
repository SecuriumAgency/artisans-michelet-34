import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Artisans Michelet 34",
  description:
    "Mentions légales du site Artisans Michelet 34 : éditeur, hébergeur, propriété intellectuelle et données personnelles.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  const contactEmail = process.env.CONTACT_EMAIL;

  return (
    <main>
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-slate-50 mb-8">
          Mentions légales
        </h1>

        <div className="text-slate-300 leading-relaxed space-y-4">
          <p>
            Le site{" "}
            <a
              href="https://www.artisans-michelet-34.fr/"
              className="font-semibold hover:text-cyan-400 transition-colors"
            >
              Artisans Michelet 34
            </a>{" "}
            (ci-après « le site ») est accessible à l&apos;adresse
            www.artisans-michelet-34.fr. L&apos;accès et l&apos;utilisation de ce site
            impliquent l&apos;acceptation pleine et entière des présentes mentions légales.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-cyan-400 mt-8 mb-4">Éditeur du site</h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Le présent site est édité par Artisans Michelet 34, société par actions
              simplifiée unipersonnelle (SASU).
              <br />
              Adresse du siège social : 15 rue de la République, 34000 Montpellier
              <br />
              SIRET : 942 496 571 00012
              <br />
              Téléphone :{" "}
              <a
                href="tel:0411939674"
                className="font-semibold hover:text-cyan-400 transition-colors"
              >
                04 11 93 96 74
              </a>
              <br />
              Directeur de la publication : Securium Web Agency
              <br />
              Conception et réalisation : Securium Web Agency
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-400 mt-8 mb-4">Hébergement</h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789,
              États-Unis.
              <br />
              Site web :{" "}
              <a
                href="https://vercel.com"
                className="font-semibold hover:text-cyan-400 transition-colors"
              >
                vercel.com
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-400 mt-8 mb-4">
            Propriété intellectuelle
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              L&apos;ensemble des éléments présents sur ce site (textes, images, logos,
              illustrations, structure et charte graphique) est protégé par le droit de la
              propriété intellectuelle et demeure la propriété exclusive d&apos;Artisans
              Michelet 34, sauf mention contraire. Toute reproduction, représentation,
              modification, publication ou adaptation totale ou partielle de ces éléments,
              par quelque procédé que ce soit, sans l&apos;autorisation écrite préalable
              d&apos;Artisans Michelet 34, est strictement interdite et pourra donner lieu à
              des poursuites conformément aux articles L.335-2 et suivants du Code de la
              propriété intellectuelle.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-400 mt-8 mb-4">
            Limitations de responsabilité
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Artisans Michelet 34 s&apos;efforce d&apos;assurer l&apos;exactitude et la mise
              à jour des informations diffusées sur ce site, mais ne saurait garantir
              l&apos;exhaustivité ou l&apos;absence d&apos;erreur de ces informations.
              Artisans Michelet 34 ne pourra être tenu responsable des dommages directs ou
              indirects résultant de l&apos;accès au site ou de son utilisation, y compris
              l&apos;inaccessibilité, les pertes de données, la présence de virus
              informatiques ou d&apos;une quelconque atteinte au matériel informatique de
              l&apos;utilisateur. Ce site peut contenir des liens vers des sites tiers sur le
              contenu desquels Artisans Michelet 34 n&apos;exerce aucun contrôle et décline
              toute responsabilité quant à leur contenu.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-400 mt-8 mb-4">
            Données personnelles (RGPD)
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-4">
            <p>
              Le traitement des données personnelles collectées via ce site (notamment par le
              formulaire de contact) est décrit en détail dans notre{" "}
              <a
                href="/politique-confidentialite"
                className="font-semibold hover:text-cyan-400 transition-colors"
              >
                politique de confidentialité
              </a>
              . Conformément au Règlement Général sur la Protection des Données (RGPD —
              Règlement (UE) 2016/679) et à la loi Informatique et Libertés, vous disposez
              d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
              portabilité et d&apos;opposition sur vos données. Pour exercer ces droits, vous
              pouvez nous contacter à l&apos;adresse suivante :{" "}
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold hover:text-cyan-400 transition-colors"
                >
                  {contactEmail}
                </a>
              ) : (
                <span className="font-semibold text-slate-400">
                  [adresse email de contact à configurer]
                </span>
              )}
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
