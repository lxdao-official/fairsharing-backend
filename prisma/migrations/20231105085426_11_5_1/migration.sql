-- CreateEnum
CREATE TYPE "VoteSystem" AS ENUM ('EQUAL', 'WEIGHT');

-- CreateEnum
CREATE TYPE "VoteApprove" AS ENUM ('DEFAULT', 'RELATIVE2', 'ABSOLUTE1', 'ABSOLUTE2');

-- AlterTable
ALTER TABLE "Contributor" ADD COLUMN     "voteWeight" DOUBLE PRECISION NOT NULL DEFAULT 0.5;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "voteApprove" "VoteApprove" NOT NULL DEFAULT 'DEFAULT',
ADD COLUMN     "voteSystem" "VoteSystem" NOT NULL DEFAULT 'EQUAL',
ADD COLUMN     "voteThreshold" DOUBLE PRECISION NOT NULL DEFAULT 0.5;
