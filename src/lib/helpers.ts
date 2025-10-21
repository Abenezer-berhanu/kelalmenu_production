import db from "@/db";
import { hotel } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function isEmailRegistered(email: string): Promise<boolean> {
  if (!email) return false;
  const found = await db
    .select()
    .from(hotel)
    .where(eq(hotel.email, email))
    .limit(1);

  return !!found[0];
}

export async function isHomeNameRegistered(
  home_name: string
): Promise<boolean> {
  if (!home_name) return false;
  const found = await db
    .select()
    .from(hotel)
    .where(eq(hotel.home_name, home_name))
    .limit(1);
  return !!found[0];
}
