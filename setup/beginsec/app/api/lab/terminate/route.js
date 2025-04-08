import { NextResponse } from "next/server";
import { terminateLab } from "@/lib/LabManager"; // เปลี่ยนตาม path ที่เก็บฟังก์ชัน terminateLab จริง ๆ

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await terminateLab(userId);

    return NextResponse.json({ message: "Lab terminated successfully." });
  } catch (error) {
    console.error("Terminate error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
