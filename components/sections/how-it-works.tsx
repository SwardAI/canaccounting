"use client";

import { motion } from "framer-motion";
import { CreditCard, FileText, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: CreditCard,
    title: "Choose Your Plan",
    description:
      "Select the service that fits your needs — annual tax filing, monthly accounting, or both. Pay securely via Stripe.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Send Your Documents",
    description:
      "After purchase, email us your bank statements, income records, and expense receipts. We'll tell you exactly what we need.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "We Handle the Rest",
    description:
      "Our team prepares and files your US tax return before the deadline. You get peace of mind — no IRS worries.",
  },
];

const containerVariants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
            Simple Process
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Getting your US LLC taxes filed is easier than you think. Here's our
            straightforward three-step process.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 md:grid-cols-3 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className="relative flex"
            >
              {/* Connector line (hidden on mobile, shown on md+) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-[2px] w-full translate-x-1/2 bg-gradient-to-r from-border to-transparent md:block lg:top-14" />
              )}

              <div className="relative flex h-full w-full flex-col rounded-xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md">
                {/* Number badge */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-serif text-4xl font-medium text-emerald-600">
                    {step.number}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/10">
                    <step.icon className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
