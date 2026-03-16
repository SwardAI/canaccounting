import { AlertTriangle } from "lucide-react";

const risks = [
  {
    stat: "75%",
    description:
      "of audited taxpayers end up owing more. One incorrect form is all it takes to trigger a review.",
  },
  {
    stat: "$25,000",
    description:
      "IRS penalty per form for late or incomplete filing — even if your LLC had zero income.",
  },
  {
    stat: "6 years",
    description:
      "The IRS can go back and audit your LLC for up to 6 years. One mistake today can surface years later.",
  },
];

export function RiskWarning() {
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--color-ed-amber-pale)",
              color: "var(--color-ed-charcoal)",
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Don&apos;t risk it
          </div>
          <h2
            className="text-3xl md:text-4xl font-serif font-normal mb-4"
            style={{ color: "var(--color-ed-charcoal)" }}
          >
            If the IRS looks, they&apos;ll find something.
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--color-ed-warm-gray)" }}
          >
            3 out of 4 audited taxpayers end up owing more money. An incorrect
            or incomplete filing doesn&apos;t just risk a fine — it puts your
            entire LLC on the IRS radar. We make sure that doesn&apos;t happen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {risks.map((risk) => (
            <div
              key={risk.stat}
              className="p-6 rounded-sm"
              style={{
                backgroundColor: "white",
                borderTop: "3px solid var(--color-ed-amber)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04)",
              }}
            >
              <p
                className="text-3xl font-serif font-normal mb-3"
                style={{ color: "var(--color-ed-charcoal)" }}
              >
                {risk.stat}
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "var(--color-ed-charcoal-light)" }}
              >
                {risk.description}
              </p>
            </div>
          ))}
        </div>

        <p
          className="text-center text-xs mt-8"
          style={{ color: "var(--color-ed-warm-gray)" }}
        >
          Source: IRS.gov — International information reporting penalties &
          audit statistics
        </p>
      </div>
    </section>
  );
}
