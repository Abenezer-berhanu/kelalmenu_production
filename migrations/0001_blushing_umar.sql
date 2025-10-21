ALTER TABLE "Hotel" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_home_name_unique" UNIQUE("home_name");--> statement-breakpoint
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_primary_phone_unique" UNIQUE("primary_phone");--> statement-breakpoint
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_email_unique" UNIQUE("email");