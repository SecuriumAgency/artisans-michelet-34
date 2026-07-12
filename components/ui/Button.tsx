import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-cyan-400/30 backdrop-blur-md hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] hover:border-cyan-300/50",
  outline:
    "bg-white/5 border border-white/20 text-white backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.35)] hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_25px_rgba(192,138,82,0.35)]",
};

const BASE_CLASSES =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-8 py-3 font-medium tracking-wide transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95";

type ButtonProps = {
  variant?: Variant;
  href?: string;
  onClick?: () => void;
} & Omit<ComponentPropsWithoutRef<"button">, "onClick">;

export function Button({
  variant = "primary",
  href,
  onClick,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
