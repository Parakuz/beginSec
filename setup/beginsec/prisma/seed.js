const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  // แฮชรหัสผ่าน MD5 สำหรับ User1
  const passwordHash = crypto.createHash('md5').update('password123').digest('hex');
  const passwordAdmin = crypto.createHash('md5').update('admin').digest('hex');

  // เพิ่ม Users
  await prisma.user.createMany({
    data: [
      {
        username: 'User1',
        password: passwordHash, // เก็บค่า MD5 ของ password123
      },
      {
        username: 'admin',
        password: passwordAdmin, // เก็บค่า MD5 ของ admin
      },
    ],
  });

  // เพิ่ม Products
  await prisma.product.createMany({
    data: [
      { name: 'เสื้อฟุตบอล CPE Home', description: 'เสื้อฟุตบอล CPE Home 2025 ราคา 359 บาท' },
      { name: 'เสื้อฟุตบอล CPE Away', description: 'เสื้อฟุตบอล CPE Away 2025 ราคา 359 บาท' },
    ],
  });

  console.log('Database seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
