import { describe, expect, it } from "vitest";
import { createReservationSchema } from "@/lib/reservation";
import { SIGNATURE_DISHES, formatPrice } from "@/lib/site-data";

const TODAY = "2026-11-18";
const schema = createReservationSchema(TODAY);
const valid = {
  name: "Asha Rao",
  email: "asha@example.com",
  phone: "+1 (555) 123-4567",
  date: "2026-11-20",
  time: "19:30",
  partySize: "4",
};

describe("reservation rules", () => {
  it("accepts a complete booking", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  it("rejects times before the 7:00 AM opening", () => {
    expect(schema.safeParse({ ...valid, time: "06:45" }).success).toBe(false);
    expect(schema.safeParse({ ...valid, time: "07:00" }).success).toBe(true);
  });

  it("rejects times after the 10:30 PM close", () => {
    expect(schema.safeParse({ ...valid, time: "22:45" }).success).toBe(false);
    expect(schema.safeParse({ ...valid, time: "22:30" }).success).toBe(true);
  });

  it("rejects dates in the past", () => {
    expect(schema.safeParse({ ...valid, date: "2026-11-17" }).success).toBe(false);
    expect(schema.safeParse({ ...valid, date: TODAY }).success).toBe(true);
  });

  it("requires a valid email", () => {
    expect(schema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("requires a party size", () => {
    expect(schema.safeParse({ ...valid, partySize: "" }).success).toBe(false);
  });
});

describe("signature menu prices", () => {
  it("matches the supplied prices", () => {
    const prices = Object.fromEntries(SIGNATURE_DISHES.map((d) => [d.name, formatPrice(d.price)]));
    expect(prices).toEqual({
      "Benne Masala Dosa": "$9.50",
      "Chettinad Chicken Biryani": "$14.00",
      "Traditional Thali Meal": "$16.50",
      "Madras Filter Coffee": "$4.50",
    });
  });
});
