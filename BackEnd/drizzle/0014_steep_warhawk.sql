ALTER TABLE "userBookedSlots" RENAME COLUMN "email" TO "userId";--> statement-breakpoint
ALTER TABLE "userBookedSlots" DROP CONSTRAINT "userBookedSlots_email_users_userId_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookedSlots" ADD CONSTRAINT "userBookedSlots_userId_users_userId_fk" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
