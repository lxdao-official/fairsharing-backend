import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { ContributorService } from '@service/contributor.service';
import {
  ContributorListQuery,
  CreateContributorsBody,
  DeleteContributorsBody,
  UpdateContributorsBody,
} from '@core/type/doc/contributor';

@Controller('contributor')
export class ContributorController {
  constructor(
    @Inject(ContributorService)
    private readonly contributorService: ContributorService,
  ) {}
  @Get('list')
  async getContributorList(@Query() data: ContributorListQuery) {
    const { projectId } = data;
    const list = await this.contributorService.getContributorList(projectId);
    return CoreApiResponse.success(list);
  }

  @Delete('/delete')
  async deleteContributor(@Body() body: DeleteContributorsBody) {
    await this.contributorService.deleteContributor(body);
    return CoreApiResponse.success();
  }

  @Put('/edit')
  async editContributor(@Body() body: UpdateContributorsBody) {
    await this.contributorService.editContributor(body);
    return CoreApiResponse.success();
  }

  @Post('create')
  async createContributor(@Body() body: CreateContributorsBody) {
    await this.contributorService.createContributors(body);
    return CoreApiResponse.success();
  }
}
