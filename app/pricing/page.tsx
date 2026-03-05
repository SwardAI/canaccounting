import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PricingCards } from "@/components/sections/pricing-cards";
import { Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | US LLC Tax Filing Services",
  description:
    "Choose the right tax filing and accounting plan for your US LLC. Annual tax returns, monthly accounting, or bundle packages available.",
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
                Pricing
              </p>
              <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Choose the plan that fits your needs. No hidden fees, no
                surprises. All plans include expert support and IRS-compliant
                filing.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PricingCards />

            {/* Trust badge */}
            <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Have Questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Check out our{" "}
              <a
                href="/faq"
                className="font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-700"
              >
                FAQ page
              </a>{" "}
              for answers to common questions about our services, the tax filing
              process, and what documents you'll need.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
