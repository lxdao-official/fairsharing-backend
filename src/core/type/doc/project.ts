import { Contributor } from '@core/type/contributor';
import { PaginateQuery } from '@core/type/doc/common';
import { ApiProperty } from '@nestjs/swagger';
import { VoteApprove, VoteSystem } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

enum VoteSystemEnum {
  EQUAL = 'EQUAL',
  WEIGHT = 'WEIGHT',
}

enum VoteApproveEnum {
  DEFAULT = 'DEFAULT',
  RELATIVE2 = 'RELATIVE2',
  ABSOLUTE1 = 'ABSOLUTE1',
  ABSOLUTE2 = 'ABSOLUTE2',
}

export class CreateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  symbol: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  pointConsensus: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  network: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  votePeriod: string;

  @ArrayNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @ApiProperty({ isArray: true })
  contributors: Contributor[];

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  logo: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false })
  intro: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  @IsEnum(VoteSystemEnum)
  voteSystem: VoteSystem;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  @IsEnum(VoteApproveEnum)
  voteApprove: VoteApprove;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  voteThreshold: number;
}

export class UpdateProjectBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  votePeriod: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  logo: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  intro: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  @IsEnum(VoteSystem)
  voteSystem: VoteSystem;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  @IsEnum(VoteApprove)
  voteApprove: VoteApprove;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({ type: 'number' })
  voteThreshold: number;
}

export class ProjectListQuery extends PaginateQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet: string;
}

export class MintRecordQuery {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string' })
  wallet?: string;
}

export class CreateContributionTypeBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  color: string;
}

export class UpdateContributionTypeBody extends CreateContributionTypeBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  id: string;
}

export class DeleteContributionTypeBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string' })
  id: string;
}
