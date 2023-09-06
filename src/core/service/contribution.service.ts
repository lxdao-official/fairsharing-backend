import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Code } from '@core/code';
import {
  ContributionListQuery,
  CreateContributionBody,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
import { Status } from '@prisma/client';
import { paginate } from '@core/utils/paginator';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService) {}

  async getContributionList(query: ContributionListQuery) {
    const { projectId, currentPage, pageSize } = query;
    return paginate(
      this.prisma.contribution,
      {
        where: {
          deleted: false,
          projectId,
        },
      },
      {
        pageSize,
        currentPage,
      },
    );
  }

  async updateContributionState(
    contributionId: number,
    body: UpdateContributionStateBody,
  ) {
    const { type, uId } = body;
    const contribution = await this.prisma.contribution.findFirst({
      where: {
        id: contributionId,
      },
    });
    const statusMap = {
      claim: Status.CLAIM,
      ready: Status.READY,
    };
    const data = { status: statusMap[type] };
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
    if (type === 'ready') {
      if (contribution.status !== Status.UNREADY) {
        throw new HttpException(
          Code.CONTRIBUTION_STATUS_ERROR.message,
          Code.CONTRIBUTION_STATUS_ERROR.code,
        );
      }
      if (!uId) {
        throw new HttpException(
          Code.CONTRIBUTION_UID_ERROR.message,
          Code.CONTRIBUTION_UID_ERROR.code,
        );
      }
      data['uId'] = uId;
    }
    return this.prisma.contribution.update({
      where: {
        id: contributionId,
      },
      data,
    });
  }

  async createContribution(body: CreateContributionBody) {
    const { detail, projectId, proof, toIds, credit, operatorId } = body;
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    const user = await this.prisma.contributor.findFirst({
      where: {
        id: operatorId,
      },
    });
    if (!project || !user) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    return this.prisma.contribution.create({
      data: {
        detail,
        proof,
        toIds,
        credit,
        projectId,
        ownerId: operatorId,
      },
    });
  }
}
