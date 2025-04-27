import { NextResponse } from "next/server";
import prisma from "@/lib/auth/prisma";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email is required." },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { message: "No user found with this email." },
      { status: 404 }
    );
  }

  const token = crypto.randomBytes(32).toString("hex");

  await prisma.user.update({
    where: { email },
    data: { tokenResetPassword: token },
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const resetLink = `http://localhost:3000/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `<p>Click the link below to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`,
  });

  return NextResponse.json({
    message: "Reset password link sent to your email.",
  });
}
