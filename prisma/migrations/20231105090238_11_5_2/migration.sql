-- AlterTable
ALTER TABLE "Contribution" ADD COLUMN     "contributionDate" TEXT,
ADD COLUMN     "type" TEXT[];

-- CreateTable
CREATE TABLE "ContributionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ContributionType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContributionType" ADD CONSTRAINT "ContributionType_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
