import Link from "next/link";

export function FinalCTA() {
  return (
    <section
      className="py-20 md:py-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-ed-forest)" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201, 162, 39, 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Corner accents */}
      <div
        className="absolute top-8 left-8 w-24 h-24 border-l border-t opacity-20"
        style={{ borderColor: "var(--color-ed-amber)" }}
      />
      <div
        className="absolute bottom-8 right-8 w-24 h-24 border-r border-b opacity-20"
        style={{ borderColor: "var(--color-ed-amber)" }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-serif font-normal mb-4 leading-tight"
          style={{ color: "white" }}
        >
          Ready to file? You&apos;re in good hands.
        </h2>
        <p
          className="text-base md:text-lg mb-8 max-w-xl mx-auto"
          style={{ color: "var(--color-ed-sage-light)" }}
        >
          500+ returns filed since 2018. Human-reviewed. No experience needed.
        </p>
        <Link
          href="/qualify"
          className="inline-flex items-center gap-2 px-10 py-4 text-base font-semibold transition-all duration-300"
          style={{
            backgroundColor: "var(--color-ed-amber)",
            color: "var(--color-ed-charcoal)",
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
        <p
          className="mt-4 text-sm"
          style={{ color: "var(--color-ed-sage)" }}
        >
          No credit card required to start
        </p>
      </div>
    </section>
  );
}
