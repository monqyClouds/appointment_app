/*
  Warnings:

  - A unique constraint covering the columns `[doctorId,startTime]` on the table `slot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX `doctor_firstName_lastName_idx` ON `doctor`(`firstName`, `lastName`);

-- CreateIndex
CREATE INDEX `slot_startTime_endTime_idx` ON `slot`(`startTime`, `endTime`);

-- CreateIndex
CREATE UNIQUE INDEX `slot_doctorId_startTime_key` ON `slot`(`doctorId`, `startTime`);
