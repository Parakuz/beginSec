import prisma from "@/lib/auth/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // Check if the ID is numeric or a string ID (like 'main1')
    let blog;

    if (/^\d+$/.test(id)) {
      // If ID is numeric, convert to BigInt for Prisma query
      const blogId = BigInt(id);

      blog = await prisma.blog.findUnique({
        where: {
          id: blogId,
        },
        include: {
          admin: {
            select: {
              name: true,
            },
          },
        },
      });
    } else {
      // For non-numeric IDs, we'll return null as these would be handled by fallback data
      blog = null;
    }

    if (!blog) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Convert BigInt values to strings to make them serializable
    const serializableBlog = {
      ...blog,
      id: blog.id.toString(),
      adminId: blog.adminId.toString(),
    };

    return NextResponse.json(serializableBlog);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}
