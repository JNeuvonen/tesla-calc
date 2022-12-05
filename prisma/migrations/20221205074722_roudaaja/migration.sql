-- CreateTable
CREATE TABLE `Address` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `userID` INTEGER NULL,

    UNIQUE INDEX `Address_userID_key`(`userID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `UUID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_UUID_key`(`UUID`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `listingTimeSensitivity` VARCHAR(191) NOT NULL,
    `dateType` VARCHAR(191) NOT NULL,
    `dateStart` DATETIME(3) NOT NULL,
    `dateEnd` DATETIME(3) NULL,
    `driversRisk` VARCHAR(191) NOT NULL,
    `distance` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `mainImage` VARCHAR(191) NOT NULL,
    `userID` INTEGER NULL,

    UNIQUE INDEX `Listing_UUID_key`(`UUID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ForgotPasswordLink` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `UUID` VARCHAR(191) NOT NULL,
    `userID` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ForgotPasswordLink_UUID_key`(`UUID`),
    UNIQUE INDEX `ForgotPasswordLink_userID_key`(`userID`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_listingID_fkey` FOREIGN KEY (`listingID`) REFERENCES `Listing`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ForgotPasswordLink` ADD CONSTRAINT `ForgotPasswordLink_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
