import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";

export async function GET(req, { params }) {
  const { userId } = params;
  const url = new URL(req.url);
  const testType = url.searchParams.get("type") || "all"; // "pretest", "posttest", หรือ "all"

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    // ดึงข้อมูล pretest
    let pretestData = [];
    if (testType === "pretest" || testType === "all") {
      pretestData = await prisma.transaction_UserCourse.findMany({
        where: {
          UserId: BigInt(userId),
          SectionProgress: false,
          IsPreTestCompleted: true,
        },
        select: {
          PretestScore: true,
          CourseId: true,
          TransactionId: true,
        },
        orderBy: {
          TransactionId: "desc",
        },
      });
    }

    // ดึงข้อมูล posttest
    let posttestData = [];
    if (testType === "posttest" || testType === "all") {
      posttestData = await prisma.transaction_UserCourse.findMany({
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
    }

    // แมปข้อมูล pretest
    const pretestMap = new Map();
    for (const entry of pretestData) {
      const courseIdStr = entry.CourseId.toString();
      if (!pretestMap.has(courseIdStr)) {
        pretestMap.set(courseIdStr, {
          CourseId: courseIdStr,
          PretestScore: entry.PretestScore,
        });
      }
    }

    // แมปข้อมูล posttest
    const posttestMap = new Map();
    for (const entry of posttestData) {
      const courseIdStr = entry.CourseId.toString();
      if (!posttestMap.has(courseIdStr)) {
        posttestMap.set(courseIdStr, {
          CourseId: courseIdStr,
          PosttestScore: entry.PosttestScore,
        });
      }
    }

    // แปลงเป็น array
    const pretestScores = Array.from(pretestMap.values());
    const posttestScores = Array.from(posttestMap.values());

    // นับจำนวนคอร์สที่ผ่านเกณฑ์
    const pretestCount = pretestScores.filter(
      (entry) => entry.PretestScore >= 80
    ).length;
    
    const posttestCount = posttestScores.filter(
      (entry) => entry.PosttestScore >= 80
    ).length;

    // สร้างผลลัพธ์
    let result = {};
    
    if (testType === "pretest" || testType === "all") {
      result.pretest = {
        score: pretestScores,
        count: pretestCount
      };
    }
    
    if (testType === "posttest" || testType === "all") {
      result.posttest = {
        score: posttestScores,
        count: posttestCount
      };
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("An error occurred", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}