import { jsonb, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./auth";

export const bookingsTable = pgTable("bookings", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => usersTable.id),
  service: jsonb("service").notNull(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  phone: varchar("phone").notNull(),
  date: varchar("date").notNull(),
  timeSlot: varchar("time_slot").notNull(),
  status: varchar("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const consultationsTable = pgTable("consultations", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").references(() => usersTable.id),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  need: text("need").notNull(),
  date: varchar("date").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Booking = typeof bookingsTable.$inferSelect;
export type InsertBooking = typeof bookingsTable.$inferInsert;
export type Consultation = typeof consultationsTable.$inferSelect;
export type InsertConsultation = typeof consultationsTable.$inferInsert;
