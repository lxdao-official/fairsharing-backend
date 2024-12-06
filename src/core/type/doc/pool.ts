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
  endDateFrom?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  endDateTo?: number;
}

export class ClaimStatusQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  pools: string[];
}

export class CreatePoolBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  allocationId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  creator: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  lockDuration: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  depositor: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  tokens: PoolTokenBody[];
}

export class PoolTokenBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  token: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  wallets: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  amounts: string[];

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  ratios: number[];
}

export class PoolTokenClaimStatusBody extends PoolTokenBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  token: string;

  @IsNumber()
  @Type(() => Number)
  ratio: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  amount: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  status: string;
}

export class PoolClaimStatusResponse {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  poolId: string;

  @ArrayNotEmpty()
  @IsArray()
  @ApiProperty({ isArray: true })
  tokens: PoolTokenClaimStatusBody[];
}

export class ClaimBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  poolId: string;
}
