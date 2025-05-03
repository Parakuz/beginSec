import prisma from "@/lib/auth/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        admin: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        postDate: 'desc', // เรียงลำดับตามวันที่โพสต์จากใหม่ไปเก่า
      },
    });
    // Convert BigInt values to strings to make them serializable
    const serializableBlogs = blogs.map((blog) => ({
      ...blog,
      id: blog.id.toString(),
      adminId: blog.adminId.toString(),
    }));

    return NextResponse.json(serializableBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
