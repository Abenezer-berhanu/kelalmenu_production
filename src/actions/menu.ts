"use server";

import { errors, planLimits, success } from "@/lib/exporter";
import { MenuItemType, ReturnType } from "../../type";
import db from "@/db";
import { menu } from "@/lib/schema";
import { uploadImage } from "@/lib/helpers";

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

export const isSubCategoryAndLimitReached = async (
  hotelId: string,
  subCategory: string,
  subLimit: number,
  menuItemLimit: number,
  name: string
): Promise<{
  menuItemReached: boolean;
  subLimitReached: boolean;
  nameTaken: boolean;
}> => {
  try {
    const menus = await db.query.menu.findMany({
      where: (menu, { eq }) => eq(menu.hotel_id, hotelId),
      columns: {
        image: false,
        ingredients: false,
        price: false,
        is_new: false,
        is_recommended_by_hotel_for_customers: false,
        preparation_time: false,
        currency: false,
      },
    });
    const response = {
      menuItemReached: false,
      subLimitReached: false,
      nameTaken: false,
    };
    const allSubs = menus
      .map((menu) => menu.sub_category)
      .filter((sub) => sub && sub.trim() !== "");

    const uniqueSubCategories = Array.from(new Set(allSubs));
    if (!uniqueSubCategories.includes(subCategory)) {
      if (uniqueSubCategories.length >= subLimit) {
        response.subLimitReached = true;
      }
    }

    if (menus.length >= menuItemLimit) {
      response.menuItemReached = true;
    }

    if (menus.find((menu) => menu.name.toLowerCase() === name.toLowerCase())) {
      response.nameTaken = true;
    }

    return response;
  } catch (error) {
    return { menuItemReached: true, subLimitReached: true, nameTaken: true };
  }
};

export const createHotelMenu = async (
  payload: MenuItemType,
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE"
): Promise<ReturnType> => {
  try {
    if (!payload || !payload.hotel_id)
      return { ...errors.somethingWentWrong, message: "" };

    const canCreationProceed = await isSubCategoryAndLimitReached(
      payload.hotel_id,
      payload.sub_category,
      plan === "FREE"
        ? planLimits.free.subcategories
        : plan === "STANDARD"
        ? planLimits.standard.subcategories
        : plan === "PREMIUM"
        ? planLimits.premium.subcategories
        : planLimits.enterprise.subcategories,
      plan === "FREE"
        ? planLimits.free.total
        : plan === "STANDARD"
        ? planLimits.standard.total
        : plan === "PREMIUM"
        ? planLimits.premium.total
        : planLimits.enterprise.total,
      payload.name
    );

    if (canCreationProceed.menuItemReached) {
      return {
        ...errors.somethingWentWrong,
        message: `Menu item limit reached for your plan${
          plan === "FREE" ? " — Upgrade your plan" : ""
        }`,
      };
    }

    if (canCreationProceed.subLimitReached) {
      return {
        ...errors.somethingWentWrong,
        message: `sub-category item limit reached for your plan${
          plan === "FREE" ? " — Upgrade your plan" : ""
        }`,
      };
    }

    if (canCreationProceed.nameTaken) {
      return {
        ...errors.somethingWentWrong,
        message: `Menu item name is already taken. Please choose a different name.`,
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const image = payload.image?.url as any;

    const imageRes = await uploadImage(image as File);
    payload.image = { url: imageRes.url, image_id: imageRes.image_id };

    const newMenu = await db.insert(menu).values({ ...payload });
    return { ...success, data: newMenu as MenuItemType[] };
  } catch (error) {
    return errors.somethingWentWrong;
  }
};
