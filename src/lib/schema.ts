import { relations, SQL, sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  varchar,
  text,
  jsonb,
  boolean,
  integer,
  timestamp,
  pgEnum,
  AnyPgColumn,
} from "drizzle-orm/pg-core";

// ---------- Enums ----------
export const hotelStatus = pgEnum("HotelStatus", [
  "PENDING",
  "APPROVED",
  "SUSPENDED",
]);
export const plan = pgEnum("Plan", [
  "FREE",
  "STANDARD",
  "PREMIUM",
  "ENTERPRISE",
]);
export const adsControl = pgEnum("AdsControl", ["SELF", "SYSTEM"]);
export const orderStatus = pgEnum("OrderStatus", [
  "PREPARING",
  "READY",
  "SERVED",
  "DELIVERED",
  "CANCELLED",
]);
export const paymentStatus = pgEnum("PaymentStatus", [
  "PENDING",
  "PAID",
  "FAILED",
]);

// ---------- Tables ----------
export const hotel = pgTable("Hotel", {
  id: uuid("id").defaultRandom().primaryKey(),
  home_name: varchar("home_name", { length: 255 }).notNull().unique(),
  primary_phone: varchar("primary_phone", { length: 50 }).notNull().unique(),
  secondary_phones: text("secondary_phones").array().default([]),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  main_address: jsonb("main_address"),
  status: hotelStatus("status").default("PENDING"),
  plan: plan("plan").default("FREE"),
  currency: varchar("currency", { length: 50 }),
  subscription_start: timestamp("subscription_start"),
  subscription_end: timestamp("subscription_end"),
  plan_history: jsonb("plan_history"),
  home_logo: jsonb("home_logo"),
  offer_delivery: boolean("offer_delivery").default(false),
  ads_controlled_by: adsControl("ads_controlled_by").default("SELF"),
  period: varchar("period", { length: 50 }),
  created_at: timestamp("created_at").defaultNow(),
  reason: text("reason"),
  visit: integer("visit").default(0),
  country: varchar("country", { length: 100 }),
});

export const ad = pgTable("Ad", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotel_id: uuid("hotel_id")
    .notNull()
    .references(() => hotel.id),
  title: varchar("title", { length: 255 }).notNull(),
  image: jsonb("image"),
  link: varchar("link", { length: 255 }),
  description: text("description"),
});

export const menu = pgTable("Menu", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotel_id: uuid("hotel_id")
    .notNull()
    .references(() => hotel.id),
  image: jsonb("image"),
  name: varchar("name", { length: 255 }).notNull(),
  ingredients: text("ingredients").array().notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  sub_category: varchar("sub_category", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  is_new: boolean("is_new").default(false),
  is_recommended_by_hotel_for_customers: boolean(
    "is_recommended_by_hotel_for_customers"
  ).default(false),
  currency: varchar("currency", { length: 50 }).notNull(),
  preparation_time: jsonb("preparation_time"),
});

export const order = pgTable("Order", {
  id: uuid("id").defaultRandom().primaryKey(),
  hotel_id: uuid("hotel_id")
    .notNull()
    .references(() => hotel.id),
  items: jsonb("items"),
  total_price: integer("total_price").notNull(),
  currency: varchar("currency", { length: 50 }).notNull(),
  created_at: timestamp("created_at").defaultNow(),
  payment_status: paymentStatus("payment_status").default("PENDING"),
  order_status: orderStatus("order_status").default("PREPARING"),
  customer_info: jsonb("customer_info"),
});

export const admin = pgTable("Admin", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  otp_secret: varchar("otp_secret", { length: 255 }),
  otp_ends_at: timestamp("otp_ends_at"),
  is_superadmin: boolean("is_superadmin").default(false),
  is_terminated: boolean("is_terminated").default(false),
});

export const hotelRelations = relations(hotel, ({ many }) => ({
  ads: many(ad),
  menus: many(menu),
  orders: many(order),
}));

// Ad Relations
export const adRelations = relations(ad, ({ one }) => ({
  hotel: one(hotel, {
    fields: [ad.hotel_id],
    references: [hotel.id],
  }),
}));

// Menu Relations
export const menuRelations = relations(menu, ({ one }) => ({
  hotel: one(hotel, {
    fields: [menu.hotel_id],
    references: [hotel.id],
  }),
}));

// Order Relations
export const orderRelations = relations(order, ({ one }) => ({
  hotel: one(hotel, {
    fields: [order.hotel_id],
    references: [hotel.id],
  }),
}));

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}
