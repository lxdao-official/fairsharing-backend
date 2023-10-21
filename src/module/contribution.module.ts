import { Module } from '@nestjs/common';
import { ContributionController } from '@controller/contribution.controller';
import { ContributionService } from '@service/contribution.service';
import { EasService } from '@service/eas.service';

@Module({
  controllers: [ContributionController],
  providers: [ContributionService, EasService],
})
export class ContributionModule {}
