import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ProjectService } from '@core/service/project.service';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { CreateProjectBody } from '@core/type/doc/project';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService) private readonly projectService: ProjectService,
  ) {}
  @Get('list')
  async getProjectList(@Query('userId') userId: string) {
    if (userId) {
      const list = await this.projectService.getProjectListByUserId(userId);
      return CoreApiResponse.success(list);
    }
    const list = await this.projectService.getProjectList();
    return CoreApiResponse.success(list);
  }

  @Get(':projectId')
  async getProjectDetail(@Param('projectId') projectId: string) {
    const detail = await this.projectService.getProjectDetail(projectId);
    return CoreApiResponse.success(detail);
  }

  @Post('create')
  async createProject(@Body() body: CreateProjectBody) {
    const data = await this.projectService.createProject(body);
    return CoreApiResponse.success(data);
  }
}
