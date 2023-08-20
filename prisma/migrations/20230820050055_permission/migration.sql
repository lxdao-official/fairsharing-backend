/*
  Warnings:

  - Changed the type of `permission` on the `Contributor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Contributor" DROP COLUMN "permission",
ADD COLUMN     "permission" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Permission";
