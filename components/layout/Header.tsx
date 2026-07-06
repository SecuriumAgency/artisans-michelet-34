"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeydown);
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled || mobileOpen
          ? "border-white/10 bg-michelet-dark/50 backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:justify-end md:gap-8">
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-michelet-blue/50 md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>

        <nav className="hidden items-center gap-8 md:mr-auto md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-michelet-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="tel:0411939674"
          className="flex items-center gap-2 rounded-full border border-michelet-blue/50 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:border-michelet-blue hover:shadow-[0_0_20px_rgba(0,102,255,0.4)]"
        >
          <Phone className="h-4 w-4" />
          04 11 93 96 74
        </Link>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Navigation principale"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="border-t border-white/10 bg-michelet-dark/95 px-6 py-6 backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-michelet-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
