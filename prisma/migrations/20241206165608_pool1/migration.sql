/*
  Warnings:

  - Added the required column `address` to the `IncentivePool` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `IncentivePoolDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `IncentivePoolDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IncentivePool" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "wallets" TEXT[];

-- AlterTable
ALTER TABLE "IncentivePoolDetail" ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
