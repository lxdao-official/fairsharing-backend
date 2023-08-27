import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { Contributor, Permission } from '@core/type/contributor';
import { paginate } from '@core/utils/paginator';

@Injectable()
export class ContributorService {
  constructor(private prisma: PrismaService) {}

  async getContributorList(pageSize: number, currentPage: number) {
    return paginate(
      this.prisma.contributor,
      {
        where: {
          deleted: false,
        },
      },
      {
        pageSize,
        currentPage,
      },
    );
  }

  checkWalletUnique(contributors: Contributor[]) {
    const contributorsSet = new Set();
    contributors.forEach((item) => {
      contributorsSet.add(item.wallet);
    });
    if (contributorsSet.size !== contributors.length) {
      throw new HttpException(
        Code.WALLET_UNIQUE_ERROR.message,
        Code.WALLET_UNIQUE_ERROR.code,
      );
    }
  }

  checkOwnerPermission(contributors: Contributor[]) {
    const ownerContributor = contributors.filter(
      (item) => Number(item.permission) === Permission.Owner,
    );
    if (ownerContributor.length !== 1) {
      throw new HttpException(
        Code.OWNER_PERMISSION_ERROR.message,
        Code.OWNER_PERMISSION_ERROR.code,
      );
    }
  }
}
