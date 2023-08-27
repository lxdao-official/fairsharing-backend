import { PaginateQuery } from '@core/type/doc/common';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContributorListQuery extends PaginateQuery {
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}
