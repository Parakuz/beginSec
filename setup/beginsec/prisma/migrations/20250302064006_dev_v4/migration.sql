/*
  Warnings:

  - You are about to drop the column `path` on the `User` table. All the data in the column will be lost.
  - Added the required column `path` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "path" TEXT NOT NULL,
ALTER COLUMN "Certificate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "path";
