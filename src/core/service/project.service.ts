import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProjectBody } from '@core/type/doc/project';
import { ContributorService } from '@service/contributor.service';
import { paginate } from '@core/utils/paginator';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private contributorService: ContributorService,
  ) {}
  async getProjectList() {
    return paginate(
      this.prisma.project,
      {
        where: {
          deleted: false,
        },
      },
      {},
    );
  }

  async getProjectListByUserId(userId: string) {
    const data = await this.prisma.contributor.findMany({
      where: {
        userId,
      },
    });
    const ids = data.map((item) => item.projectId);
    return this.prisma.project.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  async createProject(body: CreateProjectBody) {
    const { contributors, ...data } = body;
    this.contributorService.checkWalletUnique(contributors);
    this.contributorService.checkOwnerPermission(contributors);
    return this.prisma.project.create({
      data: {
        ...data,
        contributors: {
          createMany: {
            data: [
              ...contributors.map((item) => ({
                wallet: item.wallet,
                permission: Number(item.permission),
                role: item.role,
                nickName: item.nickName,
              })),
            ],
          },
        },
      },
    });
  }

  async getProjectDetail(projectId: string) {
    return this.prisma.project.findFirst({
      where: {
        id: projectId,
        deleted: false,
      },
    });
  }
}
