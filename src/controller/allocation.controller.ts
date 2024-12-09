import { CoreApiResponse } from '@core/api/coreApiResponse';
import {
  AllocationListQuery,
  CreateAllocationBody,
  UpdateAllocationStatusBody,
} from '@core/type/doc/allocation';
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
import { AllocationService } from '@service/allocation.service';

@Controller('allocation')
export class AllocationController {
  constructor(
    @Inject(AllocationService)
    private readonly allocationService: AllocationService,
  ) {}

  @Get('list')
  async getAllocations(@Query() query: AllocationListQuery) {
    const result = await this.allocationService.getAllocationList(query);
    return CoreApiResponse.success(result);
  }

  @Post('create')
  async createAllocation(@Body() body: CreateAllocationBody) {
    const result = await this.allocationService.create(body);
    return CoreApiResponse.success(result);
  }

  @Put(':allocationId/updateState')
  async updateAllocationState(
    @Param('allocationId') allocationId: string,
    @Body() body: UpdateAllocationStatusBody,
  ) {
    const result = await this.allocationService.updateAllocationState(
      allocationId,
      body,
    );
    return CoreApiResponse.success(result);
  }
}
