"use server";

import db from "@/db";
import { errors, success } from "@/lib/exporter";
import { hotel } from "@/lib/schema";
import { eq, SQLWrapper } from "drizzle-orm";
import { HotelType, ReturnType } from "../../type";
import { revalidatePath } from "next/cache";
import { uploadImage } from "@/lib/helpers";

export const getActiveHotelInfo = async (
  id: string | SQLWrapper
): Promise<ReturnType> => {
  try {
    if (!id) return { ...errors.somethingWentWrong, message: "" };
    const hotelInfo = (await db
      .select()
      .from(hotel)
      .where(eq(id as SQLWrapper, hotel.id))
      .limit(1)) as ReturnType["data"][];
    const latestHotelInfo = hotelInfo[0];
    return {
      ...success,
      data: { ...latestHotelInfo, password: "" } as HotelType,
    };
  } catch (err) {
    return errors.somethingWentWrong;
  }
};

export const updateHotelProfile = async (req: {
  pathname: string;
  id: string;
  data: Partial<HotelType>;
}) => {
  try {
    const { id, data } = req;
    if (!id || !data) return { ...errors.somethingWentWrong, message: "" };
    if (data.secondary_phones) {
      for (let i = 0; i < data.secondary_phones.length; i++) {
        const phn = data.secondary_phones[i];
        if (phn.length < 12) {
          return {
            ...errors.somethingWentWrong,
            message: "Secondary phones are not valid numbers",
          };
        }
      }
    }
    if (data.home_logo) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const uploadedImage = await uploadImage(data.home_logo.url as any);
      data.home_logo = {
        url: uploadedImage.url,
        image_id: uploadedImage.image_id,
      };
    }

    await db
      .update(hotel)
      .set({ ...data })
      .where(eq(hotel.id, id));
    revalidatePath(req.pathname);
    return { ...success, message: "Hotel profile updated successfully" };
  } catch (error) {
    return errors.somethingWentWrong;
  }
};
