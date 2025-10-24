"use client";
import { useState } from "react";
import { links, planLimits } from "@/lib/exporter";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

// Updated structured plan list
const PLANS = [
  {
    name: "FREE",
    displayName: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    currency: "ETB",
    freeMonths: 0,
    limits: {
      categories: planLimits.free.categories,
      subcategories: planLimits.free.subcategories,
      itemsPerSubcategory: planLimits.free.itemsPerSubcategory,
      adsControlledBy: "SYSTEM",
    },
    features: [
      "✅ 3 categories (Breakfast, Lunch, Dinner)",
      "✅ 5 subcategories (Wot, Tibs, Burger, Pizza...)",
      "✅ 5 items per subcategory (Cheese Burger, Doro Wot, Margarita Pizza)",
      "⚠️ Ad controlled by us — we display our ad on the menu",
    ],
  },
  {
    name: "STANDARD",
    displayName: "Standard",
    monthlyPrice: 550,
    yearlyPrice: 5500,
    currency: "ETB",
    freeMonths: 2,
    limits: {
      categories: planLimits.standard.categories,
      subcategories: planLimits.standard.subcategories,
      itemsPerSubcategory: planLimits.standard.itemsPerSubcategory,
      adsControlledBy: "SELF",
    },
    features: [
      "✅ Unlimited categories (Breakfast, Lunch, Dinner)",
      "✅ 20 subcategories (Wot, Tibs, Burger, Pizza...)",
      "✅ Unlimited items per subcategory",
      "⚠️ Ad controlled by you — you can update and display your own ads",
    ],
  },
  {
    name: "PREMIUM",
    displayName: "Premium",
    monthlyPrice: 35,
    yearlyPrice: 350,
    currency: "USD",
    freeMonths: 2,
    limits: {
      categories: planLimits.premium.categories,
      subcategories: planLimits.premium.subcategories,
      itemsPerSubcategory: planLimits.premium.itemsPerSubcategory,
      adsControlledBy: "SELF",
    },
    features: [
      "✅ Unlimited categories (Breakfast, Lunch, Dinner)",
      "✅ 40 subcategories (Chicken, Burger, Pizza...)",
      "✅ Unlimited items per subcategory",
      "⚠️ Ad controlled by you — you can update and display your own ads",
    ],
  },
  {
    name: "ENTERPRISE",
    displayName: "Enterprise",
    monthlyPrice: 200,
    yearlyPrice: 2000,
    currency: "USD",
    freeMonths: 2,
    limits: {
      categories: planLimits.enterprise.categories,
      subcategories: planLimits.enterprise.subcategories,
      itemsPerSubcategory: planLimits.enterprise.itemsPerSubcategory,
      adsControlledBy: "SELF",
    },
    features: [
      "✅ Unlimited categories (Breakfast, Lunch, Dinner)",
      "✅ Unlimited subcategories (Chicken, Burger, Pizza...)",
      "✅ Unlimited items per subcategory",
      "⚠️ Ad controlled by you — you can update and display your own ads",
    ],
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatPrice = (plan: any) => {
    if (billingCycle === "monthly") {
      return plan.monthlyPrice === 0
        ? "Free"
        : `${plan.monthlyPrice} ${plan.currency} / month`;
    } else {
      return plan.yearlyPrice === 0
        ? "Free"
        : `${plan.yearlyPrice} ${plan.currency} / year`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Choose Your Plan
        </h1>

        {/* Billing cycle switcher */}
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

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col justify-between p-6 border-2 ${
                plan.name === "PREMIUM"
                  ? "border-primary shadow-lg"
                  : "border-gray-200"
              } rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300`}
            >
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {plan.displayName}
                </CardTitle>
                <p className="text-4xl font-extrabold text-green-600 mb-1">
                  {formatPrice(plan)}
                </p>

                {plan.freeMonths > 0 && (
                  <p className="text-md text-gray-500">
                    {plan.yearlyPrice
                      ? `${plan.yearlyPrice} ${plan.currency} (billed annually)`
                      : ""}
                    <br />
                    <small>{plan.freeMonths} months free</small>
                  </p>
                )}
              </CardHeader>

              <CardContent className="flex-grow py-4">
                <ul className="space-y-3 text-gray-700">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
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
