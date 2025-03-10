/*
  Warnings:

  - You are about to drop the column `Progress` on the `Transaction_UserCourse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Transaction_UserCourse" DROP COLUMN "Progress",
ADD COLUMN     "IsPreTestCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "PosttestAttempts" INTEGER DEFAULT 0,
ADD COLUMN     "PosttestScore" INTEGER,
ADD COLUMN     "PretestScore" INTEGER,
ADD COLUMN     "SectionProgress" BOOLEAN NOT NULL DEFAULT false;
