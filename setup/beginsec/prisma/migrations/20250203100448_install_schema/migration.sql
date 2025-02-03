/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "User" (
    "UserId" BIGINT NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "DOB" TIMESTAMP(3) NOT NULL,
    "Telephone" TEXT NOT NULL,
    "Username" TEXT NOT NULL,
    "ImagePath" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "Course" (
    "CourseId" BIGINT NOT NULL,
    "CourseName" TEXT NOT NULL,
    "CourseDetail" TEXT NOT NULL,
    "Certificate" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("CourseId")
);

-- CreateTable
CREATE TABLE "Section" (
    "SectionId" BIGINT NOT NULL,
    "CourseId" BIGINT NOT NULL,
    "SectionDetail" TEXT NOT NULL,
    "SectionName" TEXT NOT NULL,
    "LabName" TEXT NOT NULL,
    "Question" TEXT NOT NULL,
    "Choice" TEXT NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("SectionId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "AdminId" BIGINT NOT NULL,
    "AdminUsername" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("AdminId")
);

-- CreateTable
CREATE TABLE "Blog" (
    "BlogId" BIGINT NOT NULL,
    "BlogName" TEXT NOT NULL,
    "BlogDetail" TEXT NOT NULL,
    "AdminId" BIGINT NOT NULL,
    "ImagePath" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("BlogId")
);

-- CreateTable
CREATE TABLE "Transaction_Report" (
    "ReportId" BIGINT NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT NOT NULL,
    "AdminId" BIGINT NOT NULL,
    "UserId" BIGINT NOT NULL,
    "CreateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_Report_pkey" PRIMARY KEY ("ReportId")
);

-- CreateTable
CREATE TABLE "Transaction_UserCourse" (
    "TransactionId" BIGINT NOT NULL,
    "UserId" BIGINT NOT NULL,
    "CourseId" BIGINT NOT NULL,
    "SectionId" BIGINT NOT NULL,
    "Progress" BIGINT NOT NULL,

    CONSTRAINT "Transaction_UserCourse_pkey" PRIMARY KEY ("TransactionId")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("CourseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "Admin"("AdminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Report" ADD CONSTRAINT "Transaction_Report_AdminId_fkey" FOREIGN KEY ("AdminId") REFERENCES "Admin"("AdminId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_Report" ADD CONSTRAINT "Transaction_Report_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_UserCourse" ADD CONSTRAINT "Transaction_UserCourse_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_UserCourse" ADD CONSTRAINT "Transaction_UserCourse_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "Course"("CourseId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction_UserCourse" ADD CONSTRAINT "Transaction_UserCourse_SectionId_fkey" FOREIGN KEY ("SectionId") REFERENCES "Section"("SectionId") ON DELETE RESTRICT ON UPDATE CASCADE;
