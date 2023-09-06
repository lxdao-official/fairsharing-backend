import { Module } from '@nestjs/common';
import { EasController } from '@controller/eas.controller';
import { EasService } from '@service/eas.service';

@Module({
  controllers: [EasController],
  providers: [EasService],
})
export class EasModule {}
