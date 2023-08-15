import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ProjectService } from '@core/service/project.service';
import { CoreApiResponse } from '@core/api/coreApiResponse';
import { CreateProjectBody } from '@core/type/doc/project';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService) private readonly projectService: ProjectService,
  ) {}
  @Get('list')
  async getProjectList() {
    const list = await this.projectService.getProjectList();
    return CoreApiResponse.success(list);
  }

  @Post('create')
  async createProject(@Body() body: CreateProjectBody) {
    return 'create';
  }
}
