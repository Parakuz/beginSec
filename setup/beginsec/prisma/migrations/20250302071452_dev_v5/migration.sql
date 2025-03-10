/*
  Warnings:

  - You are about to drop the column `Question` on the `Section` table. All the data in the column will be lost.
  - Added the required column `answer` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "Question",
ADD COLUMN     "answer" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Question" (
    "QuestionId" BIGSERIAL NOT NULL,
    "SectionId" BIGINT NOT NULL,
    "QuestionText" TEXT NOT NULL,
    "choices" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("QuestionId")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
