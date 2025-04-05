import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); // ไม่ต้อง config DATABASE_URL แล้ว
export default prisma;