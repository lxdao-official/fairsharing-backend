import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { Contributor, Permission } from '@core/type/contributor';
import {
  DeleteContributorsBody,
  UpdateContributorsBody,
} from '@core/type/doc/contributor';
import { UpdateProjectBody } from '@core/type/doc/project';
import { plainToClass } from 'class-transformer';

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

  async deleteContributor(body: DeleteContributorsBody) {
    const { contributorIds } = body;
    return this.prisma.contributor.updateMany({
      where: {
        id: {
          in: contributorIds,
        },
      },
      data: {
        deleted: true,
      },
    });
  }

  async editContributor(body: UpdateContributorsBody) {
    const { contributors } = body;
    const fn = contributors.map((item) => {
      return this.prisma.contributor.update({
        where: {
          id: item.id,
        },
        data: {
          permission: item.permission,
          nickName: item.nickName,
          role: item.role,
        },
      });
    });
    return this.prisma.$transaction(fn);
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
