"use client";
import { useState } from "react";
import { links } from "@/lib/exporter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const pricingPlans = [
  {
    name: "Free",
    monthly: "Free",
    yearly: "",
    free: "",
    features: [
      "✅ 3 categories (Breakfast, Lunch, Dinner)",
      "✅ 5 subcategories (Wot, Tibs, Burger, Pizza...)",
      "✅ 5 items per subcategory (Cheese Burger, Doro Wot, Margarita Pizza)",
      "⚠️ Ad controlled by us — we display our ad on the menu",
    ],
  },
  {
    name: "Standard",
    monthly: "550 ETB / month",
    yearly: "5500 ETB / year",
    free: "2 months free",
    features: [
      "✅ 20 categories (Breakfast, Lunch, Dinner)",
      "✅ 20 subcategories (Wot, Tibs, Burger, Pizza...)",
      "✅ Unlimited items per subcategory",
      "⚠️ Ad controlled by you — you can update and display your own ads",
    ],
  },
  {
    name: "Premium",
    monthly: "35 USD / month",
    free: "2 months free",
    yearly: "350 USD / year",
    features: [
      "✅ 20 categories (Breakfast, Lunch, Dinner)",
      "✅ 40 subcategories (Chicken, Burger, Pizza...)",
      "✅ Unlimited items per subcategory",
      "⚠️ Ad controlled by you — you can update and display your own ads",
    ],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Choose Your Plan
        </h1>

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              onClick={() => setBillingCycle("monthly")}
              className={`py-2 px-4 text-sm font-medium rounded-r-none ${
                billingCycle === "monthly"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Monthly
            </Button>
            <Button
              onClick={() => setBillingCycle("yearly")}
              className={`py-2 px-4 text-sm font-medium rounded-l-none ${
                billingCycle === "yearly"
                  ? "bg-primary text-white"
                  : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-100"
              }`}
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between p-6 border-2 ${
                plan.name === "Premium"
                  ? "border-primary shadow-lg"
                  : "border-gray-200"
              } rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-4xl font-extrabold text-green-600 mb-1">
                  {billingCycle === "monthly"
                    ? plan.monthly
                    : plan.yearly || plan.monthly}
                </p>

                {plan.yearly && billingCycle === "monthly" && (
                  <p className="text-md text-gray-500">
                    {plan.yearly} (billed annually)
                    <br />
                    <small>{plan.free}</small>
                  </p>
                )}
              </CardHeader>
              <CardContent className="flex-grow py-4">
                <ul className="space-y-3 text-gray-700">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="mr-2 text-lg">
                        {feature.split(" ")[0]}
                      </span>
                      <span className="text-base">
                        {feature.substring(feature.indexOf(" ") + 1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Link
                  href={`${
                    links.register
                  }?period=${billingCycle.toLowerCase()}&plan=${plan.name.toLowerCase()}`}
                  className="w-full"
                >
                  <Button className="w-full bg-primary hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300">
                    Register Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
