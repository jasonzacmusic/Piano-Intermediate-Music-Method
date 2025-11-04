import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const courseBuilderFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
  signupFor: z.enum(["self", "child", "other"], {
    required_error: "Please select who you're signing up for",
  }),
  childAge: z.string().optional(),
  learningGoals: z.array(z.string()).min(1, "Select at least one learning goal"),
  preferredGenre: z.array(z.string()).min(1, "Select at least one genre"),
  musicBackground: z.enum(["complete_beginner", "some_lessons", "self_taught", "intermediate", "advanced"], {
    required_error: "Please select your music background",
  }),
  pianoExperience: z.enum(["none", "less_than_1", "1_to_3", "3_to_5", "5_plus"], {
    required_error: "Please select your piano experience",
  }),
  classInterests: z.array(z.string()).min(1, "Select at least one class type"),
  preferredCallTime: z.string().min(1, "Please select a preferred call time"),
  additionalNotes: z.string().optional(),
}).refine((data) => {
  if (data.signupFor === "child" && !data.childAge) {
    return false;
  }
  return true;
}, {
  message: "Please provide the child's age",
  path: ["childAge"],
});

export type CourseBuilderForm = z.infer<typeof courseBuilderFormSchema>;
