"use client";

import { useId, useState, type ComponentPropsWithoutRef } from "react";

type TextareaProps = {
  label: string;
} & ComponentPropsWithoutRef<"textarea">;

export function Textarea({
  label,
  id,
  className = "",
  onFocus,
  onBlur,
  onChange,
  rows = 4,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const floated = focused || hasValue;

  return (
    <div className="relative">
      <textarea
        id={textareaId}
        rows={rows}
        className={`w-full resize-none rounded-xl border border-trust-200 bg-white px-4 pb-2.5 pt-5 text-trust-900 outline-none transition-colors duration-300 focus:border-action-400 focus:shadow-[0_0_0_3px_rgba(184,134,42,0.15)] ${className}`}
        onFocus={(event) => {
          setFocused(true);
          onFocus?.(event);
        }}
        onBlur={(event) => {
          setFocused(false);
          onBlur?.(event);
        }}
        onChange={(event) => {
          setHasValue(event.target.value.length > 0);
          onChange?.(event);
        }}
        {...props}
      />
      <label
        htmlFor={textareaId}
        className={`pointer-events-none absolute left-4 font-medium text-trust-400 transition-all duration-200 ${
          floated ? "top-2 text-xs text-action-500" : "top-5 text-base"
        }`}
      >
        {label}
      </label>
    </div>
  );
}
