"use server";

import db from "@/db";
import { errors, success } from "@/lib/exporter";
import { hotel } from "@/lib/schema";
import { eq, SQLWrapper } from "drizzle-orm";
import { HotelType, ReturnType } from "../../type";

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
