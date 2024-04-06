import { Context } from "hono";
import { publicKey } from "./handleUserRegistration";
import { userWeeklyAvailability, users } from "../db/schema";
import { db } from "..";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { and, eq } from "drizzle-orm";

export const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;
type DayOfWeek = typeof daysofWeek[number];
type Payload = {
    [Key in DayOfWeek]: [Array<[string, string]>, boolean];
};

// make sure to remove unavailable in frontend
export async function handleWeeklyScheduleUpdate(ctx: Context) {
    try {
        const { payload }: { payload: Payload } = await ctx.req.json();
        const token = ctx.req.header('Authorization')

        if (typeof (token) === "undefined")
            return ctx.json({
                "message": "Token not provided",
                "success": false
            })

        const isValidToken = await jwt.verify(token, publicKey, "RS256");

        const decodedToken = jwt.decode<{ payload: { sub: string } }, {}>(token)
        const userId = decodedToken.payload?.payload.sub;

        if (typeof (userId) === "undefined" || !isValidToken) {
            return ctx.json({
                "Message": "Invalid Token",
                "success": false
            })
        }

        console.log(payload);
        console.log(isValidToken);
        console.log(userId);

        let todaysDate = new Date().toISOString().split('T')[0];
        const keys: DayOfWeek[] = Object.keys(payload) as DayOfWeek[];

        const checkUserExistence = await db.select().from(users).where(eq(users.userId, userId))

        if (checkUserExistence.length === 0) {
            return ctx.json({
                "message": "User has logged in but has not entered credentials",
                "redirect": true,
                "success": false
            })
        }

        await Promise.all(keys.map(async (day: DayOfWeek) => {
            await db.delete(userWeeklyAvailability).where(and(eq(userWeeklyAvailability.userId, userId), eq(userWeeklyAvailability.day, day)))
        }))

        await Promise.all(keys.map(async (day: DayOfWeek) => {

            const eachDaysAvailability = payload[day][0].map(async (time) => {

                await db.insert(userWeeklyAvailability).values({
                    userId,
                    day,
                    availableFrom: time[0],
                    availableTill: time[1],
                    updatedAt: todaysDate
                })
            })

            await Promise.all(eachDaysAvailability);
        }))

        return ctx.json({
            "Message": "Successfully Updated Availability",
            "success": true
        })

    } catch (err) {
        console.log(err)
        return ctx.json({
            "Message": "Something Went Wrong ",
            "success": false
        })
    }
}
