-- CreateTable
CREATE TABLE "MintReocrd" (
    "id" TEXT NOT NULL,
    "contributorId" TEXT,
    "projectId" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "MintReocrd_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MintReocrd" ADD CONSTRAINT "MintReocrd_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MintReocrd" ADD CONSTRAINT "MintReocrd_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
