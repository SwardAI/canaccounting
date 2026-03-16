import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function Terms() {
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
          Terms of Service
        </h1>
        <p className="text-sm mb-12" style={{ color: "var(--color-ed-warm-gray)" }}>
          Last updated: March 16, 2026
        </p>

        <div
          className="prose max-w-none text-base leading-relaxed space-y-6"
          style={{ color: "var(--color-ed-charcoal-light)" }}
        >
          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            1. Services
          </h2>
          <p>
            UnitedTax provides LLC tax return preparation, bookkeeping, and
            accounting services. Our services include the preparation of
            federal tax forms (Form 1120, Form 5472) and related filings for
            U.S. LLCs.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            2. Client Responsibilities
          </h2>
          <p>By using our services, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Supply all requested documents in a timely manner</li>
            <li>Review completed returns before approving them for filing</li>
            <li>
              Inform us of any changes to your business that may affect your
              tax filing
            </li>
          </ul>
          <p>
            You are ultimately responsible for the accuracy of the information
            you provide. UnitedTax prepares returns based on the documents and
            information supplied by you.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            3. Pricing and Payment
          </h2>
          <p>
            Prices are listed on our website and are subject to change. All
            payments are processed securely through Stripe. For one-time
            services (tax return filing), payment is collected at the time of
            purchase. For subscription services (monthly or annual accounting),
            payments recur according to the billing cycle selected.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            4. Refund Policy
          </h2>
          <p>
            If we are unable to complete your tax return or provide the agreed
            service, you are entitled to a full refund. For tax return services,
            refund requests must be made before the return is filed with the
            IRS. Subscription services may be cancelled at any time — no
            refunds are provided for partial billing periods.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            5. Revisions
          </h2>
          <p>
            All tax return packages include unlimited revisions. You may
            request changes to your return before it is filed. Once a return
            has been filed with the IRS, amendments may incur additional fees.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            6. Limitation of Liability
          </h2>
          <p>
            UnitedTax prepares tax returns based on the information provided by
            clients. We are not liable for penalties, interest, or additional
            taxes resulting from inaccurate or incomplete information provided
            by the client. Our total liability is limited to the amount paid
            for the service.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            7. Confidentiality
          </h2>
          <p>
            We treat all client information as confidential. We will not
            disclose your personal or financial information to third parties
            except as required by law or as necessary to provide our services
            (e.g., e-filing with the IRS).
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            8. Termination
          </h2>
          <p>
            Either party may terminate the service relationship at any time.
            If you cancel a subscription, access continues until the end of
            the current billing period.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            9. Changes to Terms
          </h2>
          <p>
            We may update these terms from time to time. Continued use of our
            services after changes are posted constitutes acceptance of the
            updated terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4" style={{ color: "var(--color-ed-charcoal)" }}>
            10. Contact
          </h2>
          <p>
            Questions about these terms? Contact us at{" "}
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
