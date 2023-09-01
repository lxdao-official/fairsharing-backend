/*
  Warnings:

  - You are about to drop the column `address` on the `Project` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Project_address_key";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "address";
