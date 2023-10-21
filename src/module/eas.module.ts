import { Module } from '@nestjs/common';
import { EasService } from '@service/eas.service';

@Module({
  providers: [EasService],
})
export class EasModule {}
