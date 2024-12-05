-- CreateEnum
CREATE TYPE "AllocationStatus" AS ENUM ('INITIAL', 'ATTESTED', 'REVOKED');

-- CreateEnum
CREATE TYPE "IncentiveCLAIMStatus" AS ENUM ('UNCLAIMED', 'CLAIMED');

-- CreateTable
CREATE TABLE "Allocation" (
    "id" TEXT NOT NULL,
    "uId" TEXT,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "status" "AllocationStatus" NOT NULL DEFAULT 'INITIAL',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllocationDetail" (
    "id" TEXT NOT NULL,
    "allocationId" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "ratio" INTEGER NOT NULL,
    "amount" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AllocationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncentivePool" (
    "id" TEXT NOT NULL,
    "allocationId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "timeToClaim" INTEGER NOT NULL,
    "depositor" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "IncentivePool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncentivePoolDetail" (
    "id" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "ratio" INTEGER NOT NULL,
    "status" "IncentiveCLAIMStatus" NOT NULL DEFAULT 'UNCLAIMED',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncentivePoolDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Allocation_uId_key" ON "Allocation"("uId");

-- AddForeignKey
ALTER TABLE "Allocation" ADD CONSTRAINT "Allocation_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AllocationDetail" ADD CONSTRAINT "AllocationDetail_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "Allocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IncentivePoolDetail" ADD CONSTRAINT "IncentivePoolDetail_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "IncentivePool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
