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
  whatsappNumber: z.string().min(10, "WhatsApp number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  signupFor: z.enum(["myself", "child", "friend_family"], {
    required_error: "Please select who you're signing up for",
  }),
  learningGoals: z.array(z.string()).min(1, "Select at least one learning goal"),
  preferredGenre: z.array(z.string()).min(1, "Select at least one genre"),
  musicBackground: z.enum(["beginner_intermediate", "seasoned_musician", "music_producer", "music_educator"], {
    required_error: "Please select your music background",
  }),
  pianoExperience: z.array(z.string()).min(1, "Select at least one option"),
  pianoExperienceOther: z.string().optional(),
  classInterests: z.array(z.string()).min(1, "Select at least one class type"),
  preferredCallTime: z.string().min(5, "Please provide a preferred call time"),
});

export type CourseBuilderForm = z.infer<typeof courseBuilderFormSchema>;
