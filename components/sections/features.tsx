"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Globe,
  Clock,
  Users,
  FileCheck,
  HeadphonesIcon,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "IRS Compliant",
    description:
      "Every return is prepared according to current IRS regulations. We stay up-to-date so you don't have to.",
  },
  {
    icon: Globe,
    title: "Built for International Owners",
    description:
      "We specialize in serving non-US residents. We understand the unique challenges of running a US LLC from abroad.",
  },
  {
    icon: Clock,
    title: "Meet Every Deadline",
    description:
      "Never miss the April 15th deadline again. We track all important dates and file on time, every time.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description:
      "Our accountants have years of experience with US LLC taxation for international entrepreneurs.",
  },
  {
    icon: FileCheck,
    title: "Hassle-Free Process",
    description:
      "Just send us your documents via email. No complicated portals, no confusing forms — we handle everything.",
  },
  {
    icon: HeadphonesIcon,
    title: "Personal Support",
    description:
      "Have questions? Email us anytime. We provide direct, personal support — no chatbots or ticket queues.",
  },
];

const containerVariants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function Features() {
  return (
    <section id="features" className="dark-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
            Tax Filing Without the Stress
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            We take the complexity out of US tax compliance so you can focus on
            growing your business.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group rounded-xl border border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm transition-shadow hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-600/20">
                <feature.icon className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
