"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HotelType } from "@/../type";

export default function ProfileSection({ hotel }: { hotel: HotelType }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <div className="text-sm text-gray-700">Name</div>
          <div className="text-base font-medium">{hotel.home_name}</div>
        </div>
      </CardContent>
    </Card>
  );
}
