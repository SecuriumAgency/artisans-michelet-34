"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, Wrench } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Clock, label: "Intervention 30 min" },
  { icon: ShieldCheck, label: "Agréé Assurances" },
  { icon: Wrench, label: "Devis Transparent" },
];

export function TrustBar() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/5 px-8 py-5 backdrop-blur-3xl sm:flex-row sm:gap-10"
    >
      {TRUST_ITEMS.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center gap-3 text-sm font-medium text-white">
          <Icon className="h-5 w-5 text-michelet-blue" />
          {label}
        </div>
      ))}
    </motion.div>
  );
}
