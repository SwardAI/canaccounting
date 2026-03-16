import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/"
          className="text-xl font-bold text-black mb-12 inline-block"
        >
          United<span style={{ color: "var(--color-ed-forest)" }}>Tax</span>
        </Link>

        <h1
          className="text-3xl md:text-4xl font-serif font-normal mb-8"
          style={{ color: "var(--color-ed-charcoal)" }}
        >
          Privacy Policy
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--color-ed-warm-gray)" }}>
          Last updated: March 16, 2026
        </p>

        <div
          className="prose max-w-none text-base leading-relaxed space-y-6"
          style={{ color: "var(--color-ed-charcoal-light)" }}
        >
          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            1. Information We Collect
          </h2>
          <p>
            When you use UnitedTax, we collect information you provide directly,
            including your name, email address, business information, and tax
            documents. We also collect payment information through our payment
            processor, Stripe — we do not store your credit card details on our
            servers.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            2. How We Use Your Information
          </h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Prepare and file your LLC tax returns</li>
            <li>Provide accounting and bookkeeping services</li>
            <li>Communicate with you about your filings</li>
            <li>Process payments</li>
            <li>Send service-related emails and updates</li>
            <li>Improve our services</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            3. How We Protect Your Information
          </h2>
          <p>
            We take the security of your data seriously. All documents are
            transmitted using encrypted connections (TLS/SSL). We use
            industry-standard security measures to protect your personal and
            financial information. Access to client data is restricted to
            authorized personnel only.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            4. Third-Party Services
          </h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Stripe</strong> — for payment processing. Stripe&apos;s
              privacy policy governs their handling of your payment data.
            </li>
            <li>
              <strong>Vercel</strong> — for website hosting.
            </li>
            <li>
              <strong>Resend</strong> — for transactional emails.
            </li>
          </ul>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            5. Data Retention
          </h2>
          <p>
            We retain your information for as long as necessary to provide our
            services and comply with legal obligations. Tax documents and
            records are retained for the period required by applicable tax laws
            (typically 3–7 years). You may request deletion of your data by
            contacting us.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            6. Your Rights
          </h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            7. Contact
          </h2>
          <p>
            If you have questions about this Privacy Policy, contact us at{" "}
            <a
              href="mailto:can@unitedtax.us"
              style={{ color: "var(--color-ed-forest)" }}
            >
              can@unitedtax.us
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
