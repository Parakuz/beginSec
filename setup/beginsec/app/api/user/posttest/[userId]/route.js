import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET(req, { params }) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const posttestScores = await prisma.transaction_UserCourse.findMany({
      where: {
        UserId: BigInt(userId),
        SectionProgress: false,
        IsPreTestCompleted: false,
      },
      select: {
        PosttestScore: true,
        CourseId: true,
        TransactionId: true,
      },
      orderBy: {
        TransactionId: "desc",
      },
    });

    const latestScoresMap = new Map();

    for (const entry of posttestScores) {
      const courseIdStr = entry.CourseId.toString();
      if (!latestScoresMap.has(courseIdStr)) {
        latestScoresMap.set(courseIdStr, {
          CourseId: courseIdStr,
          PosttestScore: entry.PosttestScore,
        });
      }
    }

    const latestScores = Array.from(latestScoresMap.values());
    const count = latestScores.filter(
      (entry) => entry.PosttestScore >= 80
    ).length;

    return NextResponse.json({ score: latestScores, count }, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดบางอย่าง", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
