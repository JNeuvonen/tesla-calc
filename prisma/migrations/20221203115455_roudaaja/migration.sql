/*
  Warnings:

  - You are about to drop the column `isListingTimeSensitive` on the `Listing` table. All the data in the column will be lost.
  - Added the required column `listingTimeSensitivity` to the `Listing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Listing` DROP COLUMN `isListingTimeSensitive`,
    ADD COLUMN `listingTimeSensitivity` VARCHAR(191) NOT NULL;
