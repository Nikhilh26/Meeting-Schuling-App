ALTER TABLE "userWeeklyAvailability" ADD COLUMN "day" text NOT NULL;--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" ADD COLUMN "from" date;--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" ADD COLUMN "till" date;--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "MONfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "MONtill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "TUEfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "TUEtill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "WEDfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "WEDtill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "THUfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "THUtill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "FRIfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "FRItill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "SATfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "SATtill";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "SUNfrom";--> statement-breakpoint
ALTER TABLE "userWeeklyAvailability" DROP COLUMN IF EXISTS "SUNtill";