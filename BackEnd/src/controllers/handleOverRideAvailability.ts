import { Context } from "hono";
import { db } from "..";
import jwt from '@tsndr/cloudflare-worker-jwt'
import { publicKey } from "./handleUserRegistration";
import { userAvailability } from "../db/schema";
import { and, eq } from "drizzle-orm";

type PayloadSpecificAvailability = {
    availabilityTimeRange: Array<[string, string]>,
    date: string
}

export async function handleOverRideAvailability(ctx: Context) {
    try {
        const { token, payload }: { token: string, payload: PayloadSpecificAvailability } = await ctx.req.json();
        const isValidToken = await jwt.verify(token, publicKey, "RS256");
        const decodedToken: any = jwt.decode(token)
        const userId = decodedToken.payload.sub;

        if (!isValidToken)
            return ctx.json({
                "message": "Invalid Token",
                "success": true
            })

        await db.delete(userAvailability).where(and(eq(userAvailability.userId, userId), eq(userAvailability.date, payload.date)));

        await Promise.all(payload.availabilityTimeRange.map(async (ele) => {
            await db.insert(userAvailability).values({
                userId,
                date: payload.date,
                startTime: ele[0],
                endTime: ele[1]
            })
        }))

        return ctx.json({
            "message": "Changed availability successfully",
            "sucess": true
        })

    } catch (error) {
        console.log(error);
        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })
    }
}