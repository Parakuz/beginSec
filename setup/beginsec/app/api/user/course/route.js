import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function POST(req, { params }) {
  try {
    const {
      userId,
      sectionId,
      courseId,
      PretestScore,
      PosttestScore,
      PosttestAttempts,
      IsPreTestCompleted,
      SectionProgress,
    } = await req.json();
    console.log(PosttestScore);
    const user = BigInt(userId);
    const section = BigInt(sectionId);
    const course = BigInt(courseId);

    const existingProgress = await prisma.transaction_UserCourse.findFirst({
      where: {
        UserId: user,
        SectionId: section,
        CourseId: course,
      },
    });
    console.log(existingProgress);
    if (existingProgress) {
      if (PosttestScore !== undefined) {
        if (PosttestScore > existingProgress.PosttestScore) {
          const updatedPost = await prisma.transaction_UserCourse.update({
            where: {
              TransactionId: existingProgress.TransactionId,
            },
            data: {
              PosttestScore: PosttestScore,
              PosttestAttempts: existingProgress.PosttestAttempts + 1,
            },
          });

          return NextResponse.json(
            { message: "Posttest score updated successfully" },
            { status: 200 }
          );
        }
      }
      return NextResponse.json(
        { message: "Progress already recorded" },
        { status: 200 }
      );
    } else {
      await prisma.transaction_UserCourse.create({
        data: {
          UserId: user,
          SectionId: section,
          CourseId: course,
          PretestScore: PretestScore || 0,
          PosttestScore: PosttestScore || 0,
          PosttestAttempts: PosttestAttempts || 0,
          IsPreTestCompleted: IsPreTestCompleted || false,
          SectionProgress: SectionProgress || false,
        },
      });
    }
    return NextResponse.json(
      { message: "Progress saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving progress:", error);
    return NextResponse.json(
      { message: "Error saving progress" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const courseId = url.searchParams.get("courseId");

    if (!userId || !courseId) {
      return NextResponse.json(
        { message: "userId or courseId is missing" },
        { status: 400 }
      );
    }

    const user = BigInt(userId);
    const course = BigInt(courseId);

    const completedLessons = await prisma.transaction_UserCourse.findMany({
      where: {
        UserId: user,
        CourseId: course,
      },
    });

    const completedLessonsMap = completedLessons.reduce((acc, lesson) => {
      acc[lesson.SectionId] = true;
      return acc;
    }, {});

    return NextResponse.json({ completedLessons: completedLessonsMap });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { message: "Error fetching progress" },
      { status: 500 }
    );
  }
}
