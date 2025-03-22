import { NextResponse } from 'next/server';
import { sqlInjectionFlag } from '@/lib/flags';
import prisma from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 🔥 ช่องโหว่ SQLi → คืน User แรกที่เจอ
  const user = await prisma.user.findFirst();

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username,
    password: user.password, // MD5 Hash
    flag: sqlInjectionFlag, // 🔥 Flag ของ SQL Injection
  });
}
