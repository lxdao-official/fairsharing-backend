-- DropForeignKey
ALTER TABLE "Contribution" DROP CONSTRAINT "Contribution_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Contributor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
