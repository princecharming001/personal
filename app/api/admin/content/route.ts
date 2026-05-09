import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";
import { getOverrideForPath, setOverrideForPath } from "@/lib/content-store";
import { sanitizePageSnapshotHtml } from "@/lib/sanitize-page-snapshot";

function isAuthed(token?: string) {
  return verifyAdminSessionToken(token);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pathname = searchParams.get("path") ?? "/";
  try {
    const html = await getOverrideForPath(pathname);
    return NextResponse.json({ html });
  } catch {
    /* Reading should never throw thanks to the store fallback, but be safe. */
    return NextResponse.json({ html: null });
  }
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

  try {
    await setOverrideForPath(path, sanitizePageSnapshotHtml(html));
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Save failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
