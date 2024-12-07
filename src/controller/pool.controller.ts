import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ClaimBody,
  ClaimStatusQuery,
  CreatePoolBody,
  PoolListQuery,
} from '@core/type/doc/pool';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
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
  async createPool(@Body() body: CreatePoolBody) {
    const result = await this.poolService.createPool(body);
    return CoreApiResponse.success(result);
  }

  @Get('claimStatus')
  async getClaimStatus(@Query() query: ClaimStatusQuery) {
    const result = await this.poolService.getClaimStatus(query);
    return CoreApiResponse.success(result);
  }

  @Post('claim')
  async claim(@Body() body: ClaimBody) {
    const result = await this.poolService.contributorClaim(body);
    return CoreApiResponse.success(result);
  }
}
