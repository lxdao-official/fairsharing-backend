import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProjectBody, UpdateProjectBody } from '@core/type/doc/project';
import { ContributorService } from '@service/contributor.service';
import { paginate } from '@core/utils/paginator';
import { plainToClass } from 'class-transformer';

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
    const { contributors, ...data } = body;
    this.contributorService.checkWalletUnique(contributors);
    this.contributorService.checkOwnerPermission(contributors);
    return this.prisma.project.create({
      data: {
        ...plainToClass(CreateProjectBody, data),
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
    return this.prisma.project.update({
      where: {
        id: projectId,
      },
      data: plainToClass(UpdateProjectBody, body),
    });
  }
}
