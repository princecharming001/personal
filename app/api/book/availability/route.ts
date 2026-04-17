import { NextRequest, NextResponse } from "next/server";
import { BOOKING_OPTIONS } from "@/lib/booking-config";
import { listAvailableSlots } from "@/lib/google-calendar";

export async function GET(request: NextRequest) {
  try {
    const durationParam = request.nextUrl.searchParams.get("duration");
    const option = durationParam && (BOOKING_OPTIONS as Record<string, { durationMinutes: number }>)[durationParam];
    if (!option) {
      return NextResponse.json(
        { error: "Invalid duration. Use 30 or 60." },
        { status: 400 }
      );
    }

    const slots = await listAvailableSlots(option.durationMinutes);
    return NextResponse.json({ slots });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to load availability.", details: message },
      { status: 500 }
    );
  }
}

