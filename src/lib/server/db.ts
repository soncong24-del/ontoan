import { randomBytes } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { CourseRegistration, Quiz, QuizAttempt } from "@/types";

export interface AccountRecord {
  id: string;
  username: string;
  displayName: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: "student" | "admin";
  createdAt: string;
}

export interface StoredAttempt extends QuizAttempt {
  userId: string;
}

export interface StoredExam {
  quiz: Quiz;
  published: boolean;
  hidden: boolean;
  updatedAt: string;
}

interface DatabaseShape {
  secret: string;
  users: AccountRecord[];
  attempts: StoredAttempt[];
  registrations: CourseRegistration[];
  exams: StoredExam[];
}

const EMPTY = (): DatabaseShape => ({
  secret: randomBytes(32).toString("hex"),
  users: [],
  attempts: [],
  registrations: [],
  exams: [],
});

const FILE = path.join(process.cwd(), ".data", "db.json");

function env(name: string): string {
  return (process.env[name] ?? "").trim();
}

function inBuild(): boolean {
  return env("NEXT_PHASE") === "phase-production-build";
}

function blobToken(): string {
  return env("ONTOAN_BLOBS_TOKEN");
}

function blobsEnabled(): boolean {
  if (inBuild()) return false;
  return env("NETLIFY") === "true" || Boolean(blobToken()) || Boolean(env("NETLIFY_BLOBS_CONTEXT"));
}

export function storageErrorMessage(error: unknown): string {
  const raw = error instanceof Error ? error.message : "Lỗi lưu dữ liệu";
  const cleaned = raw
    .replace(/https?:\/\/\S+/g, "[url]")
    .replace(/Bearer\s+\S+/gi, "Bearer [ẩn]")
    .replace(/token=\S+/gi, "token=[ẩn]")
    .slice(0, 220);
  if (/ONTOAN_BLOBS_TOKEN/.test(cleaned)) return cleaned;
  if (/not been configured to use Netlify Blobs/i.test(raw)) {
    return "Kho dữ liệu Netlify chưa được cấu hình.";
  }
  return cleaned || "Lỗi lưu dữ liệu";
}

/**
 * Next.js replaces global fetch. The Blobs client then retries that patched
 * fetch five times, five seconds apart, and the function is killed mid-page.
 * Call the API with undici and collapse retryable statuses so a failure
 * returns in one attempt.
 */
const blobFetch: typeof fetch = async (input, init) => {
  const { fetch: raw } = await import("undici");
  try {
    const response = await raw(input as never, {
      ...(init ?? {}),
      signal: AbortSignal.timeout(12_000),
    } as never);
    if (response.status === 403 || response.status === 429 || response.status >= 500) {
      const body = await response.text();
      return new Response(body.slice(0, 300), { status: 400 });
    }
    return response as unknown as Response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không kết nối được kho dữ liệu";
    return new Response(message, { status: 400 });
  }
};

async function openStore(name: string) {
  const token = blobToken();
  if (!token) {
    throw new Error("Máy chủ chưa có ONTOAN_BLOBS_TOKEN nên chưa lưu được tài khoản.");
  }
  const { getStore } = await import("@netlify/blobs");
  return getStore({
    name,
    siteID: env("ONTOAN_SITE_ID") || "8d302ac9-d8ef-4ece-887e-7fd5477dec8e",
    token,
    fetch: blobFetch,
  });
}

async function readRaw(): Promise<DatabaseShape> {
  if (inBuild()) {
    return { secret: "build", users: [], attempts: [], registrations: [], exams: [] };
  }
  if (blobsEnabled()) {
    const store = await openStore("ontoan");
    const text = await store.get("db", { type: "text" });
    if (!text) {
      const created = EMPTY();
      await store.set("db", JSON.stringify(created));
      return created;
    }
    return { ...EMPTY(), ...(JSON.parse(text) as DatabaseShape) };
  }
  try {
    const text = await readFile(FILE, "utf8");
    return { ...EMPTY(), ...(JSON.parse(text) as DatabaseShape) };
  } catch {
    const created = EMPTY();
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(created), "utf8");
    return created;
  }
}

async function writeRaw(data: DatabaseShape): Promise<void> {
  if (inBuild()) return;
  const text = JSON.stringify(data);
  if (blobsEnabled()) {
    const store = await openStore("ontoan");
    await store.set("db", text);
    return;
  }
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, text, "utf8");
}

export async function updateDatabase<T>(mutate: (data: DatabaseShape) => T | Promise<T>): Promise<T> {
  const data = await readRaw();
  const result = await mutate(data);
  await writeRaw(data);
  return result;
}

export async function readDatabase(): Promise<DatabaseShape> {
  return readRaw();
}

export async function saveMedia(id: string, bytes: Buffer, contentType: string): Promise<void> {
  if (blobsEnabled()) {
    const store = await openStore("ontoan-media");
    await store.set(id, bytes.toString("base64"), { metadata: { contentType } });
    return;
  }
  const folder = path.join(process.cwd(), ".data", "media");
  await mkdir(folder, { recursive: true });
  await writeFile(path.join(folder, id), bytes);
  await writeFile(path.join(folder, `${id}.type`), contentType, "utf8");
}

export async function readMedia(id: string): Promise<{ bytes: Buffer; contentType: string } | null> {
  if (!/^[\w.-]+$/.test(id)) return null;
  if (blobsEnabled()) {
    const store = await openStore("ontoan-media");
    const result = await store.getWithMetadata(id, { type: "text" });
    if (!result) return null;
    const contentType =
      typeof result.metadata?.contentType === "string" ? result.metadata.contentType : "application/octet-stream";
    return { bytes: Buffer.from(result.data, "base64"), contentType };
  }
  try {
    const folder = path.join(process.cwd(), ".data", "media");
    const bytes = await readFile(path.join(folder, id));
    const contentType = await readFile(path.join(folder, `${id}.type`), "utf8");
    return { bytes, contentType };
  } catch {
    return null;
  }
}
