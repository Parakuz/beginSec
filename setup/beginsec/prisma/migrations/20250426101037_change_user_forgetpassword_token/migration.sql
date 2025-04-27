/*
  Warnings:

  - You are about to drop the column `Username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenRePass]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_Username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "Username",
ADD COLUMN     "tokenRePass" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_tokenRePass_key" ON "User"("tokenRePass");
