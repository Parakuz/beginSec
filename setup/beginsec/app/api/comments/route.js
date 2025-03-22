
import { NextResponse } from 'next/server';
import prisma from '../../../lib/db';
import { xssFlag } from '../../../lib/flags';

export async function POST(req) {
  const { productId, content } = await req.json();

  // ใช้ Regular Expression เพื่อตรวจจับการโจมตี XSS
  const xssPattern = /<script>alert\(['"][\s\S]*?['"]\);<\/script>|<img src=x onerror=alert\(['"][\s\S]*?['"]\)>/i;

  let finalContent = content;
  if (xssPattern.test(content)) {
    finalContent += ' ' + xssFlag;
  }

  await prisma.comment.create({
    data: {
      productId,
      content: finalContent,
    },
  });

  return NextResponse.json({ success: true });
}
