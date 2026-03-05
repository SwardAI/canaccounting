import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ | US LLC Tax Filing Services",
  description:
    "Frequently asked questions about US LLC tax filing for non-residents. Learn about documents needed, deadlines, and our services.",
};

const faqs = [
  {
    question: "What is a US tax return and why do I need to file one?",
    answer:
      "If you own a US LLC, the IRS requires you to file an annual tax return, even if your LLC had no income. This is called an 'informational return' and reports your LLC's financial activity for the year. Failing to file can result in penalties starting at $210 per month, per partner/member, and can affect your ability to do business in the US.",
  },
  {
    question: "What documents do I need to provide?",
    answer:
      "We'll need your LLC's bank statements for the full year, income records (invoices, payment processor statements like Stripe or PayPal), expense receipts, your EIN letter from the IRS, and your LLC's Operating Agreement. If you filed a tax return last year, we'll also need a copy of that. Don't worry — we'll send you a detailed checklist after purchase.",
  },
  {
    question: "What happens if I miss the April 15th deadline?",
    answer:
      "Missing the deadline can result in penalties and interest charges from the IRS. However, you can file for an automatic extension (Form 7004) which gives you an additional 6 months. If you're already past the deadline, contact us immediately — we can help you file late and minimize penalties. It's always better to file late than not at all.",
  },
  {
    question: "Do I need to file if my LLC had no income this year?",
    answer:
      "Yes. Even if your LLC had zero income and zero expenses, you're still required to file an informational return with the IRS. This is one of the most common misconceptions among international LLC owners. We can help you file a 'zero activity' return quickly and affordably.",
  },
  {
    question: "How long does the tax filing process take?",
    answer:
      "Once we receive all your documents, we typically complete your tax return within 5-7 business days. For complex returns with multiple income sources or state filings, it may take up to 10 business days. We always file well before any deadlines to ensure you're never at risk of late penalties.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We take data security seriously. All payments are processed through Stripe, which is PCI-DSS compliant. Documents you send via email are handled confidentially and never shared with third parties. We only collect the information necessary to prepare your tax return.",
  },
  {
    question: "What's included in each package?",
    answer:
      "Our Annual Tax Return package includes preparation and filing of your federal return (Form 1065 for partnerships or Form 1120 for corporations), plus any required state filings. Our Monthly Accounting package includes ongoing bookkeeping, expense categorization, and monthly financial statements. The Bundle combines both at a discounted rate and includes priority support and quarterly tax planning calls.",
  },
  {
    question: "How do I communicate with you after purchase?",
    answer:
      "All communication happens via email. After purchase, you'll receive a confirmation email with detailed instructions. Simply reply to that email to send documents or ask questions. We typically respond within 24 hours on business days. No complicated portals or logins required.",
  },
  {
    question: "Can you help if I haven't filed taxes in previous years?",
    answer:
      "Yes, we can help you get caught up. Many international LLC owners don't realize they need to file until years later. We can prepare and file returns for previous years to bring you into compliance with the IRS. Contact us to discuss your specific situation.",
  },
  {
    question: "Do you provide tax advice?",
    answer:
      "We provide tax preparation and accounting services, which means we prepare and file your returns based on the information you provide. For specific tax planning advice, legal questions about your LLC structure, or complex tax situations, we recommend consulting with a licensed CPA or tax attorney. We're happy to refer you to trusted professionals if needed.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
                FAQ
              </p>
              <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
                Frequently Asked Questions
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to know about US LLC tax filing for
                non-residents. Can't find what you're looking for? Use our chat
                or email us.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 lg:px-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border bg-card px-6 shadow-sm"
                >
                  <AccordionTrigger className="py-6 text-left font-semibold text-foreground hover:no-underline [&[data-state=open]]:text-emerald-600">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
            <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
              Still Have Questions?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our team is here to help. Reach out and we'll get back to you
              within 24 hours.
            </p>
            <a
              href="mailto:contact@yourdomain.com"
              className="mt-6 inline-block rounded-lg bg-emerald-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
