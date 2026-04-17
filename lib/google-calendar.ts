import { google } from "googleapis";
import {
  BOOKING_END_HOUR_LOCAL,
  BOOKING_START_HOUR_LOCAL,
  BOOKING_TIMEZONE,
  BOOKING_WINDOW_DAYS,
} from "@/lib/booking-config";

type BusyInterval = { start: Date; end: Date };

function normalizePrivateKey(raw: string | undefined) {
  if (!raw) return "";

  // Vercel/dashboard UIs sometimes wrap env values in quotes.
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }

  // Common formats:
  // - JSON-style: "-----BEGIN...\\n...\\n-----END..."
  // - Multiline pasted directly into Vercel (actual newlines)
  key = key.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n");
  key = key.replace(/\\n/g, "\n");

  // If someone accidentally doubled-escaped newlines in the env UI
  key = key.replace(/\n\n-----END/g, "\n-----END");

  return key.trim();
}

function getGoogleCalendarClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const privateKey = normalizePrivateKey(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);

  if (!email || !privateKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY."
    );
  }

  if (!privateKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY format (expected PEM with BEGIN PRIVATE KEY)."
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

function getCalendarId() {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) {
    throw new Error("Missing GOOGLE_CALENDAR_ID.");
  }
  return calendarId;
}

function getLocalParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour12: false,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
  const parts = formatter.formatToParts(date);
  const result: Record<string, string> = {};
  for (const part of parts) {
    result[part.type] = part.value;
  }
  return {
    weekday: result.weekday,
    hour: Number(result.hour),
    minute: Number(result.minute),
  };
}

function isBusinessSlotStart(date: Date, durationMinutes: number) {
  const { weekday, hour, minute } = getLocalParts(date, BOOKING_TIMEZONE);
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  if (!isWeekday) return false;
  if (minute !== 0 && minute !== 30) return false;

  const startMinute = hour * 60 + minute;
  const earliest = BOOKING_START_HOUR_LOCAL * 60;
  const latestStart = BOOKING_END_HOUR_LOCAL * 60 - durationMinutes;

  return startMinute >= earliest && startMinute <= latestStart;
}

function overlapsBusy(start: Date, end: Date, busy: BusyInterval[]) {
  return busy.some((interval) => start < interval.end && end > interval.start);
}

export async function listAvailableSlots(durationMinutes: number) {
  const calendar = getGoogleCalendarClient();
  const calendarId = getCalendarId();
  const now = new Date();
  const timeMin = now.toISOString();
  const end = new Date(now.getTime() + BOOKING_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const timeMax = end.toISOString();

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: BOOKING_TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busyRaw = freeBusy.data.calendars?.[calendarId]?.busy || [];
  const busy: BusyInterval[] = busyRaw
    .filter((b) => b.start && b.end)
    .map((b) => ({ start: new Date(b.start as string), end: new Date(b.end as string) }));

  const slots: { start: string; end: string }[] = [];
  const cursor = new Date(now.getTime());
  cursor.setUTCMinutes(Math.ceil(cursor.getUTCMinutes() / 30) * 30, 0, 0);

  while (cursor < end) {
    const slotStart = new Date(cursor.getTime());
    const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);
    if (isBusinessSlotStart(slotStart, durationMinutes) && !overlapsBusy(slotStart, slotEnd, busy)) {
      slots.push({
        start: slotStart.toISOString(),
        end: slotEnd.toISOString(),
      });
    }
    cursor.setUTCMinutes(cursor.getUTCMinutes() + 30);
  }

  return slots;
}

export async function slotIsAvailable(startIso: string, durationMinutes: number) {
  const calendar = getGoogleCalendarClient();
  const calendarId = getCalendarId();
  const start = new Date(startIso);
  const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      timeZone: BOOKING_TIMEZONE,
      items: [{ id: calendarId }],
    },
  });

  const busy = freeBusy.data.calendars?.[calendarId]?.busy || [];
  return busy.length === 0;
}

export async function createCalendarEvent(input: {
  startIso: string;
  durationMinutes: number;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  packageTitle: string;
}) {
  const calendar = getGoogleCalendarClient();
  const calendarId = getCalendarId();
  const start = new Date(input.startIso);
  const end = new Date(start.getTime() + input.durationMinutes * 60 * 1000);

  const description = [
    `Booked package: ${input.packageTitle}`,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.notes ? `Notes: ${input.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `${input.packageTitle} — 1:1 with Anish`,
      description,
      start: { dateTime: start.toISOString(), timeZone: BOOKING_TIMEZONE },
      end: { dateTime: end.toISOString(), timeZone: BOOKING_TIMEZONE },
      attendees: [{ email: input.email, displayName: input.name }],
    },
    sendUpdates: "all",
  });
}

