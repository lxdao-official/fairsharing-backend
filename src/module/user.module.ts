import { ContributorModule } from '@/src/module/contributor.module';
import { UserController } from '@controller/user.controller';
import { Module } from '@nestjs/common';
import { UserService } from '@service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ContributorModule],
})
export class UserModule {}
