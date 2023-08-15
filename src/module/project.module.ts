import { Module } from '@nestjs/common';
import { ProjectController } from '@controller/project.controller';
import { ProjectService } from '@service/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
