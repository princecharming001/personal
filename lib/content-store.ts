import fs from "fs/promises";
import path from "path";

type ContentOverrides = Record<string, string>;

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "content-overrides.json");

async function ensureStore() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, JSON.stringify({}, null, 2), "utf8");
  }
}

async function readStore(): Promise<ContentOverrides> {
  await ensureStore();
  const raw = await fs.readFile(STORE_PATH, "utf8");
  try {
    const parsed = JSON.parse(raw) as ContentOverrides;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

async function writeStore(data: ContentOverrides) {
  await ensureStore();
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
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
