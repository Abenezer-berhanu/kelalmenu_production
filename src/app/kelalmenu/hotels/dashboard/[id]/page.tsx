import BigInfo from "@/components/BigInfo";
import SmallInfo from "@/components/SmallInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { images, links } from "@/lib/exporter";
import Link from "next/link";
import React from "react";
import QuickActionCard from "./_components/QuickActionCard";
import { getActiveHotelInfo } from "@/actions/hotel";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  const hotel = await getActiveHotelInfo(id);

  if (hotel.error || !hotel.data || !session?.user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-1 mt-10">Something went wrong</h1>
        <p className="mt-2">Please sign in to view your dashboard.</p>
        <a href={links.login} className="text-primary mt-2 inline-block">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background flex justify-center p-4">
      {/* Center container with responsive max width */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* LEFT — Profile & Info */}
        <div className="flex flex-col items-center md:items-start p-4 md:p-6 rounded-xl bg-card shadow-sm">
          <SmallInfo info="👋 Welcome to your dashboard" />
          <BigInfo className="text-primary" info={hotel.data.home_name} />
          <BigInfo
            className="text-black text-sm"
            info={"+" + hotel.data.primary_phone + " - " + hotel.data.country}
          />

          <Avatar className="h-32 w-32 ring-2 ring-primary my-4">
            <AvatarImage
              className="object-cover"
              src={
                hotel.data.home_logo
                  ? hotel.data.home_logo.url
                  : images.logo_url
              }
            />
            <AvatarFallback className="text-xs">Kelal Menu</AvatarFallback>
          </Avatar>

          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 mb-2"
          >
            {hotel.data.plan !== "FREE" && <BadgeCheckIcon className="mr-1" />}
            {hotel.data.plan}
          </Badge>

          <Link href={`${links.hotel_dashboard}/${session.user.id}/profile`}>
            <Button variant="outline" className="mt-2 w-full md:w-auto">
              Go to Profile
            </Button>
          </Link>
        </div>

        {/* RIGHT — Quick Actions */}
        <div className="flex flex-col items-start p-4 md:p-6 rounded-xl bg-card shadow-sm">
          <BigInfo className="mb-3" info="Quick Actions" />

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full">
            <QuickActionCard
              title="Your Menus"
              description="Update - Create - See - Delete your menu items"
              link={`${links.hotel_dashboard}/${session.user.id}/my-menu`}
            />

            <QuickActionCard
              title="My Qr Code"
              description="Generate and get your Qr code for your menus"
              link={`${links.hotel_dashboard}/${session.user.id}/qr-code`}
            />

            <QuickActionCard
              title="Ads / Notices"
              description="Manage your on-menu promotion"
              link={`${links.hotel_dashboard}/${session.user.id}/my-ads`}
            />

            {hotel.data.plan?.toUpperCase() === "FREE" && (
              <QuickActionCard
                title="Upgrade Plan"
                description="Unlock more features with a higher plan"
                link={`${links.hotel_dashboard}/${session.user.id}/upgrade-plan`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
