import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Users,
  Globe,
  Award,
  Target,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | US LLC Tax Filing Services",
  description:
    "Learn about our team and mission. We help non-US residents navigate US LLC tax compliance with professional, hassle-free service.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We handle your finances with the utmost care and transparency. No hidden fees, no surprises.",
  },
  {
    icon: Target,
    title: "Expertise",
    description:
      "Our team specializes in US tax law for international entrepreneurs. We know the rules inside and out.",
  },
  {
    icon: Heart,
    title: "Client-First",
    description:
      "Your success is our success. We're here to make tax compliance simple so you can focus on growth.",
  },
];

const stats = [
  { value: "234+", label: "Tax Returns Filed" },
  { value: "50+", label: "Countries Served" },
  { value: "99%", label: "On-Time Filing Rate" },
  { value: "24h", label: "Avg. Response Time" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="dark-section py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-400">
                About Us
              </p>
              <h1 className="mt-3 font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
                Your Trusted Partner in US Tax Compliance
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                We started this service because we saw too many international
                entrepreneurs struggling with US tax requirements. The process
                shouldn't be confusing — so we made it simple.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-background py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl font-medium text-emerald-600">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-background py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
                  Our Story
                </p>
                <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
                  Built by Entrepreneurs, for Entrepreneurs
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    We know firsthand the challenges of running a US LLC from
                    abroad. The confusing forms, the fear of IRS penalties, the
                    difficulty finding an accountant who understands
                    international businesses — we've been there.
                  </p>
                  <p>
                    That's why we built this service. We wanted to create
                    something we wished existed when we started: a simple,
                    trustworthy, and affordable way for non-US residents to stay
                    compliant with US tax requirements.
                  </p>
                  <p>
                    Today, we've helped over 200 entrepreneurs from Turkey, the
                    Middle East, Europe, Asia, and beyond file their US tax
                    returns and maintain proper books. Our clients range from
                    solo freelancers to growing e-commerce businesses.
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-6">
                    <Globe className="h-10 w-10 text-emerald-600" />
                    <h3 className="mt-4 font-bold text-foreground">
                      Global Reach
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      We serve clients in over 50 countries, with deep expertise
                      in Turkish, Middle Eastern, and European markets.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-6">
                    <Users className="h-10 w-10 text-emerald-600" />
                    <h3 className="mt-4 font-bold text-foreground">
                      Experienced Team
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Our accountants have years of experience with US LLC
                      taxation and international business structures.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-6">
                    <Shield className="h-10 w-10 text-emerald-600" />
                    <h3 className="mt-4 font-bold text-foreground">
                      IRS Compliant
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Every return we prepare follows current IRS regulations.
                      We stay up-to-date so you don't have to.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card shadow-lg">
                  <CardContent className="p-6">
                    <Award className="h-10 w-10 text-emerald-600" />
                    <h3 className="mt-4 font-bold text-foreground">
                      Proven Track Record
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      99% on-time filing rate. We've never missed a deadline for
                      a client who provided documents on time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-emerald-600">
                Our Values
              </p>
              <h2 className="mt-3 font-serif text-3xl text-foreground sm:text-4xl">
                What We Stand For
              </h2>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {values.map((value) => (
                <Card
                  key={value.title}
                  className="border-border bg-card shadow-lg"
                >
                  <CardContent className="p-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/10">
                      <value.icon className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-foreground">
                      {value.title}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="dark-section py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-serif text-3xl text-white sm:text-4xl">
                Ready to Get Started?
              </h2>
              <p className="mt-4 text-lg text-slate-300">
                Join hundreds of international entrepreneurs who trust us with
                their US LLC tax compliance.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-emerald-600 px-8 py-6 font-semibold text-white hover:bg-emerald-700 sm:w-auto"
                >
                  <Link href="/pricing">
                    View Pricing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full border-slate-600 bg-transparent px-8 py-6 font-semibold text-white hover:bg-slate-800 sm:w-auto"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
