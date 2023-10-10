import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { UserService } from '@service/user.service';
import { SignupBody, UpdateUserBody } from '@core/type/doc/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  @Get('info')
  async getUserInfo(@Query('wallet') wallet: string) {
    const user = await this.userService.getUserInfo(wallet);
    return CoreApiResponse.success(user);
  }

  @Post('signup')
  async signup(@Body() body: SignupBody) {
    const user = await this.userService.signup(body.wallet);
    return CoreApiResponse.success(user);
  }

  @Put('/:wallet/edit')
  async editContributor(
    @Body() body: UpdateUserBody,
    @Param('userId') wallet: string,
  ) {
    const user = await this.userService.editUser(body, wallet);
    return CoreApiResponse.success(user);
  }
}
