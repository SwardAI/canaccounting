"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    id: "tier1",
    name: "Annual Tax Return",
    description: "One-time annual tax filing service for your US LLC",
    price: "$399",
    period: "one-time",
    features: [
      "Complete US tax return preparation",
      "Federal tax filing (Form 1065 or 1120)",
      "State filing if required",
      "Filed before April 15th deadline",
      "Document review and guidance",
      "Email support throughout the process",
    ],
    cta: "Get Started",
    popular: false,
    priceId: "STRIPE_PRICE_TIER1",
  },
  {
    id: "tier2",
    name: "Monthly Accounting",
    description: "Ongoing bookkeeping and financial oversight",
    price: "$149",
    period: "/month",
    features: [
      "Monthly bookkeeping and reconciliation",
      "Expense categorization",
      "Financial statements (P&L, Balance Sheet)",
      "Quarterly financial reviews",
      "Year-round email support",
      "Tax-ready books at year end",
    ],
    cta: "Get Started",
    popular: false,
    priceId: "STRIPE_PRICE_TIER2",
  },
  {
    id: "tier3",
    name: "Complete Bundle",
    description: "Tax filing + monthly accounting at a discounted rate",
    price: "$1,499",
    period: "/year",
    features: [
      "Everything in Annual Tax Return",
      "Everything in Monthly Accounting",
      "Priority support",
      "Quarterly tax planning calls",
      "Estimated tax payment reminders",
      "Save $290 vs. buying separately",
    ],
    cta: "Get Best Value",
    popular: true,
    priceId: "STRIPE_PRICE_TIER3",
  },
];

const containerVariants = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export function PricingCards() {
  const handleCheckout = async (priceId: string) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("No checkout URL returned");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className="grid gap-8 lg:grid-cols-3"
    >
      {tiers.map((tier) => (
        <motion.div key={tier.id} variants={itemVariants}>
          <Card
            className={`relative h-full overflow-hidden ${
              tier.popular
                ? "border-2 border-emerald-600 shadow-xl"
                : "border-border shadow-lg"
            }`}
          >
            {tier.popular && (
              <div className="absolute right-4 top-4">
                <Badge className="bg-emerald-600 text-white hover:bg-emerald-600">
                  Best Value
                </Badge>
              </div>
            )}

            <CardHeader className="pb-4">
              <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
              <p className="text-sm text-muted-foreground">{tier.description}</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Price */}
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-5xl font-medium text-foreground">
                  {tier.price}
                </span>
                <span className="text-muted-foreground">{tier.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                onClick={() => handleCheckout(tier.priceId)}
                className={`w-full py-6 text-base font-semibold ${
                  tier.popular
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                asChild
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {tier.cta}
                </motion.button>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
