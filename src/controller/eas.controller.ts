import { Controller, Get, Inject, Query } from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { EasService } from '@service/eas.service';
import { GetSignatureQuery } from '@core/type/doc/eas';

@Controller('eas')
export class EasController {
  constructor(
    @Inject(EasService)
    private readonly easService: EasService,
  ) {}
  @Get('signature')
  async getSignature(@Query() query: GetSignatureQuery) {
    const signature = await this.easService.getSignature(query);
    return CoreApiResponse.success(signature);
  }
}
