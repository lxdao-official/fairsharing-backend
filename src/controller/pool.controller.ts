import { CreatePoolBody, PoolListQuery } from '@core/type/doc/pool';
import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { PoolService } from '@service/pool.service';

@Controller('pool')
export class PoolController {
  constructor(
    @Inject(PoolService)
    private readonly poolService: PoolService,
  ) {}

  @Get('list')
  async getPools(@Query() query: PoolListQuery) {}

  @Post('create')
  async createPool(@Body() body: CreatePoolBody) {}

  @Post('claim')
  async claim(@Body() body: CreatePoolBody) {}
}
