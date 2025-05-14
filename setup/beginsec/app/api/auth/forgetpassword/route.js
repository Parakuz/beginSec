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

  const resetLink = `https://3.104.224.60/reset-password/${token}`;

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Password Reset",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #fafafa;">
  <h2 style="color: #333;">สวัสดี ${user.name},</h2>

  <p style="font-size: 16px; color: #555;">
    คุณได้ร้องขอการรีเซ็ตรหัสผ่าน โปรดคลิกปุ่มด้านล่างเพื่อเปลี่ยนรหัสผ่านของคุณ:
  </p>

  <div style="text-align: center; margin: 30px 0;">
    <a href="${resetLink}" style="background-color: #1e88e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
      รีเซ็ตรหัสผ่าน
    </a>
  </div>

  <p style="font-size: 14px; color: #999;">
    หากคุณไม่ได้ร้องขอการรีเซ็ตรหัสผ่าน กรุณาเพิกเฉยต่ออีเมลนี้
  </p>

  <p style="font-size: 14px; color: #999;">ขอบคุณ,<br><strong>ทีม BeginSec</strong></p>
</div>
`,
  });

  return NextResponse.json({
    message: "Reset password link sent to your email.",
  });
}
