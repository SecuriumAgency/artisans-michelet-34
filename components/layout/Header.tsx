"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/prestations", label: "Prestations" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-white/10 bg-michelet-dark/50 backdrop-blur-2xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-end gap-8 px-6">
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
    </header>
  );
}
