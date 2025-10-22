import db from "@/db";
import { hotel, lower } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { HotelType } from "../../type";

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
