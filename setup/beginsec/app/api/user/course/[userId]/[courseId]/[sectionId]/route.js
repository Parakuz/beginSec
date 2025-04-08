import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET(req, { params }) {
  try {
    const { userId, courseId, sectionId } = await params;

    if (!userId || !courseId || !sectionId) {
      return NextResponse.json(
        { message: "userId, courseId, or sectionId is missing" },
        { status: 400 }
      );
    }

    const progress = await prisma.transaction_UserCourse.findFirst({
      where: {
        UserId: BigInt(userId),
        SectionId: BigInt(sectionId),
        CourseId: BigInt(courseId),
      },
      select: {
        PretestScore: true,
        SectionProgress: true,
        PosttestScore: true,
        PosttestAttempts: true,
        IsPreTestCompleted: true,
      },
    });
    if (!progress) {
      return NextResponse.json(
        { message: "Progress not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("Error fetching section progress:", error);
    return NextResponse.json(
      { message: "Error fetching progress" },
      { status: 500 }
    );
  }
}
