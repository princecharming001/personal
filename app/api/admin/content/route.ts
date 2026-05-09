import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getOverrideForPath, setOverrideForPath } from "@/lib/content-store";

function isAuthed(token?: string) {
  return verifyAdminSessionToken(token);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get("path") ?? "/";
  const html = await getOverrideForPath(pathname);
  return NextResponse.json({ html });
}

export async function PUT(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    path?: string;
    html?: string;
  };
  const path = body.path?.trim() || "/";
  const html = body.html?.trim();

  if (!html) {
    return NextResponse.json({ error: "HTML is required." }, { status: 400 });
  }

  await setOverrideForPath(path, html);
  return NextResponse.json({ ok: true });
}
