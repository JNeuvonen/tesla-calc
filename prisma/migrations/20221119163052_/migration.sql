/*
  Warnings:

  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[UUID]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `UUID` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_uid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uid",
ADD COLUMN     "UUID" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_UUID_key" ON "User"("UUID");
