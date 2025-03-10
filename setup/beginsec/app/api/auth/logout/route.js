import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_URL,
});

let redisConnected = false;

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    if (!sessionToken) {
      return NextResponse.json({ message: "No active session" });
    }

    if (!redisConnected) {
      await redis.connect();
      redisConnected = true;
    }

    await redis.del(sessionToken.value);
    cookieStore.set("sessionToken", "", {
      expires: new Date(0),
      path: "/",
    });

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
  } finally {
    if (redisConnected) {
      await redis.quit();
      redisConnected = false;
    }
  }
}
