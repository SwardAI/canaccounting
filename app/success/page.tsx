import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CheckCircle, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Payment Successful | US LLC Tax Filing Services",
  description: "Thank you for your purchase. Here are your next steps.",
};

const nextSteps = [
  {
    icon: Mail,
    title: "Check Your Email",
    description:
      "We've sent a confirmation email with detailed instructions. Please check your inbox (and spam folder, just in case).",
  },
  {
    icon: FileText,
    title: "Gather Your Documents",
    description:
      "You'll need bank statements, income records, and expense receipts. Our email will tell you exactly what we need.",
  },
  {
    icon: ArrowRight,
    title: "Send Documents to Us",
    description:
      "Reply to our email with your documents attached. Our team will review everything and get started on your filing.",
  },
];

export default function SuccessPage() {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] bg-background py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          {/* Success Message */}
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle className="h-10 w-10 text-emerald-600" />
            </div>
            <h1 className="mt-6 font-serif text-3xl text-foreground sm:text-4xl">
              Payment Successful!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Thank you for choosing us for your US LLC tax needs. We're excited
              to work with you.
            </p>
          </div>

          {/* Next Steps */}
          <div className="mt-12 space-y-6">
            <h2 className="text-center text-xl font-bold text-foreground">
              What Happens Next?
            </h2>

            {nextSteps.map((step, index) => (
              <Card key={step.title} className="border-border shadow-sm">
                <CardContent className="flex items-start gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10">
                    <step.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-emerald-600">
                        Step {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-1 font-bold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 rounded-xl border border-border bg-muted/50 p-6 text-center">
            <p className="text-muted-foreground">
              Questions? Contact us at{" "}
              <a
                href="mailto:contact@yourdomain.com"
                className="font-medium text-emerald-600 hover:underline"
              >
                contact@yourdomain.com
              </a>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
