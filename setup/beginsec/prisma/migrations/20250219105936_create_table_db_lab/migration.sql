/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `DOB` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `ImagePath` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Telephone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction_Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction_UserCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_AdminId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_CourseId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_Report" DROP CONSTRAINT "Transaction_Report_AdminId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_Report" DROP CONSTRAINT "Transaction_Report_UserId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_UserCourse" DROP CONSTRAINT "Transaction_UserCourse_CourseId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_UserCourse" DROP CONSTRAINT "Transaction_UserCourse_SectionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction_UserCourse" DROP CONSTRAINT "Transaction_UserCourse_UserId_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "DOB",
DROP COLUMN "Email",
DROP COLUMN "ImagePath",
DROP COLUMN "Name",
DROP COLUMN "Password",
DROP COLUMN "Telephone",
DROP COLUMN "UserId",
DROP COLUMN "Username",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Blog";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Section";

-- DropTable
DROP TABLE "Transaction_Report";

-- DropTable
DROP TABLE "Transaction_UserCourse";

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "secretNote" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flag" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "discovered" BOOLEAN NOT NULL DEFAULT false,
    "discoveredAt" TIMESTAMP(3),

    CONSTRAINT "Flag_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
