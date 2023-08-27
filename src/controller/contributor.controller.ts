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
import { ContributorListQuery } from '@core/type/doc/contributor';

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

  @Delete(':projectId/delete')
  async deleteContributor(@Param('projectId') projectId: string) {
    await this.contributorService.deleteContributor(projectId);
    return CoreApiResponse.success();
  }

  @Put(':projectId/edit')
  async editContributor(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectBody,
  ) {}

  @Post('create')
  async createContributor(@Body() body: CreateProjectBody) {}
}
