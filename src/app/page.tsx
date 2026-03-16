import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { Stats } from "@/components/landing/Stats";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ExpertReview } from "@/components/landing/ExpertReview";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Testimonials } from "@/components/landing/Testimonials";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <ExpertReview />
        <Benefits />
        <TrustedBy />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
