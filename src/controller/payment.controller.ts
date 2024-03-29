import { CoreApiResponse } from '@core/api/coreApiResponse';
import { CreatePaymentBody, PaymentListQuery } from '@core/type/doc/payment';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { PaymentService } from '@service/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(
    @Inject(PaymentService)
    private readonly paymentService: PaymentService,
  ) {}

  @Get('list')
  async getPaymentList(@Query() data: PaymentListQuery) {
    const user = await this.paymentService.getPaymentList(data);
    return CoreApiResponse.success(user);
  }

  @Post('create')
  async createPayment(@Body() body: CreatePaymentBody) {
    const data = await this.paymentService.createPayment(body);
    return CoreApiResponse.success(data);
  }
}
