import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "redis";

const globalForRedis = globalThis;

if (!globalForRedis.redis) {
  globalForRedis.redis = createClient({
    url: process.env.REDIS_URL,
  });

  globalForRedis.redis.connect().catch(console.error);
}

const redis = globalForRedis.redis;

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken");

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Unauthorized, no sessionToken" },
        { status: 401 }
      );
    }

    const sessionTokenStr = String(sessionToken.value);
    const userId = await redis.get(sessionTokenStr);

    if (!userId) {
      return NextResponse.json(
        { error: "Session expired or invalid" },
        { status: 401 }
      );
    }

    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Error fetching userId:", error);
    return NextResponse.json(
      { error: "Error fetching userId" },
      { status: 500 }
    );
  }
}
