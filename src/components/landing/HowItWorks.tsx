import Link from "next/link";

const steps = [
  {
    num: "1",
    title: "Upload your documents",
    description:
      "Drop in your P&L and balance sheet. We'll tell you if anything's missing.",
  },
  {
    num: "2",
    title: "We prepare your return",
    description:
      "We generate your complete return — typically within 48 hours.",
  },
  {
    num: "3",
    title: "Review and pay",
    description:
      "Check your return. Pay $300 only if satisfied. No payment upfront.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-24"
      style={{ backgroundColor: "white" }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-ed-sage)" }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="text-3xl md:text-4xl font-serif font-normal mb-4"
            style={{ color: "var(--color-ed-charcoal)" }}
          >
            Your return in three steps
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-ed-warm-gray)" }}
          >
            No experience needed. We guide you through everything.
          </p>
        </div>

        {/* Steps — 3-column grid with giant faded numbers */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="relative text-center md:text-left"
            >
              {/* Giant faded number */}
              <div
                className="text-7xl md:text-8xl font-serif font-normal leading-none mb-4 md:mb-6"
                style={{
                  color: "var(--color-ed-forest)",
                  opacity: 0.15,
                }}
              >
                {step.num}
              </div>
              <div className="md:-mt-6 relative">
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: "var(--color-ed-charcoal)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-ed-charcoal-light)" }}
                >
                  {step.description}
                </p>
              </div>
              {/* Dashed connector (desktop) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 right-0 translate-x-1/2 w-8 border-t border-dashed"
                  style={{ borderColor: "var(--color-ed-border)" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/qualify"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold transition-all duration-300 text-white"
            style={{
              backgroundColor: "var(--color-ed-forest)",
              boxShadow: "0 4px 14px rgba(26, 58, 47, 0.25)",
            }}
          >
            Start Your Return
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
