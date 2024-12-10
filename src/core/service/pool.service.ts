import { Code } from '@core/code';
import {
  ClaimBody,
  ClaimStatusQuery,
  CreatePoolBody,
  PoolListQuery,
  PoolTokenBody,
} from '@core/type/doc/pool';
import { paginate } from '@core/utils/paginator';
import { HttpException, Injectable } from '@nestjs/common';
import { IncentiveCLAIMStatus } from '@prisma/client';
import * as dayjs from 'dayjs';
import { ethers } from 'ethers';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class PoolService {
  constructor(private prisma: PrismaService) {}

  async getList(query: PoolListQuery) {
    const { projectId, currentPage, pageSize, endDateFrom, endDateTo } = query;

    const where = { projectId: projectId, deleted: false };

    if (endDateTo && endDateFrom) {
      where['createAt'] = {
        gte: new Date(endDateFrom),
        lte: new Date(endDateTo),
      };
    }

    return paginate(
      this.prisma.incentivePool,
      {
        where,
      },
      {
        pageSize,
        currentPage,
      },
    );
  }

  async getClaimStatus(query: ClaimStatusQuery) {
    const list = await this.prisma.incentivePoolDetail.findMany({
      where: {
        projectId: query.projectId,
        wallet: query.wallet,
      },
      orderBy: { createAt: 'desc' },
    });
    const result = {};
    for (let i = 0; i < list.length; i++) {
      const entity = list[i];
      if (!result[entity.poolId]) {
        result[entity.poolId] = [];
      }
      const tokens = result[entity.poolId];
      tokens.push({
        token: entity.token,
        ratio: entity.ratio,
        amount: entity.amount,
        status: entity.status,
      });
    }
    return result;
  }

  async createPool(body: CreatePoolBody) {
    const {
      projectId,
      allocationId,
      address,
      creator,
      lockDuration,
      depositor,
      tokens,
      operatorId,
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
        ['string', 'string', 'string'],
        [allocationId, creator, dayjs().toString()],
      ),
    );

    const fns = [];
    fns.push(
      this.prisma.incentivePool.create({
        data: {
          id: id,
          projectId: projectId,
          allocationId: allocationId,
          address: address,
          creator: creator,
          timeToClaim: Date.now() / 1000 + lockDuration,
          depositor: depositor,
        },
      }),
    );

    for (let i = 0; i < tokens.length; i++) {
      const tokenDetail: PoolTokenBody = tokens[i];
      const token = tokenDetail.token;
      for (let j = 0; j < tokenDetail.wallets.length; j++) {
        fns.push(
          this.prisma.incentivePoolDetail.create({
            data: {
              projectId: projectId,
              poolId: id,
              token: token,
              wallet: tokenDetail.wallets[j],
              amount: tokenDetail.amounts[j],
              ratio: tokenDetail.ratios[j],
            },
          }),
        );
      }
    }

    return this.prisma.$transaction(fns);
  }

  async contributorClaim(body: ClaimBody) {
    const { projectId, poolId, operatorId } = body;
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
    const pool = await this.prisma.incentivePool.findFirst({
      where: {
        id: poolId,
      },
    });
    if (!project || !user || !pool) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }

    const tokens = await this.prisma.incentivePoolDetail.findMany({
      where: {
        poolId: poolId,
        wallet: operatorId,
      },
    });
    const fns = [];
    tokens.forEach((token, index) => {
      fns.push(
        this.prisma.incentivePoolDetail.update({
          where: {
            id: token.id,
          },
          data: {
            status: IncentiveCLAIMStatus.CLAIMED,
          },
        }),
      );
    });
  }
}
