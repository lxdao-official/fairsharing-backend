import { Code } from '@core/code';
import {
  CreateProjectBody,
  MintRecordQuery,
  UpdateProjectBody,
} from '@core/type/doc/project';
import { paginate } from '@core/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { ContributorService } from '@service/contributor.service';
import { PrismaService } from 'nestjs-prisma';

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

  async getProjectListByWallet(wallet: string) {
    const data = await this.prisma.contributor.findMany({
      where: {
        wallet,
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
    this.contributorService.checkAdminPermission(contributors);
    const users = await Promise.all(
      contributors.map((item) =>
        this.prisma.user.findFirst({
          where: {
            wallet: item.wallet,
          },
        }),
      ),
    );
    return this.prisma.project.create({
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
              ...contributors.map((item) => {
                const userId = users.find(
                  (user) => user?.wallet === item.wallet,
                )?.id;
                return {
                  wallet: item.wallet,
                  permission: Number(item.permission),
                  role: item.role,
                  nickName: item.nickName,
                  userId,
                };
              }),
            ],
          },
        },
      },
    });
  }

  async getProjectDetail(projectId: string) {
    return this.getProject(projectId);
  }

  async getProject(projectId: string, needThrow = false) {
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
        deleted: false,
      },
    });
    if (!project && needThrow) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    return project;
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
    const { name, votePeriod, logo, intro } = body;
    await this.getProject(projectId, true);
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        name,
        votePeriod,
        logo,
        intro,
      },
    });
  }

  async getMintRecord(projectId: string, query: MintRecordQuery) {
    await this.getProject(projectId, true);
    if (query.wallet) {
      return this.prisma.mintReocrd.findFirst({
        where: {
          projectId,
          deleted: false,
          contributor: {
            wallet: query.wallet,
          },
        },
      });
    }
    return this.prisma.mintReocrd.findMany({
      where: {
        projectId,
        deleted: false,
      },
      include: {
        contributor: {
          where: {
            deleted: false,
          },
        },
      },
    });
  }
}
