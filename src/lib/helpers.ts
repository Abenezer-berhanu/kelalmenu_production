"use server";
import db from "@/db";
import { hotel, lower } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { HotelType } from "../../type";
import imagekit from "./imageKit";
import { constants } from "./exporter";

export async function isEmailRegistered(email: string) {
  const found = await db
    .select()
    .from(hotel)
    .where(eq(hotel.email, email))
    .limit(1);

  return { data: found[0] as HotelType | undefined, success: !!found[0] };
}

export async function isHomeNameRegistered(home_name: string) {
  const name = home_name.toLowerCase();
  const found = await db
    .select()
    .from(hotel)
    .where(eq(lower(hotel.home_name), name))
    .limit(1);
  return { data: found[0] as HotelType | undefined, success: !!found[0] };
}

export async function isPhoneRegistered(phone: string) {
  const found = await db
    .select()
    .from(hotel)
    .where(eq(hotel.primary_phone, phone))
    .limit(1);
  return { data: found[0] as HotelType | undefined, success: !!found[0] };
}

export async function uploadImage(
  file: File | string,
  isBase64 = false
): Promise<{ url: string; image_id: string }> {
  let uploadFile: Buffer | string;
  let fileName: string;

  if (isBase64) {
    // if it's base64, we use the string directly
    uploadFile = file as string;
    fileName = `base64_${Date.now()}${constants.name}`;
  } else {
    // if it's a File, convert it into buffer
    const arrayBuffer = await (file as File).arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    uploadFile = buffer;
    fileName = (file as File).name + constants.name;
  }

  const response = await imagekit.upload({
    file: uploadFile,
    fileName,
  });

  return { url: response.url, image_id: response.fileId };
}
