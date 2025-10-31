import { getMenuById } from "@/actions/menu";
import { getActiveHotelInfo } from "@/actions/hotel";
import React from "react";
import MenuUpdateForm from "./MenuUpdateForm";

async function MenuUpdateWrapper({
  menuId,
  hotelId,
}: {
  menuId: string;
  hotelId: string;
}) {
  if (!menuId) {
    return <div>Access Denied</div>;
  }

  const menu = await getMenuById(menuId);

  if (menu.error) {
    return <div className="text-2xl font-bold px-3">{menu.message}</div>;
  }
  const data = menu.data;
  const hotel = await getActiveHotelInfo(data.hotel_id);
  const plan = hotel?.data?.plan || "FREE";

  return (
    <div>
      <MenuUpdateForm
        initial={data}
        plan={plan}
        menuId={menuId}
        hotelId={hotelId}
      />
    </div>
  );
}

export default MenuUpdateWrapper;
