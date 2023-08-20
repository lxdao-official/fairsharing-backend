/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `network` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votePeriod` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'MEMBER');

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_projectId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_userId_fkey";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "network" INTEGER NOT NULL,
ADD COLUMN     "votePeriod" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Member";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Contributor" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "userId" TEXT,
    "projectId" TEXT NOT NULL,
    "permission" "Permission" NOT NULL DEFAULT 'ADMIN',
    "role" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contributor" ADD CONSTRAINT "Contributor_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
