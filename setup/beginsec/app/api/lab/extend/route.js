import { NextResponse } from "next/server";
import { extendLab } from "@/lib/LabManager";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const result = await extendLab(userId);

    return NextResponse.json({
      message: "Lab extended successfully.",
      remainingTime: result.remainingTime,
      expiresAt: result.expiresAt,
    });
  } catch (error) {
    console.error("Extend error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
