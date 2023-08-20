import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProjectBody } from '@core/type/doc/project';
import { ContributorService } from '@service/contributor.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private contributorService: ContributorService,
  ) {}
  async getProjectList() {
    return this.prisma.project.findMany({
      where: {
        deleted: false,
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
          createMany: contributors as any,
        },
      },
    });
  }
}
