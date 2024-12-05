import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  CreateAllocationBody,
  UpdateAllocationStatusBody,
} from '@core/type/doc/allocation';
import { Body, Controller, Inject, Param, Post, Put } from '@nestjs/common';
import { AllocationService } from '@service/allocation.service';

@Controller('allocation')
export class AllocationController {
  constructor(
    @Inject(AllocationService)
    private readonly allocationService: AllocationService,
  ) {}

  // @Get('list')
  // async getAllocations(@Query() query: AllocationListQuery) {}

  @Post('create')
  async createAllocation(@Body() body: CreateAllocationBody) {
    const result = this.allocationService.create(body);
    return CoreApiResponse.success(result);
  }

  @Put(':allocationId/updateState')
  async updateAllocationState(
    @Param('contributionId') contributionId: string,
    @Body() body: UpdateAllocationStatusBody,
  ) {
    const result = await this.allocationService.updateAllocationState(
      contributionId,
      body,
    );
    return CoreApiResponse.success(result);
  }
}
