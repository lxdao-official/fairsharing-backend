-- AddForeignKey
ALTER TABLE "IncentivePool" ADD CONSTRAINT "IncentivePool_allocationId_fkey" FOREIGN KEY ("allocationId") REFERENCES "Allocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
