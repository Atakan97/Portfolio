import { z } from "zod";

// ---------------------------------------------------------------------------
// Field length limits — shared between API route (server) and form (client).
// ---------------------------------------------------------------------------

export const MAX_LENGTHS = {
  name: 100,
  email: 254, // RFC 5321 maximum
  subject: 200,
  message: 5000,
} as const;

// ---------------------------------------------------------------------------
// Zod schema — single source of truth for validation rules.
// Used on the server (route.ts) to validate the POST body.
// ---------------------------------------------------------------------------

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .max(MAX_LENGTHS.name, `Name must be ${MAX_LENGTHS.name} characters or fewer.`),

  email: z
    .string()
    .trim()
    .email("Please provide a valid email address.")
    .max(MAX_LENGTHS.email, "Email address is too long."),

  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(MAX_LENGTHS.subject, `Subject must be ${MAX_LENGTHS.subject} characters or fewer.`),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(MAX_LENGTHS.message, `Message must be ${MAX_LENGTHS.message} characters or fewer.`),

  // Honeypot — must be empty. Bots typically fill every field they detect.
  honeypot: z.string().max(0, "Bot detected."),
});

export type ContactPayload = z.infer<typeof contactSchema>;
