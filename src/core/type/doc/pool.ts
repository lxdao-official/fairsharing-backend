import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PoolListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  dateFrom?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  dateTo?: number;
}

export class CreatePoolBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  allocationId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  tokenAmounts: string[];
}

export class ClaimBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  poolAddress: string;
}
