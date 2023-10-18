import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ContributionListQuery,
  CreateContributionBody,
  DeleteContributionBody,
  PrepareClaimQuery,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
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
import { ContributionService } from '@service/contribution.service';

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
  async prepareClaim(
    @Param('contributionIds') contributionIds: string,
    @Query() query: PrepareClaimQuery,
  ) {
    const sign = await this.contributionService.prepareClaim(
      contributionIds,
      query,
    );
    return CoreApiResponse.success(sign);
  }

  @Post('create')
  async createContribution(@Body() body: CreateContributionBody) {
    const contribution = await this.contributionService.createContribution(
      body,
    );
    return CoreApiResponse.success(contribution);
  }

  @Delete(':contributionId')
  async deleteContribution(
    @Param('contributionId', ParseIntPipe) contributionId: number,
    @Body() body: DeleteContributionBody,
  ) {
    await this.contributionService.deleteContribution(contributionId, body);
    return CoreApiResponse.success();
  }
}
