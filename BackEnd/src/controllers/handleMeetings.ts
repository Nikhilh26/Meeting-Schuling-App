import { Context } from "hono";
import { db } from "..";
import { userBookedSlots, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { publicKey } from "./handleUserRegistration";
import jwt from '@tsndr/cloudflare-worker-jwt'

type fetchedResponses = {
    userId: string | null;
    clientEmailId: string | null;
    bookedFrom: string;
    bookedTill: string;
    bookedDate: string;
    eventDescription: string | null;
    eventType: string | null;
    eventId: number;
}[]

export async function handleGetUserMeetings(ctx: Context) {
    const token = ctx.req.header('Authorization');

    if (typeof (token) === "undefined") {
        ctx.status(401);
        return ctx.json({
            "message": "Token not provided",
            "success": false
        })
    }

    const isValidToken = await jwt.verify(token, publicKey, "RS256");
    const decodedToken = jwt.decode<{ payload: { sub: string } }, {}>(token)

    const userId: string | undefined = decodedToken.payload?.sub;

    if (typeof (userId) === "undefined" || !isValidToken) {
        ctx.status(401);
        return ctx.json({
            'message': 'userId not present or Invalid token',
            'success': false
        });
    }
    console.log(userId)
    const fetchedResponses = await db.select().from(userBookedSlots).where(eq(userBookedSlots.userId, userId));

    let prevEvents: fetchedResponses = [];
    let upcomingEvents: fetchedResponses = [];

    fetchedResponses.map((ele) => {
        let recordDate = new Date(ele.bookedDate);
        let currDate = new Date();

        if (recordDate < currDate) {
            prevEvents.push(ele);
        } else {
            upcomingEvents.push(ele);
        }

    })

    ctx.status(200);

    return ctx.json({
        prevEvents,
        upcomingEvents,
        'success': true
    })
}