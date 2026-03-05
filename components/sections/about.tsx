"use client";

import { motion } from "framer-motion";
import { Award, Users, Building2 } from "lucide-react";

const credentials = [
  {
    icon: Award,
    title: "Professional Expertise",
    description:
      "Our team includes certified accountants with extensive experience in US tax law and international business structures.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description:
      "We believe in clear communication and personal service. You'll always know exactly what's happening with your taxes.",
  },
  {
    icon: Building2,
    title: "Established Company",
    description:
      "We're a registered company with a track record of helping international entrepreneurs stay compliant with US tax requirements.",
  },
];

export function About() {
  return (
    <section id="about" className="dark-section py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
              About Us
            </p>
            <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl lg:text-5xl">
              Your Trusted Tax Partner
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              We started this service because we saw too many international
              entrepreneurs struggling with US tax compliance. The process
              shouldn't be this confusing — so we made it simple.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Our team understands the unique challenges of running a US LLC
              from abroad. We've helped over 100 clients from Turkey, the Middle
              East, Europe, and beyond stay compliant with the IRS while
              focusing on what matters most — growing their businesses.
            </p>
          </motion.div>

          {/* Credentials */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {credentials.map((credential, index) => (
              <motion.div
                key={credential.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-600/20">
                  <credential.icon className="h-6 w-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{credential.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">
                    {credential.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
