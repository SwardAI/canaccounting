const stats = [
  { display: "7", label: "Years of experience", suffix: "+" },
  { display: "500", label: "Returns filed", suffix: "+" },
  { display: "100", label: "Client satisfaction", suffix: "%" },
];

export function Stats() {
  return (
    <section
      className="py-16 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-ed-forest)" }}
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, #808080 0px, #808080 1px, transparent 1px, transparent 60px), repeating-linear-gradient(0deg, #808080 0px, #808080 1px, transparent 1px, transparent 60px)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl"
        style={{ backgroundColor: "var(--color-ed-amber)", opacity: 0.05 }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center relative">
              <div className="flex items-baseline justify-center gap-1">
                <span
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal tracking-tight"
                  style={{ color: "white" }}
                >
                  {stat.display}
                </span>
                {stat.suffix && (
                  <span
                    className="text-3xl md:text-4xl font-serif"
                    style={{ color: "var(--color-ed-amber)" }}
                  >
                    {stat.suffix}
                  </span>
                )}
              </div>
              <div
                className="mt-2 text-sm uppercase tracking-[0.15em] font-medium"
                style={{ color: "var(--color-ed-sage-light)" }}
              >
                {stat.label}
              </div>
              <div
                className="mt-4 w-12 h-px mx-auto"
                style={{
                  backgroundColor: "var(--color-ed-amber)",
                  opacity: 0.5,
                }}
              />
              {index < stats.length - 1 && (
                <div
                  className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
