import fs from "fs/promises";
import path from "path";
import bundledOverrides from "@/data/content-overrides.json";

type ContentOverrides = Record<string, string>;

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "content-overrides.json");

function isReadOnlyFsError(err: unknown) {
  if (!err || typeof err !== "object") return false;
  const code = (err as NodeJS.ErrnoException).code;
  return code === "EROFS" || code === "EACCES" || code === "EPERM";
}

async function ensureStoreWritable() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readStore(): Promise<ContentOverrides> {
  /* Prefer the live filesystem in environments where it exists (local dev,
   * VPS) so saves are visible immediately on reload. */
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as ContentOverrides;
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    /* fall through to bundled snapshot */
  }
  /* On serverless (Vercel) the file may not be in the function bundle. The
   * static import below is always inlined by the bundler regardless of the
   * tracer/Turbopack, so reads always return the snapshot baked at deploy. */
  return (bundledOverrides as ContentOverrides) ?? {};
}

async function writeStore(data: ContentOverrides) {
  try {
    await ensureStoreWritable();
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    if (isReadOnlyFsError(err)) {
      throw new Error(
        "Filesystem is read-only here (typical for Vercel serverless). " +
          "Run the editor from a writable host (local dev, VPS) and Publish to roll out, " +
          "or migrate to a remote store (Vercel Blob/KV).",
      );
    }
    throw err;
  }
}

export async function getOverrideForPath(pathname: string) {
  const normalized = normalizePathname(pathname);
  const data = await readStore();
  return data[normalized] ?? null;
}

export async function setOverrideForPath(pathname: string, html: string) {
  const normalized = normalizePathname(pathname);
  const data = await readStore();
  data[normalized] = html;
  await writeStore(data);
}

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  if (!pathname.startsWith("/")) return `/${pathname}`;
  return pathname;
}
