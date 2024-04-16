import { Context } from "hono";
import { db } from "..";
import { userAvailability, userBookedSlots, userWeeklyAvailability, users } from "../db/schema";
import { and, eq } from "drizzle-orm";

// meeting duration is 30 mins hardcoded for now will definetly work on it
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
        const { userId, day, formattedDate }: { userId: string, day: any, formattedDate: string } = await ctx.req.json();

        // This query checks whether there is an over-ridden availability or not 
        const checkSpecificUserAvailability = await db.select().from(userAvailability).innerJoin(users, eq(users.userId, userAvailability.userId)).where(and(eq(userAvailability.date, formattedDate), eq(users.userId, userId)));

        let availabilityRange: Array<[string, string]> = [];
        // console.log(checkSpecificUserAvailability);
        console.log(userId)
        if (checkSpecificUserAvailability.length === 0) {
            // If the availability is not over-ridden we can use Weekly availability set by user
            const userData = await db.select().from(users).innerJoin(userWeeklyAvailability, eq(userWeeklyAvailability.userId, users.userId)).where(and(eq(users.userId, userId), eq(day, userWeeklyAvailability.day)));
            // this is done to get all weekly availabilities defined and we can apply interval intersection algo 
            userData.map((ele) => {

                if (ele.userWeeklyAvailability.availableFrom && ele.userWeeklyAvailability.availableTill)
                    availabilityRange.push([ele.userWeeklyAvailability.availableFrom, ele.userWeeklyAvailability.availableTill]);

            })
        } else {
            // this is done to get all overriden weekly availabilities defined and we can apply interval intersection algo 
            checkSpecificUserAvailability.map((ele) => {

                if (ele.userAvailability.startTime && ele.userAvailability.endTime)
                    availabilityRange.push([ele.userAvailability.startTime, ele.userAvailability.endTime]);

            })
        }

        let allIntervals: Array<{ start: string, end: string }> = [];

        availabilityRange.map((ele) => {
            allIntervals = [...allIntervals, ...generateIntervals(ele[0], ele[1])]
        })
        // all the booked intervals on that day are fetched
        const bookedIntervalsDB = await db.select().from(users).innerJoin(userBookedSlots, eq(users.userId, userBookedSlots.userId)).where(and(eq(users.userId, userId), eq(userBookedSlots.bookedDate, formattedDate)))
        console.log(bookedIntervalsDB);
        console.log(allIntervals)
        let bookedIntervals: any[] = []
        // all those are arranged in {start,end} format
        bookedIntervalsDB.forEach((tuple) => {
            bookedIntervals.push({ start: tuple.userBookedSlots.bookedFrom, end: tuple.userBookedSlots.bookedTill })
        })

        // intersection detection algorithm is used to generate all available spots
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