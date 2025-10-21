CREATE TYPE "public"."AdsControl" AS ENUM('SELF', 'SYSTEM');--> statement-breakpoint
CREATE TYPE "public"."HotelStatus" AS ENUM('PENDING', 'APPROVED', 'SUSPENDED');--> statement-breakpoint
CREATE TYPE "public"."OrderStatus" AS ENUM('PREPARING', 'READY', 'DELIVERED', 'CANCELLED');--> statement-breakpoint
CREATE TYPE "public"."PaymentStatus" AS ENUM('PENDING', 'PAID', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."Plan" AS ENUM('FREE', 'PREMIUM', 'ENTERPRISE');--> statement-breakpoint
CREATE TABLE "Ad" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"image" jsonb,
	"link" varchar(255),
	"description" text
);
--> statement-breakpoint
CREATE TABLE "Admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"otp_secret" varchar(255),
	"otp_ends_at" timestamp,
	"is_superadmin" boolean DEFAULT false,
	"is_terminated" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "Hotel" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"home_name" varchar(255) NOT NULL,
	"primary_phone" varchar(50) NOT NULL,
	"secondary_phones" text[] DEFAULT '{}',
	"email" varchar(255),
	"password" varchar(255) NOT NULL,
	"main_address" jsonb,
	"status" "HotelStatus" DEFAULT 'PENDING',
	"plan" "Plan" DEFAULT 'FREE',
	"currency" varchar(50),
	"subscription_start" timestamp,
	"subscription_end" timestamp,
	"plan_history" jsonb,
	"home_logo" jsonb,
	"offer_delivery" boolean DEFAULT false,
	"ads_controlled_by" "AdsControl" DEFAULT 'SELF',
	"period" varchar(50),
	"created_at" timestamp DEFAULT now(),
	"reason" text,
	"visit" integer DEFAULT 0,
	"country" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "Menu" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"image" jsonb,
	"name" varchar(255) NOT NULL,
	"ingredients" text[] NOT NULL,
	"category" varchar(100) NOT NULL,
	"sub_category" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"is_new" boolean DEFAULT false,
	"is_recommended_by_hotel_for_customers" boolean DEFAULT false,
	"currency" varchar(50) NOT NULL,
	"preparation_time" jsonb
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hotel_id" uuid NOT NULL,
	"items" jsonb,
	"total_price" integer NOT NULL,
	"currency" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"payment_status" "PaymentStatus" DEFAULT 'PENDING',
	"order_status" "OrderStatus" DEFAULT 'PREPARING',
	"customer_info" jsonb
);
--> statement-breakpoint
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_hotel_id_Hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."Hotel"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_hotel_id_Hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."Hotel"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_hotel_id_Hotel_id_fk" FOREIGN KEY ("hotel_id") REFERENCES "public"."Hotel"("id") ON DELETE no action ON UPDATE no action;