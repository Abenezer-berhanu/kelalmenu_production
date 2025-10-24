import BigInfo from "@/components/BigInfo";
import DashboardButton from "@/components/DashboardButton";
import Spinner from "@/components/Spinner";
import React, { Suspense } from "react";
import MenuCardWrapper from "./_components/MenuCardWrapper";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <div className="flex flex-col gap-2">
        <DashboardButton id={id} />
        <BigInfo
          info="Welcome to your menu dashboard"
          className="text-primary text-start"
        />
      </div>
      <p className="py-3 font-bold">Your menus</p>
      <Suspense fallback={<Spinner />}>
        <MenuCardWrapper hotelId={id} />
      </Suspense>
    </div>
  );
}

export default page;
