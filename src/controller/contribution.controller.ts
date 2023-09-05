import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ContributionListQuery,
  CreateContributionBody,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
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
    @Param('contributionId') contributionId: string,
    @Body() body: UpdateContributionStateBody,
  ) {
    await this.contributionService.updateContributionState(
      contributionId,
      body,
    );
    return CoreApiResponse.success();
  }

  @Post('create')
  async createContribution(@Body() body: CreateContributionBody) {
    await this.contributionService.createContribution(body);
    return CoreApiResponse.success();
  }
}
