import { pgTable, text, date, time, serial } from "drizzle-orm/pg-core";

// This db is only for checking wether exists in the db or not
export const users = pgTable("users", {
    email: text("email").primaryKey(),
    slug: text("slug").unique(),
    userId: text("userId").unique(),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
});

// changes added in OverRide availability 
export const userAvailability = pgTable("userAvailability", {
    index: serial("id").primaryKey(),
    date: date("date").notNull(),
    startTime: time("startTime"),
    endTime: time("endTime"),
    status: text("status").default("available"),
    userId: text("userId").references(() => users.userId),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
});

// changes or availability defined in availability pages
export const userWeeklyAvailability = pgTable("userWeeklyAvailability", {
    index: serial("id").primaryKey(),
    day: text("day").notNull(),
    from: date("from"),
    till: date("till"),
    userId: text("userId").references(() => users.userId),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()"),
})

// this db only stores slots that are used
export const userBookedSlots = pgTable('userBookedSlots', {
    userId: text('email').references(() => users.userId),
    clientEmailId: text('clientEmailId').notNull(),
    startTime: time('bookedFrom').notNull(),
    endTime: time('bookedTill').notNull(),
    bookedDate: date('bookedDate').notNull(),
    eventId: serial('eventId').primaryKey(),
})