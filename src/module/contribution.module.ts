import { Module } from '@nestjs/common';
import { ContributionController } from '@controller/contribution.controller';
import { ContributionService } from '@service/contribution.service';

@Module({
  controllers: [ContributionController],
  providers: [ContributionService],
})
export class ContributionModule {}
