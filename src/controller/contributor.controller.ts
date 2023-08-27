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
import { ProjectService } from '@core/service/project.service';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { CreateProjectBody, UpdateProjectBody } from '@core/type/doc/project';
import { ContributorService } from '@service/contributor.service';
import {
  ContributorListQuery,
  DeleteContributorsBody,
  UpdateContributorsBody,
} from '@core/type/doc/contributor';

@Controller('contributor')
export class ContributorController {
  constructor(
    @Inject(ProjectService)
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
  async createContributor(@Body() body: CreateProjectBody) {}
}
