import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité du site Artisans Michelet : données collectées, finalité, durée de conservation et droits des utilisateurs (RGPD).",
  alternates: { canonical: "/politique-confidentialite" },
};

export default function PolitiqueConfidentialitePage() {
  const contactEmail = process.env.CONTACT_EMAIL;

  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-[#050B14] to-[#0A1626] px-6 pb-20 pt-32">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl md:p-12">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">
          Politique de confidentialité
        </h1>

        <p className="mt-6 leading-relaxed text-gray-300">
          Artisans Michelet accorde une attention particulière à la protection des données
          personnelles de ses visiteurs et clients, conformément au Règlement Général sur la
          Protection des Données (RGPD — Règlement (UE) 2016/679) et à la loi Informatique et
          Libertés. Cette page décrit les données collectées via ce site, leur finalité, leur
          durée de conservation et les droits dont vous disposez.
        </p>

        <div className="mt-10 space-y-10">
          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">Données collectées</h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Lorsque vous utilisez le formulaire de contact de ce site, les données suivantes
              sont collectées : votre nom, votre adresse email, votre numéro de téléphone, le
              service concerné (plomberie ou serrurerie) et le message que vous rédigez. Ces
              données sont transmises par email à Artisans Michelet et ne sont utilisées à
              aucune autre fin que celle décrite ci-dessous.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Finalité du traitement
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Les données collectées via le formulaire de contact sont utilisées exclusivement
              pour traiter votre demande de devis, planifier une intervention (y compris en
              urgence) et vous recontacter à ce sujet. Elles ne font l&apos;objet d&apos;aucune
              prospection commerciale non sollicitée ni d&apos;aucune cession à des tiers.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Durée de conservation
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Les données transmises via le formulaire de contact sont conservées pour une
              durée maximale de 3 ans à compter de notre dernier échange avec vous, sauf
              obligation légale ou comptable imposant une durée de conservation plus longue.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Destinataires des données
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Les données du formulaire sont transmises par email à Artisans Michelet via un
              relais d&apos;envoi sécurisé (Webmail OVH). Aucune donnée n&apos;est vendue,
              louée ou partagée avec des tiers à des fins commerciales.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Mesure d&apos;audience
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Ce site utilise Vercel Analytics et Vercel Speed Insights, des outils de mesure
              d&apos;audience et de performance fonctionnant sans cookies, à des fins
              strictement statistiques et anonymisées.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-blue-400">
              Droits des utilisateurs
            </h2>
            <p className="mt-4 leading-relaxed text-gray-300">
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et de portabilité de vos données, ainsi que
              d&apos;un droit d&apos;opposition et de limitation du traitement. Pour exercer
              l&apos;un de ces droits, vous pouvez nous contacter à l&apos;adresse suivante :{" "}
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-blue-400 transition-colors duration-300 hover:text-blue-300"
                >
                  {contactEmail}
                </a>
              ) : (
                <span className="font-semibold text-gray-400">
                  [adresse email de contact à configurer]
                </span>
              )}
              . Vous disposez également du droit d&apos;introduire une réclamation auprès de la
              CNIL (www.cnil.fr).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
