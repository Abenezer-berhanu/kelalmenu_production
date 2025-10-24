"use server";

import { errors, success } from "@/lib/exporter";
import { MenuItemType, ReturnType } from "../../type";
import db from "@/db";

export const getMyMenus = async (hotelId: string): Promise<ReturnType> => {
  try {
    if (!hotelId) return { ...errors.somethingWentWrong, message: "" };
    const menus = await db.query.menu.findMany({
      where: (menu, { eq }) => eq(menu.hotel_id, hotelId),
    });
    return { ...success, data: menus as MenuItemType[] };
  } catch (error) {
    return errors.somethingWentWrong;
  }
};
