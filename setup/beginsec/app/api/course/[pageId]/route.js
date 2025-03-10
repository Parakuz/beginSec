import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET(req, context) {
  const params = await context.params;
  const { pageId } = params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: pageId },
      include: {
        sections: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    function getRandomQuestions(questions, num) {
      const shuffled = [...questions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled.slice(0, num);
    }

    const processedSections = course.sections.map((section) => {
      if (section.questions.length > 10) {
        section.questions = getRandomQuestions(section.questions, 10);
      }
      return section;
    });

    course.sections = processedSections;

    const serializedCourse = JSON.parse(
      JSON.stringify(course, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json(serializedCourse);
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
