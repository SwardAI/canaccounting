import Link from "next/link";

export function Hero() {
  return (
    <section className="relative pt-44 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="mb-8">
            <div className="inline-block">
              <div
                className="relative px-3 py-1 rounded-full font-semibold uppercase tracking-wider text-gray-900"
                style={{
                  background: "#D6CCC2",
                  boxShadow:
                    "0 2px 8px 0 rgba(0, 0, 0, 0.1), inset 0 -3px 6px rgba(0, 0, 0, 0.1), inset 0 2px 1px rgba(255, 255, 255, 0.3)",
                  fontSize: "13px",
                }}
              >
                <span className="relative">TRUSTED SINCE 2018</span>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight mb-8 text-gray-900 font-serif">
            LLC Tax Returns. $300. Done.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            Prepared by professionals. Reviewed for accuracy. Filed with
            confidence. We&apos;ve handled hundreds of LLC returns since 2018
            — so you don&apos;t have to figure it out alone.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/qualify"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg h-12 px-8 text-lg font-semibold text-white hover:opacity-90 transition-all cursor-pointer"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.3357 0.06 156.81), oklch(0.2857 0.05 156.81))",
              }}
            >
              Start Your Return
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
