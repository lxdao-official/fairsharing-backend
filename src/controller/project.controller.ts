import { CoreApiResponse } from '@core/api/coreApiResponse';
import { ProjectService } from '@core/service/project.service';
import {
  CreateProjectBody,
  MintRecordQuery,
  ProjectListQuery,
  UpdateProjectBody,
} from '@core/type/doc/project';
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

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService) private readonly projectService: ProjectService,
  ) {}
  @Get('list')
  async getProjectList(@Query() data: ProjectListQuery) {
    const { wallet, pageSize, currentPage } = data;
    if (wallet) {
      const list = await this.projectService.getProjectListByWallet(wallet);
      return CoreApiResponse.success(list);
    }
    const list = await this.projectService.getProjectList(
      pageSize,
      currentPage,
    );
    return CoreApiResponse.success(list);
  }

  @Get(':projectId')
  async getProjectDetail(@Param('projectId') projectId: string) {
    const detail = await this.projectService.getProjectDetail(projectId);
    return CoreApiResponse.success(detail);
  }

  @Get(':projectId/contributionTypeList')
  async getContributionTypeList(@Param('projectId') projectId: string) {
    const typeList = await this.projectService.getContributionTypeList(
      projectId,
    );
    return CoreApiResponse.success(typeList);
  }

  @Delete(':projectId/delete')
  async deleteProject(@Param('projectId') projectId: string) {
    await this.projectService.deleteProject(projectId);
    return CoreApiResponse.success(null);
  }

  @Put(':projectId/edit')
  async editProject(
    @Param('projectId') projectId: string,
    @Body() body: UpdateProjectBody,
  ) {
    const detail = await this.projectService.editProject(projectId, body);
    return CoreApiResponse.success(detail);
  }

  @Post('create')
  async createProject(@Body() body: CreateProjectBody) {
    const data = await this.projectService.createProject(body);
    return CoreApiResponse.success(data);
  }

  @Get(':projectId/mintRecord')
  async getMintRecord(
    @Param('projectId') projectId: string,
    @Query() query: MintRecordQuery,
  ) {
    const data = await this.projectService.getMintRecord(projectId, query);
    return CoreApiResponse.success(Array.isArray(data) ? data : [data]);
  }
}
