import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginateQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number', description: '当前页码,从 1 开始' })
  currentPage: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number', description: '当前页记录数' })
  pageSize: number;
}
