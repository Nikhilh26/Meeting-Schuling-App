ALTER TABLE "userWeeklyAvailability" ADD CONSTRAINT "userWeeklyAvailability_userId_day_unique" UNIQUE("userId","day");