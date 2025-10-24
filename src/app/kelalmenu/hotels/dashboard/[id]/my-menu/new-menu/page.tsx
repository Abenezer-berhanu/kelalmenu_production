import { getActiveHotelInfo } from "@/actions/hotel";
import BigInfo from "@/components/BigInfo";
import { auth } from "@/lib/auth";
import React from "react";
import MenuForm from "./_components/MenuForm";
import { basic_info } from "@/lib/exporter";

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
      {hotel.data.status === "APPROVED" ? (
        <MenuForm plan={hotel.data.plan} id={hotel.data.id} />
      ) : (
        <div className="p-3 my-2 border rounded-lg shadow-sm">
          Your hotel is not active. Please contact support. {basic_info.phone}
        </div>
      )}
    </div>
  );
}

export default page;
