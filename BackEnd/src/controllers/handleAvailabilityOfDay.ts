import { Context } from "hono";
import { db } from "..";
import { userAvailability, userBookedSlots, userWeeklyAvailability, users } from "../db/schema";
import { and, eq } from "drizzle-orm";

function generateIntervals(startTime: any, endTime: any, intervalMinutes = 30) {

    const intervals = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    const numIntervals = Math.floor((endTotalMinutes - startTotalMinutes) / intervalMinutes);

    for (let i = 0; i <= numIntervals; i++) {
        const currentStartMinutes = startTotalMinutes + i * intervalMinutes;
        const currentEndMinutes = currentStartMinutes + intervalMinutes;

        const formatTime = (totalMinutes: any) => {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        };

        intervals.push({
            start: formatTime(currentStartMinutes),
            end: formatTime(currentEndMinutes),
        });
    }

    return intervals;
}

function getNonIntersectingIntervals(intervals1: any, intervals2: any) {
    const nonIntersectingIntervals = [];

    for (const interval1 of intervals1) {
        let intersects = false;

        for (const interval2 of intervals2) {
            const start1 = new Date(`1970-01-01T${interval1.start}Z`);
            const end1 = new Date(`1970-01-01T${interval1.end}Z`);
            const start2 = new Date(`1970-01-01T${interval2.start}Z`);
            const end2 = new Date(`1970-01-01T${interval2.end}Z`);

            if (!(end1 <= start2 || start1 >= end2)) {
                intersects = true;
                break;
            }
        }

        if (!intersects) {
            nonIntersectingIntervals.push(interval1);
        }
    }

    return nonIntersectingIntervals;
}

export async function handleAvailabilityOfDay(ctx: Context) {
    try {
        const { slug, day, formattedDate }: { slug: string, day: any, formattedDate: string } = await ctx.req.json();

        const checkSpecificUserAvailability = await db.select().from(userAvailability).innerJoin(users, eq(users.userId, userAvailability.userId)).where(and(eq(userAvailability.date, formattedDate), eq(users.slug, slug)));
        let availabilityRange: Array<[string, string]> = [];

        if (checkSpecificUserAvailability.length === 0) {
            const userData = await db.select().from(users).innerJoin(userWeeklyAvailability, eq(userWeeklyAvailability.userId, users.userId)).where(and(eq(users.slug, slug), eq(day, userWeeklyAvailability.day)));

            userData.map((ele) => {

                if (ele.userWeeklyAvailability.availableFrom && ele.userWeeklyAvailability.availableTill)
                    availabilityRange.push([ele.userWeeklyAvailability.availableFrom, ele.userWeeklyAvailability.availableTill]);

            })
        } else {

            checkSpecificUserAvailability.map((ele) => {

                if (ele.userAvailability.startTime && ele.userAvailability.endTime)
                    availabilityRange.push([ele.userAvailability.startTime, ele.userAvailability.endTime]);

            })
        }

        let allIntervals: Array<{ start: string, end: string }> = [];

        availabilityRange.map((ele) => {
            allIntervals = [...allIntervals, ...generateIntervals(ele[0], ele[1])]
        })

        const bookedIntervalsDB = await db.select().from(users).innerJoin(userBookedSlots, eq(users.userId, userBookedSlots.userId)).where(and(eq(users.slug, slug), eq(userBookedSlots.bookedDate, formattedDate)))

        let bookedIntervals: any[] = []

        bookedIntervalsDB.forEach((tuple) => {
            bookedIntervals.push({ start: tuple.userBookedSlots.startTime, end: tuple.userBookedSlots.endTime })
        })

        const returnPayload = getNonIntersectingIntervals(allIntervals, bookedIntervals);

        return ctx.json({
            "success": true,
            returnPayload
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "something went wrong",
            "success": false
        })
    }
}