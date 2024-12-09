import { Code } from '@core/code';
import {
  AllocationListQuery,
  CreateAllocationBody,
  UpdateAllocationStatusBody,
} from '@core/type/doc/allocation';
import { HttpException, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ethers } from 'ethers';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AllocationService {
  constructor(private prisma: PrismaService) {}

  async getAllocationList(query: AllocationListQuery) {
    const { projectId } = query;
    const project = await this.prisma.project.findFirst({
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
    return this.prisma.allocation.findMany({
      where: { projectId, deleted: false },
    });
  }

  async create(body: CreateAllocationBody) {
    const { title, projectId, contributors, ratios, credits, operatorId } =
      body;
    const project = await this.prisma.project.findFirst({
      where: {
        id: projectId,
      },
    });
    const user = await this.prisma.contributor.findFirst({
      where: {
        projectId: projectId,
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
        [projectId, title, dayjs().toString()],
      ),
    );

    const fns = [];
    fns.push(
      this.prisma.allocation.create({
        data: {
          id,
          title,
          projectId,
          creator: user.wallet,
        },
      }),
    );

    contributors.forEach((wallet, index) => {
      fns.push(
        this.prisma.allocationDetail.create({
          data: {
            allocationId: id,
            wallet: wallet,
            ratio: ratios[index],
            amount: credits[index],
          },
        }),
      );
    });
    await this.prisma.$transaction(fns);

    return {
      id,
    };
  }

  async updateAllocationState(
    allocationId: string,
    body: UpdateAllocationStatusBody,
  ) {
    const { status, uId, operatorId } = body;

    const allocation = await this.prisma.allocation.findFirst({
      where: {
        id: allocationId,
      },
      include: {
        project: true,
      },
    });

    if (!allocation) {
      throw new HttpException(
        Code.NOT_FOUND_ERROR.message,
        Code.NOT_FOUND_ERROR.code,
      );
    }

    const user = await this.prisma.contributor.findFirst({
      where: {
        projectId: allocation.projectId,
        id: operatorId,
      },
    });
    if (!user) {
      throw new HttpException(Code.NO_AUTH.message, Code.NO_AUTH.code);
    }

    return this.prisma.allocation.update({
      where: {
        id: allocationId,
      },
      data: {
        uId: uId,
        status: status,
      },
    });
  }
}
