ALTER TABLE "userBookedSlots" ALTER COLUMN "clientEmailId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "userBookedSlots" ADD COLUMN "eventType" text;