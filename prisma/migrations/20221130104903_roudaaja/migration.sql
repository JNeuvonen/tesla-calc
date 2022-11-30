-- CreateTable
CREATE TABLE `User` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `UUID` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `User_UUID_key`(`UUID`),
    UNIQUE INDEX `User_email_key`(`email`),
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
ALTER TABLE `ForgotPasswordLink` ADD CONSTRAINT `ForgotPasswordLink_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
