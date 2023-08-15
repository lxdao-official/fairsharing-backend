import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProjectBody } from '@core/type/doc/project';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async getProjectList() {
    return this.prisma.project.findMany({
      where: {
        deleted: false,
      },
    });
  }

  async createProject(body: CreateProjectBody) {
    await this.prisma.project.create({
      data: body,
    });
  }
}
