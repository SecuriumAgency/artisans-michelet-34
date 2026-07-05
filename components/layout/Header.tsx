"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-trust-900/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-white/10"
          >
            <motion.div
              variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative h-full w-full"
            >
              <Image
                src="/logo-michelet.png"
                alt="Artisans Michelet"
                fill
                sizes="44px"
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.span
              aria-hidden
              variants={{ rest: { x: "-120%", opacity: 0 }, hover: { x: "120%", opacity: 1 } }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </motion.div>
          <span className="font-display text-lg font-bold tracking-tight text-white">
            Artisans Michelet
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-trust-100 transition-colors hover:text-action-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="tel:0411939674"
          className="hidden items-center gap-2 rounded-full border border-action-400/50 px-5 py-2 text-sm font-semibold text-action-200 transition-all duration-300 hover:border-action-300 hover:text-action-100 hover:shadow-[0_0_20px_rgba(184,134,42,0.4)] sm:flex"
        >
          <Phone className="h-4 w-4" />
          04 11 93 96 74
        </Link>
      </div>
    </header>
  );
}
