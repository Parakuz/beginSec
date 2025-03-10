-- AlterTable
CREATE SEQUENCE admin_adminid_seq;
ALTER TABLE "Admin" ALTER COLUMN "AdminId" SET DEFAULT nextval('admin_adminid_seq');
ALTER SEQUENCE admin_adminid_seq OWNED BY "Admin"."AdminId";

-- AlterTable
CREATE SEQUENCE blog_blogid_seq;
ALTER TABLE "Blog" ALTER COLUMN "BlogId" SET DEFAULT nextval('blog_blogid_seq');
ALTER SEQUENCE blog_blogid_seq OWNED BY "Blog"."BlogId";

-- AlterTable
CREATE SEQUENCE course_courseid_seq;
ALTER TABLE "Course" ALTER COLUMN "CourseId" SET DEFAULT nextval('course_courseid_seq');
ALTER SEQUENCE course_courseid_seq OWNED BY "Course"."CourseId";

-- AlterTable
CREATE SEQUENCE section_sectionid_seq;
ALTER TABLE "Section" ALTER COLUMN "SectionId" SET DEFAULT nextval('section_sectionid_seq');
ALTER SEQUENCE section_sectionid_seq OWNED BY "Section"."SectionId";

-- AlterTable
CREATE SEQUENCE transaction_report_reportid_seq;
ALTER TABLE "Transaction_Report" ALTER COLUMN "ReportId" SET DEFAULT nextval('transaction_report_reportid_seq');
ALTER SEQUENCE transaction_report_reportid_seq OWNED BY "Transaction_Report"."ReportId";

-- AlterTable
CREATE SEQUENCE transaction_usercourse_transactionid_seq;
ALTER TABLE "Transaction_UserCourse" ALTER COLUMN "TransactionId" SET DEFAULT nextval('transaction_usercourse_transactionid_seq');
ALTER SEQUENCE transaction_usercourse_transactionid_seq OWNED BY "Transaction_UserCourse"."TransactionId";
