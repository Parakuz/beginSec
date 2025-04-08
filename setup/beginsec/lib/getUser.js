import prisma from "@/lib/auth/prisma";

export async function getUser(userId) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        imagePath: true,
      },
    });

    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}
