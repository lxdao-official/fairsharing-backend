import { Controller, Get, Inject, ParseIntPipe, Query } from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { EasService } from '@service/eas.service';

@Controller('eas')
export class EasController {
  constructor(
    @Inject(EasService)
    private readonly easService: EasService,
  ) {}
  @Get('signature')
  async getSignature(
    @Query('wallet') wallet: string,
    @Query('cId', ParseIntPipe) cId: number,
  ) {
    const signature = await this.easService.getSignature(wallet, cId);
    return CoreApiResponse.success(signature);
  }
}
