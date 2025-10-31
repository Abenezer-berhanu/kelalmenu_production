ALTER TYPE "public"."OrderStatus" ADD VALUE 'SERVED' BEFORE 'DELIVERED';--> statement-breakpoint
ALTER TYPE "public"."Plan" ADD VALUE 'STANDARD' BEFORE 'PREMIUM';--> statement-breakpoint
ALTER TABLE "Hotel" ADD COLUMN "is_qr_generated" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "Hotel" ADD COLUMN "qr_code" jsonb;