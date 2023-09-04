import { Module } from '@nestjs/common';
import { ContributorService } from '@service/contributor.service';
import { ContributorController } from '@controller/contributor.controller';

@Module({
  controllers: [ContributorController],
  providers: [ContributorService],
  exports: [ContributorService],
})
export class ContributorModule {}
