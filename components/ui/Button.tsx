import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-400/20 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]",
  outline:
    "bg-transparent border border-white/30 text-white hover:bg-white/5 backdrop-blur-sm",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium tracking-wide transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95";

type ButtonProps = {
  variant?: Variant;
  href?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
