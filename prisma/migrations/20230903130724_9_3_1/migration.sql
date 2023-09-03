/*
  Warnings:

  - You are about to drop the column `endAt` on the `Contribution` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uId]` on the table `Contribution` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "endAt";

-- CreateIndex
CREATE UNIQUE INDEX "Contribution_uId_key" ON "Contribution"("uId");
