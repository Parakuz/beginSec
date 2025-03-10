import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/auth/prisma";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "อีเมลล์นี้ถูกใช้งานแล้ว โปรดลองด้วยอีเมลล์อื่น" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const userResponse = {
      id: newUser.id.toString(),
      name: newUser.name,
      email: newUser.email,
    };

    return NextResponse.json(
      { message: "User registered successfully", user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
