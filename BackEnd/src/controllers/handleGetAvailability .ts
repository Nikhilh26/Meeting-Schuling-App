import { Context } from "hono";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { publicKey } from "./handleUserRegistration";
import { userAvailability, users, userWeeklyAvailability } from "../db/schema";
import { db } from "..";
import { eq } from "drizzle-orm";

export async function handleGetAvailability(ctx: Context) {

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

        // Weekly Availability
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

        const respPayload1: any = {
            'MON': [[], true],
            'TUE': [[], true],
            'WED': [[], true],
            'THU': [[], true],
            'FRI': [[], true],
            'SAT': [[], true],
            'SUN': [[], true],
        }

        availabilityOfUserOnThatDay.map((ele) => {
            respPayload1[ele.userWeeklyAvailability.day][0].push([ele.userWeeklyAvailability.availableFrom, ele.userWeeklyAvailability.availableTill]);
        })

        const keys = Object.keys(respPayload1);

        keys.map((key) => {
            if (!respPayload1[key][0].length) respPayload1[key][1] = false;
        })
        console.log(respPayload1);

        // User Availability
        const userOverRiddenAvailability = await db.select().from(userAvailability).innerJoin(users, eq(users.userId, userAvailability.userId)).where(eq(userId, users.userId));

        const respPayload2: any = {}
        userOverRiddenAvailability.forEach((ele) => {
            if (!(ele.userAvailability.date in respPayload2)) {
                respPayload2[ele.userAvailability.date] = [];
            }
            respPayload2[ele.userAvailability.date].push([ele.userAvailability.startTime, ele.userAvailability.endTime]);
        })

        return ctx.json({
            "message": "Success",
            "success": true,
            respPayload1,
            respPayload2
        })

    } catch (error) {

        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }

}

export async function handleGetUserNameAndSlug(ctx: Context) {
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
                'message': 'Token validation failed',
                'success': false
            })
        }

        const nameAndSlug = await db.select().from(users).where(eq(users.userId, userId));

        if (nameAndSlug.length === 0) {
            return ctx.json({
                'message': 'User not Found',
                'success': false,
                'redirect': true
            })
        } else {
            return ctx.json({
                'success': true,
                name: nameAndSlug[0].userName,
                slug: nameAndSlug[0].slug
            })
        }
    } catch (error) {
        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })
    }
}