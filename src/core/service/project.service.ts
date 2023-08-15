import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async execute(): Promise<any[]> {
    return this.prisma.project.findMany();
  }
}
