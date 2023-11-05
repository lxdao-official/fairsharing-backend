/*
  Warnings:

  - Added the required column `color` to the `ContributionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ContributionType" ADD COLUMN     "color" TEXT NOT NULL;
