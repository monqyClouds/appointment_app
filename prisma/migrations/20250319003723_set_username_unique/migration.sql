/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `doctor_userName_key` ON `doctor`(`userName`);
