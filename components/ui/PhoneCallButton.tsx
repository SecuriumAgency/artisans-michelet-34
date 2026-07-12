"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Button } from "@/components/ui/Button";

type PhoneCallButtonProps = {
  phone: string;
  label: string;
  variant?: "primary" | "outline";
  className?: string;
};

function handleCallClick() {
  // TODO: Injecter le label de conversion Google Ads (ex: sendGAEvent({ event: 'conversion', send_to: 'AW-1849890923/LABEL_A_DEFINIR' }))
}

export function PhoneCallButton({ phone, label, variant = "outline", className }: PhoneCallButtonProps) {
  return (
    <Button href={`tel:${phone}`} variant={variant} className={className} onClick={handleCallClick}>
      {label}
    </Button>
  );
}
