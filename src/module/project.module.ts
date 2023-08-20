import { Module } from '@nestjs/common';
import { ProjectController } from '@controller/project.controller';
import { ProjectService } from '@service/project.service';
import { ContributorService } from '@service/contributor.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, ContributorService],
})
export class ProjectModule {}
