import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProjectBody, UpdateProjectBody } from '@core/type/doc/project';
import { ContributorService } from '@service/contributor.service';
import { paginate } from '@core/utils/paginator';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private contributorService: ContributorService,
  ) {}
  async getProjectList(pageSize: number, currentPage: number) {
    return paginate(
      this.prisma.project,
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

  async getProjectListByUserId(userId: string) {
    const data = await this.prisma.contributor.findMany({
      where: {
        userId,
        deleted: false,
      },
    });
    const ids = data.map((item) => item.projectId);
    return this.prisma.project.findMany({
      where: {
        deleted: false,
        id: {
          in: ids,
        },
      },
    });
  }

  async createProject(body: CreateProjectBody) {
    const {
      contributors,
      address,
      name,
      logo,
      pointConsensus,
      network,
      votePeriod,
      symbol,
      intro,
    } = body;
    this.contributorService.checkWalletUnique(contributors);
    this.contributorService.checkOwnerPermission(contributors);
    const users = await Promise.all(
      contributors.map((item) =>
        this.prisma.user.findFirst({
          where: {
            wallet: item.wallet,
          },
        }),
      ),
    );
    await this.prisma.project.create({
      data: {
        id: address,
        name,
        logo,
        pointConsensus,
        network,
        votePeriod,
        symbol,
        intro,
        contributors: {
          createMany: {
            data: [
              ...contributors.map((item) => ({
                wallet: item.wallet,
                permission: Number(item.permission),
                role: item.role,
                nickName: item.nickName,
                userId: users.find((user) => user.wallet === item.wallet)?.id,
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

  async deleteProject(projectId: string) {
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        deleted: true,
      },
    });
  }

  async editProject(projectId: string, body: UpdateProjectBody) {
    const { pointConsensus, votePeriod, logo, intro } = body;
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        pointConsensus,
        votePeriod,
        logo,
        intro,
      },
    });
  }
}
