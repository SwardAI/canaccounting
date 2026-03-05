"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Lock, Award } from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";

const signals = [
  {
    icon: Shield,
    text: "IRS Compliant",
  },
  {
    icon: Lock,
    text: "Secured by Stripe",
  },
  {
    icon: Globe,
    text: "International Experts",
  },
  {
    icon: Award,
    text: "Years of Experience",
  },
];

export function TrustSignals() {
  return (
    <section className="border-y border-border bg-muted/50 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
        >
          {/* Number ticker stat */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-serif text-2xl font-medium text-emerald-600">
              <NumberTicker value={234} delay={0.2} />
            </span>
            <span className="text-sm font-medium">LLC Tax Returns Filed</span>
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-border md:block" />

          {/* Other signals */}
          {signals.map((signal) => (
            <div
              key={signal.text}
              className="flex items-center gap-2 text-muted-foreground"
            >
              <signal.icon className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">{signal.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
