/*
  Warnings:

  - The primary key for the `ContributionType` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ContributionType" DROP CONSTRAINT "ContributionType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ContributionType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ContributionType_id_seq";
