"use client";

import { useId, type ComponentPropsWithoutRef } from "react";

type SelectProps = {
  label: string;
  options: { value: string; label: string }[];
} & ComponentPropsWithoutRef<"select">;

export function Select({ label, options, id, className = "", ...props }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={selectId} className="mb-2 block text-xs font-medium text-gray-400">
        {label}
      </label>
      <select
        id={selectId}
        className={`w-full rounded-xl border border-trust-200 bg-white px-4 py-3 text-trust-900 outline-none transition-colors duration-300 focus:border-action-400 focus:shadow-[0_0_0_3px_rgba(184,134,42,0.15)] ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
