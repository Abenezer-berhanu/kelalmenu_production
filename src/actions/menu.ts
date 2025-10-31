"use server";

import { errors, planLimits, success } from "@/lib/exporter";
import { MenuItemType, ReturnType } from "../../type";
import db from "@/db";
import { menu } from "@/lib/schema";
import { uploadImage } from "@/lib/helpers";
import { eq } from "drizzle-orm";
import imagekit from "@/lib/imageKit";

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

export const deleteImage = async (imageId: string | undefined) => {
  if (!imageId) return;

  await imagekit.deleteFile(imageId);
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

export const getMenuById = async (menuId: string): Promise<ReturnType> => {
  try {
    const hotelMenu = await db.query.menu.findFirst({
      where: eq(menu.id, menuId),
    });
    if (!hotelMenu) {
      return { ...errors.somethingWentWrong, message: "menu not found" };
    }
    return { ...success, data: hotelMenu as MenuItemType };
  } catch (error) {
    return errors.somethingWentWrong;
  }
};

export const updateMenuItem = async (
  id: string,
  hotelId: string,
  plan: "FREE" | "STANDARD" | "PREMIUM" | "ENTERPRISE",
  data: Partial<MenuItemType>
): Promise<ReturnType> => {
  try {
    // Only check limits if subcategory or name is changing
    if (data.sub_category || data.name) {
      const canCreationProceed = await isSubCategoryAndLimitReached(
        hotelId,
        data.sub_category ?? "",
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
        data.name ?? ""
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
          message: `Sub-category item limit reached for your plan${
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
    }

    // Handle image update
    let imageRes = null;
    const prevImageId = data.image?.image_id;

    if (data.image?.url && typeof data.image.url !== "string") {
      imageRes = await uploadImage(data.image.url as File);
      data.image = { url: imageRes.url, image_id: imageRes.image_id };

      if (prevImageId) await deleteImage(prevImageId);
    }

    const updatedMenu = await db.update(menu).set(data).where(eq(menu.id, id));

    if (!updatedMenu) {
      return { ...errors.somethingWentWrong, message: "Menu not found" };
    }

    return { ...success, data: updatedMenu };
  } catch (error) {
    return errors.somethingWentWrong;
  }
};
