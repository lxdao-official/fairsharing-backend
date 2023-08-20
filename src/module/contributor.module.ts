import { Module } from '@nestjs/common';
import { ContributorService } from '@service/contributor.service';

@Module({
  controllers: [],
  providers: [ContributorService],
  exports: [ContributorService],
})
export class ContributorModule {}
