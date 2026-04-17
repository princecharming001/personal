import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { BOOKING_OPTIONS, type BookingOptionId } from "@/lib/booking-config";
import { createCalendarEvent, slotIsAvailable } from "@/lib/google-calendar";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endpointSecret) {
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET." },
      { status: 500 }
    );
  }

  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Webhook verification failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const optionId = metadata.optionId as BookingOptionId | undefined;
    const slotStartIso = metadata.slotStartIso;
    const name = metadata.name;
    const email = metadata.email || session.customer_email || "";
    const phone = metadata.phone || "";
    const notes = metadata.notes || "";

    if (!optionId || !slotStartIso || !name || !email) {
      return NextResponse.json(
        { error: "Missing booking metadata." },
        { status: 400 }
      );
    }

    const option = BOOKING_OPTIONS[optionId];
    if (!option) {
      return NextResponse.json({ error: "Invalid optionId." }, { status: 400 });
    }

    const available = await slotIsAvailable(slotStartIso, option.durationMinutes);
    if (!available) {
      // Avoid repeated webhook retries; handle this edge case manually if needed.
      return NextResponse.json({ received: true, skipped: "slot_taken" });
    }

    await createCalendarEvent({
      startIso: slotStartIso,
      durationMinutes: option.durationMinutes,
      name,
      email,
      phone,
      notes,
      packageTitle: option.title,
    });
  }

  return NextResponse.json({ received: true });
}

