import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-trust-700 text-white hover:bg-trust-600",
  outline:
    "border border-trust-300 text-trust-700 bg-transparent hover:border-trust-500 hover:text-trust-900",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 font-semibold tracking-wide shadow-floating transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-gold";

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
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

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
