-- AlterTable
CREATE SEQUENCE user_userid_seq;
ALTER TABLE "User" ALTER COLUMN "UserId" SET DEFAULT nextval('user_userid_seq');
ALTER SEQUENCE user_userid_seq OWNED BY "User"."UserId";
