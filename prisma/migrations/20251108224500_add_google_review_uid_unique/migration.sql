/*
  Warnings:

  - A unique constraint covering the columns `[googleReviewUid]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Review_googleReviewUid_key` ON `Review`(`googleReviewUid`);
