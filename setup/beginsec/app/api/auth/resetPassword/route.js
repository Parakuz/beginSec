import prisma from "@/lib/auth/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return new Response(
        JSON.stringify({ message: "Token and password are required" }),
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findFirst({
      where: { tokenResetPassword: token },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        tokenResetPassword: null,
      },
    });

    return new Response(
      JSON.stringify({ message: "Password has been reset successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
