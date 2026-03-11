-- AlterTable
ALTER TABLE `contact` ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `subject` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `facebook` VARCHAR(191) NULL,
    ADD COLUMN `instagram` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `whatsapp` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inquiry` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
