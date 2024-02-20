/*
  Warnings:

  - You are about to drop the column `crateor` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `createor` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "crateor",
ADD COLUMN     "createor" TEXT NOT NULL;
