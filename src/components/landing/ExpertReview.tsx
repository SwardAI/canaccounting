import { Check } from "lucide-react";
import Image from "next/image";

const bullets = [
  "Professional-grade accuracy on every filing",
  "Errors caught before your return is filed",
  "Unlimited revisions included",
];

export function ExpertReview() {
  return (
    <section className="py-20 md:py-24" style={{ backgroundColor: "white" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image with amber corner accents */}
          <div className="relative">
            <div
              className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2"
              style={{ borderColor: "var(--color-ed-amber)" }}
            />
            <div
              className="relative overflow-hidden"
              style={{
                boxShadow: "16px 16px 0 var(--color-ed-cream-dark)",
              }}
            >
              <Image
                alt="Tax professional reviewing returns"
                src="/images/lp/tax-professional-female.png"
                width={560}
                height={420}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Text content */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span
                className="text-xs font-semibold tracking-[0.15em] uppercase"
                style={{ color: "var(--color-ed-sage)" }}
              >
                Expert Review
              </span>
            </div>
            <h2
              className="text-3xl md:text-4xl font-serif font-normal mb-6 leading-tight"
              style={{ color: "var(--color-ed-charcoal)" }}
            >
              Every return is reviewed by tax professionals.
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--color-ed-charcoal-light)" }}
            >
              Your LLC tax return is prepared with care, then verified by
              experienced tax professionals. You get speed without sacrificing
              accuracy.
            </p>
            <ul className="space-y-3">
              {bullets.map((text) => (
                <li key={text} className="flex items-start gap-3">
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      backgroundColor: "var(--color-ed-amber-pale)",
                    }}
                  >
                    <Check
                      className="w-3 h-3"
                      strokeWidth={3}
                      style={{ color: "var(--color-ed-forest)" }}
                    />
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: "var(--color-ed-charcoal)" }}
                  >
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
