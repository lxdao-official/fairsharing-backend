import { Code } from '@core/code';
import { Contributor, Permission } from '@core/type/contributor';
import {
  CreateContributorsBody,
  DeleteContributorsBody,
  UpdateContributorsBody,
} from '@core/type/doc/contributor';
import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { VoteSystem } from '@prisma/client';
import { ProjectService } from '@service/project.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ContributorService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ProjectService))
    private projectService: ProjectService,
  ) {}

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
    const project = await this.projectService.getProjectDetail(projectId);
    if (!project) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    if (project.voteSystem === VoteSystem.WEIGHT) {
      this.checkWeightAmount(contributors);
    }
    this.checkWalletUnique(contributors);
    this.checkAdminPermission(contributors);
    const currentContributors = await this.getContributorList(projectId);
    const newContributors: Contributor[] = [];

    let fn = contributors
      .map((item) => {
        const index = currentContributors.findIndex((i) => i.id === item.id);
        if (index > -1) {
          currentContributors.splice(index, 1);
          return this.prisma.contributor.update({
            where: {
              id: item.id,
            },
            data: {
              permission: item.permission,
              nickName: item.nickName,
              role: item.role,
              voteWeight: item.voteWeight,
            },
          });
        } else {
          newContributors.push(item);
        }
      })
      .filter((item) => item);

    const users = await Promise.all(
      newContributors.map((item) =>
        this.prisma.user.findFirst({
          where: {
            wallet: item.wallet,
          },
        }),
      ),
    );

    fn = fn.concat(
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
      currentContributors.map((item) => {
        return this.prisma.contributor.update({
          where: {
            id: item.id,
          },
          data: {
            deleted: true,
          },
        });
      }),
    );

    return this.prisma.$transaction(fn);
  }

  async createContributors(body: CreateContributorsBody) {
    const { contributors, projectId } = body;
    this.checkWalletUnique(contributors);
    this.checkAdminPermission(contributors);
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

  checkAdminPermission(contributors: Contributor[]) {
    const adminContributor = contributors.filter(
      (item) => Number(item.permission) === Permission.Admin,
    );
    if (adminContributor.length < 1) {
      throw new HttpException(
        Code.ADMIN_PERMISSION_ERROR.message,
        Code.ADMIN_PERMISSION_ERROR.code,
      );
    }
  }

  checkWeightAmount(contributors: Contributor[]) {
    const sum = contributors.reduce(
      (prev, cur) => prev + Number(cur.voteWeight),
      0,
    );
    if (sum !== 1) {
      throw new HttpException(
        Code.WEIGHT_AMOUNT_ERROR.message,
        Code.WEIGHT_AMOUNT_ERROR.code,
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
