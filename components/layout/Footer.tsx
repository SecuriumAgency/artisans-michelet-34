import Link from "next/link";
import { Phone } from "lucide-react";
import { VILLES_PLOMBERIE, VILLES_SERRURERIE } from "@/lib/villes";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const LINK_CLASSES =
  "inline-block text-sm text-gray-400 transition-all duration-300 hover:translate-x-1 hover:text-michelet-blue";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#03060C] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold text-white">Artisans Michelet</p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Plomberie et serrurerie d&apos;exception dans tout le département de l&apos;Hérault.
            </p>
            <Link
              href="tel:0411939674"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-blue-400"
            >
              <Phone className="h-4 w-4" aria-hidden />
              04 11 93 96 74
            </Link>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Plombier Hérault (34)
            </p>
            <ul className="mt-5 space-y-3">
              {VILLES_PLOMBERIE.map((ville) => (
                <li key={ville.slug}>
                  <Link href={`/plombier/${ville.slug}`} className={LINK_CLASSES}>
                    Plombier {ville.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Serrurier Hérault (34)
            </p>
            <ul className="mt-5 space-y-3">
              {VILLES_SERRURERIE.map((ville) => (
                <li key={ville.slug}>
                  <Link href={`/serrurier/${ville.slug}`} className={LINK_CLASSES}>
                    Serrurier {ville.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Navigation
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={LINK_CLASSES}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Artisans Michelet. Tous droits réservés.</p>
          <p>SIRET [à compléter] — Assurance décennale [à compléter]</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
          <Link
            href="/mentions-legales"
            className="text-xs text-gray-400 transition-colors duration-300 hover:text-blue-400"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-xs text-gray-400 transition-colors duration-300 hover:text-blue-400"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
