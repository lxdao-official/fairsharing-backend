import { ContributorModule } from '@/src/module/contributor.module';
import { ProjectController } from '@controller/project.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from '@service/project.service';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
  imports: [forwardRef(() => ContributorModule)],
})
export class ProjectModule {}
