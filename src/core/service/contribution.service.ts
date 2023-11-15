import { Code } from '@core/code';
import {
  ContributionListQuery,
  CreateContributionBody,
  DeleteContributionBody,
  PrepareClaimBody,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
import { paginate } from '@core/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { Status } from '@prisma/client';
import { EasService } from '@service/eas.service';
import * as dayjs from 'dayjs';
import { ethers } from 'ethers';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ContributionService {
  constructor(private prisma: PrismaService, private easService: EasService) {}

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
    contributionId: string,
    body: UpdateContributionStateBody,
  ) {
    const { type, uId, operatorId } = body;
    const contribution = await this.prisma.contribution.findFirst({
      where: {
        id: contributionId,
      },
      include: {
        project: true,
      },
    });
    if (!contribution) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    const user = await this.prisma.contributor.findFirst({
      where: {
        projectId: contribution.projectId,
        id: operatorId,
      },
    });
    if (!user) {
      throw new HttpException(
        Code.CONTRIBUTION_CLAIM_AUTH_ERROR.message,
        Code.CONTRIBUTION_CLAIM_AUTH_ERROR.code,
      );
    }
    const statusMap = {
      claim: Status.CLAIM,
      ready: Status.READY,
    };
    const data = { status: statusMap[type] };
    const fns = [];
    if (type === 'claim') {
      if (contribution.status !== Status.READY) {
        throw new HttpException(
          Code.CONTRIBUTION_STATUS_ERROR.message,
          Code.CONTRIBUTION_STATUS_ERROR.code,
        );
      }
      const { projectId, credit, toIds } = contribution;
      const contributorId = toIds[0];
      const record = await this.prisma.mintReocrd.findFirst({
        where: {
          contributorId,
        },
      });
      if (!record) {
        fns.push(
          this.prisma.mintReocrd.create({
            data: {
              contributorId,
              credit,
              projectId,
            },
          }),
        );
      } else {
        fns.push(
          this.prisma.mintReocrd.update({
            where: {
              id: record.id,
            },
            data: {
              credit: record.credit + credit,
            },
          }),
        );
      }
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
    fns.push(
      this.prisma.contribution.update({
        where: {
          id: contributionId,
        },
        data,
      }),
    );
    return this.prisma.$transaction(fns);
  }

  async createContribution(body: CreateContributionBody) {
    const {
      detail,
      projectId,
      proof,
      toIds,
      credit,
      operatorId,
      type,
      contributionDate,
    } = body;
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
    const id = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ['string', 'string'],
        [detail, dayjs().toString()],
      ),
    );
    return this.prisma.contribution.create({
      data: {
        detail,
        proof,
        toIds,
        credit,
        projectId,
        type,
        contributionDate,
        ownerId: operatorId,
        id,
      },
    });
  }

  async prepareClaim(body: PrepareClaimBody) {
    const { chainId, contributionIds, toWallets, wallet } = body;
    const cIds = contributionIds.split(',').map((item) => item);
    const contributions = await this.prisma.contribution.findMany({
      where: {
        id: {
          in: cIds,
        },
      },
      include: {
        project: {
          include: {
            contributors: true,
          },
        },
      },
    });
    if (contributions.length !== cIds.length) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    for (const contribution of contributions) {
      const isBefore = dayjs(contribution.createAt)
        .add(Number(contribution.project.votePeriod), 'day')
        .isBefore(dayjs());
      if (!isBefore) {
        throw new HttpException(
          Code.CONTRIBUTION_CLAIM_TIME_ERROR.message,
          Code.CONTRIBUTION_CLAIM_TIME_ERROR.code,
        );
      }
    }
    const voteResults = await Promise.all(
      contributions.map((item) =>
        this.easService.getVoteResult(
          item.uId,
          chainId,
          item.project,
          item.project.contributors,
        ),
      ),
    );
    if (voteResults.some((item) => !item)) {
      throw new HttpException(
        Code.CONTRIBUTION_CLAIM_VOTE_NUMBER_ERROR.message,
        Code.CONTRIBUTION_CLAIM_VOTE_NUMBER_ERROR.code,
      );
    }
    const signs = [];
    let i = 0;
    for (const cId of cIds) {
      const sign = await this.easService.getSignature(
        cId,
        chainId,
        toWallets[i++],
        wallet,
      );
      signs.push(sign);
    }
    return signs;
  }

  async deleteContribution(id: string, body: DeleteContributionBody) {
    const { operatorId } = body;
    const contribution = await this.prisma.contribution.findFirst({
      where: {
        id,
      },
    });
    if (!contribution) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }
    if (contribution.ownerId !== operatorId) {
      throw new HttpException(Code.NO_AUTH.message, Code.NO_AUTH.code);
    }
    return this.prisma.contribution.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
  }
}
