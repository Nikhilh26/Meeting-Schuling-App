import { Context } from "hono";
import { db } from "..";
import { userBookedSlots, users } from "../db/schema";
import { eq } from "drizzle-orm";
import { handleMailScheduling } from "./handleMailScheduling";

function getEndTime(time: string) {
    let temp = Number(time.split(':')[0]) * 3600 + Number(time.split(':')[1]) * 60 + 30 * 60;
    let hrs = Math.floor(temp / 3600);
    let mins = (temp % 3600) / 60;

    let finalhrs: string;
    let finalmins: string;
    if (hrs < 10) finalhrs = "0" + hrs.toString()
    else finalhrs = hrs.toString();

    if (mins < 10) finalmins = "0" + mins.toString()
    else finalmins = mins.toString()

    const endTime = finalhrs + ":" + finalmins + ":00";
    console.log(endTime);
    return endTime;
}

export async function handleSlotBooking(ctx: Context) {
    try {
        const { payload }:
            { payload: { date: string, startTime: string, clientEmailId: string, slug: string, eventDescription: string, eventType: string } }
            = await ctx.req.json();

        const emailId = await db.select().from(users).where(eq(users.slug, payload.slug));

        if (emailId.length === 0)
            return ctx.json({
                "message": "User does not exist",
                "success": false
            })

        const userId = emailId[0].userId;

        const endTime = getEndTime(payload.startTime);

        await db.insert(userBookedSlots).values({
            userId,
            bookedFrom: payload.startTime,
            bookedTill: endTime,
            clientEmailId: payload?.clientEmailId === undefined ? '' : payload?.clientEmailId,
            bookedDate: payload.date,
            eventDescription: payload.eventDescription,
            eventType: payload?.eventType === undefined ? 'Added By Owner' : payload?.clientEmailId
        })

        // await handleMailScheduling(emailId[0].email, payload.clientEmailId, payload.date, payload.startTime);

        return ctx.json({
            "message": "successful",
            "success": true
        })

    } catch (error) {
        console.log(error);

        return ctx.json({
            "message": "Something went wrong",
            "success": true
        })

    }
}