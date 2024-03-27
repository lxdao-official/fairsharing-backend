import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ContributionListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDateFrom?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDateTo?: number;
}

export class UpdateContributionStateBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  type: 'claim' | 'ready' | 'revoke';

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  uId: string;
}

export class CreateContributionBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  detail: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  proof: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  credit: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  toIds: string[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  type: string[];

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  startDate: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDate: number;
}

export class PrepareClaimBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  toWallets: string[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  chainId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  contributionIds: string;
}

export class DeleteContributionBody extends AuthBody {}

export class GetAllocationDetailsQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDateFrom: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDateTo: number;
}
