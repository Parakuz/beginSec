import { NextResponse } from 'next/server';
import { brokenAccessControlFlag } from '@/lib/flags';

export async function GET() {
  // 🔥 ไม่มีการตรวจสอบสิทธิ์ ผู้ใช้ทุกคนสามารถเข้าถึงได้
  return NextResponse.json({ flag: brokenAccessControlFlag });
}
