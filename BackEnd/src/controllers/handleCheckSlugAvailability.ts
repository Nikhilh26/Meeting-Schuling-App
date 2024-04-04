import { Context } from "hono";
import { db } from "..";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export async function handleCheckSlugAvailability(ctx: Context) {

    try {
        const { slug }: { slug: string } = await ctx.req.json();
        const checkSlugAvailability = await db.select().from(users).where(eq(users.slug, slug));
        console.log(checkSlugAvailability.length);
        if (checkSlugAvailability.length) {
            return ctx.json({
                'success': true,
                'available': false
            })
        } else {
            return ctx.json({
                'success': false,
                'available': true
            })
        }
    } catch (error) {
        return ctx.json({
            'success': false
        })
    }

}