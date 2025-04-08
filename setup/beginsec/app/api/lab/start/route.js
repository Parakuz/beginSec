import { NextResponse } from "next/server";
import { startLabContainer } from "@/lib/LabManager";

export async function POST(req) {
  try {
    const { userId, labName } = await req.json();

    if (!userId || !labName) {
      return NextResponse.json(
        { error: "Missing userId or labName" },
        { status: 400 }
      );
    }

    const result = await startLabContainer(userId, labName);

    return NextResponse.json({ message: "Lab started", ...result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
