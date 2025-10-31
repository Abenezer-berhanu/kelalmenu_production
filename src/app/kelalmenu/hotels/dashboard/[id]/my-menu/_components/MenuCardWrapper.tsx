import React from "react";
import { MenuItemType } from "../../../../../../../../type";
import MenuCard from "./MenuCard";
import Link from "next/link";
import { links } from "@/lib/exporter";
import { Button } from "@/components/ui/button";
import { getMyMenus } from "@/actions/menu";

async function MenuCardWrapper({ hotelId }: { hotelId: string }) {
  const hotelMenus = await getMyMenus(hotelId);
  const menus = (hotelMenus.data as MenuItemType[]) || [];

  return (
    <div>
      {menus.length === 0 ? (
        <div className="flex items-center justify-center flex-col gap-2 h-[400px]">
          <div className="text-lg text-gray-800 font-bold">No menus found.</div>
          <Link href={`${links.hotel_dashboard}/${hotelId}/my-menu/new-menu`}>
            <Button variant={"outline"} size={"sm"}>
              Create New menu Food
            </Button>
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3">
          {menus.map((menu: MenuItemType) => (
            <MenuCard edit={true} key={menu.id} menu={menu} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MenuCardWrapper;
