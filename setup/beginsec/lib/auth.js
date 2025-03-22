import prisma from './db';

export async function loginUser(username, password) {
  // ใช้ $queryRawUnsafe โดยตรง (vulnerable ต่อ SQL Injection)
  const query = `SELECT * FROM "User" WHERE username = '${username}' AND password = '${password}' LIMIT 1;`;
  const users = await prisma.$queryRawUnsafe(query);
  return users[0];
}
