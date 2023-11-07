/*
  Warnings:

  - The values [DEFAULT,RELATIVE2,ABSOLUTE1,ABSOLUTE2] on the enum `VoteApprove` will be removed. If these variants are still used in the database, this will fail.
  - The values [EQUAL,WEIGHT] on the enum `VoteSystem` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VoteApprove_new" AS ENUM ('1', '2', '3', '4');
ALTER TABLE "Project" ALTER COLUMN "voteApprove" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "voteApprove" TYPE "VoteApprove_new" USING ("voteApprove"::text::"VoteApprove_new");
ALTER TYPE "VoteApprove" RENAME TO "VoteApprove_old";
ALTER TYPE "VoteApprove_new" RENAME TO "VoteApprove";
DROP TYPE "VoteApprove_old";
ALTER TABLE "Project" ALTER COLUMN "voteApprove" SET DEFAULT '1';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "VoteSystem_new" AS ENUM ('1', '2');
ALTER TABLE "Project" ALTER COLUMN "voteSystem" DROP DEFAULT;
ALTER TABLE "Project" ALTER COLUMN "voteSystem" TYPE "VoteSystem_new" USING ("voteSystem"::text::"VoteSystem_new");
ALTER TYPE "VoteSystem" RENAME TO "VoteSystem_old";
ALTER TYPE "VoteSystem_new" RENAME TO "VoteSystem";
DROP TYPE "VoteSystem_old";
ALTER TABLE "Project" ALTER COLUMN "voteSystem" SET DEFAULT '1';
COMMIT;

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "voteApprove" SET DEFAULT '1',
ALTER COLUMN "voteSystem" SET DEFAULT '1';
