import { Module } from '@nestjs/common';
import { UserController } from '@controller/user.controller';
import { UserService } from '@service/user.service';
import { ContributorService } from '@service/contributor.service';

@Module({
  controllers: [UserController],
  providers: [UserService, ContributorService],
})
export class UserModule {}
