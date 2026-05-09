import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

const execAsync = promisify(exec);

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const publishCommand = process.env.ADMIN_PUBLISH_COMMAND;
  if (!publishCommand) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "ADMIN_PUBLISH_COMMAND is not configured. Add a deploy command in your environment.",
      },
      { status: 400 },
    );
  }

  try {
    const { stdout, stderr } = await execAsync(publishCommand, {
      cwd: process.cwd(),
      timeout: 1000 * 60 * 3,
      maxBuffer: 1024 * 1024 * 5,
    });
    return NextResponse.json({
      ok: true,
      stdout: stdout.slice(-4000),
      stderr: stderr.slice(-4000),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Publish failed.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
