import { getActiveHotelInfo } from "@/actions/hotel";
import BigInfo from "@/components/BigInfo";
import { auth } from "@/lib/auth";
import React from "react";
import MenuForm from "./_components/MenuForm";

async function page() {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Not Authorized</div>;
  }

  const hotel = await getActiveHotelInfo(session.user.id);

  if (hotel.error || !hotel.data) {
    return <div>Hotel data not found</div>;
  }

  return (
    <div>
      <BigInfo info="Create Your Menu here" />
      <MenuForm plan={hotel.data.plan} />
    </div>
  );
}

export default page;
