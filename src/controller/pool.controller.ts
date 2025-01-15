import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ClaimBody,
  ClaimStatusQuery,
  CreatePoolBody,
  PoolListQuery,
  SyncUnClaimBody,
} from '@core/type/doc/pool';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PoolService } from '@service/pool.service';

@Controller('pool')
export class PoolController {
  constructor(
    @Inject(PoolService)
    private readonly poolService: PoolService,
  ) {}

  @Get('list')
  async getPools(@Query() query: PoolListQuery) {
    const list = await this.poolService.getList(query);
    return CoreApiResponse.success(list);
  }

  @Post('create')
  @ApiOperation({ description: '创建激励池' })
  async createPool(@Body() body: CreatePoolBody) {
    const result = await this.poolService.createPool(body);
    return CoreApiResponse.success(result);
  }

  @Get('claimStatus')
  @ApiOperation({
    description:
      '获取 project 下用户所有激励池的 claim 状态, 初始为 UNCLAIMED, claim 成功后更新为 CLAIMED',
  })
  async getClaimStatus(@Query() query: ClaimStatusQuery) {
    const result = await this.poolService.getClaimStatus(query);
    return CoreApiResponse.success(result);
  }

  @Post('claim')
  @ApiOperation({
    description: 'project 下调用 pool 合约 claim 后, 更新 claim 状态',
  })
  async claim(@Body() body: ClaimBody) {
    const result = await this.poolService.contributorClaim(body);
    return CoreApiResponse.success(result);
  }

  @Post('syncUnClaimed')
  async syncUnClaimed(@Body() body: SyncUnClaimBody) {
    const data = await this.poolService.syncUnClaimed(
      body.chainId,
      body.poolId,
    );
    return CoreApiResponse.success(data);
  }
}
