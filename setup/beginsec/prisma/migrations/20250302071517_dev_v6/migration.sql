/*
  Warnings:

  - You are about to drop the column `Choice` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `answer` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "Choice",
DROP COLUMN "answer";
