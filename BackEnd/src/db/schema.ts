import { pgTable, text, date, time, serial, unique } from "drizzle-orm/pg-core";

// This db is only for checking wether exists in the db or not
export const users = pgTable("users", {
    email: text("email").primaryKey(),
    slug: text("slug").unique(),
    userId: text("userId").unique(),
    userName: text("userName"),
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
    id: serial("id").primaryKey(),
    day: text("day").notNull(),
    availableFrom: time("availableFrom"),
    availableTill: time("availableTill"),
    userId: text("userId").references(() => users.userId),
    updatedAt: date("updatedAt").default("now()"),
    createdAt: date("createdAt").default("now()")
})

// this db only stores slots that are used
export const userBookedSlots = pgTable('userBookedSlots', {
    userId: text('userId').references(() => users.userId),
    clientEmailId: text('clientEmailId'),
    bookedFrom: time('bookedFrom').notNull(),
    bookedTill: time('bookedTill').notNull(),
    bookedDate: date('bookedDate').notNull(),
    eventDescription: text("eventDescription"),
    eventType: text("eventType"),
    eventId: serial('eventId').primaryKey(),
})