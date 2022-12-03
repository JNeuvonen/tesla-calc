-- CreateTable
CREATE TABLE `Image` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `source` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `listingID` INTEGER NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `UUID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `originAddress` VARCHAR(191) NOT NULL,
    `targetAddress` VARCHAR(191) NOT NULL,
    `textDescription` VARCHAR(191) NOT NULL,
    `estimatedWeight` VARCHAR(191) NOT NULL,
    `isListingTimeSensitive` VARCHAR(191) NOT NULL,
    `dateType` VARCHAR(191) NOT NULL,
    `dateStart` DATETIME(3) NOT NULL,
    `dateEnd` DATETIME(3) NULL,
    `driversRisk` VARCHAR(191) NOT NULL,
    `distance` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `mainImage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Listing_UUID_key`(`UUID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_listingID_fkey` FOREIGN KEY (`listingID`) REFERENCES `Listing`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
