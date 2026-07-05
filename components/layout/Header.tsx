"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo3D } from "@/components/ui/Logo3D";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-michelet-dark/50 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo3D />
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Artisans Michelet
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-trust-100 transition-colors hover:text-michelet-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="tel:0411939674"
          className="hidden items-center gap-2 rounded-full border border-michelet-blue/50 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-michelet-blue hover:shadow-[0_0_20px_rgba(0,102,255,0.4)] sm:flex"
        >
          <Phone className="h-4 w-4" />
          04 11 93 96 74
        </Link>
      </div>
    </header>
  );
}
