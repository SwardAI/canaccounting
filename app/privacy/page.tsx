import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | US LLC Tax Filing Services",
  description:
    "Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="mt-12 space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
              <p className="mt-4">
                TaxLLC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">2. Information We Collect</h2>
              <div className="mt-4 space-y-4">
                <p>We collect information you provide directly to us, including:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                  <li><strong>Business Information:</strong> Company name, LLC details, EIN</li>
                  <li><strong>Financial Documents:</strong> Bank statements, income records, expense receipts (only when you send them to us for tax preparation)</li>
                  <li><strong>Payment Information:</strong> Processed securely through Stripe; we do not store your credit card details</li>
                  <li><strong>Communications:</strong> Messages you send us via email or our contact form</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">3. How We Use Your Information</h2>
              <div className="mt-4 space-y-4">
                <p>We use the information we collect to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Provide tax preparation and accounting services</li>
                  <li>Process payments for our services</li>
                  <li>Communicate with you about your account and our services</li>
                  <li>Send confirmation emails and important updates</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">4. Information Sharing</h2>
              <div className="mt-4 space-y-4">
                <p>We do not sell your personal information. We may share your information only in the following circumstances:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li><strong>Service Providers:</strong> With third-party vendors who assist us in operating our business (e.g., Stripe for payments, Resend for emails)</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to respond to legal process</li>
                  <li><strong>Tax Authorities:</strong> When filing tax returns on your behalf with the IRS or state tax agencies, as authorized by you</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">5. Data Security</h2>
              <p className="mt-4">
                We implement appropriate technical and organizational measures to protect your personal information. All payment processing is handled by Stripe, which is PCI-DSS compliant. Documents you share with us are handled confidentially and stored securely.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">6. Data Retention</h2>
              <p className="mt-4">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Tax-related documents are retained for a minimum of 7 years as required by IRS regulations. You may request deletion of your data by contacting us, subject to legal retention requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">7. Your Rights</h2>
              <div className="mt-4 space-y-4">
                <p>Depending on your location, you may have the right to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal requirements)</li>
                  <li>Opt out of marketing communications</li>
                </ul>
                <p>To exercise these rights, please contact us at contact@yourdomain.com.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">8. Cookies and Tracking</h2>
              <p className="mt-4">
                Our website may use cookies and similar technologies to improve your experience. These are used for essential functionality and analytics. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">9. Third-Party Links</h2>
              <p className="mt-4">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">10. Changes to This Policy</h2>
              <p className="mt-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">11. Contact Us</h2>
              <p className="mt-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@yourdomain.com" className="text-emerald-600 hover:underline">
                  contact@yourdomain.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
