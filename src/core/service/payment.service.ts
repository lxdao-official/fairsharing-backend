import { PaymentListQuery } from '@core/type/doc/payment';
import { paginate } from '@core/utils/paginator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async getPaymentList(data: PaymentListQuery) {
    const { pageSize, currentPage, projectId } = data;
    return paginate(
      this.prisma.payment,
      {
        where: {
          deleted: false,
          projectId,
        },
      },
      {
        pageSize,
        currentPage,
      },
    );
  }
}
