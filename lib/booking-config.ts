export const BOOKING_OPTIONS = {
  "30": {
    durationMinutes: 30,
    priceCents: 15000,
    title: "30-Minute Growth Strategy Call",
    description:
      "A focused 1:1 to pinpoint your biggest growth bottleneck and set next steps.",
  },
  "60": {
    durationMinutes: 60,
    priceCents: 30000,
    title: "60-Minute Deep Dive Session",
    description:
      "A deeper 1:1 to pressure-test your strategy and build an execution plan.",
  },
} as const;

export type BookingOptionId = keyof typeof BOOKING_OPTIONS;

export const BOOKING_TIMEZONE =
  process.env.BOOKING_TIMEZONE || "America/Los_Angeles";

export const BOOKING_WINDOW_DAYS = Number(process.env.BOOKING_WINDOW_DAYS || 14);

export const BOOKING_START_HOUR_LOCAL = Number(
  process.env.BOOKING_START_HOUR_LOCAL || 9
);
export const BOOKING_END_HOUR_LOCAL = Number(
  process.env.BOOKING_END_HOUR_LOCAL || 18
);

