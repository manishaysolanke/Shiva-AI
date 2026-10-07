import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import prisma from "./db";
import { NextRequest } from "next/server";

const AUTH_SECRET = process.env.AUTH_SECRET || "shiv_ai_jwt_super_secret_session_key_production_2026";
const COOKIE_NAME = "shiv_auth_token";

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, AUTH_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, AUTH_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSessionUser() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true,
        creditBalance: true,
      },
    });

    return user;
  } catch (err) {
    console.error("Session lookup error:", err);
    return null;
  }
}

export async function getSessionUserFromRequest(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value || req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      include: {
        subscription: true,
        creditBalance: true,
      },
    });

    return user;
  } catch (err) {
    console.error("Session lookup from request error:", err);
    return null;
  }
}

export { COOKIE_NAME };
