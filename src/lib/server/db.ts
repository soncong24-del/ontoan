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

function blobsEnabled(): boolean {
  return process.env.NETLIFY === "true" || Boolean(process.env.NETLIFY_BLOBS_CONTEXT);
}

async function readRaw(): Promise<DatabaseShape> {
  if (blobsEnabled()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("ontoan");
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
  const text = JSON.stringify(data);
  if (blobsEnabled()) {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("ontoan");
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
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("ontoan-media");
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
    const { getStore } = await import("@netlify/blobs");
    const store = getStore("ontoan-media");
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
