import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import {
  CreateContributionBody,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
import { Status } from '@prisma/client';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async getContributionList(projectId: string) {
    return this.prisma.contribution.findMany({
      where: {
        deleted: false,
        projectId,
      },
    });
  }

  async updateContributionState(
    contributionId: string,
    body: UpdateContributionStateBody,
  ) {
    const { type } = body;
    const contribution = await this.prisma.contribution.findFirst({
      where: {
        id: contributionId,
      },
    });
    if (!contribution) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    if (type === 'claim' && contribution.status !== Status.READY) {
      throw new HttpException(
        Code.CONTRIBUTION_STATUS_ERROR.message,
        Code.CONTRIBUTION_STATUS_ERROR.code,
      );
    }
    const statusMap = {
      claim: Status.CLAIM,
    };
    return this.prisma.contribution.update({
      where: {
        id: contributionId,
      },
      data: {
        status: statusMap[type],
      },
    });
  }

  async createContributors(body: CreateContributionBody) {
    const { detail, projectId, uId, proof, toIds, credit } = body;
    const project = await this.prisma.contribution.findFirst({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    return this.prisma.contribution.create({
      data: {
        detail,
        proof,
        uId,
        toIds,
        credit,
        project: {
          connect: {
            id: projectId,
          },
        },
        owner: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }
}
