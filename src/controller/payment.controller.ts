import { CoreApiResponse } from '@core/api/coreApiResponse';
import { PaymentListQuery } from '@core/type/doc/payment';
import { Controller, Get, Inject, Query } from '@nestjs/common';
import { PaymentService } from '@service/payment.service';
import { UserService } from '@service/user.service';

@Controller('payment')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly paymentService: PaymentService,
  ) {}

  @Get('list')
  async getPaymentList(@Query() data: PaymentListQuery) {
    const user = await this.paymentService.getPaymentList(data);
    return CoreApiResponse.success(user);
  }
}
