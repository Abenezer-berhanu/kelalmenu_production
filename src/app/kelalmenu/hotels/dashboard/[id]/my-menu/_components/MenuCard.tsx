import React from "react";
import { MenuItemType } from "../../../../../../../../type";
import Image from "next/image";
import { images, links } from "@/lib/exporter";
import BigInfo from "@/components/BigInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MenuCard({ menu, edit }: { menu: MenuItemType; edit?: boolean }) {
  return (
    <div className="overflow-hidden">
      <div>
        <Image
          src={menu.image?.url || images.food_image}
          alt={menu.name}
          width={200}
          height={200}
          className="rounded-lg w-full"
        />
      </div>
      <div>
        <span className="flex gap-1 justify-between items-center">
          <h1 className="font-bold text-primary line-clamp-1">{menu.name}</h1>
          <h3 className="text-yellow-500 text-sm font-semibold">
            {menu.category}
          </h3>
        </span>
        <span className="flex gap-1">
          <BigInfo info={String(menu.price)} />
          <h4>{menu.currency}</h4>
        </span>
        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {menu.ingredients.map((ingredient, index) => (
            <Badge variant={"outline"} key={index}>
              {ingredient}
            </Badge>
          ))}
        </div>
      </div>
      {edit && (
        <Link
          href={links.hotel_dashboard + `/${menu.hotel_id}/my-menu/${menu.id}`}
        >
          <Button size={"sm"}>Edit</Button>
        </Link>
      )}
    </div>
  );
}

export default MenuCard;
