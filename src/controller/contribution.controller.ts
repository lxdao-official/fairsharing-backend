import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  ContributionListQuery,
  CreateContributionBody,
  DeleteContributionBody,
  GetAllocationDetailsQuery,
  PrepareClaimBody,
  UpdateContributionStateBody,
} from '@core/type/doc/contribution';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
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
    @Param('contributionId') contributionId: string,
    @Body() body: UpdateContributionStateBody,
  ) {
    await this.contributionService.updateContributionState(
      contributionId,
      body,
    );
    return CoreApiResponse.success();
  }
  @Post('prepareClaim')
  async prepareClaim(@Body() query: PrepareClaimBody) {
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

  @Delete(':contributionId')
  async deleteContribution(
    @Param('contributionId') contributionId: string,
    @Body() body: DeleteContributionBody,
  ) {
    await this.contributionService.deleteContribution(contributionId, body);
    return CoreApiResponse.success();
  }

  @Get('allocationDetails')
  async getAllocationDetails(@Query() query: GetAllocationDetailsQuery) {
    const data = await this.contributionService.getAllocationDetails(query);
    return CoreApiResponse.success(data);
  }

  @Get('test')
  async test(@Query('chainId') chainId: number) {
    const data = await this.contributionService.test(chainId);
    return CoreApiResponse.success(data);
  }
}
