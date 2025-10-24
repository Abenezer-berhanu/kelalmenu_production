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
    <div className="flex flex-col items-center p-2">
      {/* profile picture and button to profile here */}
      <SmallInfo className="" info="👋 Welcome to your dashboard" />
      <BigInfo className="text-primary" info={hotel?.data?.home_name} />
      <BigInfo
        className="text-black text-sm"
        info={"+" + hotel?.data?.primary_phone + " - " + hotel?.data?.country}
      />

      <Avatar className="h-30 w-30 ring-2 ring-primary my-2">
        <AvatarImage
          src={
            hotel.data.home_logo ? hotel.data.home_logo.url : images.logo_url
          }
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Badge
        variant={"secondary"}
        className="bg-blue-500 text-white dark:bg-blue-600 my-2"
      >
        {hotel?.data?.plan !== "FREE" && <BadgeCheckIcon />}
        {hotel?.data?.plan}
      </Badge>
      <Link href={links.hotel_dashboard + `/${session.user.id}/profile`}>
        <Button variant="outline">Go to Profile</Button>
      </Link>
      {/* rest of dashboard components here */}
      <div className="flex flex-col items-start">
        <BigInfo className="mt-3" info={"Quick actions"} />
        <div className="flex flex-col gap-3 mt-2">
          <QuickActionCard
            title="Your Menus"
            description="Update - Create - See - Delete you menu items"
            link={links.hotel_dashboard + `/${session.user.id}/my-menu`}
          />

          <QuickActionCard
            title="My Qr Code"
            description="Generate and get your Qr code for your menus"
            link={links.hotel_dashboard + `/${session.user.id}/qr-code`}
          />

          <QuickActionCard
            title="Ads/notices"
            description="Manage your on-menu promotion"
            link={links.hotel_dashboard + `/${session.user.id}/my-ads`}
          />

          {hotel.data?.plan?.toUpperCase() === "FREE" && (
            <QuickActionCard
              title="Upgrade plan"
              description="Upgrade your plan to unlock more features"
              link={links.hotel_dashboard + `/${session.user.id}/upgrade-plan`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
