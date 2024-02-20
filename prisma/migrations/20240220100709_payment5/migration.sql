/*
  Warnings:

  - You are about to drop the column `createor` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `creator` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "createor",
ADD COLUMN     "creator" TEXT NOT NULL;
