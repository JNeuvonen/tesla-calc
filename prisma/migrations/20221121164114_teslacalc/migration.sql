-- DropForeignKey
ALTER TABLE "ForgotPasswordLink" DROP CONSTRAINT "ForgotPasswordLink_userID_fkey";

-- AlterTable
ALTER TABLE "ForgotPasswordLink" ALTER COLUMN "userID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ForgotPasswordLink" ADD CONSTRAINT "ForgotPasswordLink_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
