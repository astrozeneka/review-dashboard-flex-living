-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hostawayId` INTEGER NULL,
    `type` ENUM('HOST_TO_GUEST', 'GUEST_TO_HOST') NOT NULL,
    `rating` INTEGER NULL,
    `publicReview` TEXT NOT NULL,
    `reviewCategory` JSON NULL,
    `submittedAt` DATETIME(3) NOT NULL,
    `guestName` VARCHAR(191) NOT NULL,
    `listingName` VARCHAR(191) NOT NULL,
    `listingId` INTEGER NOT NULL,
    `channel` VARCHAR(191) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Review_hostawayId_key`(`hostawayId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
