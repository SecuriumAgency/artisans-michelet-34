import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-michelet-blue text-white hover:bg-[#0052d4]",
  outline:
    "border border-trust-300 text-trust-700 bg-transparent hover:border-trust-500 hover:text-trust-900",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold tracking-wide shadow-glow-blue transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue-lg active:translate-y-0 active:scale-95";

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
