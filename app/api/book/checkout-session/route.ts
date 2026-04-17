import { NextRequest, NextResponse } from "next/server";
import { BOOKING_OPTIONS, type BookingOptionId } from "@/lib/booking-config";
import { slotIsAvailable } from "@/lib/google-calendar";
import { getStripe } from "@/lib/stripe";

type Payload = {
  optionId: BookingOptionId;
  slotStartIso: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Payload;
    const option = BOOKING_OPTIONS[body.optionId];
    if (!option) {
      return NextResponse.json({ error: "Invalid booking option." }, { status: 400 });
    }
    if (!body.slotStartIso || !body.name || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const available = await slotIsAvailable(body.slotStartIso, option.durationMinutes);
    if (!available) {
      return NextResponse.json(
        { error: "That slot was just taken. Please choose another." },
        { status: 409 }
      );
    }

    const stripe = getStripe();
    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;
    if (!origin) {
      return NextResponse.json(
        { error: "Missing site origin. Set NEXT_PUBLIC_SITE_URL." },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/book?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/book`,
      customer_email: body.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: option.priceCents,
            product_data: {
              name: option.title,
              description: option.description,
            },
          },
        },
      ],
      metadata: {
        optionId: body.optionId,
        slotStartIso: body.slotStartIso,
        name: body.name,
        email: body.email,
        phone: body.phone || "",
        notes: body.notes || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create checkout session.", details: message },
      { status: 500 }
    );
  }
}

