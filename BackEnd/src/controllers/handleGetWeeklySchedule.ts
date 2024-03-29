import { Context } from "hono";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { publicKey } from "./handleUserRegistration";
import { users, userWeeklyAvailability } from "../db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

// const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export async function handleGetWeeklySchedule(ctx: Context) {

    try {
        const token = ctx.req.header('Authorization');

        if (typeof (token) === "undefined")
            return ctx.json({
                "message": "Token not present",
                "success": false
            })

        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;

        if (!isValidToken) {
            return ctx.json({
                "Message": "Invalid Token",
                "success": false
            })
        }


        const availabilityOfUserOnThatDay = await db.select().from(users).
            innerJoin(userWeeklyAvailability,
                eq(users.userId, userWeeklyAvailability.userId)).
            where(
                eq(
                    users.userId,
                    userId
                )
            )

        // console.log(availabilityOfUserOnThatDay);

        const respPayload: any = {
            'MON': [[], true],
            'TUE': [[], true],
            'WED': [[], true],
            'THU': [[], true],
            'FRI': [[], true],
            'SAT': [[], true],
            'SUN': [[], true],
        }

        availabilityOfUserOnThatDay.map((ele) => {
            //@ts-ignore
            respPayload[ele.userWeeklyAvailability.day][0].push([ele.userWeeklyAvailability.availableFrom, ele.userWeeklyAvailability.availableTill]);
        })

        const keys = Object.keys(respPayload);

        keys.map((key) => {
            if (!respPayload[key][0].length) respPayload[key][1] = false;
        })
        console.log(respPayload);
        return ctx.json({
            "message": "Success",
            "success": true,
            respPayload
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }

}