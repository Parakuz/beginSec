import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany();

    const coursesWithStringIds = courses.map((course) => ({
      ...course,
      id: course.id.toString(),
    }));

    return NextResponse.json(coursesWithStringIds);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
