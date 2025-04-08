import prisma from "@/lib/auth/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const lab = await prisma.lab.findUnique({
      where: { userId },
    });

    if (!lab) {
      return NextResponse.json({ error: "No lab running" }, { status: 404 });
    }

    const createdAt = new Date(lab.createdAt);
    const now = new Date();
    const elapsedMinutes = Math.floor((now - createdAt) / 1000);

    const remainingTimeWithExpand = lab.remainingTime - elapsedMinutes;
    const remainingTime = Math.max(remainingTimeWithExpand, 0);

    return NextResponse.json({ remainingTime, port: lab.port });
  } catch (error) {
    console.error("Error fetching lab status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
