import { z } from "zod";

/** Opening hours: Monday – Sunday, 7:00 AM – 10:30 PM. */
export const OPENING_TIME = "07:00";
export const CLOSING_TIME = "22:30";
export const MAX_PARTY_SIZE = 12;

export const PARTY_SIZES = Array.from({ length: MAX_PARTY_SIZE }, (_, i) => i + 1);

/** Local calendar date as YYYY-MM-DD. */
export function localISODate(d: Date = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function createReservationSchema(today: string) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your name")
      .max(80, "Name must be under 80 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email")
      .email("Please enter a valid email address")
      .max(255, "Email must be under 255 characters"),
    phone: z
      .string()
      .trim()
      .min(1, "Please enter a phone number")
      .max(20, "Phone number is too long")
      .regex(/^[+()\d\s.-]+$/, "Use digits, spaces, +, ( ) or -")
      .refine((v) => v.replace(/\D/g, "").length >= 7, "Please enter a valid phone number"),
    date: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a date")
      .refine((v) => v >= today, "Please choose today or a later date"),
    time: z
      .string()
      .regex(/^\d{2}:\d{2}$/, "Please choose a time")
      .refine(
        (v) => v >= OPENING_TIME && v <= CLOSING_TIME,
        "We're open 7:00 AM – 10:30 PM",
      ),
    partySize: z.coerce
      .number({ invalid_type_error: "Please choose a party size" })
      .int()
      .min(1, "Please choose a party size")
      .max(MAX_PARTY_SIZE, `Up to ${MAX_PARTY_SIZE} guests`),
    notes: z.string().trim().max(500, "Notes must be under 500 characters").optional(),
  });
}

export type ReservationInput = z.input<ReturnType<typeof createReservationSchema>>;
export type Reservation = z.output<ReturnType<typeof createReservationSchema>>;
