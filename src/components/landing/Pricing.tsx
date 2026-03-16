import Link from "next/link";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Tax Return Only",
    description: "One-time LLC tax return filing",
    price: "$300",
    period: "",
    originalPrice: "$600",
    note: "Limited time — 50% off",
    highlight: true,
    features: [
      "Complete LLC tax return (Form 1120 & Form 5472)",
      "Reviewed by a tax professional",
      "Unlimited revisions",
      "Delivered within 48 hours",
    ],
    cta: "Start Your Return",
  },
  {
    name: "Monthly Accounting",
    description: "Ongoing bookkeeping support",
    price: "$200",
    period: "/month",
    note: null,
    highlight: false,
    features: [
      "Monthly bookkeeping",
      "Financial reports",
      "Dedicated accountant",
      "Cancel anytime",
    ],
    cta: "Get Started",
  },
  {
    name: "Annual Accounting",
    description: "Save with an annual commitment",
    price: "$1,500",
    period: "/year",
    originalPrice: "$2,400",
    note: "Save 37%",
    highlight: false,
    features: [
      "Everything in Monthly",
      "$125/month effective rate",
      "Priority support",
      "Year-end summary included",
    ],
    cta: "Get Started",
  },
  {
    name: "Accounting + Tax Return",
    description: "The complete package",
    price: "$1,700",
    period: "/year",
    originalPrice: "$2,900",
    note: null,
    highlight: false,
    features: [
      "Everything in Annual Accounting",
      "Full LLC tax return included",
      "Form 1120 & Form 5472",
      "Professionally reviewed filing",
    ],
    cta: "Get Started",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-ed-sage)" }}
          >
            Pricing
          </span>
          <h2
            className="text-3xl md:text-4xl font-serif font-normal mb-4"
            style={{ color: "var(--color-ed-charcoal)" }}
          >
            Simple, transparent pricing.
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-ed-warm-gray)" }}
          >
            No hidden fees. No surprises.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-sm overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                plan.highlight ? "ring-2 ring-ed-amber" : ""
              }`}
              style={{
                backgroundColor: plan.highlight
                  ? "var(--color-ed-forest)"
                  : "var(--color-ed-cream)",
                boxShadow: plan.highlight
                  ? "0 8px 32px rgba(26, 58, 47, 0.25)"
                  : "0 4px 24px rgba(0, 0, 0, 0.04)",
              }}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div
                  className="flex items-center justify-center gap-1.5 py-2 text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--color-ed-amber)",
                    color: "var(--color-ed-charcoal)",
                  }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  Most Popular
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                {/* Plan name */}
                <h3
                  className="text-lg font-semibold mb-1"
                  style={{
                    color: plan.highlight
                      ? "white"
                      : "var(--color-ed-charcoal)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{
                    color: plan.highlight
                      ? "var(--color-ed-sage-light)"
                      : "var(--color-ed-warm-gray)",
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-1">
                  {"originalPrice" in plan && plan.originalPrice && (
                    <span
                      className="text-lg line-through mr-2"
                      style={{
                        color: plan.highlight
                          ? "var(--color-ed-sage-light)"
                          : "var(--color-ed-warm-gray)",
                      }}
                    >
                      {plan.originalPrice}
                    </span>
                  )}
                  <span
                    className="text-4xl font-serif font-normal tracking-tight"
                    style={{
                      color: plan.highlight
                        ? "white"
                        : "var(--color-ed-charcoal)",
                    }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className="text-sm ml-1"
                      style={{
                        color: plan.highlight
                          ? "var(--color-ed-sage-light)"
                          : "var(--color-ed-warm-gray)",
                      }}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                {/* Note */}
                {plan.note && (
                  <p
                    className="text-xs font-medium mb-6"
                    style={{
                      color: plan.highlight
                        ? "var(--color-ed-amber)"
                        : "var(--color-ed-sage)",
                    }}
                  >
                    {plan.note}
                  </p>
                )}
                {!plan.note && <div className="mb-6" />}

                {/* Divider */}
                <div
                  className="h-px mb-6"
                  style={{
                    backgroundColor: plan.highlight
                      ? "rgba(255, 255, 255, 0.15)"
                      : "var(--color-ed-border)",
                  }}
                />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <div
                        className="shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5"
                        style={{
                          backgroundColor: plan.highlight
                            ? "var(--color-ed-amber)"
                            : "var(--color-ed-amber-pale)",
                        }}
                      >
                        <Check
                          className="w-2.5 h-2.5"
                          strokeWidth={3}
                          style={{
                            color: plan.highlight
                              ? "var(--color-ed-charcoal)"
                              : "var(--color-ed-forest)",
                          }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{
                          color: plan.highlight
                            ? "var(--color-ed-sage-light)"
                            : "var(--color-ed-charcoal-light)",
                        }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href="/qualify"
                  className="inline-flex items-center justify-center w-full py-3 text-sm font-semibold transition-all duration-300"
                  style={
                    plan.highlight
                      ? {
                          backgroundColor: "var(--color-ed-amber)",
                          color: "var(--color-ed-charcoal)",
                        }
                      : {
                          backgroundColor: "var(--color-ed-forest)",
                          color: "white",
                        }
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
