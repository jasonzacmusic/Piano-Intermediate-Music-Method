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

// Common disposable/fake email domains
const DISPOSABLE_EMAIL_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'mailinator.com',
  'maildrop.cc', 'throwaway.email', 'temp-mail.org', 'getnada.com',
  'trashmail.com', 'fakeinbox.com', 'yopmail.com', 'sharklasers.com',
  'spam4.me', 'mintemail.com', 'dispostable.com', 'mohmal.com',
  'example.com', 'test.com', 'fake.com', 'spam.com',
];

// Enhanced email validation
const emailSchema = z.string()
  .email("Invalid email address format")
  .refine((email) => {
    // Check for common fake patterns (emails that START with these patterns)
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.startsWith('test@') || lowerEmail.startsWith('fake@') || lowerEmail.startsWith('spam@')) {
      return false;
    }
    return true;
  }, { message: "Email address appears to be fake. Please use a real email address." })
  .refine((email) => {
    // Check against disposable email domains
    const domain = email.split('@')[1]?.toLowerCase();
    return !DISPOSABLE_EMAIL_DOMAINS.includes(domain);
  }, { message: "Disposable email addresses are not allowed. Please use a permanent email address." })
  .refine((email) => {
    // Basic format validation (must have proper structure)
    const parts = email.split('@');
    if (parts.length !== 2) return false;
    const [local, domain] = parts;
    if (local.length < 1 || domain.length < 3) return false;
    if (!domain.includes('.')) return false;
    const domainParts = domain.split('.');
    return domainParts.every(part => part.length > 0);
  }, { message: "Invalid email address. Please check the format." });

export const courseBuilderFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: emailSchema,
  whatsappNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits")
    .refine((num) => {
      // Additional check: number shouldn't be all same digits (like 1111111111)
      const allSame = num.split('').every(digit => digit === num[0]);
      return !allSame;
    }, { message: "Phone number appears to be invalid. Please enter a real phone number." })
    .refine((num) => {
      // Check for obvious fake patterns
      const sequential = '0123456789';
      const reverseSeq = '9876543210';
      return !sequential.includes(num) && !reverseSeq.includes(num);
    }, { message: "Phone number appears to be invalid. Please enter a real phone number." }),
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
