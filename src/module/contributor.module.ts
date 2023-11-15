import { ProjectModule } from '@/src/module/project.module';
import { ContributorController } from '@controller/contributor.controller';
import { forwardRef, Module } from '@nestjs/common';
import { ContributorService } from '@service/contributor.service';

@Module({
  controllers: [ContributorController],
  providers: [ContributorService],
  exports: [ContributorService],
  imports: [forwardRef(() => ProjectModule)],
})
export class ContributorModule {}
