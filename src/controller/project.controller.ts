import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ProjectService } from '@core/service/project.service';
import { CoreApiResponse } from '@core/api/coreApiResponse';

@Controller('project')
export class ProjectController {
  constructor(
    @Inject(ProjectService) private readonly projectService: ProjectService,
  ) {}
  @Get('list')
  async getProjectList() {
    const list = await this.projectService.execute();
    return CoreApiResponse.success(list);
  }

  @Post('create')
  async createProject() {
    return 'create';
  }
}
