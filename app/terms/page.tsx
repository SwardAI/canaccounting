import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Terms of Service | US LLC Tax Filing Services",
  description:
    "Read our terms and conditions for using our tax filing and accounting services.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h1 className="font-serif text-4xl text-foreground">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>

          <div className="mt-12 space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
              <p className="mt-4">
                By accessing or using the services provided by TaxLLC ("Company," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">2. Services Description</h2>
              <div className="mt-4 space-y-4">
                <p>TaxLLC provides tax preparation and accounting services for US LLCs owned by non-US residents. Our services include:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Annual US tax return preparation and filing</li>
                  <li>Monthly bookkeeping and accounting services</li>
                  <li>Financial statement preparation</li>
                  <li>Tax compliance guidance</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">3. Not Legal or Financial Advice</h2>
              <p className="mt-4">
                <strong>Important:</strong> Our services constitute tax preparation and accounting assistance only. We do not provide legal advice, investment advice, or personalized financial planning. For specific legal questions regarding your LLC structure, contracts, or compliance matters, please consult a licensed attorney. For complex tax planning strategies, please consult a licensed CPA or tax advisor.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">4. Client Responsibilities</h2>
              <div className="mt-4 space-y-4">
                <p>By using our services, you agree to:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Provide accurate, complete, and truthful information</li>
                  <li>Submit all required documents in a timely manner</li>
                  <li>Review all prepared documents before filing</li>
                  <li>Notify us promptly of any changes to your business or contact information</li>
                  <li>Pay all fees when due</li>
                </ul>
                <p>
                  You are ultimately responsible for the accuracy of the information provided to us and the tax returns filed on your behalf.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">5. Payment Terms</h2>
              <div className="mt-4 space-y-4">
                <p>Payment is required at the time of purchase through our secure payment processor, Stripe. All fees are:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Non-refundable once work has commenced on your tax return or accounting records</li>
                  <li>Subject to change; current prices are displayed on our pricing page</li>
                  <li>Exclusive of any penalties or interest that may be assessed by tax authorities</li>
                </ul>
                <p>
                  For subscription services (Monthly Accounting), you may cancel at any time, but no refunds will be provided for partial months.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">6. Refund Policy</h2>
              <div className="mt-4 space-y-4">
                <p>Refunds may be provided at our discretion in the following circumstances:</p>
                <ul className="ml-6 list-disc space-y-2">
                  <li>Service was not delivered as described</li>
                  <li>Technical issues prevented service delivery</li>
                  <li>Cancellation requested before any work has commenced</li>
                </ul>
                <p>
                  To request a refund, please contact us at contact@yourdomain.com within 14 days of purchase.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">7. Deadlines and Timing</h2>
              <p className="mt-4">
                We make every effort to file tax returns before applicable deadlines. However, timely filing depends on receiving complete and accurate documents from you with sufficient lead time. We are not responsible for late filing penalties if documents are not provided in time for us to complete the return before the deadline.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">8. Confidentiality</h2>
              <p className="mt-4">
                We treat all client information as confidential. We will not disclose your information to third parties except as necessary to provide our services (e.g., filing with the IRS), as required by law, or with your consent. See our Privacy Policy for more details.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">9. Limitation of Liability</h2>
              <p className="mt-4">
                To the maximum extent permitted by law, TaxLLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities. Our total liability for any claim arising from our services shall not exceed the amount you paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">10. Indemnification</h2>
              <p className="mt-4">
                You agree to indemnify and hold harmless TaxLLC and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including reasonable attorney fees) arising from your breach of these terms, your provision of inaccurate information, or your violation of any applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">11. Intellectual Property</h2>
              <p className="mt-4">
                All content on our website, including text, graphics, logos, and software, is the property of TaxLLC and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">12. Termination</h2>
              <p className="mt-4">
                We reserve the right to suspend or terminate your access to our services at any time for any reason, including breach of these terms. Upon termination, your right to use our services will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">13. Governing Law</h2>
              <p className="mt-4">
                These Terms of Service shall be governed by and construed in accordance with the laws of the United Arab Emirates, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the courts of Dubai, UAE.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">14. Changes to Terms</h2>
              <p className="mt-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after any changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground">15. Contact Information</h2>
              <p className="mt-4">
                If you have any questions about these Terms of Service, please contact us at:
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
