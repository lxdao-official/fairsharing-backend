import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { Contributor, Permission } from '@core/type/contributor';

@Injectable()
export class ContributorService {
  constructor(private prisma: PrismaService) {}

  async getContributorList(projectId: string) {
    return this.prisma.contributor.findMany({
      where: {
        deleted: false,
        projectId,
      },
    });
  }

  async deleteContributor(projectId: string) {
    return this.prisma.contributor.update({
      where: {
        id: projectId,
      },
      data: {
        deleted: true,
      },
    });
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
