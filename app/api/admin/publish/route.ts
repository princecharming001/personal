import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { getSessionCookieName, verifyAdminSessionToken } from "@/lib/admin-auth";

const execAsync = promisify(exec);

type Step = {
  name: string;
  ok: boolean;
  skipped?: boolean;
  stdout?: string;
  stderr?: string;
  error?: string;
};

async function runStep(name: string, cmd: string, cwd: string): Promise<Step> {
  try {
    const { stdout, stderr } = await execAsync(cmd, {
      cwd,
      timeout: 1000 * 60 * 3,
      maxBuffer: 1024 * 1024 * 5,
      env: { ...process.env },
    });
    return {
      name,
      ok: true,
      stdout: stdout.slice(-2000),
      stderr: stderr.slice(-2000),
    };
  } catch (error) {
    const e = error as Error & { stdout?: string; stderr?: string };
    return {
      name,
      ok: false,
      error: e.message,
      stdout: e.stdout?.slice(-2000),
      stderr: e.stderr?.slice(-2000),
    };
  }
}

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookieName())?.value;
  if (!verifyAdminSessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const cwd = process.cwd();
  const steps: Step[] = [];
  const skipGit = (process.env.ADMIN_PUBLISH_GIT_PUSH ?? "true").toLowerCase() === "false";

  let hasChanges = false;

  if (!skipGit) {
    const stage = await runStep(
      "git add",
      "git add -- data/content-overrides.json",
      cwd,
    );
    steps.push(stage);
    if (!stage.ok) {
      return NextResponse.json({ ok: false, steps }, { status: 500 });
    }

    const diff = await runStep(
      "git diff --cached",
      "git diff --cached --name-only -- data/content-overrides.json",
      cwd,
    );
    steps.push(diff);
    if (!diff.ok) {
      return NextResponse.json({ ok: false, steps }, { status: 500 });
    }
    hasChanges = (diff.stdout || "").trim().length > 0;

    if (hasChanges) {
      const ts = new Date().toISOString();
      const commitMsg = `publish: content snapshot ${ts}`;
      const commit = await runStep(
        "git commit",
        `git commit -m ${JSON.stringify(commitMsg)} -- data/content-overrides.json`,
        cwd,
      );
      steps.push(commit);
      if (!commit.ok) {
        return NextResponse.json({ ok: false, steps }, { status: 500 });
      }

      const push = await runStep("git push", "git push origin HEAD", cwd);
      steps.push(push);
      if (!push.ok) {
        return NextResponse.json({ ok: false, steps }, { status: 500 });
      }
    } else {
      steps.push({
        name: "git commit",
        ok: true,
        skipped: true,
        stdout: "No override changes to commit.",
      });
    }
  } else {
    steps.push({
      name: "git",
      ok: true,
      skipped: true,
      stdout: "Skipped (ADMIN_PUBLISH_GIT_PUSH=false). Saved overrides will not reach production unless committed manually.",
    });
  }

  const hookUrl = process.env.ADMIN_PUBLISH_WEBHOOK_URL?.trim();
  const publishCommand = process.env.ADMIN_PUBLISH_COMMAND?.trim();

  if (hookUrl) {
    try {
      const hookRes = await fetch(hookUrl, { method: "POST", cache: "no-store" });
      const text = await hookRes.text().catch(() => "");
      steps.push({
        name: "deploy hook",
        ok: hookRes.ok,
        stdout: text.slice(-2000),
        stderr: hookRes.ok ? undefined : `HTTP ${hookRes.status}`,
        error: hookRes.ok ? undefined : `Deploy hook returned ${hookRes.status}`,
      });
      if (!hookRes.ok) {
        return NextResponse.json({ ok: false, steps }, { status: 502 });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Deploy hook request failed.";
      steps.push({ name: "deploy hook", ok: false, error: message });
      return NextResponse.json({ ok: false, steps }, { status: 502 });
    }
  } else if (publishCommand) {
    const deploy = await runStep("deploy", publishCommand, cwd);
    steps.push(deploy);
    if (!deploy.ok) {
      return NextResponse.json({ ok: false, steps }, { status: 500 });
    }
  } else {
    steps.push({
      name: "deploy",
      ok: true,
      skipped: true,
      stdout:
        "No ADMIN_PUBLISH_WEBHOOK_URL/COMMAND configured. Relying on git-triggered deploy from your hosting provider.",
    });
  }

  return NextResponse.json({ ok: true, hasChanges, steps });
}
