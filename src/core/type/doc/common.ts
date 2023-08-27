import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateQuery {
  @IsNumber()
  @ApiProperty({ type: 'number' })
  currentPage: number;

  @IsNumber()
  @ApiProperty({ type: 'string' })
  pageSize: number;
}
