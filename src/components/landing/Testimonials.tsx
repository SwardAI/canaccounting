import { Star, BadgeCheck } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    title: "Professionals who know their stuff",
    quote:
      "You can tell they've been doing this for years. Everything was handled perfectly — no back and forth, no confusion.",
    name: "Marcus Johnson",
    role: "Founder, Johnson Consulting",
    image: "/images/testimonials/marcus.png",
  },
  {
    title: "48-hour turnaround is real",
    quote:
      "The human review caught one thing I would have missed. Uploaded Monday night, had my return Tuesday morning.",
    name: "Priya Sharma",
    role: "CEO, TechFlow Solutions",
    image: "/images/testimonials/priya.png",
  },
  {
    title: "Perfect for foreign LLC owners",
    quote:
      "As a non-resident, US taxes were confusing. CanTax handled Form 5472, 1120, everything. Incredibly smooth.",
    name: "Jessica Williams",
    role: "Owner, Williams Agency",
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
              key={t.name}
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

              {/* Title */}
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "var(--color-ed-charcoal)" }}
              >
                {t.title}
              </h3>

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
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-ed-charcoal)" }}
                  >
                    {t.name}
                  </div>
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-ed-warm-gray)" }}
                  >
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
