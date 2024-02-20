import { Code } from '@core/code';
import { CreatePaymentBody, PaymentListQuery } from '@core/type/doc/payment';
import { paginate } from '@core/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
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

  async createPayment(body: CreatePaymentBody) {
    const { projectId, wallet, ...data } = body;
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        deleted: false,
      },
    });
    if (!project) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    const user = await this.prisma.contributor.findFirst({
      where: {
        projectId,
        wallet,
      },
    });
    if (!user) {
      throw new HttpException(Code.NO_AUTH.message, Code.NO_AUTH.code);
    }
    return this.prisma.payment.create({
      data: {
        ...data,
        projectId,
      },
    });
  }
}
