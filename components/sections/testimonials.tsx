"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";

const testimonials = [
  {
    quote:
      "I was completely lost with my US LLC taxes. These guys made it incredibly simple — I just sent my documents and they handled everything. Highly recommend!",
    name: "Mehmet A.",
    role: "E-commerce Founder",
    location: "Istanbul, Turkey",
  },
  {
    quote:
      "As a non-resident, finding a trustworthy accountant for my US LLC was a nightmare. This service is exactly what I needed — professional, responsive, and reliable.",
    name: "Sarah K.",
    role: "SaaS Entrepreneur",
    location: "Dubai, UAE",
  },
  {
    quote:
      "I've been using their monthly accounting service for a year now. My books are always in order and I never worry about tax deadlines anymore. Worth every penny.",
    name: "Ahmed B.",
    role: "Digital Agency Owner",
    location: "London, UK",
  },
  {
    quote:
      "Filing taxes for my LLC used to give me anxiety. Now I just forward my documents and forget about it. The peace of mind is priceless.",
    name: "Elena M.",
    role: "Freelance Consultant",
    location: "Berlin, Germany",
  },
  {
    quote:
      "Professional service at a fair price. They explained everything clearly and filed my return well before the deadline. Will definitely use again next year.",
    name: "Raj P.",
    role: "Software Developer",
    location: "Mumbai, India",
  },
  {
    quote:
      "I had unfiled returns from previous years and was worried about penalties. They helped me get caught up and made the whole process stress-free.",
    name: "Omar H.",
    role: "Online Store Owner",
    location: "Riyadh, Saudi Arabia",
  },
];

function TestimonialCard({
  quote,
  name,
  role,
  location,
}: {
  quote: string;
  name: string;
  role: string;
  location: string;
}) {
  return (
    <Card className="relative w-[350px] shrink-0 overflow-hidden border-border bg-card shadow-lg md:w-[400px]">
      {/* Decorative quote mark */}
      <div className="absolute right-4 top-4 font-serif text-6xl leading-none text-emerald-600/10">
        "
      </div>

      <CardContent className="p-6">
        <blockquote className="relative text-sm leading-relaxed text-foreground">
          "{quote}"
        </blockquote>

        <div className="mt-4 border-t border-border pt-4">
          <p className="font-bold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials() {
  return (
    <section className="bg-background py-24 lg:py-32">
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
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl lg:text-5xl">
            Trusted by Entrepreneurs Worldwide
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients say about
            working with us.
          </p>
        </motion.div>
      </div>

      {/* Marquee Testimonials - Full width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mt-16"
      >
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent" />

        <Marquee pauseOnHover className="[--duration:40s] [--gap:1.5rem]">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
