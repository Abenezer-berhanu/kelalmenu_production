import React from "react";
import { MenuItemType } from "../../../../../../../../type";
import Image from "next/image";
import { images, links } from "@/lib/exporter";
import BigInfo from "@/components/BigInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash } from "lucide-react";
import { SelectSeparator } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MenuDeletingForm from "./MenuDeletingForm";

function MenuCard({ menu, edit }: { menu: MenuItemType; edit?: boolean }) {
  return (
    <div className="overflow-hidden relative">
      <div>
        <Image
          src={menu.image?.url || images.food_image}
          alt={menu.name}
          width={100}
          height={100}
          className="rounded-lg w-full max-w-32"
        />
      </div>
      <div>
        <span className="flex gap-1 justify-between items-center">
          <h1 className="font-bold text-primary line-clamp-1">{menu.name}</h1>
          <h3 className="text-yellow-500 text-xs font-semibold">
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
        <div className="fle gap-2 border absolute top-1 right-1">
          <Link
            href={
              links.hotel_dashboard + `/${menu.hotel_id}/my-menu/${menu.id}`
            }
          >
            <Button
              size={"sm"}
              variant={"ghost"}
              className="p-0 text-primary bg-white"
            >
              <Edit />
            </Button>
          </Link>

          <SelectSeparator />

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button
                  size={"sm"}
                  variant={"ghost"}
                  className="p-0 text-destructive bg-white"
                >
                  <Trash />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete this {menu.name} Item</DialogTitle>
                  <DialogDescription>
                    Deleting this menu item will not be reversible. Please
                    confirm you want to delete this item. you can update the
                    menu rather you delete it.
                  </DialogDescription>
                </DialogHeader>
                <MenuDeletingForm menuId={menu.id} />
              </DialogContent>
            </form>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default MenuCard;
