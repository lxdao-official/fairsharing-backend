import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ContributionListQuery,
  CreateContributionBody,
  PrepareClaimQuery,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
import { ContributionService } from '@service/contribution.service';
import { GetSignatureQuery } from '@core/type/doc/eas';

@Controller('contribution')
export class ContributionController {
  constructor(
    @Inject(ContributionService)
    private readonly contributionService: ContributionService,
  ) {}
  @Get('list')
  async geContributionList(@Query() query: ContributionListQuery) {
    const list = await this.contributionService.getContributionList(query);
    return CoreApiResponse.success(list);
  }

  @Put(':contributionId/updateState')
  async updateContributionState(
    @Param('contributionId', ParseIntPipe) contributionId: number,
    @Body() body: UpdateContributionStateBody,
  ) {
    await this.contributionService.updateContributionState(
      contributionId,
      body,
    );
    return CoreApiResponse.success();
  }
  @Get(':contributionId/prepareClaim')
  async prepareClaim(@Query() query: PrepareClaimQuery) {
    const sign = await this.contributionService.prepareClaim(query);
    return CoreApiResponse.success(sign);
  }

  @Post('create')
  async createContribution(@Body() body: CreateContributionBody) {
    const contribution = await this.contributionService.createContribution(
      body,
    );
    return CoreApiResponse.success(contribution);
  }
}
