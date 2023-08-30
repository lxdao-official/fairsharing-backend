/*
  Warnings:

  - The values [SUCCESS,FAIL] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `MintRecord` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[address]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `votePeriod` on the `Project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('UNREADY', 'READY', 'CLAIM');
ALTER TABLE "Contribution" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Contribution" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Contribution" ALTER COLUMN "status" SET DEFAULT 'UNREADY';
COMMIT;

-- DropForeignKey
ALTER TABLE "MintRecord" DROP CONSTRAINT "MintRecord_contributionId_fkey";

-- DropForeignKey
ALTER TABLE "MintRecord" DROP CONSTRAINT "MintRecord_userId_fkey";

-- DropIndex
DROP INDEX "Project_name_key";

-- DropIndex
DROP INDEX "Project_symbol_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "address" TEXT NOT NULL,
DROP COLUMN "votePeriod",
ADD COLUMN     "votePeriod" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "MintRecord";

-- DropEnum
DROP TYPE "MintStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Project_address_key" ON "Project"("address");
