import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import crypto from 'crypto';
import { sqlInjectionFlag, brokenAccessControlFlag } from '@/lib/flags';

export async function POST(req) {
    const { username, password } = await req.json();

    // แฮชรหัสผ่านเป็น MD5
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    
    // 🔥 SQL Injection vulnerability (no prepared statements)
    const user = await prisma.$queryRawUnsafe(
      `SELECT * FROM "User" WHERE "username"='${username}' AND "password"='${hashedPassword}'`
    );
    
    // ถ้ามี user ที่ตรงกับการ query
    if (user.length > 0) {
      const loggedInUser = user[0];
    
      if (loggedInUser.username === "admin") {
        return NextResponse.json({
          success: true,
          username: "admin",
          flag: brokenAccessControlFlag,
          redirect: "/admin"
        });
      }
    
      return NextResponse.json({
        success: true,
        username: loggedInUser.username,
        password: loggedInUser.password, // MD5 Hash
        flag: sqlInjectionFlag, // Flag ของ SQL Injection
        redirect: "/user"
      });
    }
    
    return NextResponse.json({ success: false, error: "Invalid credentials" });
}
