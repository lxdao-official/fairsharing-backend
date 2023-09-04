import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginateQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  currentPage: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  pageSize: number;
}
