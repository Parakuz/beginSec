import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // ดึงข้อมูล session ของผู้ใช้ที่ login อยู่
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // ดึงข้อมูล courses จาก Prisma
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        image: true,
        // คุณอาจต้องปรับตามโครงสร้างข้อมูลจริงของคุณ
        userProgress: {
          where: {
            userId: userId,
          },
          select: {
            progress: true,
          },
        },
      },
    });

    // แปลงข้อมูลให้อยู่ในรูปแบบที่ต้องการ
    const formattedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      image: course.image || `/assets/Profile-Lerning2.png`, // ใช้รูปภาพเริ่มต้นถ้าไม่มีรูป
      progress: course.userProgress[0]?.progress || 0, // ถ้าไม่มีข้อมูล progress ให้เป็น 0
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}