import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET(req, { params }) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const courses = await prisma.transaction_UserCourse.findMany({
      where: {
        UserId: BigInt(userId),
      },
      distinct: ["CourseId"],
      include: {
        Course: true,
      },
    });
    const courseList = courses.map((entry) => {
      const course = entry.Course;
      return {
        ...course,
        id: course.id.toString(),
      };
    });

    return NextResponse.json(courseList, { status: 200 });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดบางอย่าง", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
