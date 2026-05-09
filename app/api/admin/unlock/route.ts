import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  getSessionCookieName,
  isValidUnlockCode,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { code?: string };
  const code = body.code?.trim() ?? "";

  if (!isValidUnlockCode(code)) {
    return NextResponse.json({ error: "Invalid code." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), createAdminSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return NextResponse.json({ ok: true });
}
