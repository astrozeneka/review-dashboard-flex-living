-- CreateTable
CREATE TABLE `ListingPlaceMapping` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `listingId` INTEGER NOT NULL,
    `googlePlaceId` VARCHAR(191) NOT NULL,
    `listingName` VARCHAR(191) NULL,
    `placeName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ListingPlaceMapping_listingId_key`(`listingId`),
    INDEX `ListingPlaceMapping_googlePlaceId_idx`(`googlePlaceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
