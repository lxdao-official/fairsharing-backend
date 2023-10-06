import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthBody } from '@core/type/doc/auth';
import { PaginateQuery } from '@core/type/doc/common';
import { Type } from 'class-transformer';

export class ContributionListQuery extends PaginateQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  projectId: string;
}

export class UpdateContributionStateBody extends AuthBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  type: 'claim' | 'ready';

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

  @IsOptional()
  @IsArray()
  @ApiProperty({ isArray: true })
  toIds: string[];
}

export class PrepareClaimQuery {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  toWallet: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: 'number' })
  chainId: number;
}

export class DeleteContributionBody extends AuthBody {}
