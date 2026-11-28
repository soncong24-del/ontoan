import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { readDatabase, updateDatabase, type AccountRecord } from "@/lib/server/db";
import type { PublicAccount } from "@/types";

const COOKIE = "ontoan_session";
const MAX_AGE = 60 * 60 * 24 * 30;

export function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 32).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password: string, salt: string, hash: string): boolean {
  const next = scryptSync(password, salt, 32);
  const previous = Buffer.from(hash, "hex");
  if (next.length !== previous.length) return false;
  return timingSafeEqual(next, previous);
}

function sign(body: string, secret: string): string {
  const payload = Buffer.from(body).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function unsign(token: string, secret: string): string | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = createHmac("sha256", secret).update(payload).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  return Buffer.from(payload, "base64url").toString("utf8");
}

export function toPublic(user: AccountRecord): PublicAccount {
  return {
    id: user.id,
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    role: user.role,
  };
}

function promotedRole(username: string, role: AccountRecord["role"]): AccountRecord["role"] {
  const adminName = process.env.ONTOAN_ADMIN_USERNAME?.trim().toLowerCase();
  if (adminName && username.toLowerCase() === adminName) return "admin";
  return role;
}

export async function createSession(user: AccountRecord): Promise<void> {
  const db = await readDatabase();
  const token = sign(JSON.stringify({ uid: user.id, exp: Date.now() + MAX_AGE * 1000 }), db.secret);
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getCurrentUser(): Promise<AccountRecord | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  const db = await readDatabase();
  const raw = unsign(token, db.secret);
  if (!raw) return null;
  const parsed = JSON.parse(raw) as { uid?: string; exp?: number };
  if (!parsed.uid || !parsed.exp || parsed.exp < Date.now()) return null;
  const user = db.users.find((item) => item.id === parsed.uid);
  if (!user) return null;
  const role = promotedRole(user.username, user.role);
  if (role !== user.role) {
    await updateDatabase((data) => {
      const found = data.users.find((item) => item.id === user.id);
      if (found) found.role = role;
    });
    user.role = role;
  }
  return user;
}

export async function requireUser(): Promise<AccountRecord | null> {
  return getCurrentUser();
}

export async function requireAdmin(): Promise<AccountRecord | null> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
