import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AllocationListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  // @IsOptional()
  // @Type(() => Number)
  // @ApiProperty({ type: 'number' })
  // dateFrom?: number;
  //
  // @IsOptional()
  // @Type(() => Number)
  // @ApiProperty({ type: 'number' })
  // dateTo?: number;
}

export class UpdateAllocationStatusBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  status: 'INITIAL' | 'ATTESTED' | 'REVOKED';

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  uId: string;
}

export class CreateAllocationBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  contributors: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  ratios: number[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  credits: string[];
}
