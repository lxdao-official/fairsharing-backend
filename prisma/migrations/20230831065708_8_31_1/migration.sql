/*
  Warnings:

  - You are about to drop the column `argee` on the `Contribution` table. All the data in the column will be lost.
  - You are about to drop the column `disagree` on the `Contribution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contribution" DROP COLUMN "argee",
DROP COLUMN "disagree",
ADD COLUMN     "uId" TEXT;
