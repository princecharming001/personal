import fs from "fs/promises";
import path from "path";

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
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as ContentOverrides;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    /* On serverless cold-start the file may live in the read-only bundle and
     * the dir may not exist for writing. ENOENT here means "no overrides yet". */
    if (code === "ENOENT") return {};
    return {};
  }
}

async function writeStore(data: ContentOverrides) {
  try {
    await ensureStoreWritable();
    await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    if (isReadOnlyFsError(err)) {
      const message =
        "Filesystem is read-only here (typical for Vercel serverless). " +
        "Run the editor from a writable host (local dev, VPS) and Publish to roll out, " +
        "or add a remote store (e.g. Vercel Blob/KV).";
      throw new Error(message);
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
