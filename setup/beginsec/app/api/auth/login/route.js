import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import crypto from "crypto";
import { createClient } from "redis";
import prisma from "@/lib/auth/prisma";

const redis = createClient({
  url: process.env.REDIS_URL,
});

let redisConnected = false;

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    if (!redisConnected) {
      await redis.connect();
      redisConnected = true;
    }

    const token = crypto.randomUUID();
    console.log(user.id);
    await redis.set(token, user.id.toString(), { EX: 60 * 60 * 24 });

    const cookieStore = await cookies();
    cookieStore.set("sessionToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json({ message: "Login สำเร็จ" });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  } finally {
    if (redisConnected) {
      await redis.quit();
      redisConnected = false;
    }
  }
}
