/*
  Warnings:

  - You are about to drop the column `bookedAt` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `bookedBy` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `isBooked` on the `slot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `slot` DROP COLUMN `bookedAt`,
    DROP COLUMN `bookedBy`,
    DROP COLUMN `isBooked`;

-- CreateTable
CREATE TABLE `booking` (
    `id` VARCHAR(191) NOT NULL,
    `slotId` VARCHAR(191) NOT NULL,
    `patientName` VARCHAR(191) NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `bookedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `booking_slotId_key`(`slotId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `booking` ADD CONSTRAINT `booking_slotId_fkey` FOREIGN KEY (`slotId`) REFERENCES `slot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
