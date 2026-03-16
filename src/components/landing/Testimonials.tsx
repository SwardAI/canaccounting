import { Star, BadgeCheck } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "They clearly know what they're doing. Everything was handled quickly — no back-and-forth, no confusion. Easiest tax season I've had.",
    name: "Consulting LLC owner",
    image: "/images/testimonials/marcus.png",
  },
  {
    quote:
      "Uploaded my documents Monday night. Had my completed return by Tuesday morning. The review even caught something I would have missed.",
    name: "SaaS company founder",
    image: "/images/testimonials/priya.png",
  },
  {
    quote:
      "As a non-resident LLC owner, US taxes felt overwhelming. CanTax handled Form 5472, Form 1120 — everything. Incredibly smooth process.",
    name: "Foreign-owned LLC, agency",
    image: "/images/testimonials/jessica.png",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-serif font-normal mb-3"
            style={{ color: "var(--color-ed-charcoal)" }}
          >
            Real results from real businesses
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className={`relative p-8 transition-all duration-300 hover:-translate-y-1 ${
                index === testimonials.length - 1
                  ? "md:col-span-2 md:max-w-[calc(50%-1rem)] md:mx-auto"
                  : ""
              }`}
              style={{
                backgroundColor: "var(--color-ed-cream)",
                borderLeft: "3px solid var(--color-ed-amber)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Verified badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1.5">
                <BadgeCheck
                  className="w-4 h-4"
                  style={{ color: "var(--color-ed-amber)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--color-ed-warm-gray)" }}
                >
                  Verified
                </span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{
                      color: "var(--color-ed-amber)",
                      fill: "var(--color-ed-amber)",
                    }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "var(--color-ed-charcoal-light)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full overflow-hidden border-2"
                  style={{
                    borderColor: "var(--color-ed-amber)",
                    opacity: 0.8,
                  }}
                >
                  <Image
                    alt={t.name}
                    src={t.image}
                    width={48}
                    height={48}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className="font-semibold text-base"
                  style={{ color: "var(--color-ed-charcoal)" }}
                >
                  {t.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
