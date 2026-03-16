import Link from "next/link";
import { X } from "lucide-react";

export default function CheckoutCancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gray-200">
          <X className="w-8 h-8 text-gray-500" strokeWidth={3} />
        </div>
        <h1
          className="text-3xl font-serif font-normal mb-4"
          style={{ color: "var(--color-ed-charcoal)" }}
        >
          Payment cancelled.
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: "var(--color-ed-warm-gray)" }}
        >
          No worries — nothing was charged. You can try again whenever
          you&apos;re ready.
        </p>
        <Link
          href="/#pricing"
          className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white transition-all"
          style={{ backgroundColor: "var(--color-ed-forest)" }}
        >
          Back to pricing
        </Link>
      </div>
    </div>
  );
}
