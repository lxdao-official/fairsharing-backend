-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "counterparties" TEXT[],
    "category" TEXT NOT NULL,
    "chainId" TEXT NOT NULL,
    "allocate" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);
