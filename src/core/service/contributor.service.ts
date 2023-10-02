import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import { Contributor, Permission } from '@core/type/contributor';
import {
  CreateContributorsBody,
  DeleteContributorsBody,
  UpdateContributorsBody,
} from '@core/type/doc/contributor';

@Injectable()
export class ContributorService {
  constructor(private prisma: PrismaService) {}

  async getContributorList(projectId: string) {
    return this.prisma.contributor.findMany({
      where: {
        deleted: false,
        projectId,
      },
      include: {
        user: {
          select: { avatar: true },
        },
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
    const { contributors, projectId } = body;
    this.checkWalletUnique(contributors);
    this.checkOwnerPermission(contributors);
    const currentContributors = await this.getContributorList(projectId);
    const newContributors: Contributor[] = [];

    const fn = currentContributors.map((item) => {
      if (contributors.find((i) => i.id === item.id)) {
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
      } else {
        newContributors.push(item);
      }
    });

    const users = await Promise.all(
      newContributors.map((item) =>
        this.prisma.user.findFirst({
          where: {
            wallet: item.wallet,
          },
        }),
      ),
    );

    fn.concat(
      newContributors.map((item) => {
        const userId = users.find((user) => user?.wallet === item.wallet)?.id;
        return this.prisma.contributor.create({
          data: {
            ...item,
            projectId,
            userId,
          },
        });
      }),
    );

    return this.prisma.$transaction(fn);
  }

  async createContributors(body: CreateContributorsBody) {
    const { contributors, projectId } = body;
    this.checkWalletUnique(contributors);
    this.checkOwnerPermission(contributors, true);
    const currentContributors = await this.getContributorList(projectId);
    contributors.forEach((item) => {
      if (currentContributors.find((i) => i.wallet === item.wallet)) {
        throw new HttpException(
          Code.WALLET_UNIQUE_ERROR.message,
          Code.WALLET_UNIQUE_ERROR.code,
        );
      }
    });
    return this.addContributors(contributors, projectId);
  }

  async addContributors(contributors: Contributor[], projectId: string) {
    const users = await Promise.all(
      contributors.map((item) =>
        this.prisma.user.findFirst({
          where: {
            wallet: item.wallet,
          },
        }),
      ),
    );
    return this.prisma.contributor.createMany({
      data: contributors.map((item) => {
        const userId = users.find((user) => user?.wallet === item.wallet)?.id;
        return {
          ...item,
          projectId,
          userId,
        };
      }),
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

  checkOwnerPermission(contributors: Contributor[], isAdd = false) {
    const ownerContributor = contributors.filter(
      (item) => Number(item.permission) === Permission.Owner,
    );
    const amount = isAdd ? 0 : 1;
    if (ownerContributor.length !== amount) {
      throw new HttpException(
        Code.OWNER_PERMISSION_ERROR.message,
        Code.OWNER_PERMISSION_ERROR.code,
      );
    }
  }

  async associateContributor(wallet: string, userId: string) {
    return this.prisma.contributor.updateMany({
      where: {
        wallet,
      },
      data: {
        userId,
      },
    });
  }
}
