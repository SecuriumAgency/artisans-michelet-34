import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-gradient-to-b from-[#0066FF] to-blue-800 text-white shadow-[inset_0_2px_1px_rgba(255,255,255,0.25),inset_0_-3px_6px_rgba(0,0,0,0.35),0_0_40px_rgba(0,102,255,0.5)] hover:shadow-[inset_0_2px_1px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.4),0_0_55px_rgba(0,102,255,0.65)] hover:brightness-110",
  outline:
    "border border-trust-300 text-trust-700 bg-transparent hover:border-trust-500 hover:text-trust-900",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold tracking-wide transition-all duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-95";

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
