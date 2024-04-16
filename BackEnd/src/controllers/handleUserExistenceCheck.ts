import { Context } from "hono";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function handleUserExistenceCheck(ctx: Context) {
    try {
        const reqParams = new URLSearchParams(ctx.req.url.split('?')[1]);
        const slug = reqParams.get('slug');
        const usersExists = await db.select().from(users).where(eq(users.slug, slug as string));

        if (usersExists.length)
            return ctx.json({
                "message": "User Exists",
                "success": true,
                userId: usersExists[0].userId,
                name: usersExists[0].userName?.length === 0 ? usersExists[0].slug : usersExists[0].slug
            })

        return ctx.json({
            "message": "User doesn't Exists",
            "success": false
        })

    } catch (error) {

        return ctx.json({
            "message": "Something went wrong",
            "success": false
        })

    }
}